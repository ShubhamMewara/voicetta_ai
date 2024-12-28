import { attachRagTools } from "@/lib/ragtools";
import { RTMiddleTier } from "@/lib/rtmt";
import { AzureKeyCredential } from "@azure/core-auth";
import { DefaultAzureCredential, TokenCredential } from "@azure/identity";
import WebSocket from "ws";

export function SOCKET(
  client: WebSocket,
  request: import("http").IncomingMessage,
  server: import("ws").WebSocketServer
) {
  console.warn("A client connected");
  const llmKey = process.env.NEXT_PUBLIC_AZURE_OPENAI_API_KEY;
  const searchKey = process.env.AZURE_SEARCH_API_KEY;

  let credential: TokenCredential | AzureKeyCredential | null = null;
  if (!llmKey || !searchKey) {
    credential = new DefaultAzureCredential();
  }
  const llmCredential = llmKey
    ? new AzureKeyCredential(llmKey)
    : (credential as TokenCredential);
  const searchCredential = searchKey
    ? new AzureKeyCredential(searchKey)
    : (credential as TokenCredential);

  const rtmt = new RTMiddleTier(
    process.env.NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT!,
    process.env.AZURE_OPENAI_REALTIME_DEPLOYMENT!,
    llmCredential,
    process.env.AZURE_OPENAI_REALTIME_VOICE_CHOICE || "alloy"
  );
  console.log("RTMT created");
  // rtmt.system_message = "You are a helpful assistant. Only answer questions in English based on information you searched in the knowledge base, accessible with the 'search' tool. "
  rtmt.system_message =
    "You are a helpful assistant. Only answer questions based on information you searched in the knowledge base, accessible with the 'search' tool. " +
    "The user is listening to answers with audio, so it's *super* impor   tant that answers are as short as possible, a single sentence if at all possible. " +
    "Never read file names or source names or keys out loud. " +
    "Always use the following step-by-step instructions to respond: \n" +
    "1. Always use the 'search' tool to check the knowledge base before answering a question. \n" +
    "2. Always use the 'report_grounding' tool to report the source of information from the knowledge base. \n" +
    "3. Produce an answer that's as short as possible. If the answer isn't in the knowledge base, say you don't know.";

  attachRagTools(
    rtmt,
    searchCredential,
    process.env.AZURE_SEARCH_ENDPOINT!,
    process.env.AZURE_SEARCH_INDEX!,
    process.env.AZURE_SEARCH_SEMANTIC_CONFIGURATION || "default",
    process.env.AZURE_SEARCH_IDENTIFIER_FIELD || "chunk_id",
    process.env.AZURE_SEARCH_CONTENT_FIELD || "chunk",
    process.env.AZURE_SEARCH_EMBEDDING_FIELD || "text_vector",
    process.env.AZURE_SEARCH_TITLE_FIELD || "title",
    process.env.AZURE_SEARCH_USE_VECTOR_QUERY === "true"
  );
  console.log("RAG tools attached");
  rtmt.attachToApp(client);
}
