import React from 'react'

const Cart = () => {
    return (
        <div className="bg-red-200 h-48 flex">
            <button 
                className={`cursor-pointer bg-gray-800 w-[150px] disabled:bg-gray-400 rounded-md px-5 py-3 text-white`}
            >
                Scrape
            </button>
        </div>
    )
}

export default Cart