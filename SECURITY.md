# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.1.x   | Yes       |
| < 1.1   | No        |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it privately:

1. **Do not** open a public GitHub issue.
2. Use [GitHub's private vulnerability reporting](https://github.com/n1n4du/mtrkr-mcp-server/security/advisories/new) to submit your report.
3. Include steps to reproduce and any relevant details.

You can expect an initial response within **72 hours**. If the vulnerability is confirmed, a fix will be released as soon as possible and you will be credited (unless you prefer anonymity).

## Scope

This MCP server is a **read-only** API wrapper. It does not handle private keys, sign transactions, or manage wallet secrets. The primary security concerns are:

- **Supply-chain integrity** — ensuring published npm packages match the source code
- **Input validation** — preventing malformed inputs from reaching upstream APIs
- **Dependency hygiene** — keeping dependencies up to date
