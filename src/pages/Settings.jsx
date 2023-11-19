import React, { useState, useEffect } from "react";
import { ImagePreview } from "styles/styledComponents";
import {
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Typography,
	Button,
	TextField,
	LinearProgress,
	Box,
	Input,
	Checkbox,
	CircularProgress,
} from "@mui/material";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { LoadingOverlay } from "components/LoadingOverlay";
import { useAuth0 } from "@auth0/auth0-react";
import {
	FlexRowContainer,
	FlexColumnContainer,
} from "components/AllHelpComponents";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export function Settings() {
	const { user } = useAuth0();

	// const user = {
	// 	nickname: "cafecafe",
	// 	picture: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
	// };
	const [loading, setLoading] = useState(true);

	const [link, setLink] = useState("");
	const [settings, setSettings] = useState([]);
	const [textToOrder, setTextToOrder] = useState("");
	const [logoImage, setLogoImage] = useState("");
	const [showCreditCardButton, setShowCreditCardButton] = useState(false);
	const [showApplePayButton, setShowApplePayButton] = useState(false);
	const [showGooglePayButton, setShowGooglePayButton] = useState(false);
	const [showOrderButton, setShowOrderButton] = useState(false);
	const [successAlert, setSuccessAlert] = useState(false);

	const getSettings = async () => {
		const restaurant_id = 2;

		try {
			const response = await axios.get(
				"https://burgerim.ru/settings/" + restaurant_id
			);

			console.log("getSettings-response.data", response.data);
			setSettings(response.data[0]);

			console.log('Запрос "getSettings" успешно выполнен');
			setLoading(false);
		} catch (error) {
			setLoading(false);

			console.error('Ошибка при выполнении запроса "getSettings":', error);
			return;
		}
	};

	useEffect(() => {
		getSettings();
	}, []);

	const handleProductImageUpload = (e) => {
		const file = e.target.files[0];
		TransformFileData(file);
	};

	const TransformFileData = (file) => {
		const reader = new FileReader();

		if (file) {
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				setLogoImage(reader.result);
			};
		} else {
			setLogoImage("");
		}
	};
	
	const handleLinkChange = (e) => {
		setLink(e.target.value);
	};
	
	const handleTextToOrder = (e) => {
		setTextToOrder(e.target.value);
	};
	
	const saveChanges = async () => {
		const dataToUpdate = {
			link: link,
			logoImage: logoImage,
			showCreditCardButton: showCreditCardButton,
			showApplePayButton: showApplePayButton,
			showGooglePayButton: showGooglePayButton,
			showOrderButton: showOrderButton,
			textToOrder: textToOrder,
		};

		const restaurant_id = 2;
		console.log("dataToUpdate", dataToUpdate);
		try {
			const response = await axios.put(
				`https://burgerim.ru/settings/${restaurant_id}`,
				dataToUpdate
			);
			console.log('Запрос "saveChanges" успешно выполнен');
			setLoading(false);

			setSuccessAlert(true);
			setTimeout(() => {
				setSuccessAlert(false);
			}, 2000);
		} catch (error) {
			setLoading(false);

			console.error('Ошибка при выполнении запроса "saveChanges":', error);
		}
	};

	useEffect(() => {
		setShowCreditCardButton(settings.showCreditCardButton || false);
		setShowApplePayButton(settings.showApplePayButton || false);
		setShowGooglePayButton(settings.showGooglePayButton || false);
		setShowOrderButton(settings.showOrderButton || false);

		setLink(settings.link || "");
		setTextToOrder(settings.textToOrder || "");
		setLogoImage(settings.logoImage || "");
	}, [settings]);

	return (
		<>
			{successAlert && (
				<Box className="notification">
					<Alert severity="success">
						<AlertTitle>Success</AlertTitle>
						The operation was a — <strong>success!</strong>
					</Alert>
				</Box>
			)}
			{/* {loading ? (
				<TableRow>
					<TableCell align="center" colSpan={11}>
						<LinearProgress />
					</TableCell>
				</TableRow>
			) : ( */}

			{loading ? <LoadingOverlay /> : null}

			<FlexColumnContainer sx={{ p: 2 }}>
				<FlexRowContainer sx={{ mt: 2 }}>
					<Typography sx={{ mr: 2 }} variant="h6">
						Link
					</Typography>
					<TextField
						sx={{}}
						value={link}
						onChange={handleLinkChange}
						label="Link"
						variant="outlined"
						fullWidth
					/>
				</FlexRowContainer>
				<FlexRowContainer sx={{ mt: 2 }}>
					<Typography sx={{ mr: 2 }} variant="h6">
						Text to Order
					</Typography>
					<TextField
						sx={{ m: "5px  " }}
						value={textToOrder}
						onChange={handleTextToOrder}
						label="textToOrder"
						variant="outlined"
						fullWidth
					/>
				</FlexRowContainer>
				<FlexRowContainer>
					<Typography sx={{ m: "5px " }} variant="h6">
						Photo in Order
					</Typography>

					<div>
						<label htmlFor="imgUpload">
							<Button
								variant="contained"
								component="span"
								startIcon={<CloudUploadIcon />}
								sx={{
									"borderRadius": 8,
									"backgroundColor": "#2196f3",
									"color": "#fff",
									"&:hover": { backgroundColor: "#1976d2" },
								}}
							>
								Upload image
							</Button>
						</label>
						<Input
							id="imgUpload"
							type="file"
							inputProps={{
								accept: "image/*",
								style: { display: "none" },
							}}
							onChange={handleProductImageUpload}
							required
						/>
					</div>

					<ImagePreview>
						{logoImage ? (
							<>
								<img src={logoImage} alt="error!" />
							</>
						) : (
							<p> Image Preview </p>
						)}
					</ImagePreview>
				</FlexRowContainer>

				<Box sx={{ border: "2px solid grey", borderRadius: "5px" }}>
					<FlexRowContainer>
						<Typography sx={{ m: "5px " }} variant="h6">
							Credit Card Button
						</Typography>
						<Checkbox
							checked={showCreditCardButton}
							onChange={(e) => setShowCreditCardButton(e.target.checked)}
						/>
					</FlexRowContainer>
					<FlexRowContainer>
						<Typography sx={{ m: "5px " }} variant="h6">
							Apple Pay Button
						</Typography>
						<Checkbox
							checked={showApplePayButton}
							onChange={(e) => setShowApplePayButton(e.target.checked)}
						/>
					</FlexRowContainer>
					<FlexRowContainer>
						<Typography sx={{ m: "5px " }} variant="h6">
							Google Pay Button
						</Typography>
						<Checkbox
							checked={showGooglePayButton}
							onChange={(e) => setShowGooglePayButton(e.target.checked)}
						/>
					</FlexRowContainer>
					<FlexRowContainer>
						<Typography sx={{ m: "5px " }} variant="h6">
							Order Button
						</Typography>
						<Checkbox
							checked={showOrderButton}
							onChange={(e) => setShowOrderButton(e.target.checked)}
						/>
					</FlexRowContainer>
				</Box>

				<Button
					sx={{ m: "5px 0px" }}
					variant="contained"
					color="primary"
					onClick={saveChanges}
				>
					save
				</Button>
			</FlexColumnContainer>
		</>
	);
}
