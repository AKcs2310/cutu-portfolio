// script.js - Portfolio Behavior Script for Samadrita Maity

$(document).ready(function () {
  // Toggle menu and navbar
  $('#menu').click(function () {
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });

  // On scroll & load
  $(window).on('scroll load', function () {
    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');

    // Scroll to top button show/hide
    if (window.scrollY > 60) {
      $('#scroll-top').addClass('active');
    } else {
      $('#scroll-top').removeClass('active');
    }

    // Scroll spy
    $('section').each(function () {
      const height = $(this).height();
      const offset = $(this).offset().top - 200;
      const top = $(window).scrollTop();
      const id = $(this).attr('id');

      if (top > offset && top < offset + height) {
        $('.navbar ul li a').removeClass('active');
        $(`.navbar ul li a[href="#${id}"]`).addClass('active');
      }
    });
  });

  // Smooth scrolling
  $('a[href*="#"]').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top,
    }, 500, 'linear');
  });

  // EmailJS form submission
  $("#contact-form").submit(function (event) {
    event.preventDefault();
    emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");
    emailjs.sendForm('contact_service', 'template_contact', this)
      .then(() => {
        alert("Form Submitted Successfully");
        $("#contact-form")[0].reset();
      })
      .catch(() => {
        alert("Form Submission Failed! Try Again");
      });
  });
});

// Change title & favicon on tab switch
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === "visible") {
    document.title = "Portfolio | Samadrita Maity";
    $("#favicon").attr("href", "assets/images/favicon.jpg");
  } else {
    document.title = "Portfolio | Come Back 😄";
    $("#favicon").attr("href", "assets/images/favicon.jpg");
  }
});

// Typed.js effect
new Typed(".typing-text", {
  strings: [
    "Civil Engineering",
    "Structural Analysis",
    "Frontend Development",
    "Web Designing",
    "Data Analytics",
    "Sustainable Construction",
    "AutoCAD &amp; Drafting",
    "Site Supervision",
    "Concrete Testing",
    
  ],
  loop: true,
  typeSpeed: 60,
  backSpeed: 30,
  backDelay: 500,
});

// Fetch and show skills and projects
async function fetchData(type = "skills") {
  const response = await fetch(type === "skills" ? "skills.json" : "./projects/projects.json");
  return response.json();
}

function showSkills(skills) {
  const skillsContainer = document.getElementById("skillsContainer");
  skillsContainer.innerHTML = skills.map(skill => `
    <div class="bar">
      <div class="info">
        <img src="${skill.icon}" alt="${skill.name}" />
        <span>${skill.name}</span>
      </div>
    </div>
  `).join('');
}

function showProjects(projects) {
  const projectsContainer = document.querySelector("#work .box-container");
  projectsContainer.innerHTML = projects
    .slice(0, 10)
    .filter(project => project.category !== "android")
    .map(project => `
      <div class="box tilt">
        <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="${project.name}" />
        <div class="content">
          <div class="tag">
            <h3>${project.name}</h3>
          </div>
          <div class="desc">
            <p>${project.desc}</p>
            <div class="btns">
              <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
              <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
            </div>
          </div>
        </div>
      </div>
    `).join('');

  VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });

  const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true,
  });
  srtop.reveal('.work .box', { interval: 200 });
}

// Initialize skill and project data
fetchData().then(showSkills);
fetchData("projects").then(showProjects);

// Scroll reveal animations
const srtop = ScrollReveal({
  origin: 'top',
  distance: '80px',
  duration: 1000,
  reset: true
});
srtop.reveal('.home .content h3, .home .content p, .home .content .btn', { delay: 200 });
srtop.reveal('.home .image, .home .social-icons li', { interval: 200 });
srtop.reveal('.about .content h3, .about .content p, .about .resumebtn', { delay: 200 });
srtop.reveal('.skills .container .bar', { interval: 100 });
srtop.reveal('.education .box, .experience .timeline .container, .contact .form-group', { interval: 200 });

// Disable basic dev tools
document.onkeydown = function (e) {
  if (e.keyCode === 123 ||
    (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key)) ||
    (e.ctrlKey && e.key === 'U')) {
    return false;
  }
};