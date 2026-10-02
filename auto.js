const API =
  "http://localhost:5000/api";


async function register() {

  const name =
    document.getElementById("name").value;

  const phone =
    document.getElementById("phone").value;

  const password =
    document.getElementById("password").value;

  const location =
    document.getElementById("location").value;

  const role =
    document.getElementById("role").value;

  const message =
    document.getElementById("message");


  if (!name || !phone || !password) {

    message.innerText =
      "Please fill required fields.";

    message.style.color = "red";

    return;
  }


  try {

    const response =
      await fetch(
        `${API}/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            name,
            phone,
            password,
            location,
            role
          })
        }
      );


    const data =
      await response.json();


    if (!response.ok) {

      message.innerText =
        data.message;

      message.style.color =
        "red";

      return;
    }


    message.innerText =
      "Account created successfully!";

    message.style.color =
      "green";


    setTimeout(() => {

      window.location.href =
        "login.html";

    }, 1000);


  } catch (error) {

    message.innerText =
      "Server connection failed.";

    message.style.color =
      "red";

  }

}



async function login() {

  const phone =
    document.getElementById("phone").value;

  const password =
    document.getElementById("password").value;

  const message =
    document.getElementById("message");


  if (!phone || !password) {

    message.innerText =
      "Enter phone and password.";

    message.style.color =
      "red";

    return;
  }


  try {

    const response =
      await fetch(
        `${API}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            phone,
            password
          })
        }
      );


    const data =
      await response.json();


    if (!response.ok) {

      message.innerText =
        data.message;

      message.style.color =
        "red";

      return;
    }


    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );


    message.innerText =
      "Login successful!";

    message.style.color =
      "green";


    setTimeout(() => {

      window.location.href =
        "dashboard.html";

    }, 700);


  } catch (error) {

    message.innerText =
      "Server connection failed.";

    message.style.color =
      "red";

  }

}