import { NextApiRequest, NextApiResponse } from "next";
import * as cookie from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { password } = req.body;
  const correctPassword = process.env.PASSWORD;

  if (password === correctPassword) {
    res.setHeader("Set-Cookie", `authenticated=true; Path=/; HttpOnly`);
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ success: false });
}
