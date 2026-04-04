import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/** A module that registers one or more tools on the MCP server. */
export type ToolModule = (server: McpServer) => void;

/** Register an array of tool modules on the server. */
export function registerTools(
  server: McpServer,
  modules: ToolModule[],
): void {
  for (const register of modules) {
    register(server);
  }
}
