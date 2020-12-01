import React, { memo } from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

function TipsIcon({ width = 18, height = 30, stroke = '#444', fillCircle = '#FFB443' }) {
	return (
		<Svg width={width} height={height} viewBox="0 0 18 30" fill="none">
			<Path
				d="M14.188 5.594c.16 0 .313-.062.43-.178l2.576-2.533a.612.612 0 10-.861-.873l-2.576 2.533a.612.612 0 00-.006.866.6.6 0 00.437.185zM3.411 5.423c.117.116.27.172.424.172.16 0 .32-.062.443-.185a.607.607 0 00-.012-.867L1.64 2.011a.612.612 0 00-.867.012.607.607 0 00.012.867l2.625 2.533zM8.987 4.936a.617.617 0 00.615-.614V.615A.617.617 0 008.987 0a.617.617 0 00-.615.615v3.707c0 .338.277.614.615.614zM17.114 12.228A8.023 8.023 0 0014.102 7.9a8.587 8.587 0 00-5.115-1.654 8.47 8.47 0 00-5.078 1.66 8.068 8.068 0 00-3.006 4.328 7.761 7.761 0 00.35 5.194 8.223 8.223 0 003.228 3.726v1.949l-.006 2.532v.013C4.53 28.05 6.553 30 8.987 30c2.484 0 4.506-1.96 4.506-4.37v-4.482c1.451-.886 2.6-2.201 3.265-3.732a7.737 7.737 0 00.356-5.188zM8.987 28.77c-1.549 0-2.87-1.088-3.203-2.527h6.412c-.295 1.439-1.623 2.527-3.209 2.527zm3.283-3.756H5.711l.006-1.304h6.553v1.304zm.307-4.759a.618.618 0 00-.32.541v1.685H5.712v-1.685a.615.615 0 00-.314-.535c-2.791-1.567-4.156-4.727-3.307-7.696.842-2.994 3.676-5.09 6.897-5.09 3.295 0 6.086 2.047 6.947 5.09.848 2.969-.535 6.135-3.357 7.69z"
				fill={stroke}
			/>
			<Circle cx={9} cy={15} r={4} fill={fillCircle} />
		</Svg>
	);
}

export default memo(TipsIcon);
