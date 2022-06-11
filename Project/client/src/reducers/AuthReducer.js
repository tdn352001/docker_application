

export const Type = {
    SET_AUTH: 'SET_AUTH',
    SET_CART: 'SET_CART',
    SET_HISTORY: 'SET_HISTORY'
}

export const authReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case Type.SET_AUTH:
            const { isAuthenticated, user, isAdmin, cart } = payload
            return {
                ...state,
                isAuthenticated,
                user,
                cart,
                isAdmin
            }
        case Type.SET_CART:
            return {
                ...state,
                cart: payload
            }
        case Type.SET_HISTORY:
            return {
                ...state,
                history: payload
            }

        default:
            return state;
    }
}