import tabs from "./modules/tabs";
import calc from "./modules/calc";
import cards from "./modules/cards";
import forms from "./modules/forms";
import modal from "./modules/modal";
import timer from "./modules/timer";
import slider from "./modules/slider";
import { openModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(
    () => openModal(".modal", modalTimerId),
    50000
  );

  tabs(
    ".tabheader__items",
    ".tabheader__item",
    ".tabcontent",
    "tabheader__item_active"
  );
  calc();
  cards();
  forms("form", modalTimerId);
  modal(".modal", "[data-modal]", modalTimerId);
  timer(".timer", "2022-12-31");
  slider({
    prevButtonSelector: ".offer__slider-prev",
    slidesSelector: ".offer__slide",
    totalId: "#total",
    nextButtonSelector: ".offer__slider-next",
    currenId: "#current",
  });
});
