import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { icons } from '@/constants/icons';
import useFetch from '@/services/useFetch';
import { fetchMovieDetails } from '@/services/api';
import { BlurView } from 'expo-blur';

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="font-bold ">{label}</Text>
    <Text className="font-normal  mt-2">{value || 'N/A'}</Text>
  </View>
);

const Details = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { data, loading, error } = useFetch(() => fetchMovieDetails(id as string));

  if (loading) {
    return (
      <SafeAreaView className="flex-1">
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-red-500">Error loading data</Text>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${data?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.5 }}
          />
          <View className="absolute left-5 bottom-3 flex-row flex items-center p-2 rounded-full gap-x-1 mt-2 bg-[#72727264]">
            <BlurView intensity={50} style={[StyleSheet.absoluteFill, { borderRadius: 50 }]} />
            <Image source={icons.star} className="size-4" />
            <Text className="font-bold  ">{Math.round(data?.vote_average ?? 0)}/10</Text>
            <Text className=" ">({data?.vote_count} votes)</Text>
          </View>
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className=" font-bold text-xl">{data?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className=" ">{data?.release_date?.split('-')[0]} •</Text>
            <Text className="text-gray-500 ">{data?.runtime}m</Text>
          </View>

          <MovieInfo label="Overview" value={data?.overview} />
          <MovieInfo label="Genres" value={data?.genres?.map(g => g.name).join(' • ') || 'N/A'} />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo label="Budget" value={`$${(data?.budget ?? 0) / 1_000_000} million`} />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round((data?.revenue ?? 0) / 1_000_000)} million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={data?.production_companies?.map(c => c.name).join(' • ') || 'N/A'}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-7 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image source={icons.arrow} className="size-5 mr-1 mt-0.5 rotate-180" tintColor="#fff" />
        <Text className="font-semibold text-base text-white">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;
