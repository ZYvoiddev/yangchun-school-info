const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

const renderIcons = () => {
  if (window.lucide) {
    window.lucide.createIcons({ strokeWidth: 1.8 });
  }
};

if (menuToggle && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

const noticeBars = document.querySelectorAll(".notice-bar");
const noticeStorageKey = "yangchun-school-notice-dismissed-v1";

const noticeStorage = (() => {
  try {
    const testKey = "__yangchun_notice_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return window.localStorage;
  } catch {
    return null;
  }
})();

if (noticeBars.length && (!noticeStorage || noticeStorage.getItem(noticeStorageKey) !== "1")) {
  noticeBars.forEach((bar) => {
    if (bar.dataset.noticeReady) return;

    const text = bar.textContent.trim();
    bar.textContent = "";

    const span = document.createElement("span");
    span.className = "notice-bar-text";
    span.textContent = text;

    const close = document.createElement("button");
    close.className = "notice-close";
    close.type = "button";
    close.setAttribute("aria-label", "关闭通知栏");
    close.textContent = "×";
    close.addEventListener("click", () => {
      if (noticeStorage) {
        try {
          noticeStorage.setItem(noticeStorageKey, "1");
        } catch {
          // storage is optional
        }
      }
      bar.remove();
    });

    bar.append(span, close);
    bar.dataset.noticeReady = "true";
  });
} else if (noticeBars.length) {
  noticeBars.forEach((bar) => bar.remove());
}

const filterButtons = document.querySelectorAll("[data-filter]");
const majorCards = document.querySelectorAll(".major-card[data-category]");
const filterStatus = document.querySelector("[data-filter-status]");

const filterLabels = {
  all: "全部专业方向",
  it: "信息技术类专业",
  manufacturing: "智能制造类专业",
  service: "现代服务类专业",
};

const applyMajorFilter = (filter) => {
  let visibleCount = 0;

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  majorCards.forEach((card) => {
    const isVisible = filter === "all" || card.dataset.category === filter;
    card.hidden = !isVisible;
    card.classList.toggle("is-hidden", !isVisible);
    if (isVisible) visibleCount += 1;
  });

  if (filterStatus) {
    filterStatus.textContent = `当前显示 ${filterLabels[filter] || "所选分类"}，共 ${visibleCount} 个专业。`;
  }
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyMajorFilter(button.dataset.filter || "all");
  });
});

if (filterButtons.length && majorCards.length) {
  const activeFilter = document.querySelector("[data-filter].active")?.dataset.filter || "all";
  applyMajorFilter(activeFilter);
}

const majorDetails = {
  "计算机应用": {
    category: "信息技术",
    icon: "monitor",
    slogan: "把办公、网络和基础技术支持练成稳定的职业入口。",
    intro: [
      "适合对电脑操作、办公应用、文件整理和基础网络工具感兴趣的学生。重点不是只会点软件，而是能把常见数字工具用熟，用到位。",
      "如果你更喜欢规范化、重复性较强但能看见成果的学习节奏，这个方向通常更容易上手。",
    ],
    learn: ["办公软件应用", "网络基础", "数字工具", "设备协助"],
    jobs: ["办公文员", "信息录入与资料整理", "电脑维护助理", "基础技术支持"],
    fit: "更适合喜欢电脑操作、资料整理和基础技术服务的学生。",
    path: ["办公信息化", "基础技术服务", "岗位适应"],
    note: "岗位名称会随行业变化，页面只保留方向，不写死具体工种。",
  },
  "电子商务": {
    category: "信息技术",
    icon: "shopping-bag",
    slogan: "围绕平台运营、内容推广和客户沟通展开。",
    intro: [
      "适合喜欢网络营销、直播电商、网店运营和客户服务的学生。学习重点会围绕商品、内容和平台操作展开。",
      "如果你对节奏较快、需要持续跟进的工作比较接受，这个方向通常更容易发挥。",
    ],
    learn: ["平台运营", "内容推广", "客户沟通", "基础拍摄"],
    jobs: ["网店运营助理", "直播电商助理", "电商客服", "内容运营助理"],
    fit: "更适合愿意跟着平台节奏做内容、接待和订单处理的学生。",
    path: ["平台运营", "内容助理", "客户服务"],
    note: "适合关注“会不会做、能不能持续做”的学生，不只看名字热不热门。",
  },
  "数字影像技术": {
    category: "信息技术",
    icon: "camera",
    slogan: "把拍摄、剪辑和视觉表达练成一套可用技能。",
    intro: [
      "适合喜欢拍摄、剪辑、图片处理和短视频表达的学生。核心不是只会按快门，而是能把素材整理成能交付的内容。",
      "如果你对画面、节奏和镜头感更敏感，这个方向会比纯理论课程更有吸引力。",
    ],
    learn: ["影像采集", "剪辑制作", "图片处理", "视觉表达"],
    jobs: ["摄影助理", "剪辑助理", "短视频运营助理", "图片后期助理"],
    fit: "更适合对画面、节奏、镜头和内容表达更敏感的学生。",
    path: ["影像制作", "剪辑后期", "内容输出"],
    note: "就业方向偏内容生产和新媒体岗位，适合愿意持续练作品的人。",
  },
  "通信系统工程安装与维护": {
    category: "信息技术",
    icon: "radio-tower",
    slogan: "围绕通信设备、线路和现场维护展开。",
    intro: [
      "适合对通信设备、网络布线、机房管理和设备维护感兴趣的学生。重点是理解线路和设备如何协作。",
      "这个方向更偏现场和规范，适合不怕跑动、愿意动手排查问题的学生。",
    ],
    learn: ["通信设备", "线路基础", "安装维护", "现场规范"],
    jobs: ["通信设备安装助理", "网络布线助理", "机房运维助理", "售后技术支持"],
    fit: "更适合愿意接触现场、设备和排查工作的学生。",
    path: ["通信基础", "设备安装", "维护排障"],
    note: "企业分工会变化，页面只保留方向，不写死岗位代码。",
  },
  "工业机器人技术应用": {
    category: "智能制造",
    icon: "bot",
    slogan: "把自动化设备的操作和维护练扎实。",
    intro: [
      "适合喜欢机械设备、自动化产线和动手实训的学生。重点是理解机器人怎么运行，并能配合现场完成操作和维护。",
      "如果你对机械结构和现场操作更有兴趣，这个方向会比较对路。",
    ],
    learn: ["机器人应用", "基础维护", "现场实训", "安全规范"],
    jobs: ["设备操作员", "自动化产线助理", "机器人调试助理", "巡检维护助理"],
    fit: "更适合喜欢设备、产线和现场实操的学生。",
    path: ["设备操作", "调试维护", "产线协同"],
    note: "更看重动手能力和持续训练，不适合只想看理论的学习方式。",
  },
  "智能设备运行与维护": {
    category: "智能制造",
    icon: "settings",
    slogan: "把设备运行、巡检和基础维护练成核心能力。",
    intro: [
      "适合对设备运行、检修和生产现场技术感兴趣的学生。训练重点是认识设备状态、做记录、会排查。",
      "这个方向很吃规范意识和耐心，适合喜欢把流程做细的人。",
    ],
    learn: ["设备运行", "检修基础", "生产规范", "巡检记录"],
    jobs: ["设备运维助理", "点检员", "生产线技术员", "售后装调助理"],
    fit: "更适合愿意长期在现场积累经验、逐步成长的学生。",
    path: ["设备运行", "巡检维护", "生产协同"],
    note: "适合能接受较强实训节奏、愿意把基础做牢的学生。",
  },
  "无人机操控与维护": {
    category: "智能制造",
    icon: "plane",
    slogan: "围绕飞行操作、航拍采集和设备维护展开。",
    intro: [
      "适合喜欢无人机设备、航拍和现场任务的学生。重点不是“会飞”而已，而是理解任务、规范和设备保养。",
      "如果你对新设备、新场景和户外工作有兴趣，这个方向通常更有吸引力。",
    ],
    learn: ["无人机操控", "设备维护", "航拍基础", "任务执行"],
    jobs: ["无人机飞手助理", "航拍执行助理", "巡检辅助", "设备维护助理"],
    fit: "更适合愿意接触新设备、户外场景和任务执行的学生。",
    path: ["飞行操作", "任务采集", "巡检维护"],
    note: "常见岗位会和巡检、拍摄、测绘等场景结合，具体看企业需求。",
  },
  "新能源汽车运用与维修": {
    category: "智能制造",
    icon: "car",
    slogan: "面向汽车技术和新能源维修服务。",
    intro: [
      "适合关注汽车结构、维修保养和新能源车技术的学生。重点是理解车辆系统、检测流程和售后协作。",
      "这个方向更容易把课堂和实际车型联系起来，学习成果也相对直观。",
    ],
    learn: ["汽车结构", "检测基础", "维修规范", "服务流程"],
    jobs: ["汽车机电维修助理", "售后服务顾问", "快修保养助理", "配件与检测助理"],
    fit: "更适合对车辆、检测和维修流程有兴趣的学生。",
    path: ["汽车基础", "检测保养", "售后服务"],
    note: "更适合接受较强实操、愿意长期积累经验的学生。",
  },
  "中西面点": {
    category: "现代服务",
    icon: "croissant",
    slogan: "把面点制作、烘焙基础和门店规范练成手艺。",
    intro: [
      "适合喜欢烘焙、面点制作和餐饮服务的学生。重点是手艺、流程和出品稳定性。",
      "如果你对重复练习、味道和出品细节敏感，这个方向会比较合适。",
    ],
    learn: ["面点制作", "烘焙基础", "门店规范", "出品管理"],
    jobs: ["烘焙助理", "面点师助理", "后厨出品", "中央厨房助理"],
    fit: "更适合愿意重复练习、在手艺里积累细节的学生。",
    path: ["面点基础", "出品训练", "门店协作"],
    note: "就业方向以餐饮、烘焙门店和团餐为主，不写保证就业。",
  },
  "中餐烹饪": {
    category: "现代服务",
    icon: "chef-hat",
    slogan: "围绕刀工、火候和后厨协作展开。",
    intro: [
      "适合喜欢厨房操作、菜品制作和餐饮实践的学生。重点是基础手艺、速度和团队配合。",
      "如果你对做菜本身有兴趣，并且愿意接受高强度训练，这个方向更合适。",
    ],
    learn: ["中餐烹调", "刀工火候", "厨房规范", "团队协作"],
    jobs: ["后厨帮厨", "菜品制作助理", "团餐出品", "餐饮门店后厨"],
    fit: "更适合愿意接受较强实操、重复训练和后厨节奏的学生。",
    path: ["基础烹调", "菜品制作", "厨房协作"],
    note: "更适合对餐饮本身有兴趣、愿意持续练基本功的学生。",
  },
  "美容美体艺术": {
    category: "现代服务",
    icon: "sparkles",
    slogan: "把审美、服务和沟通能力一起训练。",
    intro: [
      "适合对形象设计、美容服务和门店沟通感兴趣的学生。重点是服务流程、审美判断和实际操作。",
      "如果你细心、耐心，也愿意和人持续沟通，这个方向会比较匹配。",
    ],
    learn: ["美容基础", "美体服务", "沟通礼仪", "门店接待"],
    jobs: ["美容师助理", "美体师助理", "门店接待", "皮肤管理助理"],
    fit: "更适合细心、愿意沟通、对审美和服务流程感兴趣的学生。",
    path: ["美容基础", "服务训练", "门店实操"],
    note: "就业方向以美容门店、皮肤管理和形象服务为主。",
  },
  "艺术设计与制作": {
    category: "现代服务",
    icon: "palette",
    slogan: "把设计表达和动手制作连成一条线。",
    intro: [
      "适合喜欢绘画、排版、视觉创意和手工制作的学生。训练重点是基础设计语言、素材整理和输出能力。",
      "如果你喜欢做作品、改稿和处理细节，这个方向更能发挥创意。",
    ],
    learn: ["设计基础", "视觉制作", "排版表达", "创意实现"],
    jobs: ["平面设计助理", "广告制作助理", "视觉排版助理", "包装制作助理"],
    fit: "更适合愿意持续做作品、改稿和打磨细节的学生。",
    path: ["设计基础", "视觉制作", "输出落地"],
    note: "就业方向偏设计制作与内容输出，适合能持续练作品的人。",
  },
  "康养休闲旅游服务": {
    category: "现代服务",
    icon: "map",
    slogan: "围绕接待、康养和活动组织展开。",
    intro: [
      "适合喜欢服务沟通、旅游接待和健康服务方向的学生。重点在礼仪、组织和现场服务意识。",
      "这个方向更适合愿意和人打交道、并且能接受服务节奏的人。",
    ],
    learn: ["康养服务", "旅游接待", "休闲服务", "活动组织"],
    jobs: ["康养机构服务助理", "景区接待", "旅行社接待助理", "活动执行助理"],
    fit: "更适合愿意做服务型工作、喜欢沟通和组织的学生。",
    path: ["接待服务", "活动组织", "场景协同"],
    note: "更适合长期在服务行业发展的人。",
  },
  "母婴照护": {
    category: "现代服务",
    icon: "baby",
    slogan: "把照护规范、沟通和耐心变成基础能力。",
    intro: [
      "适合细心、有耐心、愿意从事照护服务的学生。训练重点是基础照护、服务礼仪和与家庭或机构的沟通。",
      "如果你愿意接受细致、稳定、规范性强的工作节奏，这个方向比较适合。",
    ],
    learn: ["母婴护理", "照护规范", "服务沟通", "安全意识"],
    jobs: ["母婴护理助理", "月子中心服务", "早教/托育助理", "家庭照护助理"],
    fit: "更适合细心、稳定、愿意做照护服务的学生。",
    path: ["护理规范", "照护实操", "机构/家庭服务"],
    note: "岗位名称会随机构不同而变化，页面只列方向，不写固定承诺。",
  },
  "休闲体育服务与管理": {
    category: "现代服务",
    icon: "dumbbell",
    slogan: "面向运动服务、场馆协助和活动组织。",
    intro: [
      "适合热爱运动、希望从事体育服务与活动组织的学生。重点是服务意识、场馆协作和活动执行。",
      "如果你愿意把运动兴趣转成服务能力，这个方向会更对口。",
    ],
    learn: ["体育服务", "活动管理", "场馆协助", "基础训练"],
    jobs: ["场馆服务", "体育培训助教", "赛事协助", "健身房前台助理"],
    fit: "更适合愿意把运动兴趣转成服务能力的学生。",
    path: ["体育服务", "活动组织", "场馆协作"],
    note: "更适合把运动兴趣转成长期服务能力的人。",
  },
};

const categoryProfiles = {
  "信息技术": {
    studyYears: "3年制",
    goal: "培养能熟练使用数字工具、理解基础技术流程、适应信息化岗位节奏的学生。",
    courses: ["办公软件应用", "网络基础", "数字内容制作", "平台操作", "数据整理", "设备协助基础"],
    skills: ["软件应用", "数据整理", "基础排障", "内容协作"],
    certs: ["1+X相关证书（待确认）", "计算机等级证书（按政策报考）"],
    progressionMajors: ["计算机应用技术", "电子商务", "数字媒体技术", "网络技术", "信息管理相关专业"],
    collegeTypes: ["高职院校", "应用型本科（按政策）", "高职高考对口升学班"],
    rate: "暂无统一公开口径",
    training: "更偏软件应用、基础排障和流程协作，适合做信息技术类实训展示。",
    competition: "竞赛与获奖信息以学校后续公开为准。",
    cooperation: "校企合作名单待学校后续公开确认。",
    employers: ["本地中小企业信息部", "通信与网络服务公司", "电商与内容运营团队"],
    salary: "薪资参考：因城市和岗位差异较大，建议以当地招聘平台和企业正式发布为准。",
  },
  "智能制造": {
    studyYears: "3年制",
    goal: "培养能理解设备运行、完成基础装调、适应生产现场节奏的技术型学生。",
    courses: ["机械基础", "电工基础", "设备运行", "检修维护", "安全规范", "产线协同"],
    skills: ["设备操作", "调试维护", "巡检记录", "现场协作"],
    certs: ["1+X相关证书（待确认）", "职业技能等级证书（按专业方向）"],
    progressionMajors: ["机电技术应用", "智能制造装备技术", "汽车制造与实验技术", "无人机相关专业", "自动化相关专业"],
    collegeTypes: ["高职院校", "应用型本科（按政策）", "高职高考对口升学班"],
    rate: "暂无统一公开口径",
    training: "更偏设备操作、维护和产线协作，适合做现场型实训展示。",
    competition: "竞赛与获奖信息以学校后续公开为准。",
    cooperation: "校企合作通常会和设备、生产和现场实训场景关联，具体名单待公开。",
    employers: ["制造企业生产线", "设备维保公司", "自动化集成企业"],
    salary: "薪资参考：通常与城市制造业景气度、轮班制度和岗位熟练度相关。",
  },
  "现代服务": {
    studyYears: "3年制",
    goal: "培养能在餐饮、健康服务、旅游接待、形象服务等场景中稳定工作的学生。",
    courses: ["服务礼仪", "沟通表达", "岗位实操", "卫生规范", "活动组织", "基础管理"],
    skills: ["服务接待", "礼仪沟通", "出品协作", "活动执行"],
    certs: ["1+X相关证书（待确认）", "职业技能等级证书（按专业方向）"],
    progressionMajors: ["旅游管理", "餐饮管理", "健康服务与管理", "艺术设计相关专业", "体育服务相关专业"],
    collegeTypes: ["高职院校", "应用型本科（按政策）", "高职高考对口升学班"],
    rate: "暂无统一公开口径",
    training: "更偏服务流程、礼仪规范和岗位协作，适合做门店与活动类实训展示。",
    competition: "竞赛与获奖信息以学校后续公开为准。",
    cooperation: "校企合作通常会和门店、康养、餐饮与活动执行场景关联，具体名单待公开。",
    employers: ["连锁餐饮门店", "文旅与康养机构", "形象服务工作室"],
    salary: "薪资参考：通常与门店规模、地区消费水平和服务年限相关。",
  },
};

const categoryCareerPaths = {
  "信息技术": ["基础操作岗", "技术支持 / 运营岗", "专员 / 骨干岗"],
  "智能制造": ["设备操作岗", "调试维护岗", "班组长 / 技术骨干"],
  "现代服务": ["服务助理岗", "门店 / 项目执行岗", "主管 / 训练岗"],
};

const modalState = {
  overlay: null,
  lastTrigger: null,
  closeModal: null,
};

const focusableSelector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const createPills = (items, className) => {
  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    const pill = document.createElement("span");
    pill.className = className;
    pill.textContent = item;
    fragment.appendChild(pill);
  });
  return fragment;
};

const createTextStack = (items) => {
  const wrapper = document.createElement("div");
  wrapper.className = "major-modal__text-stack";

  items.filter(Boolean).forEach((item) => {
    const paragraph = document.createElement("p");
    paragraph.className = "major-modal__copy";
    paragraph.textContent = item;
    wrapper.appendChild(paragraph);
  });

  return wrapper;
};

const createInfoGrid = (entries) => {
  const grid = document.createElement("div");
  grid.className = "major-modal__info-grid";

  entries.forEach(({ label, value }) => {
    const item = document.createElement("div");
    item.className = "major-modal__info-item";

    const small = document.createElement("small");
    small.textContent = label;

    const strong = document.createElement("strong");
    strong.textContent = value;

    item.append(small, strong);
    grid.appendChild(item);
  });

  return grid;
};

const classifyJobBadge = (title) => {
  if (/(维护|运维|点检|调试)/.test(title)) return "技术型";
  if (/(运营|内容|推广|电商)/.test(title)) return "运营型";
  if (/(客服|接待|服务)/.test(title)) return "服务型";
  if (/(摄影|剪辑|设计|美容|烹调|面点|体育|后厨)/.test(title)) return "实操型";
  return "基础岗";
};

const describeJob = (title) => {
  if (/(维护|运维|点检|调试)/.test(title)) {
    return "负责巡检、记录、基础排障和现场协作，重点是把设备状态看明白、处理稳。";
  }
  if (/(运营|内容|推广|电商)/.test(title)) {
    return "负责日常执行、内容协作和基础数据跟进，强调上手速度和持续配合。";
  }
  if (/(客服|接待|服务)/.test(title)) {
    return "负责接待、沟通和服务流程执行，强调礼仪、响应和规范操作。";
  }
  if (/(摄影|剪辑|设计|美容|烹调|面点|体育|后厨)/.test(title)) {
    return "负责技能输出、作品制作或现场协作，适合边练边积累经验。";
  }
  return "面向专业对应的基础岗位，重点是先把实训能力和岗位协作做稳定。";
};

const createJobCards = (jobs) => {
  const grid = document.createElement("div");
  grid.className = "major-modal__job-grid";

  jobs.slice(0, 6).forEach((job) => {
    const card = document.createElement("article");
    card.className = "major-modal__job-card";

    const badge = document.createElement("span");
    badge.className = "major-modal__job-badge";
    badge.textContent = classifyJobBadge(job);

    const title = document.createElement("h4");
    title.textContent = job;

    const desc = document.createElement("p");
    desc.textContent = describeJob(job);

    card.append(badge, title, desc);
    grid.appendChild(card);
  });

  return grid;
};

const createCareerFlow = (steps) => {
  const flow = document.createElement("div");
  flow.className = "major-modal__career-flow";

  steps.forEach((step, index) => {
    const item = document.createElement("div");
    item.className = `major-modal__career-step major-modal__career-step--${index + 1}`;
    item.textContent = step;
    flow.appendChild(item);

    if (index < steps.length - 1) {
      const arrow = document.createElement("span");
      arrow.className = "major-modal__career-arrow";
      arrow.textContent = "→";
      flow.appendChild(arrow);
    }
  });

  return flow;
};

const ensureMajorModal = () => {
  if (modalState.overlay) return modalState.overlay;

  const overlay = document.createElement("div");
  overlay.className = "major-modal-overlay";
  overlay.hidden = true;
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = `
    <div class="major-modal" role="dialog" aria-modal="true" aria-labelledby="major-modal-title" aria-describedby="major-modal-desc" tabindex="-1">
      <div class="major-modal__scroll">
        <div class="major-modal__hero">
          <div class="major-modal__icon" data-modal-icon></div>
          <div class="major-modal__hero-copy">
            <span class="major-modal__category" data-modal-category></span>
            <h2 class="major-modal__title" id="major-modal-title"></h2>
            <p class="major-modal__slogan" id="major-modal-desc"></p>
          </div>
          <button class="major-modal__close" type="button" data-modal-close aria-label="关闭专业详情">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="major-modal__content">
          <section class="major-modal__section major-modal__section--wide">
            <h3>专业概览</h3>
            <p class="major-modal__section-lead">先看专业定位、学制和培养目标，再判断它是否适合你。</p>
            <div class="major-modal__overview" data-modal-overview></div>
            <div class="major-modal__intro" data-modal-intro></div>
          </section>
          <section class="major-modal__section">
            <h3>学什么（课程体系）</h3>
            <p class="major-modal__section-lead">课程、技能和证书分开看，会更容易判断学习压力和培养重点。</p>
            <div class="major-modal__stack">
              <div class="major-modal__group">
                <span class="major-modal__group-label">核心课程</span>
                <div class="major-modal__pills" data-modal-courses></div>
              </div>
              <div class="major-modal__group">
                <span class="major-modal__group-label">实训技能</span>
                <div class="major-modal__pills" data-modal-skills></div>
              </div>
              <div class="major-modal__group">
                <span class="major-modal__group-label">可考证书</span>
                <div class="major-modal__pills" data-modal-certs></div>
              </div>
            </div>
          </section>
          <section class="major-modal__section">
            <h3>就业选项（重点）</h3>
            <p class="major-modal__section-lead">先看常见岗位，再看每个岗位对应的职责和成长空间。</p>
            <div class="major-modal__job-grid" data-modal-jobs></div>
          </section>
          <section class="major-modal__section major-modal__section--wide">
            <h3>职业发展路径图</h3>
            <p class="major-modal__section-lead">从入门到成长再到骨干，按职业阶梯看会更直观。</p>
            <div data-modal-career></div>
          </section>
          <section class="major-modal__section">
            <h3>升学方向</h3>
            <p class="major-modal__section-lead">先看对口专业和院校类型，再结合自己的升学计划做判断。</p>
            <div class="major-modal__stack">
              <div class="major-modal__group">
                <span class="major-modal__group-label">对口升学专业</span>
                <div class="major-modal__pills" data-modal-majors></div>
              </div>
              <div class="major-modal__group">
                <span class="major-modal__group-label">可报考院校类型</span>
                <div class="major-modal__pills" data-modal-colleges></div>
              </div>
              <div class="major-modal__group">
                <span class="major-modal__group-label">升学率参考</span>
                <p class="major-modal__copy" data-modal-rate></p>
              </div>
            </div>
          </section>
          <section class="major-modal__section">
            <h3>专业特色</h3>
            <p class="major-modal__section-lead">实训、竞赛和校企合作是判断学校培养落地程度的关键线索。</p>
            <div class="major-modal__stack">
              <div class="major-modal__group">
                <span class="major-modal__group-label">实训条件</span>
                <p class="major-modal__copy" data-modal-training></p>
              </div>
              <div class="major-modal__group">
                <span class="major-modal__group-label">竞赛获奖</span>
                <p class="major-modal__copy" data-modal-competition></p>
              </div>
              <div class="major-modal__group">
                <span class="major-modal__group-label">校企合作</span>
                <p class="major-modal__copy" data-modal-cooperation></p>
              </div>
            </div>
          </section>
          <section class="major-modal__section major-modal__section--wide">
            <h3>合作企业 / 就业单位</h3>
            <p class="major-modal__section-lead">这里展示的是常见对口单位类型，不等于学校已公开的最终名单。</p>
            <div class="major-modal__pills" data-modal-employers></div>
            <p class="major-modal__copy major-modal__copy--muted" data-modal-employer-note></p>
          </section>
          <section class="major-modal__section major-modal__section--wide">
            <h3>薪资区间参考</h3>
            <p class="major-modal__section-lead">不同城市、岗位和经验差别较大，建议把它当作范围参考。</p>
            <p class="major-modal__copy" data-modal-salary></p>
          </section>
        </div>
        <div class="major-modal__note" data-modal-note></div>
        <div class="major-modal__footer">
          <p class="major-modal__meta" data-modal-meta></p>
          <div class="major-modal__footer-actions">
            <button class="button secondary" type="button" data-modal-share>分享</button>
            <button class="button primary" type="button" data-modal-consult>咨询报名</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const closeModal = () => {
    overlay.hidden = true;
    overlay.setAttribute("aria-hidden", "true");
    overlay.dataset.open = "false";
    document.body.classList.remove("modal-open");
    if (modalState.lastTrigger && typeof modalState.lastTrigger.focus === "function") {
      modalState.lastTrigger.focus();
    }
    modalState.lastTrigger = null;
  };

  const handleKeydown = (event) => {
    if (overlay.hidden) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.key !== "Tab") return;

    const focusables = Array.from(overlay.querySelectorAll(focusableSelector)).filter(
      (element) => element.offsetParent !== null
    );

    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  overlay.querySelector("[data-modal-close]").addEventListener("click", closeModal);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeModal();
    }
  });
  overlay.addEventListener("keydown", handleKeydown);

  document.body.appendChild(overlay);

  modalState.overlay = overlay;
  modalState.closeModal = closeModal;

  return overlay;
};

const openMajorModal = (card) => {
  const overlay = ensureMajorModal();
  const title = card.querySelector("h3")?.textContent.trim() || "专业详情";
  const detail = majorDetails[title] || {
    category: card.dataset.category === "it" ? "信息技术" : card.dataset.category === "manufacturing" ? "智能制造" : "现代服务",
    icon: "school",
    slogan: "围绕专业方向、实训能力和就业准备展开。",
    intro: ["当前专业的公开说明较少，先展示现有页面口径。", "具体课程、学费和招生安排请以后续官方材料为准。"],
    learn: ["专业基础", "实训训练", "岗位适应"],
    jobs: ["对应岗位方向", "基础技术岗位", "服务 / 运营岗位"],
    fit: "适合愿意接受实训节奏、把基础能力练扎实的学生。",
    path: ["专业认知", "实训上手", "岗位适应"],
    note: "当前内容仅基于公开整理信息，具体课程和招生安排以学校官方发布为准。",
  };
  const profile = categoryProfiles[detail.category] || {
    studyYears: "3年制",
    goal: "培养具备基础实训能力和岗位适应能力的学生。",
    courses: [],
    skills: [],
    certs: [],
    progressionMajors: [],
    collegeTypes: [],
    rate: "暂无统一公开口径",
    training: "暂无统一公开实训条件说明。",
    competition: "暂无统一公开竞赛获奖信息。",
    cooperation: "暂无统一公开校企合作名单。",
    employers: ["待学校官方公开"],
    salary: "暂无统一公开薪资口径，请以当地招聘信息为准。",
  };
  const careerSteps = categoryCareerPaths[detail.category] || ["基础岗位", "进阶岗位", "骨干岗位"];

  modalState.lastTrigger = card;

  overlay.querySelector("[data-modal-category]").textContent = detail.category;
  overlay.querySelector("#major-modal-title").textContent = title;
  overlay.querySelector("#major-modal-desc").textContent = detail.slogan;

  overlay.querySelector("[data-modal-overview]").replaceChildren(
    createInfoGrid([
      { label: "学制信息", value: profile.studyYears },
      { label: "培养目标", value: profile.goal },
      { label: "适合关注", value: detail.fit },
    ])
  );

  overlay.querySelector("[data-modal-intro]").replaceChildren(createTextStack(detail.intro));
  overlay.querySelector("[data-modal-courses]").replaceChildren(createPills(profile.courses, "major-modal__pill"));
  overlay.querySelector("[data-modal-skills]").replaceChildren(createPills(profile.skills, "major-modal__pill"));
  overlay.querySelector("[data-modal-certs]").replaceChildren(createPills(profile.certs, "major-modal__pill"));
  overlay.querySelector("[data-modal-majors]").replaceChildren(createPills(profile.progressionMajors, "major-modal__pill"));
  overlay.querySelector("[data-modal-colleges]").replaceChildren(createPills(profile.collegeTypes, "major-modal__pill"));
  overlay.querySelector("[data-modal-rate]").textContent = profile.rate;
  overlay.querySelector("[data-modal-training]").textContent = profile.training;
  overlay.querySelector("[data-modal-competition]").textContent = profile.competition;
  overlay.querySelector("[data-modal-cooperation]").textContent = profile.cooperation;
  overlay.querySelector("[data-modal-employers]").replaceChildren(
    createPills(profile.employers, "major-modal__pill major-modal__pill--muted")
  );
  overlay.querySelector("[data-modal-employer-note]").textContent = "以上为常见对口单位类型，若学校后续公开具体合作名单，应以官方信息为准。";
  overlay.querySelector("[data-modal-salary]").textContent = profile.salary;
  overlay.querySelector("[data-modal-note]").textContent = detail.note;
  overlay.querySelector("[data-modal-meta]").textContent = "就业选项仅为专业方向对应的常见岗位，不代表录用承诺。";
  overlay.querySelector("[data-modal-icon]").innerHTML = `<i data-lucide="${detail.icon}"></i>`;
  overlay.querySelector("[data-modal-jobs]").replaceChildren(createJobCards(detail.jobs));
  overlay.querySelector("[data-modal-career]").replaceChildren(createCareerFlow(careerSteps));

  overlay.hidden = false;
  overlay.setAttribute("aria-hidden", "false");
  overlay.dataset.open = "true";
  document.body.classList.add("modal-open");

  renderIcons();

  const consultButton = overlay.querySelector("[data-modal-consult]");
  const shareButton = overlay.querySelector("[data-modal-share]");

  if (consultButton && !consultButton.dataset.bound) {
    consultButton.dataset.bound = "true";
    consultButton.addEventListener("click", () => {
      alert("这是学生个人项目的咨询报名占位按钮，实际报名请以学校官方发布为准。");
    });
  }

  if (shareButton && !shareButton.dataset.bound) {
    shareButton.dataset.bound = "true";
    shareButton.addEventListener("click", async () => {
      const shareText = `${title} - ${detail.category}`;
      const shareUrl = window.location.href;

      if (navigator.share) {
        try {
          await navigator.share({ title, text: shareText, url: shareUrl });
          return;
        } catch {
          // ignore share cancellation
        }
      }

      try {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        alert("链接已复制，方便分享。");
      } catch {
        console.log("Share:", shareText, shareUrl);
      }
    });
  }

  requestAnimationFrame(() => {
    overlay.querySelector("[data-modal-close]")?.focus();
  });
};

document.querySelectorAll(".major-card[data-category]").forEach((card) => {
  const title = card.querySelector("h3")?.textContent.trim() || "专业详情";
  card.classList.add("is-clickable");
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-haspopup", "dialog");
  card.setAttribute("aria-label", `查看 ${title} 的专业详情`);
  card.title = `点击查看 ${title} 的专业详情`;

  card.addEventListener("click", () => openMajorModal(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openMajorModal(card);
    }
  });
});

document.querySelectorAll("[data-demo-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("这是学生个人项目的演示表单，不会提交到学校，实际报名请以官方发布为准。");
    form.reset();
  });
});

const countTargets = document.querySelectorAll("[data-count]");

if (countTargets.length) {
  const animateCount = (target) => {
    const end = Number(target.dataset.count);
    const duration = 900;
    const startTime = performance.now();
    const hasDecimal = !Number.isInteger(end);

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = end * eased;
      target.textContent = hasDecimal ? value.toFixed(1) : Math.round(value).toString();

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        target.textContent = hasDecimal ? end.toFixed(1) : String(end);
      }
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = "true";
          animateCount(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  countTargets.forEach((target) => observer.observe(target));
}

window.addEventListener("load", renderIcons);

const floatingTools = document.querySelector("[data-floating-tools]");
if (floatingTools) {
  const wechatToggle = floatingTools.querySelector("[data-wechat-toggle]");
  const popover = floatingTools.querySelector("[data-wechat-popover]");
  const topButton = floatingTools.querySelector("[data-scroll-top]");

  const setPopoverOpen = (open) => {
    if (!wechatToggle || !popover) return;
    wechatToggle.setAttribute("aria-expanded", String(open));
    popover.hidden = !open;
  };

  if (wechatToggle && popover) {
    wechatToggle.addEventListener("click", () => {
      const shouldOpen = wechatToggle.getAttribute("aria-expanded") !== "true";
      setPopoverOpen(shouldOpen);
    });

    floatingTools.addEventListener("mouseenter", () => setPopoverOpen(true));
    floatingTools.addEventListener("mouseleave", () => setPopoverOpen(false));
    floatingTools.addEventListener("focusin", () => setPopoverOpen(true));
    floatingTools.addEventListener("focusout", (event) => {
      if (!floatingTools.contains(event.relatedTarget)) {
        setPopoverOpen(false);
      }
    });
  }

  if (topButton) {
    topButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}
