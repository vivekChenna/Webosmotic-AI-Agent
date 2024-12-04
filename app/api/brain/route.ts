import { StreamingTextResponse } from "ai";
import { NextRequest } from "next/server";

export const runtime = "edge";

// function streamResponse(response: Response) {
//   if (!response.body) {
//     // If there's no response body, return an empty stream
//     return new ReadableStream({
//       start(controller) {
//         controller.close();
//       },
//     });
//   }

//   const reader = response.body.getReader();
//   return new ReadableStream({
//     async start(controller) {
//       try {
//         while (true) {
//           const { done, value } = await reader.read();
//           if (done) break;
//           controller.enqueue(value);
//         }
//       } catch (error) {
//         console.error("Error reading stream:", error);
//       } finally {
//         controller.close();
//         reader.releaseLock();
//       }
//     },
//   });
// }

async function processResponse(response: any) {
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const responseBody = await response.json();
  const rawText = responseBody.data.outputs.text;

  // Parse the raw JSON string inside the "text" field
  const parsedText = JSON.parse(rawText);

  // Access the "content" field
  let content = parsedText.choices[0].message.content;
  content = content.replace(/\n\n/g, " ");
  content = content.replace(/"/g, "");

  console.log("Extracted content:", content);

  return content;
}

function getLatestUserMessage(messages: any[]) {
  const userMessages = messages.filter((msg) => msg.role === "user");
  if (userMessages.length > 0) {
    return userMessages[userMessages.length - 1].content;
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages;

    if (!Array.isArray(messages)) {
      throw new Error("Invalid request body: messages is not an array");
    }

    const latestUserMessage = getLatestUserMessage(messages);

    if (!latestUserMessage) {
      return new Response(JSON.stringify({ error: "No user message found" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await fetch("http://sigma.andaihub.com/v1/workflows/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer app-FVOYi4GliQ2v6tI5JXy6G59Y`,
      },
      body: JSON.stringify({
        inputs: { query: latestUserMessage },
        user: "websomatic",
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const content = await processResponse(response);

    return new Response(JSON.stringify(content), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred while processing your request",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
