// import createDOMPurify from "dompurify";
// const DOMPurify = createDOMPurify(window);
// export function sanitize(dirty) {
//     return DOMPurify.sanitize(dirty);
// }

/**
 * isValidType
 *  - Validates that the value passed is within the validTypes array
 * 
 * @param {Any} value 
 * @param {Array} validTypes 
 * @returns Boolean - true if valid
 */
export function isValidType(value, validTypes = []) {
  for (let i = 0; i < validTypes.length; i++) {
    // array has to be checked differently because
    // typeof() array object will be "object"
    if (validTypes[i].toLowerCase() === "array") {
      if (Array.isArray(value)) {
        return true;
      }
    }

    if (typeof (value) === validTypes[i].toLowerCase()) {
      return true;
    }
  }
  return false;
}

//#region String Helpers

/**
* toUpperCase
*  - validates that a string is passed
*  - upper cases the word
* 
* @param {String} value 
* @returns The upper case string if successfull otherwise the same value passed.
*/
export function toUpperCase(value) {
  if (isValidType(value, ["string"])) {
    return value.toUpperCase();
  }
  return value;
}

/**
* toLowerCase
*  - validates that a string is passed
*  - lower cases the word
* 
* @param {String} value 
* @returns The lower case string if successfull otherwise the same value passed.
*/
export function toLowerCase(value) {
  if (isValidType(value, ["string"])) {
    return value.toLowerCase();
  }
  return value;
}

/**
* firstLetterToUpperCase
*  - validates that a string is passed
*  - capitalize first letter
* 
* @param {String} value 
* @return The string capitalized if possible otherwise returns the same value passed.
*/
export function firstLetterToUpperCase(value) {
  if (isValidType(value, ["string"])) {
    return toUpperCase(value.charAt(0)) + value.slice(1);
  }
  return value;
}

export function isStringNotEmpty(value) {
  if (isValidType(value, ["string"])) {
    return (value.trim().length !== 0)
  }
  return false;
}
//#endregion

//#region Date Helpers
/**
* yyyymmdd
*  - formats the date to year month date format
* 
* @param {Date} date
* @returns Fomated Date
*/
export function yyyymmdd(date) {
  return date
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "-");
}
//#endregion

//#region Number Helpers

/**
* clamp
*  - forces the number passed to be within the min and max range
*
* @param {Number} value number to be clamped
* @param {Number} min lowest number allowed
* @param {Number} max highet number allowed
* @returns Number
*/
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

//#endregion

//#region Object Helpers

/**
* keys
*  - gets all the keys for the object
* 
* @param  {Object} obj 
* @returns Array of keys or null if invalid object passed.
*/
export function keys(obj) {
  if (isValidType(obj, ["object"])) {
    return Object.keys(obj)
  }
  return null;
}


/**
* objectToArray
*  - creates an array with all the object values
* 
* @param {Object} obj 
* @returns Array if the obj passed was an object, otherwise null
*/
export function objectToArray(obj) {
  if (isValidType(obj, ["object"])) {
    let array = []
    keys(obj).forEach(key => array.push(obj[key]))
    return array;
  }
  return null;
}

//#endregion

//#region Other 

/**
* isUndefinedOrNull
*  - check if the value passed is either undefined or null
* 
* @param {Object} value 
* @returns Boolean - True if undefined or null
*/
export function isUndefinedOrNull(value) {
  return value === undefined || value === null;
}

/**
* isValidObject
*  - checks if the value passed is either undefined or null
*  - checks if the object contains the keys passed
* 
* @param {Object} value 
* @param {Array} keys
* @returns Boolean - True if valid, false if invalid
*/
export function isValidObject (obj, keys) {
  // if object is undefined or null, return false
  if (isUndefinedOrNull(obj)) {
    return false;
  }

  // if keys is of type array then check the keys
  if (isValidType(keys, ["array"])) {
    // check each key if it's not found then it's invalid
    for (let i = 0; i < keys.length; i++) {
      if (!obj.hasOwnProperty(keys[i])) {
        return false;
      }
    }
  } else {
    console.warn('isValidObject:: Paramater passed for keys is not of type array')
  }

  return true;
}

//#endregion