/**
 * Firebase Firestore Service Module
 * 제31회 강원초등교원체육대회 관리 시스템 - Firebase 실시간 연동
 */

let firebaseApp = null;
let firestoreDb = null;
let isFirebaseConnected = false;
let isSyncing = false;
let unsubscribeListeners = [];
let hasAutoSeeded = false;

// Firestore 컬렉션 및 문서 ID 상수
const FS_COLLECTION = "sports_event_2026";
const FS_DOCS = {
  PLAYERS: "gangneung_players",
  BRACKETS: "brackets",
  DINING: "venues_dining",
  LODGING: "venues_lodging"
};

/**
 * 토스트 알림 표시 함수
 */
function showToast(message, type = "info") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.style.cssText = "position:fixed; bottom:24px; right:24px; z-index:99999; display:flex; flex-direction:column; gap:8px; pointer-events:none;";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  const bgColors = {
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#0066cc"
  };
  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠️",
    info: "ℹ️"
  };

  toast.style.cssText = `
    background: ${bgColors[type] || "#1f2937"};
    color: #ffffff;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    box-shadow: 0 4px 14px rgba(0,0,0,0.25);
    display: flex;
    align-items: center;
    gap: 8px;
    pointer-events: auto;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.25s ease;
  `;
  toast.innerHTML = `<span>${icons[type] || ""}</span> <span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/**
 * Firebase 서비스 초기화
 */
function initFirebaseService() {
  const config = getActiveFirebaseConfig();
  
  if (!config || !config.projectId || !config.apiKey) {
    console.log("[Firebase] 연동 설정 없음 (로컬스토리지 모드로 실행 중)");
    updateFirebaseStatusBadge("disconnected", "로컬 모드");
    return false;
  }

  try {
    if (!window.firebase) {
      console.warn("[Firebase] Firebase SDK가 로드되지 않았습니다.");
      updateFirebaseStatusBadge("error", "SDK 로드 오류");
      return false;
    }

    // 기존 리스너 정리
    stopFirestoreListeners();

    if (firebase.apps.length > 0) {
      firebaseApp = firebase.app();
    } else {
      firebaseApp = firebase.initializeApp(config);
    }

    firestoreDb = firebase.firestore();

    isFirebaseConnected = true;
    updateFirebaseStatusBadge("connected", "실시간 클라우드 연결됨");
    console.log("[Firebase] Firestore 연결 초기화 완료 (프로젝트 ID: " + config.projectId + ")");

    // 실시간 리스너 구독 시작
    startFirestoreListeners();

    // 초기 연결 시 읽기/쓰기 권한 자동 진단 (실패 시 사용자에게 안내 표시)
    setTimeout(async () => {
      const ok = await diagnoseFirestoreConnection(false);
      if (!ok) {
        // 실패 시 사용자에게 직접 안내
        diagnoseFirestoreConnection(true);
      }
    }, 800);

    return true;
  } catch (error) {
    console.error("[Firebase] 초기화 중 오류 발생:", error);
    isFirebaseConnected = false;
    updateFirebaseStatusBadge("error", "연결 오류");
    showToast("Firebase 초기화 실패: " + (error.message || ""), "error");
    return false;
  }
}

/**
 * Firestore 실시간 리스너 등록
 */
function startFirestoreListeners() {
  if (!firestoreDb) return;
  stopFirestoreListeners();

  const colRef = firestoreDb.collection(FS_COLLECTION);

  // 1. 선수 명단 실시간 동기화
  const unsubPlayers = colRef.doc(FS_DOCS.PLAYERS).onSnapshot(
    (doc) => {
      if (doc.exists) {
        // 로컬에서 방금 보낸 쓰기 작업의 반영인 경우 중복 렌더링 방지
        if (doc.metadata && doc.metadata.hasPendingWrites) {
          return;
        }

        const remoteData = doc.data();
        if (remoteData && remoteData.payload) {
          if (typeof playerDataStore !== "undefined") {
            playerDataStore = remoteData.payload;
            try {
              localStorage.setItem("GANGWON_PE_STORE_GANGNEUNG_V8", JSON.stringify(playerDataStore));
            } catch (e) {}
            
            // 화면 갱신
            if (typeof renderRosterPage === "function" && typeof currentTab !== "undefined" && currentTab === "roster") {
              renderRosterPage();
            }
            if (typeof updateHeaderStats === "function") {
              updateHeaderStats();
            }
            showCloudSyncPulse();
          }
        }
      } else {
        console.log("[Firebase] 원격 선수 데이터 없음 - 로컬 초기 데이터 자동 클라우드 시딩 시작");
        autoSeedInitialDataIfEmpty();
      }
    },
    (err) => {
      console.warn("[Firebase] 선수 데이터 실시간 수신 오류:", err.message);
      handleFirestorePermissionError(err);
    }
  );
  unsubscribeListeners.push(unsubPlayers);

  // 2. 대진표 및 경기 결과 실시간 동기화
  const unsubBrackets = colRef.doc(FS_DOCS.BRACKETS).onSnapshot(
    (doc) => {
      if (doc.exists) {
        if (doc.metadata && doc.metadata.hasPendingWrites) {
          return;
        }

        const remoteData = doc.data();
        if (remoteData && remoteData.payload) {
          if (typeof bracketsDataStore !== "undefined") {
            bracketsDataStore = remoteData.payload;
            try {
              localStorage.setItem("GANGWON_BRACKETS_STORE_V8", JSON.stringify(bracketsDataStore));
            } catch (e) {}
            if (typeof renderBracketsPage === "function" && typeof currentTab !== "undefined" && currentTab === "brackets") {
              renderBracketsPage();
            }
            showCloudSyncPulse();
          }
        }
      }
    },
    (err) => {
      console.warn("[Firebase] 대진표 실시간 수신 오류:", err.message);
    }
  );
  unsubscribeListeners.push(unsubBrackets);

  // 3. 식사 장소 실시간 동기화
  const unsubDining = colRef.doc(FS_DOCS.DINING).onSnapshot(
    (doc) => {
      if (doc.exists) {
        if (doc.metadata && doc.metadata.hasPendingWrites) {
          return;
        }

        const remoteData = doc.data();
        if (remoteData && remoteData.payload) {
          if (typeof diningPlacesDataStore !== "undefined") {
            diningPlacesDataStore = remoteData.payload;
            try {
              localStorage.setItem("GANGWON_DINING_STORE_V1", JSON.stringify(diningPlacesDataStore));
            } catch (e) {}
            if (typeof renderDiningPlaces === "function" && typeof currentTab !== "undefined" && currentTab === "venues") {
              renderDiningPlaces(typeof currentDiningFilterDate !== "undefined" ? currentDiningFilterDate : "all");
            }
            showCloudSyncPulse();
          }
        }
      }
    },
    (err) => {
      console.warn("[Firebase] 식사 장소 실시간 수신 오류:", err.message);
    }
  );
  unsubscribeListeners.push(unsubDining);

  // 4. 숙소 장소 실시간 동기화
  const unsubLodging = colRef.doc(FS_DOCS.LODGING).onSnapshot(
    (doc) => {
      if (doc.exists) {
        if (doc.metadata && doc.metadata.hasPendingWrites) {
          return;
        }

        const remoteData = doc.data();
        if (remoteData && remoteData.payload) {
          if (typeof lodgingPlacesDataStore !== "undefined") {
            lodgingPlacesDataStore = remoteData.payload;
            try {
              localStorage.setItem("GANGWON_LODGING_STORE_V1", JSON.stringify(lodgingPlacesDataStore));
            } catch (e) {}
            if (typeof renderLodgingPlaces === "function" && typeof currentTab !== "undefined" && currentTab === "venues") {
              renderLodgingPlaces();
            }
            showCloudSyncPulse();
          }
        }
      }
    },
    (err) => {
      console.warn("[Firebase] 숙소 장소 실시간 수신 오류:", err.message);
    }
  );
  unsubscribeListeners.push(unsubLodging);
}

/**
 * 리스너 일괄 해제
 */
function stopFirestoreListeners() {
  unsubscribeListeners.forEach(unsub => {
    try { if (typeof unsub === "function") unsub(); } catch (e) {}
  });
  unsubscribeListeners = [];
}

/**
 * 선수단 데이터 클라우드 저장
 */
async function pushPlayersToCloud(data) {
  if (!firestoreDb || !isFirebaseConnected) return;
  try {
    showCloudSavingPulse();
    await firestoreDb.collection(FS_COLLECTION).doc(FS_DOCS.PLAYERS).set({
      payload: data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedBy: "web-client"
    });
    showToast("☁️ 선수 명단 클라우드 동기화 완료", "success");
    console.log("[Firebase] 선수 데이터 클라우드 동기화 완료");
  } catch (error) {
    console.error("[Firebase] 선수 데이터 클라우드 저장 실패:", error);
    handleFirestorePermissionError(error);
  }
}

/**
 * 대진표 데이터 클라우드 저장
 */
async function pushBracketsToCloud(data) {
  if (!firestoreDb || !isFirebaseConnected) return;
  try {
    showCloudSavingPulse();
    await firestoreDb.collection(FS_COLLECTION).doc(FS_DOCS.BRACKETS).set({
      payload: data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedBy: "web-client"
    });
    showToast("☁️ 경기 점수/대진표 동기화 완료", "success");
    console.log("[Firebase] 대진표 데이터 클라우드 동기화 완료");
  } catch (error) {
    console.error("[Firebase] 대진표 클라우드 저장 실패:", error);
    handleFirestorePermissionError(error);
  }
}

/**
 * 식사 데이터 클라우드 저장
 */
async function pushDiningToCloud(data) {
  if (!firestoreDb || !isFirebaseConnected) return;
  try {
    showCloudSavingPulse();
    await firestoreDb.collection(FS_COLLECTION).doc(FS_DOCS.DINING).set({
      payload: data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedBy: "web-client"
    });
    showToast("☁️ 식사 장소 동기화 완료", "success");
  } catch (error) {
    console.error("[Firebase] 식사 데이터 저장 실패:", error);
    handleFirestorePermissionError(error);
  }
}

/**
 * 숙소 데이터 클라우드 저장
 */
async function pushLodgingToCloud(data) {
  if (!firestoreDb || !isFirebaseConnected) return;
  try {
    showCloudSavingPulse();
    await firestoreDb.collection(FS_COLLECTION).doc(FS_DOCS.LODGING).set({
      payload: data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedBy: "web-client"
    });
    showToast("☁️ 숙소 정보 동기화 완료", "success");
  } catch (error) {
    console.error("[Firebase] 숙소 데이터 저장 실패:", error);
    handleFirestorePermissionError(error);
  }
}

/**
 * 현재 로컬에 저장된 모든 데이터(선수, 대진표, 식당, 숙소)를 Firebase로 일괄 전송
 */
async function uploadAllLocalDataToCloud() {
  if (!firestoreDb || !isFirebaseConnected) {
    alert("Firebase가 연결되어 있지 않습니다. 먼저 설정을 확인해주세요.");
    return false;
  }

  if (!confirm("현재 브라우저에 있는 모든 데이터(선수단 31명, 대진표, 식당, 숙소)를 Firebase 클라우드로 전송하시겠습니까?\n기존 클라우드 데이터는 덮어씌워집니다.")) {
    return false;
  }

  try {
    showCloudSavingPulse();
    const batch = firestoreDb.batch();
    const col = firestoreDb.collection(FS_COLLECTION);
    const now = firebase.firestore.FieldValue.serverTimestamp();

    batch.set(col.doc(FS_DOCS.PLAYERS), {
      payload: playerDataStore,
      updatedAt: now,
      note: "Initial Seed / Batch Upload"
    });

    batch.set(col.doc(FS_DOCS.BRACKETS), {
      payload: bracketsDataStore,
      updatedAt: now,
      note: "Initial Seed / Batch Upload"
    });

    batch.set(col.doc(FS_DOCS.DINING), {
      payload: diningPlacesDataStore,
      updatedAt: now,
      note: "Initial Seed / Batch Upload"
    });

    batch.set(col.doc(FS_DOCS.LODGING), {
      payload: lodgingPlacesDataStore,
      updatedAt: now,
      note: "Initial Seed / Batch Upload"
    });

    await batch.commit();
    showToast("✅ 클라우드 데이터 일괄 업로드 성공!", "success");
    alert("✅ 클라우드 데이터 업로드가 성공적으로 완료되었습니다!\n이제 모든 사용자 기기에서 실시간 동기화됩니다.");
    return true;
  } catch (error) {
    console.error("[Firebase] 일괄 업로드 실패:", error);
    handleFirestorePermissionError(error);
    alert("❌ 클라우드 데이터 업로드 실패:\n" + error.message + "\n\nFirestore 보안 규칙(Rules)이 쓰기 허용되어 있는지 확인해주세요.");
    return false;
  }
}

/**
 * 첫 연결 시 원격 DB가 비어있는 경우 자동으로 로컬 초기 데이터를 Firestore로 시딩
 */
async function autoSeedInitialDataIfEmpty() {
  if (hasAutoSeeded || !firestoreDb || !isFirebaseConnected) return;
  hasAutoSeeded = true;

  try {
    const col = firestoreDb.collection(FS_COLLECTION);
    const now = firebase.firestore.FieldValue.serverTimestamp();
    const batch = firestoreDb.batch();

    batch.set(col.doc(FS_DOCS.PLAYERS), {
      payload: (typeof playerDataStore !== "undefined" && playerDataStore && playerDataStore.gangneung) ? playerDataStore : INITIAL_PLAYERS,
      updatedAt: now,
      note: "Auto-Seeded Initial Roster"
    });

    batch.set(col.doc(FS_DOCS.BRACKETS), {
      payload: (typeof bracketsDataStore !== "undefined" && bracketsDataStore && bracketsDataStore.jokgu) ? bracketsDataStore : INITIAL_BRACKETS_DATA,
      updatedAt: now,
      note: "Auto-Seeded Initial Brackets"
    });

    batch.set(col.doc(FS_DOCS.DINING), {
      payload: (typeof diningPlacesDataStore !== "undefined" && diningPlacesDataStore && diningPlacesDataStore.length) ? diningPlacesDataStore : INITIAL_DINING_PLACES,
      updatedAt: now,
      note: "Auto-Seeded Initial Dining"
    });

    batch.set(col.doc(FS_DOCS.LODGING), {
      payload: (typeof lodgingPlacesDataStore !== "undefined" && lodgingPlacesDataStore && lodgingPlacesDataStore.length) ? lodgingPlacesDataStore : INITIAL_LODGING_PLACES,
      updatedAt: now,
      note: "Auto-Seeded Initial Lodging"
    });

    await batch.commit();
    console.log("[Firebase] 원격 Firestore에 기본 선수단 및 대진표 데이터가 성공적으로 자동 등록되었습니다.");
  } catch (e) {
    console.warn("[Firebase] 자동 시딩 실패 (보안 규칙 확인 필요):", e.message);
  }
}

let lastPermissionAlertTime = 0;

/**
 * 권한 오류 발생 시 친절한 안내 처리
 */
function handleFirestorePermissionError(err) {
  updateFirebaseStatusBadge("error", "권한 거부 (Rules 설정 필요)");
  
  // 15초 내 중복 알림 방지
  const now = Date.now();
  if (now - lastPermissionAlertTime < 15000) return;
  lastPermissionAlertTime = now;

  showToast("❌ Firestore 쓰기 권한이 거부되었습니다 (규칙 설정 필요)", "error");

  const guideMessage = 
    "⚠️ [Firebase Firestore 권한 오류 안내]\n\n" +
    "Firebase 클라우드에 데이터를 저장하려 했으나 거부되었습니다.\n\n" +
    "해결 방법 (30초 소요):\n" +
    "1. Firebase 콘솔(console.firebase.google.com) 접속\n" +
    "2. 'first-app-75a15' 프로젝트 > Firestore Database 이동\n" +
    "   (※ 아직 Database가 없다면 [데이터베이스 만들기]를 먼저 눌러주세요)\n" +
    "3. 상단 [규칙(Rules)] 탭 클릭 후 아래와 같이 수정:\n\n" +
    "rules_version = '2';\n" +
    "service cloud.firestore {\n" +
    "  match /databases/{database}/documents {\n" +
    "    match /{document=**} {\n" +
    "      allow read, write: if true;\n" +
    "    }\n" +
    "  }\n" +
    "}\n\n" +
    "4. [게시(Publish)] 버튼을 누르면 즉시 정상 저장됩니다!";

  console.warn(guideMessage);
  alert(guideMessage);
}

/**
 * Firestore 연결 및 읽기/쓰기 실시간 진단 테스트 함수
 */
async function diagnoseFirestoreConnection(showAlert = true) {
  if (!firestoreDb) {
    if (showAlert) alert("Firebase가 초기화되지 않았습니다.");
    return false;
  }

  updateFirebaseStatusBadge("syncing", "연결 진단 중...");

  try {
    const testDocRef = firestoreDb.collection(FS_COLLECTION).doc("_connection_test_");
    const testPayload = { ping: Date.now(), test: true };
    
    // 1. 쓰기 테스트
    await testDocRef.set(testPayload);
    // 2. 읽기 테스트
    const snap = await testDocRef.get();
    // 3. 정리
    await testDocRef.delete();

    if (snap.exists && snap.data().ping === testPayload.ping) {
      updateFirebaseStatusBadge("connected", "실시간 클라우드 연결됨");
      if (showAlert) {
        alert("🎉 [진단 결과: 완벽 정상]\n\nFirebase Cloud Firestore 읽기/쓰기가 완벽하게 작동하고 있습니다!\n모든 사용자 화면에서 실시간으로 데이터가 즉시 동기화됩니다.");
      }
      return true;
    } else {
      updateFirebaseStatusBadge("error", "진단 실패");
      if (showAlert) alert("⚠️ Firestore 데이터 읽기 검증에 실패했습니다.");
      return false;
    }
  } catch (error) {
    console.error("[Firebase 진단 오류]:", error);
    updateFirebaseStatusBadge("error", "연결/규칙 오류");
    
    if (showAlert) {
      if (error.code === "permission-denied") {
        alert(
          "❌ [진단 결과: 보안 규칙(Rules) 차단]\n\n" +
          "Firestore Database는 존재하지만 쓰기 권한이 닫혀 있습니다.\n\n" +
          "Firebase 콘솔 > Firestore Database > 규칙(Rules) 탭에서\n" +
          "allow read, write: if true; 로 변경 후 [게시]해 주세요!"
        );
      } else if (error.code === "not-found") {
        alert(
          "❌ [진단 결과: Database 미생성]\n\n" +
          "Firebase 프로젝트에 Firestore Database가 아직 생성되지 않았습니다.\n" +
          "Firebase 콘솔에서 [Firestore Database 만들기]를 완료해 주세요!"
        );
      } else {
        alert("❌ [진단 결과 오류]:\n" + (error.message || error.code));
      }
    }
    return false;
  }
}

/**
 * UI 상단 Firebase 상태 뱃지 업데이트
 */
function updateFirebaseStatusBadge(status, text) {
  const badge = document.getElementById("firebase-status-badge");
  const textEl = document.getElementById("firebase-status-text");
  const dotEl = document.getElementById("firebase-status-dot");
  if (!badge) return;

  badge.className = "firebase-status-badge status-" + status;
  if (text) {
    badge.title = "클라우드 상태: " + text;
  }
  if (textEl) textEl.textContent = "";
  
  if (dotEl) {
    if (status === "connected") {
      dotEl.style.backgroundColor = "#10b981"; // 초록
      dotEl.style.boxShadow = "0 0 8px #10b981";
    } else if (status === "syncing") {
      dotEl.style.backgroundColor = "#3b82f6"; // 파랑
      dotEl.style.boxShadow = "0 0 8px #3b82f6";
    } else if (status === "error") {
      dotEl.style.backgroundColor = "#ef4444"; // 빨강
      dotEl.style.boxShadow = "0 0 8px #ef4444";
    } else {
      dotEl.style.backgroundColor = "#9ca3af"; // 회색
      dotEl.style.boxShadow = "none";
    }
  }
}

/**
 * 실시간 수신 시 반짝임 효과
 */
function showCloudSyncPulse() {
  const badge = document.getElementById("firebase-status-badge");
  if (!badge) return;
  badge.classList.add("pulse-sync");
  setTimeout(() => {
    badge.classList.remove("pulse-sync");
  }, 1000);
}

/**
 * 클라우드 저장 중 효과
 */
function showCloudSavingPulse() {
  const badge = document.getElementById("firebase-status-badge");
  if (!badge) return;
  const originalTitle = badge.title;
  badge.title = "클라우드 저장 중...";
  badge.classList.add("pulse-sync");
  setTimeout(() => {
    badge.title = originalTitle;
    badge.classList.remove("pulse-sync");
  }, 1200);
}
