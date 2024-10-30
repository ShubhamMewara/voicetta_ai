"use client";

import React, { useRef, useState } from "react";
import { Player } from "./player";
import { Recorder } from "./recorder";
import { LowLevelRTClient, SessionUpdateMessage } from "rt-client";
import { Button } from "./ui/button";

function RealtimeVoiceTranscription() {
  const [formState, setFormState] = useState<
    "ReadyToStart" | "ReadyToStop" | "Working"
  >("ReadyToStart");
  const [receivedText, setReceivedText] = useState<string[]>([]);
  const realtimeStreaming = useRef<LowLevelRTClient | null>(null);
  const audioRecorder = useRef<Recorder | null>(null);
  const audioPlayer = useRef<Player | null>(null);
  const recordingActive = useRef(false);
  const buffer = useRef(new Uint8Array());

  const startRealtime = async () => {
    setFormState("Working");
    const endpoint = process.env.NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT!;
    const apiKey = process.env.NEXT_PUBLIC_AZURE_OPENAI_API_KEY!;
    const deploymentOrModel = "gpt-4o-realtime-preview";

    realtimeStreaming.current = new LowLevelRTClient(
      new URL(endpoint),
      { key: apiKey },
      { deployment: deploymentOrModel }
    );

    try {
      await realtimeStreaming.current.send(createConfigMessage());
      await resetAudio(true);
      await handleRealtimeMessages();
    } catch (error) {
      console.error("Connection error:", error);
      setFormState("ReadyToStart");
    }
  };

  const createConfigMessage = () => {
    const configMessage: SessionUpdateMessage = {
      type: "session.update",
      session: {
        turn_detection: { type: "server_vad" },
        input_audio_transcription: { model: "whisper-1" },
        voice: "alloy",
        instructions : "Always speak in the English"
      },
    };
    return configMessage;
  };

  const handleRealtimeMessages = async () => {
    if (!realtimeStreaming.current) return;
    for await (const message of realtimeStreaming.current.messages()) {
      switch (message.type) {
        case "session.created":
          setFormState("ReadyToStop");
          setReceivedText((prev) => [...prev, "<< Session Started >>"]);
          break;
        case "response.audio_transcript.delta":
          setReceivedText((prev) => [...prev, message.delta]);
          break;
        case "response.audio.delta":
          const binary = atob(message.delta);
          const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
          const pcmData = new Int16Array(bytes.buffer);
          audioPlayer.current?.play(pcmData);
          break;
        case "input_audio_buffer.speech_started":
          setReceivedText((prev) => [...prev, "<< Speech Started >>"]);
          audioPlayer.current?.clear();
          break;
        case "response.done":
          setReceivedText((prev) => [...prev, "<< Session Ended >>"]);
          break;
        case "conversation.item.input_audio_transcription.completed":
          setReceivedText((prev) => [...prev, "User: " + message.transcript]);
          break;
        default:
          console.log("Unhandled message:", JSON.stringify(message, null, 2));
          break;
      }
    }
    await resetAudio(false);
  };

  const processAudioRecordingBuffer = (data: Buffer) => {
    const uint8Array = new Uint8Array(data);
    combineArray(uint8Array);
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

  const combineArray = (newData: Uint8Array) => {
    const newBuffer = new Uint8Array(buffer.current.length + newData.length);
    newBuffer.set(buffer.current);
    newBuffer.set(newData, buffer.current.length);
    buffer.current = newBuffer;
  };

  const resetAudio = async (startRecording: boolean) => {
    recordingActive.current = false;
    audioRecorder.current?.stop();
    audioPlayer.current?.clear();
    audioRecorder.current = new Recorder(processAudioRecordingBuffer);
    audioPlayer.current = new Player();
    audioPlayer.current.init(24000);

    if (startRecording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioRecorder.current.start(stream);
      recordingActive.current = true;
    }
  };

  return (
    <div>
      {formState}
      <div className="space-x-4">
        <Button onClick={startRealtime} disabled={formState !== "ReadyToStart"}>
          Start Recording
        </Button>
        <Button
          onClick={() => {
            setFormState("ReadyToStart");
            resetAudio(false);
            setReceivedText([]);
          }}
          disabled={formState !== "ReadyToStop"}
        >
          Stop Recording
        </Button>
      </div>
      <div>
        {receivedText.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </div>
  );
}

export default RealtimeVoiceTranscription;