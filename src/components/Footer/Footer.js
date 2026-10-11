import { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [subscribed, setSubscribed] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    setSubscribed(email);
    event.currentTarget.reset();
  };

  return (
    <footer className="footer" id="visit" aria-labelledby="visit-title">
      <div className="wrap">
        <h2 id="visit-title" className="display footer-title">
         <span> Come in. <br/> Stay a while.</span>
        </h2>

        <div className="footer-grid">
          <div className="footer-block">
            <h3 className="eyebrow">Address</h3>
            <p>
              Road 30
              <br />
              Dynamic Town
            </p>
          </div>

          <div className="footer-block">
            <h3 className="eyebrow">Hours</h3>
            <p>
              Monday–Friday
              <br />
              8am–5pm
            </p>
          </div>

          <div className="footer-block">
            <h3 className="eyebrow">Contact</h3>
            <p>
              <a href="mailto:caffeinecraft@gmail.com">caffeinecraft@email.com</a>
              <br />
              <a href="tel:+8801776452478">01776-452478</a>
            </p>
          </div>

          <form className="footer-block newsletter" onSubmit={handleSubmit}>
            <label htmlFor="newsletter-email" className="eyebrow">
              Newsletter
            </label>
            <p className="newsletter-hint">New drinks and menu changes, once a month.</p>
            <div className="newsletter-row">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                spellCheck="false"
                required
                placeholder="you@example.com"
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </div>
            <p className="newsletter-status" aria-live="polite">
              {subscribed && `Subscribed. The next issue goes to ${subscribed}.`}
            </p>
          </form>
        </div>

        <div className="footer-base">
          <span className="footer-logo" translate="no">
            CaffeineCraft
          </span>
          <span>© {new Date().getFullYear()} CaffeineCraft</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
