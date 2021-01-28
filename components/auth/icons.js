import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export function EyeOff({
	width = 24,
	height = 24,
	fill = 'none',
	stroke = '#888',
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
			<Path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
		</Svg>
	);
}

export function Eye({ width = 24, height = 24, fill = 'none', stroke = '#333', strokeWidth = 2 }) {
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
			<Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
			<Circle cx={12} cy={12} r={3} />
		</Svg>
	);
}
