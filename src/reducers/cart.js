export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || [];

export const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART',
    CALCULAR_TOTAL: 'CALCULAR_TOTAL',
    CANTIDAD_PRODUCTOS: 'CANTIDAD_PRODUCTOS'
}


//update localstorage con el state del carrito
export const updateLocalStorage = (state) => {
    window.localStorage.setItem('cart', JSON.stringify(state));
}

export const cartReducer = (state, action) => {
    const { type: actionType, payload: actionPayload } = action;

    switch (actionType) {
        case CART_ACTION_TYPES.ADD_TO_CART: {
            const { PRODUCT_ID } = actionPayload;
            const productInCartIndex = state.findIndex(item => item.PRODUCT_ID === PRODUCT_ID);

            if (productInCartIndex >=0) {
                const newState = structuredClone(state);
                newState[productInCartIndex].quantity += 1;
                newState['amount'] = state.reduce((acc, item) => acc + (item.quantity * item.PRICE), 0);
                updateLocalStorage(newState);
                return newState;
            }

            const newState = [
                ...state,
                {
                    ...actionPayload,
                    quantity: 1
                }
            ]
            newState['amount'] = state.reduce((acc, item) => acc + (item.quantity * item.PRICE), 0);
            updateLocalStorage(newState);
            return newState;

        }

        case CART_ACTION_TYPES.REMOVE_FROM_CART: {

            const { PRODUCT_ID } = actionPayload;
            const productInCartIndex = state.findIndex(item => item.PRODUCT_ID === PRODUCT_ID);
            const quantity = state[productInCartIndex].quantity;

            if(productInCartIndex >= 0 && quantity > 1	){
                const newState = structuredClone(state);
                newState[productInCartIndex].quantity -= 1;
                newState['amount'] = state.reduce((acc, item) => acc + (item.quantity * item.PRICE), 0);
                updateLocalStorage(newState);
                return newState;
            }
            const newState = state.filter(item => item.PRODUCT_ID !== PRODUCT_ID);
            newState['amount'] = state.reduce((acc, item) => acc + (item.quantity * item.PRICE), 0);
            updateLocalStorage(newState);
            return newState;
        }

        case CART_ACTION_TYPES.CLEAR_CART: {
            updateLocalStorage([]);
            return [];
        }

        case CART_ACTION_TYPES.CALCULAR_TOTAL: {

            const amount = state.reduce((acc, item) => acc + item.quantity * item.PRICE, 0);
            return amount;
        }

        case CART_ACTION_TYPES.CANTIDAD_PRODUCTOS: {
            const cantidad = state.reduce((acc, item) => acc + item.quantity, 0);
            return cantidad;
        }
    }

    return state;
}