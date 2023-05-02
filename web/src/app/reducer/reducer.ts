import {
    FetchProductsErrorAction,
    FetchProductsRequestAction,
    FetchProductsSuccessAction,
    State
} from '../interfaces/searchProducts';

type Action = FetchProductsRequestAction | FetchProductsSuccessAction | FetchProductsErrorAction;

export default function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'fetchProductsRequest':
            return {...state, isLoading: true};
        case 'fetchProductsSuccess':
            const { count, data } = action.payload;
            return {isLoading: false, error: null, products: data, count: count};
        case 'fetchProductsError':
            return {...state, isLoading: false, error: action.payload};
        default:
            throw new Error();
    }
}
