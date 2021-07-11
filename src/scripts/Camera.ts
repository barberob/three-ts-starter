import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera'

export default class Camera {
    instance: THREE.PerspectiveCamera

    constructor(scene: THREE.Scene) {
        this.instance = this.createCamera()
        this.initCamera(scene)
        this.onResize()
    }

    createCamera() {
        const width = window.innerWidth
        const height = window.innerHeight
        return new PerspectiveCamera(75, width / height, 0.1, 100)
    }

    initCamera(scene: THREE.Scene) {
        this.instance.position.z = 3
        scene.add(this.instance)
    }

    onResize() {
        addEventListener('resize', () => {
            // Save sizes
            const width = window.innerWidth
            const height = window.innerHeight

            // Update camera
            this.instance.aspect = width / height
            this.instance.updateProjectionMatrix()
        })
    }
}
