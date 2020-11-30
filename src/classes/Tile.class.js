import * as THREE from '../utils/three.module.js';
import { TowerParent } from './TowerParent.class.js';
import { TOWER_TYPE_DEFAULT, 
         GRASS_TILE, 
         GROUND_TILE, 
         CONCRETE_TILE } from '../utils/constants.js';

export class Tile {
    constructor(props){
        this.vertices = [];
        this.material;
        this.geometry;
        this.mesh;
        this.shape;
        this.angles;
        this.interactive = props.interactive ? props.interactive : false;
        this.row = props.row;
        this.column = props.column;
        this.type = props.type ? props.type : GRASS_TILE;
        this.size = props.size ? props.size : 20;
        this.debug=false;
        this.color;
        this.building;
        this.enemies = [];
        this.selected = false;
    }

    setup() {

            this.color = window.TILE_COLORS[this.type];
            this.material = window.TILE_COLORS[this.type];
            this.mesh = window.meshes.TILE.clone();
            this.mesh.material = this.material;
            this.mesh.material.needsUpdate = true;

            let ratio = this.size * 2
            this.tileX = this.column * ratio - this.column * this.size / 4;
            this.tileY = this.column % 2 == 0 ? this.row *  ratio + this.size : (this.row *  ratio)
            this.mesh.position.set(this.tileX, 0, this.tileY );
            //this.mesh.scale.set(20, 15, 20)
            console.log(this.mesh)
            window.world.scene.add(this.mesh);
            window.meshesToObjects = {}
            window.meshesToObjects[this.mesh.uuid] = {"row": this.row, "column": this.column}
            if (this.debug) { 
                this.debugMesh.position.set(this.tileX, 0, this.tileY ) 
                window.world.scene.add(this.debugMesh);    
            }
        //this.polygon(0 ,0,this.size,6);
        //this.geometry = new THREE.ShapeGeometry(this.shape);
        //this.mesh.rotation.set(-1.570, 0, 0)
        /*let ratio = this.size * 2
        this.tileX = this.column * ratio - this.column * this.size / 4;
        this.tileY = this.column % 2 == 0 ? this.row *  ratio + this.size : (this.row *  ratio)
        this.mesh.rotation.set(-1.570, 0, 0)
        this.mesh.position.set(this.tileX, 0, this.tileY );
        if (this.debug) { this.debugMesh.position.set(this.tileX, 0, this.tileY ) }*/
    }

    polygon(x, y, radius, npoints) {
        let angle = (Math.PI * 2) / npoints;
        this.shape = new THREE.Shape();

        for (let a = 0; a <= (Math.PI * 2); a += angle) {
          let sx = x + Math.cos(a) * radius;
          let sy = y + Math.sin(a) * radius;
          this.shape.lineTo(sx, sy);
        }


        if (this.debug) {
            this.drawDebugInfo();
        } 
            
        this.material =  window.TILE_COLORS[this.type];
        this.color = window.TILE_COLORS[this.type];
        this.geometry = new THREE.ShapeGeometry(this.shape);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
  }


  drawDebugInfo() {
    //create image
    var bitmap = document.createElement('canvas');
    var g = bitmap.getContext('2d');
    bitmap.width = this.size;
    bitmap.height = this.size;
    g.font = '12px Arial';
    let text = "c:" + this.column+ " r:" + this.row;


    g.fillStyle= "white";
    g.fillRect(0,0,bitmap.width,bitmap.height);

    g.fillStyle = 'black';
    g.fillText(text, 0, 30);
    g.strokeStyle = 'black';
    g.strokeText(text, 0, 30);
    // canvas contents will be used for a texture
    var texture = new THREE.Texture(bitmap) 

    texture.needsUpdate = true;
    var objGeometry = new THREE.BoxGeometry(this.size, 2, this.size);
    var objMaterial = new THREE.MeshBasicMaterial({ map: texture,  color: window.TILE_COLORS[this.type] } );

    var debugMesh = new THREE.Mesh(objGeometry, objMaterial);
    this.debugMesh = debugMesh
  }

  createTower(props) {
    if (!window.towerMesh) {
        window.fbxloader.load('src/models/Tower_Fire.fbx', (object) => {
            object.traverse(( child ) => {
                if ( child.isMesh ) {
                    window.towerMesh = child;
                }
            });

            this.building = new TowerParent({...props, selected: this.selected});
            window.gameMode.towers.push(this.building)
            this.building.setup();
        });
    } else {
        this.building = new TowerParent({...props, selected: this.selected});
        window.gameMode.towers.push(this.building)
        this.building.setup();
    }
  }

  setSelected(setting) { 
    this.selected = setting;
    if (this.building) {
        this.building.setSelected(setting);
    }
  }

  setMaterial(material) {
    this.mesh.material = material;
  }
}
