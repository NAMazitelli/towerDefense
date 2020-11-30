import * as THREE from '../utils/three.module.js';

import { MapControls } from '../utils/OrbitControls.js';

export class World{
    constructor(){
        this.scene = new THREE.Scene();
       
        // ISOMETRIC CAMERA
        let aspect = window.innerWidth / window.innerHeight
        let d = 600
        this.camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 2000)
       // this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,1,5000);
        //this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
        this.camera.position.z = 0;
        this.camera.position.y = 0;
        this.camera.position.x = 0;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.scene.background = new THREE.Color( 0x000000 );

        // controls
        this.controls = new MapControls( this.camera, this.renderer.domElement );

        this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        this.controls.dampingFactor = 0.05;

        this.controls.screenSpacePanning = false;

        this.controls.minDistance = 1000;
        this.controls.maxDistance = 3000;

        this.controls.maxPolarAngle = Math.PI / 2;

       /* // LIGHTS
        const dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
        dirLight.position.set( 0, 0, 1 ).normalize();
        this.scene.add( dirLight );

        const pointLight = new THREE.PointLight( 0xffffff, 1.5 );
        pointLight.position.set( 0, 100, 90 );
        pointLight.color.setHSL( Math.random(), 1, 0.5 );
        this.scene.add( pointLight );*/

        //this.gui = new GUI();
        //this.gui.add( this.controls, 'screenSpacePanning' );
        document.body.appendChild( this.renderer.domElement );
    }

    render(){
        this.controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

        this.renderer.render( this.scene, this.camera );
    }
}
