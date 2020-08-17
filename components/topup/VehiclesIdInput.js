import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import AddIcon from '../icons/AddIcon';
import { fakeFetch, vehiclesIds } from '../../utils/mocks';
import VehicleIdItem from './VehicleIdItem';
import AddVehicleIdItemModal from './AddVehicleIdItemModal';

export default function VehiclesIdInput(props) {
  const [state, setState] = React.useState({
    items: [],
    loading: true,
    showModal: false,
  });
  React.useEffect(() => {
    fakeFetch(vehiclesIds, 1500)
      .then((ids) => setState({ items: ids, loading: false }))
      .catch((err) => setState({ items: [], loading: false }));
  }, []);

  const close = () => setState({ ...state, showModal: false });
  const open = () => setState({ ...state, showModal: true });
  const onAdd = (item) => {
    setState({ ...state, showModal: false, items: [...state.items, item] });
  };
  const onDelete = (number) => {
    setState((state) => ({
      ...state,
      items: state.items.filter((item) => item.number !== number),
    }));
  };

  return (
    <View style={tailwind('w-full items-center')}>
      <Text style={tailwind('mb-2')}>Placas de los vehiculos</Text>
      <View style={tailwind('flex flex-row')}>
        <View
          style={[
            tailwind('flex flex-row flex-wrap border-2 border-gray-600 rounded-md w-56'),
            { minHeight: 10 },
          ]}
        >
          {state.loading && <ActivityIndicator animating size="small" color="black" />}
          {!state.loading &&
            state.items.map((item) => (
              <VehicleIdItem key={item.id} {...item} onDelete={() => onDelete(item.number)} />
            ))}
        </View>
        <TouchableOpacity activeOpacity={0.8} delayPressIn={0} onPress={open}>
          <View style={tailwind('ml-4 mt-1')}>
            <AddIcon />
          </View>
        </TouchableOpacity>
      </View>
      <AddVehicleIdItemModal
        onAdd={onAdd}
        onCancel={close}
        visible={state.showModal}
        close={close}
      />
    </View>
  );
}
