import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';

function ScheduleIcon(props) {
	return (
		<View>
			<Svg
				width={12}
				height={12}
				viewBox="0 0 12 13"
				fill={'#001017'}
				stroke={'#001017'}
				stroke-width={0.8}
			>
				<Path d="M10.4146 0.320801H2.73212C2.15011 0.320801 1.68916 0.806492 1.68916 1.41974V3.66667H0.720703V4.17689H1.68916V6.06569H0.720703V6.57591H1.68916V8.46471H0.720703V8.97493H1.68916V11.2219C1.68916 11.8351 2.15011 12.3208 2.73212 12.3208H10.3913C10.9733 12.3208 11.4343 11.8351 11.4575 11.2219V1.41974C11.4575 0.806492 10.9966 0.320801 10.4146 0.320801ZM10.9733 11.2268C10.9733 11.5334 10.7312 11.813 10.4169 11.813H2.73444C2.44344 11.813 2.17805 11.5579 2.17805 11.2268V8.97984H3.09994V8.46961H2.17572V6.58082H3.09761V6.0706H2.17572V4.1818H3.09761V3.67158H2.17572V1.41974C2.17572 1.11311 2.41783 0.833475 2.73212 0.833475H10.4146C10.7056 0.833475 10.971 1.08858 10.971 1.41974V11.2268H10.9733Z" />
			</Svg>
		</View>
	);
}

export default memo(ScheduleIcon);
