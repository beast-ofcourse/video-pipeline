export const twoColumn = {
  name: 'two-column',
  anchor: 'center',
  alignment: 'left',
  maxWidth: '90%',
  padding: { top: 0, right: 0, bottom: 0, left: 0 },
  resolve: (textConfig: any, keyframes: any[]) => {
    const lines = (textConfig.text as string).split('\n')
    const mid = Math.ceil(lines.length / 2)
    const leftText = lines.slice(0, mid).join('\n')
    const rightText = lines.slice(mid).join('\n')

    return {
      nodes: [
        {
          id: 'caption-col-left',
          type: 'text',
          children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 10,
          transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } },
          constraints: { anchor: 'center-left', alignment: 'left', maxWidth: '45%' },
          animations: keyframes.map(kf => ({
            property: kf.property,
            keyframes: kf.frames.map(f => ({ frame: f.at, value: f.value })),
          })),
          effects: textConfig.glow ? [{ type: 'glow', params: { color: textConfig.glow.color, radius: textConfig.glow.radius }, order: 0 }] : [],
          metadata: { content: leftText, fontSize: textConfig.fontSize, fontWeight: textConfig.fontWeight, fontFamily: textConfig.fontFamily, color: textConfig.color },
        },
        {
          id: 'caption-col-right',
          type: 'text',
          children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 10,
          transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } },
          constraints: { anchor: 'center-right', alignment: 'left', maxWidth: '45%' },
          animations: keyframes.map(kf => ({
            property: kf.property,
            keyframes: kf.frames.map(f => ({ frame: f.at, value: f.value })),
          })),
          effects: textConfig.glow ? [{ type: 'glow', params: { color: textConfig.glow.color, radius: textConfig.glow.radius }, order: 0 }] : [],
          metadata: { content: rightText, fontSize: textConfig.fontSize, fontWeight: textConfig.fontWeight, fontFamily: textConfig.fontFamily, color: textConfig.color },
        },
      ],
    }
  },
}
