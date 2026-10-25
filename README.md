# CofferHouse website

Official marketing website and illustrated House for CofferHouse.

- Website: https://cofferhouse-website.vercel.app/
- Holder Center: https://cofferhouse-scout.vercel.app/#holders
- X: https://x.com/TheCofferHouse
- Agent source: https://github.com/CofferHouse/cofferhouse-agent-suite
- Contract source: https://github.com/CofferHouse/cofferhouse-contracts

## Run locally

Serve `dist/` with any static HTTP server, for example `python3 -m http.server 8000 --directory dist`.
No build step is required. Publish the contents of `dist/` with a static hosting provider.

## Product status

Holder Center exposes research previews. Bots and financial execution remain subject to their individual release. Telegram activation is pending. The membership collection is prepared in OpenSea but is not publicly released; mint dates, mint links and token purchase links must only be added after confirmation.

Vercel serves `dist/` using the tracked `vercel.json`. Pushes to `main` update the production website. The earlier Sites version remains a separate design preview.
