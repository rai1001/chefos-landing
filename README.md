# RestoOs - B2B Landing Page & Lead Capture Hub

RestoOs is a modern SaaS frontend tailored for the HORECA (Hospitality/Restaurant) industry, designed to automate lead generation using an optimized Multi-Step Lead Capture funnel connected to a Supabase CRM, enriched with real-time backend alerts.

## Architecture

- **Framework:** Next.js 16 (App Router) with Turbopack.
- **Styling & Animation:** Tailwind CSS, Framer Motion, and custom WebGL background shaders.
- **Database:** Supabase (PostgreSQL) with strict Row-Level Security (`source = 'inbound'`).
- **Backend Flow:** Next.js Server Actions handle secure inserts and external webhooks without exposing logic to the client.

## Core Mechanisms

- **Silent Lead Capture (CRO):** A 2-step form that captures the Restaurant Name in Step 1. If the user bounces before finishing Step 2, the partial entry is retained automatically in Supabase.
- **Speed-to-lead Notifications:** `sendTelegramAlert` triggers instantly when a manager completes the form, notifying sales automatically without heavy SDKs.
- **Optimized Media Loading:** Uses asynchronous `VideoDemoCard` wrappers instead of heavy native streaming payloads, protecting Core Web Vitals (FCP/LCP) until user interaction.

## Quick Start

1. Copy the environment variables template:
   ```bash
   cp .env.example .env.local
   ```
2. Populate the keys:
   - `NEXT_PUBLIC_SUPABASE_URL` / `_ANON_KEY`
   - `TELEGRAM_BOT_TOKEN` / `_CHAT_ID`
3. Install dependencies and run:
   ```bash
   npm install
   npm run dev
   ```

## Production Requirements

Run the Supabase SQL Policies before launching the app in production to avoid `500` server errors:
```sql
ALTER TABLE businesses DROP CONSTRAINT IF EXISTS businesses_source_check;
ALTER TABLE businesses ADD CONSTRAINT businesses_source_check CHECK (source IN ('apify', 'manual', 'inbound'));
CREATE POLICY "anon_insert_inbound" ON businesses FOR INSERT TO anon WITH CHECK (source = 'inbound');
```
