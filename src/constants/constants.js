import { Orders } from "pages/Orders";
import { Settings } from "pages/Settings";
import { Home } from "pages/Home";
import { Profile } from "pages/Profile";
import { Dishes } from "pages/Dishes";
import { Toppings } from "pages/Toppings";
import { Extras } from "pages/Extras";
import { Types } from "pages/Types";
import { Groups } from "pages/Groups";
import { Statistics } from "pages/Statistics";

export const pagesDashboards = [
  { name: "Home", href: "/", pageType: "up", element: <Home /> },
  { name: "Profile", href: "/profile", pageType: "up", element: <Profile /> },
  {
    name: "Toppings",
    href: "/toppings",
    pageType: "up",
    element: <Toppings />,
  },
  { name: "Extras", href: "/extras", pageType: "up", element: <Extras /> },
  { name: "Types", href: "/types", pageType: "up", element: <Types /> },
  { name: "Groups", href: "/groups", pageType: "up", element: <Groups /> },

  { name: "Dishes", href: "/dishes", pageType: "up", element: <Dishes /> },
  // { name: "Statistics", href: "/statistics", pageType: "up" , element: <Statistics />},
  { name: "Orders", href: "/orders", pageType: "up", element: <Orders /> },
  {
    name: "Settings",
    href: "/settings",
    pageType: "down",
    element: <Settings />,
  },
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

// module.exports = { pagesDashboards, initialState };
