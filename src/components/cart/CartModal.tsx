import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image,
} from "@nextui-org/react";
import { IFood } from "@/types/food.type";

interface CartModalProps {
  food: IFood | null; // Data makanan yang akan ditampilkan
  onClose: () => void; // Fungsi untuk menutup modal
  addToCart: (food: IFood) => void; // Fungsi untuk menambahkan ke keranjang
}

export default function CartModal({
  food,
  onClose,
  addToCart,
}: CartModalProps) {
  if (!food) return null; // Jika tidak ada makanan yang dipilih, jangan render modal

  return (
    <Modal
      isOpen={!!food}
      onOpenChange={onClose}
      className="flex items-center justify-center w-96 p-5 rounded-md border border-gray-400 "
    >
      <ModalContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent">
        <ModalHeader className="flex flex-col gap-1">{food.name}</ModalHeader>
        <ModalBody className="flex flex-col gap-2">
          <Image alt={food.name} src={food.image_url} width="100%" />
          <p>Price: ${food.price}</p>
          <p>{food.category}</p>
          <p>{food.description}</p>
        </ModalBody>
        <ModalFooter>
          {/* Button Red */}

          {/* Button Blue */}
          <Button
            color="primary"
            className="ml-2 bg-blue-800 hover:bg-blue-900  "
            onPress={() => addToCart(food)}
          >
            Add to Cart
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
