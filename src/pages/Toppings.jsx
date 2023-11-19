import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { FlexRowContainer, FlexColumnContainer } from "components/AllHelpComponents";

import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export function Toppings() {
	const { user } = useAuth0();
	// const user = {
	// 	nickname: "cafecafe",
	// 	picture: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
	// };
	const [toppingsList, setToppingsList] = useState([]);
	const [newTopping, setNewTopping] = useState({
		title: "",
		price: "",
		image: "",
	});

	const getToppings = async () => {
		const restaurant_id = 2;
		try {
			const response = await axios.get("https://burgerim.ru/toppings/" + restaurant_id);
			setToppingsList(response.data);
		} catch (error) {
			console.error('Ошибка при выполнении запроса "getToppings":', error);
		}
	};

	const addTopping = async () => {
		const restaurant_id = 2;
		console.log("newTopping", newTopping);
		const data = {
			...newTopping,
			restaurant_id: restaurant_id,
		};
		try {
			await axios.post("https://burgerim.ru/toppings/" + restaurant_id, data);
			console.log("Новый топпинг успешно добавлен");
			setNewTopping({ title: "", price: "", image: "" }); // Очищаем поля после добавления
			getToppings(); // Обновляем список топпингов после успешного добавления
		} catch (error) {
			console.error("Ошибка при добавлении нового топпинга:", error);
		}
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewTopping({
			...newTopping,
			[name]: value,
		});
	};

	useEffect(() => {
		getToppings();
	}, [user.nickname]);

	return (
		<>
			{toppingsList.length === 0 && (
				<Box sx={{ width: "100%" }}>
					<LinearProgress />
				</Box>
			)}
			{toppingsList.length > 0 && (
				<Paper>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell sx={{ fontSize: "1.5rem", fontWeight: 800 }}>Title</TableCell>
								<TableCell sx={{ fontSize: "1.5rem", fontWeight: 800 }}>Price</TableCell>
								<TableCell sx={{ fontSize: "1.5rem", fontWeight: 800 }}>Image</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{toppingsList.map((topping, index) => (
								<TableRow key={index}>
									<TableCell>{topping.title}</TableCell>
									<TableCell>{topping.price}</TableCell>
									<TableCell>{topping.image}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Paper>
			)}

			{/* Форма для добавления нового топпинга */}
			<FlexColumnContainer style={{ marginTop: "20px", padding: "20px" }}>
				<Typography variant="h6">Add New Topping</Typography>
				<TextField
					label="Title"
					name="title"
					value={newTopping.title}
					onChange={handleInputChange}
					sx={{ m: "10px" }}
				/>
				<TextField
					label="Price"
					name="price"
					value={newTopping.price}
					onChange={handleInputChange}
					sx={{ m: "10px" }}
				/>
				<TextField
					label="Image URL"
					name="image"
					value={newTopping.image}
					onChange={handleInputChange}
					sx={{ m: "10px" }}
				/>
				<Button variant="contained" color="primary" onClick={addTopping}>
					Add Topping
				</Button>
			</FlexColumnContainer>
		</>
	);
}
