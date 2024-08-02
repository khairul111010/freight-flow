import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "../../../components/button";
import { AppRoutesEnum } from "../../../enums/routeEnums";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useLazyGetCustomersQuery } from "../../../store/apis/customerApi";
import Spinner from "../../../components/preloader/Spinner";
import { classNames } from "primereact/utils";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Pagination from "../../../components/pagination";
import useDebounce from "../../../hooks/useDebounce";
import SearchInput from "../../../components/form/search-input/SearchInput";

const Customers = () => {
    const [search, setSearch] = useState("");
    const debouncedValue = useDebounce(search, 500);
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    const [getCustomers, { data, isLoading }] = useLazyGetCustomersQuery();
    useEffect(() => {
        getCustomers({ page: 1, search: debouncedValue });
    }, [debouncedValue]);

    return (
        <div>
            <div className="flex items-center justify-between">
                <Button
                    className="w-fit rounded-md"
                    to={AppRoutesEnum.CUSTOMERS_ADD}
                >
                    Add Customer
                </Button>
                <SearchInput
                    name="search"
                    placeholder="Search"
                    onChange={(e) => handleSearch(e)}
                />
            </div>
            <div className="bg-white rounded-md overflow-hidden mt-4">
                {isLoading ? (
                    <div className="flex items-center justify-center py-10">
                        <Spinner color="#44C7F4" />
                    </div>
                ) : (
                    <>
                        <DataTable
                            pt={{
                                column: {
                                    headerCell: {
                                        className:
                                            "bg-white px-4 py-4 text-[#9CA3AF] font-medium text-[12px]",
                                    },
                                    bodyCell: () => ({
                                        className: classNames(
                                            "px-4 text-[12px] py-2"
                                        ),
                                    }),
                                },
                                bodyRow: ({ context }: any) => ({
                                    className: classNames(
                                        context.stripedRows
                                            ? context.index % 2 === 0
                                                ? "bg-white text-gray-600"
                                                : "text-gray-600 bg-[#F9FAFB]"
                                            : "",
                                        "transition duration-200 border-b border-t border-[#E9E9E9]"
                                    ),
                                }),
                            }}
                            value={(data && data.data) || []}
                            stripedRows
                        >
                            <Column
                                header="SL. NO"
                                body={(rowData, { rowIndex }) => {
                                    return <>{rowIndex + 1}</>;
                                }}
                            />
                            <Column field="name" header="Name"></Column>
                            <Column field="email" header="Email"></Column>
                            <Column field="phone" header="Phone"></Column>
                            <Column field="address" header="Address"></Column>
                            <Column field="currency" header="Currency"></Column>
                            <Column
                                header="Action"
                                body={(rowData) => {
                                    return (
                                        <div className="flex items-center gap-2">
                                            <Link
                                                to={AppRoutesEnum.CUSTOMERS_EDIT.replace(
                                                    ":id",
                                                    rowData.id
                                                )}
                                                className="bg-white p-1 rounded-md border cursor-pointer hover:bg-slate-50"
                                            >
                                                <IconPencil />
                                            </Link>
                                        </div>
                                    );
                                }}
                            />
                        </DataTable>
                        {data && (
                            <Pagination
                                className="my-5 flex justify-center"
                                totalPages={data.last_page || 1}
                                currentPage={data.current_page || 1}
                                perPage={data.per_page || 1}
                                onPageChange={({ currentPage }) =>
                                    getCustomers({
                                        page: currentPage,
                                        search: debouncedValue,
                                    })
                                }
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Customers;
