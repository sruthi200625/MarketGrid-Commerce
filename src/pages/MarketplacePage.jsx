import { ArrowLeft, ArrowRight, ShoppingBag, Store, Package, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const featureCards = [
  {
    icon: "🛍️",
    title: "Curated Collections",
    text: "Browse products hand-picked for quality, trending demand, and exceptional value.",
  },
  {
    icon: "📦",
    title: "Fast Fulfillment",
    text: "Track order progress from checkout to delivery with transparent vendor updates.",
  },
  {
    icon: "💳",
    title: "Secure Checkout",
    text: "Enjoy a smooth, protected transaction flow designed for trusted purchasing.",
  },
];

export default function MarketplacePage({
  title,
  subtitle,
  eyebrow,
}) {
  return (
    <div className="marketplace-page">
      <div className="marketplace-shell">
        <div className="marketplace-header">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>

          <Link to="/" className="back-link">
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>

        <div className="marketplace-grid">
          {featureCards.map((card) => (
            <div className="marketplace-card" key={card.title}>
              <div className="marketplace-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>

        <div className="marketplace-cta">
          <h2>Ready to explore more?</h2>
          <p>
            Continue discovering premium products, trusted vendors, and seamless shopping experiences
            tailored for modern digital commerce.
          </p>

          <div className="marketplace-actions">
            <Link to="/products" className="primary-button">
              Explore Marketplace
              <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="secondary-button">
              Continue to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
