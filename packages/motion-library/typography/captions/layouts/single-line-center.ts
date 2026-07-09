export const singleLineCenter = {
  name: 'single-line-center',
  anchor: 'center',
  alignment: 'center',
  maxWidth: '80%',
  padding: { top: 0, right: 0, bottom: 0, left: 0 },
  resolve: (textConfig: any, keyframes: any[]) => ({
    nodes: [
      {
        id: 'caption-line',
        type: 'text',
        children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 10,
        transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } },
        constraints: { anchor: 'center', alignment: 'center', maxWidth: '80%' },
        animations: keyframes.map(kf => ({
          property: kf.property,
          keyframes: kf.frames.map(f => ({ frame: f.at, value: f.value })),
        })),
        effects: textConfig.glow ? [{ type: 'glow', params: { color: textConfig.glow.color, radius: textConfig.glow.radius }, order: 0 }] : [],
        metadata: { content: textConfig.text, fontSize: textConfig.fontSize, fontWeight: textConfig.fontWeight, fontFamily: textConfig.fontFamily, color: textConfig.color },
      },
    ],
  }),
}
