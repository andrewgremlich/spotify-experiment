import { NextApiRequest, NextApiResponse } from "next";
import fetch from "isomorphic-unfetch";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect(`/#${new URLSearchParams({ error: "state_mismatch" })}`);
  } else {
    const formOptions = new URLSearchParams({
      code: code?.toString() ?? "",
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI ?? "",
      grant_type: "authorization_code",
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
        `spotify_refresh_token=${spotifyData.refresh_token}; HttpOnly; SameSite=Lax; Path=/;`,
      ]);

      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  }
};
