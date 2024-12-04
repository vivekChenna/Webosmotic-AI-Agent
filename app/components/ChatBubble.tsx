import { LeftBubble } from "./LeftBubble";
import { Message } from "ai";
import { RightBubble } from "./RightBubble";

// const isMessage = (message: Message | Metadata): message is Message {
//   return typeof message === 'Message';
// }

function isUserMessage(message: any): message is Message {
  return message.role === "user";
}

function isAssistantMessage(message: any): message is Message {
  return message.role === "assistant";
}

export const ChatBubble = ({ message ,  isChat}: { message: any , isChat: boolean;}) => {
  if (isUserMessage(message)) {
    // chat user
    return <RightBubble message={message} />;
  } else if (isAssistantMessage(message)) {
    // chat assistant
    return <LeftBubble message={message} isChat={isChat} />;
  } else {
    // other as-yet unlabelled messages
    return <></>;
  }
};
