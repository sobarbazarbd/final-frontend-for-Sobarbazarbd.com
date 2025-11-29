"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { 
  Person, ShoppingCart, Favorite, LocalShipping, 
  Headset, Logout, Edit, Visibility, Delete,
  CheckCircle, Pending, DirectionsCar, TaskAlt,
  Email, Phone, Chat, ArrowForward,
  Dashboard as DashboardIcon,
  LocationOn,
  Star,
  StarHalf
} from "@mui/icons-material";
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Box, 
  Chip,
  Avatar,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Container,
  Divider
} from "@mui/material";
import toast from "react-hot-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1.0";

const DashboardPage = () => {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { id: "profile", label: "Profile", icon: <Person /> },
    { id: "orders", label: "Orders", icon: <ShoppingCart /> },
    { id: "wishlist", label: "Wishlist", icon: <Favorite /> },
    { id: "track", label: "Track Order", icon: <LocalShipping /> },
    { id: "support", label: "Support", icon: <Headset /> },
  ];

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {/* Sidebar */}
          <Grid item xs={12} lg={3}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              background: 'linear-gradient(135deg, #198754 0%, #20c997 100%)',
              color: 'white',
              mb: 3 
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                      border: '3px solid white',
                      backgroundColor: 'rgba(255,255,255,0.2)'
                    }}
                  >
                    <Person sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {user?.username || 'Guest User'}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.8rem' }}>
                    {user?.email || 'No email'}
                  </Typography>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.3)', mb: 2 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {tabs.map((tab) => (
                    <Button
                      key={tab.id}
                      startIcon={tab.icon}
                      onClick={() => setActiveTab(tab.id)}
                      sx={{
                        justifyContent: 'flex-start',
                        color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.8)',
                        backgroundColor: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : 'transparent',
                        borderRadius: 2,
                        py: 1.2,
                        px: 2,
                        fontSize: '0.9rem',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.15)',
                        }
                      }}
                    >
                      {tab.label}
                    </Button>
                  ))}
                  
                  <Button
                    startIcon={<Logout />}
                    onClick={logout}
                    sx={{
                      justifyContent: 'flex-start',
                      color: 'rgba(255,255,255,0.8)',
                      borderRadius: 2,
                      py: 1.2,
                      px: 2,
                      mt: 1,
                      fontSize: '0.9rem',
                      '&:hover': {
                        backgroundColor: 'rgba(255,0,0,0.2)',
                      }
                    }}
                  >
                    Logout
                  </Button>
                </Box>
              </CardContent>
            </Card>

          </Grid>

          {/* Main Content */}
          <Grid item xs={12} lg={9}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              minHeight: '500px'
            }}>
              <CardContent sx={{ p: 4 }}>
                {activeTab === "dashboard" && <DashboardTab />}
                {activeTab === "profile" && <ProfileTab />}
                {activeTab === "orders" && <OrdersTab />}
                {activeTab === "wishlist" && <WishlistTab />}
                {activeTab === "track" && <TrackOrderTab />}
                {activeTab === "support" && <SupportTab />}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// Dashboard Tab Components u can customised
const DashboardTab = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    wishlistItems: 0,
    deliveredOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        // Fetch orders
        const ordersRes = await fetch(`${API_BASE_URL}/customers/orders/`, {
          headers: {
            "Authorization": `JWT ${token}`,
            "Content-Type": "application/json",
          },
        });
        const ordersData = await ordersRes.json();
        const orders = Array.isArray(ordersData) ? ordersData : (ordersData.results || ordersData.data || []);
        // Stats
        const totalOrders = orders.length;
        const pendingOrders = orders.filter(o => o.status === "Pending" || o.status === "Processing" || o.status === "Placed").length;
        const deliveredOrders = orders.filter(o => o.status === "Delivered").length;
        // Recent orders (latest 3)
        const sortedOrders = [...orders].sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
        setRecentOrders(sortedOrders.slice(0, 3));
        // Fetch wishlist
        const wishlistRes = await fetch(`${API_BASE_URL}/customers/favorite-products/`, {
          headers: {
            "Authorization": `JWT ${token}`,
            "Content-Type": "application/json",
          },
        });
        const wishlistData = await wishlistRes.json();
        const wishlistArr = Array.isArray(wishlistData) ? wishlistData : (wishlistData.results || wishlistData.data || []);
        setWishlist(wishlistArr);
        setStats({
          totalOrders,
          pendingOrders,
          wishlistItems: wishlistArr.length,
          deliveredOrders,
        });
      } catch (err) {
        toast.error("Failed to load dashboard data");
        setStats({
          totalOrders: 0,
          pendingOrders: 0,
          wishlistItems: 0,
          deliveredOrders: 0,
        });
        setRecentOrders([]);
        setWishlist([]);
      }
      setLoading(false);
    };
    fetchDashboardData();
  }, [user]);

  const getStatusColor = (status) => {
    if (status === "Delivered") return "success";
    if (status === "Processing" || status === "Pending" || status === "Placed") return "warning";
    if (status === "Shipped") return "info";
    if (status === "Paid") return "success";
    if (status === "Cancelled") return "error";
    return "default";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <TaskAlt sx={{ fontSize: 16 }} />;
      case 'Processing': case 'Pending': case 'Placed': return <Pending sx={{ fontSize: 16 }} />;
      case 'Shipped': return <DirectionsCar sx={{ fontSize: 16 }} />;
      case 'Paid': return <CheckCircle sx={{ fontSize: 16 }} />;
      case 'Cancelled': return <Delete sx={{ fontSize: 16 }} />;
      default: return <Pending sx={{ fontSize: 16 }} />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold', color: '#333' }}>
        Dashboard Overview
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
        Welcome back! Here's your account summary
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Total Orders', value: stats.totalOrders, icon: <ShoppingCart />, color: '#4CAF50' },
          { label: 'Pending Orders', value: stats.pendingOrders, icon: <Pending />, color: '#FF9800' },
          { label: 'Wishlist Items', value: stats.wishlistItems, icon: <Favorite />, color: '#E91E63' },
          { label: 'Delivered', value: stats.deliveredOrders, icon: <TaskAlt />, color: '#2196F3' },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}25 100%)`,
              border: `1px solid ${stat.color}20`,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 25px rgba(0,0,0,0.15)'
              }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: stat.color, mb: 0.5 }}>
                      {loading ? "..." : stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem' }}>
                      {stat.label}
                    </Typography>
                  </Box>
                  <Box sx={{
                    backgroundColor: `${stat.color}20`,
                    borderRadius: '50%',
                    p: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {React.cloneElement(stat.icon, { sx: { color: stat.color, fontSize: 28 } })}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Orders */}
      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Recent Orders
            </Typography>
          </Box>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Order ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Items</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Total</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">Loading...</TableCell>
                  </TableRow>
                ) : recentOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">No recent orders found.</TableCell>
                  </TableRow>
                ) : (
                  recentOrders.map((order, index) => (
                    <TableRow
                      key={order.id || index}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:hover': { backgroundColor: '#f8f9fa' }
                      }}
                    >
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#667eea' }}>
                          {order.order_number || order.id}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.9rem' }}>
                        {order.order_date ? new Date(order.order_date).toLocaleDateString() : ""}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={`${order.items ? order.items.length : 0} items`}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.75rem' }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32', fontSize: '0.9rem' }}>
                        {order.total_amount
                          ? `৳ ${order.total_amount}`
                          : order.total_price
                          ? `৳ ${order.total_price}`
                          : ""}
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getStatusIcon(order.status)}
                          label={order.status}
                          color={getStatusColor(order.status)}
                          variant="filled"
                          size="small"
                          sx={{ fontSize: '0.75rem', fontWeight: '500' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                          sx={{
                            borderRadius: 2,
                            fontSize: '0.8rem',
                            textTransform: 'none'
                          }}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Wishlist */}
      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
            My Wishlist
          </Typography>
          <Grid container spacing={3}>
            {loading ? (
              <Grid item xs={12}><Typography>Loading...</Typography></Grid>
            ) : wishlist.length === 0 ? (
              <Grid item xs={12}><Typography>No wishlist items found.</Typography></Grid>
            ) : (
              wishlist.map((item) => {
                const prod = item.product;
                return (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Card sx={{
                      borderRadius: 3,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
                      },
                      position: 'relative',
                      overflow: 'visible'
                    }}>
                      <CardContent sx={{ p: 0 }}>
                        <Box sx={{
                          height: 120,
                          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '12px 12px 0 0',
                          position: 'relative'
                        }}>
                          <Box sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Favorite sx={{ fontSize: 28, color: '#667eea' }} />
                          </Box>
                        </Box>
                        <Box sx={{ p: 2.5 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, fontSize: '1rem' }}>
                            {prod?.supplier_product?.name || prod?.name || "Product"}
                          </Typography>
                          {/* Optionally show rating if available */}
                          {/* <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {renderStars(prod?.rating || 0)}
                            </Box>
                            <Typography variant="body2" sx={{ color: '#666', fontSize: '0.8rem' }}>
                              ({prod?.rating || 0})
                            </Typography>
                          </Box> */}
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                            <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                              ৳{prod?.variants?.[0]?.price || "N/A"}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                              variant="contained"
                              fullWidth
                              sx={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                borderRadius: 2,
                                py: 0.8,
                                fontSize: '0.8rem',
                                fontWeight: '500',
                                textTransform: 'none'
                              }}
                            >
                              Add to Cart
                            </Button>
                            <IconButton
                              sx={{
                                border: '1px solid #ff4444',
                                color: '#ff4444',
                                borderRadius: 2,
                                '&:hover': { backgroundColor: 'rgba(255,68,68,0.1)' }
                              }}
                            >
                              <Delete sx={{ fontSize: 20 }} />
                            </IconButton>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })
            )}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

// Profile Tab Component - Fixed to match screenshot structure
const ProfileTab = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    shipping_address: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        email: user?.customer?.email || user?.email || "",
        name: user?.customer?.name || "",
        phone: user?.customer?.phone || "",
        shipping_address: user?.customer?.shipping_address || "",
        gender: user?.customer?.gender || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Send as { customer: { ...fields } }
    await updateProfile({ customer: formData });
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold", color: "#333" }}>
        Profile Settings
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "#666" }}>
        Manage your account information and preferences
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ color: "#666", fontWeight: "500", mb: 0.5 }}>
              Username
            </Typography>
            <TextField
              fullWidth
              value={user?.username || ""}
              variant="outlined"
              size="small"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ color: "#666", fontWeight: "500", mb: 0.5 }}>
              Email
            </Typography>
            <TextField
              fullWidth
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ color: "#666", fontWeight: "500", mb: 0.5 }}>
              Full Name
            </Typography>
            <TextField
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ color: "#666", fontWeight: "500", mb: 0.5 }}>
              Phone
            </Typography>
            <TextField
              fullWidth
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ color: "#666", fontWeight: "500", mb: 0.5 }}>
              Shipping Address
            </Typography>
            <TextField
              fullWidth
              name="shipping_address"
              value={formData.shipping_address}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ color: "#666", fontWeight: "500", mb: 0.5 }}>
              Gender
            </Typography>
            <TextField
              fullWidth
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              variant="outlined"
              size="small"
              select
              SelectProps={{ native: true }}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </TextField>
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          startIcon={<Edit />}
          disabled={loading}
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: 2,
            px: 4,
            py: 1,
            fontWeight: "bold",
            textTransform: "none",
            mt: 2,
          }}
        >
          {loading ? "UPDATING..." : "UPDATE PROFILE"}
        </Button>
      </form>
    </Box>
  );
};

// Orders Tab Component
const OrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoadingOrders(true);
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch(`${API_BASE_URL}/customers/orders/`, {
          headers: {
            "Authorization": `JWT ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        // If paginated, data.results; else data
        let orderList = Array.isArray(data) ? data : (data.results || data.data || []);
        setOrders(orderList);
      } catch (err) {
        setOrders([]);
      }
      setLoadingOrders(false);
    };
    fetchOrders();
  }, [user]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <TaskAlt sx={{ fontSize: 16 }} />;
      case 'Processing': return <Pending sx={{ fontSize: 16 }} />;
      case 'Shipped': return <DirectionsCar sx={{ fontSize: 16 }} />;
      case 'Paid': return <CheckCircle sx={{ fontSize: 16 }} />;
      case 'Cancelled': return <Delete sx={{ fontSize: 16 }} />;
      default: return <Pending sx={{ fontSize: 16 }} />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold', color: '#333' }}>
        Order History
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
        View and manage your recent orders
      </Typography>

      {loadingOrders ? (
        <Typography>Loading orders...</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Items</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Total</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order, index) => (
                  <TableRow
                    key={order.id || index}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { backgroundColor: '#f8f9fa' }
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#667eea' }}>
                        {order.order_number || order.id}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.9rem' }}>
                      {order.order_date ? new Date(order.order_date).toLocaleDateString() : ""}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${order.items ? order.items.length : 0} items`}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.75rem' }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32', fontSize: '0.9rem' }}>
                      {order.total_amount
                        ? `৳ ${order.total_amount}`
                        : order.total_price
                        ? `৳ ${order.total_price}`
                        : ""}
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(order.status)}
                        label={order.status}
                        color={
                          order.status === "Delivered"
                            ? "success"
                            : order.status === "Processing"
                            ? "warning"
                            : order.status === "Shipped"
                            ? "info"
                            : order.status === "Paid"
                            ? "success"
                            : order.status === "Cancelled"
                            ? "error"
                            : "default"
                        }
                        variant="filled"
                        size="small"
                        sx={{ fontSize: '0.75rem', fontWeight: '500' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                        sx={{
                          borderRadius: 2,
                          fontSize: '0.8rem',
                          textTransform: 'none'
                        }}
                        // onClick={() => ...} // Add order details navigation if needed
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

// Wishlist Tab Component
const WishlistTab = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch(`${API_BASE_URL}/customers/favorite-products/`, {
          headers: {
            "Authorization": `JWT ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        const wishlistArr = Array.isArray(data) ? data : (data.results || data.data || []);
        setWishlist(wishlistArr);
      } catch (err) {
        setWishlist([]);
      }
      setLoading(false);
    };
    if (user) fetchWishlist();
  }, [user]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} sx={{ fontSize: 16, color: '#ffc107' }} />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" sx={{ fontSize: 16, color: '#ffc107' }} />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} sx={{ fontSize: 16, color: '#e0e0e0' }} />);
    }
    return stars;
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold', color: '#333' }}>
        My Wishlist
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
        Your favorite products saved for later
      </Typography>
      <Grid container spacing={3}>
        {loading ? (
          <Grid item xs={12}><Typography>Loading...</Typography></Grid>
        ) : wishlist.length === 0 ? (
          <Grid item xs={12}><Typography>No wishlist items found.</Typography></Grid>
        ) : (
          wishlist.map((item) => {
            const prod = item.product;
            return (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card sx={{
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
                  },
                  position: 'relative',
                  overflow: 'visible'
                }}>
                  <CardContent sx={{ p: 0 }}>
                    <Box sx={{
                      height: 120,
                      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '12px 12px 0 0',
                      position: 'relative'
                    }}>
                      <Box sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Favorite sx={{ fontSize: 28, color: '#667eea' }} />
                      </Box>
                    </Box>
                    <Box sx={{ p: 2.5 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, fontSize: '1rem' }}>
                        {prod?.supplier_product?.name || prod?.name || "Product"}
                      </Typography>
                      {/* Optionally show rating if available */}
                      {/* <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {renderStars(prod?.rating || 0)}
                        </Box>
                        <Typography variant="body2" sx={{ color: '#666', fontSize: '0.8rem' }}>
                          ({prod?.rating || 0})
                        </Typography>
                      </Box> */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                        <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                          ৳{prod?.variants?.[0]?.price || "N/A"}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: 2,
                            py: 0.8,
                            fontSize: '0.8rem',
                            fontWeight: '500',
                            textTransform: 'none'
                          }}
                        >
                          Add to Cart
                        </Button>
                        <IconButton
                          sx={{
                            border: '1px solid #ff4444',
                            color: '#ff4444',
                            borderRadius: 2,
                            '&:hover': { backgroundColor: 'rgba(255,68,68,0.1)' }
                          }}
                        >
                          <Delete sx={{ fontSize: 20 }} />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>
    </Box>
  );
};

// Track Order Tab Component
const TrackOrderTab = () => {
  const [trackingId, setTrackingId] = useState('ORD-001');

  const steps = ['Order Placed', 'Processing', 'Shipped', 'Delivered'];
  const activeStep = 3; // Delivered

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold', color: '#333' }}>
        Track Your Order
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
        Real-time tracking for your orders
      </Typography>

      <Grid container spacing={5}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ p: 3 }}>
              {/* Tracking Input */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: '600' }}>
                  Enter Tracking ID
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <TextField
                    fullWidth
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="Enter your tracking ID"
                    variant="outlined"
                    size="small"
                  />
                  <Button 
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      px: 4,
                      py: 1,
                      fontWeight: '500',
                      textTransform: 'none'
                    }}
                  >
                    Track
                  </Button>
                </Box>
              </Box>

              {/* Order Status */}
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: '600' }}>
                    Order Status: 
                  </Typography>
                  <Chip 
                    label="Delivered" 
                    color="success" 
                    icon={<TaskAlt sx={{ fontSize: 16 }} />}
                    sx={{ fontWeight: '500' }}
                  />
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={100} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#4caf50',
                      borderRadius: 4
                    }
                  }}
                />
              </Box>

              {/* Stepper */}
              <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel 
                      StepIconProps={{
                        sx: {
                          color: index <= activeStep ? '#4caf50' : '#e0e0e0',
                          '& .MuiStepIcon-text': { fontWeight: 'bold' }
                        }
                      }}
                      sx={{
                        '& .MuiStepLabel-label': {
                          fontSize: '0.8rem',
                          fontWeight: index <= activeStep ? '600' : '400'
                        }
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>

              {/* Timeline Details */}
              <Box sx={{ p: 3, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: '600' }}>
                  Delivery Timeline
                </Typography>
                {[
                  { date: '15 Oct 2024, 03:30 PM', event: 'Delivered', location: 'Uttara, Dhaka', icon: <TaskAlt sx={{ color: '#4caf50' }} /> },
                  { date: '14 Oct 2024, 10:15 AM', event: 'Out for delivery', location: 'Dhaka Hub', icon: <LocalShipping sx={{ color: '#2196f3' }} /> },
                  { date: '13 Oct 2024, 02:00 PM', event: 'Processing completed', location: 'Warehouse', icon: <Pending sx={{ color: '#ff9800' }} /> },
                  { date: '12 Oct 2024, 11:30 AM', event: 'Order confirmed', location: 'Sobarbazar BD', icon: <CheckCircle sx={{ color: '#4caf50' }} /> },
                ].map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 3, pb: 2, 
                    borderBottom: index < 3 ? '1px solid #e0e0e0' : 'none' 
                  }}>
                    <Box sx={{ mr: 2, mt: 0.2 }}>
                      {item.icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: '600', mb: 0.5 }}>
                        {item.event}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666', mb: 0.5, fontSize: '0.85rem' }}>
                        {item.date}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOn sx={{ fontSize: 14, color: '#999' }} />
                        <Typography variant="body2" sx={{ color: '#999', fontSize: '0.8rem' }}>
                          {item.location}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: '600' }}>
                Order Summary
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#666', mb: 0.5, fontSize: '0.85rem' }}>
                    Tracking ID
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: '600', color: '#667eea' }}>
                    #ORD-001
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ color: '#666', mb: 0.5, fontSize: '0.85rem' }}>
                    Delivery Adress
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '0.9rem' }}>
                    House 12, Road 8, Uttara, Dhaka
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ color: '#666', mb: 0.5, fontSize: '0.85rem' }}>
                    Contact
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '0.9rem' }}>
                    +880 1234 567890
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ color: '#666', mb: 0.5, fontSize: '0.85rem' }}>
                    Items
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '0.9rem' }}>
                    3 Products
                  </Typography>
                </Box>

                <Box sx={{ pt: 2, borderTop: '1px solid #e0e0e0' }}>
                  <Typography variant="body2" sx={{ color: '#666', mb: 0.5, fontSize: '0.85rem' }}>
                    Total Amount
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                    ৳ 1,250.00
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

// Support Tab Component
const SupportTab = () => {
  const [message, setMessage] = useState('');

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold', color: '#333' }}>
        Customer Support
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
        We're here to help you 24/7
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: '600' }}>
                Create Support Ticket
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ color: '#666', mb: 0.5, fontSize: '0.85rem' }}>
                    Subject
                  </Typography>
                  <TextField
                    fullWidth
                    select
                    SelectProps={{ native: true }}
                    variant="outlined"
                    size="small"
                  >
                    <option>Order Issue</option>
                    <option>Product Quality</option>
                    <option>Delivery Problem</option>
                    <option>Payment Issue</option>
                    <option>Other</option>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ color: '#666', mb: 0.5, fontSize: '0.85rem' }}>
                    Order ID (Optional)
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ color: '#666', mb: 0.5, fontSize: '0.85rem' }}>
                    Message
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please describe your issue in detail..."
                    variant="outlined"
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    variant="contained"
                    startIcon={<Email />}
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      px: 4,
                      py: 1.2,
                      fontWeight: '500',
                      textTransform: 'none'
                    }}
                  >
                    Submit Ticket
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: '600' }}>
                Contact Support
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {[
                  { icon: <Phone sx={{ color: '#667eea', fontSize: 20 }} />, title: 'Phone Support', desc: '+880 1234 567890', action: 'Call Now' },
                  { icon: <Email sx={{ color: '#667eea', fontSize: 20 }} />, title: 'Email Support', desc: 'support@sobar.com', action: 'Send Email' },
                  { icon: <Chat sx={{ color: '#667eea', fontSize: 20 }} />, title: 'Live Chat', desc: '24/7 Available', action: 'Start Chat' },
                ].map((contact, index) => (
                  <Box key={index} sx={{ 
                    p: 2, 
                    borderRadius: 2, 
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #e0e0e0'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      {contact.icon}
                      <Typography variant="body1" sx={{ fontWeight: '600', ml: 1.5, fontSize: '0.95rem' }}>
                        {contact.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#666', mb: 1.5, fontSize: '0.85rem' }}>
                      {contact.desc}
                    </Typography>
                    <Button 
                      variant="text" 
                      size="small"
                      sx={{ 
                        color: '#667eea', 
                        textTransform: 'none',
                        fontWeight: '500',
                        fontSize: '0.8rem',
                        p: 0
                      }}
                    >
                      {contact.action} →
                    </Button>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* FAQ Quick Links */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', mt: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: '600' }}>
                Quick Help
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {['How to track my order?', 'Return policy', 'Payment methods', 'Delivery areas'].map((faq, index) => (
                  <Button 
                    key={index}
                    variant="text"
                    sx={{ 
                      justifyContent: 'flex-start',
                      color: '#666',
                      textTransform: 'none',
                      fontSize: '0.85rem',
                      py: 0.8,
                      px: 1
                    }}
                  >
                    {faq}
                  </Button>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;