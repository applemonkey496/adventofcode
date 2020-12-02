
// Input: https://adventofcode.com/2020/day/1/input

#include <iostream>
#include "input.hh"

using std::cout;
using std::endl;

size_t inputSize = sizeof(input) / sizeof(int);

void findTwo() {
    // Loop through every combination of the numbers. This 
    // isn't very efficient, but it doesn't need to be, 
    // because it runs in under a second anyways.
    for (int i = 0; i < inputSize; i++) {
        for (int j = 0; j < inputSize; j++) {
            int number1 = input[i];
            int number2 = input[j];

            // If the numbers sum to 2020, return their product
            // Only if the two numbers are at different indices
            if (number1 + number2 == 2020 && i != j) {
                cout << number1 * number2 << endl;
                return;
            }
        }
    }

    // Nothing found, return false and show message
    cout << "No two numbers match." << endl;
    return;
}

void findThree() {
    // Again, this doesn't have to be efficient
    // because it runs really fast anyways.
    for (int i = 0; i < inputSize; i++) {
        for (int j = 0; j < inputSize; j++) {
            for (int k = 0; k < inputSize; k++) {
                int number1 = input[i];
                int number2 = input[j];
                int number3 = input[k];

                if (number1 + number2 + number3 == 2020 && i != j != k) {
                    cout << number1 * number2 * number3 << endl;
                    return;
                }
            }
        }
    }

    // Nothing found, exit with error
    cout << "No three numbers match." << endl;
    return;
}

int main() {
    findTwo();
    findThree();
}
<<<<<<< HEAD

=======
>>>>>>> bef024b1ad2652d305f713b4b3212ce6d828a765
