
// -- Part 1 -- //
// (part 2 in js)

#include <fstream> // ifstream, fprintf
#include <iostream> // cout, endl
#include <vector> // vector
#include <string> // string
#include <algorithm> // find

using std::vector;
using std::string;
using std::cout;
using std::endl;

// The numbers get quite large towards the 
// end, so use uint64_t where necessary.

// Read input file and parse into a list of numbers
auto parseInput(string name) {
    vector<uint64_t> lines;

    std::ifstream file(name);
    if (!file) {
        fprintf(stderr, "Error opening %s", name);
        exit(1);
    }

    // stoull = string to unsigned long long (uint64_t)
    for (string line; getline(file, line);) {
        lines.push_back(std::stoull(line));
    }

    return lines;
}

int main() {
    vector<uint64_t> input = parseInput("input.txt"); 
    vector<uint64_t> allowed; // list of last used 25 numbers

    // Fill allowed with the "preamble" of first 25 numbers
    for (int i = 0; i < 25; i++) allowed.push_back(input.at(i));

    // For the rest of the array...
    for (int i = 25; i < input.size(); i++) {
        auto sumsTo = input.at(i); 
        
        for (auto j : allowed) {
            // Find whether two numbers in the last 25 sum to sumsTo
            auto found = std::find(allowed.begin(), allowed.end(), sumsTo - j);

            if (found != allowed.end()) goto found;
        }

        // This code here is only run if no match is found
        // across all iterations of allowed. Any match skips 
        // down to the "found" label.

        // If nothing matches, then the value is illegal, which
        // is what we are looking for. Print it and exit.
        cout << sumsTo << endl;
        return 0;

        // Update the allowed list by removing the 
        // oldest value and adding the newest value.
        found:
        allowed.erase(allowed.begin());
        allowed.push_back(sumsTo);
    }

    // Nothing was found
    fprintf(stderr, 
        "No inconsistencies found: all numbers "
        "were the sum of the previous 25."
    );
    return 1;
}
