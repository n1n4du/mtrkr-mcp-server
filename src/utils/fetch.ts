export const MTRKR_BASE_URL =
  process.env.MTRKR_API_URL || "https://mtrkr.xyz";

export const ADDRESS_RE = /^0x[a-fA-F0-9]{40}$/;

const REQUEST_TIMEOUT_MS = 15_000;

export interface MtrkrError {
  error: string;
  path: string;
}

export function isMtrkrError(data: unknown): data is MtrkrError {
  return (
    typeof data === "object" &&
    data !== null &&
    "error" in data &&
    typeof (data as MtrkrError).error === "string"
  );
}

/**
 * Fetch a JSON payload from the MTRKR API.
 *
 * Returns parsed JSON on success, or an `MtrkrError` on failure
 * so AI agents always receive a structured response instead of an exception.
 */
export async function fetchMtrkr(path: string): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(`${MTRKR_BASE_URL}${path}`, {
      headers: { accept: "application/json" },
      signal: controller.signal,
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { error: `MTRKR API ${res.status}: ${body.slice(0, 200)}`, path } satisfies MtrkrError;
    }

    return await res.json();
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return { error: "Request timed out after 15s", path } satisfies MtrkrError;
    }
    return { error: String(err), path } satisfies MtrkrError;
  } finally {
    clearTimeout(timeout);
  }
}

/** Format fetchMtrkr result as an MCP tool response, setting isError when appropriate. */
export function toolResult(data: unknown) {
  const text = JSON.stringify(data, null, 2);
  if (isMtrkrError(data)) {
    return { content: [{ type: "text" as const, text }], isError: true };
  }
  return { content: [{ type: "text" as const, text }] };
}
