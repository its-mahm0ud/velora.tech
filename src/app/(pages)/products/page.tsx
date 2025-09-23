"use client";

import { useState, useEffect } from "react";
import { Grid, List } from "lucide-react";
import { LoadingComponent } from "@/Components";
import { Button } from "@/Components/ui";
import { ResponseProduct } from "@/app/Types";
import { IProduct } from "@/app/Interfaces";
import ProductCardComponent from "@/Components/ProductCardComponent";
import { apiServices } from "@/Services/ApisServices";
import { useSession } from "next-auth/react";



export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const session = useSession();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");


  async function fetchProducts() {
    setLoading(true);
    const response: ResponseProduct = await apiServices.fetchProducts();
    setLoading(false);
    setProducts(response.data);

  }

  useEffect(() => {
    fetchProducts()

  }, [])



  // {Filter to Search}
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );






  if (loading && products.length === 0) {
    return <LoadingComponent />;
  }


  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button>Try Again</Button>
        </div>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold mb-4">Products</h1>
          <p className="text-muted-foreground">
            Discover amazing products from our collection
          </p>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for specific product..."
            className="
      w-full pl-3 pr-4 py-2
      border rounded-xl
      bg-white text-gray-900
      dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700
      focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
      transition
    "
          />
        </div>
        {/* View Mode Toggle */}

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className=" hidden md:flex items-center border rounded-md ">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}

                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>




      {/* Products Grid */}
      <div
        className={`grid gap-6 ${viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          : "grid-cols-1"
          }`}
      >
        {filteredProducts.map((product) => (
          <ProductCardComponent key={product._id} product={product} viewMode={viewMode} />
        ))}
      </div>
    </div>

  )
}
