---
type: moc
tags: [moc, app]
---
# Aplikasi

```mermaid
flowchart LR
  WO[WO service] --> FSR[Form Service Result]
  FSR -- penarikan indoor unit pendingin --> P[Checklist Unit Pendingin]
  FSR -- pemasangan berisiko --> R[Persetujuan Pemasangan]
  M[Checklist Config Manager] -. config .-> FSR & P & R
```

- [[Form Service Result]] `#app/fsr` — hub: Maintenance, Instalasi, Survey
- [[Checklist Unit Pendingin]] `#app/pendingin` — General Check dan Pengetesan Bocor Body
- [[Persetujuan Pemasangan]] `#app/persetujuan` — persetujuan konsumen untuk kondisi berisiko
- [[Checklist Config Manager]] `#app/manager` — editor config bersama + publish

Lihat juga [[Standar UI]].
