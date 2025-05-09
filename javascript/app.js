import { mapServices, ourCookingTeam, what_our_users_say } from "./data.js";

const service = document.querySelector(".what_we_do_cards");
const team = document.querySelector(".team_cards");
const content = document.querySelector(".content");
const nav = document.querySelector("nav ul");
const dropdown = document.querySelector(".dropdown");
const dropdownLine = document.querySelector(".line");

//What we do
const createServiceCard = mapServices.map((el) => {
  return `
    <div class="service">
    <img src=${el.img} loading="lazy" alt="service_${el.img}" />
    <h3>${el.title}</h3>
    <p>${el.description}</p>
    </div>`;
});

service.innerHTML = createServiceCard.join("");

// What our users say
const createsliderCard = what_our_users_say.map((el) => {
  return `
  <div class="user_comment_holder">
    <div class="user_comment_card">
        <div class="quote_top">‟</div>
          <div class="user_img">
            <div style="background-image:url(${el.img})" loading="lazy" class="slider_img"></div>
            <h3>${el.userName}</h3>
          </div>
          <p>
          ${el.message}
          </p>
      <div class="quote_bottom">„</div>
    </div>
    </div>
  `;
});

content.innerHTML = createsliderCard.join("");

// Cooking Team
const createTeamCard = ourCookingTeam.map((el) => {
  return `
  <div class="team_member">
  <div style="background-image:url(${el.Img})" >
  </div>
  <p style="width:100%">${el.Name}</p>
  <p style="width:100%">${el.Role}</p>
  </div>
  `;
});

team.innerHTML = createTeamCard.join("");

//Review Carosel
let num = 0;
document.addEventListener("click", (e) => {
  if (e.target.className === "slide_right") {
    num++;
    num < what_our_users_say.length ? num : (num = 0);
    content.style.transform = `translateX(-${100 * num}%)`;
  }
});
document.addEventListener("click", (e) => {
  if (e.target.className === "slide_left") {
    num--;
    content.style.transform = `translateX(-${100 * num}%)`;
    num <= 0 ? (num = what_our_users_say.length) : (num = num);
  }
});

//Hamburger dropdown
let isDisplayed = false;
const handleDropdown = () => {
  isDisplayed = !isDisplayed;
  isDisplayed
    ? (dropdown.classList.add("cancle"),
      (dropdown.style.position = "fixed"),
      (nav.style.opacity = "1"),
      (nav.style.height = "100vh"))
    : (dropdown.classList.remove("cancle"),
      (dropdown.style.position = "absolute"),
      (nav.style.opacity = "0"),
      (nav.style.height = "0"));
};

dropdown.addEventListener("click", handleDropdown);
dropdownLine.addEventListener("click", handleDropdown);

//intersection observer.
const h1 = document.querySelector(".what_we_do_intro");
const ourTeamh2p = document.querySelector(".our_team");
const serviceCard = document.querySelectorAll(".what_we_do .service");
const teamMembers = document.querySelectorAll(".team_member");

const observer1 = new IntersectionObserver((e) => {
  let element = e[0];
  element.isIntersecting
    ? element.target.classList.add("fadeIn")
    : element.target.classList.remove("fadeIn");
});

observer1.observe(h1);
observer1.observe(ourTeamh2p);

const observer2 = new IntersectionObserver((e) => {
  let element = e[0];

  element.intersectionRatio >= 0.001
    ? element.target.classList.add("slideIn")
    : element.target.classList.remove("slideIn");
});

for (let i = 0; i < serviceCard.length; i++) {
  observer2.observe(serviceCard[i]);
}
for (let i = 0; i < ourCookingTeam.length; i++) {
  observer2.observe(teamMembers[i]);
}
