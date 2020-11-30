import * as THREE from './three.module.js';

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

export const DEFAULT_MATERIAL = new THREE.MeshBasicMaterial({ color: 0x03cafc } );

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