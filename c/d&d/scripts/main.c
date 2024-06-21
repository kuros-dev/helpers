#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include "cell.h"

int isWithinBounds(int y, int x) {
    if ((x < 0 || x > (ROWS-1)) || (y < 0 || y > (COLS-1))){
        return 0;
    }
    return 1;
}


int isPoint(Point array[], int size, int x, int y) {
    for (int i = 0; i < size; i++) {
        if (array[i].x == x && array[i].y == y) {
            return i; // Retorna el índice del elemento encontrado
        }
    }
    return -1; // Retorna -1 si no se encuentra el elemento
}

void drawDungeon(char* target, Cell dungeon[ROWS][COLS], int x, int y, char* spacer) {
    char buffer[1000];
    target[0] = '\0';

    for (int i = 0; i < ROWS; i++) {
        if (i == 0) {
            strcat(target, spacer);
            for (int j = 0; j < COLS; j++) {
                strcat(target, "+");
                strcat(target, dungeon[i][j].north ? "   " : "---");
            }
            strcat(target, "+\n");
        }

        strcat(target, spacer);
        for (int j = 0; j < COLS; j++) {
            strcat(target, dungeon[i][j].west ? " " : "|");

            if  ((i == y) && (j == x)) {
                strcat(target, " X ");
            }else {
                strcat(target, (dungeon[i][j].combat) ? "   " : "   ");
            }

            if (j + 1 >= COLS) {
                strcat(target, dungeon[i][j].east ? " " : "|");
            }
        }
        strcat(target, "\n");

        strcat(target, spacer);
        for (int j = 0; j < COLS; j++) {
            strcat(target, "+");
            strcat(target, dungeon[i][j].south ? "   " : "---");
        }
        strcat(target, "+\n");
    }
    strcat(target, "\n");
}

void checkAndFixDoors(Cell dungeon[ROWS][COLS]) {
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            if (dungeon[i][j].north && i > 0) {
                dungeon[i-1][j].south = 1;
            }
            if (dungeon[i][j].south && i < ROWS - 1) {
                dungeon[i+1][j].north = 1;
            }
            if (dungeon[i][j].east && j < COLS - 1) {
                dungeon[i][j+1].west = 1;
            }
            if (dungeon[i][j].west && j > 0) {
                dungeon[i][j-1].east = 1;
            }
        }
    }
}

void composer (int rand, int vector[2]) {
    switch(rand) {
        case 0:             // NORTH
            vector[0] = 0;
            vector[1] = -1;
            break;
        case 1:             // SOUTH
            vector[0] = 0;
            vector[1] = 1;
            break;
        case 2:             // EAST
            vector[0] = 1;
            vector[1] = 0;
            break;
        case 3:             // WEST
            vector[0] = -1;
            vector[1] = 0;
            break;
    }
}

char ass(int rand){
    char array[] = {'N', 'S', 'E', 'W'};
    return array[rand];
}

int generatePathFromCenter(Cell dungeon[ROWS][COLS], int startX, int startY) {
    
    srand(time(NULL));
    int maxiter = 10000;

    Point visited[1000];
    int routes[1000];
    routes[0] = -999;

    int i = 0, j = 0; // i = iterations, j = visited variable length;
    int cond = 1;
    int r = rand() % 4;

    Point cur = (Point){startX, startY};
    Point target = (Point){startX, startY};
    int vector[] = {0, 0};

    visited[j] = (Point){cur.x, cur.y};
    j++;
    int solved = 0;

    while ( i < maxiter){
        r = rand() % 4;
        composer(r, vector);
        target.x = cur.x + vector[0];
        target.y = cur.y + vector[1];

        if (isPoint(visited, j, target.x, target.y) == -1) {

            cur.x = target.x;
            cur.y = target.y;
            visited[j] = (Point){cur.x, cur.y};
            routes[j] = r;

            if (!isWithinBounds(cur.x, cur.y)){
                i = maxiter +1;
                solved = 1;

                printf("return \n");

                for (int loser = 0; loser < j; loser++){
                    
                    switch(routes[loser+1]){
                        case 0:
                            dungeon[visited[loser].y][visited[loser].x].north = 1;
                            break;
                        case 1:
                            dungeon[visited[loser].y][visited[loser].x].south = 1;
                            break;
                        case 2:
                            dungeon[visited[loser].y][visited[loser].x].east = 1;
                            break;
                        case 3:
                            dungeon[visited[loser].y][visited[loser].x].west = 1;
                            break;
                    }
                }
            }
            j++;    
        }
        
        i++;
    }
    return solved;
}

void generateRandomDungeon(Cell d[ROWS][COLS], int rows, int cols) {
    // Semilla aleatoria basada en el tiempo actual
    srand(time(NULL));

    // Itera sobre cada celda en la matriz
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            // Genera aleatoriamente si hay combate (15% de probabilidad)
            d[i][j].combat = (rand() % 100) < 15 ? 1 : 0;

            // Genera aleatoriamente las puertas abiertas (20% de probabilidad para cada puerta)
            d[i][j].north = (rand() % 100) < 20 ? 1 : 0;
            d[i][j].south = (rand() % 100) < 20 ? 1 : 0;
            d[i][j].east = (rand() % 100) < 20 ? 1 : 0;
            d[i][j].west = (rand() % 100) < 20 ? 1 : 0;
        }
    }

    d[CENTER_X][CENTER_Y].combat = 0;
}

void defineEmpty(Cell d[ROWS][COLS]){
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            d[i][j] = (Cell){0, 0, 0, 0, 0, 0};
        }
    }
}

int main() {
    // Limpia la pantalla
    int lifes = MAX_LIFE;
    system("cls");
    char buffer[1000];
    char spacer[10] = "\t\t";
    char option;
    char input[100];

    Point cur = (Point){CENTER_X, CENTER_Y};
    // Inicializa el grid de celdas
    Cell grid[ROWS][COLS];
    // Pausa la ejecución del programa para que el usuario pueda ver el mapa
    int pause;
    int solveres = 0;
    int r = 0;
    
    while ( !solveres) {
        
        defineEmpty(grid);
        generateRandomDungeon(grid, ROWS, COLS);
        solveres = generatePathFromCenter(grid, CENTER_X, CENTER_Y);
        checkAndFixDoors(grid);
        // generateRandomDungeon(grid, ROWS, COLS);
        
    }

    while (1){
        if (!isWithinBounds(cur.x, cur.y)){
                system("cls");
                printf("\n\tYou Won\n");
                scanf("%s", input);
                option = input[0];
                system("cls");
                return 0;
            }
        if (lifes == 0){
            system("cls");
                printf("\n\tYou lost all your lifes\n");
                scanf("%s", input);
                option = input[0];
                system("cls");
                return 0;
        }
        if (grid[cur.y][cur.x].combat){
            system("cls");
            printf("   ////\n   |  |\n    \\/\n   __|__\n     |\n    /\\\n");
            printf("\n\t FIGHT!\n\tlifes: %d/%d\nthrow coin >>> ", lifes, MAX_LIFE);
            scanf("%s", input);
            option = input[0];
            system("cls");

            if (rand() % 2 == 0){
                system("cls");
                printf("\t/ \\\n\t|+|\n\t\\ /\n");
                printf("heads, you win\n");
            } else {
                lifes--;
                system("cls");
                printf("\t/ \\\n\t|-|\n\t\\ /\n");
                printf("tails, you lost a life\n");
            }
            
            scanf("%s", input);
            option = input[0];
            grid[cur.y][cur.x].combat = 0;

        }else{
            
            system("cls");
            // printf("X:%d Y:%d\nN %d S %d E %d W %d\n", cur.x, cur.y, grid[cur.y][cur.x].north, grid[cur.y][cur.x].south, grid[cur.y][cur.x].east, grid[cur.y][cur.x].west);
            drawDungeon(buffer, grid, cur.x, cur.y, spacer);
            printf("\n\n%s\n\n\tWASD\n>>> ", buffer);
            scanf("%s", input);
            option = input[0];

            if (option == 'w' || option == 'W'){
                if (grid[cur.y][cur.x].north){
                    cur.y--;
                }
            }if (option == 'a' || option == 'A'){
                if (grid[cur.y][cur.x].west){
                    cur.x--;
                }
            }if (option == 's' || option == 'S'){
                if (grid[cur.y][cur.x].south){
                    cur.y++;
                }
            }if (option == 'd' || option == 'D'){
                if (grid[cur.y][cur.x].east){
                    cur.x++;
                }
            }
        }

        
    }
    return 0;
}
