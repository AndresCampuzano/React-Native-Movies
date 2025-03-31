import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import { icons } from '@/constants/icons';
import SearchBar from '@/components/SearchBar';
import { useRouter } from 'expo-router';
import useFetch from '@/services/useFetch';
import { fetchMovies } from '@/services/api';
import MovieCard from '@/components/MovieCard';
import { getTrendingMovies } from '@/services/appwrite';
import { useState } from 'react';
import TrendingCard from '@/components/TrendingCard';

export default function Index() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
    refetch: refetchTrendingMovies,
  } = useFetch(getTrendingMovies);

  const {
    data,
    loading,
    error,
    refetch: refetchMovies,
  } = useFetch(() => fetchMovies({ query: '' }));

  /**
   * Refreshes the trending movies and latest movies when the user pulls down the list.
   */
  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchTrendingMovies(), refetchMovies()]);
    setRefreshing(false);
  };

  return (
    <View className={'flex-1'}>
      <ScrollView
        className={'flex-1 px-5'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Image source={icons.logoBig} className={'w-32 mt-20 mx-auto'} resizeMode={'contain'} />

        {loading || trendingLoading ? (
          <ActivityIndicator size={'large'} color={'#494949'} className={'mt-10 self-center'} />
        ) : error || trendingError ? (
          <Text>Error: {error?.message || trendingError?.message}</Text>
        ) : (
          <View className={'flex-1 mt-5'}>
            <SearchBar
              onPress={() => router.push('/search')}
              placeholder={'Search for a movie...'}
              editable={false}
            />

            {trendingMovies && trendingMovies.length > 0 && (
              <>
                <View className={'mt-10'}>
                  <Text className={'text-lg font-bold mb-3'}>Most searched movies</Text>
                </View>

                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className={'w-4'} />}
                  className={'mb-4 mt-3'}
                  data={trendingMovies}
                  renderItem={({ item, index }) => <TrendingCard movie={item} index={index} />}
                  keyExtractor={item => item.movie_id.toString()}
                />
              </>
            )}

            <Text className={'text-lg  font-bold mt-5 mb-3'}>Latest Movies</Text>

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
              className={'mt-2 pb-32'}
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
