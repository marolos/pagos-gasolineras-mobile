import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

function DeleteIcon({
	width = 24,
	height = 24,
	fill = 'none',
	stroke = 'currentColor',
	strokeWidth = 2,
}) {
	return (
		<Svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill={fill}
			stroke={stroke}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<Path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
		</Svg>
	);
}

export default memo(DeleteIcon);
