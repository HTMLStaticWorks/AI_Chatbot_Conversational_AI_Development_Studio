document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggler
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme) {
    document.body.classList.add(currentTheme);
    updateThemeIcon(themeToggle, currentTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      let theme = 'light';
      if (document.body.classList.contains('dark-mode')) {
        theme = 'dark-mode';
      }
      localStorage.setItem('theme', theme);
      updateThemeIcon(themeToggle, theme);
    });
  }

  function updateThemeIcon(btn, theme) {
    if(!btn) return;
    if(theme === 'dark-mode') {
      btn.innerHTML = '<i class="bi bi-sun"></i>';
    } else {
      btn.innerHTML = '<i class="bi bi-moon"></i>';
    }
  }

  // RTL Toggler
  const rtlToggle = document.getElementById('rtl-toggle');
  const currentDir = localStorage.getItem('dir');

  if (currentDir) {
    document.body.classList.add(currentDir);
  }

  if (rtlToggle) {
    rtlToggle.addEventListener('click', () => {
      document.body.classList.toggle('rtl-mode');
      let dir = 'ltr';
      if (document.body.classList.contains('rtl-mode')) {
        dir = 'rtl-mode';
      }
      localStorage.setItem('dir', dir);
    });
  }

  // Back to Top Button
  const footer = document.querySelector('.mega-footer');
  if (footer) {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.className = 'btn btn-primary-gradient rounded-circle back-to-top-btn';
    backToTopBtn.title = 'Back to Top';
    backToTopBtn.setAttribute('aria-label', 'Back to Top');
    backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Dashboard Sidebar Handling
  const sidebar = document.getElementById('dashboard-sidebar');
  if (sidebar) {
    // 1. MutationObserver to lock/unlock scroll
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isShow = sidebar.classList.contains('show');
          const mainContent = document.querySelector('.main-content');
          if (isShow) {
            document.body.style.overflow = 'hidden';
            if (mainContent) mainContent.style.overflow = 'hidden';
          } else {
            document.body.style.overflow = '';
            if (mainContent) mainContent.style.overflow = '';
          }
        }
      });
    });
    observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });

    // 2. Auto-close sidebar on menu item selection
    sidebar.querySelectorAll('.sidebar-link').forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('show');
      });
    });

    // 3. Click outside to close
    document.addEventListener('click', (e) => {
      const toggler = document.querySelector('.navbar-toggler');
      if (sidebar.classList.contains('show')) {
        if (!sidebar.contains(e.target) && (!toggler || !toggler.contains(e.target))) {
          sidebar.classList.remove('show');
        }
      }
    });
  }
});

