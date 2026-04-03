# TSS DNA Kaynağı

## Notion DNA Hub

Canlı kaynak: https://www.notion.so/33702474a13781e7a3d6d68cf0379973

## Alt Sayfalar

| Sayfa | URL | Token Grubu |
|---|---|---|
| 00 · Agent Instructions | https://www.notion.so/33702474a1378157b3bdcacc545de5d5 | Behavioral |
| 01 · Identity Tokens | https://www.notion.so/33702474a13781478c41c690a5d4e696 | Core Identity |
| 02 · Voice Tokens | https://www.notion.so/33702474a13781c1b6f4fc8f58735920 | Communication |
| 03 · Visual Tokens | https://www.notion.so/33702474a1378110a357c05c92c68154 | Design System |
| 04 · Memory Sync Log | https://www.notion.so/33702474a13781ff81e1f27c3ad2944c | Versioning |

## Snapshot Konumu

`brand-memory/tss/dna-snapshot/`

## Fetch Protokolü

1. Her görev başında `04 · Memory Sync Log` sayfasındaki `sync.last_date` oku
2. Snapshot bu tarihten daha eskiyse Memory Keeper'ı uyar
3. Güncel snapshot yoksa → fallback-protocol.md
