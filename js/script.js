window.addEventListener("DOMContentLoaded", () => {
  const tabs = require("./modules/tabs");
  const calc = require("./modules/calc");
  const cards = require("./modules/cards");
  const forms = require("./modules/forms");
  const modal = require("./modules/modal");
  const timer = require("./modules/timer");
  const slider = require("./modules/slider");

  tabs();
  calc();
  cards();
  forms();
  modal();
  timer();
  slider();
});
