import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchMtrkr, toolResult, ADDRESS_RE } from "../utils/fetch.js";

export default function registerTokenTools(server: McpServer): void {
  server.tool(
    "mtrkr_token_scan",
    "Scan an ERC-20 token on MegaETH for risk factors: contract analysis " +
      "(proxy detection, ownership status, bytecode size), liquidity depth, " +
      "DEX pool data, 24h activity (volume, buys/sells, price change), and " +
      "a domain-based risk score. Use this to evaluate whether a token is " +
      "safe to interact with.",
    {
      address: z
        .string()
        .regex(ADDRESS_RE)
        .describe("Token contract address (0x...)"),
    },
    async ({ address }) => {
      const data = await fetchMtrkr(`/api/v1/tokens/${address}/scan`);
      return toolResult(data);
    },
  );

  server.tool(
    "mtrkr_eth_price",
    "Get the current ETH/USD price on MegaETH. Uses RedStone on-chain " +
      "oracle when available, falls back to CoinGecko. Returns price, " +
      "source, and staleness indicator.",
    {},
    async () => {
      const data = await fetchMtrkr("/api/v1/price");
      return toolResult(data);
    },
  );
}
