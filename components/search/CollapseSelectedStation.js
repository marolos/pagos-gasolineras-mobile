import React, { memo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import tailwind from 'tailwind-rn';
import Modal from 'react-native-modal';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import { typefaces } from '../utils/styles';
import Button from '../shared/Button';
import Ripple from 'react-native-material-ripple';
import Fetch from '../utils/Fetch';
import FastImage from 'react-native-fast-image';
import StarIcon from '../icons/StarIcon';

class CollapseSelectedStation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			hasCredit: false,
			company: {},
			balance: null,
		};
	}

	componentDidMount() {
		if (this.props.station) {
			this.loadData();
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.station.id !== this.props.station.id) {
			this.loadData();
		}
	}

	loadData = () => {
		this.setState({ loaded: false, hasCredit: false });
		const { station } = this.props;
		Fetch.get(`/company/station/${station.id}/`)
			.then((res) => {
				this.setState({ company: res.body.station.company, loaded: true });
			})
			.catch((err) => {
				err;
			});
		Fetch.get('/users/balances/', { station_id: station.id })
			.then((res) => {
				const { balance } = res.body;
				if (balance && balance.total){
					this.setState({ hasCredit: balance.total > 0, balance: balance});
				}
			})
			.catch((err) => {
				this.setState({ hasCredit: false });
			});
	};

	onTopup = () => {
		const { company } = this.state;
		const { closeCollapse, station, navigation } = this.props;
		closeCollapse();
		setTimeout(
			() =>
				navigation.navigate('billingData', {
					gas_station: station,
					company,
				}),
			100,
		);
	};

	onBuy = () => {
		const { company, balance } = this.state;
		const { closeCollapse, station, navigation } = this.props;
		closeCollapse();
		setTimeout(
			() =>
				navigation.navigate('buy', {
					gas_station: station,
					company,
					total: balance.total,
					id: balance.id,
				}),
			100,
		);
	};

	onFeedback = () => {
		this.props.closeCollapse()
		this.props.navigation.navigate('feedback', {
			screen: 'feedbackView',
			params: { station: this.props.station },
		});
	};

	render() {
		const { loaded, company, hasCredit } = this.state;
		const { closeCollapse, visible, station } = this.props;

		return (
			<Modal
				isVisible={visible}
				testID={'modal'}
				animationIn="fadeInUp"
				animationOut="fadeOutDown"
				onSwipeComplete={closeCollapse}
				onBackdropPress={closeCollapse}
				backdropTransitionOutTiming={0}
				backdropOpacity={0.3}
				style={styles.modal}
			>
				<View style={styles.view}>
					<Ripple style={styles.arrow} onPress={closeCollapse} rippleCentered>
						<ArrowDownIcon />
					</Ripple>
					<View style={tailwind('pt-1 px-6')}>
						<View style={styles.title}>
							{loaded ? (
								<FastImage
									source={{ uri: company.company_logo_path }}
									style={styles.image}
								/>
							) : (
								<ActivityIndicator color="black" size="small" animating />
							)}
							<View>
								<Text style={styles.titleText}>{station.name}</Text>
								<Text style={styles.address}>{station.address}</Text>
								{loaded && <Rating rating={station.global_purchase_rating} />}
							</View>
						</View>
						<View style={styles.feedback.view}>
							<FeedbackButton onPress={this.onFeedback} />
						</View>
						<View style={styles.options}>
							{loaded && (
								<React.Fragment>
									<Button text={'recargar'} onPress={this.onTopup} primary={!hasCredit} />
									{hasCredit && <Button text={'comprar'} onPress={this.onBuy} />}
								</React.Fragment>
							)}
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}

function Rating({ rating = 0.0 }) {
	return (
		<View style={styles.rating.view}>
			<Text style={styles.rating.text}>{rating.toFixed(1)}</Text>
			<StarIcon fill={'#FBBF24'} stroke="#FBBF24" />
		</View>
	);
}

function FeedbackButton({ onPress }) {
	return (
		<Ripple onPress={onPress} rippleCentered>
			<Text style={{ textDecorationLine: 'underline' }}>Sugerencias o reclamos</Text>
		</Ripple>
	);
}

const styles = {
	modal: tailwind('w-full flex justify-end items-center m-0'),
	view: tailwind('w-full h-64 bg-white rounded-t-lg'),
	title: tailwind('flex flex-row items-center mt-4'),
	titleText: [tailwind('mt-2 ml-2 text-base'), typefaces.psb],
	address: [tailwind('ml-2 text-sm text-gray-600'), typefaces.pm],
	image: { width: 50, height: 50 },
	total: tailwind('flex flex-row p-4'),
	totalText: [tailwind('text-base'), typefaces.pm],
	totalValue: [tailwind('text-lg text-green-600 ml-4'), typefaces.pm],
	options: tailwind('flex flex-row justify-evenly mt-4'),
	arrow: tailwind('absolute right-0 p-6'),
	feedback: {
		view: tailwind('w-full flex items-center justify-center my-2'),
	},
	rating: {
		view: tailwind('flex flex-row items-center ml-2'),
		text: [tailwind('text-base text-gray-700 mt-1 mr-1'), typefaces.pm],
	},
};

export default memo(CollapseSelectedStation);
