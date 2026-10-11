import React from "react";
import data from "../../json/data.json";
import { formatTk, handleTabKeys, useQueryState } from "../../utils";
import "./Items.css";

const sections = [
  { id: "mains", label: "Mains" },
  { id: "desserts", label: "Desserts" },
  { id: "drinks", label: "Cold Drinks" },
];
const sectionIds = sections.map((s) => s.id);

const Items = () => {
  const [filter, setFilter] = useQueryState("menu", sectionIds, "mains");
  const dishes = data.categories.filter((dish) => dish.category === filter);

  return (
    <section className="kitchen" id="kitchen" aria-labelledby="kitchen-title">
      <div className="wrap">
        <header className="section-head">
          <p className="eyebrow">Kitchen · served 8am–5pm</p>
          <h2 id="kitchen-title" className="display">Something to go with it</h2>
          <p>
            Real food, not just pastries: soups, noodles, pasta and pizza for
            lunch, and something sweet for the afternoon.
          </p>
        </header>

        <div className="kitchen-tabs" role="tablist" aria-label="Kitchen menu">
          {sections.map((section) => {
            const count = data.categories.filter(
              (d) => d.category === section.id
            ).length;
            return (
              <button
                key={section.id}
                type="button"
                role="tab"
                id={`menu-tab-${section.id}`}
                data-tab={section.id}
                aria-selected={filter === section.id}
                aria-controls="menu-panel"
                tabIndex={filter === section.id ? 0 : -1}
                className="kitchen-tab"
                onClick={() => setFilter(section.id)}
                onKeyDown={(e) => handleTabKeys(e, sectionIds, filter, setFilter)}>
                {section.label}
                <span className="kitchen-tab-count">{count}</span>
              </button>
            );
          })}
        </div>

        <ul
          className="menu-list"
          id="menu-panel"
          role="tabpanel"
          aria-labelledby={`menu-tab-${filter}`}>
          {dishes.map((dish) => (
            <li key={dish.id} className="menu-item">
              <img
                src={dish.imageUrl}
                alt=""
                width="96"
                height="96"
                loading="lazy"
                className="menu-thumb"
              />
              <span className="menu-name">{dish.title}</span>
              <span className="menu-leader" aria-hidden="true" />
              <span className="price menu-price">{formatTk(dish.price)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Items;
