# ADR-008 — Map art instead of a Google Maps embed

**Status: ACCEPTED**
**Date: 2026-08-14**
**Authority: Project Owner**

Location is a first-class section, not a widget inside the Appointment CTA. The map surface is authored Map art (`public/assets/clinic/map.webp`), not a Google Maps iframe.

An embed would be interactive and always current, but it arrives as a light third-party frame, loads Google on the page, and breaks the dark editorial field. A static, clickable image stays on-brand (dark ground, quiet edges, no heavy card) and uses Google Maps only as the destination of the click (image + “Abrir no Google Maps”).

**Considered:** iframe in the Appointment CTA; iframe in Location; footer-only address. Rejected for visual foreignness and for mixing conversion with wayfinding.

**Consequence:** the WebP must exist before Location can ship as designed; the Maps URL is derived from `siteConfig.address`, not from an embed key.
