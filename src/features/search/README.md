# Search Feature

피드 검색 기능을 제공하는 모듈입니다.

## 구조

```
src/features/search/
├── SearchOverlay.tsx         # 메인 검색 오버레이 컴포넌트
├── components/
│   ├── SearchHeader.tsx      # 검색 헤더 (닫기 버튼 + 검색창)
│   ├── SearchHistoryList.tsx # 검색 기록 목록
│   ├── SearchHistoryItem.tsx # 개별 검색 기록 아이템
│   └── EmptySearchState.tsx  # 빈 상태 컴포넌트
├── hooks/
│   └── queries.ts            # React Query 훅들
├── api/
│   └── index.ts              # API 함수들
├── types.ts                  # 타입 정의
├── index.ts                  # Export 파일
└── README.md                 # 이 파일
```

## 주요 기능

### 1. 검색 오버레이 (SearchOverlay)
- 전체 화면을 덮는 검색 인터페이스
- ESC 키로 닫기 기능
- framer-motion을 이용한 부드러운 애니메이션

### 2. 최근 검색어 관리
- 최근 검색어 조회 (최대 10개)
- 검색어 자동 등록
- 개별 검색어 삭제
- 전체 검색어 일괄 삭제

### 3. 검색 실행
- Enter 키 또는 검색 아이콘 클릭으로 검색
- 검색어 클릭으로 재검색
- 검색 중 로딩 상태 표시

## API 엔드포인트

### 최근 검색어 조회
```
GET /api/v1/recent-search-keywords
Response: { searchKeywords: string[] }
```

### 최근 검색어 등록
```
POST /api/v1/recent-search-keywords/{keyword}
Response: 201 Created
```

### 최근 검색어 삭제
```
DELETE /api/v1/recent-search-keywords/{keyword}
Response: 200 OK
```

### 최근 검색어 일괄 삭제
```
DELETE /api/v1/recent-search-keywords
Response: 200 OK
```

### 피드 검색
```
GET /api/v1/feeds?searchKeyword={keyword}&category={category}&lastFeedId={lastFeedId}&size={size}
Response: FeedListResponse (paginated)
```

## 사용 방법

### 1. MainHeader에서 검색 오버레이 열기

```tsx
import { useModal } from "@/features/hooks/useModal";
import SearchOverlay from "@/features/search/SearchOverlay";

function FeedContainer() {
  const searchOverlay = useModal();
  const [searchKeyword, setSearchKeyword] = useState<string | undefined>(undefined);

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    // 검색어가 설정되면 자동으로 피드 목록이 갱신됨
  };

  return (
    <>
      <MainHeader onSearchClick={searchOverlay.open} />
      <SearchOverlay
        isOpen={searchOverlay.isActive}
        onClose={searchOverlay.close}
        onSearch={handleSearch}
      />
      {/* 피드 목록 */}
    </>
  );
}
```

### 2. 피드 목록에 검색어 전달

```tsx
const { data, isPending, hasNextPage, fetchNextPage } = useGetFeesListQuery({
  isMyCrew,
  category: selectedTabs,
  searchKeyword, // 검색어가 있으면 검색 모드로 동작
});
```

### 3. 검색 결과 표시

```tsx
{searchKeyword && (
  <div className="px-[16px] py-[12px] flex items-center justify-between bg-n-50">
    <span className="body-md text-n-300">
      <span className="text-black font-semibold">{searchKeyword}</span> 검색 결과
    </span>
    <button
      onClick={() => setSearchKeyword(undefined)}
      className="body-md text-n-200 underline"
      type="button"
    >
      검색 취소
    </button>
  </div>
)}
```

## React Query 훅

### useSearchHistoryQuery
최근 검색어 목록을 조회합니다.

```tsx
const { data, isLoading } = useSearchHistoryQuery(enabled);
// data: { searchKeywords: string[] }
```

### useRegisterSearchKeywordMutation
검색어를 등록합니다.

```tsx
const registerMutation = useRegisterSearchKeywordMutation();
registerMutation.mutate({ keyword: "러닝" });
```

### useDeleteSearchKeywordMutation
개별 검색어를 삭제합니다.

```tsx
const deleteMutation = useDeleteSearchKeywordMutation();
deleteMutation.mutate({ keyword: "러닝" });
```

### useDeleteAllSearchKeywordsMutation
모든 검색어를 일괄 삭제합니다.

```tsx
const deleteAllMutation = useDeleteAllSearchKeywordsMutation();
deleteAllMutation.mutate();
```

## 컴포넌트 Props

### SearchOverlay
```tsx
interface SearchOverlayProps {
  isOpen: boolean;           // 오버레이 표시 여부
  onClose: () => void;       // 닫기 핸들러
  onSearch: (keyword: string) => void; // 검색 실행 핸들러
}
```

### SearchHeader
```tsx
interface SearchHeaderProps {
  value: string;             // 검색어 입력 값
  onChange: (value: string) => void; // 입력 변경 핸들러
  onSearch: () => void;      // 검색 실행 핸들러
  onClose: () => void;       // 닫기 핸들러
  isLoading?: boolean;       // 로딩 상태
}
```

### SearchHistoryList
```tsx
interface SearchHistoryListProps {
  keywords: string[];        // 검색어 목록
  onKeywordClick: (keyword: string) => void; // 검색어 클릭 핸들러
  onKeywordDelete: (keyword: string) => void; // 삭제 핸들러
  onClearAll: () => void;    // 전체 삭제 핸들러
}
```

## 스타일링

- Tailwind CSS 사용
- 디자인 시스템의 색상 토큰 사용 (n-50, n-100, n-200, n-300)
- 타이포그래피 클래스 (title-xl, title-md, body-lg, body-md)
- 반응형 디자인 (최대 너비: 786px)

## 에러 처리

- API 호출 실패 시 콘솔에 에러 로그 출력
- 로딩 상태 동안 사용자 입력 비활성화
- 빈 검색어 입력 시 검색 실행 방지
- 401 에러 시 자동 토큰 갱신 (runClient 인터셉터)

## 주의사항

1. **검색어 인코딩**: URL에 검색어를 포함할 때 `encodeURIComponent` 사용
2. **최대 표시 개수**: 최근 검색어는 최대 10개까지만 표시
3. **캐시 관리**: React Query를 통한 자동 캐시 무효화
4. **접근성**: aria-label 속성으로 스크린 리더 지원
5. **키보드 단축키**: Enter로 검색, ESC로 닫기

## 향후 개선 사항

- [ ] 검색어 자동완성 기능
- [ ] 인기 검색어 표시
- [ ] 검색 결과 필터링 (날짜, 작성자 등)
- [ ] 검색 결과 정렬 옵션
- [ ] 검색 결과 하이라이팅
