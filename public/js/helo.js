console.log("this is the java script page");

const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.getElementById("iconic");

weatherform.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(search.value);
  fetch("http://localhost:3000/weather?address=" + search.value).then((response) => {
    response.json().then((data) => {
      if (data.err) {
        messageOne.textContent = data.err;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast.msg;
        messageThree.src = data.forecast.icon;
        console.log(data.forecast);
      }
    });
  });
});
