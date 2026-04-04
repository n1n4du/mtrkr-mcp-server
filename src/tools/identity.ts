import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchMtrkr, toolResult } from "../utils/fetch.js";

/**
 * MegaNames (.mega) resolution tool.
 *
 * Uses the MTRKR API which wraps on-chain MegaNames contract resolution
 * (forward: `addr(tokenId)`, reverse: `getName(address)`) at
 * 0x5B424C6CCba77b32b9625a6fd5A30D409d20d997 on MegaETH mainnet.
 *
 * See: megaeth-ai-developer-skills/meganames.md
 */
export default function registerIdentityTools(server: McpServer): void {
  server.tool(
    "mtrkr_resolve_name",
    "Resolve a .mega name to a wallet address, or a wallet address to its " +
      "primary .mega name. Accepts either a .mega name (e.g. 'mirage.mega') " +
      "or a 0x address. Uses MegaNames on-chain contract resolution.",
    {
      input: z
        .string()
        .describe("A .mega name (e.g. 'mirage.mega') or 0x address to resolve"),
    },
    async ({ input }) => {
      const params = new URLSearchParams({ input });
      const data = await fetchMtrkr(`/api/v1/mega-names/resolve?${params}`);
      return toolResult(data);
    },
  );
}
