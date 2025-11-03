import MenuItem from "./MenuItem";
import type { MenuSection as MenuSectionType } from "../constants";

interface MenuSectionProps {
  section: MenuSectionType;
}

/**
 * 마이페이지 메뉴 섹션 컴포넌트
 * - 섹션 제목과 메뉴 아이템 목록을 렌더링
 * - 각 아이템은 구분선으로 구분
 */
export default function MenuSection({ section }: MenuSectionProps) {
  return (
    <div className="mb-8">
      {/* 섹션 제목 */}
      <h2 className="title-md text-n-900 px-5 mb-3">{section.title}</h2>

      {/* 메뉴 아이템 목록 */}
      <div className="bg-white border border-n-20 rounded-lg overflow-hidden">
        {section.items.map((item, index) => (
          <div key={item.id}>
            <MenuItem item={item} />
            {/* 마지막 아이템이 아닌 경우 구분선 표시 */}
            {index < section.items.length - 1 && (
              <div className="border-b border-n-20 mx-5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
