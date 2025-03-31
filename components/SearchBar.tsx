import { View, Image, TextInput } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';

interface Props {
  onPress?: () => void;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  autoFocus?: boolean;
}

const SearchBar = ({ onPress, placeholder, value, onChangeText, autoFocus }: Props) => {
  return (
    <View className={'flex-row items-center bg-dark-200 rounded-full px-5 py-4'}>
      <Image
        source={icons.search}
        className={'size-5'}
        resizeMode={'contain'}
        tintColor={'#ab8bff'}
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={'#A8B5DB'}
        className={'flex-1 ml-2 text-white'}
        autoFocus={autoFocus}
      />
    </View>
  );
};

export default SearchBar;
