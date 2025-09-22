# VibeNest Setup Guide

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Google Gemini AI Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# App Configuration
VITE_APP_NAME=VibeNest
VITE_APP_VERSION=1.0.0
```

## Getting API Keys

### 1. Supabase Setup
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > API
4. Copy the Project URL and anon public key

### 2. Google Gemini API Setup
1. Go to [Google AI Studio](https://aistudio.google.com)
2. Create a new API key
3. Copy the API key to your `.env` file

## Features Implemented

### ✅ Completed Features

1. **INR Currency Support** - All pricing and currency displays use Indian Rupees
2. **Subscription Model** - Three-tier subscription system (Free, Premium, Pro)
3. **Modern Subscription Page** - Minimal and professional design with smooth animations
4. **AI Chatbot** - Powered by Google Gemini with free tier support
5. **Gmail Integration** - Data sync from Gmail in settings
6. **Fluid Animations** - Apple-inspired smooth transitions and micro-interactions
7. **Responsive Design** - Works perfectly on all screen sizes
8. **Professional Polish** - Removed all "lovable" branding, added cozy design elements

### 🎨 Design Improvements

- **Fluid Animations**: Smooth page transitions, hover effects, and micro-interactions
- **Responsive Padding**: Consistent spacing across all device sizes
- **Modern UI**: Clean, professional interface with glass morphism effects
- **Accessibility**: Improved focus states, keyboard navigation, and screen reader support
- **Performance**: Optimized loading states and smooth scrolling

### 🔧 Technical Features

- **TypeScript**: Full type safety throughout the application
- **Framer Motion**: Advanced animations and transitions
- **Tailwind CSS**: Utility-first styling with custom design system
- **React Query**: Efficient data fetching and caching
- **Supabase**: Backend-as-a-Service for authentication and data
- **Google Gemini**: AI-powered chatbot functionality

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables (see above)

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:8080](http://localhost:8080) in your browser

## Project Structure

```
src/
├── components/
│   ├── chat/           # AI Chatbot components
│   ├── layout/         # Layout components
│   ├── settings/       # Settings components
│   └── ui/             # Reusable UI components
├── contexts/           # React contexts (Auth, Theme, Subscription)
├── lib/                # Utilities and helpers
├── pages/              # Page components
└── integrations/       # External service integrations
```

## Subscription Plans

- **Free**: 5 posts/month, basic AI chat (10 messages), ads included
- **Premium**: Unlimited posts, advanced AI chat (100 messages), no ads, priority support
- **Pro**: Everything in Premium + unlimited AI chat, personal therapist matching, API access

## Support

For any issues or questions, please check the documentation or create an issue in the repository.
