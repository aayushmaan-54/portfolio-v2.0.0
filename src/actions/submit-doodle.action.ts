/* eslint-disable prefer-const, @typescript-eslint/no-explicit-any */
"use server";
import { Client, Databases, ID } from "node-appwrite";
import { headers } from "next/headers";
import { SubmitDoodleActionResult } from "~/common/types/types";

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const DOODLES_COLLECTION_ID = process.env.APPWRITE_DOODLES_COLLECTION_ID!;



export default async function SubmitDoodleAction(
  formData: FormData
): Promise<SubmitDoodleActionResult> {
  const name = formData.get("name") as string;
  const message = formData.get("message") as string;
  const svgData = formData.get("svgData") as string;

  if (!svgData) {
    return { success: false, message: "Doodle SVG data is required." };
  }

  if (name && name.length > 20) {
    return { success: false, message: "Name must be 20 characters or less." };
  }

  if (message && message.length > 50) {
    return { success: false, message: "Message must be 50 characters or less." };
  }

  try {
    const headerList = await headers();
    const ipAddress =
      headerList.get("x-forwarded-for") ||
      headerList.get("x-real-ip") ||
      "N/A";

    const createdDocument = await databases.createDocument(
      DATABASE_ID,
      DOODLES_COLLECTION_ID,
      ID.unique(),
      {
        name: name || "Anonymous",
        message: message || "",
        svgData: svgData,
        createdAt: new Date().toISOString(),
        ipAddress: ipAddress,
      }
    );

    return {
      success: true,
      message: "Doodle submitted successfully!",
      data: createdDocument,
    };
  } catch (error: any) {
    console.error("Error submitting doodle:", error);
    return {
      success: false,
      message: error.message || "Failed to submit doodle. Please try again.",
    };
  }
}
