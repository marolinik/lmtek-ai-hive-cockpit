# LM Tek AI Hive Cockpit

Clickable prototype for the LM Tek AI Hive go-to-market configurator and product system.

## What is included

- Workload-first configurator
- 1x-8x GPU scaling across 50X, A6000/PRO, and H200
- Tower, Tower XL, deskside, rack, and rack-only placement rules
- Full BOM output with explicit WS Cooling Kit and Server Cooling Kit lines
- Product portfolio hub
- Product page previews
- TCO and ROI studio
- Partner portal
- AI Hive site structure map

## Key commercial rules

- 50X and A6000/PRO support 1x-8x card configurations.
- H200 supports 1x-8x card configurations and is rack-only.
- 1x-2x 50X or A6000/PRO can be standard tower.
- 3x-4x 50X or A6000/PRO can be Tower XL or deskside with validation.
- 5x-8x 50X or A6000/PRO moves to rack, towerized rack, or deskside liquid platform.
- Cooling is configured as a named kit: WS Cooling Kit or Server Cooling Kit.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The static build output is generated in `dist/public`.
