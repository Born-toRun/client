import { ArrowLeft, Shield } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침 | Born to Run",
  description: "Born to Run 개인정보처리방침",
};

export default function PrivacyPage() {
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
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-emerald-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              개인정보처리방침
            </h1>
          </div>
          <p className="text-gray-500 mb-8">최종 업데이트: 2026년 1월 5일</p>

          {/* 중요 공지 */}
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-8 rounded-r-xl">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-emerald-900 mb-2 text-lg">
                  개인정보 미수집 서비스
                </h3>
                <p className="text-emerald-800 leading-relaxed">
                  Born to Run은 <strong>개인정보를 일체 수집하지 않습니다.</strong>{" "}
                  회원가입 시 카카오 OAuth를 통해 인증만 진행하며, 이름과 프로필 사진 등의
                  최소한의 정보만 카카오로부터 제공받아 서비스 이용에 활용합니다.
                  서비스 자체적으로는 어떠한 개인정보도 저장하거나 처리하지 않습니다.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. 개인정보의 처리 목적
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Born to Run은 개인정보를 수집하지 않습니다. 카카오 로그인을 통해
                제공되는 최소한의 정보(이름, 프로필 사진)는 서비스 이용 시에만
                임시로 활용되며, 별도로 저장하거나 처리하지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. 개인정보의 수집 항목
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-gray-700 leading-relaxed font-medium mb-4">
                  Born to Run은 개인정보를 직접 수집하지 않습니다.
                </p>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>다만, 원활한 서비스 제공을 위해 카카오 OAuth 인증 시 다음 정보가 제공될 수 있습니다:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>카카오 계정 정보 (이름, 프로필 이미지)</li>
                    <li>서비스 이용 기록 (로그인 시간)</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <strong>※ 중요:</strong> 위 정보는 카카오로부터 임시로 제공받아 사용되며,
                    Born to Run의 서버에 저장되지 않습니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. 개인정보의 보유 및 이용기간
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Born to Run은 개인정보를 보유하지 않습니다. 카카오 로그인을 통해
                제공받은 정보는 세션이 유지되는 동안에만 메모리상에서 임시로
                사용되며, 로그아웃 또는 세션 종료 시 즉시 삭제됩니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. 개인정보의 제3자 제공
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Born to Run은 이용자의 개인정보를 수집하지 않으므로, 제3자에게
                제공할 개인정보가 없습니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. 개인정보처리의 위탁
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Born to Run은 원활한 서비스 제공을 위해 다음의 업체에 개인정보
                  처리를 위탁하고 있습니다:
                </p>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-3">위탁 업체</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>카카오</strong> - OAuth 인증 서비스
                        <p className="text-sm text-gray-600 mt-1">
                          위탁 내용: 회원 인증 및 로그인
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600">
                  위탁업체의 개인정보 처리에 관한 사항은 해당 업체의 개인정보처리방침을
                  참고하시기 바랍니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. 이용자의 권리·의무 및 그 행사방법
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Born to Run은 개인정보를 수집하지 않으므로, 개인정보 열람,
                  정정, 삭제 등의 권리 행사 대상이 되는 정보가 없습니다.
                </p>
                <p>
                  다만, 카카오 로그인을 통해 제공된 정보에 대한 권리는 카카오의
                  개인정보처리방침에 따라 카카오에 직접 요청하실 수 있습니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. 개인정보의 파기
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Born to Run은 개인정보를 보유하지 않으므로 파기할 정보가 없습니다.
                로그인 세션이 종료되면 임시로 사용된 모든 정보는 자동으로
                삭제됩니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. 개인정보 보호책임자
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Born to Run은 개인정보 처리에 관한 업무를 총괄해서 책임지고,
                  개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여
                  아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>개인정보 보호책임자</strong></p>
                  <p>이름: Born to Run 운영팀</p>
                  <p>이메일: doto.ri@kakao.com</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. 개인정보 처리방침 변경
              </h2>
              <p className="text-gray-700 leading-relaxed">
                이 개인정보처리방침은 2026년 1월 5일부터 적용되며, 법령 및 방침에
                따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의
                시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. 개인정보의 안전성 확보 조치
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Born to Run은 개인정보를 수집하지 않으나, 서비스 이용 과정에서
                  카카오로부터 제공받은 최소한의 정보 보호를 위해 다음과 같은
                  조치를 취하고 있습니다:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>HTTPS 통신을 통한 암호화 전송</li>
                  <li>세션 기반 인증으로 정보 최소화</li>
                  <li>로그아웃 시 즉시 정보 삭제</li>
                  <li>정기적인 보안 업데이트</li>
                </ul>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-500">
              본 개인정보처리방침은 2026년 1월 5일부터 적용됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
