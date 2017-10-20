import { Doctor } from './../js/doctor.js';

$(document).ready(() => {
  const doctor_bot = new Doctor();

  $("#form-submit").click(() => {
    doctor_bot.findADoc($("#ailment").val());
  });
});
