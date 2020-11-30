import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.module.js';
import { TOWER_TYPE_DEFAULT } from '../utils/constants.js';
import { HOVERED_TILE_OK, SELECTED_TILE, DEFAULT_MATERIAL, TOWER_TYPE_ICE } from '../utils/constants.js';
import { Projectile } from './Projectile.class.js';

export class TowerParent {
    constructor(props){
        this.type = props.type ? props.type : TOWER_TYPE_DEFAULT;
        this.level = 1;
        this.damage = props.damage;
        this.range = props.range;
        this.maxLevel = 3;
        this.material = props.material;
        this.model;
        this.price = props.price;
        this.x = props.x;
        this.y = props.y;
        this.tile = props.tile;
        this.watchedTiles = [];
        this.selected = props.selected ? props.selected : false;
        this.attacking = false;
        this.attack_speed = props.attack_speed
        this.projectiles = [];
    }

    setup() {

	  var objGeometryTower = new THREE.BoxGeometry(50, 80, 50);
	  var meshTower = new THREE.Mesh(objGeometryTower, this.material);

	  var meshTower =window.meshes.TOWER_TYPE_ICE.clone();
	  meshTower.position.set(this.x, 0, this.y)

	  if (this.range > 0) {
	  	this.findRelativeTiles(this.tile);
	  	if (this.range > 1) {
		  for ( let rangei = 1; rangei < this.range; rangei++) {
		  	this.watchedTiles.forEach((value) => {
		  		this.findRelativeTiles(value)
		  	})
		  } 
		}
	  }
   	  this.toggleRange(this.selected);
	  window.world.scene.add(meshTower);
    }

    findRelativeTiles(tile, avoidDuplicates = true) {
    	let maxCol = window.stage.tileMap[tile.row].length;
    	let maxRow = window.stage.tileMap.length
    	let relatives = []
    	let tmpTile = {};

    	if (tile.column - 1 >= 0) {
			if (tile.column % 2 == 0) {
	    		tmpTile = {
	    			column: tile.column -1,
	    			row: tile.row
	    		};
	 

	    		this.addTileToArray(tmpTile, avoidDuplicates, relatives)

	    		if (tile.row + 1 <= maxRow) {
					tmpTile = {
	    				column: tile.column -1,
	    				row: tile.row + 1
	    			};

			   		this.addTileToArray(tmpTile, avoidDuplicates, relatives)
	    		}
    		} else {
				if (tile.row - 1 >= 0) {
	    			tmpTile = {
	    				column: tile.column -1,
	    				row: tile.row - 1 
		    		};
	 
		    		this.addTileToArray(tmpTile, avoidDuplicates, relatives)
				}

				tmpTile = {
    				column: tile.column -1,
    				row: tile.row
    			};

		   		this.addTileToArray(tmpTile, avoidDuplicates, relatives)
	    		
    		}
    	}


    	if (tile.row - 1 >= 0) {
    		tmpTile ={
    			column: tile.column,
    			row: tile.row -1
    		};

    		this.addTileToArray(tmpTile, avoidDuplicates, relatives)
    	}

    	if (tile.row + 1 <= maxRow) {
    		tmpTile ={
    			column: tile.column,
    			row: tile.row + 1
    		};
    		this.addTileToArray(tmpTile, avoidDuplicates, relatives)

    	}

    	if (tile.column + 1 <= maxCol) {
			if (tile.column % 2 == 0) {
	    		tmpTile ={
	    			column: tile.column + 1,
	    			row: tile.row
	    		};
	    		this.addTileToArray(tmpTile, avoidDuplicates, relatives)

	    		if (tile.row + 1 <= maxRow) {
	    			tmpTile ={
	    				column: tile.column + 1,
	    				row: tile.row + 1
	    			};
		    		this.addTileToArray(tmpTile, avoidDuplicates, relatives)
	    		}
	    	} else {
	    		if (tile.row - 1 >= 0) {
	    			tmpTile ={
	    				column: tile.column + 1,
	    				row: tile.row - 1
	    			};
		    		this.addTileToArray(tmpTile, avoidDuplicates, relatives)
	    		}

	    		tmpTile ={
	    			column: tile.column + 1,
	    			row: tile.row
	    		};

	    		this.addTileToArray(tmpTile, avoidDuplicates, relatives)

	    	}
    	}

    	return relatives;
    }

    addTileToArray(tile, avoidDuplicates, relatives) {
    	let addToArray = true;

		if (avoidDuplicates) {
    		addToArray = this.watchedTiles.indexOf(tile) < 0 && 
    					 !window.stage.tileMap[tile.row][tile.column].bulding;
    	}

    	if (addToArray) {
    		if (tile.row == this.tile.row && 
    			tile.column == this.tile.column) { return }

    		relatives.push(tile);
    		this.watchedTiles.push(tile)
    	}
    }

    setSelected(setting) {
    	this.selected = setting;
    	this.toggleRange(setting);
    }

    toggleRange(setting) {
		let actualTile
    	if (setting) {
    		this.watchedTiles.forEach((value, index) => {
    			actualTile = window.stage.tileMap[value.row][value.column]
	            actualTile.setMaterial(window.TILE_COLORS[HOVERED_TILE_OK]);

	            if (!actualTile.building) {
	            	actualTile.setSelected(true)
	            }
    		})
    	} else {
	  		this.watchedTiles.forEach((value, index) => {
    			actualTile = window.stage.getTile(value.row, value.column)
				actualTile.setMaterial(actualTile.color);
	            
	            if (!actualTile.building) {
	            	actualTile.setSelected(false)
	            }
    		})
    	}
    }

    checkForEnemies() {
    	this.watchedTiles.forEach((value)=>{

			let targetTile = window.stage.getTile(value.row, value.column)
    		if (targetTile.enemies.length > 0 && !this.attacking) {
    			this.attacking = true;
				this.attack(targetTile)
				
    			setTimeout(() => {this.attacking = false;}, this.attack_speed * 1000);
    		}
    	})
    }

    attack(tile) {
    	let projectile  = new Projectile({ 
    		tile: {...tile}, 
    		spawnTile:  window.stage.getTile(this.tile.row, this.tile.column),
    		damage: this.damage,
    		parent: this
    	});
    	projectile.setup()
    	this.projectiles.push(projectile)
    }

}
