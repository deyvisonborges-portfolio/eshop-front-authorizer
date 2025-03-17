"use client"

import type React from "react"

import { useState } from "react"
import styles from "./filter-bar.module.css"

type FilterBarProps = {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function FilterBar({
  activeCategory,
  onCategoryChange,
}: FilterBarProps) {
  const [sortBy, setSortBy] = useState("featured")

  const categories = [
    { id: "all", name: "All Products" },
    { id: "clothing", name: "Clothing" },
    { id: "electronics", name: "Electronics" },
    { id: "home", name: "Home" },
    { id: "accessories", name: "Accessories" },
  ]

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
    // You would implement sorting logic here
  }

  return (
    <div className={styles.filterBar}>
      <div className={styles.categories}>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`${styles.categoryButton} ${
              activeCategory === category.id ? styles.active : ""
            }`}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className={styles.sortContainer}>
        <label htmlFor="sort" className={styles.sortLabel}>
          Sort by:
        </label>
        <select
          id="sort"
          className={styles.sortSelect}
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  )
}
