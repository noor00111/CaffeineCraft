import React from "react";
import "./StarSection.css";

const StarSection = () => {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-inner wrap">
        <div className="hero-copy">
          <p className="eyebrow">Road 30, Dynamic Town · Mon–Fri, 8am–5pm</p>
          <h1 id="hero-title" className="display hero-title">
            Stay for the <em>second</em> cup.
          </h1>
          <p className="hero-lede">
            A coffee house built for long mornings: five espresso drinks done
            properly, a kitchen that cooks until close, and a table you can
            keep while you work.
          </p>
          <div className="hero-actions">
            <a href="#coffee" className="btn btn-primary">
              Choose a coffee
            </a>
            <a href="#kitchen" className="btn btn-ghost">
              See the kitchen menu
            </a>
          </div>
        </div>

        <figure className="hero-figure">
          <img
            src="./images/coffee-bg.jpg"
            alt="A blue cup of black coffee beside a hand grinder and a sack of beans"
            width="1200"
            height="779"
            fetchpriority="high"
          />
        </figure>
      </div>
    </section>
  );
};

export default StarSection;
