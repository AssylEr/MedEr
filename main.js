document.addEventListener('DOMContentLoaded', async () => {

  let APPS_DATA = [];
  let PAGE_DATA = {};
  let currentLang = localStorage.getItem('userLanguage') || (navigator.language.startsWith('ar') ? 'ar' : 'en');

  const translations = {
      en: {
          navLogo: "RuyaX Universe",
          navHome: "Home",
          navApps: "Apps",
          navPrivacy: "Privacy Policy",
          navAbout: "About Us",
          appsModalTitle: "Our Applications",
          futureAppTitle: "Future App",
          comingSoon: "Coming Soon",
          footerCopyright: "&copy; 2025 RuyaX. All rights reserved.",
          learnMore: "Learn More",
          adminPanel: "Admin Panel",
      },
      ar: {
          navLogo: "عالم RuyaX",
          navHome: "الرئيسية",
          navApps: "التطبيقات",
          navPrivacy: "سياسة الخصوصية",
          navAbout: "من نحن",
          appsModalTitle: "تطبيقاتنا",
          futureAppTitle: "تطبيق مستقبلي",
          comingSoon: "قريباً",
          footerCopyright: "&copy; 2025 RuyaX. جميع الحقوق محفوظة.",
          learnMore: "اعرف المزيد",
          adminPanel: "لوحة الإدارة",
      }
  };

  async function fetchJsonData(path) {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Network response was not ok for ${path}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch data from ${path}:`, error);
      return null;
    }
  }

  function populateStaticTranslations(lang) {
    const currentTranslations = translations[lang] || translations.en;
    document.querySelectorAll('[data-translate-key]').forEach(el => {
      const key = el.dataset.translateKey;
      if (currentTranslations[key]) {
        el.innerHTML = currentTranslations[key];
      }
    });
  }
  
  function populatePageContent(lang) {
    if (!PAGE_DATA) return;
    const content = PAGE_DATA[lang] || PAGE_DATA.en;
    if (!content) return;
    
    document.querySelectorAll('[data-page-prop]').forEach(el => {
        const key = el.dataset.pageProp;
        if (content[key] !== undefined) {
          if (el.dataset.pageProp.endsWith('_list')) {
              const converter = new showdown.Converter();
              el.innerHTML = converter.makeHtml(content[key]);
          } else {
              el.innerHTML = content[key];
          }
        }
    });

    if (content.page_title) {
        document.title = content.page_title;
    }
  }

  function populateAppsModal(lang) {
    const grid = document.querySelector('.apps-modal-grid');
    if (!grid) return;
    
    const langContent = translations[lang] || translations.en;
    
    let gridHTML = '';
    APPS_DATA.forEach(app => {
      const appContent = app[lang] || app.en;
      const cardClass = app.is_placeholder ? 'app-modal-card app-modal-card--placeholder' : 'app-modal-card';
      const comingSoonOverlay = app.is_placeholder ? `<div class="app-placeholder-overlay"><span>${langContent.comingSoon}</span></div>` : '';
      const appName = app.is_placeholder ? langContent.futureAppTitle : appContent.name;
      const href = app.is_placeholder ? '#' : app.href;

      gridHTML += `
        <a href="${href}" class="${cardClass}">
          <img src="${app.imgSrc}" alt="${app.alt}">
          ${comingSoonOverlay}
          <h3>${appName}</h3>
        </a>
      `;
    });
    grid.innerHTML = gridHTML;
  }

  function populateHomeGrid(lang) {
    const grid = document.getElementById('home-grid-container');
    if (!grid) return;

    const langContent = translations[lang] || translations.en;
    let gridHTML = '';
    
    APPS_DATA.filter(app => !app.is_placeholder).forEach(app => {
      const appContent = app[lang] || app.en;
      gridHTML += `
        <div class="home-card">
          <img src="${app.imgSrc}" alt="${app.alt}" class="home-card__image">
          <div class="home-card__content">
              <h2>${appContent.name}</h2>
              <p>${appContent.short_desc}</p>
              <a href="${app.href}" class="cta-button">${langContent.learnMore}</a>
          </div>
        </div>
      `;
    });
    grid.innerHTML = gridHTML;
  }

  function populateAppPage(lang) {
    const appPageBody = document.getElementById('app-page');
    if (!appPageBody) return;

    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    const appData = APPS_DATA.find(app => app.slug === slug);

    if (!appData) {
        appPageBody.innerHTML = `<div class="container"><h1 style="text-align:center; margin-top: 50px;">App not found.</h1></div>`;
        return;
    }

    const content = appData[lang] || appData.en;
    document.title = content.page_title;

    const setContent = (prop, html) => {
        const el = document.querySelector(`[data-app-prop="${prop}"]`);
        if (el && html !== undefined) el.innerHTML = html;
    };

    const setAttribute = (prop, attr, value) => {
        const el = document.querySelector(`[data-app-prop="${prop}"]`);
        if (el && value !== undefined) el.setAttribute(attr, value);
    };
    
    const converter = new showdown.Converter();

    setContent('header_title', content.header_title);
    setContent('header_subtitle', content.header_subtitle);
    setContent('intro_title', content.intro_title);
    setContent('intro_desc', converter.makeHtml(content.intro_desc || ''));
    setContent('features_title', content.features_title);
    setContent('features_desc', converter.makeHtml(content.features_desc || ''));
    setContent('features_list', (content.features_list || []).map(obj => `<li>${obj.item}</li>`).join(''));
    setContent('gallery_title', content.gallery_title);
    setContent('gallery_desc', converter.makeHtml(content.gallery_desc || ''));
    setContent('howto_title', content.howto_title);
    setContent('howto_desc', converter.makeHtml(content.howto_desc || ''));
    setContent('howto_steps', (content.howto_steps || []).map(obj => `<li>${obj.item}</li>`).join(''));
    setContent('privacy_title', content.privacy_title);
    setContent('privacy_desc', converter.makeHtml(content.privacy_desc || ''));
    setContent('privacy_points', (content.privacy_points || []).map(obj => `<li>${obj.item}</li>`).join(''));
    setContent('privacy_summary', content.privacy_summary);
    setContent('privacy_btn_text', content.privacy_btn_text);
    setAttribute('privacy_btn', 'href', `privacy-app.html?slug=${appData.slug}`);
    setContent('footer_title', content.footer_title);
    setContent('footer_desc', content.footer_desc);
    setContent('download_btn_text', content.download_btn_text);
    setAttribute('download_btn', 'href', appData.play_store_link);

    const gallery = document.querySelector('[data-app-prop="gallery_container"]');
    if (gallery) {
        gallery.innerHTML = (appData.screenshots || []).map(img => `
            <div class="screenshot-placeholder"><img src="${img.src}" alt="Screenshot"></div>
        `).join('');
        initializeLightboxForGallery();
    }
  }

  function populateAppPrivacyPage(lang) {
    const privacyPageBody = document.getElementById('app-privacy-page');
    if (!privacyPageBody) return;

    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    const appData = APPS_DATA.find(app => app.slug === slug);

    if (!appData) {
      privacyPageBody.innerHTML = `<div class="container"><h1 style="text-align:center; margin-top: 50px;">App not found.</h1></div>`;
      return;
    }

    const content = appData[lang] || appData.en;
    document.title = content.privacy_page_title || 'Privacy Policy';
    
    const setContent = (prop, html) => {
        const el = document.querySelector(`[data-app-prop="${prop}"]`);
        if (el && html !== undefined) el.innerHTML = html;
    };
    
    const converter = new showdown.Converter();

    setContent('privacy_header_title', content.privacy_header_title);
    setContent('privacy_header_subtitle', content.privacy_header_subtitle);
    const policyHtml = converter.makeHtml(content.privacy_content || '');
    setContent('privacy_content', policyHtml);
  }

  function addAdminLinkToNavbar() {
    const navMenus = document.querySelectorAll('.nav-menu');
    navMenus.forEach(navMenu => {
        if (!navMenu.querySelector('#nav-admin')) {
            const langSwitcher = navMenu.querySelector('.lang-switcher');
            const adminNavItem = document.createElement('li');
            adminNavItem.className = 'nav-item';
            adminNavItem.innerHTML = `<a href="admin.html" class="nav-link" id="nav-admin" data-translate-key="adminPanel">Admin Panel</a>`;
            
            if (langSwitcher) {
                langSwitcher.before(adminNavItem);
            } else {
                navMenu.appendChild(adminNavItem);
            }
        }
    });
  }


  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('userLanguage', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    populateStaticTranslations(lang);
    populatePageContent(lang);
    populateAppsModal(lang);
    populateHomeGrid(lang);
    populateAppPage(lang);
    populateAppPrivacyPage(lang);
  }

  function setActiveNav() {
      const currentPage = window.location.pathname.split("/").pop();
      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

      if (currentPage === 'index.html' || currentPage === '') {
          document.getElementById('nav-home')?.classList.add('active');
      } else if (currentPage === 'about.html') {
          document.getElementById('nav-about')?.classList.add('active');
      } else if (currentPage === 'privacy.html' || currentPage === 'privacy-app.html') {
          document.getElementById('nav-privacy')?.classList.add('active');
      }
  }
  
  function initializeLightboxForGallery() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const closeLightboxBtn = document.querySelector('.close-lightbox');

    if (lightbox && lightboxImg && closeLightboxBtn) {
        document.querySelectorAll('.screenshot-gallery img').forEach(img => {
            img.addEventListener('click', function() {
                lightbox.style.display = 'flex';
                lightboxImg.src = this.src;
            });
        });
        const closeLightbox = () => {
            lightbox.style.display = 'none';
        }
        closeLightboxBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }
  }

  function initializeEventListeners() {
      const langToggle = document.getElementById('lang-toggle');
      const appsModal = document.getElementById('apps-modal');
      const closeModalBtn = document.querySelector('.close-modal');
      const navToggle = document.querySelector('.nav-toggle');
      const navMenu = document.querySelector('.nav-menu');

      if (langToggle) {
        langToggle.addEventListener('click', (e) => {
          e.preventDefault();
          const newLang = currentLang === 'en' ? 'ar' : 'en';
          setLanguage(newLang);
        });
      }

      if (navToggle && navMenu) {
          navToggle.addEventListener('click', () => {
              navMenu.classList.toggle('active');
              navToggle.classList.toggle('active');
          });
      }

      if (appsModal) {
        document.querySelectorAll('#apps-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
              e.preventDefault();
              appsModal.style.display = 'flex';
          });
        });

        const closeModal = () => {
          appsModal.style.display = 'none';
        }
        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        appsModal.addEventListener('click', (event) => {
          if (event.target === appsModal) {
            closeModal();
          }
        });
      }
  }

  async function initializeApp() {
    addAdminLinkToNavbar();

    const bodyId = document.body.id;
    let pageDataPath;
    if (bodyId === 'home-page') pageDataPath = 'home.json';
    else if (bodyId === 'about-page') pageDataPath = 'about.json';
    else if (bodyId === 'privacy-page') pageDataPath = 'privacy.json';

    const [appsData, pageData] = await Promise.all([
      fetchJsonData('apps.json'),
      pageDataPath ? fetchJsonData(pageDataPath) : Promise.resolve({})
    ]);

    APPS_DATA = (appsData && appsData.applications) || [];
    PAGE_DATA = pageData || {};

    setLanguage(currentLang);
    setActiveNav();
    initializeEventListeners();
  }

  initializeApp();
});