"use client";
import useStore from "@/hooks/olx-products";

const Products = () => {

    const products = useStore((state: any) => state.products);

    return (
        <div className="w-full">
            {
                products?.length > 0 ? (
                    <div className="space-y-4">
                        {
                            products?.map((product: any, index: number) => 
                                product?.title ? (
                                    <div 
                                        key={index} 
                                        className="border-4 border-neutral-200 bg-white p-5 rounded-lg"
                                    >
                                        <div className="flex w-full justify-between">
                                            <h3 className="text-xl font-bold text-gray-800">{product?.title}</h3>
                                            <a 
                                                href={product?.url} 
                                                target="_blank"
                                                rel="noopener noreferrer" 
                                                className="hover:bg-gray-100 border px-3 py-1 ml-2 rounded-md h-[35px]"
                                            >
                                                🔗
                                            </a>
                                        </div>
                                    </div>
                                ) : null
                            )
                        }
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No products exists.</p>
                )
            }
        </div>
    )
}

export default Products