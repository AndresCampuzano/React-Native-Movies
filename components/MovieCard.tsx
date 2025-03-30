import { Text, TouchableOpacity, Image, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const MovieCard = ({ id, poster_path, title, vote_average, release_date }: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className={'w-[30%]'}>
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://via.placeholder.com/600x400/1a1a1a/ffffff.png',
          }}
          className={'w-full h-52 rounded-lg'}
          resizeMode={'cover'}
        />

        <Text className={'text-sm font-bold text-white mt-2'} numberOfLines={1}>
          {title}
        </Text>
        <View className={'flex-row items-center mt-1'}>
          <View className={'flex-row items-center'}>
            <Image
              source={require('@/assets/icons/star.png')}
              className={'w-4 h-4 mr-1'}
              resizeMode={'contain'}
            />
            <Text className={'text-xs text-white font-semibold'}>{Math.round(vote_average)}</Text>
          </View>
          <Text className={'text-gray-400'}> | </Text>
          <Text className={'text-xs text-gray-400 font-semibold '}>
            {new Date(release_date).getFullYear()}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
