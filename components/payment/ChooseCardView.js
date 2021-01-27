import React, { memo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import CardItem from './CardItem';
import tailwind from 'tailwind-rn';
import { typefaces } from '../utils/styles';
import Line from '../shared/Line';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import Ripple from 'react-native-material-ripple';
import LoadingButton from '../shared/LoadingButton';
import NextIcon from '../icons/NextIcon';
import { connect } from 'react-redux';
import Fetch from '../utils/Fetch';
import SmallBackIcon from '../icons/SmallBackIcon';
import { background, btn_text, info_text, white } from '../utils/colors';
import FastImage from 'react-native-fast-image';

const initialState = {
	cards: [],
	selectedCard: {},
	loading: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'select':
			return { ...state, selectedCard: action.value };
		case 'set_cards':
			return { cards: action.value, loading: false, selectedCard: action.value[0] };
		case 'loading':
			return { ...state, loading: true };
		case 'end_loading':
			return { ...state, loading: false };
		default:
			throw new Error('there are not default case');
	}
};

function ChooseCardView({ user, navigation, route }) {
	const [state, dispatch] = React.useReducer(reducer, initialState);

	React.useEffect(() => {
		dispatch({ type: 'loading' });
		Fetch.get('/payment/user/card/')
			.then((res) => dispatch({ type: 'set_cards', value: res.body.cards }))
			.catch(() => dispatch({ type: 'end_loading' }));
	}, []);

	function next() {
		navigation.push('confirmTopup', {
			...route.params,
			card: { ...state.selectedCard, save: true },
		});
	}

	return (
		<View style={{ flex: 1, backgroundColor: white }}>
			<BackTitle navigation={navigation}  station={route.params}/>

			<View style={[tailwind('flex rounded-2xl'), { flex: 1, backgroundColor: background, zIndex: 10 }]}>
				<Text style={[{ color: btn_text }, typefaces.psb, tailwind('text-lg mt-2 ml-6')]}>
					Comprar saldo
				</Text>

				<View style={tailwind('m-4')}>
					<Text style={[tailwind('text-sm mb-2'), typefaces.pr, { color: info_text }]}>Tarjetas guardadas:</Text>

					<View>
						{state.loading && <ActivityIndicator animating color="black" />}
						{state.cards.map((card, index) => (
							<CardItem
								{...card}
								key={index.toString()}
								holderName={card.holder_name}
								type={card.type}
								selected={state.selectedCard.token === card.token}
								onPress={() => dispatch({ type: 'select', value: card })}
							/>
						))}
					</View>
				</View>
				{/*<Line style={tailwind('bg-gray-300 w-full mt-2 mb-1')} />
				<View style={tailwind('items-center mt-12')}>
					<Ripple
						onPress={() => navigation.push('addCard', { ...route.params })}
						style={tailwind('w-48 bg-white border rounded border-gray-300')}
					>
						<View style={tailwind('flex flex-row justify-between items-center px-6 py-3')}>
							<Text style={[typefaces.pm, tailwind('mr-4 ')]}>Usar otra tarjeta</Text>
							<ArrowRightIcon />
						</View>
					</Ripple>
				</View>
				*/}
				<View style={tailwind('absolute bottom-0 right-0 flex flex-row items-center')}>
					<Text style={[typefaces.psb, tailwind('mr-10 self-start mt-3'), {color: btn_text}]} onPress={() => navigation.push('addCard', { ...route.params })}>Usar otra tarjeta</Text>

					<LoadingButton
						text="Siguiente"
						style={tailwind('w-40 self-end mr-6 mb-12')}
						onPress={next}
					/>
				</View>

			</View>
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
				<SmallBackIcon />
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


export default connect((state) => ({ user: state.user.data }))(ChooseCardView);
