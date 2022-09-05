import { openModal, closeModal } from "./modal";

function forms() {
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
          </div>`;

    document.querySelector(".modal").append(thankswModal);
    setTimeout(() => {
      thankswModal.remove();
      prevModal.classList.add("show");
      prevModal.classList.remove("hide");
      closeModal();
    }, 4000);
  }
}

export default forms;
