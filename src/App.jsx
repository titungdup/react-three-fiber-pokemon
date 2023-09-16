import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'
import PokeBall from './Pokeball'
import PokemonLogo from './assets/pokemon.png'

function App({ count = 100, depth = 100 }) {
  // const [speed, setSpeed] = useState(0.025)

  // const handleRangeChange = (e) => {
  //   setSpeed(e.target.value)
  // }

  return (
    <>
      <div className='canvas-container'>
        <Canvas
          gl={{ alpha: false }}
          camera={{ near: 0.01, far: 110, fov: 25 }}
        >
          <color attach='background' args={['#ffc700']} />
          <spotLight position={[10, 10, 10]} intensity={0.1} />
          <Suspense fallback={null}>
            {Array.from({ length: count }, (_, i) => (
              <PokeBall key={i} z={(-i / count) * depth - 20} />
            ))}
            <Environment preset='studio' />
            <EffectComposer>
              <DepthOfField
                focalLength={0.6}
                target={[0, 0, depth / 1.5]}
                bokehScale={10}
                height={900}
              />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>
      <div className='content'>
        <img src={PokemonLogo} className='logo' />
        {/* <input
          type='range'
          min='0'
          max='0.3'
          step='0.005'
          value={speed}
          onChange={handleRangeChange}
          className='range-select'
        /> */}
      </div>
    </>
  )
}

export default App
