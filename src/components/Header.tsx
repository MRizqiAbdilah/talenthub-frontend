import useFormStore from "@/hooks/useFromStore";
import { useCartStore } from "@/stores/useCartStroe";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { FiShoppingCart } from "react-icons/fi";

interface Props {
  onCartIconClick: () => void;
}

export default function Header({ onCartIconClick }: Props) {
  const cart = useFormStore(useCartStore, (state) => state.cart);
  return (
    <Navbar className="bg-slate-900 py-4 mb-2">
      <NavbarBrand>
        <p className="font-bold text-inherit">WQRUNG MAKAN</p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <button
            type="button"
            title="Mini Cart"
            className="text-white text-xl flex items-center relative"
            onClick={onCartIconClick}
          >
            <FiShoppingCart />
            <span className="absolute -top-2 -right-2 text-white rounded-full bg-blue-700 w-5 h-5 text-sm flex items-center justify-center">
              {cart?.length}
            </span>
          </button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
