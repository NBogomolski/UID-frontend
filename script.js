function popup() {
    let wrapper = document.getElementById('popup')
    wrapper.classList.add('black-popup');
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