const apiKey = require('./../.env').apiKey;

export class Doctor {
  constructor() {
    this.names = [];
    this.addresses = [];
    this.phone_numbers = [];
    this.websites = [];
    this.acceptings = [];
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
      this.names = [];
      this.addresses = [];
      this.phone_numbers = [];
      this.websites = [];
      this.acceptings = [];
      data.data.forEach((doctor) => {
        this.names.push(doctor.practices[0].name);
        this.addresses.push(`${doctor.practices[0].visit_address.street} ${doctor.practices[0].visit_address.street2} ${doctor.practices[0].visit_address.city}, ${doctor.practices[0].visit_address.state} ${doctor.practices[0].visit_address.zip}`);
        this.phone_numbers.push(doctor.practices[0].phones[0].number);
        this.websites.push(doctor.practices[0].website);
        this.acceptings.push(doctor.practices[0].accepts_new_patients)
        console.log(this.acceptings)
      });
    }, (error) => {
      $('.showErrors').html(`There was an error processing your request: ${error.message}`);
    });
  }
}
