# React Native Movies App

A modern mobile application for browsing and searching movies using The Movie Database (TMDB) API and Appwrite backend integration. The app showcases trending movies and the latest releases with a clean, responsive UI.

## Features

- **Home Screen**: View trending movies and latest releases
- **Search Functionality**: Search for movies by title
- **Movie Details**: View detailed information about specific movies
- **Trending Movies**: Track and display most searched movies based on user interactions
- **Pull-to-Refresh**: Easily refresh movie data

## Tech Stack

### Frontend
- **React Native** with **Expo** for cross-platform mobile development
- **TypeScript** for type-safe code
- **Expo Router** for navigation
- **NativeWind** (TailwindCSS for React Native) for styling
- **React Navigation** with Bottom Tabs

### Backend & APIs
- **Appwrite** for backend services (storing and analyzing user search behaviors)
- **TMDB API** for movie data

### UI Components
- Custom components like MovieCard, TrendingCard, and SearchBar
- Expo Blur for visual effects
- Expo Linear Gradient for stylish gradients

### Development Tools
- ESLint and Prettier for code quality
- Jest for testing
- TypeScript for type safety

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/react_native_movies.git
cd react_native_movies
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Set up environment variables
   - Create a `.env` file in the root directory
   - Add your TMDB API key and Appwrite credentials:
```
EXPO_PUBLIC_MOVIE_API_KEY=your_tmdb_api_key
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_appwrite_database_id
EXPO_PUBLIC_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```

4. Start the development server
```bash
npm start
# or
yarn start
```

5. Run on iOS or Android
```bash
npm run ios
# or
npm run android
```

## Project Structure

- `/app`: Main application screens using Expo Router
- `/components`: Reusable UI components
- `/services`: API and data fetching services
- `/constants`: App constants and assets references
- `/interfaces`: TypeScript type definitions
- `/assets`: Images, icons, and fonts

## Features in Detail

### Appwrite Integration & User Interaction Tracking
The app leverages Appwrite as a powerful backend service to track and analyze user search behaviors in real-time:

- **Search Tracking**: Each time a user searches for a movie, the search term and selected movie are recorded in Appwrite
- **Count Incrementing**: If a movie is searched multiple times, its count is incremented in the database
- **Trending Algorithm**: The "Most Searched Movies" section on the home screen displays movies with the highest search counts
- **Real-time Updates**: The trending data updates dynamically as users across the app search for movies
- **Data Deduplication**: The system intelligently handles duplicate entries, ensuring accuracy in trending results

This creates a collaborative user experience where the collective search behaviors of all users influence the content shown on everyone's home screen.

### Responsive UI
Built with NativeWind (TailwindCSS for React Native), the app features a clean, responsive design that works across different device sizes.

### Performance Optimized
The app implements efficient data fetching strategies and UI rendering optimizations for smooth performance.

## License

[MIT License](LICENSE)