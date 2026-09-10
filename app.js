/* ==========================================================================
   제31회 강원초등교원체육대회 - 강릉교육지원청 전용 선수단 관리 시스템
   ========================================================================== */

// HTML Escaper Helper
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 1. Initial Default Seed Data for Gangneung Education Support Office
const GANGWON_REGIONS = [
  { id: "gangneung", name: "강릉교육지원청", quota: 34 }
];

const INITIAL_PLAYERS = {
  gangneung: [
    { id: "p1", school: "남산초등학교", position: "교장", name: "김석남", stay: true, dinner: false, soccer: false, jokgu: false, badminton: false, note: "", bGrade: "A", gender: "남" },
    { id: "p2", school: "금광초등학교", position: "교장", name: "김진홍", stay: true, dinner: false, soccer: false, jokgu: false, badminton: false, note: "", bGrade: "A", gender: "남" },
    { id: "p3", school: "주영초등학교", position: "교감", name: "박상우", stay: true, dinner: false, soccer: true, jokgu: false, badminton: false, note: "87년생이상(40대)", bGrade: "B", gender: "남" },
    { id: "p4", school: "연곡초등학교", position: "교감", name: "선민영", stay: true, dinner: false, soccer: true, jokgu: true, badminton: false, note: "87년생이상(40대)", bGrade: "B", gender: "남" },
    { id: "p5", school: "성산초등학교", position: "교감", name: "김지승", stay: true, dinner: false, soccer: true, jokgu: true, badminton: false, note: "87년생이상(40대)", bGrade: "B", gender: "남" },
    { id: "p6", school: "강릉초등학교", position: "교장", name: "고문석", stay: true, dinner: false, soccer: false, jokgu: true, badminton: false, note: "", bGrade: "A", gender: "남" },
    { id: "p7", school: "강릉교육지원청", position: "교육과장", name: "신창근", stay: true, dinner: false, soccer: false, jokgu: false, badminton: false, note: "고문님", bGrade: "A", gender: "남" },
    { id: "p8", school: "강릉교육지원청", position: "교육장", name: "강장혁", stay: false, dinner: false, soccer: false, jokgu: false, badminton: false, note: "단장", bGrade: "A", gender: "남" },
    { id: "p9", school: "강릉교육지원청", position: "장학사", name: "이정관", stay: false, dinner: false, soccer: false, jokgu: false, badminton: false, note: "주무", bGrade: "B", gender: "남" },
    { id: "p10", school: "노암초등학교", position: "교사", name: "김태익", stay: true, dinner: false, soccer: true, jokgu: false, badminton: false, note: "", bGrade: "B", gender: "남" },
    { id: "p11", school: "초당초등학교", position: "교사", name: "김남준", stay: true, dinner: false, soccer: true, jokgu: false, badminton: false, note: "", bGrade: "C", gender: "남" },
    { id: "p12", school: "남산초등학교", position: "교사", name: "김동수", stay: true, dinner: false, soccer: true, jokgu: false, badminton: false, note: "", bGrade: "C", gender: "남" },
    { id: "p13", school: "교동초등학교", position: "교사", name: "김종완", stay: true, dinner: false, soccer: true, jokgu: false, badminton: false, note: "", bGrade: "B", gender: "남" },
    { id: "p14", school: "경포초등학교", position: "교사", name: "남기민", stay: true, dinner: false, soccer: true, jokgu: true, badminton: false, note: "", bGrade: "C", gender: "남" },
    { id: "p15", school: "중앙초등학교", position: "교사", name: "백서현", stay: true, dinner: false, soccer: true, jokgu: false, badminton: false, note: "", bGrade: "C", gender: "남" },
    { id: "p16", school: "한솔초등학교", position: "교사", name: "신보식", stay: true, dinner: false, soccer: true, jokgu: false, badminton: false, note: "", bGrade: "D", gender: "남" },
    { id: "p17", school: "한솔초등학교", position: "교사", name: "정의석", stay: false, dinner: false, soccer: false, jokgu: true, badminton: true, note: "배드민턴 A조", bGrade: "A", gender: "남" },
    { id: "p18", school: "율곡초등학교", position: "교사", name: "이소연", stay: true, dinner: true, soccer: false, jokgu: false, badminton: true, note: "", bGrade: "B", gender: "여" },
    { id: "p19", school: "명주초등학교", position: "교사", name: "최은경", stay: true, dinner: true, soccer: false, jokgu: false, badminton: false, note: "", bGrade: "C", gender: "여" }
  ]
};

// Brackets Initial State with Default Blank Scores (status: "예정")
const INITIAL_BRACKETS_DATA = {
  jokgu: {
    groupA: [
      { id: "m1", match: "1코트 1경기 (13:30)", team1: "속초양양", team2: "홍천", score1: null, score2: null, winner: "", status: "예정" },
      { id: "m2", match: "1코트 2경기", team1: "속초양양", team2: "태백", score1: null, score2: null, winner: "", status: "예정" },
      { id: "m3", match: "1코트 3경기", team1: "홍천", team2: "양구", score1: null, score2: null, winner: "", status: "예정" },
      { id: "m4", match: "1코트 4경기", team1: "속초양양", team2: "양구", score1: null, score2: null, winner: "", status: "예정" },
      { id: "m5", match: "3코트 1경기 (13:30)", team1: "삼척", team2: "화천", score1: null, score2: null, winner: "", status: "예정" },
      { id: "m6", match: "3코트 2경기", team1: "삼척", team2: "동해", score1: null, score2: null, winner: "", status: "예정" },
      { id: "m7", match: "3코트 3경기", team1: "동해", team2: "평창", score1: null, score2: null, winner: "", status: "예정" },
      { id: "m8", match: "3코트 4경기", team1: "삼척", team2: "평창", score1: null, score2: null, winner: "", status: "예정" },
      { id: "m9", match: "4강 1경기", team1: "그룹① 1위", team2: "그룹② 2위", score1: null, score2: null, winner: "", status: "예정" },
      { id: "m10", match: "4강 2경기", team1: "그룹① 2위", team2: "그룹② 1위", score1: null, score2: null, winner: "", status: "예정" },
      { id: "m11", match: "결승전 (2코트)", team1: "1코트 승자", team2: "3코트 승자", score1: null, score2: null, winner: "", status: "예정" }
    ],
    groupB: [
      { id: "mb1", match: "5코트 1경기 (13:30)", team1: "고성", team2: "영월", score1: null, score2: null, winner: "", status: "예정" },
      { id: "mb2", match: "5코트 2경기", team1: "영월", team2: "철원", score1: null, score2: null, winner: "", status: "예정" },
      { id: "mb3", match: "5코트 3경기", team1: "고성", team2: "철원", score1: null, score2: null, winner: "", status: "예정" },
      { id: "mb4", match: "6코트 1경기 (13:30)", team1: "강릉", team2: "철원", score1: null, score2: null, winner: "", status: "예정" },
      { id: "mb5", match: "6코트 2경기", team1: "고성", team2: "강릉", score1: null, score2: null, winner: "", status: "예정" },
      { id: "mb6", match: "6코트 3경기", team1: "영월", team2: "강릉", score1: null, score2: null, winner: "", status: "예정" },
      { id: "mb7", match: "7코트 1경기 (13:30)", team1: "횡성", team2: "정선", score1: null, score2: null, winner: "", status: "예정" },
      { id: "mb8", match: "7코트 2경기", team1: "정선", team2: "인제", score1: null, score2: null, winner: "", status: "예정" },
      { id: "mb9", match: "7코트 3경기", team1: "횡성", team2: "인제", score1: null, score2: null, winner: "", status: "예정" },
      { id: "mb10", match: "8코트 1경기 (13:30)", team1: "원주", team2: "인제", score1: null, score2: null, winner: "", status: "예정" },
      { id: "mb11", match: "8코트 2경기", team1: "횡성", team2: "원주", score1: null, score2: null, winner: "", status: "예정" },
      { id: "mb12", match: "8코트 3경기", team1: "정선", team2: "원주", score1: null, score2: null, winner: "", status: "예정" },
      { id: "mb13", match: "4강 1경기 (5코트)", team1: "그룹① 1위", team2: "그룹② 2위", score1: null, score2: null, winner: "", status: "예정" },
      { id: "mb14", match: "4강 2경기 (7코트)", team1: "그룹① 2위", team2: "그룹② 1위", score1: null, score2: null, winner: "", status: "예정" },
      { id: "mb15", match: "결승전 (6코트)", team1: "5코트 승자", team2: "7코트 승자", score1: null, score2: null, winner: "", status: "예정" }
    ]
  },
  soccer: {
    groupA: [
      { id: "s1", match: "강원대 1경기 (09:00)", team1: "속초양양", team2: "영월", score1: null, score2: null, winner: "", status: "예정" },
      { id: "s2", match: "강원대 2경기 (09:45)", team1: "횡성", team2: "원주", score1: null, score2: null, winner: "", status: "예정" },
      { id: "s3", match: "강원대 3경기 (10:30)", team1: "속초양양", team2: "횡성", score1: null, score2: null, winner: "", status: "예정" },
      { id: "s4", match: "강원대 4경기 (11:15)", team1: "영월", team2: "원주", score1: null, score2: null, winner: "", status: "예정" },
      { id: "s5", match: "삼척복합C 1경기 (08:40)", team1: "평창", team2: "화천", score1: null, score2: null, winner: "", status: "예정" },
      { id: "s6", match: "삼척복합C 2경기 (09:25)", team1: "홍천", team2: "태백", score1: null, score2: null, winner: "", status: "예정" },
      { id: "s7", match: "삼척복합C 3경기 (10:10)", team1: "평창", team2: "동해", score1: null, score2: null, winner: "", status: "예정" },
      { id: "s8", match: "삼척복합C 4경기 (10:55)", team1: "화천", team2: "태백", score1: null, score2: null, winner: "", status: "예정" },
      { id: "s9", match: "삼척복합C 5경기 (11:40)", team1: "동해", team2: "홍천", score1: null, score2: null, winner: "", status: "예정" },
      { id: "s10", match: "4강전 (13:30)", team1: "강원대 승자", team2: "삼척복합C 승자", score1: null, score2: null, winner: "", status: "예정" },
      { id: "s11", match: "결승전 (15:00 - 강원대)", team1: "A조 결승 진출팀1", team2: "A조 결승 진출팀2", score1: null, score2: null, winner: "", status: "예정" }
    ],
    groupB: [
      { id: "sb1", match: "삼척복합A 1경기 (09:00)", team1: "정선", team2: "강릉", score1: null, score2: null, winner: "", status: "예정" },
      { id: "sb2", match: "삼척복합A 2경기 (09:45)", team1: "고성", team2: "양구", score1: null, score2: null, winner: "", status: "예정" },
      { id: "sb3", match: "삼척복합A 3경기 (10:30)", team1: "정선", team2: "양구", score1: null, score2: null, winner: "", status: "예정" },
      { id: "sb4", match: "삼척복합A 4경기 (11:15)", team1: "강릉", team2: "고성", score1: null, score2: null, winner: "", status: "예정" },
      { id: "sb5", match: "삼척복합B 1경기 (09:00)", team1: "삼척", team2: "춘천", score1: null, score2: null, winner: "", status: "예정" },
      { id: "sb6", match: "삼척복합B 2경기 (09:45)", team1: "철원", team2: "인제", score1: null, score2: null, winner: "", status: "예정" },
      { id: "sb7", match: "삼척복합B 3경기 (10:30)", team1: "삼척", team2: "인제", score1: null, score2: null, winner: "", status: "예정" },
      { id: "sb8", match: "삼척복합B 4경기 (11:15)", team1: "춘천", team2: "철원", score1: null, score2: null, winner: "", status: "예정" },
      { id: "sb9", match: "4강전 (13:30)", team1: "복합A 승자", team2: "복합B 승자", score1: null, score2: null, winner: "", status: "예정" },
      { id: "sb10", match: "결승전 (15:00 - 삼척복합A)", team1: "B조 결승 진출팀1", team2: "B조 결승 진출팀2", score1: null, score2: null, winner: "", status: "예정" }
    ]
  },
  badminton: {
    groupA: [
      { id: "b1", match: "A조 예선 1경기 (10:00)", team1: "속초양양3 (A조)", team2: "홍천 (A조)", score1: null, score2: null, winner: "", status: "예정" },
      { id: "b2", match: "A조 예선 2경기 (11:00)", team1: "춘천 (A조)", team2: "속초양양2 (A조)", score1: null, score2: null, winner: "", status: "예정" },
      { id: "b3", match: "A조 4강전 (14:00)", team1: "A조 예선 1위", team2: "A조 예선 4위", score1: null, score2: null, winner: "", status: "예정" },
      { id: "b4", match: "A조 결승전 (15:00)", team1: "4강 1경기 승자", team2: "4강 2경기 승자", score1: null, score2: null, winner: "", status: "예정" }
    ],
    groupB: [
      { id: "bb1", match: "B조 예선 1경기 (10:00)", team1: "속초양양 (B조)", team2: "동해 (B조)", score1: null, score2: null, winner: "", status: "예정" },
      { id: "bb2", match: "B조 예선 2경기 (11:00)", team1: "강릉 (B조)", team2: "인제 (B조)", score1: null, score2: null, winner: "", status: "예정" },
      { id: "bb3", match: "B조 4강전 (14:00)", team1: "B조 예선 1위", team2: "B조 예선 4위", score1: null, score2: null, winner: "", status: "예정" },
      { id: "bb4", match: "B조 결승전 (15:00)", team1: "4강 1경기 승자", team2: "4강 2경기 승자", score1: null, score2: null, winner: "", status: "예정" }
    ]
  }
};

// 2. Global State Variables
let currentTab = "overview";
let currentCategoryFilter = "all";
let currentBracketSport = "jokgu";
let currentSortField = null;
let currentSortDir = "asc";
let currentDiningFilterDate = "all";
let playerDataStore = {};
let bracketsDataStore = {};
let diningPlacesDataStore = [];
let lodgingPlacesDataStore = [];

const INITIAL_DINING_PLACES = [
  {
    id: "d1",
    date: "10.24",
    dateLabel: "10월 24일(토)",
    mealType: "석식 만찬",
    name: "강원대 삼척캠퍼스 대운동장 연회장",
    address: "강원 삼척시 중앙로 346 강원대학교 삼척캠퍼스",
    phone: "033-570-7114",
    note: "개회식 및 족구 경기 종료 후 공식 석식 만찬 장소입니다.",
    category: "공식만찬"
  },
  {
    id: "d2",
    date: "10.24",
    dateLabel: "10월 24일(토)",
    mealType: "석식 모임",
    name: "삼척 항구 회센터 / 쏠비치 인근 구역",
    address: "강원 삼척시 수로부인길 453",
    phone: "033-570-0000",
    note: "지회별 자체 단체 회식 및 교류 모임 구역입니다.",
    category: "자체모임"
  },
  {
    id: "d3",
    date: "10.25",
    dateLabel: "10월 25일(일)",
    mealType: "중식",
    name: "삼척복합체육공원 구내식당 / 정식당",
    address: "강원 삼척시 교동 산28-1",
    phone: "033-570-3900",
    note: "축구 참가 선수단 및 임원 중식 식사 제공 장소 (12:30~13:30)",
    category: "선수단중식"
  },
  {
    id: "d4",
    date: "10.25",
    dateLabel: "10월 25일(일)",
    mealType: "중식",
    name: "진주초등학교 체육관 휴게실",
    address: "강원 삼척시 진주로 45",
    phone: "033-573-2283",
    note: "배드민턴 참가 선수단 도시락 제공 및 휴식 구역 (12:30~13:30)",
    category: "선수단중식"
  }
];

const INITIAL_LODGING_PLACES = [
  {
    id: "l1",
    name: "삼척 쏠비치 리조트",
    address: "강원 삼척시 수로부인길 453",
    phone: "1588-4888",
    category: "임원/선수단",
    note: "10.24(토) 강릉지회 임원 및 본부 숙박 지정 리조트 (15:00 입실)"
  },
  {
    id: "l2",
    name: "삼척 관광호텔 (삼척 온천)",
    address: "강원 삼척시 우지길 49",
    phone: "033-570-8800",
    category: "선수단 숙소",
    note: "경기장 차량 10분 거리, 객실 단체 지정 예약 완료 구역"
  },
  {
    id: "l3",
    name: "삼척 맹방 해변 펜션단지",
    address: "강원 삼척시 근덕면 맹방해변로 12",
    phone: "033-572-0000",
    category: "지회 숙소",
    note: "선수단 대형 주차 공간 확보 및 사전 입실 가능"
  }
];

// Load State from LocalStorage (with backward-compatible recovery across versions)
function initStore() {
  const possibleKeys = [
    "GANGWON_PE_STORE_GANGNEUNG_V6",
    "GANGWON_PE_STORE_GANGNEUNG_V5",
    "GANGWON_PE_STORE_GANGNEUNG_V4",
    "GANGWON_PE_STORE_GANGNEUNG_V3",
    "GANGWON_PE_STORE_GANGNEUNG_V2",
    "GANGWON_PE_STORE_GANGNEUNG_V1",
    "GANGWON_PE_STORE_GANGNEUNG",
    "gangwon_pe_players"
  ];

  let restoredData = null;
  for (const key of possibleKeys) {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) {
          if (parsed.gangneung && Array.isArray(parsed.gangneung) && parsed.gangneung.length > 0) {
            restoredData = parsed;
            break;
          } else if (Array.isArray(parsed) && parsed.length > 0) {
            restoredData = { gangneung: parsed };
            break;
          }
        }
      } catch(e) {}
    }
  }

  if (restoredData) {
    playerDataStore = restoredData;
  } else {
    playerDataStore = INITIAL_PLAYERS;
  }
  saveStore();

  const savedBrackets = localStorage.getItem("GANGWON_BRACKETS_STORE_V8");
  if (savedBrackets) {
    try {
      bracketsDataStore = JSON.parse(savedBrackets);
    } catch(e) {
      bracketsDataStore = INITIAL_BRACKETS_DATA;
    }
  } else {
    bracketsDataStore = INITIAL_BRACKETS_DATA;
    saveBracketsStore();
  }

  initDiningStore();
  initLodgingStore();
}

function initDiningStore() {
  const savedDining = localStorage.getItem("GANGWON_DINING_STORE_V1");
  if (savedDining) {
    try {
      diningPlacesDataStore = JSON.parse(savedDining);
    } catch(e) {
      diningPlacesDataStore = INITIAL_DINING_PLACES;
    }
  } else {
    diningPlacesDataStore = INITIAL_DINING_PLACES;
    saveDiningStore();
  }
}

function saveDiningStore() {
  localStorage.setItem("GANGWON_DINING_STORE_V1", JSON.stringify(diningPlacesDataStore));
}

function initLodgingStore() {
  const savedLodging = localStorage.getItem("GANGWON_LODGING_STORE_V1");
  if (savedLodging) {
    try {
      lodgingPlacesDataStore = JSON.parse(savedLodging);
    } catch(e) {
      lodgingPlacesDataStore = INITIAL_LODGING_PLACES;
    }
  } else {
    lodgingPlacesDataStore = INITIAL_LODGING_PLACES;
    saveLodgingStore();
  }
}

function saveLodgingStore() {
  localStorage.setItem("GANGWON_LODGING_STORE_V1", JSON.stringify(lodgingPlacesDataStore));
}

function saveStore() {
  localStorage.setItem("GANGWON_PE_STORE_GANGNEUNG_V6", JSON.stringify(playerDataStore));
}

function saveBracketsStore() {
  localStorage.setItem("GANGWON_BRACKETS_STORE_V8", JSON.stringify(bracketsDataStore));
}

// 3. Tab Switcher Function
function switchTab(tabId) {
  currentTab = tabId;
  document.querySelectorAll(".tab-content").forEach(el => el.style.display = "none");
  document.querySelectorAll(".nav-tab").forEach(el => el.classList.remove("active"));
  
  const targetContent = document.getElementById("tab-" + tabId);
  if (targetContent) targetContent.style.display = "block";
  
  const targetTab = document.querySelector(`.nav-tab[data-tab="${tabId}"]`);
  if (targetTab) targetTab.classList.add("active");

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (tabId === "roster") renderRosterPage();
  if (tabId === "brackets") renderBracketsPage();
  if (tabId === "venues") {
    renderDiningPlaces(currentDiningFilterDate);
    renderLodgingPlaces();
  }
}

// 4. D-Day Countdown Calculation
function updateCountdown() {
  const eventDate = new Date("2026-10-24T00:00:00");
  const now = new Date();
  const diffTime = eventDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const badge = document.getElementById("countdown-badge");
  if (badge) {
    if (diffDays > 0) badge.textContent = `D-${diffDays}`;
    else if (diffDays === 0) badge.textContent = `D-Day (오늘 개막)`;
    else badge.textContent = `대회 종료`;
  }
}

// 5. Category Filter Toggle Function
function setCategoryFilter(category) {
  currentCategoryFilter = category;
  document.querySelectorAll("#roster-category-toggles .sub-view-btn").forEach(btn => btn.classList.remove("active"));
  const activeBtn = document.getElementById("view-btn-" + category);
  if (activeBtn) activeBtn.classList.add("active");
  renderRosterTable();
}

// 6. Roster Page Functions
function renderRosterPage() {
  renderRosterTable();
}

function getDuplicateNameCounts(players) {
  const counts = {};
  (players || []).forEach(p => {
    const name = (p.name || '').trim();
    if (name) counts[name] = (counts[name] || 0) + 1;
  });
  return counts;
}

function renderNameCellHtml(p, duplicateCounts, fontColor) {
  const name = (p.name || '').trim();
  const dupCount = duplicateCounts[name] || 0;
  const isDup = dupCount > 1;

  return `
    <td>
      <div style="display:flex; align-items:center; gap:4px;">
        <input type="text" class="cell-direct-input ${isDup ? 'is-duplicate' : ''}" style="font-weight:700; color:${fontColor || 'var(--color-ink)'};" value="${escapeHtml(p.name)}" placeholder="성명" oninput="updatePlayerDirect('${p.id}', 'name', this.value)" onchange="renderRosterTable()">
        ${isDup ? `<span class="badge-duplicate-name" title="동명이인 ${dupCount}명 등록됨">⚠️ 중복(${dupCount})</span>` : ''}
      </div>
    </td>
  `;
}

function updateRosterStats() {
  const players = playerDataStore.gangneung || [];

  let totalCount = players.length;
  let adminCount = players.filter(p => ["교장", "교감", "교육장", "교육과장", "장학사", "전문직", "고문", "고문님"].includes(p.position) || (p.note || '').includes("고문") || (p.note || '').includes("관리자")).length;
  let stayCount = players.filter(p => p.stay).length;
  let dinnerCount = players.filter(p => p.dinner).length;
  let soccerCount = players.filter(p => p.soccer || p.soccerM).length;
  let jokguCount = players.filter(p => p.jokgu).length;
  let badmintonCount = players.filter(p => p.badminton).length;

  if (document.getElementById("stat-total")) document.getElementById("stat-total").textContent = `${totalCount}명`;
  if (document.getElementById("stat-admin")) document.getElementById("stat-admin").textContent = `${adminCount}명`;
  if (document.getElementById("stat-stay")) document.getElementById("stat-stay").textContent = `${stayCount}명`;
  if (document.getElementById("stat-dinner")) document.getElementById("stat-dinner").textContent = `${dinnerCount}명`;
  if (document.getElementById("stat-soccer")) document.getElementById("stat-soccer").textContent = `${soccerCount}명`;
  if (document.getElementById("stat-jokgu")) document.getElementById("stat-jokgu").textContent = `${jokguCount}명`;
  if (document.getElementById("stat-badminton")) document.getElementById("stat-badminton").textContent = `${badmintonCount}명`;

  const btnAll = document.getElementById("view-btn-all");
  const btnSoccer = document.getElementById("view-btn-soccer");
  const btnJokgu = document.getElementById("view-btn-jokgu");
  const btnBadminton = document.getElementById("view-btn-badminton");
  const btnDuplicate = document.getElementById("view-btn-duplicate");

  const duplicateCounts = getDuplicateNameCounts(players);
  const dupNamesList = Object.keys(duplicateCounts).filter(n => duplicateCounts[n] > 1);
  const totalDuplicatePlayers = players.filter(p => dupNamesList.includes((p.name || '').trim())).length;

  if (btnAll) btnAll.textContent = `전체 참가인원 (${totalCount}명)`;
  if (btnSoccer) btnSoccer.textContent = `축구 참여인원 (${soccerCount}명)`;
  if (btnJokgu) btnJokgu.textContent = `족구 참여인원 (${jokguCount}명)`;
  if (btnBadminton) btnBadminton.textContent = `배드민턴 참여인원 (${badmintonCount}명)`;
  if (btnDuplicate) {
    if (totalDuplicatePlayers > 0) {
      btnDuplicate.style.display = "inline-flex";
      btnDuplicate.textContent = `⚠️ 중복 이름 (${totalDuplicatePlayers}명)`;
    } else {
      btnDuplicate.style.display = "none";
    }
  }
}

function updatePlayerDirect(playerId, field, value) {
  if (!ensureAdminAuthorized()) return;
  const players = playerDataStore.gangneung || [];
  const player = players.find(p => p.id === playerId);
  if (player) {
    player[field] = value.trim();
    saveStore();
    updateRosterStats();
  }
}

// Drag and Drop State & Handler Functions
let draggedRowId = null;
let touchDraggedRow = null;
let touchClone = null;

function renderDragHandleHtml(playerId) {
  return `
    <td class="drag-handle cell-center" title="드래그하거나 화살표로 순서 변경">
      <div style="display:flex; align-items:center; justify-content:center; gap:2px;">
        <button type="button" class="btn-move-step" onclick="movePlayerStep('${playerId}', -1, event)" title="위로 이동">▲</button>
        <span class="drag-grip" title="드래그하여 이동">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; opacity:0.6;"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
        </span>
        <button type="button" class="btn-move-step" onclick="movePlayerStep('${playerId}', 1, event)" title="아래로 이동">▼</button>
      </div>
    </td>
  `;
}

function movePlayerOrder(draggedId, targetId) {
  if (!draggedId || !targetId || draggedId === targetId) return;
  const players = playerDataStore.gangneung || [];
  const fromIndex = players.findIndex(p => p.id === draggedId);
  const toIndex = players.findIndex(p => p.id === targetId);
  if (fromIndex === -1 || toIndex === -1) return;

  const [movedPlayer] = players.splice(fromIndex, 1);
  players.splice(toIndex, 0, movedPlayer);

  saveStore();
  renderRosterTable();
}

function movePlayerStep(playerId, direction, event) {
  if (event) event.stopPropagation();
  const players = playerDataStore.gangneung || [];

  let list = players;
  if (currentCategoryFilter === "soccer") {
    list = players.filter(p => p.soccerM || p.soccerW);
  } else if (currentCategoryFilter === "jokgu") {
    list = players.filter(p => p.jokgu);
  } else if (currentCategoryFilter === "badminton") {
    list = players.filter(p => p.badminton);
  }

  const filteredIdx = list.findIndex(p => p.id === playerId);
  if (filteredIdx === -1) return;
  const targetFilteredIdx = filteredIdx + direction;
  if (targetFilteredIdx < 0 || targetFilteredIdx >= list.length) return;

  const targetPlayerId = list[targetFilteredIdx].id;
  movePlayerOrder(playerId, targetPlayerId);
}

function setupRowDragEvents(tr) {
  tr.addEventListener('dragstart', (e) => {
    draggedRowId = tr.dataset.id;
    tr.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', tr.dataset.id);
  });

  tr.addEventListener('dragend', () => {
    tr.classList.remove('dragging');
    document.querySelectorAll('.roster-row').forEach(row => row.classList.remove('drag-over'));
    draggedRowId = null;
  });

  tr.addEventListener('dragover', (e) => {
    e.preventDefault();
    if (!draggedRowId || draggedRowId === tr.dataset.id) return;
    e.dataTransfer.dropEffect = 'move';

    document.querySelectorAll('.roster-row').forEach(row => {
      if (row !== tr) row.classList.remove('drag-over');
    });
    tr.classList.add('drag-over');
  });

  tr.addEventListener('dragleave', () => {
    tr.classList.remove('drag-over');
  });

  tr.addEventListener('drop', (e) => {
    e.preventDefault();
    tr.classList.remove('drag-over');
    const targetId = tr.dataset.id;
    if (draggedRowId && targetId && draggedRowId !== targetId) {
      movePlayerOrder(draggedRowId, targetId);
    }
  });

  const grip = tr.querySelector('.drag-grip');
  if (grip) {
    grip.addEventListener('touchstart', (e) => {
      touchDraggedRow = tr;
      draggedRowId = tr.dataset.id;
      tr.classList.add('dragging');

      const touch = e.touches[0];
      const rect = tr.getBoundingClientRect();

      touchClone = tr.cloneNode(true);
      touchClone.style.position = 'fixed';
      touchClone.style.top = (touch.clientY - 20) + 'px';
      touchClone.style.left = rect.left + 'px';
      touchClone.style.width = rect.width + 'px';
      touchClone.style.opacity = '0.85';
      touchClone.style.pointerEvents = 'none';
      touchClone.style.zIndex = '9999';
      touchClone.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
      touchClone.style.background = '#ffffff';
      document.body.appendChild(touchClone);
    }, { passive: true });

    grip.addEventListener('touchmove', (e) => {
      if (!touchDraggedRow || !touchClone) return;

      const touch = e.touches[0];
      touchClone.style.top = (touch.clientY - 20) + 'px';

      const elementUnder = document.elementFromPoint(touch.clientX, touch.clientY);
      const targetTr = elementUnder?.closest('.roster-row');

      document.querySelectorAll('.roster-row').forEach(row => row.classList.remove('drag-over'));
      if (targetTr && targetTr !== touchDraggedRow) {
        targetTr.classList.add('drag-over');
      }

      if (e.cancelable) e.preventDefault();
    }, { passive: false });

    grip.addEventListener('touchend', (e) => {
      if (!touchDraggedRow) return;

      if (touchClone) {
        touchClone.remove();
        touchClone = null;
      }

      touchDraggedRow.classList.remove('dragging');

      const touch = e.changedTouches[0];
      const elementUnder = document.elementFromPoint(touch.clientX, touch.clientY);
      const targetTr = elementUnder?.closest('.roster-row');

      document.querySelectorAll('.roster-row').forEach(row => row.classList.remove('drag-over'));

      if (targetTr && draggedRowId && targetTr.dataset.id && draggedRowId !== targetTr.dataset.id) {
        movePlayerOrder(draggedRowId, targetTr.dataset.id);
      }

      touchDraggedRow = null;
      draggedRowId = null;
    });
  }
}

function initRosterDragAndDrop() {
  const rows = document.querySelectorAll('#roster-table tbody .roster-row');
  rows.forEach(tr => setupRowDragEvents(tr));
}

function sortByField(field) {
  if (currentSortField === field) {
    if (currentSortDir === 'asc') {
      currentSortDir = 'desc';
    } else {
      currentSortField = null;
      currentSortDir = 'asc';
    }
  } else {
    currentSortField = field;
    currentSortDir = 'asc';
  }

  if (currentSortField) {
    const players = playerDataStore.gangneung || [];
    players.sort((a, b) => {
      const valA = (a[currentSortField] || "").trim();
      const valB = (b[currentSortField] || "").trim();
      let cmp = valA.localeCompare(valB, 'ko');
      if (cmp === 0) {
        cmp = (a.name || "").trim().localeCompare((b.name || "").trim(), 'ko');
      }
      return currentSortDir === 'asc' ? cmp : -cmp;
    });
    saveStore();
  }

  renderRosterTable();
}

function getSortIndicator(field) {
  if (currentSortField !== field) return `<span style="font-size:11px; color:var(--color-ink-muted); opacity:0.4; margin-left:3px;">↕</span>`;
  return currentSortDir === 'asc' 
    ? `<span style="font-size:11px; color:var(--color-primary); margin-left:3px; font-weight:bold;">▲</span>` 
    : `<span style="font-size:11px; color:var(--color-primary); margin-left:3px; font-weight:bold;">▼</span>`;
}

function renderRosterTable() {
  const players = playerDataStore.gangneung || [];
  updateRosterStats();

  const duplicateCounts = getDuplicateNameCounts(players);
  const dupNamesList = Object.keys(duplicateCounts).filter(n => duplicateCounts[n] > 1);
  const totalDuplicatePlayersCount = players.filter(p => dupNamesList.includes((p.name || '').trim())).length;

  const soccerTotalCount = players.filter(p => p.soccerM || p.soccerW).length;
  const jokguCount = players.filter(p => p.jokgu).length;
  const badmintonCount = players.filter(p => p.badminton).length;

  const categoryTitleEl = document.getElementById("active-category-title");
  if (categoryTitleEl) {
    if (currentCategoryFilter === "soccer") categoryTitleEl.textContent = `축구 참여인원 명단 (${soccerTotalCount}명)`;
    else if (currentCategoryFilter === "jokgu") categoryTitleEl.textContent = `족구 참여인원 명단 (${jokguCount}명)`;
    else if (currentCategoryFilter === "badminton") categoryTitleEl.textContent = `배드민턴 참여인원 명단 (${badmintonCount}명)`;
    else if (currentCategoryFilter === "duplicate") categoryTitleEl.textContent = `⚠️ 동명이인 중복 선수 명단 (${totalDuplicatePlayersCount}명)`;
    else categoryTitleEl.textContent = `전체 참가인원 명단 (${players.length}명)`;
  }

  const searchQuery = (document.getElementById("roster-search")?.value || "").trim().toLowerCase();
  let categoryFiltered = players;

  if (currentCategoryFilter === "soccer") {
    categoryFiltered = players.filter(p => p.soccerM || p.soccerW);
  } else if (currentCategoryFilter === "jokgu") {
    categoryFiltered = players.filter(p => p.jokgu);
  } else if (currentCategoryFilter === "badminton") {
    categoryFiltered = players.filter(p => p.badminton);
  } else if (currentCategoryFilter === "duplicate") {
    categoryFiltered = players.filter(p => dupNamesList.includes((p.name || '').trim()));
  }

  const filteredPlayers = categoryFiltered.filter(p => 
    (p.name || '').toLowerCase().includes(searchQuery) ||
    (p.school || '').toLowerCase().includes(searchQuery) ||
    (p.position || '').toLowerCase().includes(searchQuery)
  );

  const tableEl = document.getElementById("roster-table");
  if (!tableEl) return;

  const positionOptions = ["교사", "교장", "교감", "교육장", "교육과장", "장학사", "전문직", "고문님"];

  if (currentCategoryFilter === "all" || currentCategoryFilter === "duplicate") {
    tableEl.innerHTML = `
      <thead>
        <tr>
          <th class="cell-center" style="width:55px;">이동</th>
          <th style="width:40px;">연번</th>
          <th onclick="sortByField('school')" style="min-width:125px; cursor:pointer; user-select:none;" title="클릭하여 학교별 정렬">소속(학교) ${getSortIndicator('school')}</th>
          <th onclick="sortByField('position')" style="min-width:85px; cursor:pointer; user-select:none;" title="클릭하여 직위별 정렬">직위 ${getSortIndicator('position')}</th>
          <th onclick="sortByField('name')" style="min-width:140px; cursor:pointer; user-select:none;" title="클릭하여 성명별 정렬">성명 ${getSortIndicator('name')}</th>
          <th class="cell-center" style="min-width:45px;">숙박</th>
          <th class="cell-center" style="min-width:65px;">24일만찬</th>
          <th class="cell-center" style="min-width:45px;">족구</th>
          <th class="cell-center" style="min-width:55px;">축구</th>
          <th class="cell-center" style="min-width:60px;">배드민턴</th>
          <th style="min-width:120px;">비고</th>
          <th class="cell-center" style="min-width:45px;">삭제</th>
        </tr>
      </thead>
      <tbody>
        ${filteredPlayers.map((p, idx) => `
          <tr class="roster-row" draggable="true" data-id="${p.id}">
            ${renderDragHandleHtml(p.id)}
            <td class="cell-center" style="font-weight:600; color:var(--color-ink-muted);">${idx + 1}</td>
            <td>
              <input type="text" class="cell-direct-input" value="${escapeHtml(p.school)}" placeholder="학교명" oninput="updatePlayerDirect('${p.id}', 'school', this.value)">
            </td>
            <td>
              <select class="cell-direct-select" onchange="updatePlayerDirect('${p.id}', 'position', this.value)">
                ${positionOptions.map(pos => `<option value="${pos}" ${p.position === pos ? 'selected' : ''}>${pos}</option>`).join("")}
                ${!positionOptions.includes(p.position) ? `<option value="${escapeHtml(p.position)}" selected>${escapeHtml(p.position)}</option>` : ''}
              </select>
            </td>
            ${renderNameCellHtml(p, duplicateCounts, 'var(--color-ink)')}
            <td class="cell-center"><input type="checkbox" ${p.stay ? 'checked' : ''} onchange="togglePlayerField('${p.id}', 'stay')"></td>
            <td class="cell-center"><input type="checkbox" ${p.dinner ? 'checked' : ''} onchange="togglePlayerField('${p.id}', 'dinner')"></td>
            <td class="cell-center"><input type="checkbox" ${p.jokgu ? 'checked' : ''} onchange="togglePlayerField('${p.id}', 'jokgu')"></td>
            <td class="cell-center"><input type="checkbox" ${p.soccer || p.soccerM ? 'checked' : ''} onchange="togglePlayerField('${p.id}', 'soccer')"></td>
            <td class="cell-center"><input type="checkbox" ${p.badminton ? 'checked' : ''} onchange="togglePlayerField('${p.id}', 'badminton')"></td>
            <td>
              <input type="text" class="cell-direct-input" style="font-size:12px; color:var(--color-ink-muted);" value="${escapeHtml(p.note || '')}" placeholder="비고 입력" oninput="updatePlayerDirect('${p.id}', 'note', this.value)">
            </td>
            <td class="cell-center">
              <button class="admin-only" onclick="deletePlayer('${p.id}')" style="background:none; border:none; color:var(--color-danger); cursor:pointer; font-size:18px; padding:2px 6px;" title="삭제">&times;</button>
            </td>
          </tr>
        `).join("")}
        ${filteredPlayers.length === 0 ? `<tr><td colspan="12" class="cell-center" style="padding:24px; color:var(--color-ink-muted);">${currentCategoryFilter === 'duplicate' ? '중복된 이름의 선수가 없습니다. 모든 이름이 고유합니다. 🎉' : '등록된 선수가 없습니다. \'선수 추가\' 버튼을 눌러 추가하세요.'}</td></tr>` : ''}
      </tbody>
    `;
  } else if (currentCategoryFilter === "soccer") {
    tableEl.innerHTML = `
      <thead>
        <tr>
          <th class="cell-center" style="width:55px;">이동</th>
          <th style="width:40px;">연번</th>
          <th onclick="sortByField('school')" style="min-width:125px; cursor:pointer; user-select:none;" title="클릭하여 학교별 정렬">소속(학교) ${getSortIndicator('school')}</th>
          <th onclick="sortByField('position')" style="min-width:85px; cursor:pointer; user-select:none;" title="클릭하여 직위별 정렬">직위 ${getSortIndicator('position')}</th>
          <th onclick="sortByField('name')" style="min-width:140px; cursor:pointer; user-select:none;" title="클릭하여 성명별 정렬">성명 ${getSortIndicator('name')}</th>
          <th class="cell-center" style="min-width:70px;">구분</th>
          <th class="cell-center" style="min-width:65px;">숙박 여부</th>
          <th class="cell-center" style="min-width:65px;">24일 만찬</th>
          <th style="min-width:120px;">비고 (연령 등)</th>
          <th class="cell-center" style="min-width:45px;">삭제</th>
        </tr>
      </thead>
      <tbody>
        ${filteredPlayers.map((p, idx) => `
          <tr class="roster-row" draggable="true" data-id="${p.id}">
            ${renderDragHandleHtml(p.id)}
            <td class="cell-center" style="font-weight:600; color:var(--color-ink-muted);">${idx + 1}</td>
            <td><input type="text" class="cell-direct-input" value="${escapeHtml(p.school)}" oninput="updatePlayerDirect('${p.id}', 'school', this.value)"></td>
            <td>
              <select class="cell-direct-select" onchange="updatePlayerDirect('${p.id}', 'position', this.value)">
                ${positionOptions.map(pos => `<option value="${pos}" ${p.position === pos ? 'selected' : ''}>${pos}</option>`).join("")}
              </select>
            </td>
            ${renderNameCellHtml(p, duplicateCounts, 'var(--color-primary)')}
            <td class="cell-center">
              ${p.soccerM ? '<span style="background:rgba(0,102,204,0.1); color:var(--color-primary); padding:2px 8px; border-radius:9999px; font-weight:600; font-size:11px;">축구(남)</span>' : ''}
              ${p.soccerW ? '<span style="background:rgba(175,82,222,0.1); color:#af52de; padding:2px 8px; border-radius:9999px; font-weight:600; font-size:11px;">축구(여)</span>' : ''}
            </td>
            <td class="cell-center"><input type="checkbox" ${p.stay ? 'checked' : ''} onchange="togglePlayerField('${p.id}', 'stay')"></td>
            <td class="cell-center"><input type="checkbox" ${p.dinner ? 'checked' : ''} onchange="togglePlayerField('${p.id}', 'dinner')"></td>
            <td><input type="text" class="cell-direct-input" style="font-size:12px; color:var(--color-ink-muted);" value="${escapeHtml(p.note || '')}" placeholder="비고" oninput="updatePlayerDirect('${p.id}', 'note', this.value)"></td>
            <td class="cell-center">
              <button class="admin-only" onclick="deletePlayer('${p.id}')" style="background:none; border:none; color:var(--color-danger); cursor:pointer; font-size:18px;" title="삭제">&times;</button>
            </td>
          </tr>
        `).join("")}
        ${filteredPlayers.length === 0 ? `<tr><td colspan="10" class="cell-center" style="padding:24px; color:var(--color-ink-muted);">축구 출전 표시된 선수가 없습니다. '전체 참가인원' 탭에서 축구 항목을 체크하세요.</td></tr>` : ''}
      </tbody>
    `;
  } else if (currentCategoryFilter === "jokgu") {
    tableEl.innerHTML = `
      <thead>
        <tr>
          <th class="cell-center" style="width:55px;">이동</th>
          <th style="width:40px;">연번</th>
          <th onclick="sortByField('school')" style="min-width:125px; cursor:pointer; user-select:none;" title="클릭하여 학교별 정렬">소속(학교) ${getSortIndicator('school')}</th>
          <th onclick="sortByField('position')" style="min-width:85px; cursor:pointer; user-select:none;" title="클릭하여 직위별 정렬">직위 ${getSortIndicator('position')}</th>
          <th onclick="sortByField('name')" style="min-width:140px; cursor:pointer; user-select:none;" title="클릭하여 성명별 정렬">성명 ${getSortIndicator('name')}</th>
          <th class="cell-center" style="min-width:110px;">선수 자격 (교원2명 이상)</th>
          <th class="cell-center" style="min-width:65px;">숙박 여부</th>
          <th class="cell-center" style="min-width:65px;">24일 만찬</th>
          <th style="min-width:120px;">비고</th>
          <th class="cell-center" style="min-width:45px;">삭제</th>
        </tr>
      </thead>
      <tbody>
        ${filteredPlayers.map((p, idx) => `
          <tr class="roster-row" draggable="true" data-id="${p.id}">
            ${renderDragHandleHtml(p.id)}
            <td class="cell-center" style="font-weight:600; color:var(--color-ink-muted);">${idx + 1}</td>
            <td><input type="text" class="cell-direct-input" value="${escapeHtml(p.school)}" oninput="updatePlayerDirect('${p.id}', 'school', this.value)"></td>
            <td>
              <select class="cell-direct-select" onchange="updatePlayerDirect('${p.id}', 'position', this.value)">
                ${positionOptions.map(pos => `<option value="${pos}" ${p.position === pos ? 'selected' : ''}>${pos}</option>`).join("")}
              </select>
            </td>
            ${renderNameCellHtml(p, duplicateCounts, '#ff9500')}
            <td class="cell-center">
              ${["교장", "교감", "전문직", "교육장", "교육과장", "장학사", "고문", "고문님"].includes(p.position) ? '<span style="background:rgba(255,149,0,0.1); color:#ff9500; font-weight:700; padding:2px 8px; border-radius:9999px; font-size:11px;">고문님/관리자 규정 충족</span>' : '<span style="color:var(--color-ink-muted); font-size:11px;">일반 교사</span>'}
            </td>
            <td class="cell-center"><input type="checkbox" ${p.stay ? 'checked' : ''} onchange="togglePlayerField('${p.id}', 'stay')"></td>
            <td class="cell-center"><input type="checkbox" ${p.dinner ? 'checked' : ''} onchange="togglePlayerField('${p.id}', 'dinner')"></td>
            <td><input type="text" class="cell-direct-input" style="font-size:12px; color:var(--color-ink-muted);" value="${escapeHtml(p.note || '')}" placeholder="비고" oninput="updatePlayerDirect('${p.id}', 'note', this.value)"></td>
            <td class="cell-center">
              <button class="admin-only" onclick="deletePlayer('${p.id}')" style="background:none; border:none; color:var(--color-danger); cursor:pointer; font-size:18px;" title="삭제">&times;</button>
            </td>
          </tr>
        `).join("")}
        ${filteredPlayers.length === 0 ? `<tr><td colspan="10" class="cell-center" style="padding:24px; color:var(--color-ink-muted);">족구 출전 표시된 선수가 없습니다. '전체 참가인원' 탭에서 족구 항목을 체크하세요.</td></tr>` : ''}
      </tbody>
    `;
  } else if (currentCategoryFilter === "badminton") {
    tableEl.innerHTML = `
      <thead>
        <tr>
          <th class="cell-center" style="width:55px;">이동</th>
          <th style="width:40px;">연번</th>
          <th class="cell-center" style="min-width:65px;">출전급수</th>
          <th onclick="sortByField('school')" style="min-width:125px; cursor:pointer; user-select:none;" title="클릭하여 학교별 정렬">학교 / 기관 ${getSortIndicator('school')}</th>
          <th onclick="sortByField('position')" style="min-width:85px; cursor:pointer; user-select:none;" title="클릭하여 직위별 정렬">직위 ${getSortIndicator('position')}</th>
          <th onclick="sortByField('name')" style="min-width:140px; cursor:pointer; user-select:none;" title="클릭하여 성명별 정렬">성명 ${getSortIndicator('name')}</th>
          <th class="cell-center" style="min-width:45px;">성별</th>
          <th class="cell-center" style="min-width:55px;">등급</th>
          <th class="cell-center" style="min-width:45px;">숙박</th>
          <th style="min-width:120px;">비고</th>
          <th class="cell-center" style="min-width:45px;">삭제</th>
        </tr>
      </thead>
      <tbody>
        ${filteredPlayers.map((p, idx) => `
          <tr class="roster-row" draggable="true" data-id="${p.id}">
            ${renderDragHandleHtml(p.id)}
            <td class="cell-center" style="font-weight:600; color:var(--color-ink-muted);">${idx + 1}</td>
            <td class="cell-center"><span style="background:rgba(52,199,89,0.1); color:#34c759; font-weight:700; padding:2px 8px; border-radius:9999px; font-size:11px;">${p.bGrade === 'A' || p.bGrade === 'B' ? 'A조' : 'B조'}</span></td>
            <td><input type="text" class="cell-direct-input" value="${escapeHtml(p.school)}" oninput="updatePlayerDirect('${p.id}', 'school', this.value)"></td>
            <td>
              <select class="cell-direct-select" onchange="updatePlayerDirect('${p.id}', 'position', this.value)">
                ${positionOptions.map(pos => `<option value="${pos}" ${p.position === pos ? 'selected' : ''}>${pos}</option>`).join("")}
              </select>
            </td>
            ${renderNameCellHtml(p, duplicateCounts, '#34c759')}
            <td class="cell-center">${p.gender || '남'}</td>
            <td class="cell-center"><span style="font-weight:600; color:var(--color-primary);">${p.bGrade || 'A'}등급</span></td>
            <td class="cell-center"><input type="checkbox" ${p.stay ? 'checked' : ''} onchange="togglePlayerField('${p.id}', 'stay')"></td>
            <td><input type="text" class="cell-direct-input" style="font-size:12px; color:var(--color-ink-muted);" value="${escapeHtml(p.note || '')}" placeholder="비고" oninput="updatePlayerDirect('${p.id}', 'note', this.value)"></td>
            <td class="cell-center">
              <button class="admin-only" onclick="deletePlayer('${p.id}')" style="background:none; border:none; color:var(--color-danger); cursor:pointer; font-size:18px;" title="삭제">&times;</button>
            </td>
          </tr>
        `).join("")}
        ${filteredPlayers.length === 0 ? `<tr><td colspan="11" class="cell-center" style="padding:24px; color:var(--color-ink-muted);">배드민턴 출전 표시된 선수가 없습니다. '전체 참가인원' 탭에서 배드민턴 항목을 체크하세요.</td></tr>` : ''}
      </tbody>
    `;
  }

  initRosterDragAndDrop();
}

// Duplicate Name Modal Handler
function checkDuplicateNamesModal() {
  const players = playerDataStore.gangneung || [];
  const duplicateCounts = getDuplicateNameCounts(players);
  const dupNames = Object.keys(duplicateCounts).filter(n => duplicateCounts[n] > 1);

  const container = document.getElementById("duplicate-modal-content");
  if (!container) return;

  if (dupNames.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:24px 12px; color:var(--color-success);">
        <h4 style="font-size:16px; font-weight:700; color:var(--color-ink); margin-bottom:6px;">✅ 중복된 이름이 없습니다</h4>
        <p style="font-size:13px; color:var(--color-ink-muted);">모든 참가 선수의 성명이 고유하며 중복 등록된 인원이 없습니다.</p>
      </div>
    `;
  } else {
    let html = `
      <div style="background:rgba(255,149,0,0.08); border:1px solid rgba(255,149,0,0.3); border-radius:var(--radius-md); padding:12px 14px; margin-bottom:16px; font-size:13px;">
        <strong style="color:#d97706; display:block; margin-bottom:4px;">⚠️ 총 ${dupNames.length}개 성명 (${players.filter(p => dupNames.includes((p.name||'').trim())).length}명) 중복 발견</strong>
        동일한 이름을 가진 선수가 검색되었습니다. 실수로 중복 등록되었거나 동명이인인지 확인해 보세요.
      </div>
      <div style="display:flex; flex-direction:column; gap:12px; max-height:360px; overflow-y:auto; padding-right:4px;">
    `;

    dupNames.forEach(name => {
      const matched = players.filter(p => (p.name || '').trim() === name);
      html += `
        <div style="background:var(--color-parchment); border:1px solid var(--color-hairline); border-radius:var(--radius-md); padding:12px;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
            <span style="font-size:15px; font-weight:700; color:var(--color-ink);">'${escapeHtml(name)}' <span style="font-size:12px; color:#d97706; font-weight:600;">(${matched.length}명)</span></span>
            <button class="btn-utility" style="font-size:11px; padding:3px 8px;" onclick="closeDuplicateModal(); setCategoryFilter('duplicate');">명단에서 보기</button>
          </div>
          <div style="display:flex; flex-direction:column; gap:6px;">
            ${matched.map(p => `
              <div style="display:flex; align-items:center; justify-content:space-between; background:#ffffff; padding:6px 10px; border-radius:6px; border:1px solid var(--color-hairline); font-size:12px;">
                <div>
                  <strong>${escapeHtml(p.school)}</strong> · ${escapeHtml(p.position)}
                  <span style="color:var(--color-ink-muted); margin-left:6px;">
                    (${[p.soccer || p.soccerM ? '축구' : '', p.jokgu ? '족구' : '', p.badminton ? '배드민턴' : ''].filter(Boolean).join(', ') || '종목미참가'})
                  </span>
                </div>
                <div style="display:flex; gap:4px;">
                  <button class="btn-utility" style="font-size:11px; padding:2px 6px;" onclick="closeDuplicateModal(); editPlayer('${p.id}');">수정</button>
                  <button class="btn-utility" style="font-size:11px; padding:2px 6px; color:var(--color-danger);" onclick="deletePlayer('${p.id}'); checkDuplicateNamesModal();">삭제</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  }

  if (window.lucide) lucide.createIcons();
  document.getElementById("duplicate-modal").classList.add("active");
}

function closeDuplicateModal() {
  document.getElementById("duplicate-modal").classList.remove("active");
}

function filterRosterTable() {
  renderRosterTable();
}

function togglePlayerField(playerId, field) {
  if (!ensureAdminAuthorized()) return;
  const players = playerDataStore.gangneung || [];
  const player = players.find(p => p.id === playerId);
  if (player) {
    player[field] = !player[field];
    saveStore();
    renderRosterTable();
  }
}

function deletePlayer(playerId) {
  if (!ensureAdminAuthorized()) return;
  if (confirm("정말 이 선수 정보를 삭제하시겠습니까?")) {
    playerDataStore.gangneung = (playerDataStore.gangneung || []).filter(p => p.id !== playerId);
    saveStore();
    renderRosterTable();
  }
}

// 7. Add / Edit Player Modal Logic
function openAddPlayerModal() {
  if (!ensureAdminAuthorized()) return;
  document.getElementById("form-player-id").value = "";
  document.getElementById("modal-player-title").textContent = "신규 선수 등록";
  document.getElementById("btn-save-player").textContent = "저장하기";
  document.getElementById("player-form").reset();
  document.getElementById("player-modal").classList.add("active");
}

function editPlayer(playerId) {
  const players = playerDataStore.gangneung || [];
  const p = players.find(x => x.id === playerId);
  if (!p) return;

  document.getElementById("form-player-id").value = p.id;
  document.getElementById("form-school").value = p.school || "";
  document.getElementById("form-position").value = p.position || "교사";
  document.getElementById("form-name").value = p.name || "";
  document.getElementById("form-jokgu").checked = !!p.jokgu;
  if (document.getElementById("form-soccer")) document.getElementById("form-soccer").checked = !!(p.soccer || p.soccerM);
  document.getElementById("form-badminton").checked = !!p.badminton;
  document.getElementById("form-stay").checked = !!p.stay;
  document.getElementById("form-dinner").checked = !!p.dinner;
  document.getElementById("form-note").value = p.note || "";

  document.getElementById("modal-player-title").textContent = `${p.name} 선수 정보 수정`;
  document.getElementById("btn-save-player").textContent = "수정 완료";
  document.getElementById("player-modal").classList.add("active");
}

function closePlayerModal() {
  document.getElementById("player-modal").classList.remove("active");
}

function savePlayerForm(e) {
  e.preventDefault();
  const editId = document.getElementById("form-player-id").value;

  if (!playerDataStore.gangneung) playerDataStore.gangneung = [];

  const schoolVal = document.getElementById("form-school").value.trim();
  const positionVal = document.getElementById("form-position").value;
  const nameVal = document.getElementById("form-name").value.trim();
  const jokguVal = document.getElementById("form-jokgu").checked;
  const soccerVal = document.getElementById("form-soccer") ? document.getElementById("form-soccer").checked : false;
  const badmintonVal = document.getElementById("form-badminton").checked;
  const stayVal = document.getElementById("form-stay").checked;
  const dinnerVal = document.getElementById("form-dinner").checked;
  const noteVal = document.getElementById("form-note").value.trim();

  if (editId) {
    const player = playerDataStore.gangneung.find(p => p.id === editId);
    if (player) {
      player.school = schoolVal;
      player.position = positionVal;
      player.name = nameVal;
      player.jokgu = jokguVal;
      player.soccer = soccerVal;
      delete player.soccerM;
      delete player.soccerW;
      player.badminton = badmintonVal;
      player.stay = stayVal;
      player.dinner = dinnerVal;
      player.note = noteVal;
    }
  } else {
    const newPlayer = {
      id: "p_" + Date.now(),
      school: schoolVal,
      position: positionVal,
      name: nameVal,
      jokgu: jokguVal,
      soccer: soccerVal,
      badminton: badmintonVal,
      stay: stayVal,
      dinner: dinnerVal,
      note: noteVal,
      bGrade: "A",
      gender: "남"
    };
    playerDataStore.gangneung.push(newPlayer);
  }

  saveStore();
  closePlayerModal();
  renderRosterPage();
}

// 8. Excel Import & Export Functions
function triggerExcelUpload() {
  const input = document.getElementById("excel-file-input");
  if (input) {
    input.value = ""; // reset
    input.click();
  }
}

function downloadExcelTemplate() {
  if (typeof XLSX === 'undefined') {
    alert("엑셀 라이브러리가 로드되지 않았습니다. 잠시 후 다시 시도해주세요.");
    return;
  }

  const templateData = [
    {
      "연번": 1,
      "소속(학교)": "강릉초",
      "직위": "교사",
      "성명": "홍길동",
      "성별": "남",
      "참가종목": "축구",
      "숙박여부": "O",
      "24일석식만찬": "O",
      "연락처": "010-1234-5678",
      "비고": "예시데이터"
    },
    {
      "연번": 2,
      "소속(학교)": "율곡초",
      "직위": "교감",
      "성명": "김철수",
      "성별": "남",
      "참가종목": "족구",
      "숙박여부": "X",
      "24일석식만찬": "O",
      "연락처": "010-9876-5432",
      "비고": ""
    },
    {
      "연번": 3,
      "소속(학교)": "경포초",
      "직위": "고문",
      "성명": "이영희",
      "성별": "여",
      "참가종목": "배드민턴",
      "숙박여부": "O",
      "24일석식만찬": "X",
      "연락처": "010-5555-7777",
      "비고": "고문님"
    }
  ];

  const ws = XLSX.utils.json_to_sheet(templateData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "선수단명단양식");
  XLSX.writeFile(wb, "강릉교육지원청_선수단_등록양식.xlsx");
}

function handleExcelUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (typeof XLSX === 'undefined') {
    alert("엑셀 라이브러리가 로드되지 않았습니다. 인터넷 연결을 확인해주세요.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

      if (!rows || rows.length === 0) {
        alert("업로드한 엑셀 파일에 데이터가 없습니다.");
        return;
      }

      let addedCount = 0;
      let updatedCount = 0;
      const players = playerDataStore.gangneung;

      rows.forEach((row) => {
        // Find name & school keys (case-insensitive & multiple aliases)
        const nameKey = Object.keys(row).find(k => /성명|이름|선수명|Name/i.test(k));
        const name = nameKey ? String(row[nameKey]).trim() : '';

        if (!name) return; // 이름 없는 행 스킵

        const schoolKey = Object.keys(row).find(k => /소속|학교|School/i.test(k));
        const school = schoolKey ? String(row[schoolKey]).trim() : '강릉교육지원청';

        const posKey = Object.keys(row).find(k => /직위|직급|Position/i.test(k));
        const position = posKey ? String(row[posKey]).trim() : '교사';

        const genderKey = Object.keys(row).find(k => /성별|Gender/i.test(k));
        const gender = genderKey ? String(row[genderKey]).trim() : '남';

        const sportKey = Object.keys(row).find(k => /종목|참가종목|Sport/i.test(k));
        const sportVal = sportKey ? String(row[sportKey]).trim() : '';

        // Check specific sport columns if available
        const jokguKey = Object.keys(row).find(k => /^족구$/i.test(k));
        const soccerKey = Object.keys(row).find(k => /^축구$/i.test(k));
        const badmKey = Object.keys(row).find(k => /^배드민턴$/i.test(k));

        const checkBool = (val) => {
          if (!val) return false;
          const s = String(val).trim().toUpperCase();
          return s === 'O' || s === 'Y' || s === '예' || s === 'TRUE' || s === '1' || s === '참여';
        };

        const isJokgu = checkBool(row[jokguKey]) || /족구/i.test(sportVal);
        const isSoccer = checkBool(row[soccerKey]) || /축구/i.test(sportVal);
        const isBadminton = checkBool(row[badmKey]) || /배드민턴/i.test(sportVal);

        const stayKey = Object.keys(row).find(k => /숙박/i.test(k));
        const isStay = checkBool(row[stayKey]);

        const dinnerKey = Object.keys(row).find(k => /석식|만찬|식사/i.test(k));
        const isDinner = checkBool(row[dinnerKey]);

        const phoneKey = Object.keys(row).find(k => /연락처|전화|Phone/i.test(k));
        const phone = phoneKey ? String(row[phoneKey]).trim() : '';

        const noteKey = Object.keys(row).find(k => /비고|Note/i.test(k));
        const note = noteKey ? String(row[noteKey]).trim() : '';

        // Check existing player by Name + School
        const existingIndex = players.findIndex(p => p.name === name && p.school === school);

        if (existingIndex >= 0) {
          // Update existing
          players[existingIndex].position = position || players[existingIndex].position;
          players[existingIndex].gender = gender || players[existingIndex].gender;
          if (isJokgu) players[existingIndex].jokgu = true;
          if (isSoccer) { players[existingIndex].soccer = true; players[existingIndex].soccerM = true; }
          if (isBadminton) players[existingIndex].badminton = true;
          if (stayKey) players[existingIndex].stay = isStay;
          if (dinnerKey) players[existingIndex].dinner = isDinner;
          if (phone) players[existingIndex].phone = phone;
          if (note) players[existingIndex].note = note;
          updatedCount++;
        } else {
          // Create new player
          const newPlayer = {
            id: Date.now() + Math.random().toString(36).substr(2, 5),
            name: name,
            school: school,
            position: position,
            gender: gender,
            jokgu: isJokgu,
            soccer: isSoccer,
            soccerM: isSoccer,
            badminton: isBadminton,
            stay: isStay,
            dinner: isDinner,
            phone: phone,
            note: note
          };
          players.push(newPlayer);
          addedCount++;
        }
      });

      saveStore();
      renderRosterPage();
      alert(`🎉 엑셀 업로드 완료!\n신규 등록: ${addedCount}명 / 기존 수정: ${updatedCount}명`);
    } catch (err) {
      console.error("Excel Read Error:", err);
      alert("엑셀 파일을 읽는 중 오류가 발생했습니다. 올바른 엑셀 양식인지 확인해 주세요.");
    }
  };

  reader.readAsArrayBuffer(file);
}

function exportToCSV() {
  const players = playerDataStore.gangneung || [];
  if (players.length === 0) {
    alert("내보낼 선수 명단 데이터가 없습니다.");
    return;
  }

  if (typeof XLSX !== 'undefined') {
    // Generate clean XLSX file
    const exportData = players.map((p, idx) => ({
      "연번": idx + 1,
      "소속(학교)": p.school || '',
      "직위": p.position || '',
      "성명": p.name || '',
      "성별": p.gender || '남',
      "숙박여부": p.stay ? 'O' : 'X',
      "24일석식만찬": p.dinner ? 'O' : 'X',
      "족구": p.jokgu ? 'O' : 'X',
      "축구": (p.soccer || p.soccerM) ? 'O' : 'X',
      "배드민턴": p.badminton ? 'O' : 'X',
      "연락처": p.phone || '',
      "비고": p.note || ''
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "선수단명단");
    XLSX.writeFile(wb, `제31회_강원초등교원체육대회_강릉선수단명단.xlsx`);
  } else {
    // Fallback to CSV
    let csvContent = "\uFEFF연번,소속(학교),직위,성명,성별,숙박여부,24일석식만찬,족구,축구,배드민턴,연락처,비고\n";
    players.forEach((p, idx) => {
      csvContent += `${idx + 1},"${p.school}","${p.position}","${p.name}","${p.gender || '남'}",${p.stay ? 'O' : 'X'},${p.dinner ? 'O' : 'X'},${p.jokgu ? 'O' : 'X'},${p.soccer || p.soccerM ? 'O' : 'X'},${p.badminton ? 'O' : 'X'},"${p.phone || ''}","${p.note || ''}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `제31회_강원초등교원체육대회_강릉선수단명단.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// 9. Brackets Page Functions (Direct In-Place Score Inputs)
function switchSportBracket(sport) {
  currentBracketSport = sport;
  document.getElementById("bracket-btn-jokgu").classList.toggle("active", sport === "jokgu");
  document.getElementById("bracket-btn-soccer").classList.toggle("active", sport === "soccer");
  document.getElementById("bracket-btn-badminton").classList.toggle("active", sport === "badminton");
  renderBracketsPage();
}

function renderBracketsPage() {
  const area = document.getElementById("bracket-render-area");
  if (!area) return;

  const sportNames = { jokgu: "족구", soccer: "축구", badminton: "배드민턴" };
  const data = bracketsDataStore[currentBracketSport] || INITIAL_BRACKETS_DATA[currentBracketSport];
  const sportTitle = sportNames[currentBracketSport] || "종목";

  let html = `<div class="bracket-container">`;

  // Group A Bracket Card
  html += `
    <div class="bracket-group-card">
      <div class="bracket-group-header">
        <h3 class="display-md" style="font-size:18px; margin:0;">${sportTitle} - A조 대진표</h3>
        <span style="font-size:12px; color:var(--color-primary); font-weight:600;">스코어 직접 입력 가능</span>
      </div>
      <div class="match-grid">
        ${data.groupA.map(m => renderMatchCardHtml(m)).join("")}
      </div>
    </div>
  `;

  // Group B Bracket Card
  html += `
    <div class="bracket-group-card">
      <div class="bracket-group-header">
        <h3 class="display-md" style="font-size:18px; margin:0;">${sportTitle} - B조 대진표</h3>
        <span style="font-size:12px; color:var(--color-primary); font-weight:600;">스코어 직접 입력 가능</span>
      </div>
      <div class="match-grid">
        ${data.groupB.map(m => renderMatchCardHtml(m)).join("")}
      </div>
    </div>
  `;

  html += `</div>`;
  area.innerHTML = html;
}

function renderMatchCardHtml(m) {
  const isFinished = m.status === "종료" || m.status === "우승";
  const hasScores = m.score1 !== null && m.score2 !== null;

  return `
    <div class="match-card">
      <div class="match-header">
        <span>${m.match}</span>
        <span style="font-weight:600; color:${isFinished ? 'var(--color-success)' : 'var(--color-ink-light)'};">
          ${isFinished ? (m.winner ? `승: ${m.winner}` : '경기 종료') : '경기 예정'}
        </span>
      </div>

      <div class="match-team-row ${hasScores && m.winner === m.team1 ? 'winner' : ''}">
        <span style="font-weight:500;">${escapeHtml(m.team1)}</span>
        <input type="number" class="score-direct-input" value="${m.score1 !== null ? m.score1 : ''}" placeholder="-" min="0" max="99" onchange="updateMatchScoreDirect('${m.id}', 1, this.value)">
      </div>

      <div class="match-team-row ${hasScores && m.winner === m.team2 ? 'winner' : ''}">
        <span style="font-weight:500;">${escapeHtml(m.team2)}</span>
        <input type="number" class="score-direct-input" value="${m.score2 !== null ? m.score2 : ''}" placeholder="-" min="0" max="99" onchange="updateMatchScoreDirect('${m.id}', 2, this.value)">
      </div>
    </div>
  `;
}

function updateMatchScoreDirect(matchId, teamIndex, value) {
  const sportData = bracketsDataStore[currentBracketSport];
  if (!sportData) return;

  let match = (sportData.groupA || []).find(m => m.id === matchId) || (sportData.groupB || []).find(m => m.id === matchId);
  if (!match) return;

  const valStr = (value || "").trim();
  const valNum = valStr === "" ? null : parseInt(valStr, 10);

  if (teamIndex === 1) match.score1 = (valNum === null || isNaN(valNum)) ? null : valNum;
  if (teamIndex === 2) match.score2 = (valNum === null || isNaN(valNum)) ? null : valNum;

  if (match.score1 === null || match.score2 === null) {
    match.winner = "";
    match.status = "예정";
  } else {
    match.status = "종료";
    if (match.score1 > match.score2) match.winner = match.team1;
    else if (match.score2 > match.score1) match.winner = match.team2;
    else match.winner = "무승부";
  }

  saveBracketsStore();
  renderBracketsPage();
}

// 10. Dining Venues Management Logic
function filterDiningPlaces(dateFilter) {
  currentDiningFilterDate = dateFilter;
  renderDiningPlaces(dateFilter);
}

function renderDiningPlaces(filterDate = 'all') {
  const area = document.getElementById("dining-places-render-area");
  if (!area) return;

  const btnAll = document.getElementById("dining-btn-all");
  const btn24 = document.getElementById("dining-btn-24");
  const btn25 = document.getElementById("dining-btn-25");
  if (btnAll) btnAll.classList.toggle("active", filterDate === "all");
  if (btn24) btn24.classList.toggle("active", filterDate === "10.24");
  if (btn25) btn25.classList.toggle("active", filterDate === "10.25");

  let list = diningPlacesDataStore || [];
  if (filterDate !== "all") {
    list = list.filter(d => d.date === filterDate);
  }

  if (list.length === 0) {
    area.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:40px; background:var(--color-surface); border-radius:var(--radius-md); color:var(--color-ink-muted);">
        <p style="font-size:15px; margin-bottom:8px;">등록된 식사 장소가 없습니다.</p>
        <span style="font-size:12px;">오른쪽 상단의 '식사 장소 추가' 버튼을 눌러 10.24(토) 또는 10.25(일) 식사 장소를 등록하세요.</span>
      </div>
    `;
    return;
  }

  area.innerHTML = list.map(d => {
    const is24 = d.date === "10.24";
    const badgeBg = is24 ? "#ff9500" : "var(--color-primary)";
    const mapQuery = encodeURIComponent(d.address || d.name);

    return `
      <div class="venue-card" style="border:1px solid rgba(0,0,0,0.06); display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div class="venue-header-banner" style="background:var(--color-surface);">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
              <span class="venue-badge" style="background:${badgeBg}; font-weight:700;">${escapeHtml(d.dateLabel || d.date)} · ${escapeHtml(d.mealType || '식사')}</span>
              <div style="display:flex; align-items:center; gap:6px;">
                <button class="btn-secondary admin-only" style="font-size:11.5px; padding:3px 9px;" onclick="editDiningPlace('${d.id}')">✏️ 수정</button>
                <button class="admin-only" onclick="deleteDiningPlace('${d.id}')" style="background:none; border:none; color:var(--color-danger); cursor:pointer; font-size:18px; padding:0 4px;" title="식사 장소 삭제">&times;</button>
              </div>
            </div>
            <h3 style="font-size:18px; font-weight:700; color:var(--color-ink); margin-top:6px;">${escapeHtml(d.name)}</h3>
          </div>
          <div class="venue-body" style="padding:16px 20px 8px 20px;">
            <p style="font-size:13px; color:var(--color-ink); margin-bottom:8px;">📍 <strong>주소:</strong> ${escapeHtml(d.address || '주소 미입력')}</p>
            ${d.phone ? `<p style="font-size:13px; color:var(--color-ink-muted); margin-bottom:8px;">📞 <strong>연락처:</strong> ${escapeHtml(d.phone)}</p>` : ''}
            <div style="background:var(--color-parchment); padding:10px 12px; border-radius:var(--radius-sm); font-size:12.5px; margin-top:10px; line-height:1.5;">
              <strong>안내 및 비고:</strong><br>
              ${escapeHtml(d.note || '별도 비고 없음')}
            </div>
          </div>
        </div>
        <div style="padding:0 20px 20px 20px;">
          <button class="btn-secondary" style="width:100%; font-size:12.5px;" onclick="window.open('https://map.naver.com/v5/search/${mapQuery}', '_blank')">🗺️ 네이버 지도에서 길찾기</button>
        </div>
      </div>
    `;
  }).join("");
}

function openAddDiningModal() {
  if (!ensureAdminAuthorized()) return;
  const form = document.getElementById("dining-modal-form");
  if (form) form.reset();
  document.getElementById("dining-form-id").value = "";
  document.getElementById("modal-dining-title").textContent = "🍽️ 식사 장소 추가 등록";
  document.getElementById("btn-save-dining").textContent = "장소 저장하기";
  document.getElementById("dining-modal")?.classList.add("active");
}

function editDiningPlace(id) {
  if (!ensureAdminAuthorized()) return;
  const item = (diningPlacesDataStore || []).find(x => x.id === id);
  if (!item) return;

  document.getElementById("dining-form-id").value = item.id;
  document.getElementById("dining-form-date").value = item.date || "10.24";
  document.getElementById("dining-form-meal").value = item.mealType || "석식 만찬";
  document.getElementById("dining-form-name").value = item.name || "";
  document.getElementById("dining-form-address").value = item.address || "";
  document.getElementById("dining-form-phone").value = item.phone || "";
  document.getElementById("dining-form-category").value = item.category || "";
  document.getElementById("dining-form-note").value = item.note || "";

  document.getElementById("modal-dining-title").textContent = "✏️ 식사 장소 정보 수정";
  document.getElementById("btn-save-dining").textContent = "수정 완료";
  document.getElementById("dining-modal")?.classList.add("active");
}

function closeDiningModal() {
  document.getElementById("dining-modal")?.classList.remove("active");
}

function saveDiningFromModal() {
  const diningId = document.getElementById("dining-form-id").value;
  const dateVal = document.getElementById("dining-form-date").value;
  const mealVal = document.getElementById("dining-form-meal").value;
  const nameVal = (document.getElementById("dining-form-name").value || "").trim();
  const addressVal = (document.getElementById("dining-form-address").value || "").trim();
  const phoneVal = (document.getElementById("dining-form-phone").value || "").trim();
  const categoryVal = (document.getElementById("dining-form-category").value || "").trim();
  const noteVal = (document.getElementById("dining-form-note").value || "").trim();

  if (!nameVal || !addressVal) {
    alert("식당/장소명과 주소를 입력해주세요.");
    return;
  }

  const dateLabel = dateVal === "10.24" ? "10월 24일(토)" : "10월 25일(일)";

  if (diningId) {
    const item = (diningPlacesDataStore || []).find(x => x.id === diningId);
    if (item) {
      item.date = dateVal;
      item.dateLabel = dateLabel;
      item.mealType = mealVal;
      item.name = nameVal;
      item.address = addressVal;
      item.phone = phoneVal;
      item.category = categoryVal || "식사안내";
      item.note = noteVal;
    }
  } else {
    const newItem = {
      id: "dining_" + Date.now(),
      date: dateVal,
      dateLabel: dateLabel,
      mealType: mealVal,
      name: nameVal,
      address: addressVal,
      phone: phoneVal,
      category: categoryVal || "식사안내",
      note: noteVal
    };
    diningPlacesDataStore.unshift(newItem);
  }

  saveDiningStore();
  closeDiningModal();
  renderDiningPlaces(currentDiningFilterDate);
}

function deleteDiningPlace(id) {
  if (!ensureAdminAuthorized()) return;
  if (!confirm("선택한 식사 장소를 삭제하시겠습니까?")) return;
  diningPlacesDataStore = diningPlacesDataStore.filter(x => x.id !== id);
  saveDiningStore();
  renderDiningPlaces(currentDiningFilterDate);
}

// 11. Lodging Venues Management Logic
function renderLodgingPlaces() {
  const area = document.getElementById("lodging-places-render-area");
  if (!area) return;

  let list = lodgingPlacesDataStore || [];
  if (list.length === 0) {
    area.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:40px; background:var(--color-surface); border-radius:var(--radius-md); color:var(--color-ink-muted);">
        <p style="font-size:15px; margin-bottom:8px;">등록된 숙소 정보가 없습니다.</p>
        <span style="font-size:12px;">'숙소 추가' 버튼을 눌러 선수단 숙박 장소를 등록하세요.</span>
      </div>
    `;
    return;
  }

  area.innerHTML = list.map(l => {
    const mapQuery = encodeURIComponent(l.address || l.name);

    return `
      <div class="venue-card" style="border:1px solid rgba(0,0,0,0.06); display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div class="venue-header-banner" style="background:var(--color-surface);">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
              <span class="venue-badge" style="background:#af52de; font-weight:700;">🏨 ${escapeHtml(l.category || '숙소')}</span>
              <div style="display:flex; align-items:center; gap:6px;">
                <button class="btn-secondary admin-only" style="font-size:11.5px; padding:3px 9px;" onclick="editLodgingPlace('${l.id}')">✏️ 수정</button>
                <button class="admin-only" onclick="deleteLodgingPlace('${l.id}')" style="background:none; border:none; color:var(--color-danger); cursor:pointer; font-size:18px; padding:0 4px;" title="숙소 삭제">&times;</button>
              </div>
            </div>
            <h3 style="font-size:18px; font-weight:700; color:var(--color-ink); margin-top:6px;">${escapeHtml(l.name)}</h3>
          </div>
          <div class="venue-body" style="padding:16px 20px 8px 20px;">
            <p style="font-size:13px; color:var(--color-ink); margin-bottom:8px;">📍 <strong>주소:</strong> ${escapeHtml(l.address || '주소 미입력')}</p>
            ${l.phone ? `<p style="font-size:13px; color:var(--color-ink-muted); margin-bottom:8px;">📞 <strong>연락처:</strong> ${escapeHtml(l.phone)}</p>` : ''}
            <div style="background:var(--color-parchment); padding:10px 12px; border-radius:var(--radius-sm); font-size:12.5px; margin-top:10px; line-height:1.5;">
              <strong>안내 및 예약 정보:</strong><br>
              ${escapeHtml(l.note || '별도 안내사항 없음')}
            </div>
          </div>
        </div>
        <div style="padding:0 20px 20px 20px;">
          <button class="btn-secondary" style="width:100%; font-size:12.5px;" onclick="window.open('https://map.naver.com/v5/search/${mapQuery}', '_blank')">🗺️ 네이버 지도에서 길찾기</button>
        </div>
      </div>
    `;
  }).join("");
}

function openAddLodgingModal() {
  if (!ensureAdminAuthorized()) return;
  const form = document.getElementById("lodging-modal-form");
  if (form) form.reset();
  document.getElementById("lodging-form-id").value = "";
  document.getElementById("modal-lodging-title").textContent = "🏨 숙소 정보 추가 등록";
  document.getElementById("btn-save-lodging").textContent = "숙소 저장하기";
  document.getElementById("lodging-modal")?.classList.add("active");
}

function editLodgingPlace(id) {
  if (!ensureAdminAuthorized()) return;
  const item = (lodgingPlacesDataStore || []).find(x => x.id === id);
  if (!item) return;

  document.getElementById("lodging-form-id").value = item.id;
  document.getElementById("lodging-form-name").value = item.name || "";
  document.getElementById("lodging-form-address").value = item.address || "";
  document.getElementById("lodging-form-phone").value = item.phone || "";
  document.getElementById("lodging-form-category").value = item.category || "";
  document.getElementById("lodging-form-note").value = item.note || "";

  document.getElementById("modal-lodging-title").textContent = "✏️ 숙소 정보 수정";
  document.getElementById("btn-save-lodging").textContent = "수정 완료";
  document.getElementById("lodging-modal")?.classList.add("active");
}

function closeLodgingModal() {
  document.getElementById("lodging-modal")?.classList.remove("active");
}

function saveLodgingFromModal() {
  if (!ensureAdminAuthorized()) return;
  const lodgingId = document.getElementById("lodging-form-id").value;
  const nameVal = (document.getElementById("lodging-form-name").value || "").trim();
  const addressVal = (document.getElementById("lodging-form-address").value || "").trim();
  const phoneVal = (document.getElementById("lodging-form-phone").value || "").trim();
  const categoryVal = (document.getElementById("lodging-form-category").value || "").trim();
  const noteVal = (document.getElementById("lodging-form-note").value || "").trim();

  if (!nameVal || !addressVal) {
    alert("숙소명과 주소를 입력해주세요.");
    return;
  }

  if (lodgingId) {
    const item = (lodgingPlacesDataStore || []).find(x => x.id === lodgingId);
    if (item) {
      item.name = nameVal;
      item.address = addressVal;
      item.phone = phoneVal;
      item.category = categoryVal || "선수단 숙소";
      item.note = noteVal;
    }
  } else {
    const newItem = {
      id: "lodging_" + Date.now(),
      name: nameVal,
      address: addressVal,
      phone: phoneVal,
      category: categoryVal || "선수단 숙소",
      note: noteVal
    };
    lodgingPlacesDataStore.unshift(newItem);
  }

  saveLodgingStore();
  closeLodgingModal();
  renderLodgingPlaces();
}

function deleteLodgingPlace(id) {
  if (!ensureAdminAuthorized()) return;
  if (!confirm("선택한 숙소 정보를 삭제하시겠습니까?")) return;
  lodgingPlacesDataStore = lodgingPlacesDataStore.filter(x => x.id !== id);
  saveLodgingStore();
  renderLodgingPlaces();
}

// 12. Admin Authorization & Lock Control Module
let isAdminMode = false;

function getAdminPassword() {
  return localStorage.getItem('GANGWON_ADMIN_PASSWORD') || '1234';
}

function setAdminPassword(newPassword) {
  localStorage.setItem('GANGWON_ADMIN_PASSWORD', newPassword);
}

function initAdminAuth() {
  const urlParams = new URLSearchParams(window.location.search);
  const adminParam = urlParams.get('admin');
  const storedAuth = sessionStorage.getItem('GANGWON_IS_ADMIN');

  if (adminParam === getAdminPassword() || storedAuth === 'true') {
    isAdminMode = true;
    sessionStorage.setItem('GANGWON_IS_ADMIN', 'true');
  } else {
    isAdminMode = false;
  }
  updateAdminUI();
}

function ensureAdminAuthorized() {
  if (!isAdminMode) {
    alert("🔒 관리자 권한이 필요합니다. 헤더 상단의 [관리자 로그인] 버튼을 눌러 비밀번호를 입력해주세요.");
    openAdminModal();
    return false;
  }
  return true;
}

function handleAdminAuthClick() {
  if (isAdminMode) {
    if (confirm("관리자 모드를 로그아웃(일반 열람 모드로 전환)하시겠습니까?")) {
      isAdminMode = false;
      sessionStorage.removeItem('GANGWON_IS_ADMIN');
      updateAdminUI();
      alert("👁️ 일반 열람 모드로 전환되었습니다.");
    }
  } else {
    openAdminModal();
  }
}

function openAdminModal() {
  const modal = document.getElementById("admin-modal");
  const input = document.getElementById("admin-password-input");
  if (modal) {
    modal.style.display = "flex";
    if (input) {
      input.value = "";
      setTimeout(() => input.focus(), 100);
    }
  }
}

function closeAdminModal() {
  const modal = document.getElementById("admin-modal");
  if (modal) modal.style.display = "none";
}

function handleAdminLoginSubmit(e) {
  if (e) e.preventDefault();
  const input = document.getElementById("admin-password-input");
  const enteredPw = input ? input.value.trim() : '';

  if (enteredPw === getAdminPassword()) {
    isAdminMode = true;
    sessionStorage.setItem('GANGWON_IS_ADMIN', 'true');
    updateAdminUI();
    closeAdminModal();
    alert("🔓 관리자 인증 성공! 수정 권한이 활성화되었습니다.");
  } else {
    alert("❌ 비밀번호가 올바르지 않습니다. 다시 확인해 주세요.");
    if (input) {
      input.value = "";
      input.focus();
    }
  }
}

function changeAdminPasswordPrompt() {
  const currentPw = prompt("현재 관리자 비밀번호를 입력하세요:");
  if (currentPw === null) return;

  if (currentPw !== getAdminPassword()) {
    alert("❌ 현재 비밀번호가 일치하지 않습니다.");
    return;
  }

  const newPw = prompt("새로운 관리자 비밀번호를 입력하세요:");
  if (!newPw || !newPw.trim()) {
    alert("비밀번호가 변경되지 않았습니다.");
    return;
  }

  setAdminPassword(newPw.trim());
  alert("🎉 관리자 비밀번호가 성공적으로 변경되었습니다!");
}

function updateAdminUI() {
  document.body.classList.toggle("is-admin", isAdminMode);

  const btnText = document.getElementById("admin-btn-text");
  const btnAuth = document.getElementById("admin-auth-btn");

  if (btnText) {
    btnText.textContent = isAdminMode ? "🔓 관리자 모드 (ON)" : "🔒 관리자 로그인";
  }
  if (btnAuth) {
    btnAuth.title = isAdminMode ? "관리자 모드 활성화됨 (클릭 시 로그아웃)" : "관리자 로그인";
  }

  if (typeof renderRosterPage === 'function') renderRosterPage();
  if (typeof renderDiningPlaces === 'function') renderDiningPlaces();
  if (typeof renderLodgingPlaces === 'function') renderLodgingPlaces();
  if (typeof renderBracketsPage === 'function') renderBracketsPage();

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// 13. App Initialization on DOM Loaded
document.addEventListener("DOMContentLoaded", () => {
  initStore();
  initAdminAuth();
  updateCountdown();
  switchTab("overview");
  renderDiningPlaces();
  renderLodgingPlaces();
});
