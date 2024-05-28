/* Av Petra Ingemarsson */

"use strict";

// Lagrar URL till webbtjänst
const urlRes: string = "https://studenter.miun.se/~pein2200/writeable/dt173g/projekt/webservice/reservation.php"

// Hämtar element från DOM
const nameInput = document.getElementById("name") as HTMLInputElement;
const phoneInput = document.getElementById("phone") as HTMLInputElement;
const dateInput = document.getElementById("date") as HTMLInputElement;
const timeInput = document.getElementById("time") as HTMLInputElement;
const peopleInput = document.getElementById("people") as HTMLInputElement;

const nameMessageEl: HTMLElement = document.getElementById("name-message")!;
const phoneMessageEl: HTMLElement = document.getElementById("phone-message")!;
const dateMessageEl: HTMLElement = document.getElementById("date-message")!;
const timeMessageEl: HTMLElement = document.getElementById("time-message")!;
const reservationBtn: HTMLElement = document.getElementById("reservation-btn")!;
const confirmMessageEl: HTMLElement = document.getElementById("confirm-message")!;

// Lagrar aktuellet datum i variabel
const newDate: Date = new Date();
const year: number = newDate.getFullYear();
const month: string = String(newDate.getMonth() + 1).padStart(2, '0');
const day: string = String(newDate.getDate()).padStart(2, '0');
const dateNow: string = `${year}-${month}-${day}`;

// Sätter lägstadatum för datumväljare
dateInput.min = dateNow;

// Sätter standardvärde för antal personer
peopleInput.value = "2";

// Adderar händelselyssnare för att anropa funktion vid klick
reservationBtn.addEventListener("click", addReservation);

// Funktion för att lägga till bokning
function addReservation(event: Event) {

    // Förhindrar att sidan laddas om vid klick på knapp
    event.preventDefault();

    // Läser in värden från formulär
    let resname: string = nameInput.value;
    let resphone: string = phoneInput.value;
    let resdate: string = dateInput.value;
    let restime: string = timeInput.value;
    let resquantity: string = peopleInput.value;

    // Kontrollerar om något input-fält är tomt eller felaktigt
    if (resname === "" || resname.length > 125) {

        // Skriver ut meddelande
        nameMessageEl.innerHTML = `<p>Fyll i ditt namn!</p>`;

    } else if (resphone === "" || resphone.length > 125) {

        // Raderar eventuellt meddelande
        nameMessageEl.innerHTML = "";

        // Skriver ut meddelande
        phoneMessageEl.innerHTML = `<p>Fyll i ditt telefonnummer!</p>`;

    } else if (resdate === "") {

        // Raderar eventuellt meddelande
        phoneMessageEl.innerHTML = "";

        // Skriver ut meddelande
        dateMessageEl.innerHTML = `<p>Fyll i ett datum!</p>`;

    } else if (restime === "" || restime < "12:00" || restime > "23:30") {

        // Raderar eventuellt meddelande
        dateMessageEl.innerHTML = "";

        // Skriver ut meddelande
        timeMessageEl.innerHTML = `<p>Fyll i en tid inom våra öppettider!</p>
        <p>Vardag 16.00 - 21.00 / Helg 12.00 - 23.30</p>`;

    } else {
        // Raderar eventuella meddelanden
        nameMessageEl.innerHTML = "";
        phoneMessageEl.innerHTML = "";
        dateMessageEl.innerHTML = "";
        timeMessageEl.innerHTML = "";

        // Skapar objekt, omvandlar till JSON och lagrar i variabel
        let jsonString = JSON.stringify({
            resname: resname,
            resphone: resphone,
            resdate: resdate,
            restime: restime,
            resquantity: resquantity
        })

        // Fetch-anrop med metoden POST
        fetch(urlRes, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Apikey": "QOat53BjU09GgFLx3h11kJBdYQP84Fc4"
            },
            body: jsonString
        })
            // Omvandlar respons till JSON
            .then(response => response.json())

            // Anropar funktion
            .then(data => clearForm(resdate, restime, resquantity))

            // Fångar upp eventuellt felmeddelande
            .catch(err => console.log(err))
    }
}

// Funktion för att rensa formulär
function clearForm(rd: string, rt: string, rq: string) {
    nameInput.value = "";
    phoneInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
    peopleInput.value = "2";

    // Skriver ut meddelande
    confirmMessageEl.innerHTML = `<p>Tack för din bokning!</p>
    <p>Välkommen ${rd} kl. ${rt}</p>
    <p>Antal personer: ${rq}</p>`;

    // Skrollar till position
    confirmMessageEl.scrollIntoView();
}