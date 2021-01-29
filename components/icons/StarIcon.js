import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

function StarIcon({
	width = 24,
	height = 24,
	fill = '#FDE047',
	stroke = '#FDE047',
	strokeWidth = 2,
}) {
	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill={fill}
			stroke={stroke}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
		</Svg>
	);
}

export default memo(StarIcon);
