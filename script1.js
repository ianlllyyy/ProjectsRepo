    // Existing scripts
    document.getElementById('menu-btn').addEventListener('click', () => {
      document.getElementById('mobile-menu').classList.toggle('hidden');
    });

    const slides = document.querySelectorAll('.carousel');
    let current = 0;
    function changeSlide() {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }
    slides[0].classList.add('active');
    setInterval(changeSlide, 6000);

    const fadeEls = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    });
    fadeEls.forEach(el => observer.observe(el));

    // ✅ View Details Modal Functionality with Next/Prev
    const modal = document.getElementById('property-modal');
    const closeModal = document.getElementById('close-modal');
    const prevBtn = document.getElementById('prev-property');
    const nextBtn = document.getElementById('next-property');
    const propertyButtons = [...document.querySelectorAll('.view-details')];
    let currentIndex = 0;

    function openModal(index) {
      const button = propertyButtons[index];
      document.getElementById('modal-title').textContent = button.dataset.title;
      document.getElementById('modal-location').textContent = button.dataset.location;
      document.getElementById('modal-price').textContent = button.dataset.price;
      document.getElementById('modal-description').textContent = button.dataset.description;
      document.getElementById('modal-image').src = button.dataset.image;
      document.getElementById('modal-bedrooms').textContent = button.dataset.bedrooms;
      document.getElementById('modal-bathrooms').textContent = button.dataset.bathrooms;
      document.getElementById('modal-lot').textContent = button.dataset.lot;
      document.getElementById('modal-amenities').textContent = button.dataset.amenities;

      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    propertyButtons.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        currentIndex = i;
        openModal(currentIndex);
      });
    });

    prevBtn.addEventListener('click', e => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + propertyButtons.length) % propertyButtons.length;
      openModal(currentIndex);
    });

    nextBtn.addEventListener('click', e => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % propertyButtons.length;
      openModal(currentIndex);
    });

    closeModal.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });