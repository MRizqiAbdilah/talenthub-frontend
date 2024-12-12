import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import CartModal from "../cart/CartModal";
import { useState } from "react";
import { IFood } from "@/types/food.type";
import { useCartStore } from "@/stores/useCartStroe";

interface Props {
  food: IFood;
}

export default function FoodCard({ food }: Props) {
  const [selectedFood, setSelectedFood] = useState<IFood | null>(null);
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div>
      <Card key={food._id} shadow="sm" className="p-4 bg-slate-900 rounded-md">
        <CardBody className="overflow-visible p-0 rounded-sm">
          <Image
            alt={food.name}
            className="w-full object-cover h-[140px]"
            radius="sm"
            shadow="sm"
            src={food.image_url}
            width="100%"
          />
        </CardBody>
        <CardFooter className="text-small justify-between my-2">
          <b>{food.name}</b>
          <p className="text-default-500">${food.price}</p>
        </CardFooter>
        <Button color="primary" onPress={() => setSelectedFood(food)}>
          View Details
        </Button>
        <CartModal
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
          addToCart={addToCart} // Menyambungkan addToCart dengan store
        />
      </Card>
    </div>
  );
}
