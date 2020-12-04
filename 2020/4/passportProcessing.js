
import fs from 'fs';

// The entries are separated by two lines, so separate
// by that. toString() isn't necessary, but it's safer,
// because fs.readFileSync returns a Buffer, not a String.
const entries = fs.readFileSync('input.txt').toString().split('\n\n');
const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

// For the second challenge: validate the values of a 
// passport fieldset. Instead of and-ing every statement,
// just return out if something is false. This has the 
// benefit of being more neat, as everything can be 
// organized into sections. We don't have to error check 
// whether each field exists because this function is 
// only run inside the if-block after we know that all 
// the required fields are present.
function legalValues(fields) {

    // NOTE: all ranges in the comments are inclusive 
    // on both ends unless otherwise specified.

    /* 
     * byr (birth year):
     *   - 4 digits
     *   - 1920-2002
     */
    let byrNumber = parseInt(fields.byr);
    if (!(fields.byr.length === 4 && byrNumber >= 1920 && byrNumber <= 2002)) return false;
    
    /*
     * iyr (issue year):
     *   - 4 digits
     *   - 2010-2020
     */
    let iyrNumber = parseInt(fields.iyr);
    if (!(fields.iyr.length === 4 && iyrNumber >= 2010 && iyrNumber <= 2020)) return false;

    /*
     * eyr (expiration year):
     *   - 4 digits
     *   - 2020-2030
     */
    let eyrNumber = parseInt(fields.eyr);
    if (!(fields.eyr.length === 4 && eyrNumber >= 2020 && eyrNumber <= 2030)) return false;

    /*
     * hgt (height):
     *   - number + 'cm' or 'in' (unit required)
     *   - 150-193 cm or 59-76 in
     */
    // Get unit by extracting last two characters of the 
    // height field, then check if it's legal.
    let hgtUnit = fields.hgt.substring(fields.hgt.length - 2);
    let hgtUnitLegal = hgtUnit === 'cm' || hgtUnit === 'in';
    if (!hgtUnitLegal) return false;

    // Get the value, then check if it's within the right
    // range based on which unit it's in.
    let hgtVal = fields.hgt.substring(0, fields.hgt.length - 2);
    if (!((hgtUnit === 'cm' && hgtVal >= 150 && hgtVal <= 193) || 
          (hgtUnit === 'in' && hgtVal >= 59 && hgtVal <= 76))) return false;
    
    /*
     * hcl (hair colour):
     *   - '#' plus 6 hexademical chars
     */
    // Just use a regex. https://xkcd.com/208/
    if (!fields.hcl.match(/#[a-f0-9]{6}/)) return false;

    /*
     * ecl (eye colour):
     *   - exactly one of: "amb" "blu" "brn" "gry" "grn" "hzl" "oth"
     */
    // Regex to the rescue. This is a lot easier than a
    // ton of if statements or a for-block through an array
    // of allowed values. 
    if (!fields.ecl.match(/amb|blu|brn|gry|grn|hzl|oth/)) return false;

    /*
     * pid (passport id):
     *   - 9 digit number incl. leading zeros
     */
    if (fields.pid.length !== 9) return false;

    // If all the checks have passed:
    return true;
}

let validMethodOne = 0; // part 1
let validMethodTwo = 0; // part 2

// entries = list of passports
// entry = one individual passport
for (let entry of entries) {

    // Split by newline or whitespace. Regex does it again.
    let fieldsStr = entry.split(/ |\n/); 

    let fields = {};

    for (let field of fieldsStr) {
        let [fieldName, fieldValue] = field.split(':');
        fields[fieldName] = fieldValue;
    }
    
    // Make sure all of the required fields are 
    // present in the fields object.
    if (requiredFields.every(i => fields.hasOwnProperty(i))) {
        validMethodOne ++;

        // We know that all the fields are present,
        // so inside our legalValues() function, we 
        // can assume that without having annoying 
        // Object.hasOwnProperty checks for each 
        // individual property.
        if (legalValues(fields)) {
            validMethodTwo++;
        }
    }
}

// -- Output --
console.log(validMethodOne);
console.log(validMethodTwo);
