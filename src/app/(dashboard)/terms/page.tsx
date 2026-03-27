import FadeIn from "@/components/motion/FadeIn";

export default function TermsPage() {
  return (
    <FadeIn>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <p className="label">Terms of Service</p>
          <h1 className="h1">利用規約</h1>
          <p className="text-[13px] text-black-500 mt-2">最終更新日: 2026年4月1日</p>
        </div>

        <div className="space-y-6 text-[15px] text-black-300 leading-[1.8]">
          <section>
            <h2 className="text-[18px] font-bold text-white mb-3">第1条（適用）</h2>
            <p>本規約は、鹿児島レブナイズ（以下「運営」）が提供するSponsor Connect（以下「本サービス」）の利用に関する条件を定めるものです。登録ユーザーの皆様には、本規約に同意のうえ本サービスをご利用いただきます。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-white mb-3">第2条（利用資格）</h2>
            <p>本サービスは、鹿児島レブナイズのスポンサー企業様およびその関係者のみがご利用いただけます。運営が招待または承認した企業・個人に限り、アカウントを発行いたします。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-white mb-3">第3条（禁止事項）</h2>
            <p>ユーザーは、以下の行為を行ってはならないものとします。</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>法令または公序良俗に違反する行為</li>
              <li>運営または第三者の知的財産権を侵害する行為</li>
              <li>本サービスの運営を妨害する行為</li>
              <li>他のユーザーに対する誹謗中傷、嫌がらせ</li>
              <li>虚偽の情報を登録・投稿する行為</li>
              <li>本サービスで得た情報を商業目的で無断利用する行為</li>
              <li>アカウントの第三者への譲渡・貸与</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-white mb-3">第4条（投稿コンテンツ）</h2>
            <p>ユーザーが掲示板等に投稿したコンテンツの著作権はユーザーに帰属します。ただし、運営は本サービスの運営・改善・広報の目的で、投稿コンテンツを無償で利用できるものとします。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-white mb-3">第5条（サービスの変更・中断・終了）</h2>
            <p>運営は、事前の通知なく本サービスの内容を変更し、または提供を中断・終了することができるものとします。これによりユーザーに生じた損害について、運営は責任を負いません。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-white mb-3">第6条（免責事項）</h2>
            <p>運営は、本サービスを通じたビジネスマッチング・商談の成否について一切の保証を行いません。ユーザー間のトラブルについては、当事者間で解決するものとします。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-white mb-3">第7条（個人情報の取扱い）</h2>
            <p>ユーザーの個人情報の取扱いについては、別途定めるプライバシーポリシーによるものとします。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-white mb-3">第8条（準拠法・管轄裁判所）</h2>
            <p>本規約の解釈は日本法に準拠するものとし、本サービスに関する紛争については、鹿児島地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
          </section>
        </div>
      </div>
    </FadeIn>
  );
}
