import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env: Cek backend/.env, project root .env, dan process.cwd()/.env
const backendEnv = path.resolve(__dirname, '../../.env');
const rootEnv = path.resolve(__dirname, '../../../.env');

if (fs.existsSync(backendEnv)) dotenv.config({ path: backendEnv });
if (fs.existsSync(rootEnv)) dotenv.config({ path: rootEnv });
dotenv.config();

const isRemoteTurso = Boolean(
  process.env.TURSO_DATABASE_URL &&
  process.env.TURSO_DATABASE_URL.startsWith('libsql://')
);

// Tentukan path lokal absolut jika menggunakan SQLite file
const localDbDir = path.resolve(__dirname, '../../data');
if (!fs.existsSync(localDbDir)) {
  fs.mkdirSync(localDbDir, { recursive: true });
}
const localDbPath = path.join(localDbDir, 'waras.db');

const dbUrl = isRemoteTurso ? process.env.TURSO_DATABASE_URL : `file:${localDbPath}`;
const authToken = isRemoteTurso ? process.env.TURSO_AUTH_TOKEN : undefined;

export const db = createClient({
  url: dbUrl,
  authToken: authToken,
});

export const dbMode = isRemoteTurso
  ? `Turso Cloud (Remote: ${process.env.TURSO_DATABASE_URL})`
  : `Local libSQL/SQLite (${localDbPath})`;

console.log(`[Database] Terhubung ke mode: ${dbMode}`);
