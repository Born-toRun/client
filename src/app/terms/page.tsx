import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "이용약관 | Born to Run",
  description: "Born to Run 서비스 이용약관",
};

export default function TermsPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            이용약관
          </h1>
          <p className="text-gray-500 mb-8">최종 업데이트: 2026년 1월 5일</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                제1조 (목적)
              </h2>
              <p className="text-gray-700 leading-relaxed">
                본 약관은 Born to Run(이하 &ldquo;서비스&rdquo;)이 제공하는 러닝 크루
                커뮤니티 서비스의 이용과 관련하여 서비스와 이용자 간의 권리,
                의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                제2조 (정의)
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>본 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
                <ul className="list-decimal list-inside space-y-2 ml-4">
                  <li>
                    &ldquo;서비스&rdquo;란 Born to Run이 제공하는 러닝 크루 커뮤니티 플랫폼
                    및 관련 서비스를 의미합니다.
                  </li>
                  <li>
                    &ldquo;이용자&rdquo;란 본 약관에 따라 서비스를 이용하는 회원 및
                    비회원을 말합니다.
                  </li>
                  <li>
                    &ldquo;회원&rdquo;이란 서비스에 가입하여 지속적으로 서비스를 이용할 수
                    있는 자를 말합니다.
                  </li>
                  <li>
                    &ldquo;크루&rdquo;란 회원들이 모여 함께 러닝 활동을 하는 그룹을
                    의미합니다.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                제3조 (약관의 효력 및 변경)
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  1. 본 약관은 서비스 화면에 게시하거나 기타의 방법으로
                  이용자에게 공지함으로써 효력이 발생합니다.
                </p>
                <p>
                  2. 서비스는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본
                  약관을 변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로
                  공지함으로써 효력이 발생합니다.
                </p>
                <p>
                  3. 이용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을
                  중단하고 탈퇴할 수 있습니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                제4조 (회원가입)
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  1. 이용자는 서비스가 정한 가입 양식에 따라 회원정보를 기입한
                  후 본 약관에 동의한다는 의사표시를 함으로써 회원가입을
                  신청합니다.
                </p>
                <p>
                  2. 서비스는 제1항과 같이 회원으로 가입할 것을 신청한 이용자
                  중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>가입신청자가 본 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</li>
                  <li>등록 내용에 허위, 기재누락, 오기가 있는 경우</li>
                  <li>기타 회원으로 등록하는 것이 서비스의 기술상 현저히 지장이 있다고 판단되는 경우</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                제5조 (서비스의 제공)
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>서비스는 다음과 같은 업무를 수행합니다:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>러닝 크루 생성 및 관리</li>
                  <li>크루 모임 생성 및 참여</li>
                  <li>출석 코드를 통한 모임 인증</li>
                  <li>마라톤 챌린지 참여</li>
                  <li>러닝 기록 관리</li>
                  <li>크루원 간 커뮤니티 활동</li>
                  <li>기타 서비스가 정하는 업무</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                제6조 (서비스의 중단)
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  1. 서비스는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장,
                  통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을
                  일시적으로 중단할 수 있습니다.
                </p>
                <p>
                  2. 서비스는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로
                  인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단,
                  서비스에 고의 또는 과실이 없는 경우에는 그러하지 아니합니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                제7조 (회원 탈퇴 및 자격 상실)
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  1. 회원은 서비스에 언제든지 탈퇴를 요청할 수 있으며 서비스는
                  즉시 회원탈퇴를 처리합니다.
                </p>
                <p>
                  2. 회원이 다음 각 호의 사유에 해당하는 경우, 서비스는 회원자격을
                  제한 및 정지시킬 수 있습니다:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>가입 신청 시에 허위 내용을 등록한 경우</li>
                  <li>타인의 서비스 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우</li>
                  <li>서비스를 이용하여 법령 또는 본 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                제8조 (이용자의 의무)
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>이용자는 다음 행위를 하여서는 안 됩니다:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>신청 또는 변경 시 허위 내용의 등록</li>
                  <li>타인의 정보 도용</li>
                  <li>서비스에 게시된 정보의 변경</li>
                  <li>서비스가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                  <li>서비스 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                  <li>서비스 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                  <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                제9조 (저작권의 귀속)
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  1. 서비스가 작성한 저작물에 대한 저작권 기타 지적재산권은
                  서비스에 귀속합니다.
                </p>
                <p>
                  2. 이용자는 서비스를 이용함으로써 얻은 정보 중 서비스에게
                  지적재산권이 귀속된 정보를 서비스의 사전 승낙 없이 복제, 송신,
                  출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나
                  제3자에게 이용하게 하여서는 안됩니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                제10조 (재판권 및 준거법)
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  1. 서비스와 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은
                  제소 당시의 이용자의 주소에 의하고, 주소가 없는 경우에는
                  거소를 관할하는 지방법원의 전속관할로 합니다. 다만, 제소 당시
                  이용자의 주소 또는 거소가 분명하지 않거나 외국 거주자의 경우에는
                  민사소송법상의 관할법원에 제기합니다.
                </p>
                <p>
                  2. 서비스와 이용자 간에 제기된 전자상거래 소송에는 대한민국
                  법을 적용합니다.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-500">
              본 약관은 2026년 1월 5일부터 적용됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
