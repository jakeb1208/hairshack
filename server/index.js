import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import db from './db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Serve built frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../dist')));
}

// GET all content
app.get('/api/content', (req, res) => {
  const rows = db.prepare('SELECT key, value FROM content').all();
  const content = {};
  for (const row of rows) {
    content[row.key] = row.value;
  }
  res.json(content);
});

// PUT update a content key
app.put('/api/content/:key', (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  if (value === undefined) return res.status(400).json({ error: 'value required' });
  db.prepare(
    'INSERT INTO content (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=CURRENT_TIMESTAMP'
  ).run(key, value);
  res.json({ ok: true });
});

// PUT update multiple keys at once
app.put('/api/content', (req, res) => {
  const updates = req.body;
  if (!updates || typeof updates !== 'object') {
    return res.status(400).json({ error: 'Expected object of key:value pairs' });
  }
  const upsert = db.prepare(
    'INSERT INTO content (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=CURRENT_TIMESTAMP'
  );
  const updateMany = db.transaction((pairs) => {
    for (const [key, value] of Object.entries(pairs)) {
      upsert.run(key, String(value));
    }
  });
  updateMany(updates);
  res.json({ ok: true });
});

// Fallback for SPA in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Hair Shack API running on port ${PORT}`);
});
