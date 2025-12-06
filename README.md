# CollaboNotes

> A modern, real-time collaborative notes application built with React, TypeScript, and TipTap.

**Author:** Mehdi

---

## 🌟 Overview

Hi, I'm **Mehdi**, and I built **CollaboNotes** as a production-quality, frontend-only demonstration of real-time collaborative editing. This project showcases a beautiful, Mixpanel-inspired UI with simulated multi-user collaboration features.

CollaboNotes is a Google Docs-style editor that lets you create, edit, and manage documents with a clean, modern interface. While the realtime collaboration is simulated on the frontend, the architecture is designed to be easily extended with a real backend.

---

## ✨ Features

### Core Features
- 🎨 **Beautiful Mixpanel-inspired UI** - Clean, modern, spacious design
- 📝 **Rich Text Editor** - Powered by TipTap with full formatting support
- 👥 **Simulated Realtime Collaboration** - See fake cursors and presence events
- 💾 **Autosave** - Automatic saving with visual feedback
- 📚 **Version History** - Track and restore previous versions
- 🌓 **Dark Mode** - Full dark/light theme support
- 📱 **Responsive Design** - Works on all devices

### Authentication (Mock)
- Email/password login (frontend only)
- User registration
- Password reset UI

### Document Management
- Create, edit, and delete documents
- Search functionality
- Last edited timestamps
- Document list with cards

### Editor Features
- Bold, italic, underline formatting
- Headings (H1, H2)
- Bullet and numbered lists
- Links
- Undo/redo
- Live cursor simulation
- Presence indicators
- Activity feed

### Premium Features
- ⭐ Focus Mode - Distraction-free writing
- ⭐ Zen Mode - Calm gradient backgrounds
- ⭐ Smart Outline - Automatic document structure
- ⭐ Command Palette (⌘K) - Quick actions
- ⭐ Theme Gallery - Custom accent colors

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **TipTap** - Rich text editor
- **Zustand** - State management
- **Framer Motion** - Animations
- **React Router** - Navigation
- **date-fns** - Date formatting
- **shadcn/ui** - UI components

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd collabonotes
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
```
http://localhost:8080
```

---

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── editor/          # Editor-specific components
│   │   ├── EditorToolbar.tsx
│   │   ├── PresencePanel.tsx
│   │   ├── SmartOutline.tsx
│   │   └── VersionHistory.tsx
│   ├── shared/          # Shared components
│   │   ├── Navbar.tsx
│   │   └── ThemeToggle.tsx
│   └── ui/              # shadcn UI components
├── hooks/               # Custom React hooks
│   ├── useAutosave.ts
│   ├── useFocusMode.ts
│   ├── useZenMode.ts
│   └── useRealtimeSimulation.ts
├── mocks/               # Mock data
│   └── data.ts
├── pages/               # Page components
│   ├── Landing.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── ResetPassword.tsx
│   ├── Dashboard.tsx
│   └── Editor.tsx
├── store/               # Zustand stores
│   ├── authStore.ts
│   ├── documentStore.ts
│   └── themeStore.ts
├── types/               # TypeScript types
│   └── index.ts
├── App.tsx              # Root component
└── main.tsx             # Entry point
```

---

## 🎨 Design System

CollaboNotes uses a carefully crafted design system with:

- **Primary Color:** Deep violet/purple (`#7c3aed`)
- **Typography:** Clean, large headings with excellent spacing
- **Shadows:** Soft, layered shadows for depth
- **Animations:** Smooth transitions using Framer Motion
- **Spacing:** Generous whitespace for a premium feel

All design tokens are defined in:
- `src/index.css` - CSS variables and utilities
- `tailwind.config.ts` - Tailwind theme configuration

---

## 🧪 Testing

The app simulates realtime features using:
- Random cursor movements
- Fake user join/leave events
- Simulated typing indicators
- Mock autosave with delays

To see the simulation in action:
1. Open a document in the editor
2. Click the "Users" icon to see the presence panel
3. Watch as fake users join, type, and leave

---

## 🔐 Authentication (Mock)

Authentication is completely mocked on the frontend:
- Any email/password combination will log you in
- User data is stored in localStorage
- No real security - this is for demonstration only

---

## 📦 Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

---

## 🚢 Deployment

The app is a static frontend and can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- Any static hosting service

Simply run `npm run build` and deploy the `dist/` folder.

---

## 🎯 Future Enhancements

If this were to be connected to a real backend:
- Real WebSocket-based collaboration (using Yjs or similar)
- Actual user authentication
- Server-side document storage
- Real-time cursor positions
- Comments and annotations
- Document sharing with permissions
- Export to PDF/Markdown

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

Built with modern web technologies and inspired by:
- Mixpanel's beautiful design language
- Google Docs' collaborative editing
- Notion's clean interface

---

## 📧 Contact

**Mehdi**  

---

## 🎓 Learning Resources

This project demonstrates:
- React best practices
- TypeScript for type safety
- State management with Zustand
- Rich text editing with TipTap
- Modern CSS with Tailwind
- Animation with Framer Motion
- Frontend architecture patterns

Feel free to explore the code and learn from the implementation!

---

**Note:** This is a frontend-only demonstration project. All realtime features are simulated. To make this production-ready, you would need to add a real backend with WebSocket support for true collaboration.
