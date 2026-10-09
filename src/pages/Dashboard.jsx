import { useState } from "react";
import { BadgeCheck, Bot, Box, CreditCard, Heart, Home, LayoutGrid, LogOut, Menu, MessageCircle, Package, Search, Send, Settings, ShoppingCart, Star, Store, User, WalletCards, X } from "lucide-react";

const products = [
  { id: 1, name: "Nimbus Noise-Canceling Headphones", vendor: "Auralab", price: 129, category: "Audio", color: "#e6efff", icon: "◉", rating: 4.9 },
  { id: 2, name: "Kanso Ceramic Pour-Over Set", vendor: "Kanso Home", price: 54, category: "Home", color: "#fff0da", icon: "◌", rating: 4.8 },
  { id: 3, name: "Field Notes Everyday Backpack", vendor: "Northline", price: 88, category: "Travel", color: "#e2f3e9", icon: "▣", rating: 4.7 },
  { id: 4, name: "Lumen Desk Light", vendor: "Forma Studio", price: 72, category: "Workspace", color: "#f3e6ff", icon: "☼", rating: 4.9 },
];

const navGroups = [
  { label: "Workspace", items: [["home", "Home", Home], ["products", "Products", LayoutGrid], ["orders", "Orders", Package], ["vendors", "Vendors", Store]] },
  { label: "Your account", items: [["cart", "Cart", ShoppingCart], ["wishlist", "Wishlist", Heart], ["payments", "Payments", WalletCards], ["reviews", "Ratings & reviews", Star], ["profile", "Profile", User]] },
];

function UserAvatar({ user }) {
  return <div className="user-avatar">{(user.name || "U").slice(0, 1).toUpperCase()}</div>;
}

export default function Dashboard() {
  const user = JSON.parse(sessionStorage.getItem("marketgrid_user") || '{"name":"User","email":""}');
  const [activeSection, setActiveSection] = useState("home");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([{ from: "bot", text: "Hi! I’m Grid, your MarketGrid shopping assistant. What are you looking for today?" }]);
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    sessionStorage.removeItem("marketgrid_session");
    sessionStorage.removeItem("marketgrid_user");
    sessionStorage.removeItem("marketgrid_role");
    window.location.href = "/login";
  };
  const addToCart = (product) => setCart((current) => current.includes(product.id) ? current : [...current, product.id]);
  const toggleWishlist = (product) => setWishlist((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id]);
  const sendMessage = (event) => {
    event.preventDefault();
    const text = chatInput.trim();
    if (!text) return;
    setMessages((current) => [...current, { from: "user", text }, { from: "bot", text: "I can help compare products, find vendors, track orders, or build a cart for you." }]);
    setChatInput("");
  };
  const filteredProducts = products.filter((product) => `${product.name} ${product.vendor} ${product.category}`.toLowerCase().includes(search.toLowerCase()));
  const activeTitle = navGroups.flatMap((group) => group.items).find(([id]) => id === activeSection)?.[1] || "Home";

  return <div className="marketplace-app">
    <aside className={`marketplace-sidebar ${menuOpen ? "is-open" : ""}`}>
      <div className="marketplace-logo"><span className="brand-icon">M</span><strong>MarketGrid</strong></div>
      <div className="sidebar-scroll">{navGroups.map((group) => <div className="nav-group" key={group.label}>
        <span className="nav-label">{group.label}</span>
        {group.items.map(([id, label, Icon]) => <button key={id} className={`market-nav-item ${activeSection === id ? "active" : ""}`} onClick={() => { setActiveSection(id); setMenuOpen(false); }}><Icon size={18} /><span>{label}</span>{id === "cart" && cart.length > 0 && <b>{cart.length}</b>}</button>)}
      </div>)}</div>
      <div className="sidebar-footer"><button className={`market-nav-item ${activeSection === "settings" ? "active" : ""}`} onClick={() => { setActiveSection("settings"); setMenuOpen(false); }}><Settings size={18} /><span>Settings</span></button><button className="market-logout" onClick={logout}><LogOut size={18} /> Sign out</button></div>
    </aside>
    <main className="market-main">
      <header className="market-topbar"><button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">{menuOpen ? <X /> : <Menu />}</button><div className="breadcrumb"><span>MarketGrid</span><strong>/</strong><b>{activeTitle}</b></div><div className="topbar-actions"><button className="chat-trigger" onClick={() => setChatOpen(true)}><MessageCircle size={18} /> Ask Grid</button><button className="topbar-user" onClick={() => setActiveSection("profile")}><UserAvatar user={user} /><span>{user.name || "User"}</span></button></div></header>
      <div className="market-content">
        {activeSection === "home" && <HomeSection user={user} visibleProducts={filteredProducts} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} setActiveSection={setActiveSection} />}
        {activeSection === "products" && <ProductsSection visibleProducts={filteredProducts} search={search} setSearch={setSearch} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />}
        {activeSection === "orders" && <OrdersSection />}
        {activeSection === "vendors" && <VendorsSection />}
        {activeSection === "cart" && <CartSection cartProducts={products.filter((product) => cart.includes(product.id))} setActiveSection={setActiveSection} />}
        {activeSection === "wishlist" && <WishlistSection savedProducts={products.filter((product) => wishlist.includes(product.id))} addToCart={addToCart} />}
        {activeSection === "payments" && <PaymentsSection />}
        {activeSection === "reviews" && <ReviewsSection />}
        {activeSection === "profile" && <ProfileSection user={user} />}
        {activeSection === "settings" && <SettingsSection user={user} />}
      </div>
    </main>
    <button className="floating-chat" onClick={() => setChatOpen(true)} aria-label="Open AI shopping assistant"><Bot size={22} /><span>AI assistant</span></button>
    {chatOpen && <div className="chat-window"><div className="chat-header"><div><Bot size={19} /><strong>Grid AI assistant</strong></div><button onClick={() => setChatOpen(false)} aria-label="Close chat"><X size={18} /></button></div><div className="chat-messages">{messages.map((message, index) => <div key={index} className={`chat-message ${message.from}`}>{message.text}</div>)}</div><form className="chat-form" onSubmit={sendMessage}><input value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder="Ask about products..." /><button aria-label="Send message"><Send size={17} /></button></form></div>}
  </div>;
}

function ProductCard({ product, addToCart, wishlist, toggleWishlist }) {
  return <article className="product-card"><div className="product-art" style={{ background: product.color }}><span>{product.icon}</span><button className={`heart-button ${wishlist.includes(product.id) ? "liked" : ""}`} onClick={() => toggleWishlist(product)} aria-label="Toggle wishlist"><Heart size={17} fill={wishlist.includes(product.id) ? "currentColor" : "none"} /></button></div><div className="product-details"><span className="product-category">{product.category}</span><h3>{product.name}</h3><p>{product.vendor}</p><div className="product-bottom"><strong>${product.price}</strong><span><Star size={14} fill="currentColor" /> {product.rating}</span></div><button className="add-cart" onClick={() => addToCart(product)}><ShoppingCart size={16} /> Add to cart</button></div></article>;
}

function HomeSection({ user, visibleProducts, addToCart, wishlist, toggleWishlist, setActiveSection }) {
  return <><section className="welcome-banner"><div><span className="section-kicker">Your marketplace, organized</span><h1>Good morning, {user.name?.split(" ")[0] || "there"}.</h1><p>Find thoughtful products from independent vendors, all in one trusted place.</p></div><div className="banner-mark">✦</div></section><div className="dashboard-heading"><div><span className="section-kicker">Curated for you</span><h2>Popular this week</h2></div><button className="text-action" onClick={() => setActiveSection("products")}>View all products <span>→</span></button></div><div className="product-grid">{visibleProducts.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />)}</div><section className="discovery-row"><div><span className="section-kicker">Need a hand?</span><h2>Tell Grid what you need.</h2><p>Our AI assistant can narrow down products, vendors, and gifts in seconds.</p><button className="dark-action" onClick={() => document.querySelector(".floating-chat")?.click()}>Chat with Grid <MessageCircle size={16} /></button></div><div className="discovery-icon"><Bot size={54} /></div></section></>;
}

function ProductsSection({ visibleProducts, search, setSearch, addToCart, wishlist, toggleWishlist }) {
  return <><PageHeading kicker="Explore the collection" title="Products" text="Quality goods selected from independent vendors." /><div className="search-box"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" /></div><div className="filter-row"><span>All products</span><span>Top rated</span><span>New arrivals</span></div><div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />)}</div>{visibleProducts.length === 0 && <EmptyState text="No products match that search." />}</>;
}

function OrdersSection() { return <><PageHeading kicker="Your purchases" title="Orders" text="Track every order from checkout to delivery." /><div className="order-list"><OrderRow number="#MG-10482" vendor="Northline" date="Arriving tomorrow" status="In transit" amount="$88.00" /><OrderRow number="#MG-10391" vendor="Kanso Home" date="Delivered Aug 18" status="Delivered" amount="$54.00" /><OrderRow number="#MG-10277" vendor="Auralab" date="Delivered Aug 04" status="Delivered" amount="$129.00" /></div></>; }
function OrderRow({ number, vendor, date, status, amount }) { return <div className="order-row"><div className="order-icon"><Box size={19} /></div><div className="order-info"><strong>{number}</strong><span>{vendor} · {date}</span></div><span className={`order-status ${status === "Delivered" ? "complete" : "moving"}`}>{status}</span><strong className="order-amount">{amount}</strong><button className="row-action" onClick={() => window.alert(`Order ${number} is ${status.toLowerCase()}.`)}>View details</button></div>; }
function VendorsSection() { return <><PageHeading kicker="Independent makers" title="Vendors" text="Meet the people and studios behind your favorite finds." /><div className="vendor-grid"><VendorCard name="Northline" detail="Travel goods · Portland" color="#e2f3e9" initials="N" /><VendorCard name="Kanso Home" detail="Ceramics · Kyoto" color="#fff0da" initials="K" /><VendorCard name="Auralab" detail="Audio · Copenhagen" color="#e6efff" initials="A" /><VendorCard name="Forma Studio" detail="Workspace · Berlin" color="#f3e6ff" initials="F" /></div></>; }
function VendorCard({ name, detail, color, initials }) { return <article className="vendor-card"><div className="vendor-avatar" style={{ background: color }}>{initials}</div><div><h3>{name}</h3><p>{detail}</p><span><Star size={14} fill="currentColor" /> 4.8 · <b>Trusted vendor</b></span></div><button onClick={() => window.alert(`Opening ${name}.`)}>Visit store →</button></article>; }
function CartSection({ cartProducts, setActiveSection }) { const total = cartProducts.reduce((sum, product) => sum + product.price, 0); return <><PageHeading kicker="Ready when you are" title="Your cart" text="Review your items before a secure checkout." />{cartProducts.length ? <div className="cart-layout"><div className="order-list">{cartProducts.map((product) => <OrderRow key={product.id} number={product.name} vendor={product.vendor} date="Qty 1" status="Ready" amount={`$${product.price}.00`} />)}</div><aside className="summary-card"><span>Order summary</span><h3>${total}.00</h3><p>Shipping and taxes calculated at checkout.</p><button className="dark-action" onClick={() => window.alert("Checkout is ready. Payment confirmation will be connected next.")}>Continue to payment <CreditCard size={16} /></button></aside></div> : <EmptyState text="Your cart is waiting for something good." action="Browse products" onClick={() => setActiveSection("products")} />}</>; }
function WishlistSection({ savedProducts, addToCart }) { return <><PageHeading kicker="Saved for later" title="Wishlist" text="Keep an eye on the things you love." />{savedProducts.length ? <div className="product-grid">{savedProducts.map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} wishlist={savedProducts.map((item) => item.id)} toggleWishlist={() => {}} />)}</div> : <EmptyState text="Save products here when you find something special." />}</>; }
function PaymentsSection() { return <><PageHeading kicker="Secure checkout" title="Payments" text="Manage payment methods and billing preferences." /><div className="payment-layout"><div className="payment-card dark-payment"><div><span>Primary card</span><strong>•••• 4826</strong></div><CreditCard size={31} /></div><div className="settings-panel"><div><strong>Visa ending in 4826</strong><span>Expires 09/28 · Default</span></div><BadgeCheck size={20} /></div><button className="outline-action" onClick={() => window.alert("Payment method setup opened.")}>+ Add payment method</button></div></>; }
function ReviewsSection() { return <><PageHeading kicker="Your voice matters" title="Ratings & reviews" text="Help other shoppers make confident choices." /><div className="review-summary"><div><strong>4.8</strong><span><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /></span><p>Based on 12 reviews</p></div><button className="dark-action" onClick={() => window.alert("Review form opened.")} >Write a review <Star size={16} /></button></div><div className="review-list"><Review name="Maya R." product="Nimbus Noise-Canceling Headphones" text="Beautifully balanced sound and they arrived much faster than expected." /><Review name="Jon P." product="Kanso Ceramic Pour-Over Set" text="The finish is gorgeous. It has become part of my morning ritual." /></div></>; }
function Review({ name, product, text }) { return <article className="review-card"><div className="review-avatar">{name[0]}</div><div><strong>{name}</strong><span className="review-stars"><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /></span><p>{text}</p><small>Reviewed {product}</small></div></article>; }
function ProfileSection({ user }) { return <><PageHeading kicker="Account settings" title="Profile" text="Keep your personal details and preferences up to date." /><div className="profile-card"><UserAvatar user={user} /><div><h2>{user.name || "User"}</h2><p>{user.email || "No email available"}</p><span className="verified-label"><BadgeCheck size={15} /> Verified account</span></div><button className="outline-action" onClick={() => window.alert("Profile editor opened.")}>Edit profile</button></div><div className="settings-panel preference-row"><div><strong>Personalized recommendations</strong><span>Let Grid tailor the marketplace to your interests.</span></div><input type="checkbox" defaultChecked /></div></>; }
function PageHeading({ kicker, title, text }) { return <div className="page-heading"><div><span className="section-kicker">{kicker}</span><h1>{title}</h1><p>{text}</p></div></div>; }
function EmptyState({ text, action, onClick }) { return <div className="empty-state"><Heart size={24} /><p>{text}</p>{action && <button className="dark-action" onClick={onClick}>{action}</button>}</div>; }
function SettingsSection({ user }) { return <><PageHeading kicker="Preferences" title="Settings" text="Control your MarketGrid account and shopping preferences." /><div className="settings-list"><div className="settings-panel"><div><strong>Account email</strong><span>{user.email || "No email available"}</span></div><button className="outline-action" onClick={() => window.alert("Email change flow opened.")}>Change</button></div><div className="settings-panel"><div><strong>Email notifications</strong><span>Receive order updates and curated recommendations.</span></div><input type="checkbox" defaultChecked /></div><div className="settings-panel"><div><strong>Two-step verification</strong><span>Protect your account with an additional security check.</span></div><button className="outline-action" onClick={() => window.alert("Two-step verification setup opened.")}>Enable</button></div></div></>; }
