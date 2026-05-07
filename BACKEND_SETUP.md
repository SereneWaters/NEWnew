# GloApp Backend Setup Guide

## Quick Start

### 1. Set Up Supabase (Backend Database)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project (choose a region close to you)
3. Wait for the project to initialize
4. Copy your credentials from **Settings → API**:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Anon Key** → `VITE_SUPABASE_ANON_KEY`

### 2. Create Database Tables in Supabase

Go to **SQL Editor** and run this query:

```sql
CREATE TABLE IF NOT EXISTS user_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text UNIQUE NOT NULL,
  goals jsonb DEFAULT '[]',
  rewards jsonb DEFAULT '[]',
  check_ins jsonb DEFAULT '[]',
  vision_board jsonb DEFAULT '[]',
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Enable RLS (Row Level Security)
ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;

-- Create policy so users can only access their own data
CREATE POLICY "Users can only access their own data"
ON user_data FOR ALL
USING (auth.uid()::text = user_id);
```

### 3. Update Your `.env.local` File

Create a `.env.local` file in your project root (copy from `.env.example`):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_CLERK_PROXY_URL=https://your-domain.com
```

### 4. Verify Your Clerk Setup

Make sure your Clerk configuration is correct:

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Check your **Publishable Key** matches `VITE_CLERK_PUBLISHABLE_KEY`
3. In **Settings → URLs**, add your deployed domain (e.g., `https://ne-wnew.vercel.app`)
4. Add authorized redirect URIs for your app

### 5. Fix Login Issues

Your login problems are likely due to:

- **Missing Clerk Proxy URL**: Should be your actual domain (`https://ne-wnew.vercel.app`)
- **Missing Supabase config**: The app needs backend credentials to save/retrieve data
- **CORS issues**: Make sure Supabase and Clerk are configured for your domain

### 6. Test Cross-Device Login

1. Deploy the changes to Vercel
2. Sign up on your phone at `https://ne-wnew.vercel.app`
3. Sign in on your laptop with the same email
4. Your data should sync automatically!

## What Changed

- **`src/lib/supabase.ts`**: New file initializing Supabase client
- **`src/lib/GloContext.tsx`**: Updated to:
  - Load/save data from Supabase instead of just localStorage
  - Sync data across all devices when user is logged in
  - Fall back to localStorage if Supabase is unavailable
  - Use Clerk's `useUser()` to get current user ID

## Troubleshooting

**Still can't login on phone?**
- Check that `VITE_CLERK_PROXY_URL` is your actual domain URL
- Clear browser cache on phone
- Check Clerk dashboard for any error logs

**Data not syncing?**
- Verify Supabase credentials are correct
- Check browser console for errors
- Make sure you're logged in with same account on both devices

**Getting "Missing Supabase" error?**
- Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env.local`
- Restart your dev server: `npm run dev`
