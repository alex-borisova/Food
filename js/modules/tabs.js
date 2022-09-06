function tabs(
  tabsParentSelector,
  tabsButtonsSelector,
  tabsContentSelector,
  activeClass
) {
  //Tabs
  let tabsParent = document.querySelector(tabsParentSelector),
    tabsButtons = document.querySelectorAll(tabsButtonsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector);

  function hideContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");

      tabsButtons.forEach((item) => {
        item.classList.remove(activeClass);
      });
    });
  }

  function showContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabsButtons[i].classList.add(activeClass);
  }

  hideContent();
  showContent();

  tabsParent.addEventListener("click", (event) => {
    let target = event.target;

    if (target && target.classList.contains(tabsParentSelector.slice(1))) {
      tabsButtons.forEach((tab, i) => {
        if (target == tab) {
          hideContent();
          showContent(i);
        }
      });
    }
  });
}

export default tabs;
