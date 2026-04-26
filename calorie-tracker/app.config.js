import 'dotenv/config';

export default {
  expo: {
    name: 'Anzhu Tracker',
    slug: 'anzhu-tracker',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'dark',
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#0D1B2A',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#0D1B2A',
      },
      package: 'com.ansari18git.anzhutracker',
    },
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      ocrApiKey: process.env.OCR_API_KEY,
    },
  },
};
