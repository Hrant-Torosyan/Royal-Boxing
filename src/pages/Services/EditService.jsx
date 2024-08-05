import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../../components/shared/Title/Title";
import ImagesUploader from "../../components/shared/Cards/ImagesUploader/ImagesUploader";
import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";
import "./Services.scss";
import AddSession from "./AddSession";
import { useDispatch, useSelector } from "react-redux";
import { updateService, updateServiceSucceeded } from "../../redux/slices/servicesSlice";
import { openSucceededModal } from "../../redux/slices/modalSlice";

const EditService = () => {
	const services = useSelector((state) => state.services);

	const dispatch = useDispatch();
	const { category } = useParams();
	const navigate = useNavigate();

	const serviceEdit = services.allServices.find((service) => service.id === Number(category));

	const [name, setName] = useState("");
	const [nameError, setNameError] = useState("");

	const [description, setDescription] = useState("");
	const [descriptionError, setDescriptionError] = useState("");
	const [images, setImages] = useState([]);
	const [imagesError, setImagesError] = useState(null);

	useEffect(() => {
		if (serviceEdit) {
			setName(serviceEdit.name);
			setDescription(serviceEdit.description);
		} else {
			navigate("/services");
		}
	}, [navigate, services, serviceEdit]);

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
			updateService({
				id: category,
				name: name,
				description: description,
				img_url: "update",
				sessions: serviceEdit?.sessions.filter((item) => !item.id) || [],
			})
		);
	};

	useEffect(() => {
		if (services.updateService.status === "succeeded") {
			dispatch(updateServiceSucceeded());
			dispatch(openSucceededModal());
			setTimeout(() => {
				navigate("/services");
			}, 5000);
		}
	}, [services.updateService, dispatch, navigate]);

	return (
		<div className="editService">
			<Title back={() => navigate("/services")} title={serviceEdit.name} />
			<form onSubmit={handleAddService}>
				<ImagesUploader
					setImagesError={setImagesError}
					imagesError={imagesError}
					images={images}
					setImages={setImages}
				/>
				<div className="inputContainer">
					<div className="inputContainerItem">
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
						<div className="buttonList">
							<Button
								onClick={() => {
									console.log("DEL");
								}}
								styleBtn="DEL"
								disabled={false}
								type={"button"}
								title={"Delete"}
							/>
							<Button styleBtn="DARK" title={"Edit"} disabled={false} />
						</div>
					</div>
					<div className="inputContainerText">
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
					</div>
				</div>
			</form>
			<div className="line"></div>
			<AddSession serviceSessions={serviceEdit?.sessions || []} />
		</div>
	);
};

export default EditService;
