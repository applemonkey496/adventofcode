
# sort function
from numpy import sort

# -- Parse Input -- 

def read(filename):
    with open(filename, 'r') as f:
        return f.read().splitlines()

lines = read('input.txt')

# Get the seat id given a pattern
def get_seat(instr : str):
    # Split into row instruction and col instruction
    row, col = instr[:7], instr[7:]

    # For rows:
    # F = first half = 0
    # B = last half = 1
    row = row.replace('F', '0')
    row = row.replace('B', '1')

    # For cols:
    # L = first half = 0
    # B = last half = 1
    col = col.replace('L', '0')
    col = col.replace('R', '1')

    # Convert to int from base 2
    row = int(row, 2)
    col = int(col, 2)

    return (row, col)

# Get a list of all seat ids from the instructions
seat_ids = []
for line in lines:
    (row, col) = get_seat(line)
    seat_id = row * 8 + col
    seat_ids.append(seat_id)

# Sort by number. This is useful on two counts. Part one
# of the challenge asks for the highest seat id, which we
# can get by simply extracting the last item. The second 
# part requires finding a missing seat id but where the seat
# id +1 and -1 are both present. This allows the easy extraction
# of the edge cases at the front and back.
seat_ids = sort(seat_ids)

# Part 2
def find_own_seat(seat_ids):
    # This extracts the edge cases at the very front and back 
    # cases in the range of the possible values of seat ids. 
    # The first element can't have any element -1 of it, and 
    # the last element can't have any element +1 of it. 
    for i in range(seat_ids[0], seat_ids[-1]):
        # If the value is missing, but the +1 and -1 values are present,
        # then this is the correct seat id.
        if (i not in seat_ids) and (i - 1 in seat_ids) and (i + 1 in seat_ids):
            return i

own_seat = find_own_seat(seat_ids)

print(seat_ids[-1]) # Part 1 solution
print(own_seat) # Part 2 solution
