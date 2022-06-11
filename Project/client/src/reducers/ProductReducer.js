

export const Type = {
    LOADING_PRODUCTS: 'LOADING_PRODUCTS',
    SET_PRODUCTS: 'SET_PRODUCTS',
    SET_STATE: 'SET_STATE',
    PRODUCTS_LOADED_FAILED: 'PRODUCTS_LOADED_FAILED',
    SET_FILTERS: 'SET_FILTERS'
}

export const productReducer = (state, action) => {
    console.log(state, action)
    const { type, payload } = action

    switch (type) {
        case Type.START_LOADING_PRODUCTS:
            return {
                ...state,
                loading: true
            }
        case Type.PRODUCTS_LOADED_FAILED:
            return {
                ...state,
                productsLoading: false,
            }
        case Type.SET_PRODUCTS:
            return {
                ...state,
                loading: false,
                products: payload,
            }
        case Type.SET_STATE:
            return {
                ...state,
                loading: false,
                products: payload.products,
                filters: payload.filters
            }
        case Type.SET_FILTERS:
            return {
                ...state,
                filters: { ...state.filters, ...payload }
            }
        default:
            return state
    }

}

