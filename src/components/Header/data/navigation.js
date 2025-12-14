export const navigation = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Shop",
    path: "/shop",
  },
  {
    title: "Vendors",
    path: "#",
    badge: { text: "New", color: "tertiary" },
    submenu: [
      { title: "Vendors", path: "/vendor" },
      { title: "Vendor Details", path: "/vendor-details" },
      { title: "Vendors Two", path: "/vendor-two" },
      { title: "Vendors Two Details", path: "/vendor-two-details" },
    ],
  },
  {
    title: "Contact Us",
    path: "/contact",
  },
];