import pg from 'pg';

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.warn('WARNING: DATABASE_URL is not set. Database will not connect.');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false,
});

const defaults = {
  'hero.title': 'The Hair Shack',
  'hero.subtitle': 'Expert cuts & styles in Mandeville, LA — where great hair meets friendly faces.',
  'hero.cta': 'Book Your Cut',
  'hero.image': '',
  'about.title': 'Your Neighborhood Barbers',
  'about.body': 'Duc and Tran have been serving the Mandeville community for over 20 years. Known for their skill, warmth, and attention to detail, they make every client feel right at home — and leave looking their best.',
  'contact.address': '4061 LA-59, Mandeville, LA 70471',
  'contact.phone': '(985) 555-0100',
  'contact.hours': 'Mon–Sat: 9am – 6pm  |  Sun: Closed',
  'business.name': 'The Hair Shack',
  'services.0.name': 'Classic Cut',
  'services.0.desc': 'Precision cut tailored to your style and face shape.',
  'services.0.price': '$15',
  'services.1.name': "Kid's Cut",
  'services.1.desc': 'Patient, friendly cuts for kids of all ages.',
  'services.1.price': '$12',
  'services.2.name': 'Fade & Taper',
  'services.2.desc': 'Clean fades and tapers by barbers who know their craft.',
  'services.2.price': '$18',
  'services.3.name': 'Beard Trim',
  'services.3.desc': 'Shape and clean up your beard with expert precision.',
  'services.3.price': '$10',
  'services.4.name': 'Shampoo & Style',
  'services.4.desc': 'Full wash, condition, and professional styling.',
  'services.4.price': '$20',
  'services.5.name': 'Senior Cut',
  'services.5.desc': 'Comfortable, quality haircuts for our senior clients.',
  'services.5.price': '$13',
};

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS content (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  for (const [key, value] of Object.entries(defaults)) {
    await pool.query(
      `INSERT INTO content (key, value)
       VALUES ($1, $2)
       ON CONFLICT (key) DO NOTHING`,
      [key, value]
    );
  }

  console.log('Database ready.');
}

export default pool;
