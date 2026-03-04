  // Toggle heart button active state
  document.querySelectorAll(".heart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
    });
  });


// Slider functionality
    document.querySelectorAll(".slider").forEach(slider => {

    const slides = slider.querySelector(".slides");
    const images = slides.querySelectorAll("img");
    let index = 0;

    slider.addEventListener("click", () => {
      index++;

      if (index >= images.length) {
        index = 0;
      }

      slides.style.transform = `translateX(-${index * 100}%)`;
    });

  });