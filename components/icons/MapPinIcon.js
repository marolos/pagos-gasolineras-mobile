import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

function MapPinIcon({ width = 14, height = 16, stroke = '#000' }) {
	return (
		<Svg width={width} height={height} viewBox="0 0 14 16" fill="none">
			<Path
				d="M12.4 7c0 4.2-5.4 7.8-5.4 7.8S1.6 11.2 1.6 7a5.4 5.4 0 1110.8 0z"
				stroke={stroke}
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M7 8.8a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6z"
				stroke={stroke}
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

export default memo(MapPinIcon);
