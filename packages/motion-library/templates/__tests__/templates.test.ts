import { describe, it, expect } from 'vitest'
import { createProductDemo } from '../product-demo'
import { createExplainer } from '../explainer'
import { createSocialClip } from '../social-clip'
import { createLaunchTeaser } from '../launch-teaser'
import { createTutorial } from '../tutorial'
import { createTestimonial } from '../testimonial'
import { createFeatureUpdate } from '../feature-update'

describe('product-demo template', () => {
  it('creates scenes with nodes', () => {
    const result = createProductDemo({
      productName: 'Test',
      tagline: 'Test tagline',
      brandColor: '#007AFF',
      features: [{ name: 'Feature 1', description: 'Desc 1' }],
      cta: 'Get Started',
    })
    expect(result.scenes).toBeDefined()
    expect(result.scenes!.length).toBe(3) // intro + 1 feature + cta
    result.scenes!.forEach(s => {
      expect(s.nodes.length).toBeGreaterThan(0)
      expect(s.duration).toBeGreaterThan(0)
    })
  })

  it('handles multiple features', () => {
    const result = createProductDemo({
      productName: 'ProApp',
      tagline: 'Do more',
      brandColor: '#00FF00',
      features: [
        { name: 'Speed', description: 'Fast' },
        { name: 'Power', description: 'Strong' },
        { name: 'Scale', description: 'Big' },
      ],
      cta: 'Try Free',
    })
    expect(result.scenes!.length).toBe(5) // intro + 3 features + cta
  })

  it('applies brand color to backgrounds', () => {
    const result = createProductDemo({
      productName: 'Test',
      tagline: 'Test',
      brandColor: '#FF0000',
      features: [],
      cta: 'Go',
    })
    const bgNode = result.scenes![0].nodes.find(n => n.id === 'bg')
    expect(bgNode).toBeDefined()
    expect(bgNode!.metadata.colors).toContain('#FF0000')
  })
})

describe('explainer template', () => {
  it('creates scenes with nodes', () => {
    const result = createExplainer({
      problem: 'Problem statement',
      solution: 'Our solution',
      steps: ['Step 1', 'Step 2', 'Step 3'],
      brandColor: '#007AFF',
    })
    expect(result.scenes).toBeDefined()
    expect(result.scenes!.length).toBe(6) // problem + solution + 3 steps + outro
    result.scenes!.forEach(s => {
      expect(s.nodes.length).toBeGreaterThan(0)
    })
  })

  it('includes outro scene', () => {
    const result = createExplainer({
      problem: 'P',
      solution: 'S',
      steps: ['S1'],
      brandColor: '#000',
      cta: 'Join Now',
    })
    const outro = result.scenes!.find(s => s.id === 'outro')
    expect(outro).toBeDefined()
    const ctaNode = outro!.nodes.find(n => n.id === 'outro-cta')
    expect(ctaNode).toBeDefined()
    expect(ctaNode!.metadata.content).toBe('Join Now')
  })

  it('works with empty steps', () => {
    const result = createExplainer({
      problem: 'P',
      solution: 'S',
      steps: [],
      brandColor: '#333',
    })
    expect(result.scenes!.length).toBe(3) // problem + solution + outro (no steps)
  })
})

describe('social-clip template', () => {
  it('creates scenes with nodes', () => {
    const result = createSocialClip({
      hook: 'Stop scrolling!',
      content: 'Check this out',
      cta: 'Follow for more',
      brandColor: '#FF3366',
    })
    expect(result.scenes).toBeDefined()
    expect(result.scenes!.length).toBe(3)
    result.scenes!.forEach(s => {
      expect(s.nodes.length).toBeGreaterThan(0)
    })
  })

  it('uses square format by default', () => {
    const result = createSocialClip({
      hook: 'H',
      content: 'C',
      cta: 'CTA',
      brandColor: '#000',
    })
    expect(result.aspectRatio).toBe('1:1')
    expect(result.resolution).toEqual({ width: 1080, height: 1080 })
  })

  it('uses vertical format when specified', () => {
    const result = createSocialClip({
      hook: 'H',
      content: 'C',
      cta: 'CTA',
      brandColor: '#000',
      format: 'vertical',
    })
    expect(result.aspectRatio).toBe('9:16')
    expect(result.resolution).toEqual({ width: 1080, height: 1920 })
  })
})

describe('launch-teaser template', () => {
  it('creates scenes with nodes', () => {
    const result = createLaunchTeaser({
      productName: 'V2',
      tagline: 'The next generation',
      launchDate: 'July 15',
      brandColor: '#7C3AED',
    })
    expect(result.scenes).toBeDefined()
    expect(result.scenes!.length).toBe(4) // countdown + flash + logo-reveal + date
    result.scenes!.forEach(s => {
      expect(s.nodes.length).toBeGreaterThan(0)
    })
  })

  it('includes a flash scene', () => {
    const result = createLaunchTeaser({
      productName: 'X',
      tagline: 'Coming',
      launchDate: 'Soon',
      brandColor: '#000',
    })
    const flash = result.scenes!.find(s => s.id === 'flash')
    expect(flash).toBeDefined()
    expect(flash!.duration).toBeLessThanOrEqual(1)
  })

  it('accepts logo URL', () => {
    const result = createLaunchTeaser({
      productName: 'Brand',
      tagline: 'T',
      launchDate: 'Now',
      brandColor: '#000',
      logoUrl: 'https://example.com/logo.png',
    })
    const logo = result.scenes!.find(s => s.id === 'logo-reveal')!.nodes.find(n => n.id === 'logo')
    expect(logo).toBeDefined()
    expect(logo!.type).toBe('image')
  })
})

describe('tutorial template', () => {
  it('creates scenes with nodes', () => {
    const result = createTutorial({
      title: 'How to Build',
      subtitle: 'A quick guide',
      steps: [
        { title: 'Setup', explanation: 'Install the package' },
        { title: 'Configure', explanation: 'Add config file' },
        { title: 'Deploy', explanation: 'Ship it' },
      ],
      brandColor: '#10B981',
    })
    expect(result.scenes).toBeDefined()
    expect(result.scenes!.length).toBe(5) // intro + 3 steps + outro
    result.scenes!.forEach(s => {
      expect(s.nodes.length).toBeGreaterThan(0)
    })
  })

  it('includes code blocks when provided', () => {
    const result = createTutorial({
      title: 'T',
      subtitle: 'S',
      steps: [
        { title: 'Step 1', explanation: 'Do this', code: 'npm install' },
      ],
      brandColor: '#000',
    })
    const stepScene = result.scenes!.find(s => s.id === 'step-0')
    expect(stepScene).toBeDefined()
    const codeNode = stepScene!.nodes.find(n => n.id === 'step-code-text-0')
    expect(codeNode).toBeDefined()
    expect(codeNode!.metadata.content).toBe('npm install')
  })

  it('handles empty steps', () => {
    const result = createTutorial({
      title: 'T',
      subtitle: 'S',
      steps: [],
      brandColor: '#000',
    })
    expect(result.scenes!.length).toBe(2) // intro + outro
  })
})

describe('testimonial template', () => {
  it('creates scenes with nodes', () => {
    const result = createTestimonial({
      quote: 'Amazing product!',
      authorName: 'Jane Doe',
      authorTitle: 'CEO at Acme',
      brandColor: '#6366F1',
    })
    expect(result.scenes).toBeDefined()
    expect(result.scenes!.length).toBe(2) // quote + brand
    result.scenes!.forEach(s => {
      expect(s.nodes.length).toBeGreaterThan(0)
    })
  })

  it('includes stats scene when stats are provided', () => {
    const result = createTestimonial({
      quote: 'Great!',
      authorName: 'John',
      authorTitle: 'Dev',
      brandColor: '#000',
      stats: [
        { label: 'Revenue', value: '3x' },
        { label: 'Users', value: '10K' },
      ],
    })
    expect(result.scenes!.length).toBe(3) // quote + stats + brand
    const statsScene = result.scenes!.find(s => s.id === 'stats')
    expect(statsScene).toBeDefined()
  })

  it('uses shape when avatar URL is not provided', () => {
    const result = createTestimonial({
      quote: 'Q',
      authorName: 'A',
      authorTitle: 'T',
      brandColor: '#000',
    })
    const avatar = result.scenes![0].nodes.find(n => n.id === 'quote-author-avatar')
    expect(avatar).toBeDefined()
    expect(avatar!.type).toBe('shape')
  })
})

describe('feature-update template', () => {
  it('creates scenes with nodes', () => {
    const result = createFeatureUpdate({
      version: 'v2.0',
      featureName: 'Dark Mode',
      description: 'System-wide dark theme',
      changes: ['Updated UI colors', 'New contrast settings'],
      impact: 'Reduced eye strain by 40%',
      brandColor: '#F59E0B',
    })
    expect(result.scenes).toBeDefined()
    expect(result.scenes!.length).toBe(4) // badge + feature-name + changes + impact
    result.scenes!.forEach(s => {
      expect(s.nodes.length).toBeGreaterThan(0)
    })
  })

  it('includes all change items', () => {
    const result = createFeatureUpdate({
      version: 'v1',
      featureName: 'F',
      description: 'D',
      changes: ['Change A', 'Change B', 'Change C'],
      impact: 'Better',
      brandColor: '#000',
    })
    const changesScene = result.scenes!.find(s => s.id === 'changes')
    expect(changesScene).toBeDefined()
    const changeCount = changesScene!.nodes.filter(n => n.id.startsWith('change-item-')).length
    expect(changeCount).toBe(3)
  })

  it('handles single change', () => {
    const result = createFeatureUpdate({
      version: 'v1',
      featureName: 'F',
      description: 'D',
      changes: ['Only change'],
      impact: 'Impact',
      brandColor: '#000',
    })
    expect(result.scenes!.length).toBe(4)
  })
})

describe('all templates produce valid scene structure', () => {
  const templates: Array<{ name: string; fn: () => Partial<import('../../../video-engine/src/core/types').SceneGraph> }> = [
    {
      name: 'product-demo',
      fn: () => createProductDemo({
        productName: 'P', tagline: 'T', brandColor: '#000',
        features: [{ name: 'F', description: 'D' }], cta: 'CTA',
      }),
    },
    {
      name: 'explainer',
      fn: () => createExplainer({
        problem: 'P', solution: 'S', steps: ['S1'], brandColor: '#000',
      }),
    },
    {
      name: 'social-clip',
      fn: () => createSocialClip({
        hook: 'H', content: 'C', cta: 'CTA', brandColor: '#000',
      }),
    },
    {
      name: 'launch-teaser',
      fn: () => createLaunchTeaser({
        productName: 'P', tagline: 'T', launchDate: 'D', brandColor: '#000',
      }),
    },
    {
      name: 'tutorial',
      fn: () => createTutorial({
        title: 'T', subtitle: 'S',
        steps: [{ title: 'S1', explanation: 'E' }],
        brandColor: '#000',
      }),
    },
    {
      name: 'testimonial',
      fn: () => createTestimonial({
        quote: 'Q', authorName: 'A', authorTitle: 'T', brandColor: '#000',
      }),
    },
    {
      name: 'feature-update',
      fn: () => createFeatureUpdate({
        version: 'v1', featureName: 'F', description: 'D',
        changes: ['C1'], impact: 'I', brandColor: '#000',
      }),
    },
  ]

  templates.forEach(({ name, fn }) => {
    it(`${name} has valid scene structure`, () => {
      const result = fn()
      expect(result.scenes).toBeDefined()
      expect(Array.isArray(result.scenes)).toBe(true)
      expect(result.scenes!.length).toBeGreaterThan(0)

      result.scenes!.forEach((scene, i) => {
        expect(scene).toHaveProperty('id')
        expect(typeof scene.id).toBe('string')
        expect(scene.id).toBeTruthy()
        expect(scene).toHaveProperty('duration')
        expect(scene.duration).toBeGreaterThan(0)
        expect(scene).toHaveProperty('fps')
        expect(scene.fps).toBeGreaterThan(0)
        expect(scene).toHaveProperty('camera')
        expect(scene.camera.type).toMatch(/^(perspective|orthographic)$/)
        expect(scene).toHaveProperty('nodes')
        expect(Array.isArray(scene.nodes)).toBe(true)
        expect(scene.nodes.length).toBeGreaterThan(0)

        scene.nodes.forEach((node, j) => {
          expect(node).toHaveProperty('id')
          expect(typeof node.id).toBe('string')
          expect(node).toHaveProperty('type')
          expect(node).toHaveProperty('children')
          expect(node).toHaveProperty('parent')
          expect(node).toHaveProperty('visible')
          expect(node).toHaveProperty('blendMode')
          expect(node).toHaveProperty('opacity')
          expect(node).toHaveProperty('zIndex')
          expect(node).toHaveProperty('transform')
          expect(node.transform).toHaveProperty('position')
          expect(node.transform).toHaveProperty('rotation')
          expect(node.transform).toHaveProperty('scale')
          expect(node).toHaveProperty('animations')
          expect(Array.isArray(node.animations)).toBe(true)
          expect(node).toHaveProperty('effects')
          expect(Array.isArray(node.effects)).toBe(true)
          expect(node).toHaveProperty('metadata')

          // validate node ids are unique within scene
          const ids = scene.nodes.map(n => n.id)
          const uniqueIds = new Set(ids)
          expect(ids.length).toBe(uniqueIds.size)

          // validate parent references if set
          if (node.parent !== null) {
            expect(ids).toContain(node.parent)
          }
        })
      })
    })
  })
})
