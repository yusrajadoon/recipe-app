# 🍳 MyRecipes - Modern Recipe Management App

A beautiful, full-stack recipe management application built with Next.js 15, featuring real-time search, favorites, sharing, and cooking timers.

![Recipe App Screenshot](https://via.placeholder.com/800x400/f97316/ffffff?text=MyRecipes+App)

## ✨ Features

### 🏠 Core Functionality
- **Recipe Management**: Add, view, and organize recipes
- **Smart Search**: Real-time search with advanced filtering
- **Favorites System**: Save and manage favorite recipes
- **Recipe Sharing**: Share via social media, email, or copy link
- **Print Recipes**: Professional print-friendly layouts
- **Cooking Timer**: Built-in timer with notifications

### 🎨 User Experience
- **Responsive Design**: Works perfectly on all devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Fast Performance**: Optimized with Next.js 15 and React 18
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Dark/Light Mode**: Automatic theme detection

### 🔍 Advanced Search
- **Real-time Suggestions**: Instant search results as you type
- **Multiple Filters**: Filter by category, difficulty, cooking time
- **Tag-based Search**: Find recipes by ingredients or cooking methods
- **URL-based State**: Shareable search results

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/recipe-app.git
   cd recipe-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
recipe-app/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Homepage
│   ├── recipe/[id]/page.tsx     # Recipe details
│   ├── search/page.tsx          # Search results
│   ├── add/page.tsx             # Add recipe form
│   ├── favorites/page.tsx       # Favorites page
│   ├── api/                     # Backend API routes
│   │   ├── recipes/route.ts     # Recipe CRUD operations
│   │   └── search/route.ts      # Search functionality
│   ├── layout.tsx               # Root layout
│   ├── loading.tsx              # Loading states
│   └── not-found.tsx            # 404 page
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   ├── search-bar.tsx           # Search functionality
│   ├── filter-sidebar.tsx       # Advanced filters
│   ├── favorite-button.tsx      # Favorites feature
│   ├── share-button.tsx         # Share functionality
│   ├── print-recipe.tsx         # Print feature
│   ├── cooking-timer.tsx        # Timer component
│   └── quick-search.tsx         # Quick search dropdown
├── lib/                         # Utility functions
│   ├── recipes.ts               # Recipe data & functions
│   ├── favorites.ts             # Favorites management
│   └── utils.ts                 # Helper utilities
├── public/                      # Static assets
│   └── images/                  # Recipe images
├── styles/                      # Global styles
└── types/                       # TypeScript definitions
\`\`\`

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks + Local Storage

### Backend
- **API**: Next.js API Routes
- **Database**: In-memory storage (easily replaceable)
- **Search**: Custom search algorithm
- **File Handling**: Next.js built-in optimization

### Development
- **Package Manager**: npm/yarn
- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript

## 📖 API Documentation

### Endpoints

#### Get All Recipes
\`\`\`http
GET /api/recipes
\`\`\`

#### Get Single Recipe
\`\`\`http
GET /api/recipes/[id]
\`\`\`

#### Create Recipe
\`\`\`http
POST /api/recipes
Content-Type: application/json

{
  "title": "Recipe Title",
  "description": "Recipe description",
  "cookingTime": 30,
  "servings": 4,
  "difficulty": "Medium",
  "category": "Main Course",
  "ingredients": ["ingredient1", "ingredient2"],
  "instructions": ["step1", "step2"],
  "tags": ["tag1", "tag2"]
}
\`\`\`

#### Search Recipes
\`\`\`http
GET /api/search?q=chocolate&category=dessert&difficulty=easy
\`\`\`

## 🎯 Usage Examples

### Adding a Recipe
1. Click "Add Recipe" button
2. Fill in recipe details
3. Add ingredients (one per line)
4. Add instructions (one per line)
5. Submit the form

### Searching Recipes
1. Use the search bar on homepage
2. Apply filters in search page
3. Browse by categories or tags
4. Save favorites for later

### Using the Cooking Timer
1. Open any recipe
2. Use the built-in timer
3. Set custom cooking times
4. Get notifications when done

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:

\`\`\`env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=MyRecipes
\`\`\`

### Customization
- **Colors**: Edit `tailwind.config.ts`
- **Fonts**: Modify `app/layout.tsx`
- **Components**: Customize in `components/` directory

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Manual Deployment
\`\`\`bash
npm run build
npm start
\`\`\`

## 🗄️ Database Integration

Currently uses in-memory storage. To add a real database:

### MongoDB
\`\`\`bash
npm install mongodb mongoose
\`\`\`

### PostgreSQL
\`\`\`bash
npm install pg @types/pg
\`\`\`

### Supabase
\`\`\`bash
npm install @supabase/supabase-js
\`\`\`

## 🧪 Testing

\`\`\`bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# E2E tests
npm run test:e2e
\`\`\`

## 📱 Progressive Web App

The app includes PWA features:
- Offline functionality
- Install prompt
- Service worker caching
- Mobile-optimized experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Add tests for new features
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Lucide](https://lucide.dev/) - Icon library
- [Vercel](https://vercel.com/) - Deployment platform

## 📞 Support

- **Documentation**: [Project Wiki](https://github.com/yourusername/recipe-app/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/recipe-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/recipe-app/discussions)

## 🔮 Roadmap

- [ ] User authentication
- [ ] Recipe ratings and reviews
- [ ] Meal planning
- [ ] Shopping list generation
- [ ] Recipe import from URLs
- [ ] Nutritional information
- [ ] Recipe collections
- [ ] Social features

---

**Made with ❤️ by [Yusra Bibi]([https://github.com/yourusername](https://github.com/yusrajadoon))**

⭐ Star this repository if you found it helpful!
\`\`\`

This README includes:

- ✅ **Project overview** with features
- ✅ **Quick start guide** for setup
- ✅ **Detailed project structure**
- ✅ **Tech stack information**
- ✅ **API documentation**
- ✅ **Usage examples**
- ✅ **Deployment instructions**
- ✅ **Database integration guide**
- ✅ **Contributing guidelines**
- ✅ **License and acknowledgments**

Remember to:
1. Replace `yourusername` with your actual GitHub username
2. Add actual screenshots to the `public/` folder
3. Update the repository URL
4. Add your name and contact information
5. Create a LICENSE file if needed

This README will make your project look professional and help other developers understand and contribute to your recipe app! 🚀
