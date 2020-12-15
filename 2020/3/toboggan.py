
# This is in a separate function so that
# the whole program doesn't need to be run
# in the with block. It would be possible 
# to set a global and then modify it, but 
# this is a more maintainable solution.
def read(filename):
    with open(filename, 'r') as f:
        return f.read().splitlines()


# -- Initialization -- 

# The slopes variable is set for the second 
# challenge. For the first challenge, set slopes 
# to only be [(3,1)] - it should still be an 
# array, not just a tuple, though!
lines = read('input.txt')
slopes = [
    (1, 1),
    (3, 1),
    (5, 1),
    (7, 1),
    (1, 2),
]
line_width = len(lines[0])


# For each slope, get the number of collisions
# This works the same for one slope because the
# product starts as one and it's only multiplied 
# once.
product = 1
for slope in slopes:
    xs = 0 # number of collisions
    j = 0 # index within each line (x position)
    line_n = 0
    while line_n < len(lines):
        if lines[line_n][j] == '#': xs += 1

        # Go to the right based on the slope
        # This wraps around when it reaches the
        # end of the string. Then, go down
        # according to the slope.
        j = (j + slope[0]) % line_width
        line_n += slope[1]

    product *= xs

# For a single slope, this is still
# equivalent to just printing xs.
print(product)

