"use client";
import { scrapeOlxProducts } from "@/actions/scrape-product";
import useStore from "@/hooks/olx-products";
import { useState } from "react"

const Searchbar = () => {

    const [searchPromt, setSearchPromt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    // products from zustand
    const products= useStore((state: any) => state.products);
    const addProduct = useStore((state: any) => state.addProduct);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // scraping logic
            const product = await scrapeOlxProducts(searchPromt);
            console.log(product);
            addProduct(product);
            setSearchPromt('');
        }
        catch(error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col lg:flex-row w-full gap-3">
            <input 
                className="w-full p-3 border-4 border-neutral-200 rounded-lg text-gray-500"
                type="text"
                placeholder="Search for an OLX product to scrape."
                value={searchPromt}
                onChange={(e) => setSearchPromt(e.target.value)}
            />
            <div className="flex gap-2">
                {/* Nút sẽ bị vô hiệu hóa (disabled) nếu searchPromt là chuỗi rỗng hoặc isLoading là true. Điều này ngăn không cho nút được nhấp trong những tình huống này. */}
                <button 
                    onClick={handleSubmit}
                    disabled={searchPromt === '' || isLoading}
                    className={` ${searchPromt !== '' && !isLoading ? "cursor-pointer" : ""}
                         bg-gray-800 w-[150px] disabled:bg-gray-400 rounded-md px-5 py-3 text-white`}
                >
                    { isLoading ? "Scraping..." : "Scrape" }
                </button>
                {/* Nút sẽ bị vô hiệu hóa (disabled) nếu:
                    !products.length là true (tức là products là một mảng rỗng hoặc có độ dài bằng 0).
                    isLoading là true (đang trong trạng thái tải dữ liệu). 
                */}
                <button 
                    onClick={handleSubmit}
                    disabled={!products.length || isLoading}
                    className={`${products.length && !isLoading ? "cursor-pointer" : ""} bg-gray-800 disabled:bg-gray-400 rounded-md shadow-xl px-5 py-3 text-white`}
                >
                    Export
                </button>
            </div>
        </div>
    )
}

export default Searchbar