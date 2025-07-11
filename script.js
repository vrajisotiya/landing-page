// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
    }
  });
}, observerOptions);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

// Animated counter for stats
function animateCounter(counter, target) {
  let count = 0;
  const speed = 75; // lower = faster
  const increment = target / speed;

  const updateCount = () => {
    count += increment;
    if (count < target) {
      counter.innerText = Math.floor(count).toLocaleString("en-IN");
      requestAnimationFrame(updateCount);
    } else {
      counter.innerText = target.toLocaleString();
    }
  };

  updateCount();
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll(".stat-number");
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-count"));
        animateCounter(counter, target);
      });
      statsObserver.unobserve(entry.target);
    }
  });
});

const statsSection = document.querySelector(".stats");
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Parallax effect for floating orbs
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const orbs = document.querySelectorAll(".floating-orb");

  orbs.forEach((orb, index) => {
    const speed = 0.5 + index * 0.1;
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add some interactive features to product mockup
const productMockup = document.querySelector(".product-mockup");
if (productMockup) {
  productMockup.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) rotateX(5deg)";
  });

  productMockup.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) rotateX(0deg)";
  });
}

// Loading animation
window.addEventListener("load", function () {
  document.body.style.opacity = "1";
});
