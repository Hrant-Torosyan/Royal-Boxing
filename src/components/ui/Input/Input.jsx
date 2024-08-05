import { useState } from "react";
import style from "./Input.module.scss";

const _countryCode = [
	{
		imgUrl: "UA",
		phoneCode: "380",
	},
	{
		imgUrl: "AE",
		phoneCode: "971",
	},
	{
		imgUrl: "AF",
		phoneCode: "93",
	},
	{
		imgUrl: "AL",
		phoneCode: "355",
	},
	{
		imgUrl: "DZ",
		phoneCode: "213",
	},
	{
		imgUrl: "AD",
		phoneCode: "376",
	},
	{
		imgUrl: "AO",
		phoneCode: "244",
	},
	{
		imgUrl: "AR",
		phoneCode: "54",
	},
	{
		imgUrl: "AM",
		phoneCode: "374",
	},
	{
		imgUrl: "AU",
		phoneCode: "61",
	},
	{
		imgUrl: "AT",
		phoneCode: "43",
	},
	{
		imgUrl: "AZ",
		phoneCode: "994",
	},
	{
		imgUrl: "BS",
		phoneCode: "1-242",
	},
	{
		imgUrl: "BH",
		phoneCode: "973",
	},
	{
		imgUrl: "BD",
		phoneCode: "880",
	},
	{
		imgUrl: "BB",
		phoneCode: "1-246",
	},
	{
		imgUrl: "BY",
		phoneCode: "375",
	},
	{
		imgUrl: "BE",
		phoneCode: "32",
	},
	{
		imgUrl: "BZ",
		phoneCode: "501",
	},
	{
		imgUrl: "BJ",
		phoneCode: "229",
	},
	{
		imgUrl: "BT",
		phoneCode: "975",
	},
	{
		imgUrl: "BO",
		phoneCode: "591",
	},
	{
		imgUrl: "BA",
		phoneCode: "387",
	},
	{
		imgUrl: "BW",
		phoneCode: "267",
	},
	{
		imgUrl: "BR",
		phoneCode: "55",
	},
	{
		imgUrl: "BN",
		phoneCode: "673",
	},
	{
		imgUrl: "BG",
		phoneCode: "359",
	},
	{
		imgUrl: "BF",
		phoneCode: "226",
	},
	{
		imgUrl: "BI",
		phoneCode: "257",
	},
	{
		imgUrl: "KH",
		phoneCode: "855",
	},
	{
		imgUrl: "CM",
		phoneCode: "237",
	},
	{
		imgUrl: "CA",
		phoneCode: "1",
	},
	{
		imgUrl: "CV",
		phoneCode: "238",
	},
	{
		imgUrl: "CF",
		phoneCode: "236",
	},
	{
		imgUrl: "TD",
		phoneCode: "235",
	},
	{
		imgUrl: "CL",
		phoneCode: "56",
	},
	{
		imgUrl: "CN",
		phoneCode: "86",
	},
	{
		imgUrl: "CO",
		phoneCode: "57",
	},
	{
		imgUrl: "KM",
		phoneCode: "269",
	},
	{
		imgUrl: "CG",
		phoneCode: "242",
	},
	{
		imgUrl: "CD",
		phoneCode: "243",
	},
	{
		imgUrl: "CR",
		phoneCode: "506",
	},
	{
		imgUrl: "HR",
		phoneCode: "385",
	},
	{
		imgUrl: "CU",
		phoneCode: "53",
	},
	{
		imgUrl: "CY",
		phoneCode: "357",
	},
	{
		imgUrl: "CZ",
		phoneCode: "420",
	},
	{
		imgUrl: "DK",
		phoneCode: "45",
	},
	{
		imgUrl: "DJ",
		phoneCode: "253",
	},
	{
		imgUrl: "DM",
		phoneCode: "1-767",
	},
	{
		imgUrl: "DO",
		phoneCode: "1-809",
	},
	{
		imgUrl: "EC",
		phoneCode: "593",
	},
	{
		imgUrl: "EG",
		phoneCode: "20",
	},
	{
		imgUrl: "SV",
		phoneCode: "503",
	},
	{
		imgUrl: "GQ",
		phoneCode: "240",
	},
	{
		imgUrl: "ER",
		phoneCode: "291",
	},
	{
		imgUrl: "EE",
		phoneCode: "372",
	},
	{
		imgUrl: "SZ",
		phoneCode: "268",
	},
	{
		imgUrl: "ET",
		phoneCode: "251",
	},
	{
		imgUrl: "FJ",
		phoneCode: "679",
	},
	{
		imgUrl: "FI",
		phoneCode: "358",
	},
	{
		imgUrl: "FR",
		phoneCode: "33",
	},
	{
		imgUrl: "GA",
		phoneCode: "241",
	},
	{
		imgUrl: "GM",
		phoneCode: "220",
	},
	{
		imgUrl: "GE",
		phoneCode: "995",
	},
	{
		imgUrl: "DE",
		phoneCode: "49",
	},
	{
		imgUrl: "GH",
		phoneCode: "233",
	},
	{
		imgUrl: "GR",
		phoneCode: "30",
	},
	{
		imgUrl: "GD",
		phoneCode: "1-473",
	},
	{
		imgUrl: "GT",
		phoneCode: "502",
	},
	{
		imgUrl: "GN",
		phoneCode: "224",
	},
	{
		imgUrl: "GW",
		phoneCode: "245",
	},
	{
		imgUrl: "GY",
		phoneCode: "592",
	},
	{
		imgUrl: "HT",
		phoneCode: "509",
	},
	{
		imgUrl: "HN",
		phoneCode: "504",
	},
	{
		imgUrl: "HU",
		phoneCode: "36",
	},
	{
		imgUrl: "IS",
		phoneCode: "354",
	},
	{
		imgUrl: "IN",
		phoneCode: "91",
	},
	{
		imgUrl: "ID",
		phoneCode: "62",
	},
	{
		imgUrl: "IR",
		phoneCode: "98",
	},
	{
		imgUrl: "IQ",
		phoneCode: "964",
	},
	{
		imgUrl: "IE",
		phoneCode: "353",
	},
	{
		imgUrl: "IL",
		phoneCode: "972",
	},
	{
		imgUrl: "IT",
		phoneCode: "39",
	},
	{
		imgUrl: "JM",
		phoneCode: "1-876",
	},
	{
		imgUrl: "JP",
		phoneCode: "81",
	},
	{
		imgUrl: "JO",
		phoneCode: "962",
	},
	{
		imgUrl: "KZ",
		phoneCode: "7",
	},
	{
		imgUrl: "KE",
		phoneCode: "254",
	},
	{
		imgUrl: "KI",
		phoneCode: "686",
	},
	{
		imgUrl: "KP",
		phoneCode: "850",
	},
	{
		imgUrl: "KR",
		phoneCode: "82",
	},
	{
		imgUrl: "KW",
		phoneCode: "965",
	},
	{
		imgUrl: "KG",
		phoneCode: "996",
	},
	{
		imgUrl: "LA",
		phoneCode: "856",
	},
	{
		imgUrl: "LV",
		phoneCode: "371",
	},
	{
		imgUrl: "LB",
		phoneCode: "961",
	},
	{
		imgUrl: "LS",
		phoneCode: "266",
	},
	{
		imgUrl: "LR",
		phoneCode: "231",
	},
	{
		imgUrl: "LY",
		phoneCode: "218",
	},
	{
		imgUrl: "LI",
		phoneCode: "423",
	},
	{
		imgUrl: "LT",
		phoneCode: "370",
	},
	{
		imgUrl: "LU",
		phoneCode: "352",
	},
	{
		imgUrl: "MG",
		phoneCode: "261",
	},
	{
		imgUrl: "MW",
		phoneCode: "265",
	},
	{
		imgUrl: "MY",
		phoneCode: "60",
	},
	{
		imgUrl: "MV",
		phoneCode: "960",
	},
	{
		imgUrl: "ML",
		phoneCode: "223",
	},
	{
		imgUrl: "MT",
		phoneCode: "356",
	},
	{
		imgUrl: "MH",
		phoneCode: "692",
	},
	{
		imgUrl: "MR",
		phoneCode: "222",
	},
	{
		imgUrl: "MU",
		phoneCode: "230",
	},
	{
		imgUrl: "MX",
		phoneCode: "52",
	},
	{
		imgUrl: "FM",
		phoneCode: "691",
	},
	{
		imgUrl: "MD",
		phoneCode: "373",
	},
	{
		imgUrl: "MC",
		phoneCode: "377",
	},
	{
		imgUrl: "MN",
		phoneCode: "976",
	},
	{
		imgUrl: "ME",
		phoneCode: "382",
	},
	{
		imgUrl: "MA",
		phoneCode: "212",
	},
	{
		imgUrl: "MZ",
		phoneCode: "258",
	},
	{
		imgUrl: "MM",
		phoneCode: "95",
	},
	{
		imgUrl: "NA",
		phoneCode: "264",
	},
	{
		imgUrl: "NR",
		phoneCode: "674",
	},
	{
		imgUrl: "NP",
		phoneCode: "977",
	},
	{
		imgUrl: "NL",
		phoneCode: "31",
	},
	{
		imgUrl: "NZ",
		phoneCode: "64",
	},
	{
		imgUrl: "NI",
		phoneCode: "505",
	},
	{
		imgUrl: "NE",
		phoneCode: "227",
	},
	{
		imgUrl: "NG",
		phoneCode: "234",
	},
	{
		imgUrl: "MK",
		phoneCode: "389",
	},
	{
		imgUrl: "NO",
		phoneCode: "47",
	},
	{
		imgUrl: "OM",
		phoneCode: "968",
	},
	{
		imgUrl: "PK",
		phoneCode: "92",
	},
	{
		imgUrl: "PW",
		phoneCode: "680",
	},
	{
		imgUrl: "PS",
		phoneCode: "970",
	},
	{
		imgUrl: "PA",
		phoneCode: "507",
	},
	{
		imgUrl: "PG",
		phoneCode: "675",
	},
	{
		imgUrl: "PY",
		phoneCode: "595",
	},
	{
		imgUrl: "PE",
		phoneCode: "51",
	},
	{
		imgUrl: "PH",
		phoneCode: "63",
	},
	{
		imgUrl: "PL",
		phoneCode: "48",
	},
	{
		imgUrl: "PT",
		phoneCode: "351",
	},
	{
		imgUrl: "QA",
		phoneCode: "974",
	},
	{
		imgUrl: "RO",
		phoneCode: "40",
	},
	{
		imgUrl: "RU",
		phoneCode: "7",
	},
	{
		imgUrl: "RW",
		phoneCode: "250",
	},
];
const Input = ({
	disabled = false,
	inpVal,
	setInpVal,
	type,
	title = null,
	placeholder,
	inpType = null,
	error,
	setError,
	dark = null,
}) => {
	const [eye, setEye] = useState(true);
	const [select, setSelect] = useState(false);
	const [selectedCode, setSelectedCode] = useState(_countryCode[0]);

	const handleChange = (e) => {
		setError(null);
		if (disabled) {
			return;
		}

		if (type === "number" && !/^\d*$/.test(e.target.value)) {
			return;
		}

		if (inpType === "phone") {
			if (e.target.value === "") {
				setInpVal("");
			} else {
				setInpVal(`${selectedCode.phoneCode}${e.target.value}`);
			}
			return;
		}
		setInpVal(e.target.value);
	};

	return (
		<div
			className={`${select ? style.openSelectAnimation : style.closeSelectAnimation} ${
				dark ? style.dark : ""
			} ${style.inputStyle}`}
		>
			<h3
				className={
					inpType === "resetPass"
						? error === "Password doesn't match" || error === "Fill in this field"
							? style.errorText
							: ""
						: error && error !== "Password doesn't match"
						? style.errorText
						: ""
				}
			>
				{inpType === "resetPass"
					? error === "Password doesn't match" || error === "Fill in this field"
						? error
						: ""
					: error && error !== "Password doesn't match"
					? error
					: title}
			</h3>

			{inpType === "textarea" ? (
				<div className={style.textareaBox}>
					<textarea
						className={error ? style.textareaError : ""}
						disabled={disabled}
						value={inpVal}
						placeholder={placeholder}
						type={type}
						onChange={handleChange}
						autoComplete="off"
						spellCheck="false"
						aria-autocomplete="none"
					></textarea>
				</div>
			) : (
				<div className={style.inputBox}>
					<input
						className={
							inpType === "resetPass"
								? error === "Password doesn't match" || error === "Fill in this field"
									? style.inpError
									: ""
								: error && error !== "Password doesn't match"
								? style.inpError
								: ""
						}
						value={
							inpType === "phone"
								? inpVal.startsWith(selectedCode.phoneCode.toString())
									? inpVal.substring(selectedCode.phoneCode.length)
									: inpVal
								: inpVal
						}
						disabled={disabled}
						placeholder={placeholder}
						type={eye ? type : "text"}
						onChange={handleChange}
						autoComplete="off"
						spellCheck="false"
						aria-autocomplete="none"
					/>
					{type === "password" && (
						<>
							<div onClick={() => setEye(!eye)} className={style.eye}>
								{eye ? (
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M15.9202 12.7988C15.9725 12.5407 16 12.2736 16 12C16 9.79086 14.2091 8 12 8C11.7264 8 11.4593 8.02746 11.2012 8.07977L12.3421 9.22069C13.615 9.37575 14.6243 10.385 14.7793 11.6579L15.9202 12.7988ZM9.54012 10.6614C9.32325 11.059 9.2 11.5151 9.2 12C9.2 13.5464 10.4536 14.8 12 14.8C12.4849 14.8 12.941 14.6768 13.3386 14.4599L14.212 15.3332C13.5784 15.7545 12.8179 16 12 16C9.79086 16 8 14.2091 8 12C8 11.1821 8.24547 10.4216 8.66676 9.78799L9.54012 10.6614Z"
											fill="#222222"
										/>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M15.9202 12.7988C15.9725 12.5407 16 12.2736 16 12C16 9.79086 14.2091 8 12 8C11.7264 8 11.4593 8.02746 11.2012 8.07977L12.3421 9.22069C13.615 9.37575 14.6243 10.385 14.7793 11.6579L15.9202 12.7988ZM9.54012 10.6614C9.32325 11.059 9.2 11.5151 9.2 12C9.2 13.5464 10.4536 14.8 12 14.8C12.4849 14.8 12.941 14.6768 13.3386 14.4599L14.212 15.3332C13.5784 15.7545 12.8179 16 12 16C9.79086 16 8 14.2091 8 12C8 11.1821 8.24547 10.4216 8.66676 9.78799L9.54012 10.6614Z"
											fill="#222222"
										/>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M16.2261 17.3486L15.3447 16.4673C14.2987 17.0324 13.1674 17.4004 11.9992 17.4004C10.3566 17.4004 8.78693 16.6728 7.42471 15.6928C6.06722 14.7161 4.96643 13.525 4.27428 12.6846C4.0692 12.4357 3.95821 12.2984 3.88974 12.1837C3.83667 12.0947 3.82891 12.0512 3.82891 12.0004C3.82891 11.9496 3.83667 11.9061 3.88974 11.8171C3.95821 11.7023 4.0692 11.5651 4.27428 11.3161C4.94277 10.5045 5.99243 9.36571 7.28638 8.40892L6.42918 7.55172C5.09435 8.56423 4.02672 9.72921 3.34802 10.5532L3.28449 10.63C2.95887 11.0229 2.62891 11.421 2.62891 12.0004C2.62891 12.5798 2.95887 12.9779 3.28449 13.3707L3.34802 13.4476C4.07596 14.3314 5.25132 15.6074 6.72389 16.6668C8.19173 17.7229 10.0061 18.6004 11.9992 18.6004C13.541 18.6004 14.9759 18.0753 16.2261 17.3486ZM9.11219 5.99209C10.0132 5.62851 10.983 5.40039 11.9992 5.40039C13.9923 5.40039 15.8066 6.27789 17.2745 7.33393C18.747 8.39339 19.9224 9.66942 20.6503 10.5532L20.7139 10.63C21.0395 11.0229 21.3695 11.421 21.3695 12.0004C21.3695 12.5798 21.0395 12.9779 20.7139 13.3707L20.6503 13.4476C20.1686 14.0324 19.491 14.789 18.661 15.5409L17.8114 14.6913C18.6039 13.9785 19.257 13.2517 19.7241 12.6846C19.9292 12.4357 20.0402 12.2984 20.1086 12.1837C20.1617 12.0947 20.1695 12.0512 20.1695 12.0004C20.1695 11.9496 20.1617 11.9061 20.1086 11.8171C20.0402 11.7023 19.9292 11.5651 19.7241 11.3161C19.0319 10.4758 17.9311 9.28468 16.5737 8.30802C15.2114 7.32796 13.6418 6.60039 11.9992 6.60039C11.3336 6.60039 10.68 6.71985 10.0473 6.92717L9.11219 5.99209Z"
											fill="#222222"
										/>
										<path d="M5 2L21 18" stroke="#222222" strokeWidth="1.2" />
									</svg>
								) : (
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<circle cx="12" cy="12" r="3.4" stroke="#222222" strokeWidth="1.2" />
										<path
											d="M20.188 10.9343C20.5762 11.4056 20.7703 11.6412 20.7703 12C20.7703 12.3588 20.5762 12.5944 20.188 13.0657C18.7679 14.7899 15.6357 18 12 18C8.36427 18 5.23206 14.7899 3.81197 13.0657C3.42381 12.5944 3.22973 12.3588 3.22973 12C3.22973 11.6412 3.42381 11.4056 3.81197 10.9343C5.23206 9.21014 8.36427 6 12 6C15.6357 6 18.7679 9.21014 20.188 10.9343Z"
											stroke="#222222"
											strokeWidth="1.2"
										/>
									</svg>
								)}
							</div>
							<div className={style.passIcon}>
								<svg
									width="24"
									height="25"
									viewBox="0 0 24 25"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M16.4874 18.2947L12.5812 21.0848C12.2335 21.3332 11.7665 21.3332 11.4188 21.0848L7.51257 18.2947C5.93579 17.1684 5 15.35 5 13.4123V9.65C5 9.56716 5.06716 9.5 5.15 9.5H18.85C18.9328 9.5 19 9.56716 19 9.65V13.4123C19 15.35 18.0642 17.1684 16.4874 18.2947Z"
										fill="#222222"
										fillOpacity="0.8"
									/>
									<path
										d="M15.5453 5.0194L18.3939 6.24025C18.7616 6.39783 19 6.75937 19 7.1594V8.35C19 8.43284 18.9328 8.5 18.85 8.5H5.15C5.06716 8.5 5 8.43284 5 8.35V7.1594C5 6.75937 5.2384 6.39783 5.60608 6.24025L8.45473 5.0194C10.7187 4.04914 13.2813 4.04914 15.5453 5.0194Z"
										fill="#222222"
										fillOpacity="0.8"
									/>
								</svg>
							</div>
						</>
					)}

					{inpType === "phone" && (
						<div onClick={() => setSelect(!select)} className={style.county}>
							<div className={style.countyBlock}>
								<img
									src={`https://flagsapi.com/${selectedCode.imgUrl}/flat/64.png`}
									alt={selectedCode.imgUrl}
								/>

								<div className={style.angle}>
									<svg
										width="6"
										height="5"
										viewBox="0 0 6 5"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M2.13398 4.5C2.51888 5.16667 3.48113 5.16667 3.86603 4.5L5.59808 1.5C5.98298 0.833333 5.50185 0 4.73205 0H1.26795C0.498148 0 0.0170237 0.833333 0.401924 1.5L2.13398 4.5Z"
											fill="#222222"
										/>
									</svg>
								</div>
							</div>
							<div className={`${style.countyMenu} scroll`}>
								{_countryCode.map((item, key) => (
									<div
										onClick={() => {
											if (selectedCode.phoneCode === inpVal) {
												setInpVal("");
												return;
											}
											if (inpVal.startsWith(selectedCode.phoneCode.toString())) {
												setInpVal(
													`${item.phoneCode}${inpVal.substring(
														selectedCode.phoneCode.length
													)}`
												);
											}
											setSelectedCode(item);
										}}
										key={key}
										className={style.countyMenuItem}
									>
										<div className={style.countyMenuInfo}>
											<img
												src={`https://flagsapi.com/${item.imgUrl}/flat/64.png`}
												alt={selectedCode.imgUrl}
											/>
											<p>+{item.phoneCode}</p>
										</div>

										<div className={style.line}></div>
									</div>
								))}
							</div>
							<p>+{selectedCode.phoneCode}</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Input;
