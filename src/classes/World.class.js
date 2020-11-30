import * as THREE from '../utils/three.module.js';

import { MapControls } from '../utils/OrbitControls.js';

export class World{
    constructor(){
        this.scene = new THREE.Scene();
       
        // ISOMETRIC CAMERA
        let aspect = window.innerWidth / window.innerHeight
        let d = 600
        this.camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 2000)

        this.camera.position.z = 0;
        this.camera.position.y = 0;
        this.camera.position.x = 0;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.scene.background = new THREE.Color( 0x556655 );

        // controls
        this.controls = new MapControls( this.camera, this.renderer.domElement );

        this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        this.controls.dampingFactor = 0.05;

        this.controls.screenSpacePanning = false;

        this.controls.minDistance = 1000;
        this.controls.maxDistance = 3000;

        this.controls.maxPolarAngle = Math.PI / 2;

        // LIGHTS
        const dirLight = new THREE.DirectionalLight( 0xffffff, 1);
        dirLight.position.set( 300, 300, 300 ).normalize();
        this.scene.add( dirLight );

        const pointLight = new THREE.PointLight( 0xffffff, 1 );
        pointLight.position.set( 300, 1000, 300 );
        pointLight.color.setHSL( 1, 1, 1 );
        this.scene.add( pointLight );

        document.body.appendChild( this.renderer.domElement );
    }

    render(){
        this.controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

        this.renderer.render( this.scene, this.camera );
    }
}
