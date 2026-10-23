---
description: Security — XSS, CSP, iframe, HTTPS, API errors, secrets, postMessage
trigger: always_on
globs: '{src/**/*.{ts,tsx},next.config.ts,middleware.ts}'
---

# Security Rules

## XSS

- React escapes text by default — prefer `{text}` never raw HTML from API
- **Forbidden:** `<div>{apiHtml}</div>` or `dangerouslySetInnerHTML={{ __html: apiHtml }}` for HTML from API/user
- `dangerouslySetInnerHTML` only for **trusted, app-owned** markup (e.g. JSON-LD from `JsonLd`)
- Sanitize with a vetted library if rich HTML is unavoidable; prefer markdown → safe React

```tsx
// ❌ BAD
<div dangerouslySetInnerHTML={{ __html: apiHtml }} />
<div>{apiHtml}</div> // still wrong if apiHtml is HTML string intent

// ✅ GOOD
<p>{apiText}</p>
<JsonLd data={schema} /> // trusted structured data only
```

## CSP (Content-Security-Policy)

Configured via root `middleware.ts` (+ related headers in `next.config.ts`):

```
default-src 'self';
script-src 'self' 'nonce-…';
img-src 'self' data: https:;
style-src 'self' 'unsafe-inline';
font-src 'self';
connect-src 'self' <API_ORIGIN> …;
frame-src <GAME_FRAME> <PROVIDER_FRAME>;
frame-ancestors 'none';
```

- Origins come from env — **never** hardcode production API/game URLs in source
- Tighten when adding CDNs; do not weaken CSP casually
- Dev may allow `localhost` + `'unsafe-eval'` for HMR only

## iframe Rule

Only embed allowlisted game/provider origins:

- `NEXT_PUBLIC_GAME_FRAME_ORIGIN` — comma-separated domains, scheme defaults to https. Hosts match by registrable domain (`3qpk-apisub.choingay.vn` matches `choingay.vn`)
- `NEXT_PUBLIC_PROVIDER_FRAME_ORIGIN` (e.g. `https://provider.com`) — exact origin

Use `@/components/common/SecureIframe/SecureIframe` — reject unknown `src` origins.

## HTTPS

- **Production must use HTTPS** (middleware redirects `http` → `https` behind proxy)
- HSTS enabled in production

## Headers

Always set:

- `X-Frame-Options: DENY` (or `SAMEORIGIN` only if product requires self-embed)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (disable unused features)
- `Strict-Transport-Security` (production)

## API errors

Every Axios failure path must handle common status codes in `createApiClient`:

| Code | Meaning      | Action                    |
| ---- | ------------ | ------------------------- |
| 401  | Unauthorized | clear session / re-auth   |
| 403  | Forbidden    | surface permission error  |
| 404  | Not found    | surface not-found         |
| 429  | Rate limited | backoff / retry messaging |
| 500  | Server error | generic failure + log     |

Use `getApiErrorMessage` / `ApiError` — do not swallow errors silently.

## Secrets

- **No** hardcoded API keys, secrets, or sensitive URLs in source
- Browser-safe config only via `NEXT_PUBLIC_*` env
- Server secrets never imported into client components
- `.env*.local` never committed

## postMessage

```ts
// ✅ Always verify origin
if (!isAllowedMessageOrigin(event.origin)) return;

// ✅ Never postMessage(..., '*')
window.opener.postMessage(payload, ALLOWED_TARGET_ORIGIN);
```

Use helpers in `@/lib/security/postMessage`.

## ❌ Forbidden

- Unsanitized API HTML rendering
- `postMessage` without `event.origin` check or with `'*'`
- Hardcoded secrets / prod API keys
- Arbitrary iframe `src`
- HTTP in production
