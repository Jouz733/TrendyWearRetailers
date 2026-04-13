import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'; 

type ResponseData = { message: string }
 
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const body = req.body;
  const raw = body.message;
  const jsonString = raw.replace("Received data: ", "");
  const data = JSON.parse(jsonString);

  const amount = data.data.amount;
  const metadata = data.data.metadata.user_id || "No User ID in metadata";


  return res.status(200).json({ message: `Received data: [Amount: ${amount}, User ID: ${metadata}]` });
}