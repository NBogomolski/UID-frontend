function popup() {
    let wrapper = document.getElementById("popup");
    wrapper.classList.add("black-popup");
    wrapper.onclick = exitPopup;
    wrapper
        .querySelector("iframe")
        .setAttribute(
            "src",
            "https://www.youtube.com/embed/djV11Xbc914?start=33"
        );
}

function exitPopup() {
    let wrapper = document.getElementById("popup");
    wrapper.classList.remove("black-popup");
}

//Bozhena

document.querySelectorAll(".try-button").forEach(function (item) {
    item.addEventListener("click", openModalForm);
});

// DEBUG ONLY
document
    .querySelector("#continue-button")
    .addEventListener("click", function () {
        document.cookie = "isRegistered=no";
    });

let timeoutID;

function openModalForm() {
    createModalForm();
    setTimeout(function () {
        document
            .querySelector(".modal-registration")
            .classList.add("open-modal");
    }, 0);
}

function createModalForm() {
    let modalRegistration = document.createElement("div");
    modalRegistration.classList.add("modal-registration");
    document.body.append(modalRegistration);
    modalRegistration.addEventListener("click", function (event) {
        if (event.target === modalRegistration) closeModalForm();
    });

    let modalBorder = document.createElement("div");
    modalBorder.classList.add("modal-border");
    modalRegistration.append(modalBorder);

    let modalForm = document.createElement("div");
    modalForm.classList.add("modal-form");
    modalBorder.append(modalForm);

    let form = document.createElement("div");
    form.classList.add("form");

    let closeButton = document.createElement("img");
    // closeButton.classList.add("fa", "fa-times", "fa-2x", "modal-close-btn");
    closeButton.setAttribute('src', 'img/krestik.jpg');
    closeButton.classList.add('krestik', 'modal-close-btn');
    // closeButton.style.zIndex = -1;
    closeButton.addEventListener("click", closeModalForm);

    modalForm.append(form, closeButton);

    let isRegistered = getCookie("isRegistered");
    if (isRegistered === undefined || isRegistered === "no") {
        let modalLabel = document.createElement("h3");
        modalLabel.classList.add("modal-label");
        modalLabel.textContent = "Submit for registration";

        let nameInput = document.createElement("input");
        with (nameInput) {
            type = "text";
            id = "name";
            name = "Name";
            placeholder = "Enter name";
            classList.add("modal-input");
            required = true;
            addEventListener("change", validateForm);
        }

        let mailInput = document.createElement("input");
        with (mailInput) {
            type = "email";
            id = "email";
            name = "Mail";
            placeholder = "Enter Email address";
            classList.add("modal-input");
            required = true;
            addEventListener("change", validateForm);
        }

        let telephoneInput = document.createElement("input");
        with (telephoneInput) {
            type = "tel";
            id = "phone";
            name = "Phone";
            placeholder = "Enter telephone number";
            classList.add("modal-input");
            required = true;
            pattern = "\\+375[0-9]{9}";
            addEventListener("change", validateForm);
        }

        let applyButton = document.createElement("input");
        with (applyButton) {
            type = "submit";
            id = "submit_form_button";
            name = "Apply";
            classList.add("try-button", "modal-btn");
            disabled = true;
            addEventListener("click", submitModalForm);
        }

        form.append(
            modalLabel,
            nameInput,
            mailInput,
            telephoneInput,
            applyButton
        );
    } else {
        modalBorder.classList.add("small-modal-border");

        let isRegisteredMessage = document.createElement("p");
        isRegisteredMessage.classList.add("success-message");
        isRegisteredMessage.textContent = "Registration has already been made";

        form.append(isRegisteredMessage);
        if (timeoutID) clearTimeout(timeoutID);
        // timeoutID = setTimeout(closeModalForm, 5000);
    }
}

function closeModalForm() {
    document
        .querySelector(".modal-registration")
        ?.classList.remove("open-modal");
    if (timeoutID) clearTimeout(timeoutID);
    setTimeout(removeModalForm, 400);
}

function removeModalForm() {
    document.querySelector(".modal-registration")?.remove();
}

function validateForm() {
    let name = document.getElementById("name").validity.valid;
    let email = document.getElementById("email").validity.valid;
    let telephone = document.getElementById("phone").validity.valid;

    document.getElementById("submit_form_button").disabled = !(
        name &&
        email &&
        telephone
    );

}

function submitModalForm() {
    let success = document.createElement("p");
    success.classList.add("success-message");
    success.textContent = "Form was submitted successfully";
    let form = document.querySelector(".form");
    form.append(success);
    document.getElementById('submit_form_button').disabled = true;
    document.cookie = "isRegistered=yes";
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(closeModalForm, 5000);
}

function getCookie(name) {
    let matches = document.cookie.match(
        new RegExp(
            "(?:^|; )" +
                name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
                "=([^;]*)"
        )
        // document.cookie
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

document.querySelector(".modal-form svg").addEventListener("click", () => {
    removeModalForm();
});
