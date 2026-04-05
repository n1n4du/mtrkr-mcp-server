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

### mtrkr_resolve_name

Resolve a .mega name to a wallet address, or a wallet address to its primary .mega name. Uses MegaNames on-chain contract resolution.

**Try asking:**
- "What address is mirage.mega?"
- "Does 0x1234...abcd have a .mega name?"
- "Resolve mirage.mega"

### mtrkr_wallet_quick_stats

Get a quick summary of wallet activity on MegaETH: transaction counts (in/out/total) over a configurable time range (1-365 days).

**Try asking:**
- "How active is 0x1234...abcd over the last 90 days?"
- "How many transactions has mirage.mega sent this week?"
- "Compare inbound vs outbound tx count for 0xdead...beef in the last 30 days"

### mtrkr_token_scan

Comprehensive ERC-20 token risk analysis across 5 domains: control, exit, liquidity, economic, and integrity.

**The scan includes:**
- **Verdict** — risk score (0-100), overall risk level, recommendation (avoid/caution/low_risk), and a one-sentence tldr
- **Sell simulation** — can you actually sell this token? Detects blocked transfer paths and honeypot behavior
- **Admin powers** — mint, pause, blacklist, fee-setting, ownership transfer capabilities
- **Proxy analysis** — upgrade pattern detection (EIP-1967/1167), implementation address, upgradeability risk
- **Holder concentration** — top 10 holders with percentages, pool/owner flags
- **Curation status** — MegaETH Foundation curated token list membership
- **Source verification** — Blockscout verified source code, contract name, compiler version
- **Trading activity** — 24h buy/sell counts, USD volume, price change
- **Pricing** — current price, market cap, FDV, liquidity depth
- **Findings** — individual risk factors with severity, confidence, domain, and evidence

**Try asking:**
- "Is token 0x021e...782B safe to buy?"
- "Can I sell 0xabcd...1234? Check for honeypot"
- "What are the risk factors for 0xdead...beef?"
- "Who are the top holders of 0x021e...782B?"
- "Does 0xabcd...1234 have admin mint or pause powers?"
- "Is 0xdead...beef on the MegaETH curated token list?"

### mtrkr_security_scan

Scan a wallet for open ERC-20 token approvals and NFT operator permissions. Returns each approval with risk level (safe/warning/critical), spender identification, and allowance amounts. Uses full historical indexing so no approvals are missed.

**Try asking:**
- "Does mirage.mega have risky approvals?"
- "List all infinite approvals for 0x1234...abcd"
- "Are there any critical-risk token approvals on 0xdead...beef?"
- "How many unknown spenders does this wallet have approved?"

### mtrkr_decode_transaction

Decode a MegaETH transaction into human-readable format: method name, decoded parameters, token transfers, emitted events, and contract info. Works for both recent and historical transactions.

**Try asking:**
- "What did transaction 0xf9b5...3e2a do?"
- "Decode 0xabcd...1234 — was it a swap?"
- "Show me the token transfers in tx 0xdead...beef"
- "What method was called in transaction 0x9876...5432?"

### mtrkr_eth_price

Get the current ETH/USD price on MegaETH. Uses RedStone on-chain oracle when available, falls back to CoinGecko.

**Try asking:**
- "What's the current ETH price on MegaETH?"
- "ETH price?"
- "How much is 5 ETH worth in USD right now?"

---

## Development

Everything below is for contributors and developers building on the MCP server.

### Prerequisites

- Node.js 20+

### Build

```bash
git clone https://github.com/n1n4du/mtrkr-mcp-server
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


