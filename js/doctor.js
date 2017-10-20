const apiKey = require('./../.env').apiKey;

export class Doctor {
  constructor() {

  }

  findADoc(query) {
    let promise = new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${query}&location=45.512794%2C-122.679565%2C50&skip=0&limit=25&user_key=${apiKey}`
      request.onload = () => {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    promise.then((response) => {
      let data = JSON.parse(response);
      console.log(data.data[0].profile.first_name);
    }, (error) => {
      $('.showErrors').html(`There was an error processing your request: ${error.message}`);
    });
  }
}
