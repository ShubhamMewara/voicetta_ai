"use server";
import axios from "axios";
import { Conversations, WebCall } from "./types";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function assistantList() {
  try {
    const session = await getServerSession(authOptions);
    //@ts-ignore
    const private_key = session?.user?.private;
    const response: Conversations = (
      await axios.get("https://api.vapi.ai/assistant", {
        headers: { Authorization: "Bearer " + private_key },
      })
    ).data;
    return response;
  } catch (error) {
    console.error("Error fetching assistants:", error);
    return [];
  }
}

export async function getAllCalls() {
  try {
    const session = await getServerSession(authOptions);
    //@ts-ignore
    const private_key = session?.user?.private;
    const response: WebCall[] = (
      await axios.get("https://api.vapi.ai/call", {
        headers: { Authorization: "Bearer " + private_key },
      })
    ).data;

    return response;
  } catch (error) {
    console.error("Error fetching calls:", error);
    return [];
  }
}

export async function getPhone() {
  try {
    const session = await getServerSession(authOptions);
    //@ts-ignore
    const private_key = session?.user?.private;
    const response = (
      await axios.get("https://api.vapi.ai/phone-number", {
        headers: { Authorization: "Bearer " + private_key },
      })
    ).data;
    return response;
  } catch (error) {
    console.error("Error fetching phone number:", error);
    return [];
  }
}