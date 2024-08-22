document.getElementById("logo-img").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/";
});
checkCurrentSelectedSidebarElement();
let head_elements = document.getElementsByClassName("head");
let clicked_head_element = null;
Array.from(head_elements).forEach((element) => {
  element.addEventListener("mouseover", (e) => {
    e.preventDefault();
    let nxt_element = element.nextElementSibling;
    nxt_element.hidden = false;
  });
  element.addEventListener("mouseout", (e) => {
    e.preventDefault();
    let nxt_element = element.nextElementSibling;
    nxt_element.hidden = true;
    checkCurrentSelectedSidebarElement();
  });

  element.addEventListener("click", (e) => {
    e.preventDefault();
    let nxt_element = element.nextElementSibling;
    nxt_element.hidden = false;
    let ele_data = element.textContent;
    console.log(ele_data);
    switch (ele_data) {
      case "Blogs":
        window.location.href = "/blogs";
        break;
      case "Projects":
        window.location.href = "/projects";
        break;
      case "Experience":
        window.location.href = "/experience";
        break;
      case "Top Skills":
        window.location.href = "/top-skills";
        break;
      case "Education":
        window.location.href = "/education";
        break;
      default:
        window.location.href = "/not-found"; //TODO
    }
  });
});

let side_elements = document.getElementsByClassName("side");
Array.from(side_elements).forEach((element) => {
  element.addEventListener("mouseover", (e) => {
    e.preventDefault();
    let nxt_element = element.parentElement.nextElementSibling;
    let parent = element.parentElement;
    parent.classList.add("hover:border-[#C961DE]", "hover:border-2");
    nxt_element.hidden = false;
    let img_file = element.getAttribute("src").substring(14).split("_")[0];
    element.setAttribute("src", `../assets/img/${img_file}_p.svg`);
  });
  element.addEventListener("mouseout", (e) => {
    e.preventDefault();
    let nxt_element = element.parentElement.nextElementSibling;
    let parent = element.parentElement;
    parent.classList.remove("hover:border-[#C961DE]", "hover:border-2");
    nxt_element.hidden = true;
    let img_file = element.getAttribute("src").substring(14).split("_")[0];
    element.setAttribute("src", `../assets/img/${img_file}_b.svg`);
    checkCurrentSelectedSidebarElement();
  });
  element.addEventListener("click", (e) => {
    e.preventDefault();
    let nxt_element = element.parentElement.nextElementSibling;
    let ele_data = nxt_element.textContent;
    console.log(ele_data);
    switch (ele_data) {
      case "Home":
        window.location.href = "/";
        break;
      case "About Me":
        window.location.href = "/about-me";
        break;
      case "Contact Me":
        window.location.href = "/contact-me";
        break;
      case "Feedback":
        window.location.href = "/feedback";
        break;
      default:
        window.location.href = "/not-found"; //TODO
    }
  });
});
function checkCurrentSelectedSidebarElement() {
  let current_page_location =
    document.getElementById("mid-cont").dataset.location;
  console.log("Current page location: " + current_page_location);
  let current_page_id = document.getElementById("mid-cont").dataset.x;
  if (current_page_location == "sidebar") {
    let current_side_bar_element = document.getElementById(current_page_id);
    let child_element =
      current_side_bar_element.firstElementChild.firstElementChild;
    let parent = child_element.parentElement;
    parent.classList.add("hover:border-[#C961DE]", "hover:border-2");
    current_side_bar_element.lastElementChild.hidden = true;
    let img_file = child_element
      .getAttribute("src")
      .substring(14)
      .split("_")[0];
    child_element.setAttribute("src", `../assets/img/${img_file}_p.svg`);
  } else {
    console.log("Current page Id: " + current_page_id);
    let current_header_element = document.getElementById(current_page_id);
    console.log("Current header element: " + current_header_element.innerHTML);
    current_header_element.hidden = false;
  }
}
let current_page_id = document.getElementById("mid-cont").dataset.x;
if (current_page_id == "experience") {
  const scriptTag = document.getElementById("backend-data");
  const data = JSON.parse(scriptTag.textContent);
  let intern = document.getElementById("internship_count");
  let company = document.getElementById("companies_worked");
  let company_cont = document.getElementById("company_cont");
  let intern_cont = document.getElementById("intern_cont");
  intern.innerText = "Internships done : " + data.internships_count;
  company.innerText = "Companies worked : " + data.companies_count;
  let internshipsData = data.internships;

  console.log(typeof data.internships);
  for (let i = 0; i < internshipsData.length; i++) {
    let divData = ` <div
              class="flex flex-col rounded-md bg-[#192d4b] w-60 min-h-24 items-center p-4 gap-2 relative "
            >
            <a href=${data.internships[i].linkedin}>
              <img
                class="absolute right-2 top-2 hover:cursor-pointer"
                src="../assets/img/linkedin.svg"
                alt=""
              />
              </a>
              <img class="w-24 rounded-full" src="${data.internships[i].icon}" alt="" />
              <span class="text-lg">${data.internships[i].title}</span>
              <div class="flex justify-between w-full mt-4">
                <span class="hover:cursor-pointer hover:underline"><a href=${data.internships[i].details}>Know more</a></span>
                <span
                  class="hover:cursor-pointer hover:underline"
                ><a href=${data.internships[i].credential}>Credential</a></span>
              </div>
            </div>`;

    let div = document.createElement("div");
    div.innerHTML = divData;
    intern_cont.append(div);
  }
  let companiesData = data.companies;
  for (let i = 0; i < companiesData.length; i++) {
    let divData = ` <div
              class="flex flex-col rounded-md bg-[#192d4b] w-60 min-h-24 items-center p-4 gap-2 relative"
            >
            <a href=${data.companies[i].linkedin}>
              <img
                class="absolute right-2 top-2 hover:cursor-pointer"
                src="../assets/img/linkedin.svg"
                alt=""
              />
              </a>
              <img class="w-24" src="${data.companies[i].icon}" alt="" />
              <span class="text-lg">${data.companies[i].title}</span>
              <div class="flex justify-between w-full mt-4">
                <span class="hover:cursor-pointer hover:underline"><a href=${data.companies[i].details}>Know more</a></span>
                <span
                  class="hover:cursor-pointer hover:underline"
                ><a href=${data.companies[i].credential}>Credential</a></span>
              </div>
            </div>`;

    let div = document.createElement("div");
    div.innerHTML = divData;
    company_cont.append(div);
  }
}
if (current_page_id == "projects") {
  const scriptTag = document.getElementById("backend-data");
  const data = JSON.parse(scriptTag.textContent);
  let project_cont = document.getElementById("project-cont");

  let projectsData = data.projects;
  for (let i = 0; i < projectsData.length; i++) {
    let divData = `<div class="flex-flex-col">
            <div
              class="flex bg-[#192d4b] py-2 px-4 w-[100%] rounded-md rounded-bl-none items-center gap-8 justify-between"
            >
              <div class="flex flex-col">
                <span class="font-semibold text-2xl">${
                  projectsData[i].title
                }</span>
                <p id="project-desc" class="font-medium text-lg">
                ${projectsData[i].description.substring(0, 60)}...
                </p>
                <span id="project-know-more"
                  class="pt-2 w-fit hover:cursor-pointer hover:underline text-sm text-white"
                >more</span>
              </div>
              <div class="flex items-center">
              <a href=${projectsData[i].github}>
                <img
                  class="hover:cursor-pointer"
                  src="../assets/img/github.svg"
                  alt=""
                />
                </a>

                <div class="flex flex-col mt-8 items-center">
                 <a href="">
                  <img id="project-endorsement-btn"
                    class="w-8 hover:cursor-pointer"
                    src="../assets/img/star_void.svg"
                    alt=""
                  />
                    </a>
                  <span class="text-xs text-center">${
                    projectsData[i].endorsement
                  }
                    <br />
                    Endorcement</span>
                </div>
              </div>
            </div>
            <div id="more-cont" class="hidden flex-col w-[80%] bg-[#192d4b] h-96">
               <p class="font-medium text-lg px-4">
                ${projectsData[i].description}
                </p>
            </div>
            <div
              class="flex gap-2 bg-white text-black w-fit py-1 px-4 items-center rounded-b-md"
            >
              <span class="text-sm">Contributors :</span>
              <div class="flex items-center gap-2">
                <span class="text-sm"> ${
                  projectsData[i].contributors[0].name
                } </span>
                 <a href=${projectsData[i].contributors[0].linkedin}>
                <img
                  class="hover:cursor-pointer invert w-6"
                  src="../assets/img/linkedin.svg"
                  alt=""
                />
                  </a>
              </div>
            </div>`;
    let div = document.createElement("div");
    div.innerHTML = divData;
    project_cont.append(div);
  }
  let project_endrosement_btn = document.getElementById(
    "project-endorsement-btn"
  ); //TODO
  let project_more = document.getElementById("project-know-more");
  let isOpen = false;
  project_more.addEventListener("click", (e) => {
    e.preventDefault();
    let more_cont = document.getElementById("more-cont");
    let pro_desc = document.getElementById("project-desc");
    if (!isOpen) {
      more_cont.classList.remove("hidden");
      more_cont.classList.add("flex");
      pro_desc.hidden = true;
      project_more.innerText = "less";
      isOpen = true;
    } else {
      more_cont.classList.remove("flex");
      more_cont.classList.add("hidden");
      pro_desc.hidden = false;
      project_more.innerText = "more";
      isOpen = false;
    }
  });
}
if (current_page_id == "skills") {
  const scriptTag = document.getElementById("backend-data");
  const data = JSON.parse(scriptTag.textContent);
  let skill_cont = document.getElementById("skill-cont");

  let skillsData = data.skills;
  console.log("Type:" + Array.isArray(skillsData));
  for (let i = 0; i < skillsData.length; i++) {
    let divData = `<div
            class="flex flex-col gap-2 capsule bg-[#192d4b] pb-2 rounded-b-3xl"
          >
            <div class="flex w-[${skillsData[i].expertise}%] bg-orange-500 h-[6px]"></div>
            <div class="flex px-2 gap-4 items-center justify-between">
              <div class="flex items-center gap-2">
                <img class="w-16" src=${skillsData[i].icon} alt="" />
                <div class="flex flex-col">
                  <span class="text-lg">${skillsData[i].title}</span>
                  <span class="text-sm">Expertise : ${skillsData[i].expertise}%</span>
                </div>
              </div>
              <div class="flex flex-col items-center pr-2">
                <img id="skill-endorsement-btn" class="w-8 hover:cursor-pointer" src="../assets/img/star_void.svg" alt="" />
                <span class="text-center text-xs">${skillsData[i].endorsements}<br />Endorcement</span>
              </div>
            </div>
          </div>`;
    let div = document.createElement("div");
    div.innerHTML = divData;
    skill_cont.append(div);
  }

  let skill_endorsement_btn = document.getElementById("skill-endorsement-btn"); //TODO
}
if (current_page_id == "feedback") {
  console.log("Entering inside feedback");
  let nameVal = "",
    emailVal = "",
    feedbackVal = "";
  let namet = document.getElementById("name");
  let emailt = document.getElementById("email");
  let feedbackt = document.getElementById("issue");
  let rating_div = document.getElementById("rating-div");
  let ratingValue = "";
  let stars = rating_div.children;
  let starTapValue = 0;
  Array.from(stars).forEach((star) => {
    star.addEventListener("click", (e) => {
      e.preventDefault();
      ratingValue = star.dataset.star;
      starTapValue = parseInt(ratingValue.split("-")[0], 10);
      for (let i = 0; i < 5; i++) {
        let starElement = rating_div.children[i];
        if (i < starTapValue) {
          starElement.setAttribute("src", "../assets/img/star_fill.svg");
        } else {
          starElement.setAttribute("src", "../assets/img/star_void.svg");
        }
      }
    });
  });

  document
    .getElementById("send-feedback-btn")
    .addEventListener("click", async (e) => {
      e.preventDefault();
      nameVal = namet.value;
      emailVal = emailt.value;
      feedbackVal = feedbackt.value;
      if (nameVal == "" || emailVal == "" || feedbackVal == "") {
        alert("Fill up all field please.");
      } else {
        console.log("Name: " + namet.value);
        const data = {
          name: nameVal,
          email: emailVal,
          feedback: feedbackVal,
          rating: ratingValue,
        };

        console.log(data);
        const response = await fetch("http://localhost:5000/feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        console.log("Everything is OK.");
      }
    });
}
if (current_page_id == "home") {
  let hire = document.getElementById("hire-me-btn");
  let cv = document.getElementById("download-cv-btn");
  hire.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/hire-me";
  });
}
if (current_page_id == "contact") {
  let copy_btn = document.getElementById("copy-no-btn");
  let copy_txt = document.getElementById("copy-no-txt");
  copy_btn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("hhh");
    const phoneNumber = "+917908484565";
    navigator.clipboard
      .writeText(phoneNumber)
      .then(function () {
        copy_txt.innerText = "Phone number copied!";
        copy_txt.style.color = "green";
      })
      .catch(function (err) {
        // Optional: Alert the user on failure
        alert("Failed to copy phone number: " + err);
      });
  });
}

const toggleIcon = document.getElementById("toggle-icon");
const body = document.body;

toggleIcon.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
});
