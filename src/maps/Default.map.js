import { TOWER_TYPE_DEFAULT, 
         GRASS_TILE, 
         GROUND_TILE, 
         CONCRETE_TILE,
         EMPTY_TILE, } from '../utils/constants.js';

export const DEFAULT_MAP = {
	tileMapConfig: [
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
	],
	startPoint: {column: 0, row: 2},
	endPoint: {column: 0, row: 6},
	enemyPath: [{c: 1, r: 3}, {c: 2, r: 2}, {c: 3, r: 3}, {c: 4, r: 2}, {c: 5, r: 3},
				{c: 6, r: 2}, {c: 7, r: 3}, {c: 8, r: 3}, {c: 9, r: 4}, {c: 8, r: 4},
				{c: 9, r: 5}, {c: 8, r: 5}, {c: 7, r: 6}, {c: 6, r: 6}, {c: 5, r: 7},
				{c: 4, r: 6}, {c: 3, r: 7}, {c: 2, r: 6}, {c: 1, r: 7}, {c: 0, r: 6}],
	tileSize: 40
}
	
