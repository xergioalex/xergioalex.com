---
title: "The Agentic Web: Everything Cloudflare Launched in Agents Week 2026"
description: "The complete list from Cloudflare's Agents Week 2026 — 30+ announcements across runtime, identity, MCP, standards and measurement, organized by layer, explained short."
pubDate: "2026-04-20T14:00:00"
heroImage: "/images/blog/posts/aeo-the-agentic-web/hero.webp"
heroLayout: "side-by-side"
tags: ["tech", "web-development", "ai"]
keywords: ["cloudflare agents week 2026", "agentic web", "AI agents infrastructure", "agent-ready web", "MCP", "Project Think Cloudflare", "Sandboxes GA", "isitagentready.com"]
---

A few weeks ago I was writing about how answer-engine optimization was running years ahead of our ability to measure it. It was half diagnosis, half complaint: we already had `llms.txt`, structured data, markdown endpoints for agents — but no objective scorecard to tell us whether any of that was working.

Then Cloudflare shipped a full week — [Agents Week 2026](https://www.cloudflare.com/agents-week/) — trying to close that gap. And what you can say about the shape of the week matters more than any individual product: it wasn't a feature roundup, it was infrastructure, standards, and measurement stacked on top of each other, all in the same pile.

What follows is my list of everything that was announced, organized by layer — not by chronology. Some items deserve their own posts; I'll go deeper later on the ones that make sense. For now, short and to the point.

## 1. The substrate: agents get a real computer

The first post of the week opened with a literal headline: *"Agents have their own computers with Sandboxes GA."* That's not an exaggeration.

1. **[Sandboxes GA](https://blog.cloudflare.com/sandbox-ga/).** A real, dedicated computer for each agent — not an ephemeral container that dies after one response, but a workspace that persists across sessions. The agent can install packages, run a shell, clone a Git repo, write files, expose a port to the internet. The `@cloudflare/sandbox` SDK exposes each of those actions as a method — `exec`, `gitClone`, `writeFile`, `terminal`, `exposePort`. Billing runs on active CPU: you pay for the seconds the agent is actually working, not the time it's idle. You can have up to 15,000 running in parallel on the Standard plan. This is the piece where "each agent has its own computer" stops being a metaphor.

2. **[Sandbox auth](https://blog.cloudflare.com/sandbox-auth/).** A security layer between the agent's sandbox and the rest of the world. All network traffic leaving the sandbox flows through a zero-trust proxy: the user's credentials never touch the untrusted code the agent is running. If the agent needs to call an internal API, the proxy injects the right credentials at the right moment; if it tries to reach a domain it shouldn't, the proxy blocks it. You define the rules with a dynamic outbound handler. The agent runs free without ever seeing your secrets.

3. **[Durable Object Facets in Dynamic Workers](https://blog.cloudflare.com/durable-object-facets-dynamic-workers/).** Every app an AI agent generates — a small microservice, a tiny API, a bot — gets its own isolated SQLite database. If one app breaks its own database, it only breaks its own; no other app notices. Open beta on the Workers Paid plan.

4. **[Artifacts](https://blog.cloudflare.com/artifacts-git-for-agents-beta/) (beta).** Versioned storage that speaks Git natively. Each agent can create its own repository, and any standard Git client — even a plain `git clone` from your own terminal — can work with it. The implementation is clever: the Git server itself runs compiled to WebAssembly in just ~100 KB, live persistence uses Durable Objects with SQLite, and snapshots go to R2. Pricing is public: $0.15 per 1,000 operations, $0.50 per GB-month. Designed for agents to spin up millions of repos without thinking about infrastructure.

5. **[cf CLI + Local Explorer](https://blog.cloudflare.com/cf-cli-local-explorer/).** A new command-line tool (`npx cf`) that replaces Wrangler, plus a "Local Explorer" — a simulated version of the full Cloudflare platform running on your machine. You can test KV, R2, D1, Durable Objects, and Workflows locally without touching production, and without having to roll your own mocks.

## 2. Inference and memory: the model matters, but so does the plumbing

6. **[AI Platform](https://blog.cloudflare.com/ai-platform/) (AI Gateway + Workers AI unified).** A single entry point to 70+ AI models across 12+ providers — Alibaba Cloud, AssemblyAI, Bytedance, Google, InWorld, MiniMax, OpenAI, Pixverse, Recraft, Runway, Vidu. You write one line (`AI.run("model", ...)`) and can switch between them without rewriting anything else. If one provider goes down, the platform fails over to the next automatically; all spend flows into one centralized credit pool — one bill instead of twelve. And if you have your own fine-tuned model, you can bring it packaged as a standard container (using Replicate Cog). This is the direct answer to OpenRouter and Portkey, but integrated into the Cloudflare stack.

7. **[Infire](https://blog.cloudflare.com/high-performance-llms/).** Cloudflare built its own LLM runtime, from scratch, in Rust. Instead of using vLLM or TGI (the common open-source engines), they have something of their own with three optimizations: they split the two internal phases of an LLM (the one that understands the prompt and the one that generates the answer) so each can run on different hardware; they cache repeated prompts more aggressively (hit rate went from 60% to 80%); and they use RDMA — direct memory transfers between GPUs over the network — to move the model's context without round-tripping through CPU. The headline number: **3× speedup on Kimi K2.5** compared to their previous stack.

8. **[Unweight](https://blog.cloudflare.com/unweight-tensor-compression/).** They compress LLMs by 22% without losing anything — every byte coming out is identical to the original, as if you hadn't compressed at all. The technique is Huffman coding applied to the internal representation of the model's weights (the BF16 format that most current LLMs use). On Llama 3.1 8B that means about 3 GB less VRAM per model — enough to run a larger model on the same GPU, or fit two instances where only one fit before. The GPU kernels are open source at `github.com/cloudflareresearch/unweight-kernels`. (Don't confuse it with the 97-99.5% number: that belongs to Shared Dictionaries, further below.)

9. **[AI Search](https://blog.cloudflare.com/ai-search-agent-primitive/) (open beta, formerly AutoRAG).** A search engine each agent can index however it wants. It combines two classic techniques — semantic search (by meaning, using vector embeddings) and keyword search (BM25, with Porter/trigram tokenization) — and blends them with relevance boosting so complex queries actually work. Previously called AutoRAG; now it's a product-level API with its own bindings (`ai_search_namespaces`). Storage in R2, vectors in Vectorize, crawling via Browser Run. Free during beta.

10. **[Agent Memory](https://blog.cloudflare.com/introducing-agent-memory/) (private beta).** Managed persistent memory for agents — the layer the typical agent is missing to stop being amnesic between conversations. The API is deliberately simple: five operations (ingest, remember, recall, forget, list) across four distinct memory types (facts, events, instructions, tasks). Behind the scenes, five parallel channels fetch what's relevant from different angles and a Reciprocal Rank Fusion algorithm combines the results so the best one always surfaces first. Information extraction uses Llama 4 Scout; final synthesis uses Nemotron 3.

## 3. Orchestration: from workflow to SDK

11. **[Project Think](https://blog.cloudflare.com/project-think/) (preview).** Cloudflare's next-generation SDK for building agents. It tackles four classic architectural problems with four pieces:

    - **Durable Execution with Fibers** — agent steps survive server restarts. A call to `stash()` saves progress, and the agent can pause for minutes, hours, or days without losing its state.
    - **Sub-agents via facets** — each sub-agent runs isolated, with its own database and its own failure domain. If one dies, it doesn't take the parent down with it.
    - **Persistent sessions** — conversations are stored as trees you can fork (to explore alternative paths), compact (to keep the context window from filling up), and search with full-text.
    - **Sandboxed code** — a five-tier ladder from "just filesystem access" to "full OS sandbox" (the same Sandboxes GA from item 1).

    If it sticks as a pattern, it becomes the default way to build agents on Cloudflare. Previews die often — but this one pulls every piece of the week into one place.

12. **[Workflows v2](https://blog.cloudflare.com/workflows-v2/).** Cloudflare's workflow engine got a full redesign. The numbers speak for themselves: from 4,500 to **50,000 concurrent instances**, from 100 to **300 creations per second**, from 1M to **2M queued per workflow**. Two new components — *SousChef* (coordinates execution) and *Gatekeeper* (controls access) — handle the orchestration. Existing workflows migrate with zero downtime. The 10× isn't marketing math: it's real rearchitecture.

13. **[Agent Lee](https://blog.cloudflare.com/introducing-agent-lee/) (beta).** An AI assistant embedded directly inside the Cloudflare dashboard. An "Ask AI" button in the corner that handles diagnostics, debugging, configuration, and real-time visualization — without you having to leave the interface to ask ChatGPT. During beta: ~18,000 daily users and ~250,000 tool calls per day. Accessible even from the free plan.

14. **[Registrar API](https://blog.cloudflare.com/registrar-api-beta/) (beta).** For the first time, agents can buy domains programmatically through Cloudflare Registrar. The API has three basic operations — search availability, verify, register — at-cost (no markup), with WHOIS privacy default, and direct access via MCP. Registration is async: you get a 202 response and the client polls until it's done. And because domains aren't refundable, the agent flow needs explicit human confirmation before it hits "buy."

## 4. The interfaces with the world

15. **[Browser Run](https://blog.cloudflare.com/browser-run-for-ai-agents/) (GA).** The rebrand of Browser Rendering, with a lot more capabilities. **Live View** lets you watch an agent work in real time. **Human in the Loop** injects a person into the session when the agent gets stuck (useful for captchas, confirmations, decisions). Compatible with any standard Puppeteer or Playwright client — they all speak Chrome DevTools Protocol over WebSocket, so your existing code works unchanged. Session recordings via `rrweb` (an open-source library that captures every interaction for replay). A **Crawl** endpoint that returns pages as HTML, Markdown, or pre-processed JSON. **Quick Actions** over REST for one-shot tasks. Concurrency went from 30 to **120**. Native MCP for Claude Desktop, Cursor, and OpenCode. And it ships **experimental WebMCP support** — the browser itself becomes a tool surface for agents.

16. **[Voice SDK](https://blog.cloudflare.com/voice-agents/) (experimental).** An SDK (`@cloudflare/voice`) for giving your agent a voice. Audio travels as 16 kHz mono PCM over WebSocket (lightweight format, easy to process). For speech-to-text (STT) it uses Deepgram Flux + Nova 3; for text-to-speech (TTS) it uses Deepgram Aura. You wrap your agent with `withVoice(Agent)` or `withVoiceInput(Agent)` and on the client you have React hooks ready to use. About 30 lines of server code and your agent starts talking.

17. **[Email Service](https://blog.cloudflare.com/email-for-agents/) (public beta).** Outbound and inbound email for agents. The SPF, DKIM, and DMARC records (the ones that authorize your domain to send email without landing in spam) auto-configure — one of the most tedious problems of running your own email, solved up front. You get a direct Workers binding, a REST API with SDKs in TypeScript, Python, and Go, an MCP server included, and routing headers signed with HMAC-SHA256 to prevent spoofed callbacks (important when an agent is receiving email automatically). Because it's 2026 and everything speaks MCP.

## 5. Identity and private networking

18. **[Managed OAuth for Access](https://blog.cloudflare.com/managed-oauth-for-access/) (open beta).** An OAuth authorization server — the component that issues the tokens an agent uses to access your app — that turns on with a single click on any Cloudflare Access-protected app. Implements three key standards from day one: **RFC 7591** (so clients can self-register without manual config), **RFC 7636** (PKCE, which prevents someone from intercepting the authorization code in flight), and **RFC 9728** (metadata telling agents exactly how to authenticate). It serves the metadata at `/.well-known/oauth-authorization-server`, sends the correct `www-authenticate` headers on unauth requests, and — critically — preserves per-user attribution (every agent action is still traceable to the real person behind it). The identity answer for agents stops being theater and becomes standards-compliant.

19. **[Cloudflare Mesh](https://blog.cloudflare.com/mesh/).** A unified private network across everything Cloudflare offers — users, servers (nodes), agents, and Workers, all talking inside the same mesh. Prior products got renamed: WARP Connector becomes "Mesh node"; WARP Client becomes "Cloudflare One Client." The free tier is generous — 50 nodes + 50 users — and Workers VPC bindings can now reach private databases directly, with no intermediate server ("jump host") in between.

20. **[Non-human identities](https://blog.cloudflare.com/improved-developer-security/).** Cloudflare reformatted its credentials so they can be detected and revoked automatically. The new tokens have distinct prefixes based on what they're for (`cfk_` for user API keys, `cfut_` for user API tokens, `cfat_` for account API tokens), and each includes a checksum — a short signature that lets them be identified unambiguously. If you accidentally push a token to a public GitHub repo, GitHub Secret Scanning spots it and Cloudflare auto-revokes it before anyone can use it. Cloudflare One DLP extends the same detection across Gateway, Email, CASB, and AI Gateway. And Resource-Scoped RBAC went GA: you can finally issue keys scoped to just one zone in one account (instead of being global or whole-account).

21. **[Enterprise MCP + Code Mode](https://blog.cloudflare.com/enterprise-mcp/).** A reference architecture for enterprises that want to deploy MCP at scale, with security and observability. It stitches six products into one stack: Remote MCP Servers + Access (authentication) + MCP Server Portals (management) + AI Gateway (observability) + Gateway (traffic control) + WAF (attack protection). The most interesting piece is **Code Mode**: instead of registering every MCP tool individually in the agent's prompt (which can balloon it with dozens of definitions and waste context), the portal exposes just two tools — `portal_codemode_search` to discover what tools exist, and `portal_codemode_execute` to run them. A real example cut a **9,400-token prompt to 600** — a 94% reduction. It also brings shadow-MCP detection — rogue MCP servers deployed inside the network without authorization — via hostname scanning, URI path patterns, and regex over the JSON-RPC bodies flowing through Gateway.

## 6. The standards: this is the week's real turn

If the previous layers were product, this is protocol. Each of these standards deserves its own section; here's just the essential.

22. **[Content Signals](https://contentsignals.org/) in robots.txt.** A new directive inside `robots.txt` that lets you declare preferences for three distinct categories: `ai-train` (can models train on your content?), `search` (can your content appear in search?), and `ai-input` (can AI answers cite or summarize your content?). Until now, the only option was `allow` or `disallow` — which doesn't distinguish between "index me" and "don't train on me". Now that difference finally has syntax.

23. **Link response headers ([RFC 8288](https://www.rfc-editor.org/rfc/rfc8288)).** HTTP `Link:` headers you place on your homepage response pointing at machine-readable resources — typically your `/.well-known/api-catalog` or other files describing your APIs. The idea is elegant: an agent visiting your site can do a simple `HEAD /` (request only the headers, not the HTML body) and from there discover the site's entire programmatic surface, without having to render or parse anything.

24. **[The full `.well-known/` family](https://blog.cloudflare.com/agent-readiness/).** Six JSON documents at canonical paths on your site, each tied to a real standard. They act as a system of "business cards" that any agent knows where to look for:

    - `/.well-known/api-catalog` — catalog of the site's APIs (RFC 9727, served as `application/linkset+json`, a JSON listing your endpoints with metadata).
    - `/.well-known/openid-configuration` or `/.well-known/oauth-authorization-server` — OAuth authorization-server metadata (OIDC Discovery 1.0 / RFC 8414).
    - `/.well-known/oauth-protected-resource` — which site resources are protected and which server authorizes them (RFC 9728).
    - `/.well-known/mcp/server-card.json` — the site's MCP "card" — what capabilities and tools it supports (MCP SEP-1649 / PR #2127).
    - `/.well-known/agent-skills/index.json` — index of the skills the site publishes, each with a SHA-256 digest over the served bytes for integrity verification (Cloudflare Agent Skills Discovery RFC v0.2.0).

    You don't need to read every RFC end to end to implement them, but it's worth understanding why each one exists.

25. **[WebMCP](https://webmachinelearning.github.io/webmcp/).** A new browser API — `navigator.modelContext.registerTool()` — that lets a page publish the tools it exposes so an agent running *inside* the same browser can call them. It's literally MCP, but living in the tab: the agent has full access to the user's session with the site (cookies, OAuth state, localStorage, the works). Useful for Claude-in-the-browser extensions, or assistants integrated into the browser that need to interact with the web as if they were the user. The Browser Run SDK already supports it experimentally.

26. **[Agent Skills Discovery RFC](https://github.com/cloudflare/agent-skills-discovery-rfc) (Apache 2.0).** Cloudflare published their own RFC — one of their most open contributions of the week, under Apache 2.0. It defines two things: the index format (a JSON with a `$schema` field and a `skills[]` array where each entry has `name`, `type`, `description`, `url`, and a SHA-256 `digest`) and the SKILL.md format (a simple Markdown with YAML frontmatter for the `name` and `description` metadata). The idea: any site can publish its skills in a standardized, discoverable, verifiable way — not just Cloudflare. Version v0.2.0 as of this writing; the repository is open for contributions.

## 7. Speed, network, feature flags

27. **[Shared Dictionaries](https://blog.cloudflare.com/shared-dictionaries/) (RFC 9842).** Cloudflare implements Compression Dictionary Transport — a technique that uses previous versions of an asset as a "dictionary" to compress the new version far beyond what gzip or brotli can achieve alone. Two formats: DCB (Brotli-based) and DCZ (Zstd-based). The browser tells the server which dictionaries it already has cached (`Available-Dictionary` header), the server marks which resources serve as dictionaries (`Use-As-Dictionary`), and the negotiation completes in `Accept-Encoding`. Natively supported in Chrome and Edge 130+; Firefox is working on it. Internal tests report **97-99.5% reduction** in size when re-deploying a site (because clients already have the previous version cached as a dictionary). Phase 1 beta lands April 30. (And yes — this is the 97-99.5% number that circulated this week, not Unweight's 22%.)

28. **[Redirects for AI Training](https://blog.cloudflare.com/ai-redirects/).** Cloudflare automatically converts your `<link rel="canonical">` tags into HTTP 301 redirects — but *only* when the request comes from a verified AI crawler (GPTBot, ClaudeBot, Bytespider). The implementation uses `cf.verified_bot_category`, a category distinct from AI Assistant and AI Search. Why it matters: it gives the author a clean way to say "this is the canonical URL; train from that one" without the weird side-effects of `noindex` or the acrobatics that sometimes become necessary inside `robots.txt`. AEO-style canonicalization with the right semantics, applied exactly where it matters.

29. **[Network performance update](https://blog.cloudflare.com/network-performance-agents-week/).** Cloudflare is now the fastest network in 60% of the top-1,000 networks in the world, up from 40% in September 2025. Three factors behind the shift: a full rewrite of FL2 (the internal forwarding system) to Rust, gains in HTTP/3 support, and 261 new networks added since September.

30. **[Flagship](https://blog.cloudflare.com/flagship) (private beta).** Native feature flags inside the Cloudflare platform. Workers run the evaluation (sub-millisecond thanks to the edge), Durable Objects serve as the control plane (where you define the rules), and KV caches the global config. The SDK is OpenFeature-compliant — the open standard for feature flags — so you can migrate from LaunchDarkly or similar without rewriting your application code. It supports up to 5 levels of nested AND/OR logic and percentage rollouts via consistent hashing (the same user always lands in the same bucket, even if the flag changes).

## 8. The capstone: isitagentready.com and 33/100

31. **[Agent Readiness score](https://blog.cloudflare.com/agent-readiness/) + [isitagentready.com](https://isitagentready.com/).** The tool that closes the week. You enter your site's URL and it returns a 0-to-100 number, distributed across four dimensions: **Content, Discoverability, Bot Access Control, and APIs/Auth/MCP/Skills** — with a bonus for commerce. Internally it checks everything we already listed: the `.well-known/` documents (server-card, agent-skills/index, api-catalog, oauth-authorization-server), the Link headers, the Content Signals in robots.txt, the presence of WebMCP in the browser. It also includes one more endpoint on the scorecard list (`.well-known/http-message-signatures-directory` for HTTP signatures — likely part of the next scorecard iteration). The coordination game it proposes is elegant: *"here are the rules; grade the rest of us."*

I ran the tool against xergioalex.com.

**33 out of 100.**

<figure>
<img src="/images/blog/posts/aeo-the-agentic-web/figure-04-scorecard-33.webp"
     alt="isitagentready.com scorecard for xergioalex.com showing an overall score of 33 out of 100, labelled Level 1 — Basic Web Presence. The four category dials below read: Discoverability 67, Content 100, Bot Access Control 50, APIs/Auth/MCP and Skill Discovery 0."
     width="1020"
     height="815"
     loading="lazy" />
<figcaption>isitagentready.com, April 18, 2026: xergioalex.com scored 33/100. Content at full marks thanks to the earlier Markdown-for-agents work; Discoverability and Bot Access partial; the APIs/Auth/MCP/Skills bucket entirely empty. — <a href="https://isitagentready.com/">Grade your own site at isitagentready.com</a>.</figcaption>
</figure>

That number — more than anything else from the week — is what stuck with me. Not because 33 is low (most sites today would score similarly), but because for the first time there's an external scorecard defining what "agent-ready" means in actionable, checkable terms. The scorecard draws the new baseline; crossing it is the next exercise.

## What this means

Stack up the week in three layers.

**Layer one — infrastructure.** Agents now have a computer (Sandboxes), an orchestration engine (Workflows v2, Project Think), an inference layer (AI Platform + Infire + Unweight), persistent memory (Agent Memory), versioned storage (Artifacts), search (AI Search), a browser (Browser Run), a voice (Voice SDK), an email channel (Email Service), and a dashboard with an assistant (Agent Lee).

**Layer two — identity and interfaces.** Managed OAuth for Access and the new token formats give agents real, revocable credentials. Cloudflare Mesh gives them a private network to reach internal systems. Enterprise MCP + Code Mode shows the pattern for collapsing 52 tools into 2 portals.

**Layer three — standards and measurement.** This is where Cloudflare stops selling *to* you and starts selling *about* you. Content Signals, Link headers, the `.well-known/*` family, WebMCP, the Agent Skills Discovery RFC. And the tool that turns "is your site agent-ready?" from a vague question into a number.

This is one vendor pushing a set of drafts. Some will stick; some won't. But most of the drafts point to real standards from the web's official standards bodies (IETF and WHATWG) — RFC 8288, 9727, 9728, 8414 — that exist regardless of Cloudflare's product line. The primitives survive even if the product line above them doesn't.

The worry I opened this post with — that AEO measurement was running years behind AEO optimization — closed faster than I expected. At least for one definition of "ready."

If Cloudflare wins here, they become the plumbing of the agentic web. If they don't, the primitives still win. That's a rare kind of bet.

I'll keep building.

## Resources

- [Cloudflare Agents Week 2026 landing](https://www.cloudflare.com/agents-week/)
- [Agents Week tag archive](https://blog.cloudflare.com/tag/agents-week/)
- [Introducing the Agent Readiness score](https://blog.cloudflare.com/agent-readiness/)
- [isitagentready.com](https://isitagentready.com/)
- [Agent Skills Discovery RFC (Cloudflare, Apache 2.0)](https://github.com/cloudflare/agent-skills-discovery-rfc)
- [MCP Server Card discussion — SEP-1649 / PR #2127](https://github.com/modelcontextprotocol/modelcontextprotocol)
- [RFC 8288 — Link headers](https://www.rfc-editor.org/rfc/rfc8288)
- [RFC 9727 — API Catalog](https://www.rfc-editor.org/rfc/rfc9727)
- [RFC 9842 — Compression Dictionary Transport](https://www.rfc-editor.org/rfc/rfc9842)
- [Content Signals](https://contentsignals.org/)
- [WebMCP](https://webmachinelearning.github.io/webmcp/)
- [Unweight kernels (OSS)](https://github.com/cloudflareresearch/unweight-kernels)
