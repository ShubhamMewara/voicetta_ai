import CurvedlineChart from "@/components/Chart";

export default function DashBoardPage() {
  return (
    <div className="flex flex-col bg-[#0e0e0e] min-h-screen">
      <main className="flex-1 bg-[#ffffff07] text-white p-8 m-8 rounded-2xl mr-5">
        <h2 className="text-2xl font-bold mb-8">Overview</h2>
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-[#ffffff07] border border-white/5 rounded-2xl shadow-lg shadow-black/10 flex flex-col justify-between flex-1 min-w-[300px] p-4 pt-1">
            <div className="p-4 border-b border-white/10 mb-2">
              <h3 className="text-lg font-semibold mb-2">Total Minutes</h3>
              <p className="text-sm text-gray-400z">
                {"The total number of minutes you've used each day."}
              </p>
            </div>
            <CurvedlineChart className="w-full h-64" />
          </div>
          <div className="bg-[#ffffff07] border border-white/5 rounded-2xl shadow-lg shadow-black/10 flex flex-col justify-between flex-1 min-w-[300px] p-4 pt-1">
            <div className="p-4 border-b border-white/10 mb-2">
              <h3 className="text-lg font-semibold mb-2">Call Count</h3>
              <p className="text-sm text-gray-400">
                {"How many calls you've made each day."}
              </p>
            </div>
            <CurvedlineChart className="w-full h-64" />
          </div>
          <div className="bg-[#ffffff07] border border-white/5 rounded-2xl shadow-lg shadow-black/10 flex flex-col justify-between flex-1 min-w-[300px] p-4 pt-1">
            <div className="p-4 border-b border-white/10 mb-2">
              <h3 className="text-lg font-semibold mb-2">
                Average Call Duration
              </h3>
              <p className="text-sm text-gray-400">
                How long your calls are on average.
              </p>
            </div>
            <CurvedlineChart className="w-full h-64" />
          </div>
          <div className="bg-[#ffffff07] border border-white/5 rounded-2xl shadow-lg shadow-black/10 flex flex-col justify-between flex-1 min-w-[300px] p-4 pt-1">
            <div className="p-4 border-b border-white/10 mb-2">
              <h3 className="text-lg font-semibold mb-2">Daily Spend</h3>
              <p className="text-sm text-gray-400">
                {"How much you've spent across all your calls."}
              </p>
            </div>
            <CurvedlineChart className="w-full h-64" />
          </div>
        </div>
      </main>
    </div>
  );
}
