# MTRKR MCP Server

MCP server that gives AI agents access to [MTRKR](https://mtrkr.xyz) wallet intelligence on [MegaETH](https://megaeth.com) — a real-time Ethereum L2. 11 tools covering token portfolios, NFT holdings, DeFi positions (Kumbaya, Prism), token risk scanning, approval checking, address inspection, transaction decoding, .mega name resolution, and pricing. Read-only — no wallet actions or signing.

All wallet tools accept `.mega` names (e.g. `mirage.mega`) in addition to `0x` addresses — names are resolved automatically.

## Quick Start

Add to your MCP config and you're done. No cloning, no building.

### Cursor

Add to `.cursor/mcp.json` (project-level) or global MCP settings:

```json
{
  "mcpServers": {
    "mtrkr": {
      "command": "npx",
      "args": ["mtrkr-mcp-server@1.1.0"]
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
      "args": ["mtrkr-mcp-server@1.1.0"]
    }
  }
}
```

## Tools

### Identity

#### mtrkr_resolve_name

Resolve a .mega name to a wallet address, or a wallet address to its primary .mega name. Uses MegaNames on-chain contract resolution.

**Try asking:**
- "What address is mirage.mega?"
- "Does 0x1234...abcd have a .mega name?"
- "Resolve mirage.mega"

### Wallet Portfolio

#### mtrkr_wallet_tokens

Discover all ERC-20 tokens held by a wallet with balances, USD pricing, and metadata. Uses hybrid discovery (token list multicall + RPC transfer log scanning) so newly received tokens are found even if not on the default token list.

**Try asking:**
- "What tokens does mirage.mega hold?"
- "Show me the token portfolio for 0x1234...abcd"
- "What's the total USD value of 0xdead...beef's tokens?"
- "Does this wallet hold any USDM?"

#### mtrkr_wallet_nfts

Get NFTs held by a wallet on MegaETH (ERC-721, ERC-1155, ERC-404). Merges data from Blockscout, OpenSea, badge NFTs, and on-chain enumeration. Returns up to 25 items sorted by floor price with name, collection, image, token type, and attributes.

**Try asking:**
- "What NFTs does mirage.mega own?"
- "Show me the NFT collection for 0x1234...abcd"
- "Does this wallet hold any Fluffle NFTs?"
- "What's the floor price of the NFTs in 0xdead...beef?"

#### mtrkr_wallet_quick_stats

Get a quick summary of wallet activity on MegaETH: transaction counts (in/out/total) over a configurable time range (1-365 days).

**Try asking:**
- "How active is 0x1234...abcd over the last 90 days?"
- "How many transactions has mirage.mega sent this week?"
- "Compare inbound vs outbound tx count for 0xdead...beef in the last 30 days"

### DeFi Positions

#### mtrkr_lp_positions

Get active LP positions on Kumbaya DEX. Returns token pairs, tick ranges, liquidity, unclaimed fees, and USD valuations. Closed zero-value positions are excluded. Uses indexer with automatic RPC fallback.

**Try asking:**
- "What LP positions does mirage.mega have on Kumbaya?"
- "How much liquidity does this wallet provide on Kumbaya?"
- "What fees has 0xdead...beef earned from Kumbaya pools?"

#### mtrkr_prism_positions

Get concentrated-liquidity LP positions on Prism DEX. Fetches directly from the Prism NFT Position Manager on-chain. Returns token pairs, tick ranges, in-range status, liquidity amounts, and USD valuations.

**Try asking:**
- "What LP positions does mirage.mega have on Prism?"
- "Show me the Prism DEX positions for 0x1234...abcd"
- "Are any of 0xdead...beef's Prism positions out of range?"

### Security & Analysis

#### mtrkr_security_scan

Scan a wallet for open ERC-20 token approvals and NFT operator permissions. Returns each approval with risk level (safe/warning/critical), spender identification, and allowance amounts. Uses full historical indexing so no approvals are missed.

**Try asking:**
- "Does mirage.mega have risky approvals?"
- "List all infinite approvals for 0x1234...abcd"
- "Are there any critical-risk token approvals on 0xdead...beef?"
- "How many unknown spenders does this wallet have approved?"

#### mtrkr_inspect_address

Deep inspection of any address on MegaETH. Determines if it's an EOA (wallet) or contract, shows ETH balance, transaction count, risk assessment, and known contract labels. For contracts: proxy detection, deployer, owner, source verification, token standard detection, and fake/clone detection.

**Try asking:**
- "Is 0x1234...abcd a wallet or a contract?"
- "Inspect 0xdead...beef — is it a proxy?"
- "Who deployed contract 0x5B42...d997?"
- "Is 0xabcd...1234 source-verified on Blockscout?"
- "What token standard does 0x021e...782B implement?"
- "Is this contract a fake clone?"

#### mtrkr_token_scan

Comprehensive ERC-20 token risk analysis across 5 domains: control, exit, liquidity, economic, and integrity. Returns a risk score (0-100), sell simulation, admin power detection, holder concentration, pricing, and individual risk findings with evidence.

**Try asking:**
- "Is token 0x021e...782B safe to buy?"
- "Can I sell 0xabcd...1234? Check for honeypot"
- "What are the risk factors for 0xdead...beef?"
- "Who are the top holders of 0x021e...782B?"
- "Does 0xabcd...1234 have admin mint or pause powers?"
- "Is 0xdead...beef on the MegaETH curated token list?"

### Utility

#### mtrkr_decode_transaction

Decode a MegaETH transaction into human-readable format: method name, decoded parameters, token transfers, emitted events, and contract info. Works for both recent and historical transactions.

**Try asking:**
- "What did transaction 0xf9b5...3e2a do?"
- "Decode 0xabcd...1234 — was it a swap?"
- "Show me the token transfers in tx 0xdead...beef"
- "What method was called in transaction 0x9876...5432?"

#### mtrkr_eth_price

Get the current ETH/USD price on MegaETH. Uses RedStone on-chain oracle when available, falls back to CoinGecko.

**Try asking:**
- "What's the current ETH price on MegaETH?"
- "ETH price?"
- "How much is 5 ETH worth in USD right now?"

