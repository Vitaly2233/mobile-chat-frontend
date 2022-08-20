import * as React from 'react';
import Svg, {SvgProps, Mask, Path, G} from 'react-native-svg';
import {Themes} from '../../themes';

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={30}
    height={30}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 21"
    {...props}>
    <Mask
      id="a"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={4}
      y={0}
      width={20}
      height={20}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.457.898c.502.488.502 1.28 0 1.768L7.8 10.115l7.656 7.45c.502.487.502 1.279 0 1.767a1.31 1.31 0 0 1-1.817 0l-9.473-9.217L13.64.898a1.31 1.31 0 0 1 1.817 0Z"
        fill="#006FFD"
      />
    </Mask>
    <G mask="url(#a)">
      <Path fill={Themes.BLUE_COLOR} d="M0 .114h19.999v19.999H0z" />
    </G>
  </Svg>
);

export default SvgComponent;
