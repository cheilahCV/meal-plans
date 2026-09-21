import {
  buildShoppingList,
  categories,
  meals,
  saleItems,
} from "@/data/sample";
import styles from "./page.module.css";

function formatQty(qty: number) {
  return Number.isInteger(qty) ? String(qty) : qty.toFixed(1).replace(/\.0$/, "");
}

export default function Home() {
  const shoppingList = buildShoppingList(meals);
  const saleCount = shoppingList.filter((line) => saleItems[line.name]).length;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Meal Plans</h1>
        <p>
          Dinners for the week, planned around what&apos;s on sale. Sized for 2
          adults and 3 kids.
        </p>
        <p className={styles.notice}>
          Sample data. These meals and prices are placeholders until the real
          Smith&apos;s and Davis ads are connected.
        </p>
      </header>

      <section aria-labelledby="dinners" className={styles.dinnersSection}>
        <h2 id="dinners">This week&apos;s dinners</h2>
        <ul className={styles.dinners}>
          {meals.map((meal) => {
            const onSale = meal.ingredients.filter(
              (item) => saleItems[item.name],
            );
            return (
              <li key={meal.day} className={styles.dinner}>
                <span className={styles.day}>{meal.day}</span>
                <h3>{meal.title}</h3>
                <p>{meal.blurb}</p>
                <details>
                  <summary>Ingredients</summary>
                  <ul className={styles.ingredients}>
                    {meal.ingredients.map((item) => (
                      <li key={item.name}>
                        {formatQty(item.qty)} {item.unit} {item.name}
                        {saleItems[item.name] && (
                          <span className={styles.badge}>on sale</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </details>
                {onSale.length > 0 && (
                  <p className={styles.saleLine}>
                    On sale: {onSale.map((item) => item.name).join(", ")}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="shopping" className={styles.shopping}>
        <h2 id="shopping">Shopping list</h2>
        <p className={styles.summary}>
          {shoppingList.length} items for all {meals.length} dinners,{" "}
          {saleCount} on sale.
        </p>
        {categories.map((category) => {
          const lines = shoppingList.filter((line) => line.category === category);
          if (lines.length === 0) return null;
          return (
            <div key={category} className={styles.group}>
              <h3>{category}</h3>
              <ul className={styles.list}>
                {lines.map((line) => {
                  const sale = saleItems[line.name];
                  const id = `item-${line.name}-${line.unit}`.replace(/\s+/g, "-");
                  return (
                    <li key={id}>
                      <input type="checkbox" id={id} />
                      <label htmlFor={id}>
                        <span className={styles.qty}>
                          {formatQty(line.qty)} {line.unit}
                        </span>{" "}
                        {line.name}
                        <span className={styles.usedIn}>
                          {" "}
                          ({line.usedIn.map((day) => day.slice(0, 3)).join(", ")})
                        </span>
                        {sale && (
                          <span className={styles.badge}>
                            {sale.store} {sale.price}
                          </span>
                        )}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </section>
    </main>
  );
}
