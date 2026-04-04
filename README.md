# MTRKR MCP Server

MCP server that gives AI agents access to [MTRKR](https://mtrkr.xyz) wallet intelligence on [MegaETH](https://megaeth.com) — a real-time Ethereum L2. Scan tokens, check approvals, decode transactions, resolve .mega names, and more. Read-only — no wallet actions or signing.

## Quick Start

Add to your MCP config and you're done. No cloning, no building.

### Cursor

Add to `.cursor/mcp.json` (project-level) or global MCP settings:

```json
{
  "mcpServers": {
    "mtrkr": {
      "command": "npx",
      "args": ["mtrkr-mcp-server"]
    }
  }
}
```

### Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "mtrkr": {
      "command": "npx",
      "args": ["mtrkr-mcp-server"]
    }
  }
}
```

## Tools

| Tool | Ask your agent... | What it returns |
|------|-------------------|-----------------|
| `mtrkr_resolve_name` | "What address is mirage.mega?" | Resolves .mega names to addresses (and reverse) via on-chain MegaNames contract |
| `mtrkr_wallet_quick_stats` | "How active is 0x1234...abcd over the last 90 days?" | Transaction counts (in/out/total) over a configurable time range |
| `mtrkr_token_scan` | "Is token 0x021e...782B safe?" | Contract analysis, liquidity depth, DEX data, 24h activity, risk scoring |
| `mtrkr_security_scan` | "Does mirage.mega have risky approvals?" | Open ERC-20 approvals + NFT operators with risk levels (safe/warning/critical) |
| `mtrkr_decode_transaction` | "What did transaction 0xf9b5...3e2a do?" | Method name, decoded params, token transfers, emitted events |
| `mtrkr_eth_price` | "What's the ETH price on MegaETH?" | ETH/USD from RedStone on-chain oracle (CoinGecko fallback) |

---

## Development

Everything below is for contributors and developers building on the MCP server.

### Prerequisites

- Node.js 20+

### Build

```bash
git clone https://github.com/user/mtrkr-mcp-server
cd mtrkr-mcp-server
npm install
npm run build
```

### Test

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `MTRKR_API_URL` | `https://mtrkr.xyz` | Base URL of the MTRKR API |

### Project Structure

```
src/
├── index.ts              # Server setup + stdio transport
├── tools/
│   ├── identity.ts       # mtrkr_resolve_name
│   ├── wallet.ts         # mtrkr_wallet_quick_stats, mtrkr_security_scan
│   ├── token.ts          # mtrkr_token_scan, mtrkr_eth_price
│   └── transaction.ts    # mtrkr_decode_transaction
└── utils/
    ├── fetch.ts          # Shared HTTP helper (error-as-data pattern)
    └── register.ts       # Tool module registration
```

