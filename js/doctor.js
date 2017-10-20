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
      let website = "";
      $("#results").html("");
      if(data.data.length === 0){
        $("#no-results").html(`No results returned from search. Try another query.`);
        $("#no-results").show();
        $("#table-results").hide();
      } else {
        $("#table-results").show();
        data.data.forEach((doctor) => {
          if(doctor.practices[0].website) {
            website = `<a href="${doctor.practices[0].website}">Link</a>`
          } else {
            website = "N/A"
          }
          $("#results").append(`<tr><td>${doctor.profile.first_name} ${doctor.profile.last_name}, ${doctor.profile.title}</td><td>${doctor.practices[0].visit_address.street} ${doctor.practices[0].visit_address.street2} ${doctor.practices[0].visit_address.city}, ${doctor.practices[0].visit_address.state} ${doctor.practices[0].visit_address.zip}</td><td>${doctor.practices[0].phones[0].number}</td><td>${website}</td><td>${doctor.practices[0].accepts_new_patients}</td></tr>`);
          // console.log(this.acceptings)
        });
      }
    }, (error) => {
      $('#showErrors').html(`There was an error processing your request: ${error.message}`);
      $("#showErrors").show();
    });
  }
}
