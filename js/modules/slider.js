import { addZero } from "./timer";

function slider() {
  // Slider

  const prevButton = document.querySelector(".offer__slider-prev");
  const nextButton = document.querySelector(".offer__slider-next");
  const slides = document.querySelectorAll(".offer__slide");
  const curren = document.querySelector("#current");
  const total = document.querySelector("#total");

  total.textContent = addZero(slides.length);

  let slideIndex = 1;

  showSlides(slideIndex);

  function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach((item) => {
      item.classList.remove("show");
      item.classList.add("hide");
    });

    slides[slideIndex - 1].classList.remove("hide");
    slides[slideIndex - 1].classList.add("show");

    curren.textContent = addZero(slideIndex);
  }

  function plusSlide(n) {
    showSlides((slideIndex += n));
  }

  prevButton.addEventListener("click", () => {
    plusSlide(-1);
  });

  nextButton.addEventListener("click", () => {
    plusSlide(1);
  });
}
export default slider;
