/**
 * マイグレーション実行スクリプト
 * 使い方: npx tsx supabase/run-migration.ts
 */

import { readFileSync } from "fs";
import { join } from "path";
import pg from "pg";

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://postgres:fJZj8SDawfJze7H9@db.vzkfkazjylrkspqrnhnx.supabase.co:5432/postgres";

async function runMigration() {
  const client = new pg.Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log("データベースに接続中...");
    await client.connect();
    console.log("接続成功");

    const sqlPath = join(__dirname, "migrations", "001_create_clinic_accounts.sql");
    const sql = readFileSync(sqlPath, "utf-8");

    console.log("マイグレーション実行中...");
    await client.query(sql);
    console.log("マイグレーション完了");

    // テーブル確認
    const { rows: tables } = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name IN ('clinic_accounts', 'webhook_logs')
      ORDER BY table_name;
    `);
    console.log("作成されたテーブル:", tables.map((r: { table_name: string }) => r.table_name));

    // カラム確認
    const { rows: columns } = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'clinic_accounts'
      ORDER BY ordinal_position;
    `);
    console.log("\nclinic_accounts カラム:");
    for (const col of columns) {
      console.log(`  ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
    }

  } catch (err) {
    console.error("マイグレーションエラー:", err);
    process.exit(1);
  } finally {
    await client.end();
    console.log("\n接続を閉じました");
  }
}

runMigration();
