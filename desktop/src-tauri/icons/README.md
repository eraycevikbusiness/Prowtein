# App icons

`icon.png` is a generated 1024×1024 placeholder (coral squircle with a "P").

To produce the full per-platform icon set (`32x32.png`, `128x128.png`,
`128x128@2x.png`, `icon.icns`, `icon.ico`, Windows Store tiles, …) from a source
image, run:

```bash
npm run icons          # = tauri icon src-tauri/icons/icon.png
```

Then point `bundle.icon` in `../tauri.conf.json` at the generated files if you
want platform-native icons in release builds. For `npm run tauri:dev` the single
`icon.png` is enough.
