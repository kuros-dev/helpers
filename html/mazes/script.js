
const ROWS = 7;
const COLS = 9;
const CENTER_X = 4;
const CENTER_Y = 3;
const MAX_LIFE = 5;
const ROOMCHANCE = 0.2;
const BATTLECHANCE = 0.08;

// Definimos la estructura 'Point' como un objeto en JavaScript
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// Definimos la estructura 'Cell' como un objeto en JavaScript
class Cell {
    constructor() {
        this.north = 0;  // 1 si hay puerta al norte, 0 si no
        this.south = 0;  // 1 si hay puerta al sur, 0 si no
        this.east = 0;   // 1 si hay puerta al este, 0 si no
        this.west = 0;   // 1 si hay puerta al oeste, 0 si no
        this.isThere = 0; // 1 si hay algo en la celda, 0 si no
        this.combat = 0;  // 1 si hay combate en la celda, 0 si no
    }
}

// CODIGO // CODIGO

// Función para verificar si las coordenadas están dentro de los límites
function isWithinBounds(x, y) {
    return !(x < 0 || x >= COLS || y < 0 || y >= ROWS);
}

function find(id){
    return document.getElementById(id);
}

// Función para verificar si un punto existe en el arreglo de puntos
function isPoint(visited, x, y) {
    return visited.findIndex(p => p.x === x && p.y === y) !== -1;
}

function drawDungeon2(arr) {
    let buf = "";
    arr.forEach(element => {
        buf = "";
        element.forEach(celula => {
            buf += `(${celula.west ? "<" : " "}${celula.north ? "^" : " "}${celula.south ? "v" : " "}${celula.east ? ">" : " "})`;
        });
        console.log(buf)
    });
}

// Función para generar el dungeon (mazmorras aleatorias)
function generateRandomDungeon() {
    let dungeon = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => new Cell()));

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            dungeon[i][j].combat = Math.random() < 0.15 ? 1 : 0;
            dungeon[i][j].north = Math.random() < ROOMCHANCE ? 1 : 0;
            dungeon[i][j].south = Math.random() < ROOMCHANCE ? 1 : 0;
            dungeon[i][j].east = Math.random() < ROOMCHANCE ? 1 : 0;
            dungeon[i][j].west = Math.random() < ROOMCHANCE ? 1 : 0;
        }
    }

    // Asegurarse de que el centro no tenga combate
    dungeon[CENTER_X][CENTER_Y].combat = 0;

    return dungeon;
}

// Función para ajustar las puertas del dungeon
function checkAndFixDoors(dungeon) {
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (dungeon[i][j].north && i > 0) dungeon[i - 1][j].south = 1;
            if (dungeon[i][j].south && i < ROWS - 1) dungeon[i + 1][j].north = 1;
            if (dungeon[i][j].east && j < COLS - 1) dungeon[i][j + 1].west = 1;
            if (dungeon[i][j].west && j > 0) dungeon[i][j - 1].east = 1;
        }
    }
}

// Convierte una dirección 0-3 en vector dx, dy
function composer(direction) {
    switch (direction) {
        case 0: return { dx: 0, dy: -1 }; // norte
        case 1: return { dx: 0, dy: 1 };  // sur
        case 2: return { dx: 1, dy: 0 };  // este
        case 3: return { dx: -1, dy: 0 }; // oeste
    }
}

// Genera un camino desde el centro del dungeon
function generatePathFromCenter(dungeon, startX, startY) {
    const maxIter = 10000;
    const visited = [];
    const routes = [];

    let cur = { x: startX, y: startY };
    visited.push({ ...cur });
    let solved = false;

    for (let i = 0; i < maxIter; i++) {
        const r = Math.floor(Math.random() * 4);
        const { dx, dy } = composer(r);
        const target = { x: cur.x + dx, y: cur.y + dy };

        // Solo seguimos si no hemos visitado antes
        if (!isPoint(visited, target.x, target.y)) {
            visited.push({ ...target });
            routes.push(r);
            cur = target;

            // Si salimos del dungeon
            if (!isWithinBounds(cur.x, cur.y, dungeon.length, dungeon[0].length)) {
                solved = true;

                // Marcamos las puertas en el camino
                for (let k = 0; k < visited.length - 1; k++) {
                    const cell = dungeon[visited[k].y][visited[k].x];
                    const dir = routes[k];
                    switch (dir) {
                        case 0: cell.north = 1; break;
                        case 1: cell.south = 1; break;
                        case 2: cell.east = 1; break;
                        case 3: cell.west = 1; break;
                    }
                }
                break;
            }
        }
    }

    return solved;
}

// Función para mover el jugador
function movePlayer(cur, dungeon, direction) {
    const { x, y } = cur;
    if (direction === 'w' && dungeon[y][x].north) cur.y--;
    if (direction === 's' && dungeon[y][x].south) cur.y++;
    if (direction === 'a' && dungeon[y][x].west) cur.x--;
    if (direction === 'd' && dungeon[y][x].east) cur.x++;

    return cur;
}

function fight() {
    // return Math.random() < 0.5 ? "win" : "lose";

}

// Función principal


let salida = false;
var dungeon = {}
while (!salida) {
    dungeon = generateRandomDungeon();
    salida = generatePathFromCenter(dungeon, CENTER_X, CENTER_Y)
    console.log(salida ? "hay salida" : "no hay salida")
    checkAndFixDoors(dungeon);
    dungeon[CENTER_Y][CENTER_X].combat = 0;
}