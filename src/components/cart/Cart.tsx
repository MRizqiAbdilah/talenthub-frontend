import { useState } from "react";
import CartItem from "./CartItem";
import useFromStore from "../../hooks/useFromStore";
import { useCartStore } from "@/stores/useCartStroe";

function Cart() {
  const cart = useFromStore(useCartStore, (state) => state.cart) || []; // Default to an empty array
  const clearCart = useCartStore((state) => state.clearCart); // Ambil fungsi untuk menghapus cart
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);

  let total = 0;
  if (cart.length > 0) {
    total = cart.reduce(
      (acc, food) => acc + food.price * (food.quantity as number),
      0
    );
  }

  const handleOrderNow = () => {
    setIsOrderSuccess(true);

    // Menghapus isi cart setelah pemesanan berhasil
    clearCart();

    // Reset popup setelah animasi
    setTimeout(() => {
      setIsOrderSuccess(false);
    }, 3000);
  };

  return (
    <section className="p-4 bg-slate-900 text-white">
      <h3 className="text-2xl font-bold mb-4">Shopping Cart</h3>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((food) => (
              <CartItem key={food._id} food={food} />
            ))}
          </ul>
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-xl font-bold">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleOrderNow}
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300"
          >
            Order Now
          </button>
        </>
      ) : (
        <p>Your cart is empty.</p> // Display a message if the cart is empty
      )}

      {isOrderSuccess && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          style={{ zIndex: 9999 }}
        >
          <div className="bg-white text-black p-6 rounded shadow-lg animate-slideInUp">
            <h3 className="text-2xl font-bold mb-2">Order Successful!</h3>
            <p>Your order has been placed successfully.</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;
