const DEFAULT_BASE_URL = "";

function getBaseUrl() {
  return (process.env.REACT_APP_API_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/$/, "");
}

async function requestJson(path, options) {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${path}`;

  const init = {
    method: options.method,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  };

  if (options.body !== undefined) {
    init.body = JSON.stringify(options.body);
  }

  const res = await fetch(url, init);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} for ${url}${text ? `: ${text}` : ""}`);
  }

  // Some endpoints may return 204 No Content
  if (res.status === 204) {
    return undefined;
  }

  return await res.json();
}

export const apiClient = {
  get: (path, headers) => requestJson(path, { method: "GET", headers: headers ?? undefined }),
  post: (path, body, headers) =>
    requestJson(path, { method: "POST", body, headers: headers ?? undefined }),
  put: (path, body, headers) =>
    requestJson(path, { method: "PUT", body, headers: headers ?? undefined }),
  delete: (path, headers) => requestJson(path, { method: "DELETE", headers: headers ?? undefined }),
};
