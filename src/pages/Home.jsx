import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Store,
  Package,
  CreditCard,
  ShieldCheck,
  Truck,
  ArrowRight,
  Star,
  Headphones,
  Smartphone,
  Shirt,
  Home as HomeIcon,
} from "lucide-react";

function Home() {
  const categories = [
    {
      name: "Electronics",
      icon: <Smartphone size={32} />,
      color: "blue",
    },
    {
      name: "Fashion",
      icon: <Shirt size={32} />,
      color: "pink",
    },
    {
      name: "Home & Living",
      icon: <HomeIcon size={32} />,
      color: "orange",
    },
    {
      name: "Accessories",
      icon: <Headphones size={32} />,
      color: "purple",
    },
  ];

  const products = [
    {
      name: "Premium Laptop",
      vendor: "Tech World",
      price: "₹55,000",
      rating: "4.8",
      emoji: "💻",
    },
    {
      name: "Wireless Headphones",
      vendor: "Audio Hub",
      price: "₹2,500",
      rating: "4.7",
      emoji: "🎧",
    },
    {
      name: "Smart Watch",
      vendor: "Gadget Store",
      price: "₹3,999",
      rating: "4.6",
      emoji: "⌚",
    },
    {
      name: "Casual Sneakers",
      vendor: "Fashion Hub",
      price: "₹2,999",
      rating: "4.8",
      emoji: "👟",
    },
  ];

  const vendors = [
    {
      name: "Tech World",
      products: "120+ Products",
      icon: "💻",
    },
    {
      name: "Fashion Hub",
      products: "250+ Products",
      icon: "👗",
    },
    {
      name: "Home Store",
      products: "180+ Products",
      icon: "🏠",
    },
    {
      name: "Audio Hub",
      products: "90+ Products",
      icon: "🎧",
    },
  ];

  return (
    <div className="home-page">

      {/* NAVBAR */}

      <nav className="navbar">

        <Link to="/" className="logo">
          <span className="logo-icon">M</span>
          MarketGrid
        </Link>

        <div className="nav-links">
          <Link to="/" className="active">
            Home
          </Link>

          <Link to="/products">
            Products
          </Link>

          <Link to="/vendors">
            Vendors
          </Link>

          <Link to="/orders">
            Orders
          </Link>
        </div>

        <div className="nav-actions">

          <button className="icon-button">
            <Search size={20} />
          </button>

          <Link to="/cart" className="icon-button cart-button">
            <ShoppingCart size={21} />
            <span className="cart-count">0</span>
          </Link>

          <Link to="/login" className="login-link">
            Login
          </Link>

          <Link to="/register" className="register-link">
            Register
          </Link>

        </div>

      </nav>


      {/* HERO */}

      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">
            ✨ Everything you need, all in one place
          </div>

          <h1>
            Your Marketplace.
            <br />

            <span>Unlimited Choices.</span>
          </h1>

          <p>
            Discover amazing products from multiple trusted
            vendors. Shop smarter, compare products, and enjoy
            a seamless shopping experience with MarketGrid.
          </p>

          <div className="hero-buttons">

            <Link to="/products" className="primary-button">
              Explore Products
              <ArrowRight size={19} />
            </Link>

            <Link to="/register" className="secondary-button">
              Become a Vendor
            </Link>

          </div>

          <div className="hero-stats">

            <div>
              <strong>500+</strong>
              <span>Products</span>
            </div>

            <div>
              <strong>50+</strong>
              <span>Vendors</span>
            </div>

            <div>
              <strong>1K+</strong>
              <span>Customers</span>
            </div>

          </div>

        </div>


        {/* HERO VISUAL */}

        <div className="hero-visual">

          <div className="floating-card card-one">
            🛍️
            <div>
              <strong>500+ Products</strong>
              <small>Ready to explore</small>
            </div>
          </div>

          <div className="main-shopping-card">

            <div className="shopping-circle">
              🛒
            </div>

            <h3>Shop Everything</h3>

            <p>
              Multiple vendors.
              One marketplace.
            </p>

            <div className="mini-products">
              <span>💻</span>
              <span>👟</span>
              <span>🎧</span>
              <span>⌚</span>
            </div>

          </div>

          <div className="floating-card card-two">
            ⭐
            <div>
              <strong>4.8 Rating</strong>
              <small>Trusted marketplace</small>
            </div>
          </div>

        </div>

      </section>


      {/* CATEGORIES */}

      <section className="section">

        <div className="section-heading">

          <div>
            <span>EXPLORE</span>
            <h2>Shop by Category</h2>
          </div>

          <Link to="/products">
            View All <ArrowRight size={17} />
          </Link>

        </div>

        <div className="category-grid">

          {categories.map((category) => (

            <Link
              to="/products"
              className={`category-card ${category.color}`}
              key={category.name}
            >

              <div className="category-icon">
                {category.icon}
              </div>

              <h3>{category.name}</h3>

              <p>Explore collection</p>

              <ArrowRight size={18} />

            </Link>

          ))}

        </div>

      </section>


      {/* FEATURED PRODUCTS */}

      <section className="section products-section">

        <div className="section-heading">

          <div>
            <span>TOP PICKS</span>
            <h2>Featured Products</h2>
          </div>

          <Link to="/products">
            View All <ArrowRight size={17} />
          </Link>

        </div>

        <div className="product-grid">

          {products.map((product) => (

            <div className="product-card" key={product.name}>

              <div className="product-image">

                <span className="product-emoji">
                  {product.emoji}
                </span>

                <button className="heart-button">
                  ♡
                </button>

              </div>

              <div className="product-info">

                <span className="vendor-name">
                  {product.vendor}
                </span>

                <h3>{product.name}</h3>

                <div className="rating">
                  <Star size={15} fill="currentColor" />
                  {product.rating}
                </div>

                <div className="product-bottom">

                  <strong>{product.price}</strong>

                  <button className="add-cart">
                    <ShoppingCart size={17} />
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* VENDORS */}

      <section className="vendor-section">

        <div className="section-heading">

          <div>
            <span>SELL WITH US</span>
            <h2>Popular Vendors</h2>
          </div>

          <Link to="/vendors">
            View Vendors <ArrowRight size={17} />
          </Link>

        </div>

        <div className="vendor-grid">

          {vendors.map((vendor) => (

            <div className="vendor-card" key={vendor.name}>

              <div className="vendor-avatar">
                {vendor.icon}
              </div>

              <div>
                <h3>{vendor.name}</h3>
                <p>{vendor.products}</p>

                <div className="vendor-rating">
                  ⭐ 4.8
                </div>
              </div>

              <ArrowRight size={20} />

            </div>

          ))}

        </div>

      </section>


      {/* HOW MARKETGRID WORKS */}

      <section className="how-section">

        <div className="center-heading">

          <span>HOW IT WORKS</span>

          <h2>
            Everything You Need.
            <br />
            <b>One Simple Marketplace.</b>
          </h2>

        </div>

        <div className="how-grid">

          <div className="how-card">
            <div className="how-icon">
              <Store />
            </div>

            <h3>Multiple Vendors</h3>

            <p>
              Independent vendors can register,
              list products, and manage inventory.
            </p>
          </div>


          <div className="how-card">
            <div className="how-icon">
              <Package />
            </div>

            <h3>Easy Ordering</h3>

            <p>
              Customers can add products from
              multiple vendors into one order.
            </p>
          </div>


          <div className="how-card">
            <div className="how-icon">
              <CreditCard />
            </div>

            <h3>Secure Payments</h3>

            <p>
              Simple and secure checkout experience
              for every customer.
            </p>
          </div>


          <div className="how-card">
            <div className="how-icon">
              <ShieldCheck />
            </div>

            <h3>JWT Security</h3>

            <p>
              Secure authentication protects
              customer and vendor accounts.
            </p>
          </div>

        </div>

      </section>


      {/* VENDOR CTA */}

      <section className="vendor-cta">

        <div>

          <span>GROW YOUR BUSINESS</span>

          <h2>
            Are you a vendor?
          </h2>

          <p>
            Join MarketGrid and reach customers
            through our multi-vendor marketplace.
          </p>

        </div>

        <Link to="/register" className="cta-button">
          Become a Vendor
          <ArrowRight size={19} />
        </Link>

      </section>


      {/* FEATURES */}

      <section className="trust-section">

        <div>
          <Truck />
          <h3>Fast Delivery</h3>
          <p>Quick and reliable delivery</p>
        </div>

        <div>
          <ShieldCheck />
          <h3>Secure Shopping</h3>
          <p>Your data stays protected</p>
        </div>

        <div>
          <CreditCard />
          <h3>Easy Payments</h3>
          <p>Convenient checkout options</p>
        </div>

        <div>
          <User />
          <h3>Customer Support</h3>
          <p>We're here to help</p>
        </div>

      </section>


      {/* FOOTER */}

      <footer className="footer">

        <div className="footer-main">

          <div className="footer-brand">

            <div className="logo">
              <span className="logo-icon">M</span>
              MarketGrid
            </div>

            <p>
              One marketplace.
              Unlimited possibilities.
            </p>

          </div>

          <div>
            <h4>Marketplace</h4>
            <Link to="/products">Products</Link>
            <Link to="/vendors">Vendors</Link>
            <Link to="/orders">Orders</Link>
          </div>

          <div>
            <h4>Account</h4>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/cart">Cart</Link>
          </div>

          <div>
            <h4>Company</h4>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
            <a href="#privacy">Privacy</a>
          </div>

        </div>

        <div className="footer-bottom">
          © 2026 MarketGrid Commerce. All rights reserved.
        </div>

      </footer>

    </div>
  );
}

export default Home;