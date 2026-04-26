import 'dotenv/config';

export default {
  expo: {
    name: 'Anzhu Tracker',
    slug: 'anzhu-tracker',
    version: '1.0.0',
    orientation: 'portrait',
    userInterfaceStyle: 'dark',
    android: {
      package: 'com.ansari18git.anzhutracker',
    },
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      ocrApiKey: process.env.OCR_API_KEY,
    },
  },
};
