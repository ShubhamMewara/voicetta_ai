"use client";

import { useState } from "react";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MicComponent() {
  const [isListening, setIsListening] = useState(false);

  const handleMicClick = () => {
    setIsListening(!isListening);
    console.log("Mic clicked");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
          }

          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
          }

          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
          }
        }

        @keyframes wave {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .pulse {
          animation: pulse 2s infinite;
        }

        .wave {
          animation: wave 2s infinite;
        }
      `}</style>
      <div className="relative">
        <div
          className={`w-48 h-48 rounded-full flex items-center justify-center transition-all duration-300 ${
            isListening ? "bg-orange-500/20" : "bg-orange-500/10"
          }`}
        >
          <div
            className={`w-40 h-40 rounded-full flex items-center justify-center transition-all duration-300 ${
              isListening ? "bg-orange-500/30" : "bg-orange-500/20"
            }`}
          >
            <Button
              variant="ghost"
              size="icon"
              className={`w-32 h-32 rounded-full transition-all duration-300 ${
                isListening
                  ? "bg-orange-500 text-white pulse"
                  : "bg-orange-500/30 text-orange-400 hover:bg-orange-500/40"
              }`}
              onClick={handleMicClick}
            >
              <Mic className="w-12 h-12" />
              <span className="sr-only">Toggle microphone</span>
            </Button>
          </div>
        </div>
        {isListening && (
          <>
            <div className="absolute inset-0 rounded-full bg-orange-500/10 wave"></div>
            <div
              className="absolute inset-0 rounded-full bg-orange-500/10 wave"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </>
        )}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <Button
            variant="ghost"
            className="text-white bg-[#da2d2e]/50 hover:bg-[#da2d2e]/50 transition-all duration-300 hover:scale-105"
          >
            Give it a try!
          </Button>
        </div>
      </div>
    </div>
  );
}
