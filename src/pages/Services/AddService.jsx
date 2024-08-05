import { useNavigate, useParams } from "react-router-dom";
import Title from "../../components/shared/Title/Title";
import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";
import { useEffect, useState } from "react";
import "./Services.scss";
import ImagesUploader from "../../components/shared/Cards/ImagesUploader/ImagesUploader";
import { useDispatch, useSelector } from "react-redux";
import { createService, createServiceSucceeded } from "../../redux/slices/servicesSlice";
import { getServicesCategory } from "../../util/getServicesCategory";
import { openSucceededModal } from "../../redux/slices/modalSlice";
const categories = getServicesCategory();

const AddService = () => {
	const { status } = useSelector((state) => state.services.createService);

	const dispatch = useDispatch();
	const { category } = useParams();
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [nameError, setNameError] = useState("");

	const [description, setDescription] = useState("");
	const [descriptionError, setDescriptionError] = useState("");
	const [images, setImages] = useState([]);
	const [imagesError, setImagesError] = useState(null);

	useEffect(() => {
		if (!categories.find((item) => item.value === category)) {
			navigate("/services");
		}
	}, [navigate, category]);

	const handleAddService = (e) => {
		e.preventDefault();
		if (images.length === 0) {
			setImagesError("Choose a photo");
			return;
		}
		if (!name.trim()) {
			setNameError("Fill in this field");
			return;
		}
		if (!description.trim()) {
			setDescriptionError("Fill in this field");
			return;
		}

		dispatch(
			createService({
				name: name,
				description: description,
				services_type: category,
				img_url: "aaaa",
			})
		);
	};

	useEffect(() => {
		if (status === "succeeded") {
			dispatch(createServiceSucceeded());
			dispatch(openSucceededModal());
			setTimeout(() => {
				navigate("/services");
			}, 5000);
		}
	}, [dispatch, status, navigate]);

	return (
		<div className="addService">
			<Title back={() => navigate("/services")} title={`Add ${category}`} />
			<form onSubmit={handleAddService}>
				<ImagesUploader
					setImagesError={setImagesError}
					imagesError={imagesError}
					images={images}
					setImages={setImages}
				/>
				<div className="inputContainer">
					<Input
						inpVal={name}
						setInpVal={setName}
						type={"text"}
						title={"Name"}
						placeholder={"Name"}
						error={nameError}
						setError={setNameError}
						dark={true}
					/>
					<Input
						inpVal={description}
						setInpVal={setDescription}
						type={"textarea"}
						inpType={"textarea"}
						title={"Description"}
						placeholder={"Description"}
						error={descriptionError}
						setError={setDescriptionError}
						dark={true}
					/>
					<div className="buttonList">
						<Button
							href={"/services"}
							disabled={false}
							type={"button"}
							styleBtn={"LIGHT"}
							title={"Cancel"}
						/>
						<Button
							title={"Save"}
							disabled={status === "pending" && true}
							styleBtn={"DARK"}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddService;
