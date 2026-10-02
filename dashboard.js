const API =
  "http://localhost:5000/api";


const token =
  localStorage.getItem("token");


const user =
  JSON.parse(
    localStorage.getItem("user")
  );


if (!token || !user) {

  window.location.href =
    "login.html";

}


document.getElementById(
  "welcome"
).innerText =
  `Welcome, ${user.name} 👋`;


if (user.role === "customer") {

  document.getElementById(
    "workerPanel"
  ).style.display = "none";

} else {

  document.getElementById(
    "customerPanel"
  ).style.display = "none";

}



async function findWorkers() {

  const service =
    document.getElementById(
      "service"
    ).value;

  const location =
    document.getElementById(
      "location"
    ).value;


  const response =
    await fetch(
      `${API}/workers?service=${encodeURIComponent(service)}&location=${encodeURIComponent(location)}`
    );


  const data =
    await response.json();


  const container =
    document.getElementById(
      "workers"
    );


  container.innerHTML = "";


  if (!data.workers?.length) {

    container.innerHTML =
      "<p>No workers found.</p>";

    return;

  }


  data.workers.forEach(worker => {

    const card =
      document.createElement(
        "div"
      );

    card.className =
      "worker-result";


    card.innerHTML = `

      <h3>
        ${worker.user.name}
      </h3>

      <p>
        Service:
        ${worker.service}
      </p>

      <p>
        Experience:
        ${worker.experience} years
      </p>

      <p>
        Price:
        ₹${worker.price}
      </p>

      <p>
        ⭐ ${worker.rating}
      </p>

      <button
        onclick="bookWorker('${worker._id}', '${worker.service}')"
      >
        Book Worker
      </button>

    `;


    container.appendChild(card);

  });

}



async function bookWorker(
  workerId,
  service
) {

  const price =
    prompt(
      "Enter your price offer ₹:"
    );

  if (!price) return;


  const date =
    prompt(
      "Booking date YYYY-MM-DD:"
    );

  if (!date) return;


  const response =
    await fetch(
      `${API}/bookings`,
      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

          "Authorization":
            `Bearer ${token}`

        },

        body: JSON.stringify({

          workerId,

          service,

          customerOffer:
            Number(price),

          bookingDate:
            date

        })

      }
    );


  const data =
    await response.json();


  alert(
    data.message ||
    "Booking request sent"
  );

}



async function createWorker() {

  const service =
    document.getElementById(
      "workerService"
    ).value;

  const experience =
    document.getElementById(
      "experience"
    ).value;

  const price =
    document.getElementById(
      "workerPrice"
    ).value;

  const location =
    document.getElementById(
      "workerLocation"
    ).value;

  const description =
    document.getElementById(
      "description"
    ).value;


  const response =
    await fetch(
      `${API}/workers`,
      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

          "Authorization":
            `Bearer ${token}`

        },

        body: JSON.stringify({

          service,

          experience:
            Number(experience),

          price:
            Number(price),

          location,

          description

        })

      }
    );


  const data =
    await response.json();


  document.getElementById(
    "workerMessage"
  ).innerText =
    data.message;

}



async function getBookings() {

  const response =
    await fetch(
      `${API}/bookings/my`,
      {

        headers: {

          "Authorization":
            `Bearer ${token}`

        }

      }
    );


  const data =
    await response.json();


  const container =
    document.getElementById(
      "bookings"
    );


  container.innerHTML = "";


  if (!data.bookings?.length) {

    container.innerHTML =
      "<p>No bookings yet.</p>";

    return;

  }


  data.bookings.forEach(
    booking => {

      const div =
        document.createElement(
          "div"
        );

      div.className =
        "booking-card";


      div.innerHTML = `

        <h3>
          ${booking.service}
        </h3>

        <p>
          Customer Offer:
          ₹${booking.customerOffer}
        </p>

        <p>
          Worker Offer:
          ${
            booking.workerOffer
            ? "₹" + booking.workerOffer
            : "Waiting"
          }
        </p>

        <p>
          Status:
          ${booking.status}
        </p>

      `;


      container.appendChild(div);

    }
  );

}



function logout() {

  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "user"
  );

  window.location.href =
    "login.html";

}