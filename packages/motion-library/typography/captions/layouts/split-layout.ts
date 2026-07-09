export const splitLayout = {
  name: 'split-layout',
  anchor: 'center',
  alignment: 'left',
  maxWidth: '40%',
  padding: { top: 0, right: 0, bottom: 0, left: 60 },
  resolve: (textConfig: any, keyframes: any[]) => ({
    nodes: [
      {
        id: 'caption-text',
        type: 'text',
        children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 10,
        transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } },
        constraints: { anchor: 'center', alignment: 'left', maxWidth: '40%' },
        animations: keyframes.map(kf => ({
          property: kf.property,
          keyframes: kf.frames.map(f => ({ frame: f.at, value: f.value })),
        })),
        effects: textConfig.glow ? [{ type: 'glow', params: { color: textConfig.glow.color, radius: textConfig.glow.radius }, order: 0 }] : [],
        metadata: { content: textConfig.text, fontSize: textConfig.fontSize, fontWeight: textConfig.fontWeight, fontFamily: textConfig.fontFamily, color: textConfig.color },
      },
      {
        id: 'caption-visual',
        type: 'rectangle',
        children: [], parent: null, visible: true, blendMode: 'normal', opacity: 0.8, zIndex: 5,
        transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } },
        constraints: { anchor: 'center', alignment: 'right', maxWidth: '50%' },
        animations: [],
        effects: [],
        metadata: { fill: '#1a1a2e', borderRadius: 8, width: '50%', height: '80%' },
      },
    ],
  }),
}
