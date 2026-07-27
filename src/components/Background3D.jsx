import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function BoxGrid() {
  const points = useMemo(() => {
    const p = []
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        p.push([i - 10, -2, j - 10])
      }
    }
    return p
  }, [])

  return (
    <group>
      {points.map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.02, 0.02, 0.02]} />
          <meshStandardMaterial color="#E5B23E" opacity={0.3} transparent />
        </mesh>
      ))}
    </group>
  )
}

function Particles() {
  const count = 500
  const mesh = useRef()

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      dummy.scale.set(s, s, s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <>
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial color="#E5B23E" roughness={0} metalness={1} />
      </instancedMesh>
    </>
  )
}

const Background3D = () => {
  return (
    <Canvas shadows dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#E5B23E" />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#E5B23E" castShadow />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <BoxGrid />
        <Particles />
      </Float>

      <fog attach="fog" args={['#000000', 5, 20]} />
    </Canvas>
  )
}

export default Background3D
