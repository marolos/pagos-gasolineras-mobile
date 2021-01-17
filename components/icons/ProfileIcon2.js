import React, { memo } from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { View } from 'react-native';

function ProfileIcon2({ focused, width=35, height=35 }) {
	return (
		<View>
			<Svg width={width} height={height} viewBox="0 0 140 140" fill="none">
			   <G >
				    <Path d="M66.8504 139.93C61.1337 139.626 56.5137 138.868 50.6337 137.27C48.5104 136.698 44.2287 135.158 42.1987 134.236C41.9887 134.143 41.5104 133.933 41.137 133.758C37.5554 132.16 33.6004 129.92 30.182 127.551C15.412 117.32 5.01703 101.64 1.47036 84.2329C0.420365 79.0762 0.0820312 75.5295 0.0820312 69.9995C0.0820312 63.0695 0.782031 57.7612 2.56703 51.2629C9.04203 27.7662 27.767 9.0412 51.2637 2.5662C57.762 0.781196 63.0704 0.069529 70.0004 0.0811956C75.5304 0.0811956 79.1004 0.431196 84.2337 1.46953C104.825 5.66953 122.71 19.3195 132.359 38.2079C136.43 46.1879 138.799 54.4245 139.72 63.8162C140 66.6745 140.012 73.2312 139.732 76.0662C139.102 82.4479 138.005 87.5112 136.045 93.0995C135.322 95.1529 135.287 95.2695 134.599 96.8912C132.604 101.616 130.749 105.035 127.832 109.375C127.179 110.343 125.382 112.805 124.939 113.341C122.115 116.725 121.462 117.471 119.467 119.466C117.857 121.065 116.609 122.208 115.045 123.515C114.24 124.191 113.459 124.845 113.307 124.973C112.817 125.381 109.982 127.446 108.909 128.17C107.905 128.858 104.814 130.783 104.72 130.783C104.697 130.783 104.184 131.063 103.589 131.401C102.189 132.183 99.447 133.525 97.942 134.166C97.3004 134.435 96.5654 134.75 96.3087 134.866C95.632 135.158 93.4854 135.94 91.8754 136.476C85.132 138.728 78.377 139.836 70.9337 139.93C69.102 139.953 67.2704 139.953 66.8504 139.93Z" fill="#C2C3C9"/>
                <Path d="M29.167 126.84C29.0037 126.735 28.327 126.233 27.6504 125.72C14.1987 115.465 4.80703 100.59 1.47036 84.2329C0.420365 79.0762 0.0820312 75.5295 0.0820312 69.9995C0.0820312 63.0695 0.782031 57.7612 2.56703 51.2629C9.04203 27.7662 27.767 9.0412 51.2637 2.5662C57.762 0.781196 63.0704 0.069529 70.0004 0.0811956C75.5304 0.0811956 79.1004 0.431196 84.2337 1.46953C104.825 5.66953 122.71 19.3195 132.359 38.2079C136.43 46.1879 138.799 54.4245 139.72 63.8162C140 66.6745 140.012 73.2312 139.732 76.0662C139.102 82.4479 138.005 87.5112 136.045 93.0995C135.322 95.1529 135.287 95.2695 134.599 96.8912C132.604 101.616 130.749 105.035 127.832 109.375C127.179 110.343 125.382 112.805 124.939 113.341C122.115 116.725 121.462 117.471 119.467 119.466C117.88 121.041 116.62 122.208 115.092 123.48C113.12 125.125 112.805 125.37 111.604 126.256L110.542 127.026L110.472 117.856C110.402 108.173 110.402 108.161 109.83 105.466C108.897 101.138 107.054 97.1012 104.37 93.5079C103.075 91.7812 100.229 88.8995 98.6304 87.6979C94.3837 84.5129 90.102 82.6579 85.0154 81.7829C84.2454 81.6545 83.4637 81.5495 83.2654 81.5379H82.892L83.2304 81.2812C83.417 81.1412 83.942 80.7445 84.397 80.4062C88.422 77.3962 91.467 72.9045 92.867 67.9345C93.9637 64.0379 94.0337 59.7212 93.042 55.7662C92.2254 52.4762 90.6387 49.2795 88.5504 46.6779C84.9454 42.1979 79.9637 39.2112 74.282 38.1379C72.4154 37.7762 68.7754 37.6945 66.8854 37.9629C63.2104 38.4879 59.9437 39.7012 57.0154 41.6379C51.252 45.4412 47.507 51.3329 46.492 58.2162C46.2237 59.9662 46.2237 63.1862 46.492 64.8662C47.472 71.2945 50.692 76.7079 55.802 80.5345L57.062 81.4795L55.627 81.6895C49.0004 82.6462 43.272 85.5162 38.4887 90.2879C35.9687 92.8079 34.347 95.0479 32.807 98.0812C31.302 101.068 30.4504 103.705 29.8437 107.286C29.6104 108.71 29.587 109.258 29.5287 117.903L29.4587 127.015L29.167 126.84Z" fill="#EDEEF0"/>
            </G>
			</Svg>
		</View>
	);
}

export default memo(ProfileIcon2);