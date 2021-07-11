import './styles/style.scss'

import { Mesh } from 'three/src/objects/Mesh'
import { Scene } from 'three/src/scenes/Scene'
import { BoxGeometry } from 'three/src/geometries/BoxGeometry'
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial'
import { Clock } from 'three/src/core/Clock'

import Camera from './scripts/Camera'
import Renderer from './scripts/Renderer'

import basicVertexShader from './shaders/base/vertex.glsl?raw'
import basicFragmentShader from './shaders/base/fragment.glsl?raw'

class App {
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.Camera
    meshes: {
        [key: string]: THREE.Mesh
    }
    sizes: { width: number; height: number }

    time: {
        clock: THREE.Clock
        deltaTime: number
        lastTime: number
    }
    constructor() {
        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.meshes = {}

        this.init()
        this.createMeshes()

        this.loop()
    }

    init() {
        this.renderer = new Renderer().instance
        this.scene = new Scene()
        this.camera = new Camera(this.scene).instance
        this.time = {
            deltaTime: 0,
            lastTime: 0,
            clock: new Clock()
        }
    }

    createMeshes() {
        console.log(this.meshes)
        this.meshes.cube = new Mesh(
            new BoxGeometry(1, 1, 1),
            new ShaderMaterial({
                fragmentShader: basicFragmentShader,
                vertexShader: basicVertexShader
            })
        )
        this.scene.add(this.meshes.cube)
    }

    loop = () => {
        const elapsedTime = this.time.clock.getElapsedTime()
        this.time.deltaTime = elapsedTime - this.time.lastTime
        this.time.lastTime = elapsedTime

        this.meshes.cube.rotation.y += 0.5 * this.time.deltaTime
        this.meshes.cube.rotation.x += 0.5 * this.time.deltaTime

        this.renderer.render(this.scene, this.camera)
        window.requestAnimationFrame(this.loop)
    }
}

new App()
