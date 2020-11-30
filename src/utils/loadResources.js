import * as THREE from './three.module.js';

import { FBXLoader } from './FBXLoader.js';

export class loadResources {
    constructor(props){
    	this.loadManager = new THREE.LoadingManager();
		this.frameID = null;
		this.percentComplete = 0;
		this.updateAmount = 5;

    }

    setup() {
    	const thisObjeeee = this;
		this.loadManager.onStart = () => {
		  // onStart may be called multiple times
		  // don't run the animation more than once
		  if ( thisObjeeee.frameID !== null ) return;
		  thisObjeeee.animateBar(thisObjeeee);
		};


		this.loadManager.onLoad = ( ) => {
			console.log("wpew")
		  	window.hud.loadingElem.classList.add( 'hidden' );

		  // reset the bar in case we need to use it again
		  thisObjeeee.percentComplete = 0;
		  window.hud.progress.style.width = 0;
		  cancelAnimationFrame( thisObjeeee.animateBar );
	 	  window.allLoaded()

		  // do any other on load things
		};

    	this.fbxloader = new FBXLoader(this.loadManager);
		this.textureloader = new THREE.TextureLoader(this.loadManager);

		window.meshes = {}
		this.fbxloader.load('src/models/HexTile.fbx', 
			(object) => {
				object.traverse( function ( child ) {
	    	        if ( child.isMesh ) {
	    	            window.meshes.TILE = child;
	    	        }
	    	    });
			},
			this.loadManager.onProgress,
			this.loadManager.onError			
		);

		this.fbxloader.load('src/models/Tower_Ice.fbx', (object) => {
			object.traverse( function ( child ) {
    	        if ( child.isMesh ) {
    	            window.meshes.TOWER_TYPE_ICE = child;
    	        }
    	    });
		},
			this.loadManager.onProgress,
			this.loadManager.onError			
		);

		this.fbxloader.load('src/models/Tower_Fire.fbx', (object) => {
			object.traverse( function ( child ) {
    	        if ( child.isMesh ) {
    	            window.meshes.TOWER_TYPE_FIRE = child;
    	        }
    	    });
		},
			this.loadManager.onProgress,
			this.loadManager.onError			
		);

		this.fbxloader.load('src/models/Tower_Light.fbx', (object) => {
			object.traverse( function ( child ) {
    	        if ( child.isMesh ) {
    	            window.meshes.TOWER_TYPE_SPEED = child;
    	        }
    	    });
		},
			this.loadManager.onProgress,
			this.loadManager.onError			
		);


		window.TILE_COLORS = {
			//GRASS_TILE: new THREE.MeshBasicMaterial({ color: 0x32a852 } ),
			//GROUND_TILE: new THREE.MeshBasicMaterial({ color: 0xb0b0b0 } ),
			GRASS_TILE: new THREE.MeshBasicMaterial({ map: this.textureloader.load('src/models/TextureGrass.png') } ),
			GROUND_TILE: new THREE.MeshBasicMaterial({ map: this.textureloader.load('src/models/TextureRock.png') } ),
			CONCRETE_TILE: new THREE.MeshBasicMaterial({ map: this.textureloader.load('src/models/TextureSand.png') } ),
			EMPTY_TILE: new THREE.MeshBasicMaterial({ color: 0x000000 } ),
			HOVERED_TILE_OK: new THREE.MeshBasicMaterial({ color: 0x4444ff } ),
			HOVERED_TILE_ERR: new THREE.MeshBasicMaterial({ color: 0xff0000 } ),
			SELECTED_TILE: new THREE.MeshBasicMaterial({ color: 0x64644 } ),
		};

    }

	animateBar(objee) {

	  	objee.percentComplete += objee.updateAmount;

	    // if the bar fills up, just reset it.
	    // you could also change the color here
	    if ( objee.percentComplete >= 100 ) {
	    	objee.percentComplete = 5;
	    }
	    if (window.hud) { 
	    	window.hud.progress.style.width = objee.percentComplete + '%' 
	    };
		objee.frameID = requestAnimationFrame( () => objee.animateBar(objee) )
	}
}


/*
loadManager.onLoad = () => {
    window.hud.loadingElem.style.display = 'none';
    window.start = true
};
 
loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
    const progress = itemsLoaded / itemsTotal;
    window.hud.progressbar.style.transform = `scaleX(${progress})`;
};


*/