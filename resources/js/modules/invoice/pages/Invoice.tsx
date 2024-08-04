import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "../../../components/button";
import { AppRoutesEnum } from "../../../enums/routeEnums";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Spinner from "../../../components/preloader/Spinner";
import { classNames } from "primereact/utils";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Pagination from "../../../components/pagination";
import { useLazyGetInvoicesQuery } from "../../../store/apis/invoiceApi";
import SearchInput from "../../../components/form/search-input/SearchInput";
import useDebounce from "../../../hooks/useDebounce";

const Invoice = () => {
    const [search, setSearch] = useState("");
    const debouncedValue = useDebounce(search, 500);
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    const [getInvoices, { data, isLoading }] = useLazyGetInvoicesQuery();
    useEffect(() => {
        getInvoices({ page: 1, search: debouncedValue });
    }, [debouncedValue]);

    return (
        <div>
            <div className="flex items-center justify-between">
                <Button
                    className="w-fit rounded-md"
                    to={AppRoutesEnum.INVOICE_ADD}
                >
                    Add Invoice
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
                                header="SL"
                                body={(rowData, { rowIndex }) => {
                                    return <>{rowIndex + 1}</>;
                                }}
                            />
                            <Column
                                field="invoice_number"
                                header="Invoice Number"
                            ></Column>
                            <Column
                                field="invoice_issue_date"
                                header="Issued"
                            ></Column>
                            <Column
                                field="invoice_due_date"
                                header="Due"
                            ></Column>
                            <Column
                                field="master_air_way_bill"
                                header="MAWB"
                            ></Column>
                            <Column
                                field="master_air_way_bill_fee"
                                header="MAWB Fee"
                            ></Column>
                            <Column field="destination" header="Dest."></Column>
                            <Column
                                field="cartoon_amount"
                                header="CTN"
                            ></Column>
                            <Column
                                field="chargeable_weight"
                                header="CHW"
                            ></Column>
                            <Column field="invoice_rate" header="Rate"></Column>
                            <Column field="invoice_ait" header="AIT"></Column>
                            <Column field="invoice_cgc" header="CGC"></Column>
                            <Column field="invoice_dtc" header="DTC"></Column>
                            <Column field="invoice_vat" header="VAT"></Column>
                            <Column field="others" header="Others"></Column>
                            <Column
                                field="invoice_total_usd"
                                header="TTL USD"
                            ></Column>
                            <Column
                                field="invoice_exchange_rate"
                                header="Ex. Rate"
                            ></Column>
                            <Column
                                field="invoice_receivable_amount_bdt"
                                header="TTL BDT"
                            ></Column>

                            {/* <Column
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
                                            <div className="bg-white p-1 rounded-md border cursor-pointer hover:bg-slate-50">
                                                <IconTrash />
                                            </div>
                                        </div>
                                    );
                                }}
                            /> */}
                        </DataTable>
                        {data && (
                            <Pagination
                                className="my-5 flex justify-center"
                                totalPages={data.last_page || 1}
                                currentPage={data.current_page || 1}
                                perPage={data.per_page || 1}
                                onPageChange={({ currentPage }) =>
                                    getInvoices({
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

export default Invoice;
