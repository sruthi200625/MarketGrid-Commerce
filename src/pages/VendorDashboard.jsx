import { useState } from "react";
import { BarChart3, Box, CreditCard, LayoutDashboard, LogOut, Menu, PackagePlus, Settings, Store, UserRound, X } from "lucide-react";

const vendorNav = [
  ["overview", "Overview", LayoutDashboard],
  ["products", "My products", Box],
  ["orders", "Orders", Store],
  ["payouts", "Payouts", CreditCard],
  ["profile", "Store profile", UserRound],
];

export default function VendorDashboard() {
  const vendor = JSON.parse(sessionStorage.getItem("marketgrid_user") || '{"name":"Vendor","storeName":"My Store"}');
  const [active, setActive] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const logout = () => {
    sessionStorage.removeItem("marketgrid_session");
    sessionStorage.removeItem("marketgrid_user");
    sessionStorage.removeItem("marketgrid_role");
    window.location.href = "/login/vendor";
  };

  return <div className="marketplace-app vendor-app">
    <aside className={`marketplace-sidebar ${menuOpen ? "is-open" : ""}`}>
      <div className="marketplace-logo"><span className="brand-icon">M</span><strong>MarketGrid</strong></div>
      <div className="vendor-mode-badge"><Store size={16} /> Vendor workspace</div>
      <div className="sidebar-scroll"><span className="nav-label">Manage your store</span>{vendorNav.map(([id, label, Icon]) => <button key={id} className={`market-nav-item ${active === id ? "active" : ""}`} onClick={() => { setActive(id); setMenuOpen(false); }}><Icon size={18} /><span>{label}</span></button>)}</div>
      <div className="sidebar-footer"><button className={`market-nav-item ${active === "settings" ? "active" : ""}`} onClick={() => setActive("settings")}><Settings size={18} /><span>Settings</span></button><button className="market-logout" onClick={logout}><LogOut size={18} /> Sign out</button></div>
    </aside>
    <main className="market-main">
      <header className="market-topbar"><button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">{menuOpen ? <X /> : <Menu />}</button><div className="breadcrumb"><span>Vendor workspace</span><strong>/</strong><b>{active === "overview" ? "Overview" : vendorNav.find(([id]) => id === active)?.[1] || "Settings"}</b></div><div className="topbar-user"><div className="user-avatar">{(vendor.name || "V")[0]}</div><span>{vendor.storeName || "My Store"}</span></div></header>
      <div className="market-content">{active === "overview" && <Overview vendor={vendor} setActive={setActive} />}{active === "products" && <Products />}{active === "orders" && <Orders />}{active === "payouts" && <Payouts />}{active === "profile" && <StoreProfile vendor={vendor} />}{active === "settings" && <VendorSettings />}</div>
    </main>
  </div>;
}

function Overview({ vendor, setActive }) { return <><section className="vendor-hero"><div><span className="section-kicker">Vendor control center</span><h1>Welcome, {vendor.name?.split(" ")[0] || "vendor"}.</h1><p>Manage your catalog, fulfill orders, and grow your store from one focused workspace.</p></div><button className="dark-action" onClick={() => setActive("products")}><PackagePlus size={16} /> Add product</button></section><div className="vendor-stat-grid"><Stat label="Revenue this month" value="$4,280" change="+18.4%" /><Stat label="Orders to fulfill" value="24" change="6 new today" /><Stat label="Store visits" value="1,842" change="+12.1%" /><Stat label="Average rating" value="4.9" change="128 reviews" /></div><div className="vendor-panels"><div className="vendor-panel"><div className="vendor-panel-heading"><div><span className="section-kicker">Performance</span><h2>Store momentum</h2></div><BarChart3 size={21} /></div><div className="chart-bars"><i style={{ height: "38%" }} /><i style={{ height: "58%" }} /><i style={{ height: "46%" }} /><i style={{ height: "72%" }} /><i style={{ height: "64%" }} /><i style={{ height: "88%" }} /><i style={{ height: "78%" }} /></div><div className="chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div><div className="vendor-panel"><div className="vendor-panel-heading"><div><span className="section-kicker">Action needed</span><h2>Fulfillment queue</h2></div></div><div className="queue-row"><Box size={17} /><span>Pack 6 new orders</span><b>Today</b></div><div className="queue-row"><CreditCard size={17} /><span>Review payout details</span><b>2 tasks</b></div><div className="queue-row"><Store size={17} /><span>Complete store profile</span><b>80%</b></div></div></div></>; }
function Stat({ label, value, change }) { return <div className="vendor-stat"><span>{label}</span><strong>{value}</strong><small>{change}</small></div>; }
function Products() { return <><PageHeading kicker="Catalog management" title="My products" text="Add, edit, and monitor everything in your store." /><div className="vendor-toolbar"><button className="dark-action" onClick={() => window.alert("New product form opened.")}><PackagePlus size={16} /> Add new product</button><span>4 active products</span></div><div className="vendor-product-list"><VendorProduct name="Nimbus Headphones" category="Audio" stock="24 in stock" price="$129" /><VendorProduct name="Kanso Pour-Over Set" category="Home" stock="12 in stock" price="$54" /><VendorProduct name="Field Notes Backpack" category="Travel" stock="8 in stock" price="$88" /></div></>; }
function VendorProduct({ name, category, stock, price }) { return <div className="vendor-product"><div className="vendor-product-art"><Box size={20} /></div><div><strong>{name}</strong><span>{category} · {stock}</span></div><b>{price}</b><button className="outline-action" onClick={() => window.alert(`Editing ${name}.`)}>Edit</button></div>; }
function Orders() { return <><PageHeading kicker="Store operations" title="Orders" text="Review and fulfill your customer orders." /><div className="vendor-product-list"><VendorOrder number="#MG-10482" customer="Maya R." status="Ready to pack" amount="$88.00" /><VendorOrder number="#MG-10477" customer="Jon P." status="Processing" amount="$129.00" /><VendorOrder number="#MG-10461" customer="Amelia C." status="Shipped" amount="$54.00" /></div></>; }
function VendorOrder({ number, customer, status, amount }) { return <div className="vendor-product"><div className="vendor-product-art"><Store size={20} /></div><div><strong>{number}</strong><span>{customer} · {status}</span></div><b>{amount}</b><button className="outline-action" onClick={() => window.alert(`Order ${number} details opened.`)}>View</button></div>; }
function Payouts() { return <><PageHeading kicker="Vendor finances" title="Payouts" text="Track your earnings and payment details." /><div className="vendor-stat-grid"><Stat label="Available balance" value="$1,842" change="Ready to withdraw" /><Stat label="Next payout" value="$2,438" change="Sep 30, 2026" /></div><div className="settings-panel"><div><strong>Bank account ending in 2048</strong><span>Verified payout method · Weekly schedule</span></div><button className="outline-action" onClick={() => window.alert("Payout settings opened.")}>Manage</button></div></>; }
function StoreProfile({ vendor }) { return <><PageHeading kicker="Public presence" title="Store profile" text="Show customers what makes your store worth visiting." /><div className="profile-card"><div className="vendor-avatar" style={{ background: "#e0f1e9" }}>{(vendor.storeName || "S")[0]}</div><div><h2>{vendor.storeName || "My Store"}</h2><p>{vendor.email || "vendor@example.com"}</p><span className="verified-label">Verified vendor</span></div><button className="outline-action" onClick={() => window.alert("Store profile editor opened.")}>Edit profile</button></div></>; }
function VendorSettings() { return <><PageHeading kicker="Workspace preferences" title="Settings" text="Configure your vendor workspace and store alerts." /><div className="settings-list"><div className="settings-panel"><div><strong>New order alerts</strong><span>Notify me when a customer places an order.</span></div><input type="checkbox" defaultChecked /></div><div className="settings-panel"><div><strong>Store visibility</strong><span>Your store is visible in the MarketGrid vendor directory.</span></div><input type="checkbox" defaultChecked /></div></div></>; }
function PageHeading({ kicker, title, text }) { return <div className="page-heading"><div><span className="section-kicker">{kicker}</span><h1>{title}</h1><p>{text}</p></div></div>; }
