/* eslint-disable prefer-const, @typescript-eslint/no-explicit-any */
'use server';
import { Client, Databases } from 'node-appwrite';
import { IncrementHeartActionResult } from '~/common/types/types';

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const LIKES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_LIKES_COLLECTION_ID!;
const LIKES_DOCUMENT_ID = process.env.NEXT_PUBLIC_APPWRITE_LIKES_DOCUMENT_ID!;



export default async function incrementHeartAction(): Promise<IncrementHeartActionResult> {
  try {
    const currentDocument = await databases.getDocument(
      DATABASE_ID,
      LIKES_COLLECTION_ID,
      LIKES_DOCUMENT_ID
    );

    const currentHeartCount = (currentDocument.heart_count as number) || 0;
    const newHeartCount = currentHeartCount + 1;

    const updatedDocument = await databases.updateDocument(
      DATABASE_ID,
      LIKES_COLLECTION_ID,
      LIKES_DOCUMENT_ID,
      { heart_count: newHeartCount }
    );

    return {
      success: true,
      newHeartCount: updatedDocument.heart_count as number,
    };
  } catch (error: any) {
    console.error(`Error incrementing global heart count:`, error);
    return {
      success: false,
      message: error.message || 'Failed to increment global heart count.'
    };
  }
}
