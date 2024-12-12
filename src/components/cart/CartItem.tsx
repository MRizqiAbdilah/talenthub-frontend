import Image from "next/image";
import { IFood } from "@/types/food.type";
import { useCartStore } from "@/stores/useCartStroe";
import { FaTrashAlt } from "react-icons/fa";

interface Props {
  food: IFood;
}

export default function CartItem({ food }: Props) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <div className="flex justify-between items-center gap-4  mb-2 shadow-md p-4">
      <div className="flex items-center">
        <Image
          src={food.image_url}
          alt={food.name}
          width={100}
          height={100}
          className="h-10 w-10 rounded-full mr-4"
        />
        <div className="flex flex-col">
          <span className="font-bold flex-1">{food.name}</span>
          <span className="text-gray-600 font-bold">${food.price}</span>
          <span>Quantity: {food.quantity}</span>
        </div>
      </div>
      <div>
        <button
          title="Remove Item"
          className="text-red-500 hover:text-red-600 ml-4"
          onClick={() => removeFromCart(food)}
        >
          <FaTrashAlt size={18} />
        </button>
      </div>
    </div>
  );
}
