import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import tailwind from 'tailwind-rn';
import EmainIcon from '../icons/EmainIcon';
import IdCardIcon from '../icons/IdCardIcon';
import MapPinIcon from '../icons/MapPinIcon';
import ProfileIcon from '../icons/ProfileIcon';

function ProfileView({ user }) {
	return (
		<View>
			<View>
				<Text>Datos Personales:</Text>
				<Item
					label="Nombres"
					value={`${user.first_name} ${user.last_name}`}
					icon={<ProfileIcon strokeWidth={1.2} />}
				/>
				<Item label="Cédula" value={user.cedula} icon={<IdCardIcon />} />
				<Item
					label="Email"
					value={user.email}
					icon={<EmainIcon strokeWidth={1} width={20} height={16} />}
				/>
				<Item
					label="Teléfono"
					value={user.phone}
					icon={<IdCardIcon />}
					hasValue={!!user.phone}
				/>
				<Item
					label="dirección"
					value={` ${user.city}, ${user.address}`}
					icon={<MapPinIcon strokeWidth={0.9} width={22} height={22} />}
					hasValue={!!user.address}
				/>
			</View>
		</View>
	);
}

const Item = ({ label, value, icon, hasValue = true }) => (
	<View style={tailwind('p-2')}>
		<Text>{label}</Text>
		<View style={tailwind('flex flex-row items-center')}>
			{icon}
			<Text>{value}</Text>
		</View>
	</View>
);

export default connect(({ user }) => ({ user: user.data }))(ProfileView);
