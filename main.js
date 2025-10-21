
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
          pageTitlePrivacy: "Privacy Policy - RuyaX Universe Website",
          privacyHeaderTitle: "Website Privacy Policy",
          privacyHeaderSubtitle: "Last Updated: October 16, 2025",
          privacyIntroTitle: "Introduction",
          privacyIntroP1: "Welcome to the RuyaX Universe website. Your privacy is important to us. This Privacy Policy explains how we handle information on this website only. It does not cover our applications, such as the RuyaX app, which have their own separate privacy policies.",
          privacyDataCollectionTitle: "Information We Collect",
          privacyDataCollectionP1: "Our goal is to be transparent about the data we collect and why. For this website, our data collection is minimal and focused on providing a functional experience.",
          privacyDataTypeTitle: "Types of Data Collected",
          privacyDataTypeList: "<li><strong>Log Data:</strong> Like most websites, our servers may automatically log standard data provided by your web browser. This data may include your computer's IP address, browser type and version, the pages you visit, the time and date of your visit, and other general, non-personal details.</li><li><strong>Local Storage:</strong> We use your browser's local storage to save your language preference (English or Arabic). This is to ensure you see the website in your chosen language on return visits. This information is stored only on your device and is not transmitted to our servers.</li>",
          privacyDataPersonalTitle: "Personal Information",
          privacyDataPersonalP1: "We do not collect any personally identifiable information (PII) on this website. You are not required to create an account, log in, or provide details like your name or email address to browse our site.",
          privacyDataUseTitle: "How We Use Information",
          privacyDataUseP1: "We use the collected information for the following purposes:",
          privacyDataUseList: "<li>To improve and optimize your experience on our website.</li><li>To remember your preferences, such as language settings.</li><li>To understand website traffic and usage patterns to help us improve our site's content and structure.</li>",
          privacyDataSharingTitle: "Information Sharing",
          privacyDataSharingP1: "Since we do not collect personal information, we do not have any personal information to share. The non-personal log data may be reviewed by our technical team for maintenance and security purposes but is not shared with third parties.",
          privacyLinksTitle: "Links to Other Websites",
          privacyLinksP1: "Our website contains links to other websites, such as the Google Play Store. We are not responsible for the privacy practices of these other sites. When you leave our website, we encourage you to read the privacy policy of every website you visit.",
          privacySecurityTitle: "Security",
          privacySecurityP1: "We are committed to ensuring that your information is secure. While no method of transmission over the Internet is 100% secure, we take reasonable steps to protect the limited data related to our website's operation.",
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
          pageTitlePrivacy: "سياسة الخصوصية - موقع RuyaX Universe",
          privacyHeaderTitle: "سياسة خصوصية الموقع الإلكتروني",
          privacyHeaderSubtitle: "آخر تحديث: 16 أكتوبر 2025",
          privacyIntroTitle: "مقدمة",
          privacyIntroP1: "مرحبًا بكم في موقع RuyaX Universe. خصوصيتكم تهمنا. توضح سياسة الخصوصية هذه كيفية تعاملنا مع المعلومات على هذا الموقع الإلكتروني فقط. لا تغطي هذه السياسة تطبيقاتنا، مثل تطبيق RuyaX، التي لها سياسات خصوصية منفصلة خاصة بها.",
          privacyDataCollectionTitle: "المعلومات التي نجمعها",
          privacyDataCollectionP1: "هدفنا هو أن نكون شفافين بشأن البيانات التي نجمعها وسبب جمعها. بالنسبة لهذا الموقع، فإن جمعنا للبيانات محدود ويركز على توفير تجربة وظيفية.",
          privacyDataTypeTitle: "أنواع البيانات التي يتم جمعها",
          privacyDataTypeList: "<li><strong>بيانات السجل:</strong> مثل معظم مواقع الويب، قد تقوم خوادمنا تلقائيًا بتسجيل البيانات القياسية التي يوفرها متصفح الويب الخاص بك. قد تتضمن هذه البيانات عنوان IP لجهاز الكمبيوتر الخاص بك، ونوع المتصفح وإصداره، والصفحات التي تزورها، ووقت وتاريخ زيارتك، وتفاصيل عامة أخرى غير شخصية.</li><li><strong>التخزين المحلي:</strong> نستخدم التخزين المحلي للمتصفح الخاص بك لحفظ تفضيلات اللغة (الإنجليزية أو العربية). هذا لضمان رؤيتك للموقع بلغتك المختارة في الزيارات المستقبلية. يتم تخزين هذه المعلومات على جهازك فقط ولا يتم نقلها إلى خوادمنا.</li>",
          privacyDataPersonalTitle: "المعلومات الشخصية",
          privacyDataPersonalP1: "نحن لا نجمع أي معلومات تعريف شخصية (PII) على هذا الموقع. لست مطالبًا بإنشاء حساب أو تسجيل الدخول أو تقديم تفاصيل مثل اسمك أو عنوان بريدك الإلكتروني لتصفح موقعنا.",
          privacyDataUseTitle: "كيف نستخدم المعلومات",
          privacyDataUseP1: "نستخدم المعلومات التي تم جمعها للأغراض التالية:",
          privacyDataUseList: "<li>لتحسين وتخصيص تجربتك على موقعنا.</li><li>لتذكر تفضيلاتك، مثل إعدادات اللغة.</li><li>لفهم حركة المرور على الموقع وأنماط الاستخدام لمساعدتنا في تحسين محتوى وهيكل موقعنا.</li>",
          privacyDataSharingTitle: "مشاركة المعلومات",
          privacyDataSharingP1: "نظرًا لأننا لا نجمع معلومات شخصية، فليس لدينا أي معلومات شخصية لمشاركتها. قد يتم مراجعة بيانات السجل غير الشخصية من قبل فريقنا الفني لأغراض الصيانة والأمان ولكن لا يتم مشاركتها مع أطراف ثالثة.",
          privacyLinksTitle: "روابط لمواقع أخرى",
          privacyLinksP1: "يحتوي موقعنا على روابط لمواقع أخرى، مثل متجر Google Play. نحن لسنا مسؤولين عن ممارسات الخصوصية لهذه المواقع الأخرى. عند مغادرة موقعنا، نشجعك على قراءة سياسة الخصوصية لكل موقع تزوره.",
          privacySecurityTitle: "الأمان",
          privacySecurityP1: "نحن ملتزمون بضمان أمان معلوماتكم. في حين أنه لا توجد طريقة نقل عبر الإنترنت آمنة 100٪، فإننا نتخذ خطوات معقولة لحماية البيانات المحدودة المتعلقة بتشغيل موقعنا.",
          privacyContactTitle: "اتصل بنا",
          privacyContactP1: "إذا كانت لديكم أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على: <a href='mailto:contact@ruyax.dev'>contact@ruyax.dev</a>",
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
