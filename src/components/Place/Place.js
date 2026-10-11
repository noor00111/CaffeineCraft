import React, { useState } from "react";
import data from "../../json/data.json";
import { usePreloadImages } from "../../utils";
import "./Place.css";

const placePhotos = data.places.map((place) => place.imageUrl);

const Place = () => {
  const [activeId, setActiveId] = useState(data.places[0].id);
  const active = data.places.find((place) => place.id === activeId);
  usePreloadImages(placePhotos);

  return (
    <section className="space" id="space" aria-labelledby="space-title">
      <div className="space-inner wrap">
        <header className="section-head space-head">
          <p className="eyebrow">The space</p>
          <h2 id="space-title" className="display">Room to get things done</h2>
          <p>
            A busy bar up front, tables for two by the window, and quieter
            corners at the back for when you need to focus.
          </p>

          <div className="space-thumbs" role="group" aria-label="Photos of the café">
            {data.places.map((place) => (
              <button
                key={place.id}
                type="button"
                className="space-thumb"
                aria-pressed={place.id === activeId}
                aria-label={`Show photo: ${place.alt}`}
                onClick={() => setActiveId(place.id)}>
                <img
                  src={place.thumbUrl}
                  alt=""
                  width="176"
                  height="176"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </header>

        <figure className="space-figure">
          <img
            key={active.id}
            src={active.imageUrl}
            alt={active.alt}
            width={active.width}
            height={active.height}
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  );
};

export default Place;
