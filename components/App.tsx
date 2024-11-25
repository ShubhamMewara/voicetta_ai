"use client"
import { useState } from "react";
import { Mic, MicOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import useRealTime from "@/hooks/useRealtime";
import useAudioRecorder from "@/hooks/useAudioRecorder";
import useAudioPlayer from "@/hooks/useAudioPlayer";

import { GroundingFile, ToolResult } from "@/lib/types";

export default function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [groundingFiles, setGroundingFiles] = useState<GroundingFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<GroundingFile | null>(null);

  const { startSession, addUserAudio, inputAudioBufferClear } = useRealTime({
    onWebSocketOpen: () => console.log("WebSocket connection opened"),
    onWebSocketClose: () => console.log("WebSocket connection closed"),
    onWebSocketError: (event) => console.error("WebSocket error:", event),
    onReceivedError: (message) => console.error("error", message),
    onReceivedResponseAudioDelta: (message) => {
      isRecording && playAudio(message.delta);
    },
    onReceivedInputAudioBufferSpeechStarted: () => {
      stopAudioPlayer();
    },
    onReceivedExtensionMiddleTierToolResponse: (message) => {
      const result: ToolResult = JSON.parse(message.tool_result);

      const files: GroundingFile[] = result.sources.map((x) => {
        return { id: x.chunk_id, name: x.title, content: x.chunk };
      });

      setGroundingFiles((prev) => [...prev, ...files]);
    },
  });

  const {
    reset: resetAudioPlayer,
    play: playAudio,
    stop: stopAudioPlayer,
  } = useAudioPlayer();
  const { start: startAudioRecording, stop: stopAudioRecording } =
    useAudioRecorder({ onAudioRecorded: addUserAudio });

  const onToggleListening = async () => {
    if (!isRecording) {
      startSession();
      await startAudioRecording();
      resetAudioPlayer();

      setIsRecording(true);
    } else {
      await stopAudioRecording();
      stopAudioPlayer();
      inputAudioBufferClear();

      setIsRecording(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 text-gray-900">
      <main className="flex flex-grow flex-col items-center justify-center">
        <div className="mb-4 flex flex-col items-center justify-center">
          <Button
            onClick={onToggleListening}
            className={`h-12 w-60 ${
              isRecording
                ? "bg-red-600 hover:bg-red-700"
                : "bg-purple-500 hover:bg-purple-600"
            }`}
            aria-label={
              isRecording ? "app.stopRecording" : "app.startRecording"
            }
          >
            {isRecording ? (
              <>
                <MicOff className="mr-2 h-4 w-4" />
              </>
            ) : (
              <>
                <Mic className="mr-2 h-6 w-6" />
              </>
            )}
          </Button>
        </div>
      </main>
    </div>
  );
}
