import { NextApiRequest, NextApiResponse } from 'next';
import * as cookie from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = cookie.parse(req.headers.cookie || '');

    if (cookies.authToken === 'authenticated') {
        return res.status(200).json({ authenticated: true });
    } else {
        return res.status(401).json({ authenticated: false });
    }
}