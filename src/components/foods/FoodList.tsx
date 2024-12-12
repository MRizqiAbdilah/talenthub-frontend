import { IFood } from "@/types/food.type";
import FoodCard from "./FoodCard";

interface Props {
  foods: IFood[];
}

export default function FoodList({ foods = [] }: Props) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Makanan</h1>
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foods.length > 0 ? (
          foods.map((food) => <FoodCard key={food._id} food={food} />)
        ) : (
          <div className="col-span-full text-center text-gray-700 bg-white rounded-lg p-6 shadow-md">
            Tidak ada makanan yang tersedia saat ini.
          </div>
        )}
      </div>
    </div>
  );
}
