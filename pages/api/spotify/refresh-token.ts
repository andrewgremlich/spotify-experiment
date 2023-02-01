import { NextApiRequest, NextApiResponse } from "next";
import fetch from "isomorphic-unfetch";

import { extractObjectFromCookies } from "@/lib/extractFromCookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies: {
    spotify_refresh_token?: string;
  } = req.headers.cookie ? extractObjectFromCookies(req.headers.cookie) : {};

  const refreshToken: string = cookies.spotify_refresh_token ?? "";

  const formOptions = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken ?? "",
  });

  try {
    const spotifyResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formOptions.toString(),
      }
    );
    const spotifyData = await spotifyResponse.json();

    res.setHeader("Set-Cookie", [
      `spotify_access_token=${spotifyData.access_token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${spotifyData.expires_in}`,
    ]);

    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};
