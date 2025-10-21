
document.addEventListener('DOMContentLoaded', () => {

  const translations = {
      en: {
          // Common
          navLogo: "RuyaX Universe",
          navHome: "Home",
          navApps: "Apps",
          navPrivacy: "Privacy Policy",
          navAbout: "About Us",
          appsModalTitle: "Our Applications",
          ruyaxCardTitle: "RuyaX",
          futureAppTitle: "Future App",
          comingSoon: "Coming Soon",
          footerCopyright: "&copy; 2025 RuyaX. All rights reserved.",
          learnMore: "Learn More",
          viewPolicyBtn: "View Full Privacy Policy",
          
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
          adminTitle: "About the Admin",
          adminDesc: "The RuyaX Universe is developed and maintained by a passionate and dedicated independent developer with expertise in creating seamless user experiences across web and mobile platforms. With a focus on clean design, robust functionality, and user privacy, the goal is to build applications that are not only powerful but also intuitive and enjoyable to use.",
          contactTitle: "Contact Information",
          contactAdmin: "<strong>Admin:</strong> The RuyaX Team",
          contactEmail: "<strong>Email:</strong> <a href='mailto:contact@ruyax.dev'>contact@ruyax.dev</a>",
          
          // privacy.html
          pageTitlePrivacy: "Privacy Policy - RuyaX Universe",
          privacyHeaderTitle: "Privacy Policy",
          privacyHeaderSubtitle: "Last Updated: October 16, 2025",
          privacyIntroTitle: "Introduction",
          privacyIntroP1: "Welcome to RuyaX Universe. We are committed to protecting your privacy and handling your data in an open and transparent manner. This privacy policy sets out how we collect, use, and safeguard your information when you visit our website and use our applications (like RuyaX).",
          privacyDataCollectionTitle: "Information We Collect",
          privacyDataCollectionP1: "We may collect information about you in a variety of ways. The information we may collect includes:",
          privacyDataPersonalTitle: "Personal Data",
          privacyDataPersonalList: "<li><strong>Account Information:</strong> When you register for an account on our RuyaX app, we collect your email address. You may voluntarily provide other information such as a username, profile picture, age, gender, and country.</li><li><strong>User Content:</strong> We collect the photos, videos, comments, and other content you create and share on our platforms.</li><li><strong>Communications:</strong> If you contact us directly, we may receive additional information about you such as your name, email address, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</li>",
          privacyDataUsageTitle: "Usage Data",
          privacyDataUsageP1: "We automatically collect information when you access our services, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the site.",
          privacyDataUseTitle: "How We Use Your Information",
          privacyDataUseP1: "Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:",
          privacyDataUseList: "<li>Create and manage your account.</li><li>Personalize and improve your experience.</li><li>Monitor and analyze usage and trends to improve our services.</li><li>Respond to your comments, questions, and provide customer service.</li><li>Protect our platform from abuse, fraud, and illegal activity.</li><li>Send you technical notices, updates, security alerts, and support messages.</li>",
          privacyDataSharingTitle: "Disclosure of Your Information",
          privacyDataSharingP1: "We do not share your personal information with third parties except in the circumstances described below:",
          privacyDataSharingList: "<li><strong>With Your Consent:</strong> We may share your information with your consent or at your direction.</li><li><strong>For Legal Reasons:</strong> We may share information if we believe it's required by law, regulation, or legal process, or to protect the rights, property, and safety of our company, our users, or others.</li><li><strong>Service Providers:</strong> We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</li>",
          privacyYourRightsTitle: "Your Data Protection Rights",
          privacyYourRightsP1: "You have certain rights regarding your personal data. These include the right to:",
          privacyYourRightsList: "<li><strong>Access:</strong> You can request a copy of the personal information we hold about you.</li><li><strong>Correction:</strong> You can request that we correct any inaccurate or incomplete information.</li><li><strong>Deletion:</strong> You can request that we delete your personal data, subject to certain legal obligations. You can initiate this process directly within the RuyaX application.</li>",
          privacySecurityTitle: "Security of Your Information",
          privacySecurityP1: "We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.",
          privacyContactTitle: "Contact Us",
          privacyContactP1: "If you have questions or comments about this Privacy Policy, please contact us at: <a href='mailto:contact@ruyax.dev'>contact@ruyax.dev</a>",
      },
      ar: {
          // Common
          navLogo: "عالم RuyaX",
          navHome: "الرئيسية",
          navApps: "التطبيقات",
          navPrivacy: "سياسة الخصوصية",
          navAbout: "من نحن",
          appsModalTitle: "تطبيقاتنا",
          ruyaxCardTitle: "RuyaX",
          futureAppTitle: "تطبيق مستقبلي",
          comingSoon: "قريباً",
          footerCopyright: "&copy; 2025 RuyaX. جميع الحقوق محفوظة.",
          learnMore: "اعرف المزيد",
          viewPolicyBtn: "عرض سياسة الخصوصية الكاملة",

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
          adminTitle: "عن المسؤول",
          adminDesc: "تم تطوير وصيانة عالم RuyaX بواسطة مطور مستقل شغوف ومتفانٍ يتمتع بخبرة في إنشاء تجارب مستخدم سلسة عبر منصات الويب والجوال. مع التركيز على التصميم النظيف والوظائف القوية وخصوصية المستخدم، الهدف هو بناء تطبيقات ليست قوية فحسب، بل سهلة الاستخدام وممتعة أيضًا.",
          contactTitle: "معلومات الاتصال",
          contactAdmin: "<strong>المسؤول:</strong> فريق RuyaX",
          contactEmail: "<strong>البريد الإلكتروني:</strong> <a href='mailto:contact@ruyax.dev'>contact@ruyax.dev</a>",

          // privacy.html
          pageTitlePrivacy: "سياسة الخصوصية - عالم RuyaX",
          privacyHeaderTitle: "سياسة الخصوصية",
          privacyHeaderSubtitle: "آخر تحديث: 16 أكتوبر 2025",
          privacyIntroTitle: "مقدمة",
          privacyIntroP1: "مرحبًا بكم في عالم RuyaX. نحن ملتزمون بحماية خصوصيتكم والتعامل مع بياناتكم بطريقة مفتوحة وشفافة. توضح سياسة الخصوصية هذه كيف نجمع معلوماتكم ونستخدمها ونحميها عند زيارتكم لموقعنا الإلكتروني واستخدام تطبيقاتنا (مثل RuyaX).",
          privacyDataCollectionTitle: "المعلومات التي نجمعها",
          privacyDataCollectionP1: "قد نجمع معلومات عنكم بعدة طرق. تشمل المعلومات التي قد نجمعها:",
          privacyDataPersonalTitle: "البيانات الشخصية",
          privacyDataPersonalList: "<li><strong>معلومات الحساب:</strong> عند تسجيل حساب في تطبيق RuyaX، نجمع عنوان بريدكم الإلكتروني. يمكنكم تقديم معلومات أخرى طواعية مثل اسم المستخدم وصورة الملف الشخصي والعمر والجنس والبلد.</li><li><strong>محتوى المستخدم:</strong> نجمع الصور ومقاطع الفيديو والتعليقات والمحتويات الأخرى التي تنشئونها وتشاركونها على منصاتنا.</li><li><strong>الاتصالات:</strong> إذا اتصلتم بنا مباشرة، فقد نتلقى معلومات إضافية عنكم مثل اسمكم وعنوان بريدكم الإلكتروني ومحتويات الرسالة و/أو المرفقات التي قد ترسلونها، وأي معلومات أخرى تختارون تقديمها.</li>",
          privacyDataUsageTitle: "بيانات الاستخدام",
          privacyDataUsageP1: "نقوم بجمع المعلومات تلقائيًا عند وصولكم إلى خدماتنا، مثل عنوان IP الخاص بكم ونوع المتصفح ونظام التشغيل وأوقات الوصول والصفحات التي قمتم بعرضها مباشرة قبل وبعد الوصول إلى الموقع.",
          privacyDataUseTitle: "كيف نستخدم معلوماتكم",
          privacyDataUseP1: "إن امتلاك معلومات دقيقة عنكم يسمح لنا بتزويدكم بتجربة سلسة وفعالة ومخصصة. على وجه التحديد، قد نستخدم المعلومات التي تم جمعها عنكم من أجل:",
          privacyDataUseList: "<li>إنشاء وإدارة حسابكم.</li><li>تخصيص وتحسين تجربتكم.</li><li>مراقبة وتحليل الاستخدام والاتجاهات لتحسين خدماتنا.</li><li>الرد على تعليقاتكم وأسئلتكم وتقديم خدمة العملاء.</li><li>حماية منصتنا من الإساءة والاحتيال والنشاط غير القانوني.</li><li>إرسال إشعارات فنية وتحديثات وتنبيهات أمنية ورسائل دعم لكم.</li>",
          privacyDataSharingTitle: "الكشف عن معلوماتكم",
          privacyDataSharingP1: "نحن لا نشارك معلوماتكم الشخصية مع أطراف ثالثة إلا في الظروف الموضحة أدناه:",
          privacyDataSharingList: "<li><strong>بموافقتكم:</strong> قد نشارك معلوماتكم بموافقتكم أو بناءً على توجيهاتكم.</li><li><strong>لأسباب قانونية:</strong> قد نشارك المعلومات إذا كنا نعتقد أن ذلك مطلوب بموجب القانون أو اللوائح أو الإجراءات القانونية، أو لحماية حقوق وممتلكات وسلامة شركتنا أو مستخدمينا أو الآخرين.</li><li><strong>مقدمو الخدمات:</strong> قد نشارك المعلومات مع البائعين والمستشارين ومقدمي الخدمات الآخرين الذين يحتاجون إلى الوصول إلى هذه المعلومات للقيام بعمل نيابة عنا.</li>",
          privacyYourRightsTitle: "حقوق حماية البيانات الخاصة بكم",
          privacyYourRightsP1: "لديكم حقوق معينة فيما يتعلق ببياناتكم الشخصية. وتشمل هذه الحقوق:",
          privacyYourRightsList: "<li><strong>الوصول:</strong> يمكنكم طلب نسخة من المعلومات الشخصية التي نحتفظ بها عنكم.</li><li><strong>التصحيح:</strong> يمكنكم طلب تصحيح أي معلومات غير دقيقة أو غير كاملة.</li><li><strong>الحذف:</strong> يمكنكم طلب حذف بياناتكم الشخصية، مع مراعاة بعض الالتزامات القانونية. يمكنكم بدء هذه العملية مباشرة من داخل تطبيق RuyaX.</li>",
          privacySecurityTitle: "أمن معلوماتكم",
          privacySecurityP1: "نستخدم تدابير أمنية إدارية وتقنية ومادية للمساعدة في حماية معلوماتكم الشخصية. في حين أننا اتخذنا خطوات معقولة لتأمين المعلومات الشخصية التي تقدمونها لنا، يرجى العلم أنه على الرغم من جهودنا، لا توجد تدابير أمنية مثالية أو لا يمكن اختراقها، ولا يمكن ضمان أي طريقة لنقل البيانات ضد أي اعتراض أو أي نوع آخر من سوء الاستخدام.",
          privacyContactTitle: "اتصل بنا",
          privacyContactP1: "إذا كانت لديكم أسئلة أو تعليقات حول سياسة الخصوصية هذه، يرجى الاتصال بنا على: <a href='mailto:contact@ruyax.dev'>contact@ruyax.dev</a>",
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
      } else if (currentPage === 'privacy.html') {
          document.getElementById('nav-privacy')?.classList.add('active');
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
