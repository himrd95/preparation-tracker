# Preparation Tracker Dashboard

A comprehensive, Apple-style dashboard for tracking your SDE2 preparation journey. Built with Next.js 14, TypeScript, and modern web technologies.

## 🎯 Features

### 📊 Dashboard
- **Progress Overview**: Visual charts showing your preparation progress across DSA, Frontend, and System Design
- **Weekly Summary**: Track your activity over time with interactive charts
- **Streak Counter**: Monitor your daily preparation streak
- **Motivational Quotes**: Rotating inspirational quotes to keep you motivated

### 🔧 DSA Problems Tracker
- **Problem Management**: Add, edit, and track coding problems
- **Status Tracking**: To Do, In Progress, Done
- **Expertise Levels**: Beginner, Intermediate, Expert
- **Category Filtering**: Filter by problem categories (Array, String, Tree, etc.)
- **Progress Charts**: Visual progress by topic

### 🎨 Frontend Development
- **Learning Roadmap**: Track progress through essential frontend technologies
- **Project Portfolio**: Showcase your frontend projects
- **Technology Progress**: Monitor your skills across React, Next.js, TypeScript, etc.
- **Project Management**: Track project status, complexity, and links

### 🏗️ System Design
- **Question Bank**: Common system design interview questions
- **Notes Editor**: Markdown-enabled notes for each question
- **Progress Tracking**: Track your understanding level
- **Concept Progress**: Monitor progress across scalability, distributed systems, etc.

### 🔐 Authentication
- **Multi-Provider Auth**: Google, GitHub, and email/password
- **Protected Routes**: Secure access to all features
- **User-Specific Data**: Each user has their own progress data

### 🎨 UI/UX
- **Apple-Style Design**: Clean, minimal interface with subtle animations
- **Dark/Light Mode**: Toggle between themes
- **Command Palette**: Global search with Ctrl+K
- **Responsive Design**: Works on all devices
- **Accessibility**: WCAG compliant

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router, RSC) + TypeScript
- **Styling**: TailwindCSS + ShadCN/UI
- **State Management**: React Query (TanStack Query) + Zustand
- **Charts**: Recharts
- **Database**: MongoDB Atlas
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Testing**: Jest + React Testing Library + Playwright
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Google/GitHub OAuth apps (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd preparation-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your values:
   ```env
   # Database
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/preparation-tracker?retryWrites=true&w=majority"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # OAuth Providers (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"
   ```

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── dsa/              # DSA problems page
│   ├── frontend/         # Frontend development page
│   └── system-design/    # System design page
├── components/           # Reusable components
│   ├── ui/              # ShadCN/UI components
│   ├── layout/          # Layout components
│   └── charts/          # Chart components
├── lib/                 # Utility functions
│   ├── auth.ts          # NextAuth configuration
│   ├── prisma.ts        # Prisma client
│   └── utils.ts         # Utility functions
└── prisma/              # Database schema
    └── schema.prisma    # Prisma schema
```

## 🧪 Testing

### Unit Tests
```bash
npm run test:unit
```

### E2E Tests
```bash
npm run test:e2e
```

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npm run type-check
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## 🔧 Database Management

### Generate Prisma Client
```bash
npm run db:generate
```

### Push Schema Changes
```bash
npm run db:push
```

### Open Prisma Studio
```bash
npm run db:studio
```

## 📊 Features Overview

### Dashboard Analytics
- **Progress Tracking**: Visual progress across all categories
- **Weekly Activity**: Bar charts showing daily activity
- **Streak Monitoring**: Track your preparation consistency
- **Motivational Quotes**: Rotating inspirational content

### DSA Problem Management
- **CRUD Operations**: Create, read, update, delete problems
- **Advanced Filtering**: Filter by category, status, expertise
- **Progress Visualization**: Pie charts and progress bars
- **External Links**: Direct links to LeetCode, HackerRank, etc.

### Frontend Development Tracking
- **Technology Roadmap**: Track learning progress
- **Project Portfolio**: Showcase your work
- **Skill Assessment**: Monitor expertise levels
- **Resource Management**: Links to tutorials and documentation

### System Design Preparation
- **Question Bank**: Comprehensive list of common questions
- **Notes System**: Markdown-enabled note-taking
- **Progress Tracking**: Monitor understanding levels
- **Concept Mapping**: Track related concepts

## 🎨 Customization

### Themes
The app supports both light and dark themes. The theme is automatically detected based on system preferences.

### Colors
Customize colors by modifying the CSS variables in `src/app/globals.css`.

### Components
All UI components are built with ShadCN/UI and can be customized by modifying the component files in `src/components/ui/`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework
- [ShadCN/UI](https://ui.shadcn.com/) for the beautiful component library
- [Recharts](https://recharts.org/) for the chart components
- [Prisma](https://prisma.io/) for the database toolkit
- [NextAuth.js](https://next-auth.js.org/) for authentication

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Happy Coding! 🚀**# preparation-tracker
