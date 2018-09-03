/**
 * navigationLinks
 *   - Note: use "none" for no link
 *   - Note2: Max submenu Level is 2 curretly
 */
export const navigationLinks = {
  home : {
    label: "Home",
    link: "/",
    submenu: {},
  },
  about : {
    label: "About",
    link: "/about",
    submenu: {},
  },
  chatbot: {
    label: "Chatbot",
    link: "/chatbot",
    submenu: {},
  },
  api: {
    label: "API's",
    link: "none",
    submenu: {
      giphy: {
        label: "Giphy",
        link: "/giphy",
        submenu: {}
      },
      googlemaps: {
        label: "Google Maps",
        link: "/google",
        submenu: {},
      }
    }
  }
}