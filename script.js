import { World } from './src/classes/World.class.js';
import { Stage } from './src/classes/Stage.class.js';
import { GameMode } from './src/classes/GameMode.class.js';
import { GameState } from './src/classes/GameState.class.js';
import { HUD } from './src/classes/HUD.class.js';
import { 
    HOVERED_TILE_OK, 
    HOVERED_TILE_ERR, 
    CONCRETE_TILE,
    GROUND_TILE,
    GRASS_TILE,
    SELECTED_TILE, 
    PLAYER_SETTINGS,
    TOWER_TYPE_ICE,
    TOWER_TYPE_FIRE,
    TOWER_TYPE_SPEED,
    GAME_MODE_DEFAULT,
    GAME_MODE_AR,
    GAME_MODES,
    WORLD_MODES,
    MAP_MODES,
} from './src/utils/constants.js';
import {loadResources} from './src/utils/loadResources.js';

const clock = new THREE.Clock();
var intersects, hoverObj, hoveredTile, hoveredTileObj, activeTileObj, tmpOldColor, tmpOldColorActive;
var towers = [];
var raycaster = new THREE.Raycaster(); // create once
var mouse = new THREE.Vector2(); // create once
let delta;
var storeButtons = document.querySelectorAll('.purchase_button');
document.getElementById('start_game').addEventListener( 'click', () => init(GAME_MODE_DEFAULT))
document.getElementById('start_game_ar').addEventListener( 'click', () => init(GAME_MODE_AR))

function init(mode) {
    document.getElementById('start_menu').classList.add("hidden")
    document.getElementById('main_game').classList.remove("hidden")
    window.meshesToObjects = {}
    window.hud = new HUD();
    window.user_game_mode = mode;
    window.allLoaded = allLoaded;
    window.loader = new loadResources();
    window.loader.setup();
}


function allLoaded() {
    var defaultMap = MAP_MODES[window.user_game_mode];
    window.world = new WORLD_MODES[window.user_game_mode];
    window.gameMode = new GAME_MODES[window.user_game_mode];
    window.stage = new Stage(defaultMap);
    window.stage.setup();
    window.gameState = new GameState(PLAYER_SETTINGS);
    //window.world.HDRIIllumination('src/images/fondo.hdr')

    window.hud.setUpStore(purchaseButtonClick);

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'click', (e) => handleClick(e), false );
    document.addEventListener( 'touchstart', (e) => handleClick(e), false );

    let hordebtn = document.getElementById("horde-btn");
    hordebtn.addEventListener( 'click', () => { window.gameMode.spawnHorde(window.gameMode) });
    hordebtn.addEventListener( 'touchstart', () => { console.log("HOLA"); window.gameMode.spawnHorde(window.gameMode); });

    mainLoop();
}

function mainLoop() {
    delta = clock.getDelta();
    if (window.gameMode.contextAR) { 
        window.gameMode.contextAR.actualizar();
    }

    if (window.gameState.lives > 0) {

        if (window.gameMode.enemies.length > 0) {
            window.gameMode.enemies.forEach(function(value){
                if (value.spawned) { 
                    value.moveToNextPoint()
                    value.mixer.update( delta );

                }       
            })
        }
        window.hud.update();
        window.gameState.update();

        if (window.gameMode.towers.length > 0) {
            window.gameMode.towers.forEach(function(value){
                value.checkForEnemies()
                if (value.projectiles.length > 0) {
                    value.projectiles.forEach(function(projValue){
                        projValue.move()
                    });
                }
            })
        }
    }
    window.world.render();
    requestAnimationFrame(mainLoop)
}


function onDocumentMouseMove( event ) {
    // update the mouse variable
    let worldSceneChildren;
    if (event.touches && event.touches.length > 0) {
        mouse.x = ( event.touches[0].clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.touches[0].clientY / window.innerHeight ) * 2 + 1;
        worldSceneChildren = window.gameMode.marker.children

    } else {
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        worldSceneChildren = window.world.scene.children

    }

    raycaster.setFromCamera( mouse, window.world.camera );
    
    // check if something near mouse
    let tmpIntersect = raycaster.intersectObjects( worldSceneChildren );

    if (tmpIntersect.length > 0) {
        let intersectedObject = tmpIntersect[0].object;

        // If another tile was hovered before this
        if (hoveredTileObj && !hoveredTileObj.selected) {
            hoveredTileObj.setMaterial(hoveredTileObj.color);
        } 
        setHoveredTile(intersectedObject)
    } else {
        if (hoveredTileObj && !hoveredTileObj.selected) {
            hoveredTileObj.setMaterial(hoveredTileObj.color);
        }
        hoveredTile, hoveredTileObj = false;

    }
}

function setHoveredTile(intersectedObject) {
    hoveredTile = intersectedObject;
    let hoveredTileObjCoords = window.meshesToObjects[intersectedObject.uuid];

    if (hoveredTileObjCoords) {

        hoveredTileObj = window.stage.getTile(hoveredTileObjCoords.row, hoveredTileObjCoords.column);
        if (hoveredTileObj.interactive && !hoveredTileObj.selected){
            hoveredTileObj.setMaterial(window.TILE_COLORS[HOVERED_TILE_OK]);

        } else if (!hoveredTileObj.selected){
            hoveredTileObj.setMaterial(window.TILE_COLORS[HOVERED_TILE_ERR]);
        }
    }
}

function handleClick(event) {
    onDocumentMouseMove(event);
    if (hoveredTileObj && hoveredTileObj.interactive) {
        window.hud.hideBuildingMenu();

        if (hoveredTileObj != activeTileObj) {
            window.hud.showBuildingMenu();
            if (activeTileObj) {
                activeTileObj.setSelected(false)
                activeTileObj.setMaterial(activeTileObj.color);
            };

            activeTileObj = hoveredTileObj;
            activeTileObj.setMaterial(window.TILE_COLORS[SELECTED_TILE]);
            activeTileObj.setSelected(true);
        } else {
            activeTileObj.setMaterial(activeTileObj.color);
            activeTileObj.setSelected(false)
            activeTileObj = false;
        }
    }
}

function purchaseButtonClick(e) {
    if(activeTileObj && !activeTileObj.building) {
        if (window.gameState.gold >= e.price) {
            activeTileObj.createTower({
                x: activeTileObj.tileX, 
                y: activeTileObj.tileY, 
                tile: { 
                    column: activeTileObj.column, 
                    row: activeTileObj.row 
                },
                ...e
            });

            window.gameState.gold -= e.price;
        }
    }
}


//init();
