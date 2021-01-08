import React from 'react';
import { View, Text, ScrollView, Image, Platform } from 'react-native';
import Ripple from 'react-native-material-ripple';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import ImageIcon from '../icons/ImageIcon';
import { launchImageLibrary } from 'react-native-image-picker';
import tailwind from 'tailwind-rn';
import { typefaces } from '../utils/styles';
import BasicInput from '../shared/BasicInput';
import CloseIcon from '../icons/CloseIcon';
import { FULL_WIDTH } from '../utils/constants';
import LoadingButton from '../shared/LoadingButton';
import SimpleToast from 'react-native-simple-toast';
import Fetch from '../utils/Fetch';

export default class FeedbackView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: {},
			img: {},
			imgHeight: 0,
			imgWidth: 0,
			sending: false,
			details: '',
		};
	}

	componentDidUpdate() {
		const { params } = this.props.route;
		const { type } = this.state;
		if (params && params.type && params.type.name !== type.name) {
			this.setState({ type: params.type });
		}
	}

	pickImage = () => {
		setTimeout(() => {
			launchImageLibrary({ mediaType: 'photo' }, (res) => {
				let { width, height } = res;
				let newWidth = FULL_WIDTH * 0.5;
				let scaleFactor = (width + 32) / newWidth;
				this.setState({ img: res, imgHeight: height / scaleFactor, imgWidth: newWidth });
			});
		}, 200);
	};

	chooseType = () => {
		this.props.navigation.push('feedbackType');
	};

	send = () => {
		const { type, details, img } = this.state;

		if (!type.name) {
			SimpleToast.show('debe seleccionar un tipo');
			return;
		}
		if (!details || details.length < 5) {
			SimpleToast.show('debe escribir detalles');
			return;
		}
		let data = {
			kind: type.name,
			details,
		};
		if (img.uri) {
			data['image'] = {
				uri: Platform.OS === 'android' ? img.uri : img.uri.replace('file://', ''),
				type: img.type,
				name: img.fileName,
			};
		}
		this.setState({ sending: true });
		Fetch.form('/company/feedback/create/', data)
			.then((res) => {
				SimpleToast.show('Feedback enviado');
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				this.setState({ sending: false });
				this.props.navigation.goBack()
			});
	};

	render() {
		const { type, img, imgHeight, imgWidth, sending } = this.state;
		return (
			<ScrollView keyboardShouldPersistTaps="handled" style={tailwind('p-6')}>
				<View style={tailwind('mb-6')}>
					<Text style={[typefaces.pm, tailwind('text-base mb-2')]}>Tipo:</Text>
					<Ripple
						onPress={this.chooseType}
						style={tailwind(
							'flex flex-row justify-between border rounded-md border-gray-300 py-2 px-4 items-center',
						)}
					>
						<Text style={[typefaces.pr]}>{type.name ? type.label : 'Seleccionar'}</Text>
						<ArrowRightIcon />
					</Ripple>
				</View>
				<View style={tailwind('mb-6')}>
					<Text style={[typefaces.pm, tailwind('text-base mb-2')]}>Detalles:</Text>
					<BasicInput
						placeholder="Mensaje claro y conciso"
						onChange={(text) => (this.state.details = text)}
						maxLength={300}
						style={{ ...typefaces.pr, ...tailwind('w-full') }}
						multiline={true}
					/>
				</View>
				<View style={tailwind('mb-6')}>
					<Text style={[typefaces.pm, tailwind('text-base mb-2')]}>
						Evidencia:{' '}
						<Text style={[typefaces.pm, tailwind('text-sm text-gray-600')]}>(opcional)</Text>
					</Text>
					<View style={tailwind('items-center mt-4')}>
						{img.uri ? (
							<ImageView
								uri={img.uri}
								onRemove={() => this.setState({ img: {} })}
								dims={{ imgHeight, imgWidth }}
							/>
						) : (
							<ImagePicker pickImage={this.pickImage} />
						)}
					</View>
				</View>
				<View style={tailwind('items-center mt-6 mb-24')}>
					<LoadingButton text="enviar" onPress={this.send} loading={sending} />
				</View>
			</ScrollView>
		);
	}
}

function ImagePicker({ pickImage }) {
	return (
		<Ripple
			onPress={pickImage}
			style={tailwind(
				'flex flex-row items-center justify-between border rounded-md border-gray-400 py-2 px-4 ',
			)}
			rippleDuration={350}
		>
			<ImageIcon stroke="#777" />
			<Text style={[typefaces.pr, tailwind('ml-2 text-gray-700')]}>seleccionar imagen</Text>
		</Ripple>
	);
}

function ImageView({ uri, onRemove, dims }) {
	return (
		<View>
			<Ripple
				onPress={onRemove}
				style={[
					tailwind(
						'absolute flex justify-center w-8 h-8 bg-gray-800 rounded-full items-center opacity-50',
					),
					{ zIndex: 10, right: 12, top: 12 },
				]}
			>
				<CloseIcon width={18} height={18} stroke="white" />
			</Ripple>
			<Image source={{ uri: uri }} style={{ width: dims.imgWidth, height: dims.imgHeight }} />
		</View>
	);
}
