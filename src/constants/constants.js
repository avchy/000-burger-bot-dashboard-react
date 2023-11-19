export const pagesDashboards = [
	{ name: "Home", href: "/", pageType: "up" },
	{ name: "profile", href: "/profile", pageType: "up" },
	{ name: "toppings", href: "/toppings", pageType: "up" },
	{ name: "dishes", href: "/dishes", pageType: "up" },
	{ name: "statistics", href: "/statistics", pageType: "up" },
	{ name: "orders", href: "/orders", pageType: "up" },
	{ name: "settings", href: "/settings", pageType: "down" },
];

export const initialState = [
	{
		order_id: 2,
		queryId: 0,
		comment: "",
		totalPrice: "58.00",
		optionDelivery: "on_site",
		paymentMethod: "card",
		order_date: null,
		cartItems:
			'[{"id":2,"title":"Coca","price":8,"quantity":2},{"id":1,"title":"Falafel","price":15,"description":"Falafel_description","toppings":[],"quantity":2,"selectedToppings":[]}]',
		address: "",
		user_name: "yair770",
		user_id: 386212074,
	},

	{
		order_id: 9,
		queryId: 0,
		comment: "",
		totalPrice: "123123.00",
		optionDelivery: "on_site",
		paymentMethod: "card",
		order_date: null,
		cartItems:
			'[{"id":1,"title":"Falafel","price":15,"description":"Falafel_description","toppings":[],"quantity":2,"selectedToppings":[]}]',
		address: "",
		user_name: "yair770",
		user_id: 386212074,
	},
	{
		order_id: 10,
		queryId: 0,
		comment: "",
		totalPrice: "123123.00",
		optionDelivery: "on_site",
		paymentMethod: "card",
		order_date: null,
		cartItems:
			'[{"id":1,"title":"Falafel","price":15,"description":"Falafel_description","toppings":[],"quantity":2,"selectedToppings":[]}]',
		address: "",
		user_name: "yair770",
		user_id: 386212074,
	},
];
