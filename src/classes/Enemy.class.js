import * as THREE from '../utils/three.module.js';
import { DEFAULT_MATERIAL } from '../utils/constants.js';
import { SkeletonUtils } from '../utils/SkeletonUtils.js';

export class EnemyParent {
    constructor(props){
    	this.level;
    	this.health;
    	this.path = [...window.stage.enemyPath];
    	this.startPoint = window.stage.startPoint;
    	this.endPoint = window.stage.endPoint;
    	this.speed = 0.5;
    	this.isMoving = false;
    	this.mesh;
    	this.nextTile;
    	this.spawned = false;
    	this.enemies = [];
    	this.hp = 100;
    }

    spawn() {
	  var objGeometry = new THREE.SphereBufferGeometry( 20, 10, 10 );
     // this.mesh = window.meshes.ENEMY.clone();
      this.mesh= SkeletonUtils.clone(window.meshes.ENEMY_FBX);
      this.mesh.animations = window.meshes.ENEMY_FBX.animations
        this.mesh.scale.set(.3, .3, .3)				
		this.mixer = new THREE.AnimationMixer( this.mesh );
	//	mixamo.com
		this.action = this.mixer.clipAction( this.mesh.animations[0] );

		this.action.play();
	  //this.mesh = new THREE.Mesh(objGeometry, DEFAULT_MATERIAL);
	  this.spawned = true;
	  let startPointTile = window.stage.getTile(window.stage.startPoint.row, window.stage.startPoint.column)
	  this.mesh.position.set(startPointTile.tileX, 20, startPointTile.tileY);
	  window.world.scene.add(this.mesh);
	}

    moveToNextPoint() {
    	if (this.hp <= 0) {
    		this.destroy()
    		if(this.nextTile){
    			this.nextTile.enemies = this.nextTile.enemies.filter(data => data != this);
    			this.nextTile=false
    		}
    	}
    	if (this.nextTile) {
		  	if (this.mesh.position.x > this.nextTile.tileX) {
			    this.mesh.position.x -= this.speed//Math.min( this.speed, this.dX );
			}
		  	
		  	if (this.mesh.position.z > this.nextTile.tileY) {
			    this.mesh.position.z -= this.speed//Math.min( this.speed, this.dY );
			}

		  	if (this.mesh.position.x < this.nextTile.tileX) {
			    this.mesh.position.x += this.speed//Math.min( this.speed, this.dX );
			}
		  	
		  	if (this.mesh.position.z < this.nextTile.tileY) {
			    this.mesh.position.z += this.speed//Math.min( this.speed, this.dY );
			}

			if (Math.abs(this.mesh.position.x - this.nextTile.tileX) < this.nextTile.size &&
				Math.abs(this.mesh.position.z - this.nextTile.tileY) < this.nextTile.size && 
				this.nextTile.enemies.indexOf(this) < 0) {
			    	this.nextTile.enemies.push(this);
				}

			if (parseInt(this.mesh.position.x) == parseInt(this.nextTile.tileX) &&
				parseInt(this.mesh.position.z) == parseInt(this.nextTile.tileY)) {

				this.nextTile.enemies.filter(data => data != this);
				this.nextTile.enemies = this.nextTile.enemies.filter(data => data != this);
			
				this.nextTile = false;
			}

    	} else {
    		if(this.path.length > 0) {

		    	let nextPoint = this.path.shift();
		    	this.nextTile = window.stage.getTile(nextPoint.r, nextPoint.c);
			  	this.dX = this.mesh.position.x - this.nextTile.tileX;
		    	this.dY = this.mesh.position.z - this.nextTile.tileY;

		    	this.isMoving = true;
		   		this.mesh.lookAt(new THREE.Vector3(this.nextTile.tileX, 0,this.nextTile.tileY ))
    		} else {
    			this.destroy()
    		}
    	}
    }

    destroy() {
		if(this.path.length <= 0) {
			window.gameState.restLife()
		} else {
			window.gameState.addKill();
		}
		
		var uuid = this.mesh.uuid;
		window.gameMode.enemies.splice(window.gameMode.enemies.indexOf(this), 1);
    	window.world.scene.remove(this.mesh);
    }
}
