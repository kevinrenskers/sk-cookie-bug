type Fetch = (
  info: RequestInfo,
  init?: RequestInit | undefined
) => Promise<Response>;

async function send<T>({
  method,
  fetch,
  url,
  body,
  token,
  searchParams,
}: {
  method: string;
  fetch: Fetch;
  url: string;
  body?: string;
  token?: string;
  searchParams?: Record<string, string>;
}): Promise<T> {
  const config: RequestInit = { method };
  const headers: Record<string, string> = {};

  if (body) {
    headers["Content-Type"] = "application/json";
    config.body = body;
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  config.headers = headers;

  console.log(`Making ${method} request to ${url}`);
  const request = new Request(
    url + "?" + new URLSearchParams(searchParams),
    config
  );
  const response = await fetch(request);

  const text = await response.text();

  let result;
  try {
    result = JSON.parse(text);
  } catch (err) {
    result = text;
  }

  // API error, retrieve the error message from the result
  if (!response.ok) {
    let reason: string | undefined = result.reason;
    let errorsObject;

    if (!reason) {
      let reasons = [];

      if (Array.isArray(result)) {
        reasons = result;
      } else if (typeof result === "object") {
        errorsObject = result;
        for (const key in result) {
          reasons.push(`${key}: ${result[key]}`);
        }
      }

      reason = reasons.join("\n\n");
    }

    throw {
      status: response.status,
      message: reason || "Error when talking to the server. Please try again.",
      errors: errorsObject,
    };
  }

  // All good!
  return result;
}

export function postLocal<T>(
  fetch: Fetch,
  path: string,
  data: object = {}
): Promise<T> {
  const body = JSON.stringify(data);
  return send<T>({ method: "POST", fetch, url: path, body });
}
