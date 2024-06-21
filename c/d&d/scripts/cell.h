#ifndef CELL_H
#define CELL_H

#define ROWS 7
#define COLS 9
#define CENTER_X 4
#define CENTER_Y 3
#define MAX_LIFE 3

typedef struct {
    int x;
    int y;
} Point;

typedef struct {
    int north;  // 1 si hay puerta al norte, 0 si no
    int south;  // 1 si hay puerta al sur, 0 si no
    int east;   // 1 si hay puerta al este, 0 si no
    int west;   // 1 si hay puerta al oeste, 0 si no
    int isThere; // 1 si hay algo en la celda, 0 si no
    int combat;  // 1 si hay combate en la celda, 0 si no
} Cell;

#endif
