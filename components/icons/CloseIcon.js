import React, { memo } from 'react';
import Svg, { G, Path } from 'react-native-svg';

function CloseIcon({ width = 10, height = 10, stroke="#000" }) {
	return (
		<Svg width={width} height={height} viewBox="0 0 9 9" fill="none">
			<G>
				<Path
					d="M5.542 4.667l3.145-3.145A.5.5 0 107.98.814L4.834 3.96 1.688.814a.5.5 0 10-.707.708l3.146 3.145L.98 7.813a.5.5 0 10.707.708l3.146-3.146L7.98 8.52a.499.499 0 00.707 0 .5.5 0 000-.708L5.542 4.667z"
					fill={stroke}
				/>
			</G>
		</Svg>
	);
}

export default memo(CloseIcon);
