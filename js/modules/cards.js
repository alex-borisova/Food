import { getResource } from "../services/services";

function cards() {
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
}

export default cards;
