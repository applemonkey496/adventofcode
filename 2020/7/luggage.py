
# regex library
import re

# -- Process Input --

# Read the input and split by lines. Lines indicating 
# that a certain coloured bag "contains no other bags"
# are to be removed. This is because the algorithm relies
# on colours with no bags inside not being present inside 
# the list.

input_ = None
with open('input.txt') as file:
    input_ = file.read().splitlines()

input_ = [i for i in input_ if 'contain no other bags' not in i]

# bags dictionary format example:
# "colour": { "inside": quantity, "also inside": quantity }
bags = {}
for line in input_:
    colour, other = line.split(' bags contain ')
    contains = other.split(', ')
    contains = [i.rsplit(' ', 1)[0] for i in contains]
    contains = [i.split(' ', 1) for i in contains]
    bags[colour] = {}
    for i in contains:
        bags[colour][i[1]] = int(i[0])

# --- Part 1 ---
# For each bag, if it contains shiny gold,
# find all the bags that also contain *that*
# bag, recursively. This does not have a safety
# in place to stop infinite recursion, but the 
# puzzle inputs seem to be designed so this won't
# happen. Probably don't try on data not given by 
# advent of code.

total = set()
def can_contain(col):
    for bag in bags:
        if col in bags[bag]:
            total.add(bag)
            can_contain(bag)

can_contain('shiny gold')
total = len(total)
print(total) # Part 1


# --- Part 2 ---
# To find out how many other bags a shiny
# gold bag will eventually contain, recursively
# check all of the bags it contains. If a bag 
# doesn't contain anything (it won't be on the 
# list, that's why it was needed earlier), then
# propagate back up. Tthe data given by advent of 
# code is structured to prevent infinite recursion, 
# but other data may not be. 

def n_in_bag(col):
    n = 1
    if col not in bags: return n
    for bag in bags[col]:
        n += bags[col][bag] * n_in_bag(bag)
    return n

# Subtract one, because the shiny gold 
# bag itself doesn't count.
print(n_in_bag('shiny gold') - 1) 

