import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface WelcomeEmailParams {
  to: string
  clinicName: string
  clinicId: string
  password: string
  selectedApps: string[]
  planType: 'monthly' | 'yearly' | 'onetime'
}

export async function sendWelcomeEmail(params: WelcomeEmailParams) {
  const { to, clinicName, clinicId, password, selectedApps, planType } = params

  const appNames: Record<string, string> = {
    kensa: 'カラダマップ',
    customer: '顧客管理',
    reservation: '予約管理',
    monshin: 'WEB問診',
    meo: 'MEO勝ち上げくん',
    sleep: '睡眠チェック',
  }

  const appList = selectedApps.map(id => appNames[id] || id).join('、')
  const planLabel = planType === 'monthly' ? '月額プラン' : planType === 'yearly' ? '年額プラン' : '買い切りプラン'

  try {
    const { data, error } = await resend.emails.send({
      from: 'ClinicDX <onboarding@resend.dev>',
      to: [to],
      subject: `【ClinicDX】アカウント発行のお知らせ - ${clinicName}様`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #14252A; color: white; padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">ClinicDX</h1>
            <p style="margin: 4px 0 0; opacity: 0.8; font-size: 14px;">治療院DXツール</p>
          </div>

          <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="font-size: 16px; color: #333;">${clinicName} 様</p>
            <p style="color: #666;">この度はClinicDXをお申し込みいただき、誠にありがとうございます。<br>アカウントの発行が完了しましたので、ログイン情報をお知らせいたします。</p>

            <div style="background: #f8f9fa; border-radius: 8px; padding: 16px; margin: 20px 0;">
              <h3 style="margin: 0 0 12px; color: #14252A; font-size: 16px;">ログイン情報</h3>
              <table style="width: 100%; font-size: 14px;">
                <tr><td style="padding: 4px 0; color: #666; width: 120px;">院ID</td><td style="font-weight: bold;">${clinicId}</td></tr>
                <tr><td style="padding: 4px 0; color: #666;">メールアドレス</td><td style="font-weight: bold;">${to}</td></tr>
                <tr><td style="padding: 4px 0; color: #666;">初期パスワード</td><td style="font-weight: bold; color: #e74c3c;">${password}</td></tr>
                <tr><td style="padding: 4px 0; color: #666;">プラン</td><td>${planLabel}</td></tr>
                <tr><td style="padding: 4px 0; color: #666;">ご利用システム</td><td>${appList}</td></tr>
              </table>
            </div>

            <div style="background: #fff3cd; border-radius: 8px; padding: 12px; margin: 16px 0; font-size: 13px; color: #856404;">
              ⚠️ セキュリティのため、初回ログイン後にパスワードを変更してください。
            </div>

            <div style="text-align: center; margin: 24px 0;">
              <a href="https://clinic-saas-lp.vercel.app" style="background: #14252A; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">ログインする</a>
            </div>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">

            <p style="font-size: 13px; color: #999;">
              ご不明な点がございましたら、お気軽にお問い合わせください。<br>
              メール: yosinkyuin1031@gmail.com
            </p>
          </div>

          <p style="text-align: center; font-size: 12px; color: #999; margin-top: 16px;">
            &copy; 2026 ClinicDX / AI Solutions
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('メール送信エラー:', error)
      return { success: false, error: error.message }
    }

    console.log('ウェルカムメール送信完了:', data?.id)
    return { success: true, id: data?.id }
  } catch (err) {
    console.error('メール送信例外:', err)
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}

// 決済失敗通知メール
export async function sendPaymentFailedEmail(params: { to: string; clinicName: string }) {
  try {
    await resend.emails.send({
      from: 'ClinicDX <onboarding@resend.dev>',
      to: [params.to],
      subject: `【ClinicDX】お支払いに関するお知らせ - ${params.clinicName}様`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #14252A; color: white; padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">ClinicDX</h1>
          </div>
          <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <p>${params.clinicName} 様</p>
            <p>月額料金のお支払いが確認できませんでした。</p>
            <p>お手数ですが、ご登録のクレジットカード情報をご確認ください。</p>
            <p>お支払いが確認できない場合、サービスの一時停止となる場合がございます。</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
            <p style="font-size: 13px; color: #999;">
              ご不明な点がございましたら、お気軽にお問い合わせください。<br>
              メール: yosinkyuin1031@gmail.com
            </p>
          </div>
        </div>
      `,
    })
    return { success: true }
  } catch (err) {
    console.error('決済失敗通知メール送信エラー:', err)
    return { success: false }
  }
}
