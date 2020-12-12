import React, { memo } from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

function ProfileIcon({ width = 18, height = 20, stroke = '#000', strokeWidth=2 }) {
	return (
		<Svg width={width} height={height} viewBox="0 0 18 20">
			<Path
				d="M17 19v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 9a4 4 0 100-8 4 4 0 000 8z"
				stroke={stroke}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

export default memo(ProfileIcon);
