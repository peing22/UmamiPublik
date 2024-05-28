/* Av Petra Ingemarsson */

"use strict";

// Lagrar URL till webbtjänst
const urlPres: string = "https://studenter.miun.se/~pein2200/writeable/dt173g/projekt/webservice/presentation.php"
const urlMenu: string = "https://studenter.miun.se/~pein2200/writeable/dt173g/projekt/webservice/menu.php"

// Hämtar element från DOM
const umamiLink: HTMLElement = document.getElementById("umami-link")!;
const menuLink: HTMLElement = document.getElementById("menu-link")!;
const reservationLink: HTMLElement = document.getElementById("reservation-link")!;
const presentationEl: HTMLElement = document.getElementById("presentation")!;
const menuEl: HTMLElement = document.getElementById("menu")!;
const reservationEl: HTMLElement = document.getElementById("reservation")!;
const presentationContentEl: HTMLElement = document.getElementById("presentation-content")!;
const starterEl: HTMLElement = document.getElementById("starter")!;
const mainCourseEl: HTMLElement = document.getElementById("main-course")!;
const dessertEl: HTMLElement = document.getElementById("dessert")!;
const drinksEl: HTMLElement = document.getElementById("drinks")!;

// Adderar händelselyssnare för att anropa funktion vid klick
umamiLink.addEventListener("click", scrollToUmami);
menuLink.addEventListener("click", scrollToMenu);
reservationLink.addEventListener("click", scrollToReservation);

// Funktion för att skrolla till UMAMI
function scrollToUmami(): void {
    presentationEl.scrollIntoView();
}

// Funktion för att skrolla till MENY
function scrollToMenu(): void {
    menuEl.scrollIntoView();
}

// Funktion för att skrolla till BOKA
function scrollToReservation(): void {
    reservationEl.scrollIntoView();
}

// När webbläsaren har laddat klart körs funktionen init
window.onload = init;
function init(): void {

    // Anropar funktioner
    getPresentation();
    getMenu();
}

// Funktion för att avkoda HTML-taggar
function decode(str: string): string | null {
    let txt = new DOMParser().parseFromString(str, "text/html");
    return txt.documentElement.textContent;
}

// Funktion för att hämta presentation från webbtjänst
function getPresentation(): void {

    // Fetch-anrop med metoden GET
    fetch(urlPres, {
        headers: {
            "Apikey": "QOat53BjU09GgFLx3h11kJBdYQP84Fc4"
        }
    })
        .then(response => {

            // Stoppar om statuskod inte är OK
            if (response.status != 200) {
                return
            }

            // Omvandlar respons till JSON
            return response.json()

                // Anropar funktion och skickar med data
                .then(data => printPresentation(data))

                // Fångar upp eventuellt felmeddelande
                .catch(err => console.log(err))
        })
}

// Funktion för att skriva ut presentation till DOM
function printPresentation(presentation: any) {

    // Tömmer presentation på innehåll
    presentationContentEl.innerHTML = "";

    // Loopar igenom meny
    presentation.forEach(paragraph => {

        // Avkodar eventuella HTML-taggar
        let decodedContent: string = decode(paragraph.content)!;

        // Skriver ut presentation
        presentationContentEl.innerHTML += `<p>${decodedContent}</p>`;
    });
}

// Funktion för att hämta meny från webbtjänst
function getMenu(): void {

    // Fetch-anrop med metoden GET
    fetch(urlMenu, {
        headers: {
            "Apikey": "QOat53BjU09GgFLx3h11kJBdYQP84Fc4"
        }
    })
        .then(response => {

            // Stoppar om statuskod inte är OK
            if (response.status != 200) {
                return
            }

            // Omvandlar respons till JSON
            return response.json()

                // Anropar funktion och skickar med data
                .then(data => printMenu(data))

                // Fångar upp eventuellt felmeddelande
                .catch(err => console.log(err))
        })
}

// Funktion för att skriva ut meny till DOM
function printMenu(menu: any) {


    // Tömmer meny på innehåll
    starterEl.innerHTML = "";
    mainCourseEl.innerHTML = "";
    dessertEl.innerHTML = "";
    drinksEl.innerHTML = "";

    // Loopar igenom meny
    menu.forEach(dish => {

        // Avkodar eventuella HTML-taggar
        let decodedTitle: string = decode(dish.title)!;
        let decodedDescript: string = decode(dish.descript)!;

        // Beroende på kategori
        switch (dish.category) {

            case "Förrätt":

                // Skriver ut till meny
                starterEl.innerHTML += `<h4>${decodedTitle}</h4>
                <p class="menu-descript">${decodedDescript}</p>
                <p class="menu-price">${dish.price} kr</p>`;
                break;

            case "Varmrätt":

                // Skriver ut till meny
                mainCourseEl.innerHTML += `<h4>${decodedTitle}</h4>
                <p class="menu-descript">${decodedDescript}</p>
                <p class="menu-price">${dish.price} kr</p>`;
                break;

            case "Dessert":

                // Skriver ut till meny
                dessertEl.innerHTML += `<h4>${decodedTitle}</h4>
                <p class="menu-descript">${decodedDescript}</p>
                <p class="menu-price">${dish.price} kr</p>`;
                break;

            case "Dryck":

                // Skriver ut till meny
                drinksEl.innerHTML += `<h4>${decodedTitle}</h4>
                <p class="menu-descript">${decodedDescript}</p>
                <p class="menu-price">${dish.price} kr</p>`;
                break;
        }
    });
}