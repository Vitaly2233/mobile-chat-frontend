import * as React from 'react';
import Svg, {SvgProps, Mask, Path, G} from 'react-native-svg';

const SendMessageIcon = (props: SvgProps) => (
  <Svg
    width={12}
    height={13}
    viewBox="0 0 12 13"
    fill="none"
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
      width={12}
      height={12}>
      <Path
        d="M.412 4.335a.375.375 0 0 0-.09.667l3.316 1.829a.375.375 0 0 0 .399-.023L7.56 4.296c.17-.114.373.09.26.26L5.306 8.077a.375.375 0 0 0-.023.399l1.829 3.316a.375.375 0 0 0 .667-.09l3.447-10.341a.375.375 0 0 0-.474-.474L.412 4.335Z"
        fill="#fff"
      />
    </Mask>
    <G mask="url(#a)">
      <Path fill="#fff" d="M0 .115h12v12H0z" />
    </G>
  </Svg>
);

export default SendMessageIcon;
