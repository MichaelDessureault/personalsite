export default function temp (state = {}, action) {
  switch (action.type) {
    case "bye": 
      return {
        temp: "bye"
      }
    default: 
      return state;
  }
}