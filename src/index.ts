#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTools } from "./utils/register.js";

import registerIdentityTools from "./tools/identity.js";
import registerWalletTools from "./tools/wallet.js";
import registerTokenTools from "./tools/token.js";
import registerTransactionTools from "./tools/transaction.js";

const server = new McpServer({
  name: "mtrkr",
  version: "1.0.0",
});

registerTools(server, [
  registerIdentityTools,
  registerWalletTools,
  registerTokenTools,
  registerTransactionTools,
]);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MTRKR MCP server running on stdio");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
