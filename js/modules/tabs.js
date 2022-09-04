function tabs() {
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
}

module.exports = tabs;
