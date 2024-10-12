const ProductListLoading = () => {
    return (
        <div className="w-full max-w-2xl pr-4 flex flex-col items-center gap-8 overflow-auto">
            {[...Array(5)].map((_, idx) => (
                <div key={idx} className="flex flex-row gap-4 items-center bg-neutral-100 rounded-lg shadow-md px-4 lg:px-8 py-4 hover:shadow-lg w-full max-w-2xl animate-pulse">
                    <div className="w-24 h-24 rounded-full flex justify-center items-center bg-gray-300"> </div>

                    <div className="lg:pl-6 h-24 flex flex-col gap-2 justify-around flex-grow">
                        <div className="h-6 w-1/2 text-lg lg:text-xl font-bold w-30 bg-gray-400 rounded-lg"></div>
                        <div className="h-10 text-xs font-semibold bg-gray-300 rounded-lg text-left w-3/4 overflow-hidden overflow-ellipsis line-clamp-2"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductListLoading;
