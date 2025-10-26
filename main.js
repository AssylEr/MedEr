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
          footerCopyright: "&copy; 2025 RuyaX Universe. All rights reserved.",
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
          footerCopyright: "&copy; 2025 RuyaX Universe. جميع الحقوق محفوظة.",
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
          if (el.dataset.pageProp.endsWith('_list') || el.dataset.pageProp.endsWith('_desc')) {
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

  function addSocialLinksToFooter() {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const copyrightEl = footer.querySelector('p[data-translate-key="footerCopyright"]');
    if (!copyrightEl) return;

    const socialContainer = document.createElement('div');
    socialContainer.className = 'social-links';

    const svgIcons = {
      facebook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-1.5c-1 0-1.5.5-1.5 1.5V12h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>`,
      youtube: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>`,
      twitter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10zm-6.46 2.45c.42.42.42 1.1 0 1.52-.42.42-1.1.42-1.52 0L12 13.52l-2.02 2.45c-.42.42-1.1.42-1.52 0-.42-.42-.42-1.1 0-1.52L10.48 12 8.45 9.55c-.42-.42-.42-1.1 0-1.52.42-.42 1.1-.42 1.52 0L12 10.48l2.02-2.45c.42-.42 1.1-.42 1.52 0 .42.42.42 1.1 0 1.52L13.52 12l2.02 2.45z"/></svg>`,
      share: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>`
    };

    const socials = [
        { name: 'Facebook', href: 'https://Facebook.com/', icon: svgIcons.facebook },
        { name: 'YouTube', href: 'https://youtube.com/@wild-flash?si=9dmKfl-wtMubh1_p', icon: svgIcons.youtube },
        { name: 'Twitter', href: 'https://twitter.com/', icon: svgIcons.twitter }
    ];

    socials.forEach(social => {
        const link = document.createElement('a');
        link.href = social.href;
        link.className = 'social-link';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', social.name);
        link.innerHTML = social.icon;
        socialContainer.appendChild(link);
    });

    if (navigator.share) {
        const shareButton = document.createElement('button');
        shareButton.className = 'social-link';
        shareButton.setAttribute('aria-label', 'Share');
        shareButton.innerHTML = svgIcons.share;
        shareButton.addEventListener('click', async () => {
            try {
                await navigator.share({
                    title: document.title,
                    text: `Check out this page from RuyaX Universe!`,
                    url: window.location.href,
                });
            } catch (err) {
                console.error('Share failed:', err);
            }
        });
        socialContainer.appendChild(shareButton);
    }
    
    footer.insertBefore(socialContainer, copyrightEl);
  }

  function initializeWhatsAppButton() {
    const whatsAppBubble = document.createElement('a');
    whatsAppBubble.id = 'whatsapp-bubble';
    // You need to replace "YOUR_PHONE_NUMBER_HERE" with your actual WhatsApp number including the country code without '+' or '00'.
    whatsAppBubble.href = 'https://wa.me/YOUR_PHONE_NUMBER_HERE'; 
    whatsAppBubble.target = '_blank';
    whatsAppBubble.rel = 'noopener noreferrer';
    whatsAppBubble.setAttribute('aria-label', 'Contact us on WhatsApp');
    whatsAppBubble.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.6-9.5-97.8-26.7l-7-4.1-72.5 19.1 19.4-70.5-4.5-7.3C71.3 318.4 64 282.7 64 246.1c0-101.5 82.8-184.2 184.6-184.2 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.6-82.8 184.3-184.6 184.3zm88.6-114.8c-3.8-1.9-22.5-11.1-26-12.4-3.5-1.4-6-1.9-8.6 1.9s-9.9 12.4-12.1 14.8c-2.2 2.4-4.5 2.7-8.2 0.9-3.8-1.8-15.9-5.9-30.4-18.9-11.3-10-19-22.4-21.2-26.2-2.2-3.8-0.2-5.9 1.7-7.7 1.6-1.6 3.5-4.1 5.3-6.2 1.7-2.1 2.3-3.8 3.5-6.2 1.2-2.5 0.6-4.6-0.3-6.2-0.9-1.6-8.6-20.7-11.7-28.5-3.1-7.8-6.3-6.7-8.6-6.8-2.1-0.1-4.5-0.1-6.8-0.1-2.3 0-6.1 0.9-9.2 4.5-3.1 3.6-12 11.7-12 28.5 0 16.8 12.3 33.1 14 35.5 1.7 2.4 24.1 36.8 58.3 51.3 34.2 14.5 34.2 9.7 40.4 9.1 6.2-0.6 19.5-8 22.3-15.7 2.8-7.7 2.8-14.4 1.9-15.7-0.9-1.3-3.4-1.9-7.2-3.8z"/>
      </svg>
    `;
    document.body.appendChild(whatsAppBubble);
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
        addSocialLinksToFooter();
        initializeWhatsAppButton();

    } catch (error) {
        displayGlobalError(currentLang, error);
        initializeEventListeners();
    }
  }

  initializeApp();
});