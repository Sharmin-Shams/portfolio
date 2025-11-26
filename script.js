document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.slider').forEach((slider) => {
    const images = JSON.parse(slider.dataset.images);
    const imgTag = slider.querySelector('img');
    const dotsContainer = slider.querySelector('.dots');
    let currentIndex = 0;

    // Create dots dynamically
    images.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');

      // Click dot to jump to that slide
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlide();
      });

      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    // Function to update image + active dot
    function updateSlide() {
      imgTag.src = images[currentIndex];
      dots.forEach(d => d.classList.remove('active'));
      dots[currentIndex].classList.add('active');
    }

    // Click image to go to next slide
    // imgTag.addEventListener('click', () => {
    //   currentIndex = (currentIndex + 1) % images.length;
    //   updateSlide();
    // });

   // Optional: Auto-slide (set autoSlideEnabled = false to disable)
    const autoSlideEnabled = true; // change to true if you want auto-slide
    const autoSlideInterval = 4000; // 4 seconds

    if (autoSlideEnabled) {
      setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlide();
      }, autoSlideInterval);
    }
  });

// ===================== NAVBAR TOGGLE =====================
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");

      // Toggle between hamburger and close icon
      const icon = menuToggle.querySelector("i");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-xmark");
    });

    // Close menu when a link is clicked
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        const icon = menuToggle.querySelector("i");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");
      });
    });
  }

  // ======= Lightbox =======
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox .close");

// When any slider image is clicked, show it large
document.querySelectorAll(".slider img").forEach(img => {
  img.addEventListener("click", () => { // Use double click to avoid conflict with next-slide click
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

// Close the lightbox
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Close when clicking outside image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

});
