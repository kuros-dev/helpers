#include <stdio.h>

int main(int argc, char* argv[]) {
    
    int num = atoi(argv[1]);
    int total = 0;
    
    while (num > 1){
        printf("%d\n", num);

        if ((num % 2) == 0){
            num = num/2;
        }
        else {
            num = (num*3) + 1;
        }
        total++;
    }
    printf("number of iterations: %d\n", total);
    
    return 0;
}