import React, { memo } from 'react';
import Svg, { Path } from "react-native-svg"

function FilterIcon({ fill = "#fff" }) {
	return (
		<Svg width="32" height="32" viewBox="0 0 48 48" fill="none">
			<Path d="M47 12C47 11.4696 46.7893 10.9609 46.4142 10.5858C46.0391 10.2107 45.5304 10 45 10H24C23.4696 10 22.9609 10.2107 22.5858 10.5858C22.2107 10.9609 22 11.4696 22 12C22 12.5304 22.2107 13.0391 22.5858 13.4142C22.9609 13.7893 23.4696 14 24 14H45C45.5304 14 46.0391 13.7893 46.4142 13.4142C46.7893 13.0391 47 12.5304 47 12Z" fill={fill} />
			<Path d="M3 14H8.35C8.82179 15.3344 9.75014 16.4591 10.971 17.1753C12.1918 17.8914 13.6265 18.1529 15.0215 17.9136C16.4165 17.6743 17.6819 16.9495 18.5942 15.8673C19.5065 14.7852 20.0069 13.4154 20.0069 12C20.0069 10.5846 19.5065 9.21483 18.5942 8.13269C17.6819 7.05055 16.4165 6.32576 15.0215 6.08642C13.6265 5.84708 12.1918 6.1086 10.971 6.82475C9.75014 7.5409 8.82179 8.66558 8.35 10H3C2.46957 10 1.96086 10.2107 1.58579 10.5858C1.21071 10.9609 1 11.4696 1 12C1 12.5304 1.21071 13.0392 1.58579 13.4142C1.96086 13.7893 2.46957 14 3 14V14ZM14 10C14.3956 10 14.7822 10.1173 15.1111 10.3371C15.44 10.5568 15.6964 10.8692 15.8478 11.2346C15.9991 11.6001 16.0387 12.0022 15.9616 12.3902C15.8844 12.7782 15.6939 13.1345 15.4142 13.4142C15.1345 13.6939 14.7781 13.8844 14.3902 13.9616C14.0022 14.0388 13.6001 13.9991 13.2346 13.8478C12.8692 13.6964 12.5568 13.4401 12.3371 13.1112C12.1173 12.7823 12 12.3956 12 12C12 11.4696 12.2107 10.9609 12.5858 10.5858C12.9609 10.2107 13.4696 10 14 10V10Z" fill={fill} />
			<Path d="M45 22H37.65C37.1782 20.6656 36.2499 19.5409 35.0291 18.8247C33.8082 18.1086 32.3735 17.8471 30.9786 18.0864C29.5836 18.3258 28.3181 19.0506 27.4058 20.1327C26.4935 21.2148 25.9932 22.5846 25.9932 24C25.9932 25.4154 26.4935 26.7852 27.4058 27.8673C28.3181 28.9495 29.5836 29.6743 30.9786 29.9136C32.3735 30.1529 33.8082 29.8914 35.0291 29.1753C36.2499 28.4591 37.1782 27.3344 37.65 26H45C45.5305 26 46.0392 25.7893 46.4142 25.4142C46.7893 25.0392 47 24.5304 47 24C47 23.4696 46.7893 22.9609 46.4142 22.5858C46.0392 22.2107 45.5305 22 45 22ZM32 26C31.6045 26 31.2178 25.8827 30.8889 25.663C30.56 25.4432 30.3036 25.1308 30.1523 24.7654C30.0009 24.3999 29.9613 23.9978 30.0384 23.6098C30.1156 23.2219 30.3061 22.8655 30.5858 22.5858C30.8655 22.3061 31.2219 22.1156 31.6098 22.0384C31.9978 21.9613 32.3999 22.0009 32.7654 22.1523C33.1308 22.3036 33.4432 22.56 33.663 22.8889C33.8827 23.2178 34 23.6044 34 24C34 24.5304 33.7893 25.0392 33.4142 25.4142C33.0392 25.7893 32.5305 26 32 26Z" fill={fill} />
			<Path d="M22 22H3C2.46957 22 1.96086 22.2107 1.58579 22.5858C1.21071 22.9609 1 23.4696 1 24C1 24.5304 1.21071 25.0391 1.58579 25.4142C1.96086 25.7893 2.46957 26 3 26H22C22.5304 26 23.0391 25.7893 23.4142 25.4142C23.7893 25.0391 24 24.5304 24 24C24 23.4696 23.7893 22.9609 23.4142 22.5858C23.0391 22.2107 22.5304 22 22 22Z" fill={fill} />
			<Path d="M45 34H28C27.4696 34 26.9609 34.2107 26.5858 34.5858C26.2107 34.9609 26 35.4696 26 36C26 36.5304 26.2107 37.0391 26.5858 37.4142C26.9609 37.7893 27.4696 38 28 38H45C45.5304 38 46.0391 37.7893 46.4142 37.4142C46.7893 37.0391 47 36.5304 47 36C47 35.4696 46.7893 34.9609 46.4142 34.5858C46.0391 34.2107 45.5304 34 45 34Z" fill={fill} />
			<Path d="M18 30C16.7604 30.0014 15.5517 30.3867 14.54 31.103C13.5282 31.8193 12.7632 32.8313 12.35 34H3C2.46957 34 1.96086 34.2107 1.58579 34.5858C1.21071 34.9609 1 35.4696 1 36C1 36.5304 1.21071 37.0391 1.58579 37.4142C1.96086 37.7893 2.46957 38 3 38H12.35C12.7168 39.0374 13.3617 39.9539 14.2143 40.6494C15.0669 41.3448 16.0943 41.7925 17.1842 41.9433C18.2741 42.0942 19.3845 41.9424 20.394 41.5047C21.4034 41.0669 22.2731 40.36 22.9078 39.4613C23.5425 38.5626 23.9179 37.5066 23.9929 36.4089C24.0679 35.3111 23.8396 34.2139 23.3329 33.2372C22.8263 32.2605 22.0608 31.442 21.1203 30.871C20.1797 30.3001 19.1003 29.9987 18 30V30ZM18 38C17.6044 38 17.2178 37.8827 16.8889 37.6629C16.56 37.4432 16.3036 37.1308 16.1522 36.7654C16.0009 36.3999 15.9613 35.9978 16.0384 35.6098C16.1156 35.2219 16.3061 34.8655 16.5858 34.5858C16.8655 34.3061 17.2219 34.1156 17.6098 34.0384C17.9978 33.9613 18.3999 34.0009 18.7654 34.1522C19.1308 34.3036 19.4432 34.56 19.6629 34.8889C19.8827 35.2178 20 35.6044 20 36C20 36.5304 19.7893 37.0391 19.4142 37.4142C19.0391 37.7893 18.5304 38 18 38Z" fill={fill} />
		</Svg>
	)
}

export default memo(FilterIcon)