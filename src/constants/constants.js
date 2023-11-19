export const pagesDashboards = [
	{ name: "Home", href: "/", pageType: "up" },
	{ name: "Profile", href: "/profile", pageType: "up" },
	{ name: "Toppings", href: "/toppings", pageType: "up" },
	{ name: "Dishes", href: "/dishes", pageType: "up" },
	{ name: "Statistics", href: "/statistics", pageType: "up" },
	{ name: "Orders", href: "/orders", pageType: "up" },
	{ name: "Settings", href: "/settings", pageType: "down" },
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
