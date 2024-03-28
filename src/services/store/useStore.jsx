import {create} from "zustand";


const useStore = create((set) =>({
    orders: [],
    setOrders: (newOrder) => set((state) => {
        if (newOrder.count === 0 || newOrder.count === null) {
            const updatedOrders = state.orders.filter(order => order.id !== newOrder.id);
            return { ...state, orders: updatedOrders };
        } else {
            const existingOrderIndex = state.orders.findIndex(order => order.id === newOrder.id);
            if (existingOrderIndex !== -1) {
                const updatedOrders = [...state.orders];
                updatedOrders[existingOrderIndex] = newOrder;
                return { ...state, orders: updatedOrders };
            } else {
                return { ...state, orders: [...state.orders, newOrder] };
            }
        }
    }),
    increment: (item) =>
        set((state) => {
            const existingOrderIndex = state.orders.findIndex((order) => order.id === item.id);
            if (existingOrderIndex !== -1) {
                const updatedOrders = [...state.orders];
                updatedOrders[existingOrderIndex].count++;
                return { ...state, orders: updatedOrders };
            } else {
                const newItem = { id: item.id, count: 1, variationId: item.variationId };
                return { ...state, orders: [...state.orders, newItem] };
            }
        }),
    decrement: (itemId) =>
        set((state) => {
            const existingOrderIndex = state.orders.findIndex((order) => order.id === itemId);
            if (existingOrderIndex !== -1 && state.orders[existingOrderIndex].count > 0) {
                const updatedOrders = [...state.orders];
                updatedOrders[existingOrderIndex].count--;
                return { ...state, orders: updatedOrders };
            }
            return state;
        }),
}))

export default useStore;
