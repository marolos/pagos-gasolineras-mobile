import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

function LikeIcon({ width = 26, height = 26, stroke = '#000', fill = 'none' }) {
	return (
		<Svg width={width} height={height} viewBox="0 0 26 26">
			<Path
				d="M7.09 24.818H3.546a2.363 2.363 0 01-2.363-2.363v-8.273a2.363 2.363 0 012.363-2.364h3.546m8.273-2.363V4.727a3.545 3.545 0 00-3.546-3.545L7.091 11.818v13h13.33a2.364 2.364 0 002.364-2.009l1.631-10.636a2.365 2.365 0 00-2.363-2.718h-6.69z"
				stroke={stroke}
				fill={fill}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

export default memo(LikeIcon);
