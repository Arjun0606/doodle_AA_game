# 🐾 Feed the Doodle Animals

A wholesome, private interactive mini-game built with Next.js for Aayushi.

## 🎮 How to Play

1. Drag food items (🍪 🍓 🧁) to the cute doodle animals
2. Watch them get super chubby as they eat!
3. When full, they burp and say "Thank you Aayushi!"
4. Once all animals are fed, a bird delivers a special message
5. Click reset to play again (animals will poop first!)

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000/aayushi-game-62492](http://localhost:3000/aayushi-game-62492)

### Build for Production

```bash
npm run build
npm start
```

## 📦 Deploy to Vercel

### Option 1: Using Vercel CLI (Recommended)

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Deploy from the project directory:
```bash
cd feed-the-doodles
vercel
```

3. Follow the prompts:
   - Link to existing project? **No**
   - Project name? Press Enter (or customize)
   - Directory? Press Enter (.)
   - Override settings? **No**

4. After deployment, Vercel will give you a URL like:
   ```
   https://feed-the-doodles-abc123.vercel.app
   ```

5. The game is accessible at:
   ```
   https://feed-the-doodles-abc123.vercel.app/aayushi-game-62492
   ```

### Option 2: Using Vercel Dashboard

1. Push code to GitHub (optional - can be private repo)
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your repository
5. Deploy!

## 🔐 Privacy Features

- **No indexing**: `noindex, nofollow` meta tags
- **Private route**: `/aayushi-game-62492` (only shareable via direct link)
- **No analytics**: Zero tracking or data collection
- **Offline capable**: Works completely offline once loaded
- **Mobile-first**: Optimized for mobile devices

## 🎨 Features

- ✨ Hand-drawn doodle aesthetic (inspired by Doodle Jump)
- 🐱 4 adorable animals: Cat, Bunny, Frog, Bear
- 🍪 Drag-and-drop food mechanics
- 💨 Burp animations when full
- 💩 Poop animations on reset
- 🕊️ Flying bird with envelope animation
- 💌 Personalized message reveal
- 💭 Random reminder popups
- 📱 Fully responsive mobile design

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: Vercel

## 📝 Customization

To customize the message, edit:
- `components/MessageNote.tsx` - Main message content
- `components/ReminderPopup.tsx` - Random reminder messages

## 💡 Notes

- The game is designed to be private and only accessible via direct link
- No backend or database required
- All animations run client-side
- Optimized for mobile touch interactions

---

Made with 💖 for Aayushi

