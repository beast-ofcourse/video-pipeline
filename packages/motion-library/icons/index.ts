export interface IconPreset {
  name: string
  type: 'checkmark' | 'cross' | 'arrow' | 'star' | 'heart' | 'play' | 'pause' | 'settings' | 'bell' | 'search'
  pathData: string
  viewBox: string
  defaultColor: string
  animation?: string
}

export const icons: IconPreset[] = [
  { name: 'checkmark-circle', type: 'checkmark', pathData: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z', viewBox: '0 0 24 24', defaultColor: '#34C759', animation: 'draw' },
  { name: 'cross-circle', type: 'cross', pathData: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z', viewBox: '0 0 24 24', defaultColor: '#FF3B30', animation: 'draw' },
  { name: 'arrow-right', type: 'arrow', pathData: 'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z', viewBox: '0 0 24 24', defaultColor: '#007AFF', animation: 'slide' },
  { name: 'star-fill', type: 'star', pathData: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z', viewBox: '0 0 24 24', defaultColor: '#FFCC00', animation: 'pop' },
  { name: 'heart-fill', type: 'heart', pathData: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z', viewBox: '0 0 24 24', defaultColor: '#FF2D55', animation: 'scale' },
  { name: 'play', type: 'play', pathData: 'M8 5v14l11-7z', viewBox: '0 0 24 24', defaultColor: '#FFFFFF', animation: 'fade' },
  { name: 'pause', type: 'pause', pathData: 'M6 19h4V5H6v14zm8-14v14h4V5h-4z', viewBox: '0 0 24 24', defaultColor: '#FFFFFF', animation: 'fade' },
  { name: 'settings', type: 'settings', pathData: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1115.6 12 3.611 3.611 0 0112 15.6z', viewBox: '0 0 24 24', defaultColor: '#8E8E93', animation: 'rotate' },
  { name: 'bell', type: 'bell', pathData: 'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z', viewBox: '0 0 24 24', defaultColor: '#FF9500', animation: 'bounce' },
  { name: 'search', type: 'search', pathData: 'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z', viewBox: '0 0 24 24', defaultColor: '#8E8E93' },
]

export function getIcon(name: string): IconPreset | undefined {
  return icons.find(i => i.name === name)
}
