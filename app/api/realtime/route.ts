import { ServerMessageType } from "rt-client";
import WebSocket from "ws";
import { Buffer } from "buffer";

export function SOCKET(
  client: WebSocket,
  request: import("http").IncomingMessage,
  server: import("ws").WebSocketServer
) {
  console.warn("A client connected");

  const aoaiEndpointOverride = process.env.NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT;
  const aoaiApiKeyOverride = process.env.NEXT_PUBLIC_AZURE_OPENAI_API_KEY;
  const aoaiModelOverride =
    process.env.AZURE_OPENAI_MODEL || "gpt-4o-realtime-preview";

  const azureEndpoint = `${aoaiEndpointOverride}/openai/realtime?api-key=${aoaiApiKeyOverride}&deployment=${aoaiModelOverride}&api-version=2024-10-01-preview`;

  const azureConnection = new WebSocket(azureEndpoint);

  azureConnection.on("open", () => {
    console.log("Connected to Azure WebSocket");
  });

  azureConnection.on("error", (error) => {
    console.error("Azure WebSocket error:", error);
  });

  azureConnection.on("close", () => {
    console.log("Azure WebSocket connection closed");
  });

  client.on("message", (message: WebSocket.Data) => {
    try {
      const messageStr =
        message instanceof Buffer ? message.toString() : message;
      const parsedMessage =
        typeof messageStr === "string" ? JSON.parse(messageStr) : messageStr;
      azureConnection.send(JSON.stringify(parsedMessage));
    } catch (error) {
      console.error("Error processing client message:", error);
      client.send(
        JSON.stringify({ type: "error", message: "Invalid message format" })
      );
    }
  });

  azureConnection.on("message", (message: WebSocket.Data) => {
    console.log("Received message from Azure:", message);
    try {
      const messageStr =
        message instanceof Buffer ? message.toString() : message;
      const parsedMessage =
        typeof messageStr === "string" ? JSON.parse(messageStr) : messageStr;
      client.send(JSON.stringify(parsedMessage));
    } catch (error) {
      console.error("Error processing Azure message:", error);
      client.send(
        JSON.stringify({
          type: "error",
          message: "Error processing server response",
        })
      );
    }
  });

  client.on("close", () => {
    console.warn("A client disconnected");
    azureConnection.close();
  });

  client.on("error", (error) => {
    console.error("Client WebSocket error:", error);
    try {
      client.send(
        JSON.stringify({ type: "error", message: "WebSocket error occurred" })
      );
    } catch (e) {
      console.error("Failed to send error message to client:", e);
    }
  });
}
