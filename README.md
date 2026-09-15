# 제31회 강원초등교원체육대회 - 강릉교육지원청 선수단 관리 시스템

강원특별자치도교육청 주최, 강원초등체육연구회 주관 제31회 강원초등교원체육대회 강릉교육지원청 전용 선수단 참가 및 관리 웹 시스템입니다.

## Vercel 원클릭 배포 (One-Click Deploy)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/abc-abcabc/gangwon-sports-management)

위 버튼을 누르시면 Vercel 대시보드에서 자동으로 저장소가 연결되어 클릭 한 번으로 배포됩니다.

## 주요 기능
- **선수 명단 실시간 관리**: 축구, 족구, 배드민턴 출전 선수 및 숙박/만찬 현황 관리
- **대진표 및 경기 일정**: 종목별(족구, 축구, 배드민턴) A/B조 대진 및 점수 관리
- **경기장, 식사 및 숙소 안내**: 날짜별 식사 장소 및 지정 숙소 안내
- **관리자 인증 보안 모드**: 🔒 관리자 권한 인증을 통한 안전한 데이터 수정
- **Excel 연동**: 참가자 명단 엑셀(XLSX/CSV) 내보내기, 양식 다운로드, 엑셀 업로드 지원
- **Firebase 클라우드 실시간 동기화**: 모든 기기(스마트폰/PC) 간 선수 명단 및 대진표 점수 실시간 양방향 연동

## 🔥 Firebase 연동 가이드

1. **Firebase 콘솔**(https://console.firebase.google.com) 접속 후 프로젝트 생성
2. **웹 앱(</>) 추가** 후 생성된 `firebaseConfig` 복사
3. **Firestore Database 생성**:
   - 위치: `asia-northeast3 (서울)` 권장
   - **규칙(Rules)** 탭에서 모든 사용자가 실시간 읽기/쓰기 가능하도록 설정:
     ```javascript
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /{document=**} {
           allow read, write: if true;
         }
       }
     }
     ```
4. **웹 앱에서 연동**:
   - 화면 우측 상단 **[🔥 로컬 모드]** 버튼 클릭
   - 발급받은 `firebaseConfig` 객체를 JSON 입력란에 붙여넣고 **[추출하여 채우기]** 클릭 후 **[설정 저장 및 연결]** 클릭
   - **[⬆️ 클라우드로 일괄 전송]**을 누르면 현재 선수단 31명 및 대진표 데이터가 즉시 클라우드로 업로드됩니다!

