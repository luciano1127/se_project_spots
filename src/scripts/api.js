export default class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  headers: {
    authorization: "33f04f08-14f2-453b-808b-10b6827b9e37"
  }
})
  .then(res => res.json())
  }

  // other methods for working with the API
}