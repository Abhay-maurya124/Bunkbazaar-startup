import React from 'react'

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    
    if (totalPages <= 1) return null

    return (
        <div className="flex justify-center gap-2 my-4 ">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 rounded ${
                        currentPage === page 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                    {page}
                </button>
            ))}
        </div>
    )
}

export default Pagination