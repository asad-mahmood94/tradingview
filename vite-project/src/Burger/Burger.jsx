import React, { useState } from 'react';
import './Burger.css';
import { Link } from 'react-router-dom';

export default function BurgerBuilder() {
  const [meatCount, setMeatCount] = useState(0);

  const addMeat = () => {
    setMeatCount(prev => prev + 1);
  };

  const removeMeat = () => {
    setMeatCount(prev => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div className="burger-page">
      <Link to="/user"> Go to User Page </Link>
      {/* Scrollable Burger Section */}
      <div className="burger-container">
        <div className="burger-builder">
          {/* Top Bun */}
          <img src="uper.png" alt="Top Bun" className="bun-image-top" />

          {/* Burger Ingredients */}
          <div className="burger-space">
            {meatCount === 0 ? (
              <h3 className="ingredients-text">Include Ingredients</h3>
            ) : (
              Array.from({ length: meatCount }).map((_, index) => (
                <div key={index} className="meat-piece"></div>
              ))
            )}
          </div>

          {/* Bottom Bun */}
          <img src="lower.png" alt="Bottom Bun" className="bun-image-bottom" />
        </div>
      </div>

      {/* Fixed Controls Section */}
      <div className="controls-container">
        <div className="controls">
          <span className="ingredient-label">Meat</span>
          <div className="button-group">
            <button onClick={removeMeat} className="control-button less-button">Less</button>
            <button onClick={addMeat} className="control-button more-button">More</button>
          </div>
        </div>
      </div>
    </div>
  );
}