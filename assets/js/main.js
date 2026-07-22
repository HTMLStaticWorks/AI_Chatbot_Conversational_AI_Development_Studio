document.addEventListener('DOMContentLoaded', () => {
  // Theme Synchronization & Icon Updater
  const themeButtons = Array.from(document.querySelectorAll('.theme-toggle, .sidebar-circle-btn')).filter(btn => {
    const aria = btn.getAttribute('aria-label') || '';
    const title = btn.getAttribute('title') || '';
    const onclick = btn.getAttribute('onclick') || '';
    return aria.toLowerCase().includes('theme') || title.toLowerCase().includes('theme') || onclick.toLowerCase().includes('theme');
  });

  function updateThemeState(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
    
    // Update icons
    themeButtons.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'bi bi-sun';
        } else {
          icon.className = 'bi bi-moon';
        }
      }
    });
  }

  // Observe theme changes on the <html> element
  const themeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-theme') {
        const newTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        updateThemeState(newTheme);
      }
    });
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // Initial Sync on load
  const initialTheme = document.documentElement.getAttribute('data-theme') || localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', initialTheme);
  updateThemeState(initialTheme);

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

