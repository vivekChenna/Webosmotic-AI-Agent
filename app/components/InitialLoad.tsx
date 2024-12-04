import { Headphones } from "./Headphones";
import { isBrowser } from "react-device-detect";
import { Spinner } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const InitialLoad = ({
  fn,
  connecting = true,
  setIsChat,
}: {
  fn: () => void;
  connecting: boolean;
  setIsChat: () => void;
}) => {
  const router = useRouter();

  return (
    <>
      <div className="col-start-1 col-end-13 sm:col-start-2 sm:col-end-12 md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10 p-3 mb-1/2">
        <div
          // disabled={connecting}
          // onClick={() => !connecting && fn()}
          // type="button"
          className="relative block w-full border shadow p-6 sm:p-8 lg:p-12 rounded-xl text-center"
        >
          <h2 className="font-favorit mt-2 block font-bold text-xl text-black">
            Welcome to Webosmotic&apos;s
            <br />
            AI Agent.
          </h2>
          {/* <div className="flex justify-center mt-4">
            <ul className="list-disc list-inside marker:text-[#acaead]">
              <li className="text-center">Nova-2 Speech-to-Text</li>
              <li className="text-center">Groq&apos;s llama3-70b-8192</li>
              <li className="text-center">Aura Text-to-Speech</li>
            </ul>
          </div> */}
          <span className="mt-4 block font-semibold">
            <div className="text-black font-semibold sm:w-fit sm:mx-auto opacity-90">
              {connecting ? (
                <div className="w-full h-full items-center flex justify-center cursor-not-allowed bg-white border px-6 md:px-8 py-3">
                  <Spinner size={"sm"} className="-mt-1 mr-2" />
                  Connecting...
                </div>
              ) : (
                // <>{isBrowser ? "Click" : "Tap"} here to start</>
                <div className=" flex items-center gap-5 justify-center flex-col">
                  <div className="flex items-center gap-5 justify-center">
                    <button
                      disabled={connecting}
                      type="button"
                      className=" flex items-center gap-1.5 px-6 md:px-8 py-3  bg-white rounded-md border"
                      onClick={() => !connecting && fn()}
                    >
                      <Image
                        src="/phone-call.svg"
                        alt="call"
                        height={15}
                        width={15}
                      />
                      <>Call</>
                    </button>
                    <button
                      className=" flex items-center gap-1.5 px-6 md:px-8 py-3  bg-white rounded-md border"
                      disabled={connecting}
                      type="button"
                      onClick={() => {
                        if (!connecting) {
                          fn(); // Call the function
                          setIsChat(); // Set chat state to true (or whatever the intention is)
                        }
                      }}
                    >
                      <Image
                        src="/chat.png"
                        alt="chat"
                        height={17}
                        width={17}
                      />
                      <>Chat</>
                    </button>
                  </div>
                  {/* <div>
                    <button
                      className=" flex items-center gap-1.5 px-6 md:px-8 py-3  bg-white rounded-md border animate-bounce"
                      type="button"
                      onClick={() => {
                        window.open("https://andaihub.vercel.app", "_blank");
                      }}
                    >
                      <Image
                        src="/phone-call.svg"
                        alt="call"
                        height={15}
                        width={15}
                      />
                      Empathetic Call
                    </button>
                  </div> */}
                </div>
              )}
            </div>
          </span>
          <span className="mt-4 block text-sm text-black">
            <Headphones /> For optimal enjoyment, we recommend using headphones
            while using this application.
            {/* Minor bugs and annoyances may appear
            while using this demo. Pull requests are welcome. */}
          </span>
        </div>
      </div>
    </>
  );
};
