import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromLocalStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find((cartItem) => cartItem._id === item._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }

      saveCartToLocalStorage(state.cart); 
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
      saveCartToLocalStorage(state.cart);
    },
    updateQuantity: (state, action) => {
      const { id, amount } = action.payload;
      const item = state.cart.find((cartItem) => cartItem._id === id);
      if (item) {
        item.quantity += amount;
        if (item.quantity < 1) item.quantity = 1;
      }
      saveCartToLocalStorage(state.cart);
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
    reloadCart: (state) => {
      state.cart = loadCartFromLocalStorage();
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, reloadCart } = cartSlice.actions;
export default cartSlice.reducer;
