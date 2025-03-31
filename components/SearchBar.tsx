import { View, Image, TextInput } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';

interface Props {
  onPress?: () => void;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  autoFocus?: boolean;
  editable?: boolean;
}

const SearchBar = ({ onPress, placeholder, value, onChangeText, autoFocus, editable }: Props) => {
  return (
    <View className={'flex-row items-center bg-gray-300 rounded-full px-5 py-4'}>
      <Image
        source={icons.search}
        className={'size-5'}
        resizeMode={'contain'}
        tintColor={'#808080'}
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={'#808080'}
        className={'flex-1 ml-2 '}
        autoFocus={autoFocus}
        editable={editable}
      />
    </View>
  );
};

export default SearchBar;
