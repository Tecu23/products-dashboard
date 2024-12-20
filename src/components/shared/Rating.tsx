import { StarIcon } from "@heroicons/react/24/solid";

const Rating = ({ rating, size }: { rating: number; size: string }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
        <div className="flex items-center text-[#FF9017]">
            <span className={`${size == "small" ? "text-xs" : "text-lg leading-[10px]"} mr-2`}>{rating.toFixed(2)}</span>
            {[...Array(fullStars)].map((_, idx) => (
                <StarIcon key={idx} className={`${size == "small" ? "h-3 w-3" : "h-6 w-6"}`} aria-hidden="true" />
            ))}

            {hasHalfStar && (
                <svg
                    key="half"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`${size == "small" ? "h-4 w-4" : "h-6 w-6"}`}
                    aria-hidden="true"
                >
                    <defs>
                        <clipPath id="half">
                            <rect x="0" y="0" width="12" height="24" />
                        </clipPath>
                    </defs>
                    <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                        clipPath="url(#half)"
                    />
                </svg>
            )}
        </div>
    );
};

export default Rating;
