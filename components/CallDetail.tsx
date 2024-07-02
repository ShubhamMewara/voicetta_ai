import { WebCall } from "@/lib/types";

const CallDetail = ({ call }: { call: WebCall | null }) => {
  if (!call) {
    return (
      <div className="text-center text-gray-500">
        <p>Select a call to view details</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1e1e1e] p-6 rounded-2xl flex flex-col space-y-4">
      <h2 className="text-xl font-semibold">Call Details</h2>
      <div>
        <h3 className="text-lg font-semibold">Recording</h3>
        <audio controls src={call.recordingUrl}></audio>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Transcript</h3>
        <ul className="space-y-4">
          {call.messages?.slice(1).map((msg, index) => (
            <li key={index} className="text-sm">
              <p className="font-bold capitalize ">{msg.role}</p> {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CallDetail;
