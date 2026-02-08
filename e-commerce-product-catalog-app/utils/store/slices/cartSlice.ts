// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Product } from "@/interfaces";

// interface CartItem {
//   product: Product;
//   quantity: number;
// }

// interface CartState {
//   items: CartItem[];
//   totalQuantity: number;
// }

// const initialState: CartState = {
//   items: [],
//   totalQuantity: 0,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart(state, action: PayloadAction<Product>) {
//       const existingItem = state.items.find(
//         (item) => item.product.id === action.payload.id,
//       );

//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({ product: action.payload, quantity: 1 });
//       }

//       state.totalQuantity += 1;
//     },

//     removeFromCart(state, action: PayloadAction<number>) {
//       const item = state.items.find(
//         (item) => item.product.id === action.payload,
//       );

//       if (!item) return;

//       item.quantity -= 1;
//       state.totalQuantity -= 1;

//       if (item.quantity === 0) {
//         state.items = state.items.filter(
//           (i) => i.product.id !== action.payload,
//         );
//       }
//     },
//   },
// });

// export const { addToCart, removeFromCart } = cartSlice.actions;
// export default cartSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/interfaces";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product: action.payload,
          quantity: 1,
        });
      }

      state.totalQuantity += 1;
    },

    decreaseQty(state, action: PayloadAction<number>) {
      const item = state.items.find(
        (item) => item.product.id === action.payload,
      );

      if (!item) return;

      item.quantity -= 1;
      state.totalQuantity -= 1;

      if (item.quantity === 0) {
        state.items = state.items.filter(
          (i) => i.product.id !== action.payload,
        );
      }
    },

    removeFromCart(state, action: PayloadAction<number>) {
      const item = state.items.find(
        (item) => item.product.id === action.payload,
      );

      if (!item) return;

      state.totalQuantity -= item.quantity;

      state.items = state.items.filter((i) => i.product.id !== action.payload);
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, decreaseQty, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
