// async function fetchProductData(category, sort) {
//   const res = await fetch(
//     `https://api.example.com/products?category=${category}&sort=${sort}`
//   );
//   if (!res.ok) return null;
//   return res.json();
// }

// export default async function ProductPage({ searchParams }) {
//   const category = searchParams.category || "all";
//   const sort = searchParams.sort || "newest";

//   const products = await fetchProductData(category, sort);

//   if (!products) notFound();

//   return (
//     <div>
//       <h1>Products in {category}</h1>
//       <p>Sorted by: {sort}</p>
//       {/* Render product list */}
//     </div>
//   );
// }
