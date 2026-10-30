import styles from "./price-range.module.scss";

type PriceRangeProps = {
  minPrice?: number;
  maxPrice?: number;
};

export function PriceRange({ minPrice, maxPrice }: PriceRangeProps) {
  return (
    <form method="get" className={styles.priceRange}>
      <span className={styles.heading}>Price range</span>
      <div className={styles.fields}>
      <label className={styles.field}>
        <span>From, $</span>
      <input        
        name="minPrice"
        type="number"
        min="0"
        step="0.01"
        defaultValue={minPrice}
        placeholder="0.00"
        />
      </label>
      <label className={styles.field}>
        <span>To, $</span>
      <input
        name="maxPrice"
        type="number"
        min="0"
        step="0.01"
        defaultValue={maxPrice}
        placeholder="Any"
        />
      </label>
        <button type="submit" className={styles.apply}>Apply</button>
      </div>
    </form>
  );
}
