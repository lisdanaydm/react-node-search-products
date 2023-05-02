import { useState } from 'react';

type Props = {
    totalPages: number;
    pageSize: number;
    totalResults: number;
    onChangePage: (pageNumber: number) => void;
};

export default function Pagination({totalPages, pageSize, totalResults, onChangePage }: Props) {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            onChangePage(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            onChangePage(currentPage + 1);
        }
    };

    const startIndex = (currentPage - 1) * pageSize + 1;
    const endIndex = Math.min(startIndex + pageSize - 1, totalResults);

    return (
        <nav className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6' aria-label='Pagination'>
            <div className='hidden sm:block'>
                <p className='text-sm text-gray-700'>
                    Showing <span className='font-medium'>{startIndex}</span> to{' '}
                    <span className='font-medium'>{endIndex}</span> of{' '}
                    <span className='font-medium'>{totalResults}</span> results
                </p>
            </div>
            <div className='flex-1 flex justify-between sm:justify-end'>
                <button
                    className={`relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0" ${
                        currentPage === 1 ? 'bg-gray-50 text-gray-500' : 'bg-white text-gray-700 hover:text-gray-500'
                    }`}
                    onClick={handlePrevClick}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    className={`relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 ${
                        currentPage === totalPages ? 'bg-gray-50 text-gray-500' : 'bg-white text-gray-700 hover:text-gray-500'
                    }`}
                    onClick={handleNextClick}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </nav>
    );
}
