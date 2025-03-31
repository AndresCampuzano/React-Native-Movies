import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import { Link } from 'expo-router';
import { images } from '@/constants/images';
import { BlurView } from 'expo-blur';

const TrendingCard = ({ movie: { movie_id, title, poster_url }, index }: TrendingCardProps) => {
  return (
    <Link href={`/movie/${movie_id}`} asChild>
      <TouchableOpacity className={'w-32 relative pl-5'}>
        <Image
          source={{ uri: poster_url }}
          className={'w-32 h-48 rounded-lg'}
          resizeMode={'cover'}
        />

        <View
          className={
            'absolute bottom-12 -left-4.5 flex items-center justify-center h-14 w-14 bg-transparent rounded-full overflow-hidden'
          }
        >
          <BlurView
            style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '100%' }}
          />
          <Text className={'font-bold text-5xl text-gray-300 mt-1.5'}>{index + 1}</Text>
        </View>
        <Text className={'text-sm font-bold mt-2 '} numberOfLines={2}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
