import { Client, Databases, ID, Query } from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

/**
 * Updates the search count for a given movie based on the search query.
 * If the search term already exists, increments the count.
 * Otherwise, creates a new document with the search term and movie details.
 */
export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', query),
    ]);

    // If the search term already exists, increment the count
    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, existingMovie.$id, {
        count: existingMovie.count + 1,
      });
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error('Error updating search count:', error);
    throw error;
  }
};

/**
 * Fetches the trending movies from the Appwrite database.
 */
export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc('count'),
    ]);

    const movies = result.documents as unknown as TrendingMovie[];

    // Check for duplicates and delete the one with fewer counts
    const movieMap = new Map<number, TrendingMovie>();
    for (const movie of movies) {
      if (movieMap.has(movie.movie_id)) {
        const existingMovie = movieMap.get(movie.movie_id)!;
        if (existingMovie.count < movie.count) {
          await database.deleteDocument(DATABASE_ID, COLLECTION_ID, (existingMovie as any).$id);
          movieMap.set(movie.movie_id, movie);
        } else {
          await database.deleteDocument(DATABASE_ID, COLLECTION_ID, (movie as any).$id);
        }
      } else {
        movieMap.set(movie.movie_id, movie);
      }
    }

    return Array.from(movieMap.values());
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
