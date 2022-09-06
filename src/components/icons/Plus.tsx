import * as React from 'react';
import Svg, {Mask, Path, G, SvgProps} from 'react-native-svg';

const Plus = (props: SvgProps) => (
  <Svg
    width={30}
    height={30}
    fill="none"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Mask
      id="a"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={16}
      height={16}>
      <Path
        d="M9 1.448a1 1 0 1 0-2 0v5.667H1.333a1 1 0 0 0 0 2H7v5.667a1 1 0 0 0 2 0V9.115h5.667a1 1 0 0 0 0-2H9V1.448Z"
        fill="#006FFD"
      />
    </Mask>
    <G mask="url(#a)">
      <Path fill="#006FFD" d="M0 .115h16v16H0z" />
    </G>
  </Svg>
);

export default Plus;
