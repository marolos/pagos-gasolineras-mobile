import React, { memo } from 'react';
import { View, Text } from 'react-native';
import tailwind from 'tailwind-rn';
import Modal from 'react-native-modal';
import { typefaces } from '../utils/styles';
import Button from '../shared/AppButton';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';
import FastImage from 'react-native-fast-image';
import BackIcon from '../icons/SmallBackIcon';
import { background, 
	dollar_text,  
	info_text } from '../utils/colors';

function CollapseModalOptions({ visible, closeCollapse, station}) {
	const navigation = useNavigation();
	return (
		<Modal
			isVisible={visible}
			testID={'modal'}
			animationIn="fadeInUp"
			animationOut="fadeOutDown"
			onSwipeComplete={closeCollapse}
			onBackdropPress={closeCollapse}
			backdropTransitionOutTiming={0}
			style={styles.modal}
		>
			<View style={styles.view}>
			<View style={{zIndex: 1 }}>
					<BackTitle closeCollapse={closeCollapse} station={station}/>
				</View> 
				<View style={[tailwind('flex rounded-2xl p-6 h-full'), { backgroundColor: background, zIndex: 10 }]}>
					<View style={styles.total}>
						<Text style={styles.totalText}>Saldo disponible:</Text>
						<Text style={styles.totalValue}>${station.total}</Text>
					</View>
					<View style={styles.options}>
						<Button
							text={'Comprar'}
							primary={true}
							onPress={() => {
								closeCollapse();
								setTimeout(
									() =>
										navigation.navigate('billingData', {
											...station,
											navigateToOnDone: 'topupData',
										}),
									200,
								);
							}}
						/>
						<Button
							text={'Recargar'}
							primary={false}
							onPress={() => {
								closeCollapse();
								setTimeout(() => navigation.navigate('buy', station), 200);
							}}
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
}


const BackTitle = memo(({ closeCollapse, station }) => {
	return (
		<View style={{ zIndex: 1 }}>
			<Ripple
				onPress={() => {
					setTimeout(() => closeCollapse(), 50);
				}}
				style={tailwind('rounded-full p-2 pl-2 w-12 items-center')}
				rippleCentered={true}
			>
				<BackIcon />
			</Ripple>
			<View style={tailwind('flex flex-row items-center ml-12 mb-4')}>
			<FastImage
					source={{ uri: station.company.company_logo_path }}
					style={styles.image}
				/>
				<Text style={[tailwind('text-2xl'), typefaces.pb]}>{station.gas_station.name}</Text>
			</View>
		</View>
	)
})

const styles = {
	modal: tailwind('w-full flex justify-end items-center m-0'),
	view: tailwind('w-full h-full bg-white rounded-t-lg'),
	title: tailwind('flex flex-row items-center'),
	titleText: [tailwind('mt-2 ml-2 text-base'), typefaces.psb],
	totalText: [tailwind('text-lg'), typefaces.pm, { color: info_text }],
	image: tailwind('w-12 h-12 mr-3'),
	total: tailwind('flex flex-row p-4 justify-center'),
	totalValue:[tailwind('text-lg ml-2'), typefaces.psb, { color: dollar_text }],
	options: tailwind('flex flex-row justify-evenly mt-12'),
};

export default memo(CollapseModalOptions);
