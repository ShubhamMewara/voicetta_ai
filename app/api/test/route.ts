import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ message: "Hello World" });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json(); // Parse the JSON body of the request
    const message = data.message;
    return NextResponse.json({ message }); // Wrap the message in an object for a valid JSON response
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: 'An error occurred while processing your request' }, { status: 500 });
  }
}
