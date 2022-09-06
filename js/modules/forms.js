import { openModal, closeModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
  ///Forms
  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: "./img/forms/spinner.svg",
    failur: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

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

    openModal(".modal", modalTimerId);

    const thankswModal = document.createElement("div");
    thankswModal.classList.add("modal__dialog");
    thankswModal.innerHTML = `
          <div class="modal__content">
            <div data-closed="" class="modal__close">×</div>
            <div class="modal__title">${message}</div>
          </div>`;

    document.querySelector(".modal").append(thankswModal);
    setTimeout(() => {
      thankswModal.remove();
      prevModal.classList.add("show");
      prevModal.classList.remove("hide");
      closeModal(".modal");
    }, 4000);
  }
}

export default forms;
