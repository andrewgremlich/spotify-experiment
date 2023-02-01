import { NextApiRequest, NextApiResponse } from "next";

const generateRandomString = function (length: number) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  let scope = "streaming user-read-email user-read-private";
  let state = generateRandomString(16);
  let authQueryParameters = new URLSearchParams({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID ?? "",
    scope: scope,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI ?? "",
    state: state,
  });

  res.redirect(
    `https://accounts.spotify.com/authorize?${authQueryParameters.toString()}`,
  );
};