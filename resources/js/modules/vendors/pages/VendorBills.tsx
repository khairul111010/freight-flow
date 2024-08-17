import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    useGetBillsByVendorQuery,
    useLazyGetBillsByVendorQuery,
} from "../../../store/apis/vendorApi";
import Spinner from "../../../components/preloader/Spinner";
import useDebounce from "../../../hooks/useDebounce";
import { DataTable } from "primereact/datatable";
import { classNames } from "primereact/utils";
import { Column } from "primereact/column";
import Pagination from "../../../components/pagination";

const VendorBills = () => {
    const [search, setSearch] = useState("");
    const debouncedValue = useDebounce(search, 500);
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const { id } = useParams();
    const [getBillsByVendor, { data, isLoading }] =
        useLazyGetBillsByVendorQuery();

    useEffect(() => {
        getBillsByVendor({ id, page: 1, search: debouncedValue });
    }, [debouncedValue]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center my-10">
                <Spinner color="#44C7F4" />
            </div>
        );
    }
    return (
        <>
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
                <Column field="bill_issue_date" header="Issued"></Column>
                <Column field="bill_due_date" header="Due"></Column>
                <Column field="master_air_way_bill" header="MAWB" />
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
                    field="bill_rate"
                    header="Rate"
                    body={(rowData) => {
                        return <>{rowData.bill_rate.toLocaleString()}</>;
                    }}
                ></Column>
                <Column
                    field="bill_ait"
                    header="AIT"
                    body={(rowData) => {
                        return <>{rowData.bill_ait.toLocaleString()}</>;
                    }}
                ></Column>
                <Column
                    field="bill_cgc"
                    header="CGC"
                    body={(rowData) => {
                        return <>{rowData.bill_cgc.toLocaleString()}</>;
                    }}
                ></Column>
                <Column
                    field="bill_vat"
                    header="VAT"
                    body={(rowData) => {
                        return <>{rowData.bill_vat.toLocaleString()}</>;
                    }}
                ></Column>
                <Column
                    field="bill_total_usd"
                    header="TTL USD"
                    body={(rowData) => {
                        return <>{rowData.bill_total_usd.toLocaleString()}</>;
                    }}
                ></Column>
                <Column
                    field="bill_exchange_rate"
                    header="Ex. Rate"
                    body={(rowData) => {
                        return (
                            <>{rowData.bill_exchange_rate.toLocaleString()}</>
                        );
                    }}
                ></Column>
                <Column
                    field="bill_payable_bdt"
                    header="TTL BDT"
                    body={(rowData) => {
                        return <>{rowData.bill_payable_bdt.toLocaleString()}</>;
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
                        getBillsByVendor({
                            id,
                            page: currentPage,
                            search: debouncedValue,
                        })
                    }
                />
            )}
        </>
    );
};

export default VendorBills;
