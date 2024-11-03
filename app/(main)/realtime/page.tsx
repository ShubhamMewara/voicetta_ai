import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RealtimeVoiceTranscription from "@/components/VoiceGPT";

export default function DashBoardPage() {
  return (
    <div className="flex flex-col bg-[#0e0e0e] overflow-y-auto h-[100vh]">
      <main className="flex-1 bg-[#ffffff07] text-white p-8 m-8 rounded-2xl mr-5">
        <h2 className="text-2xl font-bold mb-8">Overview</h2>
        <Card className="w-96 h-32 bg-[#ffffff07] border-none">
        <CardHeader>
        <CardTitle className="text-white">GPT-4o Interaction</CardTitle>
        <CardDescription>Start</CardDescription>
      </CardHeader>
        </Card>
      </main>
    </div>
  );
}
