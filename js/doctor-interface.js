import { Doctor } from './../js/doctor.js';

$(document).ready(() => {
  $("form").submit((event) => {
    event.preventDefault();
    const doctor_bot = new Doctor();
    doctor_bot.findADoc($("#ailment").val())
  });
});
