import { useEffect, useState } from 'react';
import {
  View,
  Image,
  FlatList,
  ActivityIndicator,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { images } from '@/constants/images';
import MovieCard from '@/components/MovieCard';
import useFetch from '@/services/useFetch';
import { fetchMovies } from '@/services/api';
import { icons } from '@/constants/icons';
import SearchBar from '@/components/SearchBar';
import { updateSearchCount } from '@/services/appwrite';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, loading, error, refetch, reset } = useFetch(
    () => fetchMovies({ query: searchQuery.trim() }),
    false
  );

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetch();
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Update search count in Appwrite
  useEffect(() => {
    if (searchQuery.trim() && data?.length) {
      const movie = data[0];
      updateSearchCount(searchQuery.trim().toLowerCase(), movie);
    }
  }, [data]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View className={'flex-1 bg-primary'}>
        <Image source={images.bg} className={'flex-1 absolute w-full z-0'} resizeMode={'cover'} />

        <FlatList
          data={data}
          renderItem={({ item }) => <MovieCard {...item} />}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            gap: 20,
            paddingRight: 5,
            marginBottom: 20,
          }}
          className={'px-5'}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListHeaderComponent={
            <>
              <View className={'w-fill flex-row justify-center mt-20 items-center'}>
                <Image source={icons.logo} className={'w-12 h-10'} />
              </View>
              <View className={'my-5'}>
                <SearchBar
                  placeholder={'Search for a movie...'}
                  value={searchQuery}
                  onChangeText={(text: string) => setSearchQuery(text)}
                  autoFocus={true}
                />
              </View>

              {loading && <ActivityIndicator size={'large'} color={'#fafafa'} className={'my-3'} />}

              {error && <Text className={'text-red-500 px-5 my-3'}>Error: {error.message}</Text>}

              {!loading && !error && searchQuery.trim() && data?.length! > 0 && (
                <Text className="text-xl text-white font-bold mb-3">
                  Search Results for <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
            </>
          }
          ListEmptyComponent={
            !loading && !error && searchQuery.trim() ? (
              <>
                <Text className={'text-white text-center mt-5'}>No results found</Text>
                <Text className={'text-gray-400 text-center mt-2'}>
                  Try searching for something else
                </Text>
              </>
            ) : null
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Search;
