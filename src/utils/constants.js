import * as THREE from './three.module.js';
import { GameMode } from '../classes/GameMode.class.js';
import { GameModeAR } from '../classes/GameModeAR.class.js';
import { World } from '../classes/World.class.js';
import { WorldAR } from '../classes/WorldAR.class.js';
export const TOWER_TYPE_DEFAULT = "TOWER_TYPE_DEFAULT";
export const TOWER_TYPE_ICE = "TOWER_TYPE_ICE";
export const TOWER_TYPE_FIRE = "TOWER_TYPE_FIRE";
export const TOWER_TYPE_SPEED = "TOWER_TYPE_SPEED";

export const GRASS_TILE = "GRASS_TILE";
export const GROUND_TILE = "GROUND_TILE";
export const CONCRETE_TILE = "CONCRETE_TILE";
export const EMPTY_TILE = "EMPTY_TILE";
export const SELECTED_TILE = "SELECTED_TILE";
export const HOVERED_TILE_OK = "HOVERED_TILE_OK";
export const HOVERED_TILE_ERR = "HOVERED_TILE_ERR";
export const GAME_MODE_DEFAULT = "GAME_MODE_DEFAULT";
export const GAME_MODE_AR = "GAME_MODE_AR";
export const DEFAULT_MATERIAL = new THREE.MeshBasicMaterial({ color: 0x03cafc } );



var tileMapConfig = [
		[{type: EMPTY_TILE}, {type: GROUND_TILE}, {type: GROUND_TILE}, {type: GROUND_TILE}, {type: GROUND_TILE}, {type: GROUND_TILE}, {type: GROUND_TILE}, {type: GROUND_TILE}],
		[{type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}],
		[{type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: GRASS_TILE}, {type: GRASS_TILE}],
		[{type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE},  {type: CONCRETE_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}],
		[{type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true},  {type: GRASS_TILE, interactive: true},  {type: GRASS_TILE, interactive: true}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE},  {type: GRASS_TILE, interactive: true}],
		[{type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true},  {type: GRASS_TILE, interactive: true},  {type: GRASS_TILE, interactive: true}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE},  {type: GRASS_TILE, interactive: true}],
		[{type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE},  {type: GRASS_TILE, interactive: true},  {type: GRASS_TILE, interactive: true}],
		[{type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: CONCRETE_TILE}, {type: GRASS_TILE, interactive: true}],
		[{type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}, {type: GRASS_TILE, interactive: true}],
		[{type: EMPTY_TILE}, {type: EMPTY_TILE}, {type: GROUND_TILE}, {type: GROUND_TILE}, {type: GROUND_TILE}, {type: GROUND_TILE},  {type: GROUND_TILE},  {type: GROUND_TILE}, {type: GROUND_TILE},],	
	];
var tileSize = 0.4;
var tileMapConfigLength = tileMapConfig.length;
export const DEFAULT_MAP_AR = {
	tileMapConfig: tileMapConfig,
	startPoint: {column: 0, row: 2},
	endPoint: {column: 0, row: 6},
	enemyPath: [{c: 1, r: 3}, {c: 2, r: 2}, {c: 3, r: 3}, {c: 4, r: 2}, {c: 5, r: 3},
				{c: 6, r: 2}, {c: 7, r: 3}, {c: 8, r: 3}, {c: 9, r: 4}, {c: 8, r: 4},
				{c: 9, r: 5}, {c: 8, r: 5}, {c: 7, r: 6}, {c: 6, r: 6}, {c: 5, r: 7},
				{c: 4, r: 6}, {c: 3, r: 7}, {c: 2, r: 6}, {c: 1, r: 7}, {c: 0, r: 6}],
	tileSize: tileSize,
	tileOffsetX: tileMapConfig[tileMapConfigLength / 2].length * tileSize,
	tileOffsetY: tileMapConfigLength * tileSize
}

tileSize = 40;
export const DEFAULT_MAP = {
	tileMapConfig: tileMapConfig,
	startPoint: {column: 0, row: 2},
	endPoint: {column: 0, row: 6},
	enemyPath: [{c: 1, r: 3}, {c: 2, r: 2}, {c: 3, r: 3}, {c: 4, r: 2}, {c: 5, r: 3},
				{c: 6, r: 2}, {c: 7, r: 3}, {c: 8, r: 3}, {c: 9, r: 4}, {c: 8, r: 4},
				{c: 9, r: 5}, {c: 8, r: 5}, {c: 7, r: 6}, {c: 6, r: 6}, {c: 5, r: 7},
				{c: 4, r: 6}, {c: 3, r: 7}, {c: 2, r: 6}, {c: 1, r: 7}, {c: 0, r: 6}],
	tileSize: tileSize,
	tileOffsetX:0,
	tileOffsetY: 0
}



export const GAME_MODES = {
	GAME_MODE_DEFAULT: GameMode,
	GAME_MODE_AR: GameModeAR,
}

export const WORLD_MODES = {
	GAME_MODE_DEFAULT: World,
	GAME_MODE_AR: WorldAR,
}
export const MAP_MODES = {
	GAME_MODE_DEFAULT: DEFAULT_MAP,
	GAME_MODE_AR: DEFAULT_MAP_AR,
}

export const TOWER_SETTINGS = [
	{
		type: TOWER_TYPE_ICE,
		price: 20,
		damage: 30,
		range: 1,
		attack_speed: 2,
		HOVERED_TILE_OK,
	},
	{
		type: TOWER_TYPE_FIRE,
		price: 30,
		damage: 60,
		range: 1,
		attack_speed: 4,
		material:HOVERED_TILE_ERR,
	},
	{
		type: TOWER_TYPE_SPEED,
		price: 50,
		range: 2,
		damage: 25,
		attack_speed: 1,
		material: GROUND_TILE,
	}
]


export const PLAYER_SETTINGS = {
	gold: 200,
	lives: 20,
	time_between_hordes: 20,
	tower_settings:	TOWER_SETTINGS,
};