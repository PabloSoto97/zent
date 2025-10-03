import { createContext, useContext, useReducer } from "react";
import type { Producto } from "../types/Producto";
import type { ReactNode } from "react";

type CartItem = Producto & { cantidad: number };

interface CartState {
  cart: CartItem[]; // 👈 acá es donde debe existir cart
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: Producto }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "INCREASE_QTY"; payload: number }
  | { type: "DECREASE_QTY"; payload: number }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  cart: [],
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const item = state.cart.find((p) => p.id === action.payload.id);
      if (item) {
        return {
          ...state,
          cart: state.cart.map((p) =>
            p.id === item.id ? { ...p, cantidad: p.cantidad + 1 } : p
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, cantidad: 1 }],
      };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((p) => p.id !== action.payload),
      };
    case "INCREASE_QTY":
      return {
        ...state,
        cart: state.cart.map((p) =>
          p.id === action.payload ? { ...p, cantidad: p.cantidad + 1 } : p
        ),
      };
    case "DECREASE_QTY":
      return {
        ...state,
        cart: state.cart.map((p) =>
          p.id === action.payload && p.cantidad > 1
            ? { ...p, cantidad: p.cantidad - 1 }
            : p
        ),
      };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  addToCart: (producto: Producto) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;
}>({
  state: initialState,
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQty: () => {},
  decreaseQty: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (producto: Producto) =>
    dispatch({ type: "ADD_TO_CART", payload: producto });

  const removeFromCart = (id: number) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: id });

  const increaseQty = (id: number) =>
    dispatch({ type: "INCREASE_QTY", payload: id });

  const decreaseQty = (id: number) =>
    dispatch({ type: "DECREASE_QTY", payload: id });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
