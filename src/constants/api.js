import axios from "axios"

const developmentURL = "http://localhost:5005"
const productionURL = "https://burgerim.ru"

// export const baseURL =
//   process.env.NODE_ENV === "development" ? developmentURL : productionURL;

export const baseURL =
	process.env.REACT_APP_STAGE === "local" ? developmentURL : productionURL

console.log("process.env.REACT_APP_STAGE", process.env.REACT_APP_STAGE)
console.log("baseURL", baseURL)

// api.js

// export const getExtras = async (restaurantId) => {
//   try {
//     const response = await axios.get(`${baseURL}/extras/${restaurantId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Ошибка при выполнении запроса "getExtras":', error);
//     throw error;
//   }
// };

export const getExtras = async (restaurant_id) => {
	// const restaurant_id = 2
	try {
		const response = await axios.get(`${baseURL}/extras/${restaurant_id}`)
		// setExtrasList(response.data)
		console.log("extrasList", response.data)
		return response.data
	} catch (error) {
		console.error('Ошибка при выполнении запроса "getExtras":', error)
	}
}
