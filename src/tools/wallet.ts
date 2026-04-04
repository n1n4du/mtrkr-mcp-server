import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchMtrkr, toolResult, ADDRESS_RE } from "../utils/fetch.js";

export default function registerWalletTools(server: McpServer): void {
  server.tool(
    "mtrkr_wallet_quick_stats",
    "Get a quick summary of wallet activity on MegaETH: transaction counts " +
      "(in/out/total) over a configurable time range. Lightweight and fast — " +
      "use this when you only need counts, not full analytics.",
    {
      address: z
        .string()
        .regex(ADDRESS_RE)
        .describe("Wallet address (0x...)"),
      rangeDays: z
        .number()
        .min(1)
        .max(365)
        .default(30)
        .describe("Number of days to look back (default 30)"),
    },
    async ({ address, rangeDays }) => {
      const params = new URLSearchParams({
        mode: "overview",
        rangeDays: String(rangeDays),
      });
      const data = await fetchMtrkr(
        `/api/v1/wallets/${address}/stats/quick?${params}`,
      );
      return toolResult(data);
    },
  );

  server.tool(
    "mtrkr_security_scan",
    "Scan a wallet for open ERC-20 token approvals and NFT operator " +
      "permissions on MegaETH. Returns each approval with risk level " +
      "(safe/warning/critical), spender identification, and allowance " +
      "amounts. Uses full historical indexing so no approvals are missed.",
    {
      address: z
        .string()
        .regex(ADDRESS_RE)
        .describe("Wallet address to scan (0x...)"),
    },
    async ({ address }) => {
      const data = await fetchMtrkr(`/api/v1/wallets/${address}/security`);
      return toolResult(data);
    },
  );
}
