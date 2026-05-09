/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constants/constants";
const plans = [
  {
    id: "silver",
    name: "Silver",
    tagline: "Perfect for getting started",
    monthlyPrice: 99,
    yearlyPrice: 79,
    badge: null,
    gradient: "linear-gradient(135deg, #94a3b8, #cbd5e1, #e2e8f0)",
    accentColor: "#94a3b8",
    glowColor: "rgba(148, 163, 184, 0.35)",
    borderColor: "rgba(148, 163, 184, 0.5)",
    icon: "🥈",
    features: [
      { text: "100 Connection Requests / Month", included: true },
      { text: "View up to 50 Profiles / Day", included: true },
      { text: "Basic Profile Boost", included: true },
      { text: "Standard Matching Algorithm", included: true },
      { text: "Email Support", included: true },
      { text: "Advanced Filters & Search", included: false },
      { text: "Priority in Search Results", included: false },
      { text: "Exclusive Gold Badge", included: false },
      { text: "AI-Powered Match Suggestions", included: false },
      { text: "Dedicated Account Manager", included: false },
    ],
  },
  {
    id: "gold",
    name: "Gold",
    tagline: "For serious developers",
    monthlyPrice: 199,
    yearlyPrice: 159,
    badge: "Most Popular",
    gradient: "linear-gradient(135deg, #f59e0b, #fbbf24, #fde68a)",
    accentColor: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.4)",
    borderColor: "rgba(245, 158, 11, 0.6)",
    icon: "🥇",
    features: [
      { text: "Unlimited Connection Requests", included: true },
      { text: "View Unlimited Profiles", included: true },
      { text: "Advanced Profile Boost", included: true },
      { text: "AI-Powered Matching Algorithm", included: true },
      { text: "Priority 24/7 Support", included: true },
      { text: "Advanced Filters & Search", included: true },
      { text: "Priority in Search Results", included: true },
      { text: "Exclusive Gold Badge", included: true },
      { text: "AI-Powered Match Suggestions", included: true },
      { text: "Dedicated Account Manager", included: true },
    ],
  },
];

const Premium = () => {
  const [billing, setBilling] = useState("monthly");
  const [isUserPremium, SetIsUserPremium] = useState(false)

  const verifyPremium = async()=> {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials : true
    })

    if(res.data.isPremium){
      SetIsUserPremium(true)
    }
  }
  useEffect(()=> {
    verifyPremium();
  },[])



 const handleBuyClick = async (type) => {
  const { data } = await axios.post(
    `${BASE_URL}/payment/create`,
    {
      membershipType: type,
    },
    {
      withCredentials: true,
    }
  );
  console.log(data);
  const { _id, orderId, amount, currency, key, notes } = data;
 
  const options = {
    key,
    amount,
    currency,
    name: "Devmatch",
    description: `${notes.membershipType} membership`,
    order_id: orderId,

    prefill: {
      name: `${notes.firstName} ${notes.lastName}`,
      email: notes.emailId,
    },

    theme: {
      color: "#F37254",
    },

    handler: async function (response) {
      console.log("Payment success:", response);
      console.log("Payment DB id:", _id);
       await verifyPremium();
    },

  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

  return isUserPremium ? (
    "You're are already a premium user" ) : (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        .premium-wrapper {
          min-height: 100vh;
          background: #090b12;
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 60px 20px 80px;
          position: relative;
          overflow: hidden;
        }

        /* Background ambient blobs */
        .premium-wrapper::before {
          content: '';
          position: fixed;
          top: -200px;
          left: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .premium-wrapper::after {
          content: '';
          position: fixed;
          bottom: -150px;
          right: -150px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(148,163,184,0.07) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Header ── */
        .premium-header {
          text-align: center;
          max-width: 600px;
          margin-bottom: 48px;
          position: relative;
          z-index: 1;
        }

        .premium-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #f59e0b;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.25);
          padding: 6px 16px;
          border-radius: 50px;
          margin-bottom: 20px;
        }

        .premium-title {
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 800;
          color: #f8fafc;
          line-height: 1.15;
          margin: 0 0 16px;
          letter-spacing: -0.5px;
        }

        .premium-title span {
          background: linear-gradient(135deg, #f59e0b, #fde68a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .premium-subtitle {
          font-size: 1.05rem;
          color: #94a3b8;
          line-height: 1.7;
          margin: 0;
        }

        /* ── Billing Toggle ── */
        .billing-toggle-wrapper {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 52px;
          position: relative;
          z-index: 1;
        }

        .billing-label {
          font-size: 0.9rem;
          color: #94a3b8;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s;
        }

        .billing-label.active {
          color: #f8fafc;
          font-weight: 600;
        }

        .billing-toggle {
          position: relative;
          width: 52px;
          height: 28px;
          background: rgba(255,255,255,0.07);
          border-radius: 50px;
          border: 1px solid rgba(255,255,255,0.12);
          cursor: pointer;
          transition: background 0.3s;
        }

        .billing-toggle.yearly {
          background: rgba(245,158,11,0.2);
          border-color: rgba(245,158,11,0.4);
        }

        .billing-knob {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #94a3b8;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.3s;
        }

        .billing-toggle.yearly .billing-knob {
          transform: translateX(24px);
          background: #f59e0b;
        }

        .billing-save-badge {
          font-size: 11px;
          font-weight: 700;
          color: #10b981;
          background: rgba(16,185,129,0.12);
          border: 1px solid rgba(16,185,129,0.3);
          padding: 3px 10px;
          border-radius: 50px;
          letter-spacing: 0.5px;
        }

        /* ── Cards Grid ── */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 28px;
          width: 100%;
          max-width: 820px;
          position: relative;
          z-index: 1;
        }

        /* ── Card ── */
        .pricing-card {
          position: relative;
          background: rgba(15, 20, 35, 0.7);
          border-radius: 24px;
          padding: 36px 32px;
          border: 1px solid var(--card-border);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.35s ease;
          overflow: hidden;
          cursor: default;
        }

        .pricing-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          background: var(--card-gradient);
          opacity: 0.04;
          pointer-events: none;
          transition: opacity 0.35s;
        }

        .pricing-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 32px 64px var(--card-glow), 0 0 0 1px var(--card-border);
        }

        .pricing-card:hover::before {
          opacity: 0.08;
        }

        /* Gold card elevated style */
        .pricing-card.gold-card {
          box-shadow: 0 16px 48px var(--card-glow);
        }

        /* Popular badge */
        .popular-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 50px;
          background: var(--card-gradient);
          color: #1a0a00;
        }

        /* Card shine line */
        .card-shine {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--card-gradient);
          opacity: 0.8;
          border-radius: 24px 24px 0 0;
        }

        /* ── Card Header ── */
        .card-icon {
          font-size: 2.8rem;
          margin-bottom: 16px;
          display: block;
          filter: drop-shadow(0 4px 8px var(--card-glow));
        }

        .card-name {
          font-size: 1.5rem;
          font-weight: 800;
          color: #f8fafc;
          margin: 0 0 6px;
          background: var(--card-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .card-tagline {
          font-size: 0.88rem;
          color: #64748b;
          margin: 0 0 28px;
          font-weight: 400;
        }

        /* ── Price ── */
        .price-block {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          margin-bottom: 8px;
        }

        .price-currency {
          font-size: 1.2rem;
          font-weight: 600;
          color: #94a3b8;
          margin-bottom: 6px;
        }

        .price-amount {
          font-size: 3.2rem;
          font-weight: 900;
          color: #f8fafc;
          line-height: 1;
          letter-spacing: -2px;
          transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }

        .price-period {
          font-size: 0.88rem;
          color: #64748b;
          margin-bottom: 8px;
          font-weight: 400;
        }

        .price-note {
          font-size: 0.8rem;
          color: #64748b;
          margin-bottom: 28px;
          height: 18px;
          transition: opacity 0.3s;
        }

        /* ── Divider ── */
        .card-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 0 0 24px;
          border: none;
        }

        /* ── Features ── */
        .features-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #475569;
          margin-bottom: 14px;
        }

        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0 0 32px;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          font-weight: 400;
        }

        .feature-item.included {
          color: #cbd5e1;
        }

        .feature-item.excluded {
          color: #334155;
        }

        .feature-icon {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
        }

        .feature-icon.check {
          background: var(--card-accent-bg);
          color: var(--card-accent);
        }

        .feature-icon.cross {
          background: rgba(51, 65, 85, 0.5);
          color: #334155;
        }

        /* ── CTA Button ── */
        .cta-btn {
          width: 100%;
          padding: 14px 24px;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          border: none;
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.2s ease,
                      opacity 0.2s;
          letter-spacing: 0.3px;
          position: relative;
          overflow: hidden;
        }

        .cta-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(255,255,255,0.12), transparent);
          border-radius: 12px;
          pointer-events: none;
        }

        .cta-btn.silver-btn {
          background: linear-gradient(135deg, #94a3b8, #cbd5e1);
          color: #0f172a;
          box-shadow: 0 4px 16px rgba(148,163,184,0.2);
        }

        .cta-btn.gold-btn {
          background: linear-gradient(135deg, #f59e0b, #fbbf24);
          color: #1a0a00;
          box-shadow: 0 4px 20px rgba(245,158,11,0.35);
        }

        .cta-btn:hover {
          transform: translateY(-2px) scale(1.02);
          opacity: 0.92;
        }

        .cta-btn:hover.silver-btn {
          box-shadow: 0 8px 28px rgba(148,163,184,0.35);
        }

        .cta-btn:hover.gold-btn {
          box-shadow: 0 8px 32px rgba(245,158,11,0.5);
        }

        .cta-btn:active {
          transform: scale(0.98);
        }

        /* ── Trust Strip ── */
        .trust-strip {
          margin-top: 48px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: #475569;
          position: relative;
          z-index: 1;
          text-align: center;
          flex-wrap: wrap;
          justify-content: center;
        }

        .trust-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #334155;
          flex-shrink: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 700px) {
          .premium-wrapper {
            padding: 40px 16px 60px;
          }
          .premium-title {
            font-size: 1.9rem;
          }
          .pricing-grid {
            grid-template-columns: 1fr;
            max-width: 420px;
          }
          .pricing-card {
            padding: 28px 22px;
          }
          .price-amount {
            font-size: 2.6rem;
          }
          .billing-toggle-wrapper {
            flex-wrap: wrap;
            justify-content: center;
            margin-bottom: 36px;
          }
        }

        @media (max-width: 400px) {
          .premium-wrapper {
            padding: 32px 12px 48px;
          }
          .pricing-card {
            padding: 24px 18px;
          }
        }
      `}</style>

      <div className="premium-wrapper">
        {/* Header */}
        <div className="premium-header">
          <div className="premium-eyebrow">✦ Upgrade Your Plan</div>
          <h1 className="premium-title">
            Choose Your <span>Premium</span> Tier
          </h1>
          <p className="premium-subtitle">
            Unlock powerful features to connect with the best developers. No hidden
            fees, cancel anytime.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="billing-toggle-wrapper">
          <span
            className={`billing-label ${billing === "monthly" ? "active" : ""}`}
            onClick={() => setBilling("monthly")}
          >
            Monthly
          </span>
          <div
            className={`billing-toggle ${billing === "yearly" ? "yearly" : ""}`}
            onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
          >
            <div className="billing-knob" />
          </div>
          <span
            className={`billing-label ${billing === "yearly" ? "active" : ""}`}
            onClick={() => setBilling("yearly")}
          >
            Yearly
          </span>
          {billing === "yearly" && (
            <span className="billing-save-badge">Save 20%</span>
          )}
        </div>

        {/* Cards */}
        <div className="pricing-grid">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`pricing-card ${plan.id === "gold" ? "gold-card" : ""}`}
              style={{
                "--card-gradient": plan.gradient,
                "--card-glow": plan.glowColor,
                "--card-border": plan.borderColor,
                "--card-accent": plan.accentColor,
                "--card-accent-bg":
                  plan.id === "gold"
                    ? "rgba(245,158,11,0.15)"
                    : "rgba(148,163,184,0.15)",
              }}
            >
              <div className="card-shine" />

              {plan.badge && (
                <div className="popular-badge">{plan.badge}</div>
              )}

              <span className="card-icon">{plan.icon}</span>
              <h2 className="card-name">{plan.name}</h2>
              <p className="card-tagline">{plan.tagline}</p>

              <div className="price-block">
                <span className="price-currency">₹</span>
                <span className="price-amount">
                  {billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                </span>
                <span className="price-period">/mo</span>
              </div>
              <p className="price-note">
                {billing === "yearly"
                  ? `Billed ₹${plan.yearlyPrice * 12}/year`
                  : "Billed monthly"}
              </p>

              <hr className="card-divider" />

              <p className="features-label">What's included</p>
              <ul className="feature-list">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className={`feature-item ${feature.included ? "included" : "excluded"}`}
                  >
                    <span className={`feature-icon ${feature.included ? "check" : "cross"}`}>
                      {feature.included ? "✓" : "×"}
                    </span>
                    {feature.text}
                  </li>
                ))}
              </ul>

              <button
                className={`cta-btn ${plan.id === "silver" ? "silver-btn" : "gold-btn"}`}
                 onClick={() => handleBuyClick(plan.id)} 
              >
                Get {plan.name} Plan →
              </button>
            </div>
          ))}
        </div>

        {/* Trust Strip */}
        <div className="trust-strip">
          <span>🔒 Secure Payment</span>
          <span className="trust-dot" />
          <span>Cancel Anytime</span>
          <span className="trust-dot" />
          <span>7-Day Money Back Guarantee</span>
          <span className="trust-dot" />
          <span>No Hidden Fees</span>
        </div>
      </div>
    </>
  );
};

export default Premium;