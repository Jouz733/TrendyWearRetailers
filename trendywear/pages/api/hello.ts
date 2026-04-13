import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'; 

type ResponseData = { message: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Check if body exists
    if (!req.body) {
      return res.status(400).json({ message: "No request body received" });
    }

    const body = req.body;

    // Check if message exists
    if (!body.message || typeof body.message !== "string") {
      return res.status(400).json({ message: "Invalid or missing 'message' field" });
    }

    const raw = body.message;

    // Check prefix safely
    if (!raw.startsWith("Received data: ")) {
      return res.status(400).json({ message: "Unexpected message format" });
    }

    const jsonString = raw.replace("Received data: ", "");

    let data;

    // Safe JSON parsing
    try {
      data = JSON.parse(jsonString);
    } catch (err) {
      return res.status(400).json({ message: "Invalid JSON format" });
    }

    // Safe extraction using optional chaining
    const amount = data?.data?.amount ?? "No amount found";
    const userId =
      data?.data?.metadata?.user_id ?? "No User ID in metadata";

    return res.status(200).json({
      message: `Received data: [Amount: ${amount}, User ID: ${userId}]`
    });

  } catch (error) {
    console.error("Handler error:", error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}