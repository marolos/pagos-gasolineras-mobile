import React from 'react';
import { Linking, Platform, RefreshControl, ScrollView, Text, View, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import tailwind from 'tailwind-rn';
import Fetch from '../utils/Fetch';
import { useObjState } from '../utils/hooks';
import { LinkIcon, PhoneIcon } from './icons';
import ingSoftLogo from '../../assets/icons/ing-soft.png';
import { typefaces } from '../utils/styles';

export default function ContactView({ navigation }) {
	const [state, setState] = useObjState({ companies: [], loading: false });

	React.useEffect(() => {
		setState({ loading: true });
	}, []);
	
	React.useEffect(() => {
		if (state.loading) {
			Fetch.get('/company/all/')
				.then(({ body }) => setState({ companies: body, loading: false }))
				.catch((err) => console.error(err));
		}
	}, [state.loading]);

	return (
		<ScrollView
			keyboardShouldPersistTaps="handled"
			refreshControl={
				<RefreshControl
					refreshing={state.loading}
					onRefresh={() => setState({ loading: true })}
				/>
			}
		>
			<View style={tailwind('p-6')}>
				<View>
					<Text style={[typefaces.pm, tailwind('text-center text-base mb-4')]}>
						Empresas afiliadas
					</Text>
					<CompanyList companies={state.companies} />
				</View>
				<View style={tailwind('items-center mt-12')}>
					<Text style={[typefaces.pm, tailwind('text-center text-base mb-4')]}>
						Desarrollado por:
					</Text>
					<Developers />
				</View>
			</View>
		</ScrollView>
	);
}

function CompanyList({ companies }) {
	function call(number) {
		return () => setTimeout(() => dialCall(number), 200);
	}
	function openWeb(link) {
		return () => setTimeout(() => openLink(link), 200);
	}
	return (
		<View>
			{companies.map((c) => {
				let number = getPhoneNumber(c);
				let link = c.web;
				return (
					<View style={tailwind('flex flex-row justify-between')} key={c.id}>
						<View style={tailwind('flex flex-row items-center mb-4')}>
							<FastImage
								source={{ uri: c.company_logo_path }}
								style={{ width: 60, height: 60, marginRight: 15 }}
							/>
							<Text style={[typefaces.pm]}>{c.business_name}</Text>
						</View>
						<View style={tailwind('flex flex-row items-center')}>
							{number && (
								<Ripple
									onPress={call(number)}
									style={tailwind(
										'flex flex-row justify-center items-center rounded-full bg-green-200 h-12 w-12',
									)}
								>
									<PhoneIcon stroke='#15803D'/>
								</Ripple>
							)}
							{link && (
								<Ripple
									onPress={openWeb(link)}
									style={tailwind(
										'flex flex-row justify-center items-center rounded-full bg-blue-200 h-12 w-12 ml-4',
									)}
								>
									<LinkIcon stroke='#0369A1'/>
								</Ripple>
							)}
						</View>
					</View>
				);
			})}
		</View>
	);
}

function Developers() {
	return (
		<View state={tailwind('flex items-center')}>
			<Image source={ingSoftLogo} style={{ width: 56, height: 80, alignSelf: 'center' }} />
			<Text>Ingeniería de Software - ESPOL</Text>
			<Text style={tailwind('text-center')}>2021</Text>
		</View>
	);
}

async function dialCall(phoneNumber) {
	let command = '';
	if (Platform.OS === 'android') {
		command = `tel:${phoneNumber}`;
	} else {
		command = `telprompt:${phoneNumber}`;
	}

	try {
		await Linking.openURL(command);
		return true;
	} catch (error) {
		return false;
	}
}

async function openLink(link) {
	try {
		await Linking.openURL(link);
		return true;
	} catch (error) {
		return false;
	}
}

function getPhoneNumber(company) {
	if (!company.phones || !company.phones[0]) {
		return false;
	}
	let phone = company.phones[0];

	return `${phone.code}${phone.number}`;
}
