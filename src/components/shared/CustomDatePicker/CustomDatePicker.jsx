import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import "./CustomDatePicker.scss";

const CustomDatePicker = ({
	title = null,
	setSelectedDateError = null,
	selectedDateError = null,
	selectedDate,
	setSelectedDate,
	dark = null,
}) => {
	const today = new Date();
	const handleDateChange = (date) => {
		if (selectedDateError) {
			setSelectedDateError("");
		}
		const formattedDate = date ? format(date, "yyyy-MM-dd") : "";

		setSelectedDate(formattedDate);
	};
	return (
		<div className={`datePickerContainer ${dark ? "datePickerContainerDark" : ""}`}>
			<h3 className={`${selectedDateError ? "errorText" : ""}`}>
				{selectedDateError ? selectedDateError : title}
			</h3>
			<DatePicker
				selected={selectedDate ? new Date(selectedDate) : null}
				onChange={handleDateChange}
				className={`datePickerInput ${selectedDateError ? "inpError" : ""}`}
				calendarClassName="customCalendar"
				placeholderText="Year-Month-Day"
				dateFormat="yyyy-MM-dd"
				maxDate={today}
			/>
		</div>
	);
};

export default CustomDatePicker;
