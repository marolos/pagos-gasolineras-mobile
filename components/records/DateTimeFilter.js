import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tailwind from 'tailwind-rn';
import { formatISODate } from '../utils/dateUtils';
import fechaIcon from '../../assets/img/fecha.png'
import horaIcon from '../../assets/img/hora.png'
import { info_text } from '../utils/colors'

class DateTimeFilter extends React.Component {
	constructor(props) {
		super(props);
		const now = new Date();
		this.state = {
			visible: false,
			timeVisible: false,
			paramDate: '',
			paramTime: '',
			toDate: this.props.toDatetime || now,
			fromDate: this.props.fromDatetime || now,
			toTime: this.props.toDatetime || now,
			fromTime: this.props.fromDatetime || now,
			selectToDate: this.props.toDatetime != null,
			selectFromDate: this.props.fromDatetime != null,
			selectToTime: this.props.toDatetime != null,
			selectFromTime: this.props.fromDatetime != null,
		};
	}

	isValid = () => {
		const selectedRangeDate = this.state.selectFromDate && this.state.selectToDate;
		const selectedRangeTime = this.state.selectFromTime && this.state.selectToTime;
		if (selectedRangeDate && selectedRangeTime) {
			const fromDatetime = new Date(
				this.state.fromDate.getFullYear(),
				this.state.fromDate.getMonth(),
				this.state.fromDate.getDate(),
				this.state.fromTime.getHours(),
				this.state.fromTime.getMinutes(),
			);
			const toDatetime = new Date(
				this.state.toDate.getFullYear(),
				this.state.toDate.getMonth(),
				this.state.toDate.getDate(),
				this.state.toTime.getHours(),
				this.state.toTime.getMinutes(),
			);

			if (fromDatetime > toDatetime) {
				this.props.onInvalidInput('Rango de fechas incorrecto');
			} else {
				this.props.onValidInput(fromDatetime, toDatetime);
			}
		} else {
			this.props.onClear();
		}
	};

	showDatePicker = (param) => {
		this.setState({ paramDate: param, visible: true });
	};

	hideDatePicker = () => {
		this.setState({ visible: false });
	};

	handleConfirm = (date) => {
		if (this.state.paramDate !== '') {
			if (this.state.paramDate === 'toDate') {
				this.setState({ toDate: date, visible: false, selectToDate: true });
				this.isValid();
			} else if (this.state.paramDate === 'fromDate') {
				this.setState({ fromDate: date, visible: false, selectFromDate: true });
				this.isValid();
			}
		} else {
			this.setState({ visible: false });
			this.isValid();
		}
	};

	showTimePicker = (param) => {
		this.setState({ paramTime: param, timeVisible: true });
	};

	hideTimePicker = () => {
		this.setState({ timeVisible: false });
	};

	handleConfirmTime = (time) => {
		if (this.state.paramTime !== '') {
			if (this.state.paramTime === 'toTime') {
				this.setState({ toTime: time, timeVisible: false, selectToTime: true });
				this.isValid();
			} else if (this.state.paramTime === 'fromTime') {
				this.setState({ fromTime: time, timeVisible: false, selectFromTime: true });
				this.isValid();
			}
		} else {
			this.setState({ timeVisible: false });
			this.isValid();
		}
	};

	render() {
		return (
			<View style={tailwind('mt-4')}>
				<View>
					<DateTimePickerModal
						isVisible={this.state.visible}
						mode="date"
						date={
							this.state.paramDate !== ''
								? this.state.paramDate === 'toDate'
									? this.state.toDate
									: this.state.paramDate === 'fromDate'
									? this.state.fromDate
									: this.props.date
								: this.props.date
						}
						onConfirm={this.handleConfirm}
						onCancel={this.hideDatePicker}
					/>
					<DateTimePickerModal
						isVisible={this.state.timeVisible}
						mode="time"
						date={
							this.state.paramTime !== ''
								? this.state.paramTime === 'toTime'
									? this.state.toTime
									: this.state.paramTime === 'fromTime'
									? this.state.fromTime
									: this.props.time
								: this.props.time
						}
						onConfirm={this.handleConfirmTime}
						onCancel={this.hideTimePicker}
					/>
				</View>
				<View>
					<View style={tailwind('flex flex-row items-center justify-between')}>
						<Text style={{ color: info_text }} >Desde:</Text>
						<View style={tailwind('mx-2')} />
						<DateTimeField
							showDateTimePicker={this.showDatePicker}
							param="fromDate"
							icon={<Image source={fechaIcon} style={{ width: 15, height: 16 }} />}
							content={
								this.state.selectFromDate
									? ' ' + formatISODate(this.state.fromDate, 'dd/MM/yyyy')
									: ''
							}
						/>
						<View style={tailwind('mx-1')} />
						<DateTimeField
							showDateTimePicker={this.showTimePicker}
							param="fromTime"
							icon={<Image source={horaIcon} style={{ width: 16, height: 16 }} />}
							content={
								this.state.selectFromTime
									? ' ' + formatISODate(this.state.fromTime, 'HH:mm')
									: ''
							}
						/>
					</View>
					<View style={tailwind('my-1')} />
					<View style={tailwind('flex flex-row items-center justify-between')}>
						<Text style={{ color: info_text }}>Hasta:</Text>
						<View style={tailwind('mx-2')} />
						<DateTimeField
							showDateTimePicker={this.showDatePicker}
							param="toDate"
							icon={<Image source={fechaIcon} style={{ width: 15, height: 16 }} />}
							content={
								this.state.selectToDate
									? ' ' + formatISODate(this.state.toDate, 'dd/MM/yyyy')
									: ''
							}
						/>
						<View style={tailwind('mx-1')} />
						<DateTimeField
							showDateTimePicker={this.showTimePicker}
							param="toTime"
							icon={<Image source={horaIcon} style={{ width: 16, height: 16 }} />}
							content={
								this.state.selectToTime
									? ' ' + formatISODate(this.state.toTime, 'HH:mm')
									: ''
							}
						/>
					</View>
				</View>
			</View>
		);
	}
}

function DateTimeField({ showDateTimePicker, param, icon, content }) {
	return (
		<View style={tailwind('flex rounded-3xl py-1 px-1 w-32 border border-black')}>
			<TouchableOpacity onPress={() => showDateTimePicker(param)}>
				<View style={tailwind('flex flex-row items-center ml-1')}>
					{icon}
					<Text style={tailwind('text-gray-600 my-1 mr-1')}>{content}</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}

export default DateTimeFilter;
