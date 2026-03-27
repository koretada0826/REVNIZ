import FadeIn from "@/components/motion/FadeIn";

export default function PrivacyPage() {
  return (
    <FadeIn>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <p className="label">Privacy Policy</p>
          <h1 className="h1">プライバシーポリシー</h1>
          <p className="text-[13px] text-black-500 mt-2">最終更新日: 2026年4月1日</p>
        </div>

        <div className="space-y-6 text-[15px] text-black-300 leading-[1.8]">
          <section>
            <h2 className="text-[18px] font-bold text-white mb-3">1. はじめに</h2>
            <p>鹿児島レブナイズ（以下「運営」）は、Sponsor Connect（以下「本サービス」）におけるユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-white mb-3">2. 収集する情報</h2>
            <p>運営は、本サービスの提供にあたり、以下の情報を収集することがあります。</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>氏名、メールアドレス、電話番号等の連絡先情報</li>
              <li>企業名、役職、業種等の企業情報</li>
              <li>掲示板への投稿内容、相談内容</li>
              <li>イベント・限定プランへの申込情報</li>
              <li>サービス利用時のアクセスログ、Cookie情報</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-white mb-3">3. 利用目的</h2>
            <p>収集した個人情報は、以下の目的で利用します。</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>本サービスの提供・運営・改善</li>
              <li>スポンサー企業間のマッチング・紹介</li>
              <li>イベント・限定プランの案内・管理</li>
              <li>お問い合わせへの対応</li>
              <li>運営からのお知らせ・ニュースレターの配信</li>
              <li>サービスの利用状況の分析・統計</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-white mb-3">4. 第三者への提供</h2>
            <p>運営は、以下の場合を除き、ユーザーの個人情報を第三者に提供しません。</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>ユーザーの同意がある場合</li>
              <li>法令に基づく場合</li>
              <li>人の生命・身体・財産の保護に必要な場合</li>
              <li>スポンサー企業間の紹介・マッチングにおいて必要な範囲（企業名・担当者名等）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-white mb-3">5. 情報の管理</h2>
            <p>運営は、収集した個人情報の漏洩、紛失、毀損の防止のために、適切なセキュリティ対策を講じます。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-white mb-3">6. Cookieの使用</h2>
            <p>本サービスでは、ユーザー体験の向上およびサービスの改善を目的として、Cookieを使用する場合があります。ブラウザの設定でCookieを無効にすることが可能ですが、一部の機能が利用できなくなる場合があります。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-white mb-3">7. 個人情報の開示・訂正・削除</h2>
            <p>ユーザーは、運営に対して自己の個人情報の開示、訂正、削除を請求することができます。ご希望の場合は、下記のお問い合わせ先までご連絡ください。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-white mb-3">8. ポリシーの変更</h2>
            <p>運営は、必要に応じて本ポリシーを変更することがあります。変更後のポリシーは、本サービス上に掲載した時点から効力を生じるものとします。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-white mb-3">9. お問い合わせ</h2>
            <p>個人情報の取扱いに関するお問い合わせは、以下までご連絡ください。</p>
            <div className="rounded-lg border border-line p-4 mt-3" style={{ backgroundColor: "#1e1e1e" }}>
              <p className="text-[14px] text-white font-bold">鹿児島レブナイズ Sponsor Connect 運営事務局</p>
              <p className="text-[14px] text-black-400 mt-1">メール: sponsor@rebnise.jp</p>
            </div>
          </section>
        </div>
      </div>
    </FadeIn>
  );
}
