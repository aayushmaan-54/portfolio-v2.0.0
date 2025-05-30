"use server";
import { Client, Databases, Models, Query } from "node-appwrite";
import shuffleArray from "~/common/utils/shuffle-array";

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const DOODLES_COLLECTION_ID = process.env.APPWRITE_DOODLES_COLLECTION_ID!;



export async function getRandomDoodles(count: number = 10): Promise<Models.Document[]> {
  try {
    const fetchLimit = Math.max(count * 5, 100);
    const response = await databases.listDocuments(
      DATABASE_ID,
      DOODLES_COLLECTION_ID,
      [
        Query.limit(fetchLimit),
      ]
    );

    const shuffledDoodles = shuffleArray(response.documents) as Models.Document[];
    return shuffledDoodles.slice(0, count);
  } catch (error) {
    console.error('Error fetching random doodles:', error);
    return [];
  }
}
