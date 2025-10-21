
document.addEventListener('DOMContentLoaded', () => {

  const translations = {
      en: {
          // Common
          navLogo: "RuyaX Universe",
          navHome: "Home",
          navApps: "Apps",
          navAbout: "About Us",
          appsModalTitle: "Our Applications",
          ruyaxCardTitle: "RuyaX",
          futureAppTitle: "Future App",
          comingSoon: "Coming Soon",
          footerCopyright: "&copy; 2024 RuyaX. All rights reserved.",
          learnMore: "Learn More",
          viewPolicyBtn: "View Full Privacy Policy",
          privacyTitle: "Privacy Policy",
          privacyLink: "View Full Privacy Policy",

          // Home.html -> index.html
          pageTitleHome: "Home - RuyaX Universe",
          homeHeaderTitle: "Welcome to the <span>RuyaX Universe</span>",
          homeHeaderSubtitle: "Explore our suite of creative applications designed to bring your vision to life. Your world, your rules.",
          homeCard1Title: "RuyaX App",
          homeCard1Desc: "An immersive, full-screen world of short-form videos and stunning images. RuyaX is a next-generation social platform designed for visual storytelling and global connection.",
          
          // RuyaX.html
          pageTitleRuyaX: "RuyaX - Your Vision, Your World",
          headerTitle: "RuyaX",
          headerSubtitle: "Your Vision, Your World",
          section1Title: "Experience a Universe of Creativity",
          section1Desc: "Dive into an immersive, full-screen world of short-form videos and stunning images. RuyaX is a next-generation social platform designed for visual storytelling, connecting you with a global community of creators and dreamers.",
          section2Title: "Unleash Your Creativity with Powerful Tools",
          section2Desc: "RuyaX empowers you to share your moments and express your unique vision. With our advanced, yet easy-to-use creation tools, your next masterpiece is just a tap away.",
          feature1: "<strong>Advanced In-App Camera:</strong> Switch between photo and video mode, use front or back cameras, control flash, and even apply live filters to capture the perfect shot.",
          feature2: "<strong>Perfect Your Frame:</strong> Choose from multiple aspect ratios (9:16, 16:9, 1:1) to ensure your content looks exactly how you envisioned it.",
          feature3: "<strong>Engage & Connect:</strong> Follow your favorite creators, engage with posts through likes and comments, and have private, secure conversations with friends, complete with media and audio message sharing.",
          section3Title: "A Glimpse Inside RuyaX",
          section3Desc: "Here are some snapshots of the RuyaX experience. See how our community brings creativity to life!",
          section4Title: "How to Get Started",
          section4Desc: "Joining the RuyaX community is simple. Follow these easy steps to begin your journey:",
          step1: "<strong>Step 1: Sign Up Securely</strong><br>Create an account in seconds using your email or Google account. We prioritize your security from the very first step.",
          step2: "<strong>Step 2: Discover & Explore</strong><br>Swipe through a personalized, full-screen feed of content. The more you watch and interact, the better our recommendations become. Use the search feature to find new creators and trends.",
          step3: "<strong>Step 3: Create & Share</strong><br>Tap the upload button to share from your gallery, or use our in-app camera to capture a new moment. Add a title and description, and share it with the world!",
          section5Title: "Your Privacy, Your Control",
          section5Desc: "We believe in being upfront and clear about how we handle your data. Your trust is our top priority.",
          privacyPoint1: "<strong>You Are in Control:</strong> We only require your email for account creation. You decide what other information to share on your profile, with privacy settings to control the visibility of your age, gender, and country.",
          privacyPoint2: "<strong>A Safe Community:</strong> We provide tools to ensure your safety. Block users you don't want to interact with and report any content that violates our guidelines.",
          privacyPoint3: "<strong>Data Deletion:</strong> You have the right to request the complete deletion of your account and all associated data directly within the app.",
          privacySummary: "This is a summary. For complete details, we encourage you to read our full Privacy Policy.",
          footerTitle: "Ready to Join the Vision?",
          footerDesc: "Download RuyaX today and start your creative journey. We can't wait to see what you'll create!",
          getAppBtn: "Get RuyaX for Free",

          // about.html
          pageTitleAbout: "About Us - RuyaX Universe",
          aboutTitle: "About RuyaX",
          aboutSubtitle: "Our vision, our mission, and our commitment to you.",
          contactTitle: "Contact Information",
          contactAdmin: "<strong>Admin:</strong> The RuyaX Team",
          contactEmail: "<strong>Email:</strong> <a href='mailto:contact@ruyax.dev'>contact@ruyax.dev</a>",
          privacyDescAbout: "Your trust and privacy are paramount to us. We are committed to protecting your data and being transparent about how we use it. Our applications are designed with your privacy in mind, giving you full control over your information.",
          privacySummaryAbout: "This is a summary of our key principles. For full details, please review our complete privacy policy.",
      },
      ar: {
          // Common
          navLogo: "عالم RuyaX",
          navHome: "الرئيسية",
          navApps: "التطبيقات",
          navAbout: "من نحن",
          appsModalTitle: "تطبيقاتنا",
          ruyaxCardTitle: "RuyaX",
          futureAppTitle: "تطبيق مستقبلي",
          comingSoon: "قريباً",
          footerCopyright: "&copy; 2024 RuyaX. جميع الحقوق محفوظة.",
          learnMore: "اعرف المزيد",
          viewPolicyBtn: "عرض سياسة الخصوصية الكاملة",
          privacyTitle: "سياسة الخصوصية",
          privacyLink: "عرض سياسة الخصوصية الكاملة",

          // Home.html -> index.html
          pageTitleHome: "الرئيسية - عالم RuyaX",
          homeHeaderTitle: "مرحباً بكم في <span>عالم RuyaX</span>",
          homeHeaderSubtitle: "استكشف مجموعتنا من التطبيقات الإبداعية المصممة لإحياء رؤيتك. عالمك، قواعدك.",
          homeCard1Title: "تطبيق RuyaX",
          homeCard1Desc: "عالم غامر بملء الشاشة من مقاطع الفيديو القصيرة والصور المذهلة. RuyaX هي منصة اجتماعية من الجيل التالي مصممة لسرد القصص المرئية والتواصل العالمي.",

          // RuyaX.html
          pageTitleRuyaX: "RuyaX - رؤيتك، عالمك",
          headerTitle: "RuyaX",
          headerSubtitle: "رؤيتك، عالمك",
          section1Title: "اكتشف عالمًا من الإبداع",
          section1Desc: "انغمس في عالم غامر بملء الشاشة من مقاطع الفيديو القصيرة والصور المذهلة. RuyaX هي منصة اجتماعية من الجيل التالي مصممة لسرد القصص المرئية، وتربطك بمجتمع عالمي من المبدعين والحالمين.",
          section2Title: "أطلق العنان لإبداعك بأدوات قوية",
          section2Desc: "يمكّنك RuyaX من مشاركة لحظاتك والتعبير عن رؤيتك الفريدة. مع أدواتنا المتقدمة وسهلة الاستخدام، فإن تحفتك الفنية التالية على بعد نقرة واحدة.",
          feature1: "<strong>كاميرا متقدمة داخل التطبيق:</strong> بدّل بين وضع الصور والفيديو، استخدم الكاميرا الأمامية أو الخلفية، تحكم في الفلاش، وطبّق فلاتر حية لالتقاط اللقطة المثالية.",
          feature2: "<strong>إطار مثالي:</strong> اختر من بين نسب عرض إلى ارتفاع متعددة (9:16، 16:9، 1:1) لضمان ظهور المحتوى الخاص بك تمامًا كما تخيلته.",
          feature3: "<strong>تفاعل وتواصل:</strong> تابع المبدعين المفضلين لديك، تفاعل مع المنشورات عبر الإعجابات والتعليقات، وأجرِ محادثات خاصة وآمنة مع الأصدقاء، مع إمكانية مشاركة الوسائط والرسائل الصوتية.",
          section3Title: "لمحة داخل RuyaX",
          section3Desc: "إليك بعض اللقطات من تجربة RuyaX. شاهد كيف يبدع مجتمعنا!",
          section4Title: "كيف تبدأ",
          section4Desc: "الانضمام إلى مجتمع RuyaX بسيط. اتبع هذه الخطوات السهلة لبدء رحلتك:",
          step1: "<strong>الخطوة 1: تسجيل آمن</strong><br>أنشئ حسابًا في ثوانٍ باستخدام بريدك الإلكتروني أو حساب Google. نحن نعطي الأولوية لأمنك منذ الخطوة الأولى.",
          step2: "<strong>الخطوة 2: اكتشف واستكشف</strong><br>تصفح موجزًا مخصصًا بملء الشاشة. كلما شاهدت وتفاعلت أكثر، أصبحت توصياتنا أفضل. استخدم ميزة البحث للعثور على مبدعين واتجاهات جديدة.",
          step3: "<strong>الخطوة 3: أنشئ وشارك</strong><br>انقر على زر التحميل للمشاركة من معرض الصور الخاص بك، أو استخدم الكاميرا داخل التطبيق لالتقاط لحظة جديدة. أضف عنوانًا ووصفًا، وشاركه مع العالم!",
          section5Title: "خصوصيتك تحت سيطرتك",
          section5Desc: "نؤمن بالشفافية والوضوح في كيفية تعاملنا مع بياناتك. ثقتك هي أولويتنا القصوى.",
          privacyPoint1: "<strong>أنت المتحكم:</strong> نطلب فقط بريدك الإلكتروني لإنشاء الحساب. أنت تقرر المعلومات الأخرى التي تشاركها في ملفك الشخصي، مع إعدادات الخصوصية للتحكم في رؤية عمرك وجنسك وبلدك.",
          privacyPoint2: "<strong>مجتمع آمن:</strong> نوفر أدوات لضمان سلامتك. احظر المستخدمين الذين لا تريد التفاعل معهم وأبلغ عن أي محتوى ينتهك إرشاداتنا.",
          privacyPoint3: "<strong>حذف البيانات:</strong> لديك الحق في طلب الحذف الكامل لحسابك وجميع البيانات المرتبطة به مباشرة من داخل التطبيق.",
          privacySummary: "هذا ملخص. للحصول على التفاصيل الكاملة، نشجعك على قراءة سياسة الخصوصية الكاملة الخاصة بنا.",
          footerTitle: "هل أنت مستعد للانضمام إلى الرؤية؟",
          footerDesc: "نزّل RuyaX اليوم وابدأ رحلتك الإبداعية. لا يسعنا الانتظار لرؤية ما ستبدعه!",
          getAppBtn: "احصل على RuyaX مجانًا",

          // about.html
          pageTitleAbout: "من نحن - عالم RuyaX",
          aboutTitle: "عن RuyaX",
          aboutSubtitle: "رؤيتنا، مهمتنا، والتزامنا تجاهكم.",
          contactTitle: "معلومات الاتصال",
          contactAdmin: "<strong>المسؤول:</strong> فريق RuyaX",
          contactEmail: "<strong>البريد الإلكتروني:</strong> <a href='mailto:contact@ruyax.dev'>contact@ruyax.dev</a>",
          privacyDescAbout: "ثقتكم وخصوصيتكم هي أولويتنا القصوى. نحن ملتزمون بحماية بياناتكم والتحلي بالشفافية في كيفية استخدامها. تم تصميم تطبيقاتنا مع مراعاة خصوصيتكم، مما يمنحكم السيطرة الكاملة على معلوماتكم.",
          privacySummaryAbout: "هذا ملخص لمبادئنا الرئيسية. للحصول على التفاصيل الكاملة، يرجى مراجعة سياسة الخصوصية الكاملة لدينا.",
      }
  };

  function setLanguage(lang) {
    const currentTranslations = translations[lang] || translations.en;
    document.querySelectorAll('[data-translate-key]').forEach(el => {
      const key = el.dataset.translateKey;
      if (currentTranslations[key]) {
        el.innerHTML = currentTranslations[key];
      }
    });
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('userLanguage', lang);
  }

  function setActiveNav() {
      const currentPage = window.location.pathname.split("/").pop();
      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

      if (currentPage === 'index.html' || currentPage === '') {
          document.getElementById('nav-home')?.classList.add('active');
      } else if (currentPage === 'about.html') {
          document.getElementById('nav-about')?.classList.add('active');
      }
  }

  // --- Initialize ---
  const langToggle = document.getElementById('lang-toggle');
  const appsBtn = document.getElementById('apps-btn');
  const appsModal = document.getElementById('apps-modal');
  const closeModalBtn = document.querySelector('.close-modal');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const closeLightboxBtn = document.querySelector('.close-lightbox');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  // Language setup
  let currentLang = localStorage.getItem('userLanguage') || (navigator.language.startsWith('ar') ? 'ar' : 'en');
  setLanguage(currentLang);

  if (langToggle) {
    langToggle.addEventListener('click', (e) => {
      e.preventDefault();
      currentLang = currentLang === 'en' ? 'ar' : 'en';
      setLanguage(currentLang);
    });
  }

  // Hamburger Menu
  if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
          navMenu.classList.toggle('active');
          navToggle.classList.toggle('active');
      });
  }

  // Apps Modal functionality
  if(appsBtn && appsModal) {
    appsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        appsModal.style.display = 'flex';
    });

    const closeModal = () => {
      appsModal.style.display = 'none';
    }
    if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    appsModal.addEventListener('click', (event) => {
      if (event.target === appsModal) {
        closeModal();
      }
    });
  }

  // Lightbox functionality (for RuyaX page)
  if(lightbox && lightboxImg && closeLightboxBtn) {
    document.querySelectorAll('.screenshot-gallery img').forEach(img => {
        img.addEventListener('click', function() {
            lightbox.style.display = 'flex';
            lightboxImg.src = this.src;
        });
    });
    function closeLightbox() {
        lightbox.style.display = 'none';
    }
    closeLightboxBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
  }

  // Set active nav link
  setActiveNav();
});
