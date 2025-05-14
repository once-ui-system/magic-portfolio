// 公司基本資訊
export const company = {
  name: "穩智科創有限公司",
  englishName: "Wisdom Technology Innovation Limited",
  slogan: "創新科技，智慧未來",
  founded: "2018年1月15日",
  registrationAuthority: "臺中市政府",
  lastUpdate: "2024年2月27日"
};

// 個人資訊
export const person = {
  name: company.name,
  role: "科技創新解決 · 數位轉型",
  avatar: "/images/icon.svg", 
  location: "臺中市大肚區",
  languages: ["繁體中文", "English"],
  timeZone: "Asia/Taipei",
};

// 首頁內容
export const home = {
  label: "首頁",
  path: "/",
  title: `${company.name} - 創新科技，智慧未來`,
  description: "專業提供機械設備、電子零組件、電腦週邊設備製造，以及資訊軟體服務的科技創新公司",
  headline: "創新科技，智慧未來",
  subline: `${company.name}致力於提供最先進的科技解決方案，從機械設備到軟體服務，為您的事業創造更多可能。`,
  featured: {
    title: "最新消息",
    href: "/blog/latest-innovation"
  },
  image: "/images/og-home.png",
};

// 關於我們
export const about = {
  label: "關於我們",
  path: "/about",
  title: `關於 ${company.name}`,
  description: "了解我們的理念、歷史與團隊",
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "/contact",
  },
  tableOfContent: {
    display: true,
    subItems: true,
  },
  intro: {
    display: true,
    title: "公司簡介",
    description: `${company.name}成立於${company.founded}，為專注於科技創新的公司。我們提供多元化的產品與服務，包括機械設備製造、電子零組件製造、電腦週邊設備製造，以及專業的資訊軟體服務。

我們的使命是透過創新科技，為客戶提供最優質的解決方案，推動產業升級與智慧化轉型。`,
  },
  work: {
    display: true,
    title: "核心業務",
    experiences: [
      {
        company: "機械設備製造",
        timeframe: "2018 - 至今",
        role: "精密機械設備研發與製造",
        achievements: [
          "開發高精度自動化生產設備，提升製造業生產效率",
          "提供客製化機械解決方案，滿足不同產業需求",
          "導入智慧製造技術，推動工業4.0轉型",
        ],
        images: [],
      },
      {
        company: "電子零組件與電腦週邊",
        timeframe: "2018 - 至今",
        role: "電子產品與電腦週邊設備製造",
        achievements: [
          "研發高品質電子零組件，應用於各類電子產品",
          "生產電腦週邊設備，提供完整的硬體解決方案",
          "持續創新，開發符合市場需求的新產品",
        ],
        images: [],
      },
      {
        company: "資訊軟體服務",
        timeframe: "2019 - 至今",
        role: "軟體開發與系統整合服務",
        achievements: [
          "提供客製化軟體開發服務，協助企業數位轉型",
          "系統整合與顧問服務，優化企業營運流程",
          "技術支援與維護服務，確保系統穩定運作",
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: false,
    title: "認證與獎項",
    institutions: [],
  },
  technical: {
    display: true,
    title: "核心技術",
    skills: [
      {
        title: "精密機械技術",
        description: "擁有專業的機械設計與製造能力，能夠開發高精度、高效率的自動化設備。",
        images: [],
      },
      {
        title: "電子技術",
        description: "具備完整的電子產品開發能力，從零組件到成品，提供全方位的解決方案。",
        images: [],
      },
      {
        title: "軟體開發",
        description: "專業的軟體開發團隊，提供客製化的應用程式與系統整合服務。",
        images: [],
      },
      {
        title: "系統整合",
        description: "結合硬體與軟體的優勢，為客戶提供完整的系統解決方案。",
        images: [],
      },
    ],
  },
};

// 聯絡資訊
export const social = [
  {
    name: "電話",
    icon: "phone",
    link: "tel:04-26997842",
  },
  {
    name: "電子郵件",
    icon: "email",
    link: "pufferjim@gmail.com",
  },
  {
    name: "地址",
    icon: "location",
    link: "https://g.co/kgs/AuvNWAW",
  },
];

// 部落格配置
export const blog = {
  label: "最新消息",
  path: "/blog",
  title: "最新消息與技術分享",
  description: "了解穩智科創的最新動態、產品發布與技術文章",
};

// 專案/產品展示
export const work = {
  label: "產品與服務",
  path: "/work",
  title: "產品與服務",
  description: "探索我們的產品線與專業服務",
};

// 不需要的功能可以設定為不顯示
export const gallery = {
  label: "產品展示",
  path: "/gallery",
  title: "產品展示",
  description: "瀏覽我們的產品圖片",
  display: false,
};

// 電子報配置
export const newsletter = {
  display: true,
  title: "立即聯絡我們",
  description: "獲取最新的產品資訊與技術趨勢",
};

// 聯絡資訊詳情
export const contact = {
  company: company.name,
  address: "臺中市大肚區文昌路二段588巷57之1號",
  addressEn: "No. 57-1, Ln. 588, Sec. 2, Wenchang Rd., Dadu Dist., Taichung City 43243, Taiwan (R.O.C.)",
  phone: "04-26997842",
  email: "contact@wenzhi-tech.com.tw", // 需要替換為實際的電子郵件
  businessHours: "週一至週五 09:00-18:00",
};

// 路由配置
export const routes = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": true,
  "/contact": false,
  "/gallery": false,
};

// 受保護的路由
export const protectedRoutes = {
  "/work/protected-project": false,
};

export const mapCenter = {
  lat: 24.3319, 
  lng: 120.5436,
};