import { NextApiRequest, NextApiResponse } from "next";

import { extractObjectFromCookies } from "@/lib/extractFromCookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies: {
    spotify_access_token?: string;
  } = req.headers.cookie ? extractObjectFromCookies(req.headers.cookie) : {};
  const spotifyAccessToken = cookies?.spotify_access_token;

  if (spotifyAccessToken) {
    res.status(200).json({ spotifyAccessToken });
  } else {
    res.status(400).json({ error: "No access token found" });
  }
};
