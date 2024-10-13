import { useState, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/solid";

type Props = {
    images: string[];
    onClose: () => void;
};

const ImageModalCarousel = ({ images, onClose }: Props) => {
    const [index, setIndex] = useState(0);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const handleNextSlide = () => {
        setIndex((index + 1) % images.length);
    };

    const handlePreviousSlide = () => {
        setIndex((index - 1 + images.length) % images.length);
    };

    return (
        <div ref={modalRef} className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center w-full min-h-screen">
            <div className="relative w-11/12 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
                <button onClick={onClose} className="absolute top-4 right-4 bg-white text-black rounded-full p-2 shadow hover:bg-gray-200">
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                </button>
                <div className="overflow-hidden">
                    <div className="flex w-full">
                        {images.map((image, idx) => (
                            <div key={idx} className={`w-full flex-shrink-0 ${idx !== index ? "hidden" : ""}`}>
                                <img src={image} alt={`image-${idx}`} className="w-full h-[80vh] object-cover rounded-lg" />
                            </div>
                        ))}
                    </div>
                </div>
                {images.length > 1 && (
                    <button onClick={handlePreviousSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2">
                        <ChevronLeftIcon className="w-12 h-12" />
                    </button>
                )}
                {images.length > 1 && (
                    <button onClick={handleNextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2">
                        <ChevronRightIcon className="w-12 h-12" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ImageModalCarousel;
