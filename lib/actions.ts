"use server";
import axios from "axios";
import { Conversations, WebCall } from "./types";
import prisma from "@/prisma";
import bcrypt from "bcrypt";
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

export async function createUser({
  name,
  email,
  password,
  private_key,
  public_key,
  multiFactor,
}: {
  name: string;
  email: string;
  password: string;
  private_key: string;
  public_key: string;
  multiFactor: string;
}) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      PRIVATE_KEY: private_key,
      PUBLIC_KEY: public_key,
      multiFactor
    },
  });
}
