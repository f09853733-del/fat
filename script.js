
const planets = [
  {
    name: "عطارد",
    en: "MERCURY",
    color: "#b6b6bd",
    glow: "#a9adb855",
    ball: "radial-gradient(circle at 30% 25%, #dedee3, #747782 65%, #424653)",
    diameter: "4,879 km",
    year: "88 روز",
    moons: "۰",
    desc: "نزدیک‌ترین سیاره به خورشید؛ جهانی سنگی با نوسان دمای بسیار زیاد."
  },
  {
    name: "زهره",
    en: "VENUS",
    color: "#e9b878",
    glow: "#e9b87855",
    ball: "radial-gradient(circle at 30% 25%, #fff0c9, #d69b56 55%, #855037)",
    diameter: "12,104 km",
    year: "225 روز",
    moons: "۰",
    desc: "جهانی پوشیده از ابرهای غلیظ که به دلیل اثر گلخانه‌ای بسیار داغ است."
  },
  {
    name: "زمین",
    en: "EARTH",
    color: "#58bfff",
    glow: "#58bfff66",
    ball: "radial-gradient(circle at 30% 25%, #7ef7ff, #2876db 50%, #14513e)",
    diameter: "12,742 km",
    year: "365 روز",
    moons: "۱",
    desc: "خانه ما و تنها جهانی که تاکنون وجود حیات در آن تأیید شده است."
  },
  {
    name: "مریخ",
    en: "MARS",
    color: "#f17863",
    glow: "#f1786355",
    ball: "radial-gradient(circle at 30% 25%, #ffc1a0, #d45b42 55%, #74332e)",
    diameter: "6,779 km",
    year: "687 روز",
    moons: "۲",
    desc: "سیاره سرخ با آتشفشان‌های عظیم، دره‌های عمیق و نشانه‌های آب باستانی."
  },
  {
    name: "مشتری",
    en: "JUPITER",
    color: "#d6ad8b",
    glow: "#d6ad8b55",
    ball: "repeating-linear-gradient(0deg, #bd8964 0 7px, #f2d4ac 8px 14px, #8f5d4d 15px 19px)",
    diameter: "139,820 km",
    year: "11.86 سال",
    moons: "۱۰۱+",
    desc: "بزرگ‌ترین سیاره منظومه شمسی، با طوفان‌های عظیم و قمرهای شگفت‌انگیز."
  },
  {
    name: "زحل",
    en: "SATURN",
    color: "#e5cc92",
    glow: "#e5cc9255",
    ball: "radial-gradient(circle at 30% 25%, #fff1bd, #d1ad6d 60%, #8d704b)",
    ring: true,
    diameter: "116,460 km",
    year: "29.4 سال",
    moons: "۲۷۴",
    desc: "غول گازی مشهور به حلقه‌های درخشان که از ذرات یخ و سنگ ساخته شده‌اند."
  },
  {
    name: "اورانوس",
    en: "URANUS",
    color: "#7ee9ed",
    glow: "#7ee9ed55",
    ball: "radial-gradient(circle at 30% 25%, #d4ffff, #70d4df 60%, #4389b2)",
    diameter: "50,724 km",
    year: "84 سال",
    moons: "۲۹",
    desc: "غول یخی آبی‌رنگ که محور چرخشش به‌شدت کج شده است."
  },
  {
    name: "نپتون",
    en: "NEPTUNE",
    color: "#668cff",
    glow: "#668cff66",
    ball: "radial-gradient(circle at 30% 25%, #9bc8ff, #315be5 55%, #182c86)",
    diameter: "49,244 km",
    year: "165 سال",
    moons: "۱۶",
    desc: "جهانی دوردست و سرد با بادهایی بسیار سریع در جو آن."
  }
];

const grid = document.getElementById("planetGrid");
const details = {
  name: document.getElementById("detailName"),
  description: document.getElementById("detailDescription"),
  diameter: document.getElementById("detailDiameter"),
  year: document.getElementById("detailYear"),
  moons: document.getElementById("detailMoons")
};

function showPlanet(index) {
  const planet = planets[index];

  details.name.textContent = `${planet.name} | ${planet.en}`;
  details.description.textContent = planet.desc;
  details.diameter.textContent = planet.diameter;
  details.year.textContent = planet.year;
  details.moons.textContent = planet.moons;

  document.querySelectorAll(".planet-card").forEach((card, i) => {
    card.classList.toggle("active", i === index);
    card.setAttribute("aria-pressed", String(i === index));
  });

  document.querySelector(".planet-count").textContent =
    `${String(index + 1).padStart(2, "0")} — 08`;
}

planets.forEach((planet, index) => {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "planet-card";
  card.style.setProperty("--planet-color", planet.color);
  card.style.setProperty("--planet-glow", planet.glow);
  card.setAttribute("aria-pressed", "false");
  card.setAttribute("aria-label", `نمایش اطلاعات ${planet.name}`);

  card.innerHTML = `
    <div class="planet-art">
      <div class="planet-ball ${planet.ring ? "ringed" : ""}"
           style="--ball:${planet.ball}"></div>
    </div>
    <h3>${planet.name}</h3>
    <p>${planet.en}</p>
    <div class="card-bottom">
      <span>قطر: ${planet.diameter}</span>
      <span>مشاهده ↗</span>
    </div>
  `;

  card.addEventListener("click", () => {
    showPlanet(index);
    document.getElementById("planetDetails").scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  });

  grid.appendChild(card);
});

showPlanet(2);

const missionMessages = [
