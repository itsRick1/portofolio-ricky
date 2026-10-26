// ==========================================
// Portfolio JavaScript - Clean & Interactive
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu (Hamburger) Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu() {
    const isExpanded = mobileMenu.classList.contains('hidden');
    if (isExpanded) {
      mobileMenu.classList.remove('hidden');
      menuIconOpen.classList.add('hidden');
      menuIconClose.classList.remove('hidden');
    } else {
      mobileMenu.classList.add('hidden');
      menuIconOpen.classList.remove('hidden');
      menuIconClose.classList.add('hidden');
    }
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Close menu when clicking any nav link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      }
    });
  }

  // 2. Active Navigation Scroll Spy
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        desktopLinks.forEach(link => {
          link.classList.remove('text-teal-600', 'font-bold', 'bg-teal-50/80');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-teal-600', 'font-bold', 'bg-teal-50/80');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNavOnScroll);

  // 3. Audio / Backsound Controller
  const bgAudio = document.getElementById('bg-audio');
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  const musicIconPlaying = document.getElementById('music-icon-playing');
  const musicIconMuted = document.getElementById('music-icon-muted');
  const musicStatusText = document.getElementById('music-status-text');
  const musicEqualizer = document.getElementById('music-equalizer');
  let isPlaying = false;

  // Set initial volume for comfortable background listening
  if (bgAudio) {
    bgAudio.volume = 0.45;
  }

  function setAudioState(play) {
    if (!bgAudio) return;
    if (play) {
      bgAudio.play().then(() => {
        isPlaying = true;
        musicIconPlaying.classList.remove('hidden');
        musicIconMuted.classList.add('hidden');
        if (musicEqualizer) musicEqualizer.classList.remove('paused');
        if (musicStatusText) musicStatusText.textContent = 'Musik: Nyala';
        showToast('🎵 Musik latar sedang diputar (Lofi Chill)');
      }).catch((err) => {
        console.warn('Autoplay prevented or audio error:', err);
        showToast('⚠️ Klik tombol musik untuk memulai audio');
        isPlaying = false;
        musicIconPlaying.classList.add('hidden');
        musicIconMuted.classList.remove('hidden');
        if (musicEqualizer) musicEqualizer.classList.add('paused');
      });
    } else {
      bgAudio.pause();
      isPlaying = false;
      musicIconPlaying.classList.add('hidden');
      musicIconMuted.classList.remove('hidden');
      if (musicEqualizer) musicEqualizer.classList.add('paused');
      if (musicStatusText) musicStatusText.textContent = 'Musik: Mati';
      showToast('🔇 Musik dimatikan');
    }
  }

  if (musicToggleBtn && bgAudio) {
    musicToggleBtn.addEventListener('click', () => {
      setAudioState(!isPlaying);
    });

    // Handle audio error safely
    bgAudio.addEventListener('error', (e) => {
      console.warn('Audio element error, falling back gracefully:', e);
      if (musicStatusText) musicStatusText.textContent = 'Audio Standby';
    });
  }

  // 4. Portfolio Modal Details
  const projectData = {
    1: {
      title: 'EduHub - Academic Portal & Learning Management',
      category: 'UI/UX Case Study & Prototype',
      image: 'assets/images/proyek1.jpg',
      description: 'Platform manajemen akademik modern yang dirancang khusus untuk mempermudah mahasiswa dalam melacak progress perkuliahan, jadwal kelas, tugas, dan IPK dengan visual dashboard yang intuitif dan menyenangkan.',
      features: [
        'Dashboard metrik IPK & SKS interaktif',
        'Jadwal perkuliahan otomatis tersinkronisasi',
        'Notifikasi deadline tugas kuliah',
        'Desain human-centric dengan tema pastel mint yang nyaman di mata'
      ],
      tech: ['Figma', 'UI/UX Research', 'Tailwind CSS', 'Design System'],
      link: '#'
    },
    2: {
      title: 'OtakuTech - Creative Merchandise Store',
      category: 'Responsive Web Development',
      image: 'assets/images/proyek2.jpg',
      description: 'Website e-commerce responsif untuk produk merchandise kreatif, keyboard mekanik, apparel, dan pernak-pernik teknologi dengan integrasi sistem keranjang belanja dan layout adaptive di semua perangkat.',
      features: [
        'Desain Super Responsif (HP, Tablet, Desktop)',
        'Sistem filter produk & kategori instan',
        'Animasi kartu produk & hover interaktif',
        'Checkout flow yang ringkas dan ramah pengguna'
      ],
      tech: ['HTML5', 'Tailwind CSS', 'Vanilla JavaScript', 'Local Storage'],
      link: '#'
    },
    3: {
      title: 'FocusMint - Daily Habit & Productivity Tracker',
      category: 'Web App & Productivity Tool',
      image: 'assets/images/proyek3.jpg',
      description: 'Aplikasi web pelacak kebiasaan harian dan produktivitas dengan sistem streak dan visualisasi grafik aktivitas mingguan. Membantu pengguna mempertahankan rutinitas positif secara konsisten.',
      features: [
        'Streak counter harian dengan animasi pencapaian',
        'Visual chart mingguan yang rapi dan elegan',
        'Log aktivitas cepat (One-tap logging)',
        'Mode fokus minimalis dengan palet pastel menenangkan'
      ],
      tech: ['JavaScript ES6', 'Tailwind CSS', 'Chart.js', 'Progressive Web'],
      link: '#'
    }
  };

  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalImage = document.getElementById('modal-image');
  const modalDescription = document.getElementById('modal-description');
  const modalFeatures = document.getElementById('modal-features');
  const modalTech = document.getElementById('modal-tech');
  const closeModalBtn = document.getElementById('modal-close-btn');

  window.openProjectModal = function(id) {
    const data = projectData[id];
    if (!data || !modal) return;

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalImage.src = data.image;
    modalImage.alt = data.title;
    modalDescription.textContent = data.description;

    // Populate features
    modalFeatures.innerHTML = data.features.map(f => `
      <li class="flex items-start text-sm text-slate-600 gap-2">
        <span class="text-teal-500 font-bold mt-0.5"><i class="fa-solid fa-circle-check"></i></span>
        <span>${f}</span>
      </li>
    `).join('');

    // Populate tech
    modalTech.innerHTML = data.tech.map(t => `
      <span class="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full border border-teal-200/60">
        ${t}
      </span>
    `).join('');

    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // 5. Contact Form Submission Handling
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <i class="fa-solid fa-circle-notch fa-spin"></i>
        <span>Mengirim Pesan...</span>
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <i class="fa-solid fa-check"></i>
          <span>Terkirim!</span>
        `;
        showToast('✨ Pesan Anda berhasil dikirim! Terima kasih banyak.');
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
        }, 3000);
      }, 1000);
    });
  }

  // 6. Toast Notification Helper
  function showToast(message) {
    let toast = document.getElementById('global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'global-toast';
      toast.className = 'fixed top-20 right-4 sm:right-8 z-50 transform transition-all duration-300 translate-y-[-20px] opacity-0 pointer-events-none bg-white/95 text-slate-800 text-sm font-semibold px-5 py-3 rounded-2xl shadow-xl border border-teal-200/80 backdrop-blur-md flex items-center gap-3';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <div class="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></div>
      <span>${message}</span>
    `;

    toast.classList.remove('opacity-0', 'translate-y-[-20px]', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-[-20px]', 'pointer-events-none');
      toast.classList.remove('opacity-100', 'translate-y-0');
    }, 3500);
  }

  // 7. Navbar scroll shadow
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('shadow-md', 'shadow-teal-100/40');
    } else {
      navbar.classList.remove('shadow-md', 'shadow-teal-100/40');
    }
  });
});
