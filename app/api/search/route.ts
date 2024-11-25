import { NextRequest, NextResponse } from "next/server";
import { AzureKeyCredential, SearchClient } from "@azure/search-documents";

export async function POST(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("query");
    const country = req.geo?.country;
    if (!query) throw new Error("Query parameter is required");

    const searchClient = new SearchClient(
      process.env.AZURE_SEARCH_ENDPOINT!,
      process.env.AZURE_SEARCH_INDEX!,
      new AzureKeyCredential(process.env.AZURE_SEARCH_API_KEY!)
    );
    const searchResults = await searchClient.search(query, {
      queryType: "simple",
      top: 5,
    });

    return NextResponse.json(searchResults);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
