import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

function BookIcon({ width = 19, height = 20, stroke = '#000' }) {
	return (
		<Svg width={width} height={height} viewBox="0 0 19 20" fill="none">
			<Path
				d="M16.49.507H4.324c-.921 0-1.651.77-1.651 1.74v3.558H1.141v.808h1.533v2.99H1.141v.808h1.533v2.99H1.141v.809h1.533v3.557c0 .971.73 1.74 1.651 1.74h12.127c.922 0 1.652-.769 1.689-1.74V2.247c0-.97-.73-1.74-1.652-1.74zm.884 17.268c0 .486-.383.928-.881.928H4.329c-.46 0-.88-.404-.88-.928v-3.557h1.459v-.808H3.444v-2.991h1.46v-.808h-1.46v-2.99h1.46v-.808h-1.46V2.247c0-.485.384-.928.881-.928H16.49c.461 0 .881.404.881.928v15.528h.004z"
				fill="#000"
				stroke={stroke}
				strokeWidth={0.8}
				opacity={0.8}
			/>
		</Svg>
	);
}

export default memo(BookIcon);
