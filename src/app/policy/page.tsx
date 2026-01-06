import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "운영정책 | Born to Run",
  description: "Born to Run 운영정책",
};

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link
          href="/introduction"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>돌아가기</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              운영정책
            </h1>
          </div>
          <p className="text-gray-500 mb-8">최종 업데이트: 2026년 1월 5일</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. 기본 원칙
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Born to Run은 건강한 러닝 문화를 만들고 크루원들이 안전하고
                  즐겁게 활동할 수 있는 환경을 조성하기 위해 다음의 운영정책을
                  수립하였습니다.
                </p>
                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                  <h3 className="font-bold text-emerald-900 mb-3">핵심 가치</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600">•</span>
                      <span>서로 존중하고 배려하는 커뮤니티</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600">•</span>
                      <span>공정하고 투명한 운영</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600">•</span>
                      <span>안전한 러닝 환경 조성</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600">•</span>
                      <span>건강한 습관 형성 지원</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. 크루 운영 정책
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <h3 className="text-xl font-bold text-gray-900">2.1 크루 생성</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>모든 회원은 자유롭게 크루를 생성할 수 있습니다.</li>
                  <li>크루명은 타인에게 불쾌감을 주지 않는 범위 내에서 자유롭게 설정할 수 있습니다.</li>
                  <li>크루 생성 시 크루장(관리자) 권한이 자동으로 부여됩니다.</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mt-6">2.2 크루 가입</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>회원은 원하는 크루를 자유롭게 선택하여 가입할 수 있습니다.</li>
                  <li>각 회원은 하나의 크루에만 가입할 수 있습니다.</li>
                  <li>크루 탈퇴 후 다른 크루에 가입할 수 있습니다.</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mt-6">2.3 크루장의 권한과 책임</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>크루 정보 수정 (크루명, 소개, 활동 지역 등)</li>
                  <li>크루 모임 생성 및 관리</li>
                  <li>크루원 관리 (강제 탈퇴 등)</li>
                  <li>운영진 지정 및 권한 부여</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. 모임 및 출석 정책
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <h3 className="text-xl font-bold text-gray-900">3.1 모임 생성</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>크루장 및 운영진은 모임을 생성할 수 있습니다.</li>
                  <li>모임 생성 시 일시, 장소, 활동 내용을 명확히 기재해야 합니다.</li>
                  <li>모임은 생성 후 크루원들에게 자동으로 공지됩니다.</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mt-6">3.2 출석 코드 인증</h3>
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>모임 시작 시 크루장/운영진이 4자리 랜덤 코드를 생성합니다.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>참여 크루원은 해당 코드를 입력하여 출석을 인증합니다.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>출석 코드는 모임 시작 10분 전부터 종료 2시간 후까지 유효합니다.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>코드 공유 또는 대리 출석은 금지되며, 적발 시 제재를 받을 수 있습니다.</span>
                    </li>
                  </ul>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mt-6">3.3 출석 기록</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>출석 기록은 자동으로 저장되며 개인 프로필에서 확인할 수 있습니다.</li>
                  <li>출석 기록은 마라톤 챌린지 진행률에 반영됩니다.</li>
                  <li>출석 통계는 크루 랭킹에 활용될 수 있습니다.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. 마라톤 챌린지 정책
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <h3 className="text-xl font-bold text-gray-900">4.1 챌린지 종류</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                    <h4 className="font-bold text-red-900 mb-2">풀 마라톤</h4>
                    <p className="text-sm">42.195 km</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <h4 className="font-bold text-orange-900 mb-2">하프 마라톤</h4>
                    <p className="text-sm">21.0975 km</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                    <h4 className="font-bold text-yellow-900 mb-2">10K 코스</h4>
                    <p className="text-sm">10 km</p>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mt-6">4.2 참여 방법</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>크루별로 챌린지에 참여할 수 있습니다.</li>
                  <li>출석한 모임의 러닝 거리가 자동으로 누적됩니다.</li>
                  <li>목표 거리 달성 시 완주 배지가 부여됩니다.</li>
                  <li>여러 챌린지에 동시 참여 가능합니다.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. 커뮤니티 이용 정책
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <h3 className="text-xl font-bold text-gray-900">5.1 게시글 작성</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>회원은 자유롭게 러닝 후기, 팁, 일상 등을 공유할 수 있습니다.</li>
                  <li>욕설, 비방, 혐오 표현이 담긴 게시글은 금지됩니다.</li>
                  <li>상업적 광고 목적의 게시글은 사전 승인이 필요합니다.</li>
                  <li>타인의 저작권을 침해하는 콘텐츠는 게시할 수 없습니다.</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mt-6">5.2 댓글 작성</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>타인을 존중하는 댓글 문화를 지향합니다.</li>
                  <li>건설적인 비판은 환영하나, 인신공격은 금지됩니다.</li>
                  <li>스팸성 댓글이나 도배는 제재 대상입니다.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. 제재 정책
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  다음과 같은 행위가 적발될 경우 경고, 일시정지, 영구정지 등의
                  제재를 받을 수 있습니다:
                </p>
                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                  <h3 className="font-bold text-red-900 mb-3">제재 대상 행위</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">•</span>
                      <span>출석 코드 부정 사용 (공유, 대리 출석 등)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">•</span>
                      <span>타인을 비방하거나 모욕하는 행위</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">•</span>
                      <span>허위 정보 유포</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">•</span>
                      <span>음란물, 폭력물 등 부적절한 콘텐츠 게시</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">•</span>
                      <span>서비스 운영 방해 행위</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">•</span>
                      <span>기타 관련 법령 위반 행위</span>
                    </li>
                  </ul>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mt-6">제재 단계</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>1차 위반: 경고 및 해당 콘텐츠 삭제</li>
                  <li>2차 위반: 7일 이용 정지</li>
                  <li>3차 위반: 30일 이용 정지</li>
                  <li>4차 위반 또는 중대한 위반: 영구 이용 정지</li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. 면책 사항
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Born to Run은 러닝 활동 중 발생하는 사고나 부상에 대해 책임을
                    지지 않습니다.
                  </li>
                  <li>
                    각 크루는 독립적으로 운영되며, 크루 내에서 발생하는 문제에
                    대한 1차적 책임은 크루장에게 있습니다.
                  </li>
                  <li>
                    회원 간 분쟁은 당사자 간 해결을 원칙으로 하며, 서비스는
                    중재 역할만 수행합니다.
                  </li>
                  <li>
                    시스템 장애, 네트워크 오류 등 불가항력적 상황으로 인한 서비스
                    중단에 대해서는 책임을 지지 않습니다.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. 정책 변경
              </h2>
              <p className="text-gray-700 leading-relaxed">
                본 운영정책은 서비스 개선 및 법령 변경에 따라 수정될 수 있으며,
                변경 시 최소 7일 전에 공지사항을 통해 안내됩니다. 중대한 변경
                사항의 경우 30일 전에 공지합니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. 문의 및 신고
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-gray-700 leading-relaxed mb-4">
                  운영정책 관련 문의사항이나 위반 사례 신고는 다음 채널을 통해
                  접수해 주시기 바랍니다:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p>이메일: doto.ri@kakao.com</p>
                  <p>운영시간: 평일 09:00 - 18:00 (공휴일 제외)</p>
                  <p className="text-sm text-gray-600 mt-4">
                    ※ 신고 시 구체적인 증거자료(스크린샷 등)를 함께 제출해 주시면
                    신속한 처리가 가능합니다.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-500">
              본 운영정책은 2026년 1월 5일부터 적용됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
