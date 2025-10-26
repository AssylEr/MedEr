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
          pageTitleApps: "Apps - RuyaX Universe",
          appsPageTitle: "Our Applications",
          appsPageSubtitle: "Discover the tools we've built to empower your creativity.",
          futureAppTitle: "Future App",
          comingSoon: "Coming Soon",
          footerCopyright: "&copy; 2025 RuyaX. All rights reserved.",
          learnMore: "Learn More",
          errorTitle: "Content Error:",
          errorMessage: "We couldn't load the necessary content for the site.",
          errorSuggestion: "Please check your network connection."
      },
      ar: {
          navLogo: "عالم RuyaX",
          navHome: "الرئيسية",
          navApps: "التطبيقات",
          navPrivacy: "سياسة الخصوصية",
          navAbout: "من نحن",
          pageTitleApps: "التطبيقات - عالم RuyaX",
          appsPageTitle: "تطبيقاتنا",
          appsPageSubtitle: "اكتشف الأدوات التي أنشأناها لتمكين إبداعك.",
          futureAppTitle: "تطبيق مستقبلي",
          comingSoon: "قريباً",
          footerCopyright: "&copy; 2025 RuyaX. جميع الحقوق محفوظة.",
          learnMore: "اعرف المزيد",
          errorTitle: "خطأ في المحتوى:",
          errorMessage: "لم نتمكن من تحميل المحتوى اللازم للموقع.",
          errorSuggestion: "يرجى التحقق من اتصالك بالشبكة."
      }
  };

  async function fetchJsonData(path) {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Network response was not ok for ${path}. Status: ${response.status}`);
    }
    return await response.json();
  }

  function displayGlobalError(lang, error) {
      console.error("Failed to initialize app:", error);
      const t = translations[lang] || translations.en;
      const errorDiv = document.createElement('div');
      errorDiv.className = 'global-error';
      errorDiv.innerHTML = `
        <p><strong>${t.errorTitle}</strong> ${t.errorMessage}</p>
        <p>${t.errorSuggestion}</p>
      `;
      document.body.prepend(errorDiv);
  }

  function populateStaticTranslations(lang) {
    const currentTranslations = translations[lang] || translations.en;
    document.querySelectorAll('[data-translate-key]').forEach(el => {
      const key = el.dataset.translateKey;
      if (currentTranslations[key]) {
        el.innerHTML = currentTranslations[key];
      }
    });
    const pageTitle = document.querySelector('title[data-translate-key]');
    if(pageTitle) {
      document.title = currentTranslations[pageTitle.dataset.translateKey] || 'RuyaX Universe';
    }
  }
  
  function populatePageContent(lang) {
    if (!PAGE_DATA) return;
    const content = PAGE_DATA[lang] || PAGE_DATA.en;
    if (!content) return;
    
    document.querySelectorAll('[data-page-prop]').forEach(el => {
        const key = el.dataset.pageProp;
        if (content[key] !== undefined) {
          const value = content[key];
          if (el.dataset.pageProp.endsWith('_list') || el.dataset.pageProp.endsWith('_desc')) {
              const converter = new showdown.Converter();
              el.innerHTML = converter.makeHtml(value);
          } else {
              el.innerHTML = value;
          }
          if (el.classList.contains('contact-email-link')) {
            el.href = 'mailto:' + value;
          }
        }
    });

    if (content.page_title) {
        document.title = content.page_title;
    }
  }

  function populateAppsGrid(lang) {
    const grid = document.getElementById('apps-page-grid-container');
    if (!grid) return;
    
    const langContent = translations[lang] || translations.en;
    
    let gridHTML = '';
    [...APPS_DATA].reverse().forEach(app => {
      const appContent = app[lang] || app.en;
      const cardClass = app.is_placeholder ? 'app-page-card app-page-card--placeholder' : 'app-page-card';
      const comingSoonOverlay = app.is_placeholder ? `<div class="app-placeholder-overlay"><span>${langContent.comingSoon}</span></div>` : '';
      const appName = app.is_placeholder ? langContent.futureAppTitle : appContent.name;
      const href = app.is_placeholder ? '#' : app.href;

      gridHTML += `
        <a href="${href}" class="${cardClass}">
          <img src="${app.imgSrc}" alt="${app.alt}">
          ${comingSoonOverlay}
          <div class="app-page-card__content">
            <h3>${appName}</h3>
          </div>
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
    
    [...APPS_DATA].reverse().filter(app => !app.is_placeholder).forEach(app => {
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
        appPageBody.innerHTML = `<div class="container"><h1 style="text-align:center; margin-top: 50px;">App not found.</h1><p style="text-align:center;">Please check the URL or return to the <a href="index.html">home page</a>.</p></div>`;
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
    setAttribute('download_btn', 'href', appData.download_link);

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

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('userLanguage', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.textContent = lang === 'en' ? 'العربية' : 'English';
    }

    populateStaticTranslations(lang);
    populatePageContent(lang);
    populateAppsGrid(lang);
    populateHomeGrid(lang);
    populateAppPage(lang);
    populateAppPrivacyPage(lang);
  }

  function setActiveNav() {
      const currentPage = window.location.pathname.split("/").pop();
      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

      if (currentPage === 'index.html' || currentPage === '') {
          document.getElementById('nav-home')?.classList.add('active');
      } else if (currentPage === 'apps.html' || currentPage === 'app.html' || currentPage === 'privacy-app.html') {
          document.getElementById('nav-apps')?.classList.add('active');
      } else if (currentPage === 'about.html') {
          document.getElementById('nav-about')?.classList.add('active');
      } else if (currentPage === 'privacy.html') {
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
  }
  
  async function loadSharedComponents() {
      try {
          const response = await fetch('nav.html');
          if (!response.ok) throw new Error('Shared components (nav.html) not found');
          const componentsHtml = await response.text();
          document.body.insertAdjacentHTML('afterbegin', componentsHtml);
      } catch (error) {
          console.error('Failed to load shared components:', error);
          document.body.insertAdjacentHTML('afterbegin', '<p style="color:red; text-align:center; padding: 10px; background: #333;">Error: Could not load navigation bar.</p>');
      }
  }

  function injectSocialLinks() {
    // --- قم بتغيير روابط التواصل الاجتماعي الخاصة بك هنا ---
    const socialUrls = {
      youtube: 'https://youtube.com/your-channel',
      facebook: 'https://facebook.com/your-page'
    };
    // -----------------------------------------

    const footer = document.querySelector('footer');
    if (!footer) return;

    const socialContainer = document.createElement('div');
    socialContainer.className = 'social-links';

    const youtubeLink = document.createElement('a');
    youtubeLink.href = socialUrls.youtube;
    youtubeLink.className = 'social-icon';
    youtubeLink.target = '_blank';
    youtubeLink.rel = 'noopener noreferrer';
    youtubeLink.setAttribute('aria-label', 'Visit our YouTube channel');
    youtubeLink.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.25,4,12,4,12,4S5.75,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.75,2,12,2,12s0,4.25,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.75,20,12,20,12,20s6.25,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.25,22,12,22,12S22,7.75,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"></path></svg>`;

    const facebookLink = document.createElement('a');
    facebookLink.href = socialUrls.facebook;
    facebookLink.className = 'social-icon';
    facebookLink.target = '_blank';
    facebookLink.rel = 'noopener noreferrer';
    facebookLink.setAttribute('aria-label', 'Visit our Facebook page');
    facebookLink.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M22,12c0-5.52-4.48-10-10-10S2,6.48,2,12c0,4.84,3.44,8.87,8,9.8V15H8v-3h2V9.5C10,7.57,11.57,6,13.5,6H16v3h-2 c-0.55,0-1,0.45-1,1v2h3v3h-3v6.95C18.05,21.45,22,17.19,22,12z"></path></svg>`;

    socialContainer.appendChild(youtubeLink);
    socialContainer.appendChild(facebookLink);

    if (navigator.share) {
      const shareButton = document.createElement('button');
      shareButton.className = 'social-icon';
      shareButton.setAttribute('aria-label', 'Share this page');
      shareButton.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M18,16.08c-0.76,0-1.44,0.3-1.96,0.77L8.91,12.7c0.05-0.23,0.09-0.46,0.09-0.7s-0.04-0.47-0.09-0.7l7.05-4.11 C16.5,7.79,17.21,8.08,18,8.08c1.66,0,3-1.34,3-3s-1.34-3-3-3s-3,1.34-3,3c0,0.24,0.04,0.47,0.09,0.7L8.04,9.81 C7.5,9.31,6.79,9,6,9c-1.66,0-3,1.34-3,3s1.34,3,3,3c0.79,0,1.5-0.31,2.04-0.81l7.12,4.16c-0.05,0.21-0.08,0.43-0.08,0.65 c0,1.66,1.34,3,3,3s3-1.34,3-3S19.66,16.08,18,16.08z"></path></svg>`;
      
      shareButton.addEventListener('click', async () => {
        try {
          await navigator.share({
            title: document.title,
            text: `Check out this page: ${document.title}`,
            url: window.location.href,
          });
        } catch (err) {
          console.error('Error sharing:', err);
        }
      });
      socialContainer.appendChild(shareButton);
    }
    
    const copyrightEl = footer.querySelector('[data-translate-key="footerCopyright"]');
    if (copyrightEl) {
      footer.insertBefore(socialContainer, copyrightEl);
    } else {
      footer.appendChild(socialContainer);
    }
  }

  async function initializeApp() {
    await loadSharedComponents();
    
    try {
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
        injectSocialLinks();
    } catch (error) {
        displayGlobalError(currentLang, error);
        initializeEventListeners();
    }
  }

  initializeApp();
});