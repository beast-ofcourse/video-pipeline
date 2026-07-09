export interface ChartPreset {
  name: string
  type: 'bar' | 'line' | 'pie' | 'area' | 'radial' | 'donut'
  defaultData: Record<string, unknown>
  animation: string
}

export const chartPresets: ChartPreset[] = [
  { name: 'vertical-bars', type: 'bar', defaultData: { bars: 6, maxValue: 100, colors: ['#007AFF', '#5856D6', '#FF2D55', '#FF9500', '#FFCC00', '#34C759'] }, animation: 'bar-rise' },
  { name: 'horizontal-bars', type: 'bar', defaultData: { bars: 5, maxValue: 100, orientation: 'horizontal', colors: ['#007AFF', '#5856D6', '#FF2D55', '#FF9500', '#FFCC00'] }, animation: 'bar-extend' },
  { name: 'line-chart', type: 'line', defaultData: { points: 10, showDots: true, lineColor: '#007AFF', fillColor: 'rgba(0,122,255,0.1)' }, animation: 'line-draw' },
  { name: 'area-chart', type: 'area', defaultData: { points: 8, lineColor: '#34C759', fillColor: 'rgba(52,199,89,0.2)' }, animation: 'area-rise' },
  { name: 'pie-chart', type: 'pie', defaultData: { segments: 4, colors: ['#FF2D55', '#FF9500', '#FFCC00', '#34C759'] }, animation: 'pie-reveal' },
  { name: 'donut-chart', type: 'donut', defaultData: { segments: 5, holeSize: 0.6, colors: ['#007AFF', '#5856D6', '#FF2D55', '#FF9500', '#34C759'] }, animation: 'donut-rotate' },
  { name: 'radial-gauge', type: 'radial', defaultData: { value: 75, maxValue: 100, color: '#007AFF', trackColor: '#333333', size: 120 }, animation: 'gauge-fill' },
]

export function getChartPreset(name: string): ChartPreset | undefined {
  return chartPresets.find(c => c.name === name)
}
