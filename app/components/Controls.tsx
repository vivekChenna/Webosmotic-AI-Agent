import { Message } from "ai/react";
import { Tooltip } from "@nextui-org/react";
import { useCallback, useEffect } from "react";

import { Download } from "./Download";
import { MicrophoneIcon } from "./icons/MicrophoneIcon";
import { SendIcon } from "./icons/SendIcon";
import { Settings } from "./Settings";
import { useMicrophone } from "../context/Microphone";
import { useNowPlaying } from "react-nowplaying";
import { useSubmit } from "../lib/hooks/useSubmit";

// Better to use library, a lot of complexity is involved
// in building the resizable input
import TextareaAutosize from "react-textarea-autosize";

export const Controls = ({
  input,
  handleSubmit,
  handleInputChange,
  messages,
  isChat,
}: {
  input: string;
  handleSubmit: any;
  handleInputChange: any;
  messages: Message[];
  isChat: boolean;
}) => {
  const { startMicrophone, stopMicrophone, microphoneOpen } = useMicrophone();
  const { formRef, onKeyDown } = useSubmit();

  useEffect(() => {
    if (!isChat) {
      startMicrophone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const microphoneToggle = useCallback(
    async (e: Event) => {
      e.preventDefault();

      if (microphoneOpen) {
        stopMicrophone();
      } else {
        startMicrophone();
      }
    },
    [microphoneOpen, startMicrophone, stopMicrophone]
  );

  const { stop: stopAudio } = useNowPlaying();

  const submitter = useCallback(
    (e: any) => {
      handleSubmit(e);
      stopAudio();
      e.target.value = "";
      handleInputChange(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stopAudio, handleSubmit]
  );

  return (
    <form onSubmit={submitter} ref={formRef}>
      <div className="relative">
        <div className="absolute w-full -top-[4.5rem] py-4 flex justify-between">
          { !isChat &&  <Settings />}
          <Download messages={messages} />
        </div>
        <div className="flex bg-[#101014] rounded-full">
          {!isChat && (
            <span
              className={`rounded-tl-[2rem] rounded-bl-[2rem] ps-0.5 py-0.5 ${
                microphoneOpen
                  ? "bg-gradient-to-r bg-gradient to-[#13EF93]/50 from-red-500"
                  : "bg-gradient-to-r bg-gradient to-[#13EF93]/50 from-[#149AFB]/80"
              }`}
            >
              <Tooltip
                showArrow
                content="Toggle microphone on/off."
                className=" text-white"
              >
                <a
                  href="#"
                  onClick={(e: any) => microphoneToggle(e)}
                  className={`rounded-tl-[2rem] rounded-bl-[2rem] w-16 md:w-20 sm:w-24 py-2 md:py-4 px-2 h-full sm:px-8 font-bold bg-[#101014] text-light-900 text-sm sm:text-base flex items-center justify-center group`}
                >
                  {microphoneOpen && (
                    <div className="w-auto items-center justify-center hidden sm:flex absolute shrink-0">
                      <MicrophoneIcon
                        micOpen={microphoneOpen}
                        className="h-5 md:h-6 animate-ping-short"
                      />
                    </div>
                  )}
                  <div className="w-auto flex items-center justify-center shrink-0">
                    <MicrophoneIcon
                      micOpen={microphoneOpen}
                      className="h-5 md:h-6 text-white"
                    />
                  </div>
                  {/* <span>
                {microphoneOpen ? (
                  <>Now listening...</>
                ) : (
                  <>{`${isTablet || isMobile ? "Tap" : "Click"} to speak`}</>
                )}
              </span> */}
                </a>
              </Tooltip>
            </span>
          )}

          <div className={`flex-grow inline py-0.5 rounded-full  ${isChat && "border-2 border-black"} `}>
            <div className=" bg-[#101014] h-full rounded-full pl-2">
              <TextareaAutosize
                onKeyDown={onKeyDown}
                rows={1}
                spellCheck={false}
                autoCorrect="off"
                className="py-2 md:py-4 -mb-[0.4rem] min-h-10 overflow-hidden px-4 sm:px-4 w-full resize-none bg-[#101014] text-white text-sm sm:text-base outline-none focus:ring-0 rounded-full"
                placeholder="Send a message"
                value={input}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="inline h-auto rounded-tr-[2rem] rounded-br-[2rem] bg-gradient-to-l to-[#13EF93]/50 from-[#149AFB]/80 pe-0.5 py-0.5">
            <Tooltip
              showArrow
              content="Send a message."
              className=" text-white"
            >
              <button
                type="submit"
                className="w-16 md:w-24 h-full py-2 md:py-4 px-2 rounded-tr-[2rem] rounded-br-[2rem] font-bold bg-[#101014] text-light-900 text-sm sm:text-base flex items-center justify-center"
              >
                {/* <span>Send text</span> */}
                <SendIcon className="w-5 md:w-6 text-white" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </form>
  );
};
