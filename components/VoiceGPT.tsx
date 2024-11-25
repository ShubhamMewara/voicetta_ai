"use client";

import React, { useRef, useState } from "react";
import { Player } from "./player";
import { Recorder } from "./recorder";
import { LowLevelRTClient, SessionUpdateMessage } from "rt-client";
import { Button } from "./ui/button";
import { Mic } from "lucide-react";
import Image from "next/image";

const SESSION_UPDATE_MESSAGE: SessionUpdateMessage = {
  type: "session.update",
  session: {
    turn_detection: { type: "server_vad" },
    input_audio_transcription: { model: "whisper-1" },
    voice: "alloy",
    instructions: "Always speak in English",
  },
};

const formStates = {
  READY_TO_START: "ReadyToStart",
  READY_TO_STOP: "ReadyToStop",
  WORKING: "Working",
} as const;

function RealtimeVoiceTranscription() {
  const [formState, setFormState] = useState<
    (typeof formStates)[keyof typeof formStates]
  >(formStates.READY_TO_START);
  const [receivedText, setReceivedText] = useState<string[]>([]);
  const [aiText, setAiText] = useState<string | null>(null);
  const [userText, setUserText] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);

  const realtimeStreaming = useRef<LowLevelRTClient | null>(null);
  const audioRecorder = useRef<Recorder | null>(null);
  const audioPlayer = useRef<Player | null>(null);
  const recordingActive = useRef(false);
  const buffer = useRef<Uint8Array>(new Uint8Array());

  const handleMicClick = () => {
    if (formState === formStates.READY_TO_START) {
      startRealtime();
      setIsListening(true);
    } else if (formState === formStates.READY_TO_STOP) {
      stopRealtime();
    }
  };

  const startRealtime = async () => {
    setFormState(formStates.WORKING);
    const endpoint = process.env.NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT!;
    const apiKey = process.env.NEXT_PUBLIC_AZURE_OPENAI_API_KEY!;
    const deploymentOrModel = "gpt-4o-realtime-preview";

    realtimeStreaming.current = new LowLevelRTClient(
      new URL(endpoint),
      { key: apiKey },
      { deployment: deploymentOrModel }
    );

    try {
      await realtimeStreaming.current.send(SESSION_UPDATE_MESSAGE);
      await resetAudio(true);
      handleRealtimeMessages();
    } catch (error) {
      console.error("Connection error:", error);
      setFormState(formStates.READY_TO_START);
      setIsListening(false);
    }
  };

  const stopRealtime = () => {
    resetAudio(false);
    setFormState(formStates.READY_TO_START);
    setReceivedText([]);
    setAiText(null);
    setUserText(null);
    setIsListening(false);
  };

  const handleRealtimeMessages = async () => {
    if (!realtimeStreaming.current) return;
    try {
      for await (const message of realtimeStreaming.current.messages()) {
        switch (message.type) {
          case "session.created":
            setFormState(formStates.READY_TO_STOP);
            break;
          case "response.audio_transcript.delta":
            setReceivedText((prev) => [...prev, message.delta]);
            setAiText(message.delta);
            break;
          case "response.audio.delta":
            const binary = atob(message.delta);
            const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
            const pcmData = new Int16Array(bytes.buffer);
            audioPlayer.current?.play(pcmData);
            break;
          case "input_audio_buffer.speech_started":
            audioPlayer.current?.clear();
            break;
          case "response.done":
            break;
          case "conversation.item.input_audio_transcription.completed":
            setReceivedText((prev) => [...prev, `User: ${message.transcript}`]);
            setUserText(message.transcript);
            break;
          default:
            console.log("Unhandled message:", JSON.stringify(message, null, 2));
        }
      }
    } catch (error) {
      console.error("Message handling error:", error);
    } finally {
      await resetAudio(false);
    }
  };

  const processAudioRecordingBuffer = (data: Buffer) => {
    const uint8Array = new Uint8Array(data);
    const concatenated = new Uint8Array(
      buffer.current.length + uint8Array.length
    );
    concatenated.set(buffer.current);
    concatenated.set(uint8Array, buffer.current.length);
    buffer.current = concatenated;

    if (buffer.current.length >= 4800) {
      const toSend = buffer.current.slice(0, 4800);
      buffer.current = buffer.current.slice(4800);
      const base64 = btoa(String.fromCharCode(...Array.from(toSend)));
      if (recordingActive.current && realtimeStreaming.current) {
        realtimeStreaming.current.send({
          type: "input_audio_buffer.append",
          audio: base64,
        });
      }
    }
  };

  const resetAudio = async (startRecording: boolean) => {
    recordingActive.current = false;
    audioRecorder.current?.stop();
    audioPlayer.current?.clear();
    audioRecorder.current = new Recorder(processAudioRecordingBuffer);
    audioPlayer.current = new Player();
    audioPlayer.current.init(24000);

    if (startRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioRecorder.current.start(stream);
        recordingActive.current = true;
      } catch (error) {
        console.error("Microphone access error:", error);
      }
    }
  };

  return (
    <>
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
                    ? "bg-orange-500 text-white pulse z-10 hover:bg-orange-300"
                    : "bg-orange-500/30 text-orange-400 hover:bg-orange-500/40 z-0"
                }`}
                onClick={handleMicClick}
              >
                <Image
                src="/images/logo.png"
                alt="Logo"
                width={30}
                height={30}
                />
                <span className="sr-only">Toggle microphone</span>
              </Button>
            </div>
          </div>
          {isListening && (
            <>
              <div className="z-[-1] absolute inset-0 rounded-full bg-orange-500/10 wave"></div>
              <div
                className="absolute inset-0 rounded-full bg-orange-500/10 wave"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </>
          )}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <Button
              variant="outline"
              className="text-orange-400 bg-orange-500/10 hover:bg-orange-500/20 cursor-default transition-all duration-300 hover:scale-105"
            >
              {formState === formStates.READY_TO_START && "Give it a try!"}
              {formState === formStates.WORKING && "Connecting..."}
              {formState === formStates.READY_TO_STOP && "Stop Listening"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RealtimeVoiceTranscription;
