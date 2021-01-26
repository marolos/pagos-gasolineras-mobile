import React, { memo } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import LoadingButton from '../shared/LoadingButton';
import NextIcon from '../icons/NextIcon';
import tailwind from 'tailwind-rn';
import Line from '../shared/Line';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import { typefaces, shadowStyle3 } from '../utils/styles';
import AddSubInput from '../shared/AddSubInput';
import { FULL_HIGHT, IVA_RATE, COMMISION, FULL_WIDTH } from '../utils/constants';
import Ripple from 'react-native-material-ripple';
import { makeCancelable } from '../utils/utils';
import { connect } from 'react-redux';
import SimpleToast from 'react-native-simple-toast';
import Fetch from '../utils/Fetch';
import BackIcon from '../icons/SmallBackIcon';
import FastImage from 'react-native-fast-image';
import { background, 
	dollar_text,
	btn_text, 
	info_text } from '../utils/colors';

function TopupDataView({ route, navigation, user }) {
	const [amount, setAmount] = React.useState(0);
	const [hasCards, setHasCards] = React.useState(false);
	const [loaded, setLoaded] = React.useState(false);
	console.log(route);
	React.useEffect(() => {
		setLoaded(false);
		const request = makeCancelable(
			Fetch.get('/payment/user/card/'),
			({ body }) => {
				setHasCards(body.cards.length > 0);
				setLoaded(true);
			},
			(err) => {
				console.error('reject::::', err);
				if (err.isCanceled) return;
				setLoaded(true);
			},
		);
		return () => request.cancel();
	}, []);

	function next() {
		if (amount < 5) {
			SimpleToast.showWithGravity(
				'Ingrese una cantidad mayor o igual a $5',
				SimpleToast.LONG,
				SimpleToast.CENTER,
			);
			return;
		}
		const { gas_station, company } = route.params;
		const params = { company, gas_station, amount };
		if (hasCards) {
			navigation.push('chooseCard', params);
		} else {
			navigation.push('addCard', params);
		}
	}

	return (
		<View style={{ height: FULL_HIGHT, width: FULL_WIDTH }}>
			<View style={{zIndex: 1 }}>
					<BackTitle navigation={navigation} station={route.params}/>
				</View>
			<ScrollView 
				style={[tailwind('flex rounded-2xl pb-6'), { backgroundColor: background, zIndex: 10 }]}>
				<View style={styles.main}>
				<Text style={[{ color: btn_text }, typefaces.psb, tailwind('text-lg mt-2 ml-6')]}>
							Comprar saldo</Text>
					<View style={styles.billing.container}>
						<Text style={styles.billing.text}>Facturación:</Text>
						<View>
							<Ripple 
								style={[tailwind('mb-2 bg-white rounded-xl border border-gray-300'), shadowStyle3]}
								onPress={navigation.goBack}>
								<View style={styles.billing.buttonContainer}>
									<Text style={[typefaces.psb, tailwind('text-base')]}>
										{user.first_name} {user.last_name}
									</Text>
									<View style={styles.billing.arrowContainer}>
										<Text style={styles.billing.arrowText}>Editar</Text>
									</View>
								</View>
							</Ripple>
						</View>
					</View>
					<View style={styles.billing.container}>
						<View style={tailwind('flex flex-row')}>
							<Text style={styles.billing.text}>
								Gasolinera:
							</Text>
							<Text style={[tailwind('ml-8 text-base')]} >{route.params.gas_station.name}</Text>
						</View>
						<View>
							<Text style={styles.billing.text}>Cantidad en $:</Text>
							<AddSubInput onChange={setAmount} />
						</View>
					</View>
					<View style={tailwind('px-6 pt-3')}>
						<View style={tailwind('h-4')}/>
						<View style={tailwind('p-6 border rounded-2xl mx-6 bg-white items-center')}>
							<Resume amount={amount} />
						</View>
					</View>
					<View style={tailwind('absolute bottom-0 right-0')}>
						{loaded ? (
							<LoadingButton
								text="Siguiente"
								style={tailwind('w-40 self-end mr-6 mb-12')}
								onPress={() => next()}
							/>
						) : (
							<ActivityIndicator animating color="black" />
						)}
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

const BackTitle = memo(({ navigation, station }) => {
	return (
		<View style={{ zIndex: 1 }}>
			<Ripple
				onPress={navigation.goBack}
				style={tailwind('rounded-full p-2 pl-2 w-12 items-center')}
				rippleCentered={true}
			>
				<BackIcon />
			</Ripple>
			<View style={tailwind('flex flex-row items-center ml-12 mb-4')}>
			<FastImage
					source={{ uri: station.company.company_logo_path }}
					style={tailwind('w-12 h-12')}
				/>
				<Text style={[tailwind('text-2xl'), typefaces.pb]}>{station.gas_station.name}</Text>
			</View>
		</View>
	)
})

export function Resume({ amount, showAmount = false, useGreen = true, extra = null }) {
	const [values, setValues] = React.useState({ subtotal: 0, iva: 0, total: 0 });

	React.useEffect(() => {
		const fraction = amount / (100 + IVA_RATE);
		setValues({
			iva: (IVA_RATE * fraction).toFixed(2),
			subtotal: (100 * fraction).toFixed(2),
			total: amount + COMMISION,
		});
	}, [amount]);

	return (
		<View>
			{showAmount && (
				<View style={styles.section.container}>
					
					
				</View>
			)}
			<View style={tailwind('flex flex-row items-center')}>
				<View style={tailwind('items-end')}>
				{showAmount && (
					<Text style={styles.section.textm}>Cantidad:</Text>
				)}
					<Text style={styles.section.textm}>Sub-total:</Text>
					<Text style={styles.section.textm}>IVA:</Text>
					<Text style={styles.section.textm}>Comision:</Text>
					<Text style={styles.section.textr}>Total:</Text>
					{extra && (
						<Text style={styles.section.textr}>{extra.label}:</Text>
					)}
				</View>
				<View>
				{showAmount && (
					<Text style={[styles.section.textm, { color: btn_text }, typefaces.psb]}>$ {amount}</Text>
				)}
					<Text style={[styles.section.textm, { color: btn_text }, typefaces.psb]}>$ {values.subtotal}</Text>
					<Text style={[styles.section.textm, { color: btn_text }, typefaces.psb]}>$ {values.iva}</Text>
					<Text style={[styles.section.textm, { color: btn_text }, typefaces.psb]}>$ 0.25</Text>
					<Text style={[styles.section.textr, { color: btn_text }, typefaces.psb]}>$ {values.total}</Text>
					{extra && (
						<Text style={[styles.section.textr, { color: btn_text }, typefaces.psb]}>{extra.value}</Text>
					)}
				</View>
			</View>
		</View>
	);
}

const styles = {
	main: { flex: 1, height: FULL_HIGHT - 65 },
	billing: {
		container: tailwind('px-6 py-3'),
		text: [tailwind('text-sm mb-2'), typefaces.pr, { color: info_text }],
		buttonContainer: tailwind(
			'rounded-xl flex flex-row justify-between px-6 py-5',
		),
		arrowContainer: tailwind('flex flex-row items-center'),
		arrowText: [typefaces.pr, tailwind('text-sm'), { color: info_text }],
	},
	line: tailwind('w-full bg-gray-300 my-2'),
	section: {
		container: tailwind('flex flex-row justify-between w-56'),
		textm: [tailwind('text-base mb-1 mr-4'), typefaces.pr],
		textr: [tailwind('text-base mr-4'), typefaces.pr],
		total: (useGreen) => [
			tailwind('text-base'),
			useGreen ? tailwind('text-green-600') : tailwind('text-black'),
			useGreen ? typefaces.psb : typefaces.pb,
		],
	},
};

export default connect((state) => ({ user: state.user.data }))(TopupDataView);
