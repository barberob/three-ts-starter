import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer'

export default class Renderer {
    instance: THREE.WebGLRenderer

    constructor() {
        this.instance = this.createRenderer()
        this.onResize()
    }

    createRenderer() {
        const width = innerWidth
        const height = innerHeight
        const renderer = new WebGLRenderer({
            canvas: document.getElementById('webgl') as HTMLCanvasElement
        })

        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(width, height)

        return renderer
    }

    onResize() {
        addEventListener('resize', () => {
            const width = innerWidth
            const height = innerHeight
            this.instance.setSize(width, height)
        })
    }
}
