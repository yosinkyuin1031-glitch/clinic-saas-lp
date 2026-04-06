# ClinicApps 販売LP

## 基本情報
- デプロイ先：https://clinic-saas-lp.vercel.app
- フレームワーク：Next.js 14（App Router）
- 決済：Stripe本番環境
- メール：Resend

## 販売中アプリ（この2つのみ購入可能）
- カラダマップ（検査シート作成）
- MEO勝ち上げくん

## 重要なURL・リンク
- LINEリンク：https://lin.ee/8P11rM4（全箇所これに統一）
- サンクスページ：/thanks（Stripe決済完了後のリダイレクト先）
- ガイド：https://kensa-sheet-app.vercel.app/docs/

## Payment Link（Stripe）
- カラダマップ通常（月額+初期費用）：https://buy.stripe.com/14AfZg6ks3SU9nS0ut08g02
- カラダマップモニター（月額のみ）：https://buy.stripe.com/bJecN4108blm8jOdhf08g04
- MEO通常（月額+初期費用）：https://buy.stripe.com/9B6dR824cahi1Vqb9708g03
- MEOモニター（月額のみ）：https://buy.stripe.com/cNidR81082OQdE83GF08g05
- 顧客管理通常（月額+初期費用）：https://buy.stripe.com/8x2cN4aAI3SU43y7WV08g06
- 顧客管理モニター（月額のみ）：https://buy.stripe.com/5kQbJ0dMUexydE8a5308g07
- 予約管理通常（月額+初期費用）：https://buy.stripe.com/aFabJ0gZ62OQ43ygtr08g08
- 予約管理モニター（月額のみ）：https://buy.stripe.com/fZuaEW7owahicA4dhf08g09
- WEB問診通常（月額+初期費用）：https://buy.stripe.com/fZufZgdMUcpq2Zufpn08g0a
- WEB問診モニター（月額のみ）：https://buy.stripe.com/fZu3cu38g7561Vqb9708g0b

## 設定ファイル
- app/lib/app-config.ts：全アプリの料金・Stripe商品ID・フラグを一元管理
- .env.local：Stripeキー・Webhook Secret・Resend APIキー

## セキュリティ（全プロジェクト共通基準）
- .env / .env.local は絶対にコードに含めない
- service_roleキーはサーバーサイドのみ使用、フロントに露出させない
- Stripe Secret Keyはサーバーサイドのみ
- APIエンドポイントには適切な認証チェックを入れる
- XSS対策：ユーザー入力は必ずサニタイズ
- Webhook受信時はStripe署名検証を必ず行う

## 注意事項
- アプリ名は「カラダマップ」（体マップ・カラダマップではない）
- MEOは「MEO勝ち上げくん」（くん、ひらがな）
- 料金変更時はapp-config.tsを更新すれば全体に反映される
