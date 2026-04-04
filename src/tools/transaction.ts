import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchMtrkr, toolResult } from "../utils/fetch.js";

export default function registerTransactionTools(server: McpServer): void {
  server.tool(
    "mtrkr_decode_transaction",
    "Decode a MegaETH transaction into human-readable format: method name, " +
      "decoded parameters, token transfers, emitted events, and contract " +
      "info. Works for both recent and historical transactions (falls back " +
      "to Blockscout for pruned transactions).",
    {
      hash: z
        .string()
        .regex(/^0x[a-fA-F0-9]{64}$/)
        .describe("Transaction hash (0x...)"),
    },
    async ({ hash }) => {
      const data = await fetchMtrkr(`/api/v1/transactions/${hash}/decode`);
      return toolResult(data);
    },
  );
}
