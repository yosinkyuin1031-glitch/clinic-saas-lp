-- =============================================
-- clinic_accounts テーブル作成
-- =============================================

CREATE TABLE IF NOT EXISTS clinic_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  clinic_id TEXT UNIQUE NOT NULL,
  clinic_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('monthly', 'onetime')),
  selected_apps JSONB NOT NULL DEFAULT '[]'::jsonb,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'cancelled', 'payment_failed', 'suspended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  cancelled_at TIMESTAMPTZ,
  metadata JSONB,

  CONSTRAINT clinic_accounts_email_not_empty CHECK (email <> '')
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_clinic_accounts_clinic_id
  ON clinic_accounts(clinic_id);

CREATE INDEX IF NOT EXISTS idx_clinic_accounts_email
  ON clinic_accounts(email);

CREATE INDEX IF NOT EXISTS idx_clinic_accounts_stripe_customer_id
  ON clinic_accounts(stripe_customer_id);

CREATE INDEX IF NOT EXISTS idx_clinic_accounts_stripe_subscription_id
  ON clinic_accounts(stripe_subscription_id);

CREATE INDEX IF NOT EXISTS idx_clinic_accounts_status
  ON clinic_accounts(status);

-- =============================================
-- webhook_logs テーブル作成
-- =============================================

CREATE TABLE IF NOT EXISTS webhook_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  event_id TEXT NOT NULL,
  data JSONB DEFAULT '{}'::jsonb,
  status TEXT NOT NULL CHECK (status IN ('success', 'error')),
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_webhook_logs_event_type
  ON webhook_logs(event_type);

CREATE INDEX IF NOT EXISTS idx_webhook_logs_created_at
  ON webhook_logs(created_at DESC);

-- =============================================
-- RLS (Row Level Security) 設定
-- =============================================

-- clinic_accounts
ALTER TABLE clinic_accounts ENABLE ROW LEVEL SECURITY;

-- service_role（webhook）は全操作可能
CREATE POLICY "service_role_all_clinic_accounts"
  ON clinic_accounts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 認証ユーザーは自分のレコードのみ参照可能
CREATE POLICY "users_read_own_clinic_account"
  ON clinic_accounts
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- webhook_logs
ALTER TABLE webhook_logs ENABLE ROW LEVEL SECURITY;

-- service_roleのみ全操作可能
CREATE POLICY "service_role_all_webhook_logs"
  ON webhook_logs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
