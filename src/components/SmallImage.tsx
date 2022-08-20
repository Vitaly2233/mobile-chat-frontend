import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Themes} from '../themes';

interface Props {
  uri: string;
  containerStyles?: any;
}

const SmallImage = ({uri, containerStyles}: Props) => {
  return (
    <View style={{...styles.container, ...containerStyles}}>
      <Image
        style={styles.image}
        source={{
          width: Themes.IMAGE_SIZE,
          height: Themes.IMAGE_SIZE,
          uri,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {width: Themes.IMAGE_SIZE, height: Themes.IMAGE_SIZE},
  image: {resizeMode: 'stretch', borderRadius: 15},
});

export default SmallImage;
