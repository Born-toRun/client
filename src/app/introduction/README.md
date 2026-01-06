# Introduction Page - Born to Run

## 개요
Born to Run의 랜딩/소개 페이지입니다. 서비스의 핵심 가치와 기능을 소개하고 사용자의 가입을 유도하는 페이지입니다.

## 페이지 구조

### 1. Hero Section
- **디자인**: 전체 화면 크기의 스플릿 디자인
- **특징**:
  - Emerald 그라데이션 배경 (emerald-500 → emerald-600 → teal-700)
  - 패턴 배경 오버레이
  - 메인 헤드라인과 서브 카피
  - 2개의 CTA 버튼 (회원가입, 크루 둘러보기)
  - 3가지 통계 수치 (활동 크루, 크루원, 완주 기록)
  - 스크롤 인디케이터 애니메이션
- **애니메이션**: Fade in + Slide up, 순차적 등장

### 2. Trust Bar
- **디자인**: 수평 배치의 신뢰 지표
- **특징**: 3가지 핵심 가치 제시
  - GPS 기반 정확한 출석 인증
  - 마라톤 완주 챌린지
  - 10,000+ 활동 크루원

### 3. Problem-Solution Section
- **디자인**: 문제 제시 → 해결책 제시 구조
- **특징**:
  - 문제: "혼자 달리기는 너무 외롭고 지루해요"
  - 해결책: "함께라서 더 오래 달릴 수 있어요"
  - 3개의 솔루션 카드 (동기부여, GPS 출석, 목표 달성)
- **애니메이션**: Scale in + Hover 효과

### 4. Features Showcase - Bento Grid
- **디자인**: 비대칭 그리드 레이아웃 (Bento Grid)
- **특징**:
  - 대형 피처 카드 1개 (GPS 출석 인증)
  - 일반 피처 카드 5개
    - 마라톤 챌린지
    - 실시간 러닝 기록
    - 크루 커뮤니티
    - 출석 캘린더
    - 달성 배지
- **색상**: 각 카드마다 다른 그라데이션
- **애니메이션**: Stagger children, Hover 효과

### 5. How It Works - Timeline
- **디자인**: 3단계 프로세스 타임라인
- **특징**:
  - Step 01: 회원가입
  - Step 02: 크루 찾기
  - Step 03: 함께 달리기
  - 각 스텝마다 아이콘과 컬러 구분
- **애니메이션**: 순차적 Fade in

### 6. Marathon Feature Deep Dive
- **디자인**: 2열 그리드 (콘텐츠 + 비주얼)
- **특징**:
  - 3가지 마라톤 코스 (풀/하프/10K)
  - 실시간 진행률 표시
  - 누적 거리, 남은 거리, 참여 인원, 완주 예정 통계
- **배경**: Amber/Orange 그라데이션

### 7. Social Proof Section
- **디자인**: 3열 그리드의 후기 카드
- **특징**:
  - 실제 크루원들의 후기 (3개)
  - 각 후기마다 5점 별점
  - 아바타, 이름, 소속 크루 표시
  - 하단에 4가지 통계 지표
- **애니메이션**: Scale in + Hover 효과

### 8. Final CTA Section
- **디자인**: Full-width CTA 섹션
- **특징**:
  - 강력한 헤드라인
  - 2개의 CTA 버튼
  - 3가지 가입 장점 (무료 가입, 카드 정보 불필요, 언제든 시작 가능)
- **배경**: Emerald 그라데이션 + 패턴

### 9. Footer
- **디자인**: 4열 그리드
- **특징**:
  - 브랜드 정보 + 소셜 링크
  - 바로가기 (크루 찾기, 러닝 기록, 피드, 마이페이지)
  - 고객지원 (공지사항, FAQ, 문의하기, 이용가이드)
  - 약관 및 정책
  - Copyright 정보

## 기술 스펙

### 사용 기술
- **Framework**: Next.js 15 App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Icons**: Lucide React

### 애니메이션 구현
```typescript
// 주요 애니메이션 Variants
- fadeInUp: 아래에서 위로 페이드인
- fadeIn: 단순 페이드인
- staggerContainer: 자식 요소 순차 애니메이션
- scaleIn: 스케일 + 페이드인
```

### 반응형 브레이크포인트
- **Mobile**: < 768px (1열 레이아웃)
- **Tablet**: 768px - 1024px (2열 레이아웃)
- **Desktop**: > 1024px (3-4열 레이아웃)

### 접근성 (WCAG 2.1 AA)
- 시맨틱 HTML 사용
- aria-label 적용 (소셜 링크 등)
- 적절한 색상 대비율
- 키보드 네비게이션 지원
- alt 텍스트 (필요시 추가)

### SEO 최적화
- Metadata 설정
  - title, description
  - keywords
  - Open Graph tags
  - Twitter Card
- 시맨틱 HTML 구조
- 적절한 heading hierarchy

## 컬러 팔레트

### Primary Colors
- Emerald-500: `#10b981`
- Emerald-600: `#059669`
- Teal-700: `#0f766e`

### Accent Colors
- Amber-500: `#f59e0b`
- Orange-600: `#ea580c`

### Feature Card Gradients
- GPS: emerald-500 → teal-600
- Marathon: amber-500 → orange-600
- Activity: blue-500 → indigo-600
- Crew: purple-500 → pink-600
- Calendar: green-500 → emerald-600
- Badge: red-500 → rose-600

## 성능 최적화

### 구현된 최적화
1. **Code Splitting**: 클라이언트 컴포넌트 분리
2. **Lazy Loading**: Intersection Observer 기반 애니메이션
3. **Image Optimization**: (필요시 next/image 사용)
4. **CSS-in-JS 최소화**: Tailwind CSS 활용

### 번들 사이즈
- Introduction Page: ~8.84 kB
- First Load JS: ~152 kB

## 추가 개선 사항 (향후)

### 콘텐츠
- [ ] 실제 이미지/스크린샷 추가
- [ ] 실제 크루원 후기로 교체
- [ ] 실제 통계 데이터 연동
- [ ] 비디오 콘텐츠 추가

### 기능
- [ ] 스크롤 진행 바
- [ ] 섹션별 앵커 링크
- [ ] 라이트박스 (이미지 확대)
- [ ] A/B 테스트 준비

### 성능
- [ ] 이미지 WebP 포맷
- [ ] Critical CSS 인라인
- [ ] Prefetch 주요 페이지

## 파일 구조
```
/src/app/introduction/
├── page.tsx              # 서버 컴포넌트 (메타데이터)
├── IntroductionClient.tsx # 클라이언트 컴포넌트 (UI + 애니메이션)
└── README.md             # 문서
```

## 라우팅
- **URL**: `/introduction`
- **Type**: Static (pre-rendered)

## 연결된 페이지
- `/signup` - 회원가입
- `/crew` - 크루 목록
- `/running` - 러닝 기록
- `/feeds` - 피드
- `/my-page` - 마이페이지

## 개발 가이드

### 로컬 개발
```bash
npm run dev
# http://localhost:3000/introduction
```

### 빌드 및 배포
```bash
npm run build
npm run start
```

### 스타일 수정
모든 스타일은 Tailwind CSS 유틸리티 클래스로 작성되어 있습니다.
커스텀 색상은 `/src/app/globals.css`에 정의되어 있습니다.

### 애니메이션 수정
Framer Motion의 variants를 수정하여 애니메이션을 조정할 수 있습니다.
- duration: 애니메이션 지속 시간
- delay: 지연 시간
- ease: Easing 함수

## 문의
기술적 문의사항이나 버그 리포트는 프로젝트 관리자에게 문의해주세요.
