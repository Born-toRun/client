# Contexts

이 디렉토리는 React Context API를 사용한 전역 상태 관리 Provider들을 포함합니다.

## LoginBottomSheetContext

401 에러 발생 시 자동으로 LoginBottomSheet를 표시하기 위한 전역 Context입니다.

### 사용 예시

#### 1. 컴포넌트에서 LoginBottomSheet 표시

```tsx
import { useLoginBottomSheet } from "@/contexts/LoginBottomSheetContext";

function ProtectedFeature() {
  const { showLoginBottomSheet, isOpen } = useLoginBottomSheet();
  const user = useCurrentUser();

  const handleLike = () => {
    if (!user) {
      // 로그인이 필요한 경우 LoginBottomSheet 표시
      showLoginBottomSheet();
      return;
    }

    // 로그인된 경우 좋아요 처리
    performLike();
  };

  return (
    <button onClick={handleLike}>
      좋아요
    </button>
  );
}
```

#### 2. Axios Interceptor에서 자동 처리 (이미 구현됨)

```typescript
// /src/client/runClient.ts
import { showLoginBottomSheet } from "@/utils/loginBottomSheetManager";

// 401 에러 발생 시 자동으로 LoginBottomSheet 표시
if (error.response?.status === 401) {
  showLoginBottomSheet();
}
```

#### 3. 비-React 환경에서 LoginBottomSheet 표시

```typescript
import { showLoginBottomSheet } from "@/utils/loginBottomSheetManager";

// 유틸리티 함수에서 사용
export function checkAuth() {
  const token = getAccessToken();

  if (!token) {
    showLoginBottomSheet();
    return false;
  }

  return true;
}
```

### API

#### `useLoginBottomSheet()`

LoginBottomSheet를 제어하기 위한 커스텀 훅입니다.

**반환값:**
- `showLoginBottomSheet: () => void` - LoginBottomSheet를 표시합니다
- `hideLoginBottomSheet: () => void` - LoginBottomSheet를 숨깁니다
- `isOpen: boolean` - LoginBottomSheet의 현재 표시 상태

**주의:** 이 훅은 `LoginBottomSheetProvider` 내부에서만 사용할 수 있습니다.

#### `showLoginBottomSheet()` (from loginBottomSheetManager)

React Context 외부에서 LoginBottomSheet를 표시하기 위한 전역 함수입니다.

```typescript
import { showLoginBottomSheet } from "@/utils/loginBottomSheetManager";

showLoginBottomSheet();
```

### 설정

`LoginBottomSheetProvider`는 앱의 루트 레이아웃에 이미 설정되어 있습니다:

```tsx
// /src/app/layout.tsx
<QueryProvider>
  <LoginBottomSheetProvider>
    <body>
      {children}
    </body>
  </LoginBottomSheetProvider>
</QueryProvider>
```

## 새로운 Context 추가하기

새로운 전역 Context를 추가하려면:

1. 이 디렉토리에 새 파일 생성 (예: `MyContext.tsx`)
2. Context와 Provider 컴포넌트 작성
3. 커스텀 훅 생성
4. `/src/app/layout.tsx`에 Provider 추가

```tsx
// MyContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface MyContextType {
  value: string;
  setValue: (value: string) => void;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export function MyProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState("");

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  const context = useContext(MyContext);

  if (context === undefined) {
    throw new Error("useMyContext must be used within MyProvider");
  }

  return context;
}
```
