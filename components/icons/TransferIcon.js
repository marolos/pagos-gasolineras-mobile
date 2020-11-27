import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

function TransferIcon({ width = 22, height = 18, stroke = '#000' }) {
	return (
		<Svg width={width} height={height} viewBox="0 0 22 18" fill="none">
			<Path
				d="M19.462 12.795H1.512M5.103 16.385l-3.59-3.59 3.59-3.59M1.513 5.103H19.46M16.898 1.513l3.59 3.59-3.59 3.59"
				stroke={stroke}
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

export default memo(TransferIcon);
