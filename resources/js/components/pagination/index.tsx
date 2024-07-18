import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { classNames } from "primereact/utils";
import { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";

type PageChange = {
    currentPage: number;
    perPage?: number;
    totalPages?: number;
};

interface PaginationProps {
    onPageChange?: (changes: PageChange) => void;
    totalPages: number;
    currentPage: number;
    perPage: number;
    className?: string;
    disableRouteSync?: boolean;
}

const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

const Pagination: FC<PaginationProps> = ({
    onPageChange,
    totalPages,
    currentPage = 1,
    perPage,
    className = "",
    disableRouteSync = false,
}) => {
    const navigate = useNavigate();
    const siblingCount = 1;

    const searchParams = new URLSearchParams(location.search);
    const paginationRange = useMemo(() => {
        // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
        const totalPageNumbers = siblingCount + 5;

        /*
            If the number of pages is less than the page numbers we want to show in our
            paginationComponent, we return the range [1..totalPageCount]
        */
        if (totalPageNumbers >= totalPages) {
            return range(1, totalPages);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPages
        );

        /*
            We do not want to show dots if there is only one position left 
            after/before the left/right page count as that would lead to a change if our Pagination
            component size which we do not want
        */
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount;
            const leftRange = range(1, leftItemCount);

            return [...leftRange, "...", totalPages];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount;
            const rightRange = range(
                totalPages - rightItemCount + 1,
                totalPages
            );
            return [firstPageIndex, "...", ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [
                firstPageIndex,
                "...",
                ...middleRange,
                "...",
                lastPageIndex,
            ];
        }
    }, [totalPages, perPage, siblingCount, currentPage]);

    if (!paginationRange) {
        return <></>;
    }

    const onNext = () => {
        if (currentPage === totalPages) return;
        onPageChange &&
            onPageChange({
                currentPage: currentPage + 1,
                perPage,
                totalPages,
            });
        if (disableRouteSync) return;
        searchParams.set("page", (currentPage + 1).toString());
        navigate({
            search: searchParams.toString(),
        });
    };

    const onPrevious = () => {
        if (currentPage === 1) return;
        onPageChange &&
            onPageChange({
                currentPage: currentPage - 1,
                perPage,
                totalPages,
            });
        if (disableRouteSync) return;
        searchParams.set("page", (currentPage - 1).toString());
        navigate({
            search: searchParams.toString(),
        });
    };
    const handlePageChange = (page: number) => {
        if (page === currentPage) return;
        onPageChange &&
            onPageChange({
                currentPage: page,
                perPage,
                totalPages,
            });
        if (disableRouteSync) return;
        searchParams.set("page", page.toString());
        navigate({
            search: searchParams.toString(),
        });
    };

    // const lastPage = paginationRange[paginationRange.length - 1]
    return (
        <div className={`${className}`}>
            <ul className={`flex items-center -space-x-px text-sm `}>
                {/* Left navigation arrow */}
                <li
                    className={classNames(
                        ` flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700`,
                        {
                            "cursor-pointer ": 1 !== currentPage,
                        }
                    )}
                    onClick={onPrevious}
                >
                    <IconChevronLeft />
                </li>
                {paginationRange.map(
                    (pageNumber: number | string, index: number) => {
                        // If the pageItem is a DOT, render the DOTS unicode character
                        if (pageNumber === "...") {
                            return (
                                <li
                                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                    key={index}
                                >
                                    &#8230;
                                </li>
                            );
                        }

                        // Render our Page Pills
                        return (
                            <li
                                key={index}
                                className={classNames(
                                    `flex items-center justify-center px-4 h-10 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700`,
                                    {
                                        "bg-gray-100":
                                            pageNumber === currentPage,
                                        "cursor-pointer bg-white":
                                            currentPage !== pageNumber,
                                    }
                                )}
                                onClick={() =>
                                    handlePageChange(pageNumber as number)
                                }
                            >
                                {pageNumber}
                            </li>
                        );
                    }
                )}
                {/*  Right Navigation arrow */}
                <li
                    className={classNames(
                        ` flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 `,
                        {
                            "cursor-pointer": currentPage !== totalPages,
                        }
                    )}
                    onClick={onNext}
                >
                    <IconChevronRight />
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
