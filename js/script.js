/* ============================================
   SCRIPT.JS — Semua Fitur JavaScript
   Pelatihan & Sertifikasi K3 TNI AL
   ============================================ */

// === TUNGGU DOKUMEN SIAP ===
document.addEventListener('DOMContentLoaded', function () {

  // ==========================================
  // 1. MOBILE MENU TOGGLE
  // ==========================================
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      this.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Tutup menu saat link diklik
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // ==========================================
  // 2. NAVBAR STICKY — tambah class saat scroll
  // ==========================================
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ==========================================
  // 3. FAQ ACCORDION
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', function () {
      const isActive = item.classList.contains('active');

      // Tutup semua FAQ lain
      faqItems.forEach(function (other) {
        other.classList.remove('active');
      });

      // Buka yang diklik (toggle)
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ==========================================
  // 4. FORM VALIDASI
  // ==========================================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      // Ambil field
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');

      // Reset error
      document.querySelectorAll('.form-group').forEach(function (group) {
        group.classList.remove('error');
      });

      // Validasi Nama
      if (!name.value.trim()) {
        showError(name, 'Nama wajib diisi');
        isValid = false;
      }

      // Validasi Email
      if (!email.value.trim()) {
        showError(email, 'Email wajib diisi');
        isValid = false;
      } else if (!isValidEmail(email.value.trim())) {
        showError(email, 'Format email tidak valid');
        isValid = false;
      }

      // Validasi Subjek
      if (!subject.value.trim()) {
        showError(subject, 'Subjek wajib diisi');
        isValid = false;
      }

      // Validasi Pesan
      if (!message.value.trim()) {
        showError(message, 'Pesan wajib diisi');
        isValid = false;
      }

      // Jika valid, kirim (simulasi)
      if (isValid) {
        alert('✓ Terima kasih! Pesan Anda telah terkirim.');
        contactForm.reset();
      }
    });
  }

  // Helper: tampilkan error
  function showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');
    const errorText = formGroup.querySelector('.error-text');
    if (errorText) {
      errorText.textContent = message;
    }
  }

  // Helper: validasi format email
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // ==========================================
  // 5. SCROLL ANIMATION — IntersectionObserver
  // ==========================================
  const animElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  if (animElements.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // hanya sekali
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    animElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ==========================================
  // 6. COUNTER ANIMATION (untuk hero stats)
  // ==========================================
  const counters = document.querySelectorAll('.counter');

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          animateCounter(el, target);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  }

  function animateCounter(el, target) {
    let current = 0;
    const increment = Math.ceil(target / 60);
    const step = function () {
      current += increment;
      if (current >= target) {
        current = target;
        el.textContent = current;
        return;
      }
      el.textContent = current;
      requestAnimationFrame(step);
    };
    step();
  }

});
