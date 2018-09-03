import axios from "axios";
// import config from "config";

/**
 * getUsersLocation
 *   - Does an api call to `https://json.geoiplookup.io/`
 *   - Api call returns a json object
 *
 * @return {Object} - contains: ip, city
 */
export function getUsersLocation() {
  // const url = `http://api.ipstack.com/check?access_key=${
  //   config.ipStackKey
  // }&fields=city&output=json`;

  return "Burlington"

  // const url = 'http://api.ipstack.com/check?access_key=API_KEY&fields=city&output=json';

  // return axios({
  //   method: "get",
  //   url: url,
  //   responseType: "json"
  // })
  //   .then(response => {
  //     return response.data;
  //   })
  //   .catch(err => {
  //     console.log("err", err);
  //   });
}