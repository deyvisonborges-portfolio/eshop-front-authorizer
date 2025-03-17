"use client"

import { useState, useEffect } from "react"
import styles from "./catalog.module.css"
import { ProductAPIModel } from "../../api/product.api-model"
import { FilterBar } from "./components/filter-bar"
import { ProductCard } from "../../components/product-card"

export default function CatalogPage() {
  const [products, setProducts] = useState<ProductAPIModel[]>([])
  const [filteredProducts, setFilteredProducts] = useState<ProductAPIModel[]>(
    []
  )
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>("all")

  useEffect(() => {
    // Simulate fetching products from an API
    const fetchProducts = async () => {
      try {
        // Replace with your actual API call
        // const response = await fetch('/api/products');
        // const data = await response.json();

        // Mock data for demonstration
        const mockProducts: ProductAPIModel[] = Array.from(
          { length: 12 },
          (_, i) => ({
            id: `product-${i + 1}`,
            name: `Product ${i + 1}`,
            description: `This is a description for product ${
              i + 1
            }. It's a great product with amazing features.`,
            price: Math.floor(Math.random() * 100) + 50,
            originalPrice: Math.floor(Math.random() * 150) + 100,
            discount: Math.floor(Math.random() * 30) + 10,
            images: [`/placeholder.svg?height=200&width=200`],
            stock: Math.floor(Math.random() * 50) + 1,
            categories: [
              ["clothing", "electronics", "home", "accessories"][
                Math.floor(Math.random() * 4)
              ],
            ],
            sizes: ["S", "M", "L", "XL"],
            colors: ["red", "blue", "green", "black"],
            quantity: 1,
          })
        )

        setProducts(mockProducts)
        setFilteredProducts(mockProducts)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error)
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)

    if (category === "all") {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter((product) =>
        product.categories.includes(category)
      )
      setFilteredProducts(filtered)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Product Catalog</h1>
        <p className={styles.subtitle}>Discover our amazing products</p>
      </div>

      <FilterBar
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className={styles.productsGrid}>
        {isLoading ? (
          // Show skeleton loaders while loading
          Array.from({ length: 8 }).map((_, index) => (
            <ProductCard
              key={`skeleton-${index}`}
              data={{} as ProductAPIModel}
              isLoaded={false}
            />
          ))
        ) : filteredProducts.length > 0 ? (
          // Show products
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              data={product}
              has={{ button: true }}
            />
          ))
        ) : (
          // Show no products found message
          <div className={styles.noProducts}>
            <p>No products found. Try changing your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
