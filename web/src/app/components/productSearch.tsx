'use client';
import {MagnifyingGlassIcon} from '@heroicons/react/20/solid'
import {Dispatch, Key, SetStateAction, useEffect, useReducer, useState} from 'react';
import reducer from '../reducer/reducer'
import Loading from '../components/loading'
import Pagination from '../components/pagination'
import {
    FetchProductsErrorAction,
    FetchProductsRequestAction,
    FetchProductsSuccessAction,
    Product,
    State
} from '../interfaces/searchProducts';
import Notfound from "./notfound";

type Action = FetchProductsRequestAction | FetchProductsSuccessAction | FetchProductsErrorAction;

const initialState: State = {
    isLoading: false,
    error: null,
    count: 0,
    products: [],
};
const ITEM_PER_PAGE = 6;

export default function ProductSearch() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSearch(event.target.value);
    }

    async function fetchProducts(dispatch: Dispatch<Action>, page: number, limit: number, search: string): Promise<void> {
        dispatch({type: 'fetchProductsRequest'});
        try {
            const response = await fetch(`http://localhost:8000/products?page=${page}&limit=${limit}&search=${search}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            dispatch({type: 'fetchProductsSuccess', payload: data});
        } catch (error: Error | unknown) {
            dispatch({type: 'fetchProductsError', payload: (error as Error).message});
        }
    }

    useEffect(() => {
        const string = search.toString().trim();
        if (string.length === 0 || string.length >= 3) {
            fetchProducts(dispatch, currentPage, ITEM_PER_PAGE, search).then();
        }
    }, [currentPage, search]);


    if (state.error) {
        return <p>Error loading products: {state.error}</p>;
    }

    return <div>
        <div className='py-5 sm:py-8 max-w-sm'>
            <h3 className="text-base font-semibold leading-6 text-gray-900">Product</h3>
            <div>
                <label htmlFor="search" className="block text-sm font-medium leading-6 text-gray-900 sr-only">
                    Search product
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
                    <div className="relative flex flex-grow items-stretch focus-within:z-10">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                        </div>
                        <input
                            type="text"
                            id="search"
                            value={search}
                            onChange={handleInputChange}
                            className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder=""
                        />
                    </div>
                    <button
                        type="button"
                        className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
        <div className="flex flex-col overflow-hidden relative py-4">
            {
                (state.isLoading) && <Loading/>
            }
            {
                state.products.length > 0 &&
                <div className='bg-white shadow-sm overflow-hidden  ring-1 ring-gray-900/5 sm:rounded-xl'>
                    <ul role="list"
                        className="divide-y divide-gray-100 ">
                        <li
                            className="hidden sm:grid grid-cols-1 sm:grid-cols-5 sm:gap-4 sm:gap-x-6 space-y-2 px-4 py-5 hover:bg-gray-50 sm:px-6">
                            <div className="md:flex gap-x-4 col-span-2">
                                Product
                            </div>
                            <div className='text-center'>Status</div>
                            <div className='text-center'>Qty</div>
                            <p className="truncatetext-sm text-right">Price</p>
                        </li>
                        {state.products.map((product: Product, index: Key | null) => (
                            <li key={index}
                                className="sm:grid grid-cols-1 sm:grid-cols-5 sm:gap-4 sm:gap-x-6 space-y-2 px-4 py-5 hover:bg-gray-50 sm:px-6">
                                <div className="md:flex gap-x-4 col-span-2">
                                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={product.imageURL}
                                         alt={product.name}/>
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{product.name}</p>
                                        <p className="mt-1 flex text-xs leading-5 text-gray-500">{product.description}</p>
                                        <ul className="flex flex-wrap">
                                            {product.tags.map((tag) => (
                                                <li
                                                    key={tag}
                                                    className="m-1 px-2 rounded-full bg-blue-500 text-white text-sm font-small"
                                                >
                                                    {tag}
                                                </li>
                                            ))}
                                        </ul>

                                    </div>
                                </div>
                                <div className='sm:text-center'>
                                    <span className={`${product.status ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} inline-flex items-center rounded-full px-2.5 py-0.5 font-medium capitalize`}>{product.status ? 'active' : 'un-active'}</span>
                                </div>
                                <p className="truncatetext-sm sm:text-center"><span className='sm:hidden font-bold'>Qty:</span>{product.qty}</p>
                                <p className="truncatetext-sm sm:text-right">${product.price.toFixed(2)}</p>
                            </li>
                        ))}
                    </ul>
                    <Pagination
                        totalPages={state.count / ITEM_PER_PAGE}
                        pageSize={ITEM_PER_PAGE}
                        totalResults={state.count}
                        onChangePage={handlePageChange}
                    />
                </div>

            }
            {
                search.trim().length > 0 && state.products.length === 0
                && <Notfound text={'We apologize, but there are no products that match your search.'}/>
            }

        </div>
    </div>
}
