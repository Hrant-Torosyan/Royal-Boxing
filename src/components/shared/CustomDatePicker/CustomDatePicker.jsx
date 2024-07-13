import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import "./CustomDatePicker.scss";

const CustomDatePicker = ({ selectedDate, setSelectedDate }) => {
	const today = new Date();
	const handleDateChange = (date) => {
		const formattedDate = date ? format(date, "yyyy-MM-dd") : "";

		setSelectedDate(formattedDate);
	};
	return (
		<div className="datePickerContainer">
			<DatePicker
				selected={selectedDate ? new Date(selectedDate) : null}
				onChange={handleDateChange}
				className="datePickerInput"
				calendarClassName="customCalendar"
				placeholderText="Year-Month-Day"
				dateFormat="yyyy-MM-dd"
				maxDate={today}
			/>
		</div>
	);
};

export default CustomDatePicker;
