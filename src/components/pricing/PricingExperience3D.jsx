import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { CatmullRomCurve3, Vector3 } from 'three'
import { useReducedMotion } from 'framer-motion'

const levels = { Core: 1, Prime: 2, Vertex: 3 }

function BlossomCloud({ position, scale = 1, shade = '#d9959b' }) {
  const flowers = useMemo(() => Array.from({ length: 9 }, (_, index) => {
    const angle = index * 2.399
    const radius = 0.07 + ((index * 17) % 6) * 0.022
    return [Math.cos(angle) * radius, Math.sin(angle * 1.7) * 0.11, Math.sin(angle) * radius]
  }), [])

  return (
    <group position={position} scale={scale}>
      {flowers.map((point, index) => <group key={index} position={point} rotation={[index * 0.3, index * 0.2, index * 0.6]}>
        {Array.from({ length: 5 }, (_, petal) => {
          const angle = (petal / 5) * Math.PI * 2
          return <mesh key={petal} position={[Math.cos(angle) * 0.03, Math.sin(angle) * 0.03, 0]} scale={[0.037, 0.05, 0.016]} rotation={[0, 0, angle]}>
            <sphereGeometry args={[1, 8, 6]} />
            <meshStandardMaterial color={petal === 0 && index % 2 === 0 ? '#f1c8c5' : shade} roughness={0.48} emissive="#591d30" emissiveIntensity={0.08} />
          </mesh>
        })}
        <mesh scale={0.012}><sphereGeometry args={[1, 8, 6]} /><meshStandardMaterial color="#f4d9b2" roughness={0.55} /></mesh>
      </group>)}
    </group>
  )
}

const branchPaths = [
  { points: [[0, 0.44, 0], [-0.18, 0.55, 0.02], [-0.43, 0.72, 0.02], [-0.66, 1.02, 0.04]], radius: 0.055 },
  { points: [[0.01, 0.73, 0.02], [0.19, 0.82, 0.02], [0.45, 0.96, 0.05], [0.72, 1.25, 0.06]], radius: 0.06 },
  { points: [[0.03, 1.02, -0.02], [-0.1, 1.14, -0.03], [-0.29, 1.34, -0.01], [-0.48, 1.58, 0.02]], radius: 0.047 },
  { points: [[0.04, 1.18, 0.03], [0.2, 1.31, 0.04], [0.39, 1.48, 0.06], [0.53, 1.72, 0.08]], radius: 0.045 },
  { points: [[0.04, 1.38, 0], [-0.01, 1.53, 0.01], [0.02, 1.73, 0.02], [0.13, 1.93, 0.03]], radius: 0.038 },
]

function BarkLimb({ points, radius, color }) {
  const curve = useMemo(() => new CatmullRomCurve3(points.map((point) => new Vector3(...point))), [points])
  return <mesh>
    <tubeGeometry args={[curve, 20, radius, 8, false]} />
    <meshStandardMaterial color={color} roughness={0.78} />
  </mesh>
}

function SakuraTree({ level, animate }) {
  const tree = useRef()
  const blossomRefs = useRef([])
  const positions = useMemo(() => [
    [-0.72, 1.2, 0.08], [-0.55, 1.48, 0.02], [-0.43, 1.69, 0.06], [-0.2, 1.78, 0.02],
    [0.08, 1.84, 0.06], [0.36, 1.77, 0.02], [0.58, 1.67, 0.08], [0.76, 1.43, 0.02],
    [-0.66, 1.05, 0.02], [-0.4, 1.24, 0.12], [-0.16, 1.43, 0.08], [0.16, 1.43, 0.02],
    [0.42, 1.27, 0.08], [0.66, 1.12, 0.04], [0, 1.13, 0.1],
  ], [])

  useFrame((state, delta) => {
    if (!animate) return
    const time = state.clock.elapsedTime
    if (tree.current) {
      tree.current.rotation.y = Math.sin(time * 0.26) * 0.12
      tree.current.rotation.z = Math.sin(time * 0.42) * 0.018
    }
    blossomRefs.current.forEach((bloom, index) => {
      if (!bloom) return
      const target = level >= (index > 6 ? 3 : index > 3 ? 2 : 1) ? 0.9 : 0.48
      const next = bloom.scale.x + (target - bloom.scale.x) * Math.min(1, delta * 2.4)
      bloom.scale.setScalar(next)
    })
  })

  return (
    <group ref={tree} position={[0.24, -0.95, 0]}>
      <BarkLimb points={[[0, -0.12, 0], [-0.01, 0.35, 0], [0.015, 0.82, 0.01], [0.04, 1.35, 0.02], [0.08, 1.78, 0.02]]} radius={0.12} color="#60463c" />
      {branchPaths.map((branch, index) => <BarkLimb key={index} points={branch.points} radius={branch.radius} color={index % 2 ? '#735248' : '#806052'} />)}
      {positions.map((position, index) => (
        <group key={index} ref={(node) => { blossomRefs.current[index] = node }} position={position} scale={0.48}>
          <BlossomCloud position={[0, 0, 0]} scale={index % 3 === 0 ? 1.2 : 1.05} shade={index % 2 ? '#c77d89' : '#d9959b'} />
        </group>
      ))}
    </group>
  )
}

function FallingPetals({ level, animate }) {
  const petals = useRef([])
  const pieces = useMemo(() => Array.from({ length: 30 }, (_, index) => ({
    x: ((index * 37) % 100) / 100 * 3 - 1.5,
    y: ((index * 19) % 100) / 100 * 3.3 - 0.7,
    z: ((index * 13) % 100) / 100 * 0.7 - 0.35,
    speed: 0.2 + (index % 6) * 0.055,
    sway: 0.12 + (index % 5) * 0.035,
  })), [])

  useFrame((state, delta) => {
    if (!animate) return
    const time = state.clock.elapsedTime
    petals.current.forEach((petal, index) => {
      if (!petal) return
      petal.position.y -= pieces[index].speed * delta
      petal.position.x = pieces[index].x + Math.sin(time * 0.65 + index) * pieces[index].sway
      petal.rotation.z += delta * (0.5 + (index % 5) * 0.2)
      if (petal.position.y < -1.8) petal.position.y = 2.3 + (index % 4) * 0.25
    })
  })

  return <group>
    {pieces.map((piece, index) => <mesh key={index} ref={(node) => { petals.current[index] = node }} position={[piece.x, piece.y, piece.z]} scale={level === 3 ? 0.75 : 0.58} rotation={[0.2, 0.3, index]}>
      <sphereGeometry args={[0.045, 8, 6]} />
      <meshStandardMaterial color={index % 3 ? '#d9959b' : '#f1c8c5'} transparent opacity={0.82} roughness={0.6} />
    </mesh>)}
  </group>
}

function PartnershipScene({ plan, animate }) {
  const level = levels[plan] || 2
  const rings = [useRef(), useRef(), useRef()]

  useFrame((state, delta) => {
    if (!animate) return
    const t = state.clock.elapsedTime
    rings.forEach((ring, index) => {
      if (!ring.current) return
      ring.current.rotation.z += delta * (index % 2 ? -0.16 : 0.12)
      const active = level >= index + 1
      const nextOpacity = active ? 0.48 : 0.06
      ring.current.material.opacity += (nextOpacity - ring.current.material.opacity) * Math.min(1, delta * 2.4)
    })
    if (rings[0].current) rings[0].current.position.y = -0.87 + Math.sin(t * 0.7) * 0.035
  })

  return <>
    <SakuraTree level={level} animate={animate} />
    <FallingPetals level={level} animate={animate} />
    {[0, 1, 2].map((index) => <mesh key={index} ref={rings[index]} position={[0.24, -0.86 + index * 0.05, -0.12]} rotation={[Math.PI / 2 + index * 0.2, 0.1, index * 0.28]}>
      <torusGeometry args={[0.92 + index * 0.12, 0.012, 8, 96]} />
      <meshStandardMaterial color={index === 2 ? '#ddc29b' : '#762a31'} metalness={0.65} roughness={0.28} transparent opacity={0.06} />
    </mesh>)}
  </>
}

export default function PricingExperience3D({ plan }) {
  const reduceMotion = useReducedMotion()
  const animate = !reduceMotion
  return (
    <div style={{ position: 'relative', height: '350px', overflow: 'hidden', borderRadius: '24px', background: 'radial-gradient(ellipse at 58% 42%, #fff 0%, #f1eeea 56%, #e8e3dd 100%)' }}>
      <Canvas aria-label={`3D ${plan} cherry blossom partnership experience`} frameloop={reduceMotion ? 'demand' : 'always'} dpr={[1, 1.25]} camera={{ position: [0, 0.15, 4.2], fov: 38 }} gl={{ alpha: true, antialias: true }} style={{ display: 'block', width: '100%', height: '100%' }}>
        <ambientLight intensity={1.45} />
        <directionalLight position={[3, 4, 3]} intensity={2.1} color="#fff1de" />
        <pointLight position={[-2, -1, 2]} intensity={1.2} color="#a8463e" />
        <PartnershipScene plan={plan} animate={animate} />
      </Canvas>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(90deg, rgba(248,246,243,.48), transparent 30%, transparent 70%, rgba(248,246,243,.36))' }} />
      <div style={{ position: 'absolute', left: 'clamp(1.2rem, 5vw, 3.5rem)', bottom: '1.5rem', pointerEvents: 'none' }}>
        <p style={{ fontSize: '0.63rem', letterSpacing: '0.17em', textTransform: 'uppercase', color: '#7d7772', fontWeight: 700 }}>A partnership, in motion</p>
        <p style={{ marginTop: '0.25rem', fontSize: '1.1rem', color: '#292524', fontWeight: 600 }}>{plan} · {plan === 'Core' ? 'A considered beginning' : plan === 'Prime' ? 'Momentum with intention' : 'A world built around your brand'}</p>
      </div>
      <span aria-hidden="true" style={{ position: 'absolute', right: '1.5rem', top: '1.2rem', fontSize: '0.62rem', letterSpacing: '0.18em', color: '#9b948b' }}>thenightera / studio</span>
    </div>
  )
}
