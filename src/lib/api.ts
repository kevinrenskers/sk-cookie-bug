type Fetch = (
  info: RequestInfo,
  init?: RequestInit | undefined
) => Promise<Response>;

async function send<T>({
  method,
  fetch,
  url,
  body,
}: {
  method: string;
  fetch: Fetch;
  url: string;
  body?: string;
}): Promise<T> {
  const config: RequestInit = { method };
  const headers: Record<string, string> = {};

  if (body) {
    headers["Content-Type"] = "application/json";
    config.body = body;
  }

  config.headers = headers;

  console.log(`Making ${method} request to ${url}`);
  const request = new Request(url, config);

  const response = await fetch(request);
  const result = await response.json();
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
