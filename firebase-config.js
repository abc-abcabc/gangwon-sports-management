/**
 * Firebase Configuration Module
 * 제31회 강원초등교원체육대회 관리 시스템 - Firebase 연동 설정
 * 
 * Firebase 콘솔(https://console.firebase.google.com)에서
 * 웹 앱 생성 후 발급받은 firebaseConfig를 여기에 입력하거나,
 * 웹 브라우저 UI의 [🔥 Firebase 설정] 모달에서 바로 입력/저장할 수 있습니다.
 */

// 1. 소스코드 내 기본 설정
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyCMLAiGEDehF8_Q70tggvgwFqhjFWTnhv8",
  authDomain: "first-app-75a15.firebaseapp.com",
  projectId: "first-app-75a15",
  storageBucket: "first-app-75a15.firebasestorage.app",
  messagingSenderId: "595692929185",
  appId: "1:595692929185:web:cc58ce581d3bfabdecb0e0",
  measurementId: "G-77Q12LNLQY"
};

const FIREBASE_CONFIG_STORAGE_KEY = "GANGWON_PE_FIREBASE_CONFIG_V1";

/**
 * 활성화된 Firebase 설정을 반환합니다.
 * (UI에서 사용자가 입력하여 LocalStorage에 저장한 설정을 최우선으로 적용)
 */
function getActiveFirebaseConfig() {
  try {
    const saved = localStorage.getItem(FIREBASE_CONFIG_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.projectId && parsed.apiKey) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("[FirebaseConfig] 로컬 설정 파싱 실패:", e);
  }

  // 코드 내 기본 설정 반환
  if (DEFAULT_FIREBASE_CONFIG && DEFAULT_FIREBASE_CONFIG.projectId && DEFAULT_FIREBASE_CONFIG.apiKey) {
    return DEFAULT_FIREBASE_CONFIG;
  }

  return null;
}

/**
 * UI 모달에서 입력받은 설정을 LocalStorage에 저장
 */
function saveFirebaseConfigToStorage(config) {
  if (!config || typeof config !== "object") {
    throw new Error("올바른 Firebase 설정 객체가 아닙니다.");
  }
  if (!config.projectId || !config.apiKey) {
    throw new Error("apiKey와 projectId는 필수 입력 항목입니다.");
  }
  localStorage.setItem(FIREBASE_CONFIG_STORAGE_KEY, JSON.stringify(config));
  return true;
}

/**
 * 저장된 Firebase 설정을 삭제 (초기화)
 */
function removeFirebaseConfigFromStorage() {
  localStorage.removeItem(FIREBASE_CONFIG_STORAGE_KEY);
}
