export const navigation = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "All Products",
    path: "/shop",
  },
  {
    title: "Stores",
    path: "#",
    badge: { text: "New", color: "tertiary" },
    submenu: [
      { title: "Store List", path: "/vendor" },
      { title: "Store Details", path: "/vendor-details" },
    ],
  },
  {
    title: "Contact Us",
    path: "/contact",
  },
];