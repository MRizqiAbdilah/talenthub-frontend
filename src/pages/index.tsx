import Cart from "@/components/cart/Cart";
import Drawer from "@/components/Drawer";
import FoodList from "@/components/foods/FoodList";
import Header from "@/components/Header";
import { useFoodsStore } from "@/stores/useFoodsStore";
import { useEffect, useState } from "react";

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { foods, isLoading, error, fetchData } = useFoodsStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCartIconClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="min-h-screen">
      <Header onCartIconClick={handleCartIconClick} />
      <Drawer isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick}>
        <Cart />
      </Drawer>

      <main className="flex-grow w-full container mx-auto py-8 px-4">
        {isLoading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : (
          <FoodList foods={foods} />
        )}
      </main>
    </div>
  );
}
