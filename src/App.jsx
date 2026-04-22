import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import TopBar from './components/Header/TopBar'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Hero from './components/Home/Hero'
import FruitImportance from './components/Home/FruitImportance'
import BestSale from './components/Home/BestSale'
import FlashDeals from './components/Home/FlashDeals'
import FeatureBanners from './components/Home/FeatureBanners'
import FeaturedProducts from './components/Home/FeaturedProducts'
import Newsletter from './components/Home/Newsletter'
import LatestBlog from './components/Home/LatestBlog'
import NeedHelp from './components/Home/NeedHelp'
import ContactUs from './pages/ContactUs/ContactUs'
import AboutUs from './pages/AboutUs/AboutUs'
import ShopFullWidth from './pages/ShopFullWidth/ShopFullWidth'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import Wishlist from './pages/Wishlist/Wishlist'
import BlogGrid from './pages/BlogGrid/BlogGrid'
import BlogDetailsFullWidth from './pages/BlogDetailsFullWidth/BlogDetailsFullWidth'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import MyAccount from './pages/MyAccount/MyAccount'
import AdminDashboard from './pages/Admin/AdminDashboard'
import ProductEdit from './pages/Admin/ProductEdit'
import OrderSuccess from './pages/OrderSuccess/OrderSuccess'
import PrivateRoute from './components/PrivateRoute'

const HomePage = () => (
  <>
    <Hero />
    <FruitImportance />
    <BestSale />
    <FlashDeals />
    <FeatureBanners />
    <FeaturedProducts />
    <LatestBlog />
    <Newsletter />
    <NeedHelp />
  </>
)

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app">
      {!isAdminRoute && <TopBar />}
      {!isAdminRoute && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/shop" element={<ShopFullWidth />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/blog-grid" element={<BlogGrid />} />
          <Route path="/blog-details" element={<BlogDetailsFullWidth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  )
}

export default App
