// SAMPLE DATA ONLY. Placeholder meals and prices so the layout can be built
// before real store ads are wired in. None of these prices are real.

export type Category = "Produce" | "Meat & Fish" | "Dairy & Eggs" | "Pantry";

export type Ingredient = {
  name: string;
  qty: number;
  unit: string;
  category: Category;
};

export type Meal = {
  day: string;
  title: string;
  blurb: string;
  ingredients: Ingredient[];
};

export type SaleItem = {
  store: string;
  price: string;
};

// Sized for 2 adults + 3 small kids.
export const meals: Meal[] = [
  {
    day: "Monday",
    title: "Sheet-pan chicken and veggies",
    blurb: "Chicken breast, potatoes and broccoli roasted on one pan.",
    ingredients: [
      { name: "Chicken breast", qty: 2, unit: "lb", category: "Meat & Fish" },
      { name: "Potatoes", qty: 2, unit: "lb", category: "Produce" },
      { name: "Broccoli", qty: 1, unit: "lb", category: "Produce" },
      { name: "Olive oil", qty: 3, unit: "tbsp", category: "Pantry" },
    ],
  },
  {
    day: "Tuesday",
    title: "Beef tacos",
    blurb: "Seasoned ground beef with toppings the kids build themselves.",
    ingredients: [
      { name: "Ground beef", qty: 1.5, unit: "lb", category: "Meat & Fish" },
      { name: "Flour tortillas", qty: 10, unit: "each", category: "Pantry" },
      { name: "Shredded cheese", qty: 2, unit: "cup", category: "Dairy & Eggs" },
      { name: "Tomatoes", qty: 3, unit: "each", category: "Produce" },
      { name: "Onion", qty: 1, unit: "each", category: "Produce" },
    ],
  },
  {
    day: "Wednesday",
    title: "Spaghetti with meat sauce",
    blurb: "A kid-friendly classic with a hidden-veggie sauce.",
    ingredients: [
      { name: "Spaghetti", qty: 1, unit: "lb", category: "Pantry" },
      { name: "Ground beef", qty: 1, unit: "lb", category: "Meat & Fish" },
      { name: "Pasta sauce", qty: 1, unit: "jar", category: "Pantry" },
      { name: "Onion", qty: 1, unit: "each", category: "Produce" },
      { name: "Carrots", qty: 1, unit: "lb", category: "Produce" },
    ],
  },
  {
    day: "Thursday",
    title: "Chicken quesadillas",
    blurb: "Cheesy and quick, served with sliced fruit.",
    ingredients: [
      { name: "Chicken breast", qty: 1.5, unit: "lb", category: "Meat & Fish" },
      { name: "Flour tortillas", qty: 8, unit: "each", category: "Pantry" },
      { name: "Shredded cheese", qty: 3, unit: "cup", category: "Dairy & Eggs" },
      { name: "Apples", qty: 5, unit: "each", category: "Produce" },
    ],
  },
  {
    day: "Friday",
    title: "Breakfast for dinner",
    blurb: "Pancakes, scrambled eggs and sausage.",
    ingredients: [
      { name: "Eggs", qty: 10, unit: "each", category: "Dairy & Eggs" },
      { name: "Pancake mix", qty: 1, unit: "box", category: "Pantry" },
      { name: "Breakfast sausage", qty: 1, unit: "lb", category: "Meat & Fish" },
      { name: "Milk", qty: 2, unit: "cup", category: "Dairy & Eggs" },
    ],
  },
  {
    day: "Saturday",
    title: "Baked mac and cheese with broccoli",
    blurb: "Creamy baked pasta with broccoli mixed in.",
    ingredients: [
      { name: "Elbow macaroni", qty: 1, unit: "lb", category: "Pantry" },
      { name: "Shredded cheese", qty: 4, unit: "cup", category: "Dairy & Eggs" },
      { name: "Milk", qty: 2, unit: "cup", category: "Dairy & Eggs" },
      { name: "Broccoli", qty: 1, unit: "lb", category: "Produce" },
    ],
  },
  {
    day: "Sunday",
    title: "Turkey meatballs and rice",
    blurb: "Baked meatballs with rice and steamed carrots.",
    ingredients: [
      { name: "Ground turkey", qty: 1.5, unit: "lb", category: "Meat & Fish" },
      { name: "White rice", qty: 2, unit: "cup", category: "Pantry" },
      { name: "Carrots", qty: 1, unit: "lb", category: "Produce" },
      { name: "Eggs", qty: 2, unit: "each", category: "Dairy & Eggs" },
    ],
  },
];

// Keyed by ingredient name. Marks which items would be on sale this week.
export const saleItems: Record<string, SaleItem> = {
  "Chicken breast": { store: "Smith's", price: "$1.99/lb" },
  "Ground beef": { store: "Davis", price: "$3.99/lb" },
  "Shredded cheese": { store: "Smith's", price: "$2.50/8 oz bag" },
  Broccoli: { store: "Davis", price: "$0.99/lb" },
  Eggs: { store: "Smith's", price: "$2.49/dozen" },
};

export const categories: Category[] = [
  "Produce",
  "Meat & Fish",
  "Dairy & Eggs",
  "Pantry",
];

export type ShoppingLine = Ingredient & { usedIn: string[] };

// Combines the same ingredient (same name and unit) across every recipe.
export function buildShoppingList(source: Meal[]): ShoppingLine[] {
  const lines = new Map<string, ShoppingLine>();
  for (const meal of source) {
    for (const item of meal.ingredients) {
      const key = `${item.name}|${item.unit}`;
      const existing = lines.get(key);
      if (existing) {
        existing.qty += item.qty;
        existing.usedIn.push(meal.day);
      } else {
        lines.set(key, { ...item, usedIn: [meal.day] });
      }
    }
  }
  return [...lines.values()].sort((a, b) => a.name.localeCompare(b.name));
}
