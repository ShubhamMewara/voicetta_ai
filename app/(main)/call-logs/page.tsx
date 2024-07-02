"use client";
import CallDetail from "@/components/CallDetail";
import { getAllCalls } from "@/lib/actions";
import { WebCall } from "@/lib/types";
import { useEffect, useState } from "react";

const CallLogs = () => {
  const [callLogs, setCallLogs] = useState<WebCall[]>([]);
  const [selectedCall, setSelectedCall] = useState<WebCall | null>(null);

  useEffect(() => {
    const fetchCalls = async () => {
      const calls = await getAllCalls();
      setCallLogs(calls);
    };
    fetchCalls();
  }, []);
  return (
    <div className="flex flex-col bg-[#0e0e0e] overflow-y-auto h-screen">
      <main className="flex-1 bg-[#ffffff07] text-white p-8 m-8 rounded-2xl mr-5">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Call Logs</h1>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-4">
              {callLogs.map((call) => (
                <div
                  key={call.id}
                  className="bg-[#ffffff08] hover:bg-[#ffffff0e] duration-200 border border-white/5 rounded-2xl shadow-lg shadow-black/10 p-6 flex flex-col justify-between cursor-pointer"
                  onClick={() => setSelectedCall(call)}
                >
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      Cost: ${call.cost.toFixed(2)}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Type: {call.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm">
                      Started at: {new Date(call.startedAt).toLocaleString()}
                    </p>
                    <p className="text-sm">
                      Ended at: {new Date(call.endedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-2">
              <CallDetail call={selectedCall} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CallLogs;
