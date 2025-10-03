# Preparation Tracker Dashboard

A clean, Apple-style dashboard for SDE2 preparation tracking with DSA, Frontend, and System Design progress management.

## 🎯 Features

- **Dashboard**: Motivational quotes, progress overview, and quick entry cards
- **DSA Tracker**: Problem management with status, expertise, and topic tracking
- **Frontend Roadmap**: Learning path with projects and resource management
- **System Design**: Question tracking with notes editor and progress visualization
- **Authentication**: NextAuth.js with Google/GitHub OAuth and email/password fallback
- **Modern UI**: Apple-style design with styled-components and smooth animations
- **Command Palette**: Global search with Ctrl+K shortcut
- **Dark/Light Mode**: Theme switching with system preference detection

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), React Server Components
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS + styled-components
- **State Management**: React Query (TanStack Query) + Zustand
- **Charts**: Recharts for progress visualization
- **Database**: MongoDB Atlas with Prisma ORM
- **Authentication**: NextAuth.js
- **Deployment**: Vercel
- **Testing**: Jest + React Testing Library + Playwright

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd preparation-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

Fill in your environment variables:
- `DATABASE_URL`: MongoDB connection string
- `NEXTAUTH_URL`: Your app URL
- `NEXTAUTH_SECRET`: Random secret key
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: Google OAuth credentials
- `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET`: GitHub OAuth credentials
- Email configuration for email/password auth

4. Set up the database:
```bash
npm run db:push
npm run db:generate
```

5. Run the development server:
```bash
npm run dev
```

## 🗄️ Database Schema

The app uses Prisma with MongoDB and includes models for:
- **User**: Authentication and profile data
- **Question**: DSA problems with status and expertise tracking
- **Project**: Frontend projects with tech stack and links
- **SystemDesign**: System design questions with notes

## 🧪 Testing

Run unit tests:
```bash
npm run test
```

Run e2e tests:
```bash
npm run test:e2e
```

## 🚀 Deployment

The app is configured for Vercel deployment with GitHub Actions CI/CD:

1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Push to main branch for automatic deployment

## 📱 Usage

1. **Sign Up/Login**: Use Google, GitHub, or email/password
2. **Dashboard**: View overall progress and quick entry cards
3. **DSA**: Add problems, track status, and view progress by topic
4. **Frontend**: Follow the learning roadmap and manage projects
5. **System Design**: Practice questions and take notes
6. **Command Palette**: Press Ctrl+K to search and navigate

## 🎨 Design System

The app features an Apple-inspired design with:
- Glass morphism effects
- Smooth animations and transitions
- Consistent spacing and typography
- Dark/light mode support
- Responsive design for all devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
