import React, { useState } from 'react';
import styles from '../styles/PriceRangeSlider.module.css';

const PriceRangeSlider = ({ min, max, onChange }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
    onChange([value, maxValue]);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
    onChange([minValue, value]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Price range</h3>
        <p>The average nightly price is $499</p>
      </div>
      <div className={styles.histogram}></div>
      <div className={styles.sliderContainer}>
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
          className={`${styles.slider} ${styles.minSlider}`}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
          className={`${styles.slider} ${styles.maxSlider}`}
        />
        <div className={styles.valueLabel} style={{ left: `${(minValue / max) * 100}%` }}>
          ${minValue}
        </div>
        <div className={styles.valueLabel} style={{ left: `${(maxValue / max) * 100}%` }}>
          ${maxValue}
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
