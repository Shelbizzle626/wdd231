// Renders course cards from the "courses" array (defined in courses.js),

const cardContainer = document.getElementById("course-cards");
const totalCreditsDisplay = document.getElementById("total-credits");
const courseCountDisplay = document.getElementById("course-count");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderCourses(courseList) {
    cardContainer.innerHTML = "";

    courseList.forEach((course) => {
        const card = document.createElement("div");
        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p>${course.title}</p>
      <p>${course.credits} credits</p>
    `;

        cardContainer.appendChild(card);
    });

    courseCountDisplay.textContent = `The total number of courses listed below is ${courseList.length}`;
    displayTotalCredits(courseList);
}

function displayTotalCredits(courseList) {
    const total = courseList.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsDisplay.textContent = `Total Credits: ${total}`;
}

function setActiveButton(activeButton) {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    activeButton.classList.add("active");
}

document.getElementById("btn-all").addEventListener("click", (e) => {
    renderCourses(courses);
    setActiveButton(e.target);
});

document.getElementById("btn-wdd").addEventListener("click", (e) => {
    const wddCourses = courses.filter((course) => course.subject === "WDD");
    renderCourses(wddCourses);
    setActiveButton(e.target);
});

document.getElementById("btn-cse").addEventListener("click", (e) => {
    const cseCourses = courses.filter((course) => course.subject === "CSE");
    renderCourses(cseCourses);
    setActiveButton(e.target);
});

// Initial render — show all courses on page load
renderCourses(courses);