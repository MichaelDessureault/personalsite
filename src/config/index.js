const config = {
  CURRENT_ENV: process.env.CURRENT_ENV,
  API_SERVER: process.env.API_SERVER,
  DOMAIN_NAME: process.env.DOMAIN_NAME,
  dev: {
    FirebaseConfig = {
      apiKey: "AIzaSyC7FX5E4H_jcJLdAPeVteTzFgNh7_x3cTQ",
      authDomain: "michael-personal-site-d565a.firebaseapp.com",
      databaseURL: "https://michael-personal-site-d565a.firebaseio.com",
      projectId: "michael-personal-site-d565a",
    }
  },
  prod: {
    baseUrl: `${process.env.API_SERVER}/api/v1/`,

  }
}