import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'

export default function PokeBall({ z }) {
  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])

  const ref = useRef()
  const { nodes, materials } = useGLTF('/pokeball-v1-transformed.glb')

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2), // Cuts value in two and give - and + range
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  })

  useFrame((state) => {
    ref.current.rotation.set(
      (data.rX += 0.004),
      (data.rY += 0.003),
      (data.rZ += 0.002)
    )
    ref.current.position.set(data.x * width, (data.y += 0.025), z)

    if (data.y > height) {
      data.y = -height
    }
  })

  return (
    <mesh
      geometry={nodes.Sphere003_0.geometry}
      material={materials['Material.001']}
      position={[0.159, -0.07, 0.144]}
      rotation={[-1.453, 0, -Math.PI]}
      scale={2}
      ref={ref}
    />
  )
}
