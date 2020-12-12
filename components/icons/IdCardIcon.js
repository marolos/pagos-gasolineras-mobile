import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

function IdCardIcon(props) {
	return (
		<Svg width={20} height={16} viewBox="0 0 20 16" fill="none" {...props}>
			<Path fill='#000' d="M18.494.029H1.506C.698.029.021.665.021 1.514v12.4c0 .808.636 1.486 1.485 1.486H18.49c.808 0 1.486-.678 1.486-1.527V1.514A1.472 1.472 0 0018.494.03zm.678 13.84a.668.668 0 01-.678.678H1.506a.668.668 0 01-.677-.678V1.514c0-.383.298-.677.677-.677H18.49c.384 0 .677.298.677.677V13.87h.005z" />
			<Path fill='#000' d="M6.817 2.747H2.4v4.416h4.417V2.747zm-.808 3.608h-2.76v-2.76h2.76v2.76zM11.612 9.286H2.824v.849h8.788v-.85zM11.612 11.96H2.824v.848h8.788v-.849z" />
		</Svg>
	);
}

export default memo(IdCardIcon);
