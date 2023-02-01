// Generate a typescript function that extracts an object from cookies. It should have a generic type that takes an object with string keys and string values. It should return an object with the same keys and values.
export function extractObjectFromCookies<T extends { [key: string]: string }>(
  cookies: string
): T {
  const cookieKeyValuePairs = cookies
    .split(";")
    .map((cookie) => cookie.trim().split("="));
  const cookieObject: { [key: string]: string } = {};
  cookieKeyValuePairs.forEach((pair) => {
    cookieObject[pair[0]] = pair[1];
  });
  return cookieObject as T;
}
