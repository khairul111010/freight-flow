import React, { ChangeEvent, useEffect, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { useParams } from "react-router-dom";
import { useLazyGetInvoicesByCustomerQuery } from "../../../store/apis/customerApi";
import Spinner from "../../../components/preloader/Spinner";
import { DataTable } from "primereact/datatable";
import { classNames } from "primereact/utils";
import { Column } from "primereact/column";
import Pagination from "../../../components/pagination";

const CustomerInvoices = () => {
    const [search, setSearch] = useState("");
    const debouncedValue = useDebounce(search, 500);
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const { id } = useParams();
    const [getInvoicesByCustomer, { data, isLoading }] =
        useLazyGetInvoicesByCustomerQuery();

    useEffect(() => {
        getInvoicesByCustomer({ id, page: 1, search: debouncedValue });
    }, [debouncedValue]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center my-10">
                <Spinner color="#44C7F4" />
            </div>
        );
    }

    return (
        <div>
            <DataTable
                pt={{
                    column: {
                        headerCell: {
                            className:
                                "bg-white px-4 py-4 text-[#9CA3AF] font-medium text-[12px]",
                        },
                        bodyCell: () => ({
                            className: classNames("px-4 text-[12px] py-2"),
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
                <Column field="invoice_number" header="Invoice Number"></Column>
                <Column field="invoice_issue_date" header="Issued"></Column>
                <Column field="invoice_due_date" header="Due"></Column>
                <Column field="master_air_way_bill" header="MAWB"></Column>
                <Column
                    field="master_air_way_bill_fee"
                    header="MAWB Fee"
                    body={(rowData) => {
                        return (
                            <>
                                {rowData.master_air_way_bill_fee.toLocaleString()}
                            </>
                        );
                    }}
                ></Column>
                <Column field="destination" header="Dest."></Column>
                <Column
                    field="cartoon_amount"
                    header="CTN"
                    body={(rowData) => {
                        return <>{rowData.cartoon_amount.toLocaleString()}</>;
                    }}
                ></Column>
                <Column
                    field="chargeable_weight"
                    header="CHW"
                    body={(rowData) => {
                        return (
                            <>{rowData.chargeable_weight.toLocaleString()}</>
                        );
                    }}
                ></Column>
                <Column
                    field="invoice_rate"
                    header="Rate"
                    body={(rowData) => {
                        return <>{rowData.invoice_rate.toLocaleString()}</>;
                    }}
                ></Column>
                <Column
                    field="invoice_ait"
                    header="AIT"
                    body={(rowData) => {
                        return <>{rowData.invoice_ait.toLocaleString()}</>;
                    }}
                ></Column>
                <Column
                    field="invoice_cgc"
                    header="CGC"
                    body={(rowData) => {
                        return <>{rowData.invoice_cgc.toLocaleString()}</>;
                    }}
                ></Column>
                <Column
                    field="invoice_dtc"
                    header="DTC"
                    body={(rowData) => {
                        return <>{rowData.invoice_dtc.toLocaleString()}</>;
                    }}
                ></Column>
                <Column
                    field="invoice_vat"
                    header="VAT"
                    body={(rowData) => {
                        return <>{rowData.invoice_vat.toLocaleString()}</>;
                    }}
                ></Column>
                <Column
                    field="others"
                    header="Others"
                    body={(rowData) => {
                        return <>{rowData.others.toLocaleString()}</>;
                    }}
                ></Column>
                <Column
                    field="invoice_total_usd"
                    header="TTL USD"
                    body={(rowData) => {
                        return (
                            <>{rowData.invoice_total_usd.toLocaleString()}</>
                        );
                    }}
                ></Column>
                <Column
                    field="invoice_exchange_rate"
                    header="Ex. Rate"
                    body={(rowData) => {
                        return (
                            <>
                                {rowData.invoice_exchange_rate.toLocaleString()}
                            </>
                        );
                    }}
                ></Column>
                <Column
                    field="invoice_receivable_amount_bdt"
                    header="TTL BDT"
                    body={(rowData) => {
                        return (
                            <>
                                {rowData.invoice_receivable_amount_bdt.toLocaleString()}
                            </>
                        );
                    }}
                ></Column>
            </DataTable>
            {data && (
                <Pagination
                    className="my-5 flex justify-center"
                    totalPages={data.last_page || 1}
                    currentPage={data.current_page || 1}
                    perPage={data.per_page || 1}
                    onPageChange={({ currentPage }) =>
                        getInvoicesByCustomer({
                            id,
                            page: currentPage,
                            search: debouncedValue,
                        })
                    }
                />
            )}
        </div>
    );
};

export default CustomerInvoices;
