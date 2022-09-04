"use strict";

document.addEventListener("DOMContentLoaded", () => {
  //Tabs

  let tabsParent = document.querySelector(".tabheader__items"),
    tabsButtons = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent");

  function hideContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");

      tabsButtons.forEach((item) => {
        item.classList.remove("tabheader__item_active");
      });
    });
  }

  function showContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabsButtons[i].classList.add("tabheader__item_active");
  }

  hideContent();
  showContent();

  tabsParent.addEventListener("click", (event) => {
    let target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabsButtons.forEach((tab, i) => {
        if (target == tab) {
          hideContent();
          showContent(i);
        }
      });
    }
  });

  //Timer

  const deadline = "2022-12-31";

  function getTime(endtime) {
    let dif = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(dif / (1000 * 60 * 60 * 24)),
      hours = Math.floor((dif / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((dif / 1000 / 60) % 60),
      seconds = Math.floor((dif / 1000) % 60);

    return {
      total: dif,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function addZero(param) {
    if (param >= 0 && param < 10) {
      return `0${param}`;
    } else {
      return param;
    }
  }

  function setTime(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timerId = setInterval(updateTime, 1000);

    updateTime();

    function updateTime() {
      const t = getTime(endtime);

      days.innerHTML = addZero(t.days);
      hours.innerHTML = addZero(t.hours);
      minutes.innerHTML = addZero(t.minutes);
      seconds.innerHTML = addZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timerId);
      }
    }
  }

  setTime(".timer", deadline);

  // Modal

  const modal = document.querySelector(".modal"),
    buttonsOpen = document.querySelectorAll("[data-modal]");

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  buttonsOpen.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = ""; //default
  }

  modal.addEventListener("click", (event) => {
    if (
      event.target === modal ||
      event.target.getAttribute("data-closed") == ""
    ) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 50000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);

  // Use class for cards

  class MenuCard {
    constructor(src, alt, subtitle, desc, cost, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.subtitle = subtitle;
      this.desc = desc;
      this.cost = cost;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
      this.transfer = 27;
      this.changeCurrency();
    }

    changeCurrency() {
      this.cost = this.cost * this.transfer;
    }

    render() {
      const element = document.createElement("div");

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.subtitle}</h3>
        <div class="menu__item-descr">${this.desc}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.cost}</span> грн/день</div>
        </div>
     `;
      this.parent.append(element);
    }
  }

  const getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  getResource("http://localhost:3000/menu").then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });

  ///Forms
  const forms = document.querySelectorAll("form");

  const message = {
    loading: "./img/forms/spinner.svg",
    failur: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      body: data,
      headers: { "Content-type": "application/json" },
    });

    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto`;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failur);
        })
        .finally(() => form.reset());
    });
  }

  function showThanksModal(message) {
    const prevModal = document.querySelector(".modal__dialog");
    prevModal.classList.add("hide");

    openModal();

    const thankswModal = document.createElement("div");
    thankswModal.classList.add("modal__dialog");
    thankswModal.innerHTML = `
            <div class="modal__content">
              <div data-closed="" class="modal__close">×</div>
              <div class="modal__title">${message}</div>
            </div>
    `;

    document.querySelector(".modal").append(thankswModal);
    setTimeout(() => {
      thankswModal.remove();
      prevModal.classList.add("show");
      prevModal.classList.remove("hide");
      closeModal();
    }, 4000);
  }

  // Slider

  const prevButton = document.querySelector(".offer__slider-prev");
  const nextButton = document.querySelector(".offer__slider-next");
  const slides = document.querySelectorAll(".offer__slide");
  const curren = document.querySelector("#current");
  const total = document.querySelector("#total");

  total.textContent = addZero(slides.length);

  // function showPict() {
  //   slides.forEach((item, i, arr) => {
  //     if (i == 0) {
  //       arr[i].classList.remove("hide");
  //       arr[i].classList.add("show");
  //       curren.textContent = addZero(i + 1);
  //     } else {
  //       arr[i].classList.add("hide");
  //       arr[i].classList.remove("show");
  //     }
  //   });
  // }

  // showPict();

  // nextButton.addEventListener("click", (e) => {
  //   if (Number(curren.textContent) < Number(total.textContent)) {
  //     for (let i = 0; i < slides.length; i++) {
  //       if (i == Number(curren.textContent) - 1) {
  //         slides[i].classList.remove("show");
  //         slides[i].classList.add("hide");
  //       } else if (i == Number(curren.textContent)) {
  //         slides[i].classList.add("show");
  //         slides[i].classList.remove("hide");
  //         curren.textContent = addZero(i + 1);
  //         break;
  //       }
  //     }
  //   } else {
  //     showPict();
  //   }
  // });

  // prevButton.addEventListener("click", (e) => {
  //   if (Number(curren.textContent) != 1) {
  //     for (let i = slides.length; i >= 1; i--) {
  //       if (i == Number(current.textContent)) {
  //         slides[i - 1].classList.remove("show");
  //         slides[i - 1].classList.add("hide");
  //       } else if (i == Number(curren.textContent) - 1) {
  //         slides[i - 1].classList.remove("hide");
  //         slides[i - 1].classList.add("show");
  //         curren.textContent = addZero(i);
  //         break;
  //       }
  //     }
  //   } else {
  //     slides.forEach((item, i, arr) => {
  //       if (i == slides.length - 1) {
  //         arr[i].classList.remove("hide");
  //         arr[i].classList.add("shoe");
  //         curren.textContent = addZero(slides.length);
  //       } else {
  //         arr[i].classList.add("hide");
  //         arr[i].classList.remove("show");
  //       }
  //     });
  //   }
  // });

  // From Udemy

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
});
