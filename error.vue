<template>
	<div
		class="min-h-screen flex flex-col items-center justify-center bg-base-100 px-4 space-y-6 relative overflow-hidden"
		ref="containerRef"
	>
		<!-- Three.js 3D Canvas -->
		<canvas
			ref="canvasRef"
			class="absolute inset-0 pointer-events-none z-0"
		></canvas>

		<!-- Animated background particles -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none z-10">
			<div
				v-for="i in 15"
				:key="i"
				:ref="(el) => setParticleRef(el as HTMLElement, i)"
				class="absolute w-1 h-1 bg-error/20 rounded-full"
				:style="{ 
                    left: Math.random() * 100 + '%', 
                    top: Math.random() * 100 + '%'
                }"
			></div>
		</div>

		<!-- Main content with 3D transforms -->
		<div class="text-center space-y-6 z-20 relative">
			<!-- Animated status code with 3D effect -->
			<div
				ref="statusCodeRef"
				class="perspective-1000"
			>
				<h1
					class="text-8xl md:text-9xl font-bold text-error drop-shadow-2xl transform-gpu"
				>
					{{ error.statusCode }}
				</h1>
			</div>

			<!-- Status message with 3D tilt -->
			<div
				ref="statusMessageRef"
				class="perspective-1000"
			>
				<h2
					class="text-2xl md:text-3xl font-semibold text-base-content/80 max-w-md transform-gpu"
				>
					{{ error.statusMessage }}
				</h2>
			</div>

			<!-- Animated divider -->
			<div
				class="flex items-center justify-center"
				ref="dividerRef"
			>
				<div
					class="w-20 h-0.5 bg-gradient-to-r from-transparent via-error to-transparent"
					ref="dividerLineRef"
				></div>
			</div>

			<!-- 3D Button -->
			<div
				ref="buttonRef"
				class="perspective-1000"
			>
				<button
					class="btn btn-primary btn-lg group relative overflow-hidden transition-all duration-300 transform-gpu"
					@click="handleError"
					@mouseenter="onButtonHover"
					@mouseleave="onButtonLeave"
					ref="buttonElementRef"
				>
					<!-- Button background animation -->
					<span
						class="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0"
						ref="buttonBgRef"
					></span>

					<!-- Button text -->
					<span class="relative z-10 flex items-center gap-2">
						<svg
							class="w-5 h-5 transform-gpu"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							ref="arrowRef"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 19l-7-7m0 0l7-7m-7 7h18"
							/>
						</svg>
						<span ref="buttonTextRef">بازگشت به صفحه اصلی</span>
					</span>
				</button>
			</div>
		</div>

		<!-- 3D Floating geometric shapes -->
		<div
			class="absolute top-20 left-10 w-16 h-16 border-2 border-error/30 transform-gpu"
			ref="shape1Ref"
		></div>
		<div
			class="absolute bottom-20 right-10 w-12 h-12 bg-primary/20 rounded-full transform-gpu"
			ref="shape2Ref"
		></div>
		<div
			class="absolute top-1/3 right-20 w-8 h-8 bg-secondary/30 transform-gpu"
			ref="shape3Ref"
		></div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import * as THREE from 'three'

type ErrorProps = {
    statusCode: String;
    statusMessage: String;
}
defineProps<{ error: ErrorProps }>();

// Template refs
const containerRef = ref<HTMLElement>()
const canvasRef = ref<HTMLCanvasElement>()
const statusCodeRef = ref<HTMLElement>()
const statusMessageRef = ref<HTMLElement>()
const dividerRef = ref<HTMLElement>()
const dividerLineRef = ref<HTMLElement>()
const buttonRef = ref<HTMLElement>()
const buttonElementRef = ref<HTMLElement>()
const buttonBgRef = ref<HTMLElement>()
const arrowRef = ref<HTMLElement>()
const buttonTextRef = ref<HTMLElement>()
const shape1Ref = ref<HTMLElement>()
const shape2Ref = ref<HTMLElement>()
const shape3Ref = ref<HTMLElement>()
const particleRefs = ref<(HTMLElement | null)[]>([])

// Three.js variables
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let cubes: THREE.Mesh[] = []
let spheres: THREE.Mesh[] = []
let animationFrameId: number

let particleAnimations: gsap.core.Tween[] = []
let shapeAnimations: gsap.core.Tween[] = []

// Helper function to set particle refs safely
const setParticleRef = (el: HTMLElement | null, index: number) => {
  if (el) {
    particleRefs.value[index] = el
  }
}

const handleError = () => {
  // Simple redirect without animation
  clearError({ redirect: '/' });
};

const onButtonHover = () => {
  if (!buttonElementRef.value || !buttonBgRef.value || !arrowRef.value) return;

  gsap.to(buttonElementRef.value, {
    scale: 1.1,
    rotationX: -5,
    rotationY: 5,
    z: 20,
    duration: 0.4,
    ease: "power2.out"
  })
  gsap.to(buttonBgRef.value, {
    opacity: 1,
    duration: 0.3
  })
  gsap.to(arrowRef.value, {
    x: -4,
    rotationZ: -10,
    duration: 0.3,
    ease: "power2.out"
  })
}

const onButtonLeave = () => {
  if (!buttonElementRef.value || !buttonBgRef.value || !arrowRef.value) return;

  gsap.to(buttonElementRef.value, {
    scale: 1,
    rotationX: 0,
    rotationY: 0,
    z: 0,
    duration: 0.4,
    ease: "power2.out"
  })
  gsap.to(buttonBgRef.value, {
    opacity: 0,
    duration: 0.3
  })
  gsap.to(arrowRef.value, {
    x: 0,
    rotationZ: 0,
    duration: 0.3,
    ease: "power2.out"
  })
}

const initThreeJS = () => {
  if (!canvasRef.value) return;

  // Scene setup
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    alpha: true,
    antialias: true
  })

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x000000, 0) // Transparent background

  // Create 3D floating cubes
  const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  const cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xff6b6b,
    wireframe: true,
    transparent: true,
    opacity: 0.3
  })

  for (let i = 0; i < 8; i++) {
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.position.set(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    )
    scene.add(cube)
    cubes.push(cube)
  }

  // Create 3D floating spheres
  const sphereGeometry = new THREE.SphereGeometry(0.3, 16, 16)
  const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x4dabf7,
    transparent: true,
    opacity: 0.4
  })

  for (let i = 0; i < 6; i++) {
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.set(
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8
    )
    scene.add(sphere)
    spheres.push(sphere)
  }

  camera.position.z = 10

  // Start render loop
  animate3D()
}

const animate3D = () => {
  animationFrameId = requestAnimationFrame(animate3D)

  // Rotate cubes
  cubes.forEach((cube, index) => {
    cube.rotation.x += 0.01 + index * 0.002
    cube.rotation.y += 0.01 + index * 0.002
  })

  // Float spheres
  spheres.forEach((sphere, index) => {
    sphere.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002
    sphere.rotation.y += 0.005
  })

  renderer.render(scene, camera)
}

const init3DAnimations = () => {
  // Animate 3D objects with GSAP
  cubes.forEach((cube, index) => {
    gsap.to(cube.position, {
      y: cube.position.y + 2,
      duration: 3 + index,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut",
      delay: index * 0.2
    })
  })

  spheres.forEach((sphere, index) => {
    gsap.to(sphere.position, {
      x: sphere.position.x + 3,
      z: sphere.position.z + 2,
      duration: 4 + index,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
      delay: index * 0.3
    })
  })
}

const initAnimations = () => {
  // Enhanced null checks for all refs
  const refs = [
    statusCodeRef.value,
    statusMessageRef.value,
    dividerLineRef.value,
    shape1Ref.value,
    shape2Ref.value,
    shape3Ref.value
  ]

  // Check if any critical refs are missing
  if (refs.some(ref => !ref)) {
    console.warn('Some refs are not available yet, retrying...')
    // Retry after a short delay
    gsap.delayedCall(0.1, initAnimations)
    return
  }

  // 3D Status code animation - with null check
  if (statusCodeRef.value) {
    gsap.to(statusCodeRef.value, {
      rotationX: 2,
      rotationY: -2,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut"
    })
  }

  // 3D Message tilt - with null check
  if (statusMessageRef.value) {
    gsap.to(statusMessageRef.value, {
      rotationX: -1,
      rotationY: 1,
      duration: 5,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut"
    })
  }

  // Divider shimmer - with null check
  if (dividerLineRef.value) {
    gsap.to(dividerLineRef.value, {
      scaleX: 0,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut",
      delay: 1
    })
  }

  // 3D Shape animations with depth - with null checks
  if (shape1Ref.value) {
    shapeAnimations.push(
      gsap.to(shape1Ref.value, {
        rotationX: 360,
        rotationY: 360,
        z: 50,
        duration: 8,
        repeat: -1,
        ease: "none"
      })
    )
  }

  if (shape2Ref.value) {
    shapeAnimations.push(
      gsap.to(shape2Ref.value, {
        y: -20,
        z: 30,
        rotationZ: 180,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
      })
    )
  }

  if (shape3Ref.value) {
    shapeAnimations.push(
      gsap.to(shape3Ref.value, {
        rotationX: "+=45",
        rotationY: "+=45",
        z: 20,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
      })
    )
  }

  // Enhanced 3D Particle animations with null checks
  particleRefs.value.forEach((particle, index) => {
    if (particle) {
      const animation = gsap.to(particle, {
        y: gsap.utils.random(-30, 30),
        x: gsap.utils.random(-20, 20),
        z: gsap.utils.random(10, 100),
        rotationX: gsap.utils.random(0, 360),
        rotationY: gsap.utils.random(0, 360),
        scale: gsap.utils.random(0.5, 2),
        duration: gsap.utils.random(3, 6),
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
        delay: gsap.utils.random(0, 3)
      })
      particleAnimations.push(animation)
    }
  })
}

const handleResize = () => {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
}

onMounted(async () => {
  // Wait for DOM to be fully rendered
  await nextTick()

  // Initialize Three.js
  initThreeJS()

  // Initialize 3D object animations
  init3DAnimations()

  // Initialize GSAP animations with a longer delay to ensure refs are ready
  gsap.delayedCall(0.2, initAnimations)

  // Handle window resize
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  // Clean up animations
  particleAnimations.forEach(anim => anim.kill())
  shapeAnimations.forEach(anim => anim.kill())

  // Clean up Three.js
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  if (renderer) {
    renderer.dispose()
  }

  window.removeEventListener('resize', handleResize)

  // Kill tweens with null checks
  const elements = [
    statusCodeRef.value,
    statusMessageRef.value,
    dividerRef.value,
    buttonRef.value,
    dividerLineRef.value,
    shape1Ref.value,
    shape2Ref.value,
    shape3Ref.value,
    buttonElementRef.value,
    buttonBgRef.value,
    arrowRef.value
  ].filter(Boolean)

  if (elements.length > 0) {
    gsap.killTweensOf(elements)
  }
})
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.transform-gpu {
  transform-style: preserve-3d;
  will-change: transform;
}

/* Enhanced 3D button styles */
.btn {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transform-style: preserve-3d;
}

.btn:hover {
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

/* 3D text shadows for depth */
h1 {
  text-shadow:
    0 1px 0 rgba(0,0,0,0.1),
    0 2px 0 rgba(0,0,0,0.1),
    0 3px 0 rgba(0,0,0,0.1),
    0 4px 0 rgba(0,0,0,0.1),
    0 5px 0 rgba(0,0,0,0.1),
    0 6px 1px rgba(0,0,0,0.1),
    0 0 5px rgba(0,0,0,0.1),
    0 1px 3px rgba(0,0,0,0.3),
    0 3px 5px rgba(0,0,0,0.2),
    0 5px 10px rgba(0,0,0,0.25);
}
</style>
