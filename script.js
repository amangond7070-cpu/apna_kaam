let selectedService = "";


function selectService(service) {

  selectedService = service;

  document.getElementById(
    "selectedService"
  ).innerText =
    "Selected Service: " + service;

  document.getElementById(
    "bookingModal"
  ).style.display = "flex";
}


function closeModal() {

  document.getElementById(
    "bookingModal"
  ).style.display = "none";

}


function confirmBooking() {

  const name =
    document.getElementById("name").value;

  const phone =
    document.getElementById("phone").value;

  const date =
    document.getElementById("date").value;

  const price =
    document.getElementById("price").value;

  const message =
    document.getElementById("bookingMessage");


  if (!name || !phone || !date || !price) {

    message.innerText =
      "Please fill all details.";

    message.style.color = "red";

    return;
  }


  message.innerText =
    "Booking request sent successfully!";

  message.style.color = "green";

}


function searchService() {

  const location =
    document.getElementById(
      "locationInput"
    ).value;

  const service =
    document.getElementById(
      "serviceInput"
    ).value;

  const result =
    document.getElementById(
      "searchResult"
    );


  if (!location || !service) {

    result.innerText =
      "Please enter location and service.";

    result.style.color = "red";

    return;
  }


  result.innerText =
    "Searching for " +
    service +
    " near " +
    location +
    "...";

  result.style.color =
    "#ff6b00";

}


function openLogin() {

  document.getElementById(
    "loginModal"
  ).style.display = "flex";

}


function closeLogin() {

  document.getElementById(
    "loginModal"
  ).style.display = "none";

}


function loginUser() {

  document.getElementById(
    "loginMessage"
  ).innerText =
    "Demo login successful!";

}


window.onclick = function(event) {

  const booking =
    document.getElementById(
      "bookingModal"
    );

  const login =
    document.getElementById(
      "loginModal"
    );


  if (event.target === booking) {
    closeModal();
  }

  if (event.target === login) {
    closeLogin();
  }

};