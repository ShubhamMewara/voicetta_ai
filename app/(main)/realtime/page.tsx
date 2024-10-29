import RealtimeVoiceTranscription from "@/components/VoiceGPT";

export default function DashBoardPage() {
  return (
    <div className="flex flex-col bg-[#0e0e0e] overflow-y-auto h-[100vh]">
      <main className="flex-1 bg-[#ffffff07] text-white p-8 m-8 rounded-2xl mr-5">
        <h2 className="text-2xl font-bold mb-8">Overview</h2>
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-[#ffffff07] border border-white/5 rounded-2xl shadow-lg shadow-black/10 flex flex-col justify-between flex-1 min-w-[300px] p-4 pt-1">
            <h1>GPT-4 Voice Interaction</h1>
            <RealtimeVoiceTranscription />
          </div>
        </div>
      </main>
    </div>
  );
}
