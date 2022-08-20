import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Themes} from '../themes';
import Search from './icons/Search';

interface Props {
  onTextChange?: (text: string) => void;
}

const SearchBar = ({onTextChange}: Props) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={1}>
      <Search width={20} height={20} />
      <TextInput
        onChangeText={onTextChange}
        autoFocus={true}
        style={styles.text}
        placeholder={'Search'}
        placeholderTextColor={Themes.DARK_GRAY_COLOR}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 14,
    height: 60,
    width: '100%',
    borderRadius: 24,
    backgroundColor: Themes.GRAY_COLOR,
  },

  text: {
    flex: 1,
    marginLeft: 14,
    padding: 0,
    fontSize: Themes.FONT_SIZE_MEDIUM,
    color: Themes.BLACK_COLOR,
  },
});

export default SearchBar;
