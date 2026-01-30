"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Person, ShoppingCart, Favorite, LocalShipping,
  Headset, Logout, Edit, Delete,
  CheckCircle, Pending, DirectionsCar, TaskAlt,
  Email, Phone, Chat, ArrowForward,
  Dashboard as DashboardIcon,
  LocationOn,
  Menu as MenuIcon,
  Close as CloseIcon
} from "@mui/icons-material";
import {
  Box,
  Chip,
  Avatar,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  IconButton,
  Divider,
  Drawer,
  useMediaQuery,
  useTheme,
  CircularProgress
} from "@mui/material";
import toast from "react-hot-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.hetdcl.com/api/v1.0";

/* ─── Brand tokens (matching the website) ─── */
const C = {
  primary:    "#279E5A",
  primaryDk:  "#1F8A4D",
  primaryLt:  "#E8F5E9",
  secondary:  "#FF9F29",
  secondaryLt:"#FFF3E0",
  pageBg:     "#F3FAF2",
  cardBg:     "#FFFFFF",
  borderClr:  "#E6E6E6",
  heading:    "#1A1A1A",
  body:       "#666666",
  muted:      "#999999",
  danger:     "#DC2626",
  info:       "#2563EB",
  warn:       "#F59E0B",
  success:    "#22C55E",
};

/* ─── Shared sx helpers ─── */
const cardSx = {
  backgroundColor: C.cardBg,
  borderRadius: "16px",
  border: `1px solid ${C.borderClr}`,
  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  overflow: "hidden",
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#FAFAFA",
    fontSize: "0.9rem",
    "& fieldset": { borderColor: C.borderClr },
    "&:hover fieldset": { borderColor: C.primary },
    "&.Mui-focused fieldset": { borderColor: C.primary },
  },
};

/* ════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════ */
const DashboardPage = () => {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  /* Loading screen */
  if (authLoading) {
    return (
      <Box sx={{ backgroundColor: C.pageBg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress sx={{ color: C.primary, mb: 2 }} />
          <Box sx={{ color: C.body, fontSize: "0.95rem" }}>Loading Dashboard...</Box>
        </Box>
      </Box>
    );
  }
  if (!user) return null;

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon fontSize="small" /> },
    { id: "profile",   label: "Profile",   icon: <Person fontSize="small" /> },
    { id: "orders",    label: "Orders",    icon: <ShoppingCart fontSize="small" /> },
    { id: "wishlist",  label: "Wishlist",  icon: <Favorite fontSize="small" /> },
    { id: "track",     label: "Track Order",icon: <LocalShipping fontSize="small" /> },
    { id: "support",   label: "Support",   icon: <Headset fontSize="small" /> },
  ];

  const handleTab = (id) => {
    setActiveTab(id);
    if (isMobile) setMobileOpen(false);
  };

  const handleViewOrderFromDashboard = (order) => {
    setActiveTab("orders");
    // The OrdersTab will handle showing the order details
  };

  /* ── Sidebar content (shared by desktop & drawer) ── */
  const Sidebar = () => (
    <Box sx={{
      ...cardSx,
      borderRadius: isMobile ? 0 : "16px",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Close btn on mobile */}
      {isMobile && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={() => setMobileOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      {/* Avatar block */}
      <Box sx={{ textAlign: "center", pt: isMobile ? 1 : 4, pb: 3, px: 3 }}>
        <Avatar sx={{
          width: 80, height: 80, mx: "auto", mb: 1.5,
          bgcolor: C.primaryLt, color: C.primary,
          border: `3px solid ${C.primary}`,
          fontSize: "2rem", fontWeight: 700,
        }}>
          {user?.username?.charAt(0)?.toUpperCase() || <Person sx={{ fontSize: 36 }} />}
        </Avatar>
        <Box sx={{ fontWeight: 700, fontSize: "1.1rem", color: C.heading, fontFamily: "'Quicksand', sans-serif" }}>
          {user?.username || "Guest User"}
        </Box>
        <Box sx={{ fontSize: "0.8rem", color: C.muted, mt: 0.3 }}>
          {user?.email || "No email"}
        </Box>
      </Box>

      <Divider sx={{ borderColor: C.borderClr }} />

      {/* Navigation */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 0.5, p: 2 }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Button
              key={tab.id}
              startIcon={tab.icon}
              onClick={() => handleTab(tab.id)}
              disableElevation
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                borderRadius: "10px",
                py: 1.2,
                px: 2,
                fontSize: "0.9rem",
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "#fff" : C.body,
                bgcolor: isActive ? C.primary : "transparent",
                transition: "all .25s ease",
                "&:hover": {
                  bgcolor: isActive ? C.primaryDk : C.primaryLt,
                  color: isActive ? "#fff" : C.primary,
                },
              }}
            >
              {tab.label}
            </Button>
          );
        })}
      </Box>

      {/* Logout */}
      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          startIcon={<Logout fontSize="small" />}
          onClick={logout}
          sx={{
            justifyContent: "flex-start",
            textTransform: "none",
            borderRadius: "10px",
            py: 1.2,
            px: 2,
            fontSize: "0.9rem",
            fontWeight: 500,
            color: C.danger,
            border: `1px solid ${C.danger}20`,
            "&:hover": { bgcolor: "#FEF2F2", borderColor: C.danger },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  /* ── Layout ── */
  return (
    <Box sx={{ backgroundColor: C.pageBg, minHeight: "100vh" }}>
      {/* Mobile top bar */}
      {isMobile && (
        <Box sx={{
          position: "sticky", top: 0, zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          px: 2, py: 1.5,
          backgroundColor: C.cardBg,
          borderBottom: `1px solid ${C.borderClr}`,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar sx={{ width: 36, height: 36, bgcolor: C.primaryLt, color: C.primary, fontSize: "0.9rem", fontWeight: 700 }}>
              {user?.username?.charAt(0)?.toUpperCase() || "?"}
            </Avatar>
            <Box>
              <Box sx={{ fontWeight: 700, fontSize: "0.95rem", color: C.heading, fontFamily: "'Quicksand', sans-serif" }}>
                {user?.username || "Guest"}
              </Box>
              <Box sx={{ fontSize: "0.7rem", color: C.muted }}>
                {tabs.find((t) => t.id === activeTab)?.label}
              </Box>
            </Box>
          </Box>
          <IconButton onClick={() => setMobileOpen(true)} sx={{ color: C.heading }}>
            <MenuIcon />
          </IconButton>
        </Box>
      )}

      {/* Mobile drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{ "& .MuiDrawer-paper": { width: 280, border: "none" } }}
      >
        <Sidebar />
      </Drawer>

      {/* Main grid – full width with padding */}
      <Box sx={{
        display: "flex",
        gap: 3,
        maxWidth: "1600px",
        width: "100%",
        mx: "auto",
        p: { xs: 2, md: 3, lg: 4 },
      }}>
        {/* Desktop sidebar */}
        {!isMobile && (
          <Box sx={{ width: 280, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
            <Sidebar />
          </Box>
        )}

        {/* Content area – stretches to fill remaining space */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {activeTab === "dashboard" && <DashboardTab onViewOrder={handleViewOrderFromDashboard} />}
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "orders" && <OrdersTab />}
          {activeTab === "wishlist" && <WishlistTab />}
          {activeTab === "track" && <TrackOrderTab />}
          {activeTab === "support" && <SupportTab />}
        </Box>
      </Box>
    </Box>
  );
};

/* ════════════════════════════════════════════
   PAGE HEADER (reusable)
   ════════════════════════════════════════════ */
const PageHeader = ({ title, subtitle }) => (
  <Box sx={{ mb: 4 }}>
    <Box sx={{ fontWeight: 800, fontSize: { xs: "1.5rem", md: "2rem" }, color: C.heading, fontFamily: "'Quicksand', sans-serif", letterSpacing: "-0.5px" }}>
      {title}
    </Box>
    <Box sx={{ fontSize: "0.9rem", color: C.muted, mt: 0.5 }}>{subtitle}</Box>
  </Box>
);

/* ════════════════════════════════════════════
   DASHBOARD TAB
   ════════════════════════════════════════════ */
const DashboardTab = ({ onViewOrder }) => {
  const [stats, setStats] = useState({ totalOrders: 0, pendingOrders: 0, wishlistItems: 0, deliveredOrders: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        const headers = { Authorization: `JWT ${token}`, "Content-Type": "application/json" };

        const ordersRes = await fetch(`${API_BASE_URL}/api/v1.0/customers/orders/`, { headers });
        const ordersData = await ordersRes.json();
        const orders = Array.isArray(ordersData) ? ordersData : (ordersData.results || ordersData.data || []);

        const totalOrders = orders.length;
        const pendingOrders = orders.filter((o) => ["Pending", "Processing", "Placed"].includes(o.status)).length;
        const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;

        const sorted = [...orders].sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
        setRecentOrders(sorted.slice(0, 3));

        const wishRes = await fetch(`${API_BASE_URL}/api/v1.0/customers/favorite-products/`, { headers });
        const wishData = await wishRes.json();
        const wishArr = Array.isArray(wishData) ? wishData : (wishData.results || wishData.data || []);
        setWishlist(wishArr);

        setStats({ totalOrders, pendingOrders, wishlistItems: wishArr.length, deliveredOrders });
      } catch {
        toast.error("Failed to load dashboard data");
        setStats({ totalOrders: 0, pendingOrders: 0, wishlistItems: 0, deliveredOrders: 0 });
        setRecentOrders([]);
        setWishlist([]);
      }
      setLoading(false);
    };
    fetchDashboardData();
  }, [user]);

  const statusColor = (s) => {
    if (s === "Delivered") return "success";
    if (["Processing", "Pending", "Placed"].includes(s)) return "warning";
    if (s === "Shipped") return "info";
    if (s === "Paid") return "success";
    if (s === "Cancelled") return "error";
    return "default";
  };
  const statusIcon = (s) => {
    const sx = { fontSize: 15 };
    switch (s) {
      case "Delivered": return <TaskAlt sx={sx} />;
      case "Shipped":   return <DirectionsCar sx={sx} />;
      case "Paid":      return <CheckCircle sx={sx} />;
      case "Cancelled": return <Delete sx={sx} />;
      default:          return <Pending sx={sx} />;
    }
  };

  const statCards = [
    { label: "Total Orders",   value: stats.totalOrders,   icon: <ShoppingCart />, color: C.primary,   bg: C.primaryLt },
    { label: "Pending",        value: stats.pendingOrders,  icon: <Pending />,      color: C.warn,      bg: "#FEF9C3" },
    { label: "Wishlist",       value: stats.wishlistItems,  icon: <Favorite />,     color: "#EC4899",   bg: "#FCE7F3" },
    { label: "Delivered",      value: stats.deliveredOrders, icon: <TaskAlt />,     color: C.info,      bg: "#DBEAFE" },
  ];

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Welcome back! Here's your account summary" />

      {/* ── Stat cards ── */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" }, gap: 2.5, mb: 4 }}>
        {statCards.map((s, i) => (
          <Box key={i} sx={{
            ...cardSx,
            p: 2.5,
            display: "flex", flexDirection: "column", gap: 1.5,
            transition: "transform .25s ease, box-shadow .25s ease",
            "&:hover": { transform: "translateY(-4px)", boxShadow: "0 8px 24px rgba(0,0,0,0.1)" },
          }}>
            <Box sx={{ width: 44, height: 44, borderRadius: "12px", bgcolor: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {React.cloneElement(s.icon, { sx: { color: s.color, fontSize: 22 } })}
            </Box>
            <Box>
              <Box sx={{ fontWeight: 800, fontSize: "1.75rem", color: C.heading, lineHeight: 1 }}>
                {loading ? <CircularProgress size={20} sx={{ color: s.color }} /> : s.value}
              </Box>
              <Box sx={{ fontSize: "0.8rem", color: C.muted, mt: 0.5 }}>{s.label}</Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* ── Recent orders ── */}
      <Box sx={{ ...cardSx, mb: 4 }}>
        <Box sx={{ px: 3, pt: 3, pb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ fontWeight: 700, fontSize: "1.1rem", color: C.heading, fontFamily: "'Quicksand', sans-serif" }}>Recent Orders</Box>
        </Box>

        {/* Desktop */}
        <Box sx={{ display: { xs: "none", md: "block" }, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.borderClr}` }}>
                {["Order ID", "Date", "Items", "Total", "Status", ""].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 16px", fontSize: "0.8rem", color: C.muted, fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ textAlign: "center", padding: 32, color: C.muted }}>Loading...</td></tr>
              ) : recentOrders.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: "center", padding: 32, color: C.muted }}>No recent orders</td></tr>
              ) : recentOrders.map((o, i) => (
                <tr key={o.id || i} style={{ borderBottom: `1px solid ${C.borderClr}` }}>
                  <td style={{ padding: "14px 16px", fontWeight: 600, color: C.primary, fontSize: "0.9rem" }}>#{o.order_number || o.id}</td>
                  <td style={{ padding: "14px 16px", color: C.body, fontSize: "0.85rem" }}>{o.order_date ? new Date(o.order_date).toLocaleDateString() : ""}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <Chip label={`${o.items?.length || 0} items`} size="small" sx={{ fontSize: "0.7rem", bgcolor: "#F1F1F1", fontWeight: 500 }} />
                  </td>
                  <td style={{ padding: "14px 16px", fontWeight: 700, color: C.primary, fontSize: "0.9rem" }}>
                    {o.total_amount ? `৳${o.total_amount}` : o.total_price ? `৳${o.total_price}` : ""}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <Chip icon={statusIcon(o.status)} label={o.status} color={statusColor(o.status)} size="small" sx={{ fontSize: "0.7rem", fontWeight: 600 }} />
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <Button onClick={() => onViewOrder && onViewOrder(o)} size="small" endIcon={<ArrowForward sx={{ fontSize: 14 }} />} sx={{ textTransform: "none", fontSize: "0.8rem", color: C.primary, fontWeight: 600, "&:hover": { bgcolor: C.primaryLt } }}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>

        {/* Mobile cards */}
        <Box sx={{ display: { xs: "block", md: "none" }, px: 2, pb: 2 }}>
          {loading ? (
            <Box sx={{ textAlign: "center", py: 4, color: C.muted }}>Loading...</Box>
          ) : recentOrders.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4, color: C.muted }}>No recent orders</Box>
          ) : recentOrders.map((o, i) => (
            <Box key={o.id || i} sx={{ p: 2, mb: 1.5, borderRadius: "12px", border: `1px solid ${C.borderClr}`, bgcolor: "#FAFAFA" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
                <Box sx={{ fontWeight: 600, color: C.primary, fontSize: "0.9rem" }}>#{o.order_number || o.id}</Box>
                <Chip icon={statusIcon(o.status)} label={o.status} color={statusColor(o.status)} size="small" sx={{ fontSize: "0.65rem" }} />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Box sx={{ fontSize: "0.8rem", color: C.muted }}>{o.order_date ? new Date(o.order_date).toLocaleDateString() : ""}</Box>
                <Box sx={{ fontSize: "0.8rem", color: C.muted }}>{o.items?.length || 0} items</Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ fontWeight: 700, color: C.primary }}>{o.total_amount ? `৳${o.total_amount}` : o.total_price ? `৳${o.total_price}` : ""}</Box>
                <Button onClick={() => onViewOrder && onViewOrder(o)} size="small" endIcon={<ArrowForward sx={{ fontSize: 14 }} />} sx={{ textTransform: "none", fontSize: "0.75rem", color: C.primary }}>View</Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── Wishlist preview ── */}
      <Box sx={{ ...cardSx }}>
        <Box sx={{ px: 3, pt: 3, pb: 2 }}>
          <Box sx={{ fontWeight: 700, fontSize: "1.1rem", color: C.heading, fontFamily: "'Quicksand', sans-serif" }}>My Wishlist</Box>
        </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" }, gap: 2, px: 3, pb: 3 }}>
          {loading ? (
            <Box sx={{ gridColumn: "1 / -1", textAlign: "center", py: 4, color: C.muted }}>Loading...</Box>
          ) : wishlist.length === 0 ? (
            <Box sx={{ gridColumn: "1 / -1", textAlign: "center", py: 4, color: C.muted }}>No wishlist items</Box>
          ) : wishlist.slice(0, 3).map((item) => {
            const prod = item.product;
            return (
              <Box key={item.id} sx={{
                borderRadius: "14px",
                border: `1px solid ${C.borderClr}`,
                overflow: "hidden",
                transition: "transform .25s ease, box-shadow .25s ease",
                "&:hover": { transform: "translateY(-4px)", boxShadow: "0 8px 24px rgba(0,0,0,0.1)" },
              }}>
                <Box sx={{ height: 130, bgcolor: C.primaryLt, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Favorite sx={{ fontSize: 36, color: C.primary, opacity: 0.5 }} />
                </Box>
                <Box sx={{ p: 2 }}>
                  <Box sx={{ fontWeight: 700, fontSize: "0.9rem", color: C.heading, mb: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {prod?.supplier_product?.name || prod?.name || "Product"}
                  </Box>
                  <Box sx={{ fontWeight: 800, color: C.primary, fontSize: "1.1rem", mb: 2 }}>
                    ৳{prod?.variants?.[0]?.price || "N/A"}
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button fullWidth variant="contained" disableElevation sx={{
                      bgcolor: C.primary, borderRadius: "10px", textTransform: "none", fontWeight: 600, fontSize: "0.8rem", py: 1,
                      "&:hover": { bgcolor: C.primaryDk },
                    }}>
                      Add to Cart
                    </Button>
                    <IconButton size="small" sx={{ border: `1px solid ${C.danger}30`, color: C.danger, borderRadius: "10px", "&:hover": { bgcolor: "#FEF2F2" } }}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

/* ════════════════════════════════════════════
   PROFILE TAB
   ════════════════════════════════════════════ */
const ProfileTab = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({ email: "", name: "", phone: "", shipping_address: "", gender: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) setFormData({
      email: user?.customer?.email || user?.email || "",
      name: user?.customer?.name || "",
      phone: user?.customer?.phone || "",
      shipping_address: user?.customer?.shipping_address || "",
      gender: user?.customer?.gender || "",
    });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateProfile({ customer: formData });
    setLoading(false);
  };
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const fields = [
    { label: "Username", value: user?.username || "", disabled: true },
    { label: "Email Address", name: "email", type: "email", value: formData.email },
    { label: "Full Name", name: "name", value: formData.name },
    { label: "Phone Number", name: "phone", value: formData.phone },
    { label: "Shipping Address", name: "shipping_address", value: formData.shipping_address },
  ];

  return (
    <>
      <PageHeader title="Profile Settings" subtitle="Manage your account information" />
      <Box component="form" onSubmit={handleSubmit} sx={{ ...cardSx, p: { xs: 2.5, md: 4 } }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3 }}>
          {fields.map((f) => (
            <Box key={f.label}>
              <Box sx={{ fontSize: "0.85rem", fontWeight: 600, color: C.body, mb: 1 }}>{f.label}</Box>
              <TextField
                fullWidth
                type={f.type || "text"}
                name={f.name}
                value={f.value}
                disabled={f.disabled}
                onChange={f.disabled ? undefined : handleChange}
                variant="outlined"
                size="small"
                sx={inputSx}
              />
            </Box>
          ))}
          <Box>
            <Box sx={{ fontSize: "0.85rem", fontWeight: 600, color: C.body, mb: 1 }}>Gender</Box>
            <TextField
              fullWidth name="gender" value={formData.gender} onChange={handleChange}
              variant="outlined" size="small" select SelectProps={{ native: true }} sx={inputSx}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </TextField>
          </Box>
        </Box>

        <Button
          type="submit" variant="contained" startIcon={<Edit />} disabled={loading} disableElevation
          sx={{
            mt: 4, bgcolor: C.primary, borderRadius: "10px", px: 4, py: 1.3,
            fontWeight: 700, textTransform: "none", fontSize: "0.95rem",
            "&:hover": { bgcolor: C.primaryDk },
            "&:disabled": { bgcolor: "#E0E0E0" },
          }}
        >
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </Box>
    </>
  );
};

/* ════════════════════════════════════════════
   ORDERS TAB
   ════════════════════════════════════════════ */
const OrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoadingOrders(true);
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch(`${API_BASE_URL}/api/v1.0/customers/orders/`, {
          headers: { Authorization: `JWT ${token}`, "Content-Type": "application/json" },
        });
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : (data.results || data.data || []));
      } catch { setOrders([]); }
      setLoadingOrders(false);
    };
    fetchOrders();
  }, [user]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleBackToList = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  const statusColor = (s) => {
    if (s === "Delivered" || s === "Paid") return "success";
    if (["Processing", "Pending", "Placed"].includes(s)) return "warning";
    if (s === "Shipped") return "info";
    if (s === "Cancelled") return "error";
    return "default";
  };
  const statusIcon = (s) => {
    const sx = { fontSize: 15 };
    switch (s) {
      case "Delivered": return <TaskAlt sx={sx} />;
      case "Shipped":   return <DirectionsCar sx={sx} />;
      case "Paid":      return <CheckCircle sx={sx} />;
      case "Cancelled": return <Delete sx={sx} />;
      default:          return <Pending sx={sx} />;
    }
  };

  if (showOrderDetails && selectedOrder) {
    return <OrderDetailsView order={selectedOrder} onBack={handleBackToList} />;
  }

  return (
    <>
      <PageHeader title="Order History" subtitle="View and manage your orders" />
      <Box sx={{ ...cardSx }}>
        {loadingOrders ? (
          <Box sx={{ textAlign: "center", py: 6, color: C.muted }}>
            <CircularProgress size={28} sx={{ color: C.primary, mb: 1 }} />
            <Box>Loading orders...</Box>
          </Box>
        ) : (
          <>
            {/* Desktop */}
            <Box sx={{ display: { xs: "none", md: "block" }, overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.borderClr}` }}>
                    {["Order ID", "Date", "Items", "Total", "Status", ""].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: "0.8rem", color: C.muted, fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr><td colSpan={6} style={{ textAlign: "center", padding: 40, color: C.muted }}>No orders found</td></tr>
                  ) : orders.map((o, i) => (
                    <tr key={o.id || i} style={{ borderBottom: `1px solid ${C.borderClr}`, transition: "background .2s" }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "#F9FBF9"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                      <td style={{ padding: "14px 16px", fontWeight: 600, color: C.primary, fontSize: "0.9rem" }}>#{o.order_number || o.id}</td>
                      <td style={{ padding: "14px 16px", color: C.body, fontSize: "0.85rem" }}>{o.order_date ? new Date(o.order_date).toLocaleDateString() : ""}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <Chip label={`${o.items?.length || 0} items`} size="small" sx={{ fontSize: "0.7rem", bgcolor: "#F1F1F1", fontWeight: 500 }} />
                      </td>
                      <td style={{ padding: "14px 16px", fontWeight: 700, color: C.primary, fontSize: "0.9rem" }}>
                        {o.total_amount ? `৳${o.total_amount}` : o.total_price ? `৳${o.total_price}` : ""}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <Chip icon={statusIcon(o.status)} label={o.status} color={statusColor(o.status)} size="small" sx={{ fontSize: "0.7rem", fontWeight: 600 }} />
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <Button onClick={() => handleViewOrder(o)} size="small" endIcon={<ArrowForward sx={{ fontSize: 14 }} />} sx={{ textTransform: "none", fontSize: "0.8rem", color: C.primary, fontWeight: 600, "&:hover": { bgcolor: C.primaryLt } }}>
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>

            {/* Mobile */}
            <Box sx={{ display: { xs: "block", md: "none" }, p: 2 }}>
              {orders.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 4, color: C.muted }}>No orders found</Box>
              ) : orders.map((o, i) => (
                <Box key={o.id || i} sx={{ p: 2, mb: 1.5, borderRadius: "12px", border: `1px solid ${C.borderClr}`, bgcolor: "#FAFAFA" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
                    <Box sx={{ fontWeight: 600, color: C.primary, fontSize: "0.9rem" }}>#{o.order_number || o.id}</Box>
                    <Chip icon={statusIcon(o.status)} label={o.status} color={statusColor(o.status)} size="small" sx={{ fontSize: "0.65rem" }} />
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Box sx={{ fontSize: "0.8rem", color: C.muted }}>{o.order_date ? new Date(o.order_date).toLocaleDateString() : ""}</Box>
                    <Box sx={{ fontSize: "0.8rem", color: C.muted }}>{o.items?.length || 0} items</Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ fontWeight: 700, color: C.primary }}>{o.total_amount ? `৳${o.total_amount}` : o.total_price ? `৳${o.total_price}` : ""}</Box>
                    <Button onClick={() => handleViewOrder(o)} size="small" endIcon={<ArrowForward sx={{ fontSize: 14 }} />} sx={{ textTransform: "none", fontSize: "0.75rem", color: C.primary }}>View</Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

/* ════════════════════════════════════════════
   WISHLIST TAB
   ════════════════════════════════════════════ */
const WishlistTab = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch(`${API_BASE_URL}/api/v1.0/customers/favorite-products/`, {
          headers: { Authorization: `JWT ${token}`, "Content-Type": "application/json" },
        });
        const data = await res.json();
        setWishlist(Array.isArray(data) ? data : (data.results || data.data || []));
      } catch { setWishlist([]); }
      setLoading(false);
    };
    if (user) fetchWishlist();
  }, [user]);

  return (
    <>
      <PageHeader title="My Wishlist" subtitle="Your favorite products saved for later" />

      {loading ? (
        <Box sx={{ textAlign: "center", py: 8, color: C.muted }}>
          <CircularProgress size={28} sx={{ color: C.primary, mb: 1 }} />
          <Box>Loading wishlist...</Box>
        </Box>
      ) : wishlist.length === 0 ? (
        <Box sx={{ ...cardSx, textAlign: "center", py: 8, color: C.muted }}>
          <Favorite sx={{ fontSize: 48, color: C.borderClr, mb: 1 }} />
          <Box>No wishlist items found</Box>
        </Box>
      ) : (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }, gap: 2.5 }}>
          {wishlist.map((item) => {
            const prod = item.product;
            return (
              <Box key={item.id} sx={{
                ...cardSx,
                overflow: "hidden",
                transition: "transform .25s ease, box-shadow .25s ease",
                "&:hover": { transform: "translateY(-4px)", boxShadow: "0 8px 24px rgba(0,0,0,0.1)" },
              }}>
                <Box sx={{ height: 150, bgcolor: C.primaryLt, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Favorite sx={{ fontSize: 40, color: C.primary, opacity: 0.4 }} />
                </Box>
                <Box sx={{ p: 2.5 }}>
                  <Box sx={{ fontWeight: 700, fontSize: "0.95rem", color: C.heading, mb: 1.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {prod?.supplier_product?.name || prod?.name || "Product"}
                  </Box>
                  <Box sx={{ fontWeight: 800, color: C.primary, fontSize: "1.15rem", mb: 2 }}>
                    ৳{prod?.variants?.[0]?.price || "N/A"}
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button fullWidth variant="contained" disableElevation sx={{
                      bgcolor: C.primary, borderRadius: "10px", textTransform: "none", fontWeight: 600, fontSize: "0.8rem", py: 1,
                      "&:hover": { bgcolor: C.primaryDk },
                    }}>
                      Add to Cart
                    </Button>
                    <IconButton size="small" sx={{ border: `1px solid ${C.danger}30`, color: C.danger, borderRadius: "10px", "&:hover": { bgcolor: "#FEF2F2" } }}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </>
  );
};

/* ════════════════════════════════════════════
   ORDER DETAILS VIEW
   ════════════════════════════════════════════ */
const OrderDetailsView = ({ order, onBack }) => {
  const statusColor = (s) => {
    if (s === "Delivered" || s === "Paid") return "success";
    if (["Processing", "Pending", "Placed"].includes(s)) return "warning";
    if (s === "Shipped") return "info";
    if (s === "Cancelled") return "error";
    return "default";
  };
  const statusIcon = (s) => {
    const sx = { fontSize: 18 };
    switch (s) {
      case "Delivered": return <TaskAlt sx={sx} />;
      case "Shipped":   return <DirectionsCar sx={sx} />;
      case "Paid":      return <CheckCircle sx={sx} />;
      case "Cancelled": return <Delete sx={sx} />;
      default:          return <Pending sx={sx} />;
    }
  };

  return (
    <>
      {/* Header with back button */}
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton onClick={onBack} sx={{ bgcolor: C.primaryLt, color: C.primary, "&:hover": { bgcolor: C.primary, color: "#fff" } }}>
          <ArrowForward sx={{ transform: "rotate(180deg)" }} />
        </IconButton>
        <Box>
          <Box sx={{ fontWeight: 800, fontSize: { xs: "1.3rem", md: "1.8rem" }, color: C.heading, fontFamily: "'Quicksand', sans-serif" }}>
            Order Details
          </Box>
          <Box sx={{ fontSize: "0.85rem", color: C.muted, mt: 0.3 }}>
            Order #{order.order_number || order.id}
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 360px" }, gap: 3 }}>
        {/* Left: Order items and details */}
        <Box>
          {/* Status card */}
          <Box sx={{ ...cardSx, p: 3, mb: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Box sx={{ fontWeight: 700, fontSize: "1.1rem", color: C.heading }}>Order Status</Box>
              <Chip icon={statusIcon(order.status)} label={order.status} color={statusColor(order.status)} sx={{ fontWeight: 600, fontSize: "0.85rem" }} />
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 2 }}>
              <Box>
                <Box sx={{ fontSize: "0.75rem", color: C.muted, mb: 0.3 }}>Order Date</Box>
                <Box sx={{ fontWeight: 600, color: C.heading, fontSize: "0.9rem" }}>
                  {order.order_date ? new Date(order.order_date).toLocaleDateString() : "N/A"}
                </Box>
              </Box>
              <Box>
                <Box sx={{ fontSize: "0.75rem", color: C.muted, mb: 0.3 }}>Payment Method</Box>
                <Box sx={{ fontWeight: 600, color: C.heading, fontSize: "0.9rem" }}>
                  {order.payment_method || "N/A"}
                </Box>
              </Box>
              <Box>
                <Box sx={{ fontSize: "0.75rem", color: C.muted, mb: 0.3 }}>Delivery Charge</Box>
                <Box sx={{ fontWeight: 600, color: C.heading, fontSize: "0.9rem" }}>
                  ৳{order.deliver_charge || 0}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Order items */}
          <Box sx={{ ...cardSx, p: 3 }}>
            <Box sx={{ fontWeight: 700, fontSize: "1.1rem", color: C.heading, mb: 3 }}>Order Items</Box>
            {order.items && order.items.length > 0 ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {order.items.map((item, idx) => (
                  <Box key={idx} sx={{
                    display: "flex",
                    gap: 2,
                    p: 2,
                    borderRadius: "12px",
                    border: `1px solid ${C.borderClr}`,
                    bgcolor: "#FAFAFA"
                  }}>
                    {/* Product image */}
                    <Box sx={{
                      width: 80,
                      height: 80,
                      flexShrink: 0,
                      borderRadius: "10px",
                      bgcolor: C.primaryLt,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden"
                    }}>
                      {item.product_image ? (
                        <img src={item.product_image} alt={item.product_title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <ShoppingCart sx={{ fontSize: 32, color: C.primary, opacity: 0.4 }} />
                      )}
                    </Box>

                    {/* Product details */}
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ fontWeight: 600, fontSize: "0.95rem", color: C.heading, mb: 0.5 }}>
                        {item.product_title || item.product?.supplier_product?.name || "Product"}
                      </Box>
                      {item.variant && (
                        <Box sx={{ fontSize: "0.8rem", color: C.muted, mb: 1 }}>
                          {item.variant.name}
                        </Box>
                      )}
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ fontSize: "0.85rem", color: C.body }}>
                          Qty: {item.quantity} × ৳{item.final_unit_price || item.original_unit_price}
                        </Box>
                        <Box sx={{ fontWeight: 700, color: C.primary, fontSize: "1rem" }}>
                          ৳{item.total_price || (item.quantity * (item.final_unit_price || item.original_unit_price))}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box sx={{ textAlign: "center", py: 4, color: C.muted }}>No items in this order</Box>
            )}
          </Box>
        </Box>

        {/* Right: Summary and shipping */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Shipping address */}
          <Box sx={{ ...cardSx, p: 3 }}>
            <Box sx={{ fontWeight: 700, fontSize: "1rem", color: C.heading, mb: 2, fontFamily: "'Quicksand', sans-serif" }}>
              Shipping Address
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
              <LocationOn sx={{ fontSize: 20, color: C.primary, mt: 0.3 }} />
              <Box sx={{ fontSize: "0.9rem", color: C.body, lineHeight: 1.6 }}>
                {order.shipping_address || "No address provided"}
              </Box>
            </Box>
          </Box>

          {/* Order summary */}
          <Box sx={{ ...cardSx, p: 3 }}>
            <Box sx={{ fontWeight: 700, fontSize: "1rem", color: C.heading, mb: 3, fontFamily: "'Quicksand', sans-serif" }}>
              Order Summary
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ fontSize: "0.85rem", color: C.body }}>Subtotal</Box>
                <Box sx={{ fontWeight: 600, fontSize: "0.85rem", color: C.heading }}>
                  ৳{((order.total_amount || order.total_price || 0) - (order.deliver_charge || 0) + (order.coupon_discount || 0)).toFixed(2)}
                </Box>
              </Box>
              {order.coupon_discount > 0 && (
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ fontSize: "0.85rem", color: C.success }}>Discount</Box>
                  <Box sx={{ fontWeight: 600, fontSize: "0.85rem", color: C.success }}>
                    -৳{order.coupon_discount}
                  </Box>
                </Box>
              )}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ fontSize: "0.85rem", color: C.body }}>Delivery Charge</Box>
                <Box sx={{ fontWeight: 600, fontSize: "0.85rem", color: C.heading }}>
                  ৳{order.deliver_charge || 0}
                </Box>
              </Box>
              <Divider sx={{ my: 1, borderColor: C.borderClr }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ fontSize: "0.9rem", fontWeight: 700, color: C.heading }}>Total</Box>
                <Box sx={{ fontWeight: 800, fontSize: "1.2rem", color: C.primary }}>
                  ৳{order.total_amount || order.total_price || 0}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

/* ════════════════════════════════════════════
   TRACK ORDER TAB
   ════════════════════════════════════════════ */
const TrackOrderTab = () => {
  const [trackingId, setTrackingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [trackingData, setTrackingData] = useState(null);
  const [error, setError] = useState("");

  const handleTrackOrder = async () => {
    if (!trackingId.trim()) {
      toast.error("Please enter a tracking ID");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1.0/customers/orders/track/${trackingId}/`, {
        headers: { "Content-Type": "application/json", "Authorization": `JWT ${localStorage.getItem("access_token")}` },
      });
      const data = await res.json();

      if (res.ok) {
        setTrackingData(data?.data);
        toast.success("Order found!");
      } else {
        setError(data.error || "Order not found");
        toast.error(data.error || "Order not found");
        setTrackingData(null);
      }
    } catch (err) {
      setError("Failed to track order. Please try again.");
      toast.error("Failed to track order. Please try again.");
      setTrackingData(null);
    }

    setLoading(false);
  };

  const getStatusIcon = (status) => {
    const sx = { fontSize: 20 };
    switch (status) {
      case "completed": return <TaskAlt sx={{ ...sx, color: C.primary }} />;
      case "in_progress": return <DirectionsCar sx={{ ...sx, color: C.info }} />;
      default: return <Pending sx={{ ...sx, color: C.warn }} />;
    }
  };

  const getActiveStep = (status) => {
    const statusMap = {
      "Placed": 0,
      "Pending": 0,
      "Processing": 1,
      "Shipped": 2,
      "Delivered": 3,
    };
    return statusMap[status] || 0;
  };

  const getProgressValue = (status) => {
    const activeStep = getActiveStep(status);
    return (activeStep / 3) * 100;
  };

  const statusColor = (s) => {
    if (s === "Delivered" || s === "Paid") return "success";
    if (["Processing", "Pending", "Placed"].includes(s)) return "warning";
    if (s === "Shipped") return "info";
    if (s === "Cancelled") return "error";
    return "default";
  };

  const steps = ["Order Placed", "Processing", "Shipped", "Delivered"];

  return (
    <>
      <PageHeader title="Track Your Order" subtitle="Real-time tracking for your orders" />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: trackingData ? "1fr 340px" : "1fr" }, gap: 3 }}>
        {/* Left: tracking details */}
        <Box sx={{ ...cardSx, p: { xs: 2.5, md: 3.5 } }}>
          {/* Input */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ fontWeight: 700, fontSize: "1rem", color: C.heading, mb: 2, fontFamily: "'Quicksand', sans-serif" }}>Enter Tracking ID</Box>
            <Box sx={{ display: "flex", gap: 1.5, flexDirection: { xs: "column", sm: "row" } }}>
              <TextField
                fullWidth
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter your order tracking ID (e.g., ABC123XYZ0)"
                variant="outlined"
                size="small"
                sx={{ ...inputSx, flex: 1 }}
                onKeyPress={(e) => e.key === "Enter" && handleTrackOrder()}
              />
              <Button
                variant="contained"
                disableElevation
                onClick={handleTrackOrder}
                disabled={loading}
                sx={{
                  bgcolor: C.primary,
                  borderRadius: "10px",
                  px: 4,
                  py: 1,
                  fontWeight: 600,
                  textTransform: "none",
                  whiteSpace: "nowrap",
                  "&:hover": { bgcolor: C.primaryDk },
                  "&:disabled": { bgcolor: "#E0E0E0" },
                }}
              >
                {loading ? "Tracking..." : "Track Order"}
              </Button>
            </Box>
            {error && (
              <Box sx={{ mt: 1.5, p: 1.5, bgcolor: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: "8px", fontSize: "0.85rem", color: C.danger }}>
                {error}
              </Box>
            )}
          </Box>

          {trackingData && trackingData.order ? (
            <>
              {/* Status */}
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                  <Box sx={{ fontWeight: 700, fontSize: "1rem", color: C.heading }}>Order Status</Box>
                  <Chip
                    label={trackingData.order.status}
                    color={statusColor(trackingData.order.status)}
                    icon={<TaskAlt sx={{ fontSize: 15 }} />}
                    sx={{ fontWeight: 600, fontSize: "0.8rem" }}
                  />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={getProgressValue(trackingData.order.status)}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: "#E5E7EB",
                    "& .MuiLinearProgress-bar": { bgcolor: C.primary, borderRadius: 4 },
                  }}
                />
              </Box>

              {/* Stepper */}
              <Stepper activeStep={getActiveStep(trackingData.order.status)} alternativeLabel sx={{ mb: 4 }}>
                {steps.map((label, idx) => (
                  <Step key={label}>
                    <StepLabel
                      slotProps={{
                        stepIcon: {
                          sx: {
                            color: idx <= getActiveStep(trackingData.order.status) ? C.primary : "#D1D5DB",
                            fontSize: 28,
                            "&.Mui-completed": { color: C.primary },
                            "&.Mui-active": { color: C.primary }
                          }
                        }
                      }}
                      sx={{
                        "& .MuiStepLabel-label": {
                          fontSize: "0.78rem",
                          fontWeight: idx <= getActiveStep(trackingData.order.status) ? 600 : 400,
                          color: idx <= getActiveStep(trackingData.order.status) ? C.heading : C.muted,
                          mt: 0.5
                        }
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>

              {/* Timeline */}
              {trackingData.tracking_history && trackingData.tracking_history.length > 0 && (
                <Box sx={{ p: 2.5, bgcolor: "#FAFAFA", borderRadius: "12px", border: `1px solid ${C.borderClr}` }}>
                  <Box sx={{ fontWeight: 700, fontSize: "1rem", color: C.heading, mb: 2.5, fontFamily: "'Quicksand', sans-serif" }}>
                    Delivery Timeline
                  </Box>
                  {trackingData.tracking_history.map((item, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        mb: idx < trackingData.tracking_history.length - 1 ? 2.5 : 0,
                        pb: idx < trackingData.tracking_history.length - 1 ? 2 : 0,
                        borderBottom: idx < trackingData.tracking_history.length - 1 ? `1px solid ${C.borderClr}` : "none"
                      }}
                    >
                      <Box sx={{
                        mr: 2,
                        mt: 0.3,
                        p: 0.8,
                        borderRadius: "10px",
                        bgcolor: C.cardBg,
                        border: `1px solid ${C.borderClr}`,
                        display: "flex"
                      }}>
                        {getStatusIcon(item.status)}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ fontWeight: 600, color: C.heading, mb: 0.3, fontSize: "0.9rem" }}>
                          {item.event}
                        </Box>
                        {item.date && (
                          <Box sx={{ color: C.muted, fontSize: "0.8rem", mb: 0.3 }}>
                            {new Date(item.date).toLocaleString()}
                          </Box>
                        )}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <LocationOn sx={{ fontSize: 13, color: C.muted }} />
                          <Box sx={{ color: C.muted, fontSize: "0.75rem" }}>{item.location}</Box>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </>
          ) : (
            <Box sx={{ textAlign: "center", py: 6, color: C.muted }}>
              <LocalShipping sx={{ fontSize: 48, color: C.borderClr, mb: 2 }} />
              <Box sx={{ fontSize: "0.95rem" }}>Enter your tracking ID to see order details</Box>
            </Box>
          )}
        </Box>

        {/* Right: order summary */}
        {trackingData && trackingData.order && (
          <Box sx={{ ...cardSx, p: 3, alignSelf: "flex-start", position: { md: "sticky" }, top: { md: 24 } }}>
            <Box sx={{ fontWeight: 700, fontSize: "1rem", color: C.heading, mb: 3, fontFamily: "'Quicksand', sans-serif" }}>
              Order Summary
            </Box>
            <Box sx={{ mb: 2.5 }}>
              <Box sx={{ fontSize: "0.8rem", color: C.muted, mb: 0.3 }}>Tracking ID</Box>
              <Box sx={{ fontWeight: 700, color: C.primary, fontSize: "0.9rem" }}>
                #{trackingData.order.order_number}
              </Box>
            </Box>
            <Box sx={{ mb: 2.5 }}>
              <Box sx={{ fontSize: "0.8rem", color: C.muted, mb: 0.3 }}>Delivery Address</Box>
              <Box sx={{ fontWeight: 500, color: C.heading, fontSize: "0.85rem", lineHeight: 1.5 }}>
                {trackingData.order.shipping_address || "N/A"}
              </Box>
            </Box>
            <Box sx={{ mb: 2.5 }}>
              <Box sx={{ fontSize: "0.8rem", color: C.muted, mb: 0.3 }}>Payment Method</Box>
              <Box sx={{ fontWeight: 500, color: C.heading, fontSize: "0.85rem" }}>
                {trackingData.order.payment_method || "N/A"}
              </Box>
            </Box>
            <Box sx={{ mb: 2.5 }}>
              <Box sx={{ fontSize: "0.8rem", color: C.muted, mb: 0.3 }}>Items</Box>
              <Box sx={{ fontWeight: 500, color: C.heading, fontSize: "0.85rem" }}>
                {trackingData.order.items?.length || 0} Product{trackingData.order.items?.length !== 1 ? "s" : ""}
              </Box>
            </Box>
            <Divider sx={{ my: 2, borderColor: C.borderClr }} />
            <Box>
              <Box sx={{ fontSize: "0.8rem", color: C.muted, mb: 0.3 }}>Total Amount</Box>
              <Box sx={{ fontWeight: 800, color: C.primary, fontSize: "1.25rem" }}>
                ৳{trackingData.order.total_amount || 0}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

/* ════════════════════════════════════════════
   SUPPORT TAB
   ════════════════════════════════════════════ */
const SupportTab = () => {
  const [message, setMessage] = useState("");

  return (
    <>
      <PageHeader title="Customer Support" subtitle="We're here to help you 24/7" />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 340px" }, gap: 3 }}>
        {/* Left: ticket form */}
        <Box sx={{ ...cardSx, p: { xs: 2.5, md: 3.5 } }}>
          <Box sx={{ fontWeight: 700, fontSize: "1rem", color: C.heading, mb: 3, fontFamily: "'Quicksand', sans-serif" }}>Create Support Ticket</Box>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2.5, mb: 2.5 }}>
            <Box>
              <Box sx={{ fontSize: "0.85rem", fontWeight: 600, color: C.body, mb: 1 }}>Subject</Box>
              <TextField fullWidth select SelectProps={{ native: true }} variant="outlined" size="small" sx={inputSx}>
                <option>Order Issue</option>
                <option>Product Quality</option>
                <option>Delivery Problem</option>
                <option>Payment Issue</option>
                <option>Other</option>
              </TextField>
            </Box>
            <Box>
              <Box sx={{ fontSize: "0.85rem", fontWeight: 600, color: C.body, mb: 1 }}>Order ID (Optional)</Box>
              <TextField fullWidth variant="outlined" size="small" sx={inputSx} />
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ fontSize: "0.85rem", fontWeight: 600, color: C.body, mb: 1 }}>Message</Box>
            <TextField
              fullWidth multiline rows={5} value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please describe your issue in detail..."
              variant="outlined" sx={inputSx}
            />
          </Box>

          <Button variant="contained" startIcon={<Email />} disableElevation sx={{
            bgcolor: C.primary, borderRadius: "10px", px: 4, py: 1.3,
            fontWeight: 600, textTransform: "none", fontSize: "0.9rem",
            "&:hover": { bgcolor: C.primaryDk },
          }}>
            Submit Ticket
          </Button>
        </Box>

        {/* Right: contact + FAQ */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, alignSelf: "flex-start", position: { md: "sticky" }, top: { md: 24 } }}>
          {/* Contact cards */}
          <Box sx={{ ...cardSx, p: 3 }}>
            <Box sx={{ fontWeight: 700, fontSize: "1rem", color: C.heading, mb: 2.5, fontFamily: "'Quicksand', sans-serif" }}>Contact Support</Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { icon: <Phone />, title: "Phone Support", desc: "+880 1234 567890", action: "Call Now", color: C.primary, bg: C.primaryLt },
                { icon: <Email />, title: "Email Support", desc: "support@sobar.com", action: "Send Email", color: C.secondary, bg: C.secondaryLt },
                { icon: <Chat />, title: "Live Chat", desc: "24/7 Available", action: "Start Chat", color: C.info, bg: "#DBEAFE" },
              ].map((c, i) => (
                <Box key={i} sx={{ p: 2, borderRadius: "12px", border: `1px solid ${C.borderClr}`, bgcolor: "#FAFAFA", transition: "transform .2s", "&:hover": { transform: "translateX(4px)" } }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: "10px", bgcolor: c.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {React.cloneElement(c.icon, { sx: { color: c.color, fontSize: 18 } })}
                    </Box>
                    <Box sx={{ fontWeight: 600, fontSize: "0.9rem", color: C.heading }}>{c.title}</Box>
                  </Box>
                  <Box sx={{ fontSize: "0.8rem", color: C.muted, mb: 1 }}>{c.desc}</Box>
                  <Button size="small" endIcon={<ArrowForward sx={{ fontSize: 14 }} />} sx={{ textTransform: "none", fontSize: "0.8rem", color: c.color, fontWeight: 600, p: 0, minWidth: 0 }}>
                    {c.action}
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>

          {/* FAQ */}
          <Box sx={{ ...cardSx, p: 3 }}>
            <Box sx={{ fontWeight: 700, fontSize: "1rem", color: C.heading, mb: 2, fontFamily: "'Quicksand', sans-serif" }}>Quick Help</Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
              {["How to track my order?", "Return policy", "Payment methods", "Delivery areas"].map((faq, i) => (
                <Button key={i} endIcon={<ArrowForward sx={{ fontSize: 13 }} />} sx={{
                  justifyContent: "space-between", textTransform: "none", color: C.body, fontSize: "0.85rem",
                  py: 1, px: 1.5, borderRadius: "8px", border: `1px solid ${C.borderClr}`,
                  transition: "all .2s", "&:hover": { bgcolor: C.primaryLt, borderColor: C.primary, color: C.primary },
                }}>
                  {faq}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DashboardPage;
