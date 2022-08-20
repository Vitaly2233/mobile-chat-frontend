import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export default function Search(props: SvgProps) {
  return (
    <Svg viewBox="0 0 19 19" fill="none" {...props}>
      <Path
        d="M8.76 14.572a5.998 5.998 0 005.543-8.297 6 6 0 10-5.543 8.297zm6.32-1.095l3.58 3.58a1 1 0 11-1.416 1.414l-3.58-3.58a8 8 0 111.415-1.415v.001z"
        fill="#2F3036"
      />
    </Svg>
  );
}
