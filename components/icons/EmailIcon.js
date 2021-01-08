import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

function EmailIcon({ width = 18, height = 15, stroke = '#000', strokeWidth = 2 }) {
	return (
		<Svg width={width} height={height} viewBox="0 0 18 15">
			<Path
				d="M2.455.818h13.09c.9 0 1.637.736 1.637 1.636v9.819c0 .9-.736 1.636-1.636 1.636H2.455c-.9 0-1.637-.736-1.637-1.636V2.454c0-.9.737-1.636 1.637-1.636z"
				stroke={stroke}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M17.182 2.455L9 8.182.818 2.455"
				stroke={stroke}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

export default memo(EmailIcon);
