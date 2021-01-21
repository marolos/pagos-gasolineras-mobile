import React from 'react';
import { View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ripple from 'react-native-material-ripple';
import { connect } from 'react-redux';
import tailwind from 'tailwind-rn';
import CarIcon from '../icons/CarIcon';
import EditIcon from '../icons/EditIcon';
import EmailIcon from '../icons/EmailIcon';
import IdCardIcon from '../icons/IdCardIcon';
import MapPinIcon from '../icons/MapPinIcon';
import ProfileIcon from '../icons/ProfileIcon';
import { FULL_HIGHT, FULL_WIDTH } from '../utils/constants';
import { typefaces } from '../utils/styles';

import fondo from '../../assets/img/fondo.png';

function renderView(user) {
	return (
		<ScrollView style={tailwind('p-6 bg-white rounded-t-2xl')}>
			<View>
				<Text style={[tailwind('text-blue-800'), typefaces.pm]}>Datos Personales:</Text>
				<Item
					label="Nombres"
					value={`${user.first_name} ${user.last_name}`}
					icon={<ProfileIcon strokeWidth={1.2} />}
				/>
				<Item label="Cédula" value={user.cedula} icon={<IdCardIcon />} />
				<Item
					label="Email"
					value={user.email}
					icon={<EmailIcon strokeWidth={1} width={20} height={16} />}
				/>
				<Item
					label="Teléfono"
					value={user.phone_number}
					icon={<IdCardIcon />}
					hasValue={!!user.phone_number}
				/>
				<Item
					label="dirección"
					value={` ${user.city}, ${user.address}`}
					icon={<MapPinIcon strokeWidth={0.9} width={22} height={22} />}
					hasValue={!!user.address}
				/>
			</View>
			<View style={tailwind('mt-4')}>
				<Text style={[tailwind('text-blue-800 mb-2'), typefaces.pm]}>Vehículos:</Text>
				{user.vehicles_ids.map((v) => (
					<VehicleItem key={v.number} {...v} />
				))}
			</View>
		</ScrollView>
	);
}

function ProfileView({ user, navigation }) {
	if (!user.phone_number || !user.city) {
		navigation.push('editProfile', { navigateToOnDone: 'profileView' });
		return <></>;
	}
	return (
		<View>
			<EditButton
				onPress={() => navigation.push('editProfile', { navigateToOnDone: 'profileView' })}
			/>
			{renderView(user)}
		</View>
	);
}

function _ProfileViewFromTabMenu({ user, navigation }) {
	if (!user.phone_number || !user.city) {
		navigation.push('editProfile', { navigateToOnDone: 'profileView' });
		return <></>;
	}
	return (
		<React.Fragment>
			<View style={tailwind('absolute')}>
				<Image source={fondo} style={{ width: FULL_WIDTH, height: FULL_HIGHT }} />
			</View>
			<EditButton
				style={{ top: 120 }}
				onPress={() => navigation.navigate('editProfileFromTabMenu', { navigateToOnDone: 'back' })}
			/>
			<View style={tailwind('mt-24')}>{renderView(user, navigation)}</View>
		</React.Fragment>
	);
}

const Item = ({ label, value, icon }) => (
	<View style={tailwind('p-2')}>
		<Text style={[tailwind('text-black'), typefaces.pm]}>{label}</Text>
		<View style={tailwind('flex flex-row items-center')}>
			{icon}
			<Text style={[tailwind('text-gray-700 ml-3 mt-1'), typefaces.pm]}>{value}</Text>
		</View>
	</View>
);

const VehicleItem = ({ number, alias }) => (
	<View style={tailwind('p-2 flex flex-row items-center')}>
		<CarIcon />
		<Text style={[tailwind('ml-2'), typefaces.pm]}>{number}</Text>
		<Text style={[tailwind('ml-2 text-gray-600'), typefaces.pm]}>({alias})</Text>
	</View>
);

const EditButton = ({ onPress, style = {} }) => (
	<Ripple
		style={[
			tailwind(
				'absolute flex flex-row justify-center items-center bg-blue-100 rounded-full px-6 py-2',
			),
			{ right: 16, top: 18, zIndex: 200 },
			style,
		]}
		onPress={onPress}
		rippleColor="#4299e1"
		rippleCentered
	>
		<Text style={[tailwind('text-blue-700 mr-2 mt-1'), typefaces.pm]}>Editar</Text>
		<EditIcon width={22} height={22} stroke="#2b6cb0" />
	</Ripple>
);

export const ProfileViewFromTabMenu = connect(({ user }) => ({ user: user.data }))(
	_ProfileViewFromTabMenu,
);
export default connect(({ user }) => ({ user: user.data }))(ProfileView);
