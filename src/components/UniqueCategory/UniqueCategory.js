import React from "react";
import data from "../../json/data.json";
import { formatTk, handleTabKeys, usePreloadImages, useQueryState } from "../../utils";
import "./UniqueCategory.css";

const GLASS_ML = 240;
const GLASS_H = 300;
const unitsPerMl = GLASS_H / GLASS_ML;

const partNames = {
  espresso: "Espresso",
  chocolate: "Chocolate",
  milk: "Steamed milk",
  foam: "Milk foam",
  water: "Hot water",
};

const coffeeIds = data.coffees.map((coffee) => coffee.id);
const coffeePhotos = data.coffees.map((coffee) => coffee.imageUrl);

const Glass = ({ coffee }) => {
  let filled = 0;
  const layers = coffee.layers.map((layer) => {
    const height = layer.ml * unitsPerMl;
    const y = GLASS_H - filled - height;
    filled += height;
    return { ...layer, y, height };
  });

  return (
    <svg
      className="glass"
      viewBox="-4 -4 268 308"
      role="img"
      aria-label={`${coffee.title}: ${coffee.layers
        .map((l) => `${l.ml} ml ${partNames[l.part].toLowerCase()}`)
        .join(", ")}`}>
      <defs>
        <clipPath id="glass-shape">
          <polygon points="0,0 200,0 184,300 16,300" />
        </clipPath>
        <pattern id="foam-bubbles" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="var(--layer-foam)" />
          <circle cx="4" cy="4" r="2.2" fill="var(--layer-milk)" />
          <circle cx="11" cy="10" r="1.6" fill="var(--layer-milk)" />
        </pattern>
      </defs>

      {[60, 120, 180, 240].map((ml) => {
        const y = GLASS_H - ml * unitsPerMl;
        return (
          <g key={ml} className="glass-tick">
            <line x1="206" x2="218" y1={y} y2={y} />
            <text x="224" y={y + 4}>{ml}</text>
          </g>
        );
      })}

      <g clipPath="url(#glass-shape)">
        <rect className="glass-body" width="200" height="300" />
        <g key={coffee.id}>
          {layers.map((layer, i) => (
            <g
              key={layer.part}
              className="glass-layer"
              style={{ animationDelay: `${i * 220}ms` }}>
              <rect
                x="0"
                y={layer.y}
                width="200"
                height={layer.height}
                fill={layer.part === "foam" ? "url(#foam-bubbles)" : `var(--layer-${layer.part})`}
              />
              {layer.height >= 36 && (
                <text
                  className={`layer-label layer-label--${layer.part}`}
                  x="100"
                  y={layer.y + layer.height / 2 + 5}>
                  {layer.ml} ml
                </text>
              )}
            </g>
          ))}
        </g>
      </g>

      <polygon className="glass-outline" points="0,0 200,0 184,300 16,300" />
    </svg>
  );
};

const UniqueCategory = () => {
  const [selected, setSelected] = useQueryState("coffee", coffeeIds, "cappuccino");
  usePreloadImages(coffeePhotos);
  const coffee = data.coffees.find((c) => c.id === selected);
  const total = coffee.layers.reduce((sum, layer) => sum + layer.ml, 0);

  return (
    <section className="coffee" id="coffee" aria-labelledby="coffee-title">
      <div className="wrap">
        <header className="section-head">
          <p className="eyebrow">Espresso bar</p>
          <h2 id="coffee-title" className="display">What's in the cup</h2>
          <p>
            Every drink on the bar starts with the same house espresso. Pick
            one to see what goes in after it, layer by layer and measured in
            millilitres.
          </p>
        </header>

        <div className="coffee-layout">
          <div
            className="coffee-tabs"
            role="tablist"
            aria-label="Coffees"
            aria-orientation="vertical">
            {data.coffees.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                id={`tab-${c.id}`}
                data-tab={c.id}
                aria-selected={c.id === selected}
                aria-controls="coffee-panel"
                tabIndex={c.id === selected ? 0 : -1}
                className="coffee-tab"
                onClick={() => setSelected(c.id)}
                onKeyDown={(e) => handleTabKeys(e, coffeeIds, selected, setSelected)}>

                <span className="coffee-tab-name">{c.title}</span>
                <span className="price">{formatTk(c.price)}</span>
              </button>
            ))}
          </div>

          <div
            className="coffee-panel"
            id="coffee-panel"
            role="tabpanel"
            aria-labelledby={`tab-${coffee.id}`}>
            <figure className="glass-wrap">
              <Glass coffee={coffee} />
              <figcaption className="eyebrow">240 ml glass, drawn to scale</figcaption>
            </figure>

            <div className="coffee-detail">
              <img
                key={coffee.id}
                className="coffee-photo"
                src={coffee.imageUrl}
                alt={`A ${coffee.title.toLowerCase()} as served`}
                width={coffee.width}
                height={coffee.height}
                loading="lazy"
              />
              <h3 className="display coffee-name">{coffee.title}</h3>
              <p className="coffee-note">{coffee.note}</p>

              <table className="recipe">
                <caption className="eyebrow">Recipe</caption>
                <tbody>
                  {[...coffee.layers].reverse().map((layer) => (
                    <tr key={layer.part}>
                      <th scope="row">
                        <span
                          className={`swatch swatch--${layer.part}`}
                          aria-hidden="true"
                        />
                        {partNames[layer.part]}
                      </th>
                      <td className="price">{layer.ml}&nbsp;ml</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row">In the glass</th>
                    <td className="price">{total}&nbsp;ml</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniqueCategory;
