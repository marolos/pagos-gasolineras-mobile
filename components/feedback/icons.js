import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

export const PhoneIcon = memo(
	({
		width = 24,
		height = 24,
		viewBox = '0 0 24 24',
		fill = 'none',
		stroke = '#000',
		strokeWidth = 2,
	}) => {
		return (
			<Svg
				width={width}
				height={height}
				viewBox={viewBox}
				fill={fill}
				stroke={stroke}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<Path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
			</Svg>
		);
	},
);

export const LinkIcon = memo(
	({
		width = 24,
		height = 24,
		viewBox = '0 0 24 24',
		fill = 'none',
		stroke = '#000',
		strokeWidth = 2,
	}) => {
		return (
			<Svg
				width={width}
				height={height}
				viewBox={viewBox}
				fill={fill}
				stroke={stroke}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<Path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
			</Svg>
		);
	},
);
