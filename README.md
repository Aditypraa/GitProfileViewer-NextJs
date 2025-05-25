# Git Profile Viewer

A modern, responsive web application built with Next.js that allows users to search for GitHub profiles, view their repositories, and display README content in a beautifully formatted interface.

## 🚀 Live Demo

[View Live Application](https://gitprofileview.vercel.app)

## ✨ Features

- **GitHub User Search**: Search for any GitHub username and view their profile information
- **Repository Listing**: Display all public repositories with language indicators and statistics
- **README Viewer**: View repository README files in a clean, formatted interface with syntax highlighting
- **Breadcrumb Navigation**: Easy navigation between user profiles and repositories
- **Programming Language Colors**: Visual language indicators with proper color coding
- **Date Formatting**: Human-readable date formatting for repository information
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **SEO Optimized**: Proper meta tags and site configuration for better search engine visibility
- **TypeScript**: Full TypeScript support for better development experience
- **Custom CSS**: Built with pure CSS without any external CSS frameworks
- **State Management**: Efficient state management using React Context API
- **API Routes**: Custom Next.js API routes for GitHub integration
- **Component Architecture**: Well-structured, reusable components

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Pure CSS (CSS Modules)
- **State Management**: React Context API
- **API**: GitHub REST API
- **Deployment**: Vercel
- **Code Quality**: ESLint, Prettier, Husky
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
aditypraa-gitprofileviewer-nextjs/
├── README.md
├── eslint.config.mjs
├── lint-staged.config.js
├── next.config.ts
├── package.json
├── tsconfig.json
├── .env.example
├── .prettierignore
├── .prettierrc
├── public/                     # Static assets
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.module.css     # Home page styles
│   │   ├── page.tsx            # Home page
│   │   ├── [username]/         # Dynamic user profile pages
│   │   │   ├── page.tsx
│   │   │   └── [repo]/         # Dynamic repository pages
│   │   │       └── page.tsx
│   │   └── api/                # API routes
│   │       └── github/
│   │           ├── readme/route.ts
│   │           ├── repos/route.ts
│   │           └── user/route.ts
│   ├── components/             # Reusable UI components
│   │   ├── Breadcrumb/         # Navigation breadcrumb
│   │   ├── Footer/             # Footer component
│   │   ├── ReadmeViewer/       # README content renderer
│   │   ├── RepoDetailsContent/ # Repository detail display
│   │   ├── RepoList/           # Repository listing
│   │   ├── SearchForm/         # GitHub username search
│   │   ├── UserProfile/        # User profile display
│   │   └── UserProfileContent/ # User profile content wrapper
│   ├── config/                 # Application configuration
│   │   └── siteMetaData.ts     # Site metadata and SEO config
│   ├── context/                # React Context for state management
│   │   └── GitHubContext.tsx   # GitHub data state management
│   ├── lib/                    # Utility functions and helpers
│   │   ├── apiUtils.ts         # API utility functions
│   │   ├── formatDate.ts       # Date formatting utilities
│   │   ├── languageColor.ts    # Programming language color mapping
│   │   └── utils.ts            # General utility functions
│   ├── services/               # External API service layer
│   │   └── githubService.ts    # GitHub API integration
│   └── types/                  # TypeScript type definitions
│       └── github.ts           # GitHub API response types
├── .github/                    # GitHub specific files
│   └── workflows/
│       └── ci.yml              # Continuous Integration pipeline
└── .husky/                     # Git hooks
    └── pre-commit              # Pre-commit quality checks
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm
- GitHub Personal Access Token (optional, for higher rate limits)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aditypraa/gitprofileviewer-nextjs.git
   cd gitprofileviewer-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   ```env
   GITHUB_API_URL=https://api.github.com
   GITHUB_TOKEN=your_github_personal_access_token_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

| Variable | Description | Required |
|----------|-------------|----------|
| `GITHUB_API_URL` | GitHub API base URL | Yes |
| `GITHUB_TOKEN` | GitHub Personal Access Token for higher rate limits | Optional |

## 🏗️ Architecture

### Component Architecture

The application follows a modular component architecture with enhanced UI components:

- **Layout Components**: 
  - `Footer`: Consistent footer across all pages
  - `Breadcrumb`: Navigation breadcrumb for better UX
- **Content Components**: 
  - `UserProfile` & `UserProfileContent`: User information display
  - `RepoList`: Repository listing with language colors and stats
  - `RepoDetailsContent`: Detailed repository information
  - `ReadmeViewer`: Markdown content renderer
- **Form Components**: 
  - `SearchForm`: GitHub username search with validation
- **Utility Components**: Modular, reusable UI elements

### State Management

State is managed using React Context API with comprehensive data handling:
- **GitHubContext**: Manages user data, repositories, README content, and loading states
- Centralized error handling and loading indicators
- Optimized re-rendering through context value memoization

### Utility Functions

Well-organized utility functions for enhanced functionality:
- **Date Formatting**: `formatDate.ts` - Human-readable date formatting
- **Language Colors**: `languageColor.ts` - Programming language color mapping
- **API Utilities**: `apiUtils.ts` - API request helpers and error handling
- **General Utils**: `utils.ts` - Common utility functions

### Configuration

- **Site Metadata**: `siteMetaData.ts` - Centralized SEO and site configuration
- **Environment Setup**: Proper environment variable management

### API Layer

Custom API routes handle GitHub API integration:
- `/api/github/user` - Fetch user profile information
- `/api/github/repos` - Fetch user repositories
- `/api/github/readme` - Fetch repository README content

## 📱 User Flow

1. **Homepage**: User enters a GitHub username in the search form
2. **Profile Page**: Displays user profile information and list of repositories
3. **Repository Page**: Shows repository details and formatted README content

## 🎨 Styling

- **Pure CSS**: No external CSS frameworks used
- **CSS Modules**: Scoped styling for each component
- **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop
- **Modern CSS**: Uses Flexbox, Grid, and modern CSS features

## 🔍 Performance & SEO

- **Lighthouse Score**: Optimized for 90+ score across all metrics
- **Server-Side Rendering**: Next.js App Router with SSR capabilities
- **Image Optimization**: Next.js built-in image optimization
- **Code Splitting**: Automatic code splitting for optimal loading

## 🧪 Code Quality

- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code linting with custom configuration
- **Prettier**: Code formatting for consistency
- **Husky**: Pre-commit hooks for code quality
- **GitHub Actions**: Automated CI/CD pipeline

## 📦 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript type checking
```

## 🚀 Deployment

The application is deployed on Vercel with automatic deployments from the main branch.

### Deploy to Vercel

1. **Fork this repository**
2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your forked repository
3. **Configure environment variables**
   - Add `GITHUB_API_URL` and `GITHUB_TOKEN` in Vercel dashboard
4. **Deploy**
   - Vercel will automatically build and deploy your application

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Aditya Pratama**
- GitHub: [@aditypraa](https://github.com/aditypraa)
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/aditypraa)

## 🙏 Acknowledgments

- GitHub API for providing comprehensive repository data
- Next.js team for the amazing framework
- Vercel for seamless deployment experience

---

⭐ If you found this project helpful, please give it a star!