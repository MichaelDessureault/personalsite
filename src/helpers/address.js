// Global variable for geolocate to have access
// after initAutocomplete initializes the object
var autocomplete;

const defaultFormatedAddressObject = {
  address: "",
  address_long: "",
  formatted_address: ""
};

/**
 * initAutocomplete
 *   - initializes the ability to listen to an input element for google maps autocomplete
 *
 *  @param {Function} - (REQUIRED) - A callback function that will be passed the places Autocomplete object
 *  @param {Boolean}  - Is the autocomplete field only for cities
 *  @param {String}   - Id of the element to be listened to
 */

export function initAutocomplete(
  populateCallback,
  onlyCities = false,
  elementId = "addressAutocomplete"
) {
  // Create the autocomplete object, restricting the search to geographical location types.
  let element = document.getElementById(elementId);

  function bindListenerAfterGoogleLoads() {
    if (!!window.google == false) {
      console.log("[Google API]: Not loaded yet. Trying again in 1 second.");
      setTimeout(bindListenerAfterGoogleLoads, 1000);
    } else {
      autocomplete = new window.google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */

        (element),
        onlyCities ? { types: ["(cities)"] } : { types: ["geocode"] }
      );

      // When the user selects an address from the dropdown, populate the address
      // fields in the form.
      autocomplete.addListener("place_changed", () =>
        populateCallback(autocomplete)
      );

      console.log("[Google API]: Loaded.");
    }
  }

  bindListenerAfterGoogleLoads();
}

/**
 * geolocate
 *  - Bias the autocomplete object to the user's geographical location,
 *    as supplied by the browser's 'navigator.geolocation' object.
 */
export function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new window.google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

/**
 * formatPlace
 *  - Invokable ways:
 *      1. let formatedAddressObject = formatPlace (place)
 *      2. let formatedAddressObject = formatPlace (place, formatedAddressObject)
 *
 * @param {Object} - (REQUIRED)  The place object gotten from places Autocomplete object
 * @param {Object} - (NULLABLE)  An object that contains the keys that are wanted from the address
 *      - Valid keys to use:
 *          - address, address_long
 *          - route, route_short
 *          - city, city_short
 *          - sub_city, sub_city_short
 *          - province, province_short
 *          - country, country_short
 *          - street_number
 *          - postal_code
 *          - neighborhood
 *      - Note:
 *          - address is always on the object
 *              - example: 100 City Centre Drive
 *          - address_long is always on the object
 *              - example: 100 City Centre Dr, Mississauga, ON
 *          - formatted_address is always on the object
 *              - It's the default provided format
 *              - example: 1528 Dundas St W, Oakville, ON L6M 4H8, Canada
 *              - example (cities limited): Burlington, ON, Canada
 * @returns {Object} the formatedAddressObject
 */
export function formatPlace(place, formatAddressObject = {}) {
  // merge the passed formatAddressObject with the defaultOne
  formatAddressObject = {
    ...formatAddressObject,
    ...defaultFormatedAddressObject,
    formatted_address: place.formatted_address // the default formatted address from the place property (the same as what was in the input field)
  };

  let placeValues = {
    street_number: "",
    route: "",
    route_short: "",
    sub_city: "", // known as sub locality in the object
    sub_city_short: "", // known as sub locality in the object
    city: "", // known as locality in the object
    city_short: "", // known as locality in the object
    province: "", // known as administrative_area_level_1 in the object
    province_short: "",
    administrative_area_level_2: "", // Not being used
    country: "",
    country_short: "",
    postal_code: "",
    neighborhood: ""
  };

  /**
   * Example of how an object looks within the place.address_components
   * (place.address_components is an array of objects)
   *
   * 0: {
   *  long_name: "4444",
   *  short_name: "4444",
   *  types: ["street_number"]
   * }
   */
  // Strip the place.address_components down into a more readable object
  place.address_components.forEach(addressComponent => {
    const addressType = addressComponent.types[0];
    switch (addressType) {
      case "street_number":
      case "postal_code_prefix":
      case "postal_code":
      case "neighborhood":
      case "administrative_area_level_2":
        placeValues[addressType] = addressComponent.long_name;
        break;
      case "country":
      case "route":
        placeValues[addressType] = addressComponent.long_name;
        placeValues[`${addressType}_short`] = addressComponent.short_name;
        break;
      // Cases that the name is different in placeValues so unable to connect multiple
      case "sublocality_level_1":
      case "sublocality":
        (placeValues.sub_city = addressComponent.long_name),
          (placeValues.sub_city_short = addressComponent.short_name);
        break;
      case "locality":
        placeValues.city = addressComponent.long_name;
        placeValues.city_short = addressComponent.short_name;
        break;
      case "administrative_area_level_1":
        placeValues.province = addressComponent.long_name;
        placeValues.province_short = addressComponent.short_name;
        break;
      default:
        console.warn(addressType + " was not listed", place.address_components);
        break;
    }
  });

  // Foreach key in formatedAddressObject attempt to populate the values from placeValues object
  Object.keys(formatAddressObject).forEach(key => {
    if (placeValues.hasOwnProperty(key)) {
      formatAddressObject[key] = placeValues[key];
    }
  });

  // Format and populate the default address and address_long values
  formatAddressObject.address = `${placeValues.street_number} ${
    placeValues.route
  }`;
  formatAddressObject.address_long = `${placeValues.street_number} ${
    placeValues.route_short
  }, ${
    placeValues.sub_city !== ""
      ? placeValues.sub_city + " " + placeValues.city
      : placeValues.city
  }, ${placeValues.province_short}`;

  return formatAddressObject;
}
