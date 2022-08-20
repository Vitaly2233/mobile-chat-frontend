import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const Circle = (props: SvgProps) => (
  <Svg
    width={30}
    height={30}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      d="M0 12.115c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12-12-5.373-12-12Z"
      fill="#006FFD"
    />
  </Svg>
);

export default Circle;
