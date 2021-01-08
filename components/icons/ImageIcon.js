import React, { memo } from 'react';
import Svg, { Rect, Circle, Path } from 'react-native-svg';

function ImageIcon({ width = 24, height = 24, fill = 'none', stroke = '#000', strokeWidth = 1.5 }) {
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
			<Rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
			<Circle cx={8.5} cy={8.5} r={1.5} />
			<Path d="M21 15l-5-5L5 21" />
		</Svg>
	);
}

export default memo(ImageIcon);
