import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@/utils/supabase/server'  // ✅ Use server, not client

type ResponseData = { message: string }
 
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const supabase = await createClient();
    const body = req.body;

    return res.status(200).json({ message: `Received data: ${JSON.stringify(body)}` });
}