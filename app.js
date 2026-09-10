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
    { id: "p1", school: "남산초등학교", position: "교장", name: "김석남", stay: true, dinner: false, soccerM: false, soccerW: false, jokgu: false, badminton: false, note: "", bGrade: "A", gender: "남" },
    { id: "p2", school: "금광초등학교", position: "교장", name: "김진홍", stay: true, dinner: false, soccerM: false, soccerW: false, jokgu: false, badminton: false, note: "", bGrade: "A", gender: "남" },
    { id: "p3", school: "주영초등학교", position: "교감", name: "박상우", stay: true, dinner: false, soccerM: true, soccerW: false, jokgu: false, badminton: false, note: "87년생이상(40대)", bGrade: "B", gender: "남" },
    { id: "p4", school: "연곡초등학교", position: "교감", name: "선민영", stay: true, dinner: false, soccerM: true, soccerW: false, jokgu: true, badminton: false, note: "87년생이상(40대)", bGrade: "B", gender: "남" },
    { id: "p5", school: "성산초등학교", position: "교감", name: "김지승", stay: true, dinner: false, soccerM: true, soccerW: false, jokgu: true, badminton: false, note: "87년생이상(40대)", bGrade: "B", gender: "남" },
    { id: "p6", school: "강릉초등학교", position: "교장", name: "고문석", stay: true, dinner: false, soccerM: false, soccerW: false, jokgu: true, badminton: false, note: "", bGrade: "A", gender: "남" },
    { id: "p7", school: "강릉교육지원청", position: "교육과장", name: "신창근", stay: true, dinner: false, soccerM: false, soccerW: false, jokgu: false, badminton: false, note: "관리자", bGrade: "A", gender: "남" },
    { id: "p8", school: "강릉교육지원청", position: "교육장", name: "강장혁", stay: false, dinner: false, soccerM: false, soccerW: false, jokgu: false, badminton: false, note: "단장", bGrade: "A", gender: "남" },
    { id: "p9", school: "강릉교육지원청", position: "장학사", name: "이정관", stay: false, dinner: false, soccerM: false, soccerW: false, jokgu: false, badminton: false, note: "주무", bGrade: "B", gender: "남" },
    { id: "p10", school: "노암초등학교", position: "교사", name: "김태익", stay: true, dinner: false, soccerM: true, soccerW: false, jokgu: false, badminton: false, note: "", bGrade: "B", gender: "남" },
    { id: "p11", school: "초당초등학교", position: "교사", name: "김남준", stay: true, dinner: false, soccerM: true, soccerW: false, jokgu: false, badminton: false, note: "", bGrade: "C", gender: "남" },
    { id: "p12", school: "남산초등학교", position: "교사", name: "김동수", stay: true, dinner: false, soccerM: true, soccerW: false, jokgu: false, badminton: false, note: "", bGrade: "C", gender: "남" },
    { id: "p13", school: "교동초등학교", position: "교사", name: "김종완", stay: true, dinner: false, soccerM: true, soccerW: false, jokgu: false, badminton: false, note: "", bGrade: "B", gender: "남" },
    { id: "p14", school: "경포초등학교", position: "교사", name: "남기민", stay: true, dinner: false, soccerM: true, soccerW: false, jokgu: true, badminton: false, note: "", bGrade: "C", gender: "남" },
    { id: "p15", school: "중앙초등학교", position: "교사", name: "백서현", stay: true, dinner: false, soccerM: true, soccerW: false, jokgu: false, badminton: false, note: "", bGrade: "C", gender: "남" },
    { id: "p16", school: "한솔초등학교", position: "교사", name: "신보식", stay: true, dinner: false, soccerM: true, soccerW: false, jokgu: false, badminton: false, note: "", bGrade: "D", gender: "남" },
    { id: "p17", school: "한솔초등학교", position: "교사", name: "정의석", stay: false, dinner: false, soccerM: false, soccerW: false, jokgu: true, badminton: true, note: "배드민턴 A조", bGrade: "A", gender: "남" },
    { id: "p18", school: "율곡초등학교", position: "교사", name: "이소연", stay: true, dinner: true, soccerM: false, soccerW: true, jokgu: false, badminton: true, note: "축구(여) 주장", bGrade: "B", gender: "여" },
    { id: "p19", school: "명주초등학교", position: "교사", name: "최은경", stay: true, dinner: true, soccerM: false, soccerW: true, jokgu: false, badminton: false, note: "", bGrade: "C", gender: "여" }
  ]
};

// Brackets Initial State with Default Blank Scores (status: "예정")
const INITIAL_BRACKETS_DATA = {
  jokgu: {
    groupA: [
      { id: "m1", match: "1경기", team1: "속초양양", team2: "홍천", score1: null, score2: null, winner: "", status: "예정" },
      { id: "m2", match: "2경기", team1: "속초양양", team2: "태백", score1: null, score2: null, winner: "", status: "예정" },
      { id: "m3", match: "3경기", team1: "홍천", team2: "양구", score1: null, score2: null, winner: "", status: "예정" },
      { id: "m4", match: "4경기", team1: "속초양양", team2: "양구", score1: null, score2: null, winner: "", status: "예정" },
      { id: "m5", match: "5경기 (4강)", team1: "그룹① 1위", team2: "그룹② 2위", score1: null, score2: null, winner: "", status: "예정" },
      { id: "m6", match: "결승전", team1: "1코트 승자", team2: "3코트 승자", score1: null, score2: null, winner: "", status: "예정" }
    ],
    groupB: [
      { id: "mb1", match: "1경기", team1: "고성", team2: "영월", score1: null, score2: null, winner: "", status: "예정" },
      { id: "mb2", match: "2경기", team1: "영월", team2: "철원", score1: null, score2: null, winner: "", status: "예정" },
      { id: "mb3", match: "3경기", team1: "고성", team2: "철원", score1: null, score2: null, winner: "", status: "예정" },
      { id: "mb4", match: "4경기(4강)", team1: "그룹① 1위", team2: "그룹② 2위", score1: null, score2: null, winner: "", status: "예정" },
      { id: "mb5", match: "결승전", team1: "5코트 승자", team2: "7코트 승자", score1: null, score2: null, winner: "", status: "예정" }
    ]
  },
  soccer: {
    groupA: [
      { id: "s1", match: "1경기 (09:00)", team1: "영월", team2: "속초양양", score1: null, score2: null, winner: "", status: "예정" },
      { id: "s2", match: "2경기 (09:45)", team1: "횡성", team2: "원주", score1: null, score2: null, winner: "", status: "예정" },
      { id: "s3", match: "3경기 (10:30)", team1: "화천", team2: "평창", score1: null, score2: null, winner: "", status: "예정" },
      { id: "s4", match: "4경기 (11:15)", team1: "동해", team2: "홍천", score1: null, score2: null, winner: "", status: "예정" },
      { id: "s5", match: "4강전 (13:30)", team1: "4강 진출팀1", team2: "4강 진출팀2", score1: null, score2: null, winner: "", status: "예정" },
      { id: "s6", match: "결승전 (15:00)", team1: "결승 진출팀1", team2: "결승 진출팀2", score1: null, score2: null, winner: "", status: "예정" }
    ],
    groupB: [
      { id: "sb1", match: "1경기 (09:00)", team1: "강릉", team2: "정선", score1: null, score2: null, winner: "", status: "예정" },
      { id: "sb2", match: "2경기 (09:45)", team1: "고성", team2: "양구", score1: null, score2: null, winner: "", status: "예정" },
      { id: "sb3", match: "3경기 (10:30)", team1: "삼척", team2: "춘천", score1: null, score2: null, winner: "", status: "예정" },
      { id: "sb4", match: "4강전 (13:30)", team1: "4강 진출팀1", team2: "4강 진출팀2", score1: null, score2: null, winner: "", status: "예정" }
    ]
  },
  badminton: {
    groupA: [
      { id: "b1", match: "A조 1경기", team1: "속초양양 (A복)", team2: "홍천 (A복)", score1: null, score2: null, winner: "", status: "예정" },
      { id: "b2", match: "A조 2경기", team1: "춘천 (A복)", team2: "강릉 (A복)", score1: null, score2: null, winner: "", status: "예정" },
      { id: "b3", match: "A조 결승전", team1: "1경기 승자", team2: "2경기 승자", score1: null, score2: null, winner: "", status: "예정" }
    ],
    groupB: [
      { id: "bb1", match: "B조 1경기", team1: "동해 (B복)", team2: "인제 (B복)", score1: null, score2: null, winner: "", status: "예정" },
      { id: "bb2", match: "B조 결승전", team1: "1경기 승자", team2: "동해 (B복)", score1: null, score2: null, winner: "", status: "예정" }
    ]
  }
};

// 2. Global State Variables
let currentTab = "overview";
let currentCategoryFilter = "all";
let currentBracketSport = "jokgu";
let playerDataStore = {};
let bracketsDataStore = {};

// Load State from LocalStorage
function initStore() {
  const savedData = localStorage.getItem("GANGWON_PE_STORE_GANGNEUNG_V6");
  if (savedData) {
    try {
      playerDataStore = JSON.parse(savedData);
      if (!playerDataStore.gangneung) playerDataStore = INITIAL_PLAYERS;
    } catch(e) {
      playerDataStore = INITIAL_PLAYERS;
    }
  } else {
    playerDataStore = INITIAL_PLAYERS;
    saveStore();
  }

  const savedBrackets = localStorage.getItem("GANGWON_BRACKETS_STORE_V6");
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
}

function saveStore() {
  localStorage.setItem("GANGWON_PE_STORE_GANGNEUNG_V6", JSON.stringify(playerDataStore));
}

function saveBracketsStore() {
  localStorage.setItem("GANGWON_BRACKETS_STORE_V6", JSON.stringify(bracketsDataStore));
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

function updateRosterStats() {
  const players = playerDataStore.gangneung || [];

  let totalCount = players.length;
  let adminCount = players.filter(p => ["교장", "교감", "교육장", "교육과장", "장학사", "전문직"].includes(p.position)).length;
  let stayCount = players.filter(p => p.stay).length;
  let dinnerCount = players.filter(p => p.dinner).length;
  let soccerMCount = players.filter(p => p.soccerM).length;
  let soccerWCount = players.filter(p => p.soccerW).length;
  let soccerTotalCount = players.filter(p => p.soccerM || p.soccerW).length;
  let jokguCount = players.filter(p => p.jokgu).length;
  let badmintonCount = players.filter(p => p.badminton).length;

  if (document.getElementById("stat-total")) document.getElementById("stat-total").textContent = `${totalCount}명`;
  if (document.getElementById("stat-admin")) document.getElementById("stat-admin").textContent = `${adminCount}명`;
  if (document.getElementById("stat-stay")) document.getElementById("stat-stay").textContent = `${stayCount}명`;
  if (document.getElementById("stat-dinner")) document.getElementById("stat-dinner").textContent = `${dinnerCount}명`;
  if (document.getElementById("stat-soccer-m")) document.getElementById("stat-soccer-m").textContent = `${soccerMCount}명`;
  if (document.getElementById("stat-soccer-w")) document.getElementById("stat-soccer-w").textContent = `${soccerWCount}명`;
  if (document.getElementById("stat-jokgu")) document.getElementById("stat-jokgu").textContent = `${jokguCount}명`;
  if (document.getElementById("stat-badminton")) document.getElementById("stat-badminton").textContent = `${badmintonCount}명`;

  const btnAll = document.getElementById("view-btn-all");
  const btnSoccer = document.getElementById("view-btn-soccer");
  const btnJokgu = document.getElementById("view-btn-jokgu");
  const btnBadminton = document.getElementById("view-btn-badminton");

  if (btnAll) btnAll.textContent = `전체 참가인원 (${totalCount}명)`;
  if (btnSoccer) btnSoccer.textContent = `축구 참여인원 (${soccerTotalCount}명)`;
  if (btnJokgu) btnJokgu.textContent = `족구 참여인원 (${jokguCount}명)`;
  if (btnBadminton) btnBadminton.textContent = `배드민턴 참여인원 (${badmintonCount}명)`;
}

function updatePlayerDirect(playerId, field, value) {
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

function renderRosterTable() {
  const players = playerDataStore.gangneung || [];
  updateRosterStats();

  const soccerTotalCount = players.filter(p => p.soccerM || p.soccerW).length;
  const jokguCount = players.filter(p => p.jokgu).length;
  const badmintonCount = players.filter(p => p.badminton).length;

  const categoryTitleEl = document.getElementById("active-category-title");
  if (categoryTitleEl) {
    if (currentCategoryFilter === "soccer") categoryTitleEl.textContent = `축구 참여인원 명단 (${soccerTotalCount}명)`;
    else if (currentCategoryFilter === "jokgu") categoryTitleEl.textContent = `족구 참여인원 명단 (${jokguCount}명)`;
    else if (currentCategoryFilter === "badminton") categoryTitleEl.textContent = `배드민턴 참여인원 명단 (${badmintonCount}명)`;
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
  }

  const filteredPlayers = categoryFiltered.filter(p => 
    (p.name || '').toLowerCase().includes(searchQuery) ||
    (p.school || '').toLowerCase().includes(searchQuery) ||
    (p.position || '').toLowerCase().includes(searchQuery)
  );

  const tableEl = document.getElementById("roster-table");
  if (!tableEl) return;

  const positionOptions = ["교사", "교장", "교감", "교육장", "교육과장", "장학사", "전문직"];

  if (currentCategoryFilter === "all") {
    tableEl.innerHTML = `
      <thead>
        <tr>
          <th class="cell-center" style="width:55px;">이동</th>
          <th style="width:40px;">연번</th>
          <th style="min-width:125px;">소속(학교)</th>
          <th style="min-width:85px;">직위</th>
          <th style="min-width:85px;">성명</th>
          <th class="cell-center" style="min-width:45px;">숙박</th>
          <th class="cell-center" style="min-width:65px;">24일만찬</th>
          <th class="cell-center" style="min-width:45px;">족구</th>
          <th class="cell-center" style="min-width:65px;">축구(남)</th>
          <th class="cell-center" style="min-width:65px;">축구(여)</th>
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
              <input type="text" class="cell-direct-input" value="${escapeHtml(p.school)}" placeholder="학교명" onchange="updatePlayerDirect('${p.id}', 'school', this.value)">
            </td>
            <td>
              <select class="cell-direct-select" onchange="updatePlayerDirect('${p.id}', 'position', this.value)">
                ${positionOptions.map(pos => `<option value="${pos}" ${p.position === pos ? 'selected' : ''}>${pos}</option>`).join("")}
                ${!positionOptions.includes(p.position) ? `<option value="${escapeHtml(p.position)}" selected>${escapeHtml(p.position)}</option>` : ''}
              </select>
            </td>
            <td>
              <input type="text" class="cell-direct-input" style="font-weight:700; color:var(--color-ink);" value="${escapeHtml(p.name)}" placeholder="성명" onchange="updatePlayerDirect('${p.id}', 'name', this.value)">
            </td>
            <td class="cell-center"><input type="checkbox" ${p.stay ? 'checked' : ''} onchange="togglePlayerField('${p.id}', 'stay')"></td>
            <td class="cell-center"><input type="checkbox" ${p.dinner ? 'checked' : ''} onchange="togglePlayerField('${p.id}', 'dinner')"></td>
            <td class="cell-center"><input type="checkbox" ${p.jokgu ? 'checked' : ''} onchange="togglePlayerField('${p.id}', 'jokgu')"></td>
            <td class="cell-center"><input type="checkbox" ${p.soccerM ? 'checked' : ''} onchange="togglePlayerField('${p.id}', 'soccerM')"></td>
            <td class="cell-center"><input type="checkbox" ${p.soccerW ? 'checked' : ''} onchange="togglePlayerField('${p.id}', 'soccerW')"></td>
            <td class="cell-center"><input type="checkbox" ${p.badminton ? 'checked' : ''} onchange="togglePlayerField('${p.id}', 'badminton')"></td>
            <td>
              <input type="text" class="cell-direct-input" style="font-size:12px; color:var(--color-ink-muted);" value="${escapeHtml(p.note || '')}" placeholder="비고 입력" onchange="updatePlayerDirect('${p.id}', 'note', this.value)">
            </td>
            <td class="cell-center">
              <button onclick="deletePlayer('${p.id}')" style="background:none; border:none; color:var(--color-danger); cursor:pointer; font-size:18px; padding:2px 6px;" title="삭제">&times;</button>
            </td>
          </tr>
        `).join("")}
        ${filteredPlayers.length === 0 ? `<tr><td colspan="13" class="cell-center" style="padding:24px; color:var(--color-ink-muted);">등록된 선수가 없습니다. '선수 추가' 버튼을 눌러 추가하세요.</td></tr>` : ''}
      </tbody>
    `;
  } else if (currentCategoryFilter === "soccer") {
    tableEl.innerHTML = `
      <thead>
        <tr>
          <th class="cell-center" style="width:55px;">이동</th>
          <th style="width:40px;">연번</th>
          <th style="min-width:125px;">소속(학교)</th>
          <th style="min-width:85px;">직위</th>
          <th style="min-width:85px;">성명</th>
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
            <td><input type="text" class="cell-direct-input" value="${escapeHtml(p.school)}" onchange="updatePlayerDirect('${p.id}', 'school', this.value)"></td>
            <td>
              <select class="cell-direct-select" onchange="updatePlayerDirect('${p.id}', 'position', this.value)">
                ${positionOptions.map(pos => `<option value="${pos}" ${p.position === pos ? 'selected' : ''}>${pos}</option>`).join("")}
              </select>
            </td>
            <td><input type="text" class="cell-direct-input" style="font-weight:700; color:var(--color-primary);" value="${escapeHtml(p.name)}" onchange="updatePlayerDirect('${p.id}', 'name', this.value)"></td>
            <td class="cell-center">
              ${p.soccerM ? '<span style="background:rgba(0,102,204,0.1); color:var(--color-primary); padding:2px 8px; border-radius:9999px; font-weight:600; font-size:11px;">축구(남)</span>' : ''}
              ${p.soccerW ? '<span style="background:rgba(175,82,222,0.1); color:#af52de; padding:2px 8px; border-radius:9999px; font-weight:600; font-size:11px;">축구(여)</span>' : ''}
            </td>
            <td class="cell-center"><input type="checkbox" ${p.stay ? 'checked' : ''} onchange="togglePlayerField('${p.id}', 'stay')"></td>
            <td class="cell-center"><input type="checkbox" ${p.dinner ? 'checked' : ''} onchange="togglePlayerField('${p.id}', 'dinner')"></td>
            <td><input type="text" class="cell-direct-input" style="font-size:12px; color:var(--color-ink-muted);" value="${escapeHtml(p.note || '')}" placeholder="비고" onchange="updatePlayerDirect('${p.id}', 'note', this.value)"></td>
            <td class="cell-center">
              <button onclick="deletePlayer('${p.id}')" style="background:none; border:none; color:var(--color-danger); cursor:pointer; font-size:18px;" title="삭제">&times;</button>
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
          <th style="min-width:125px;">소속(학교)</th>
          <th style="min-width:85px;">직위</th>
          <th style="min-width:85px;">성명</th>
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
            <td><input type="text" class="cell-direct-input" value="${escapeHtml(p.school)}" onchange="updatePlayerDirect('${p.id}', 'school', this.value)"></td>
            <td>
              <select class="cell-direct-select" onchange="updatePlayerDirect('${p.id}', 'position', this.value)">
                ${positionOptions.map(pos => `<option value="${pos}" ${p.position === pos ? 'selected' : ''}>${pos}</option>`).join("")}
              </select>
            </td>
            <td><input type="text" class="cell-direct-input" style="font-weight:700; color:#ff9500;" value="${escapeHtml(p.name)}" onchange="updatePlayerDirect('${p.id}', 'name', this.value)"></td>
            <td class="cell-center">
              ${["교장", "교감", "전문직", "교육장", "교육과장", "장학사"].includes(p.position) ? '<span style="background:rgba(255,149,0,0.1); color:#ff9500; font-weight:700; padding:2px 8px; border-radius:9999px; font-size:11px;">관리자 규정 충족</span>' : '<span style="color:var(--color-ink-muted); font-size:11px;">일반 교사</span>'}
            </td>
            <td class="cell-center"><input type="checkbox" ${p.stay ? 'checked' : ''} onchange="togglePlayerField('${p.id}', 'stay')"></td>
            <td class="cell-center"><input type="checkbox" ${p.dinner ? 'checked' : ''} onchange="togglePlayerField('${p.id}', 'dinner')"></td>
            <td><input type="text" class="cell-direct-input" style="font-size:12px; color:var(--color-ink-muted);" value="${escapeHtml(p.note || '')}" placeholder="비고" onchange="updatePlayerDirect('${p.id}', 'note', this.value)"></td>
            <td class="cell-center">
              <button onclick="deletePlayer('${p.id}')" style="background:none; border:none; color:var(--color-danger); cursor:pointer; font-size:18px;" title="삭제">&times;</button>
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
          <th style="min-width:125px;">학교 / 기관</th>
          <th style="min-width:85px;">직위</th>
          <th style="min-width:85px;">성명</th>
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
            <td><input type="text" class="cell-direct-input" value="${escapeHtml(p.school)}" onchange="updatePlayerDirect('${p.id}', 'school', this.value)"></td>
            <td>
              <select class="cell-direct-select" onchange="updatePlayerDirect('${p.id}', 'position', this.value)">
                ${positionOptions.map(pos => `<option value="${pos}" ${p.position === pos ? 'selected' : ''}>${pos}</option>`).join("")}
              </select>
            </td>
            <td><input type="text" class="cell-direct-input" style="font-weight:700; color:#34c759;" value="${escapeHtml(p.name)}" onchange="updatePlayerDirect('${p.id}', 'name', this.value)"></td>
            <td class="cell-center">${p.gender || '남'}</td>
            <td class="cell-center"><span style="font-weight:600; color:var(--color-primary);">${p.bGrade || 'A'}등급</span></td>
            <td class="cell-center"><input type="checkbox" ${p.stay ? 'checked' : ''} onchange="togglePlayerField('${p.id}', 'stay')"></td>
            <td><input type="text" class="cell-direct-input" style="font-size:12px; color:var(--color-ink-muted);" value="${escapeHtml(p.note || '')}" placeholder="비고" onchange="updatePlayerDirect('${p.id}', 'note', this.value)"></td>
            <td class="cell-center">
              <button onclick="deletePlayer('${p.id}')" style="background:none; border:none; color:var(--color-danger); cursor:pointer; font-size:18px;" title="삭제">&times;</button>
            </td>
          </tr>
        `).join("")}
        ${filteredPlayers.length === 0 ? `<tr><td colspan="11" class="cell-center" style="padding:24px; color:var(--color-ink-muted);">배드민턴 출전 표시된 선수가 없습니다. '전체 참가인원' 탭에서 배드민턴 항목을 체크하세요.</td></tr>` : ''}
      </tbody>
    `;
  }

  initRosterDragAndDrop();
}

function filterRosterTable() {
  renderRosterTable();
}

function togglePlayerField(playerId, field) {
  const players = playerDataStore.gangneung || [];
  const player = players.find(p => p.id === playerId);
  if (player) {
    player[field] = !player[field];
    saveStore();
    renderRosterTable();
  }
}

function deletePlayer(playerId) {
  if (confirm("정말 이 선수 정보를 삭제하시겠습니까?")) {
    playerDataStore.gangneung = (playerDataStore.gangneung || []).filter(p => p.id !== playerId);
    saveStore();
    renderRosterTable();
  }
}

// 7. Add / Edit Player Modal Logic
function openAddPlayerModal() {
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
  document.getElementById("form-soccer-m").checked = !!p.soccerM;
  document.getElementById("form-soccer-w").checked = !!p.soccerW;
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
  const soccerMVal = document.getElementById("form-soccer-m").checked;
  const soccerWVal = document.getElementById("form-soccer-w").checked;
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
      player.soccerM = soccerMVal;
      player.soccerW = soccerWVal;
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
      soccerM: soccerMVal,
      soccerW: soccerWVal,
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

// 8. CSV Export Function
function exportToCSV() {
  const players = playerDataStore.gangneung || [];

  let csvContent = "\uFEFF연번,소속(학교),직위,성명,숙박여부,24일석식만찬,족구,축구(남),축구(여),배드민턴,비고\n";

  players.forEach((p, idx) => {
    csvContent += `${idx + 1},"${p.school}","${p.position}","${p.name}",${p.stay ? 'O' : 'X'},${p.dinner ? 'O' : 'X'},${p.jokgu ? 'O' : 'X'},${p.soccerM ? 'O' : 'X'},${p.soccerW ? 'O' : 'X'},${p.badminton ? 'O' : 'X'},"${p.note || ''}"\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `제31회_강원초등교원체육대회_강릉교육지원청_선수단명단.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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

// 10. App Initialization on DOM Loaded
document.addEventListener("DOMContentLoaded", () => {
  initStore();
  updateCountdown();
  switchTab("overview");
});
