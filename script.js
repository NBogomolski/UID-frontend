function popup() {
    let wrapper = document.getElementById("popup");
    wrapper.classList.add("black-popup");
    wrapper.onclick = exitPopup;
    wrapper
        .querySelector("#popup iframe")
        .setAttribute(
            "src",
            "https://www.youtube.com/embed/DzdbAD-3a9c?start=59;&autoplay=1"
        );
}

function exitPopup() {
    let wrapper = document.getElementById("popup");
    wrapper.classList.remove("black-popup");
    let embeddedPlayer = document.querySelector("#popup iframe");
    embeddedPlayer.setAttribute("src", "");
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
    closeButton.setAttribute("src", "img/krestik.jpg");
    closeButton.classList.add("krestik", "modal-close-btn");
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
            value = "Send";
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
        timeoutID = setTimeout(closeModalForm, 5000);
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
    document.getElementById("submit_form_button").disabled = true;
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

document.querySelector(".modal-form svg")?.addEventListener("click", () => {
    removeModalForm();
});

// Anna:

const reviews = [
    {
        name: "Zoltan Nemeth",
        position: "CEO of Pixler Lab",
        title: "User friendly & Customizable",
        picture_src: "img/face.png",
        text: `Bring to the table win-win survival strategies to ensure proactive domi-
                nation. At the end of the day, going forward, a new normal that has
                evolved from generation X is on the runway heading towards a
                streamlined cloud solution. User generated content in real-time will
                have multiple touchpoints for offshoring.`,
        stars: 5,
    },
    {
        name: "Samuel Adamson",
        position: "System engineer",
        title: "Bad app",
        picture_src: "img/face-4_cut.png",
        text: `Too many ads.`,
        stars: 2,
    },
    {
        name: "Jack Evans",
        position: "Information systems specialist",
        title: "Nice app",
        picture_src: "img/face-6_cut.png",
        text: `I used the application for two months, I liked everything, but sometimes ads interfere, which isn't always easy to cope with.`,
        stars: 4,
    },
];

function getReviewPos() {
    return getCookie("reviewPos") ?? 0;
}

document.querySelector("#slider-left").addEventListener("click", function () {
    let curPos = getReviewPos();
    curPos--;
    if (curPos < 0) curPos += reviews.length;
    changeReview(curPos);
});

document.getElementById("slider-right").addEventListener("click", function () {
    let curPos = getReviewPos();
    curPos++;
    if (curPos >= reviews.length) curPos -= reviews.length;
    changeReview(curPos);
});
changeReview(getReviewPos());

function changeReview(pos) {
    document.cookie = "reviewPos=" + pos;
    let review = reviews[pos];
    document.getElementById("slider-title").innerText = review.title;
    document.getElementById("slider-picture").src = review.picture_src;
    document.getElementById("slider-text").innerHTML = review.text;
    document.getElementById("slider-name").innerText = review.name;
    document.getElementById("slider-position").innerText = review.position;

    // document.getElementById("review-stars").innerHTML = "";
    for (let i = 0; i < 5; i++) {
        let star = document.getElementById("slider-star-" + i);
        if (i < review.stars) star.style.display = "inline-block";
        else star.style.display = "none";
    }
}

//Danik:

const blocks = document.querySelectorAll(".questions__list-item");

blocks.forEach(function (item) {
    item.addEventListener("click", blockClick);
});

let openIndex = getCookie("openIndex");
let firstElement = blocks[openIndex ?? 0];
let preventActiveElement;

firstElement.click();

function blockClick() {
    if (this.classList.contains("hidden")) {
        this.classList.toggle("hidden");
        preventActiveElement?.classList.toggle("hidden");
        preventActiveElement = this;

        let index;
        blocks.forEach((item, num) => {
            if (item === this) {
                index = num;
            }
        });

        document.cookie = "openIndex=" + index;
    }
}
