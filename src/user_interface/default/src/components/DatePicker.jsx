import { useState } from "react"
import Datepicker from "tailwind-datepicker-react"

const options = {
	title: "Select date",
	autoHide: true,
	todayBtn: false,
	clearBtn: true,
	clearBtnText: "Clear",
	maxDate: new Date("2030-01-01"),
	minDate: new Date("1950-01-01"),
	theme: {
		background: "",
		todayBtn: "",
		clearBtn: "",
		icons: "",
		text: "",
		disabledText: "",
		input: "",
		inputIcon: "",
		selected: "",
	},
	icons: {
		// () => ReactElement | JSX.Element
		prev: () => <span className="text-sm">{"<"}</span>,
		next: () => <span className="text-sm">{">"}</span>,
	},
	datepickerClassNames: "light",
	defaultDate: new Date(),
	language: "en",
	disabledDates: [],
	weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
	inputNameProp: "date",
	inputIdProp: "date",
	inputPlaceholderProp: "Select Date",
	inputDateFormatProp: {
		day: "numeric",
		month: "long",
		year: "numeric"
	}
}

function TailwindDatePicker(props) {
	const [show, setShow] = useState(false)

	function handleChange(selectedDate) {
		console.log(selectedDate)
	}

	function handleClose(state) {
		setShow(state)
	}

	return (
		<div className="">
			<Datepicker options={options} onChange={props.onChange} show={show} setShow={handleClose} />
		</div>
	)
}

export default TailwindDatePicker;