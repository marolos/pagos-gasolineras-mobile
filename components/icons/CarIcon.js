import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

function CarIcon({ width = 20, height = 11, fill = '#000' }) {
	return (
		<Svg width={width} height={height} viewBox="0 0 20 11">
			<Path
				d="M18 3.503h-3.42L12.868.51A1 1 0 0012 .008H6a1 1 0 00-.962.724l-.792 2.77H2A2 2 0 000 5.5v2.496a1 1 0 001 1h1.05a2.5 2.5 0 004.9 0h6.1a2.5 2.5 0 004.9 0H19a1 1 0 001-1V5.5a2 2 0 00-2-1.997zm-8-2.497h2l1.429 2.497H10V1.006zm-4 0h3v2.497H5.286L6 1.006zM4.5 9.994A1.5 1.5 0 013 8.496a1.5 1.5 0 013 0 1.5 1.5 0 01-1.5 1.498zm11 0A1.5 1.5 0 0114 8.496a1.5 1.5 0 013 0 1.5 1.5 0 01-1.5 1.498zm3-3.495h.5v1.497h-1.05a2.5 2.5 0 00-4.9 0h-6.1a2.5 2.5 0 00-4.9 0H1V5.5a1 1 0 011-.999h16a1 1 0 011 .999h-.5a.5.5 0 100 .999z"
				fill={fill}
			/>
		</Svg>
	);
}

export default memo(CarIcon);
