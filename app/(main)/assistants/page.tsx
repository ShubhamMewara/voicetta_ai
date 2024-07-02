import VapiAssistant from "@/components/VapiAssistant";
import { assistantList } from "@/lib/actions";

const Assistants = async () => {
  const assistants = await assistantList();

  return (
    <div className="flex flex-col bg-[#0e0e0e] overflow-y-auto h-[100vh]">
      <main className="flex-1 bg-[#ffffff07] text-white p-8 m-8 rounded-2xl mr-5">
        <div className="container mx-auto px-4 ">
          <h1 className="text-3xl font-bold mb-8">Voice Assistants</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {assistants.map((assistant) => (
              <div key={assistant.id}>
                <div className="bg-[#ffffff08] hover:bg-[#ffffff0e] duration-200 border border-white/5 rounded-2xl shadow-lg shadow-black/10 p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      {assistant.name}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      ID: {assistant.id}
                    </p>
                  </div>
                  <VapiAssistant vapiId={assistant.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Assistants;
