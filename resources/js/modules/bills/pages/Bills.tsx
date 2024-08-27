import { IconEye } from "@tabler/icons-react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { classNames } from "primereact/utils";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/button";
import SearchInput from "../../../components/form/search-input/SearchInput";
import Pagination from "../../../components/pagination";
import Spinner from "../../../components/preloader/Spinner";
import { AppRoutesEnum } from "../../../enums/routeEnums";
import useDebounce from "../../../hooks/useDebounce";
import {
    useLazyGetBillsQuery,
    useLazyGetInvoicePDFQuery,
} from "../../../store/apis/invoiceApi";

const Bills = () => {
    const [search, setSearch] = useState("");
    const debouncedValue = useDebounce(search, 500);
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const [getBills, { data, isLoading }] = useLazyGetBillsQuery();
    const [getInvoicePDF] = useLazyGetInvoicePDFQuery();
    useEffect(() => {
        getBills({ page: 1, search: debouncedValue });
    }, [debouncedValue]);

    const handleDownload = (id: any) => {
        getInvoicePDF(id);
    };
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
                                field="invoice_number"
                                header="Invoice Number"
                            ></Column>
                            <Column field="issue_date" header="Issued"></Column>
                            <Column field="bill_due_date" header="Due"></Column>
                            <Column
                                field="master_air_way_bill"
                                header="MAWB"
                            ></Column>
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
                                    return (
                                        <>
                                            {rowData.cartoon_amount.toLocaleString()}
                                        </>
                                    );
                                }}
                            ></Column>
                            <Column
                                field="chargeable_weight"
                                header="CHW"
                                body={(rowData) => {
                                    return (
                                        <>
                                            {rowData.chargeable_weight.toLocaleString()}
                                        </>
                                    );
                                }}
                            ></Column>
                            <Column
                                field="bill_rate"
                                header="Rate"
                                body={(rowData) => {
                                    return (
                                        <>
                                            {rowData.bill_rate.toLocaleString()}
                                        </>
                                    );
                                }}
                            ></Column>
                            <Column
                                field="ait"
                                header="AIT"
                                body={(rowData) => {
                                    return <>{rowData.ait.toLocaleString()}</>;
                                }}
                            ></Column>
                            <Column
                                field="ams"
                                header="AMS"
                                body={(rowData) => {
                                    return <>{rowData.ams.toLocaleString()}</>;
                                }}
                            ></Column>
                            <Column
                                field="cd"
                                header="CD"
                                body={(rowData) => {
                                    return <>{rowData.cd.toLocaleString()}</>;
                                }}
                            ></Column>
                            <Column
                                field="cgc"
                                header="CGC"
                                body={(rowData) => {
                                    return <>{rowData.cgc.toLocaleString()}</>;
                                }}
                            ></Column>
                            <Column
                                field="dtc"
                                header="DTC"
                                body={(rowData) => {
                                    return <>{rowData.dtc.toLocaleString()}</>;
                                }}
                            ></Column>
                            <Column
                                field="itt"
                                header="ITT"
                                body={(rowData) => {
                                    return <>{rowData.itt.toLocaleString()}</>;
                                }}
                            ></Column>
                            <Column
                                field="ssc"
                                header="SSC"
                                body={(rowData) => {
                                    return <>{rowData.ssc.toLocaleString()}</>;
                                }}
                            ></Column>
                            <Column
                                field="thc"
                                header="THC"
                                body={(rowData) => {
                                    return <>{rowData.thc.toLocaleString()}</>;
                                }}
                            ></Column>
                            <Column
                                field="others"
                                header="Others"
                                body={(rowData) => {
                                    return (
                                        <>
                                            {rowData.others?.toLocaleString() ??
                                                0}
                                        </>
                                    );
                                }}
                            ></Column>
                            <Column
                                field="bill_vat"
                                header="VAT"
                                body={(rowData) => {
                                    return (
                                        <>{rowData.bill_vat.toLocaleString()}</>
                                    );
                                }}
                            ></Column>

                            <Column
                                field="bill_total_usd"
                                header="TTL USD"
                                body={(rowData) => {
                                    return (
                                        <>
                                            {rowData.bill_total_usd.toLocaleString()}
                                        </>
                                    );
                                }}
                            ></Column>
                            <Column
                                field="exchange_rate"
                                header="Ex. Rate"
                                body={(rowData) => {
                                    return (
                                        <>
                                            {rowData.exchange_rate.toLocaleString()}
                                        </>
                                    );
                                }}
                            ></Column>
                            <Column
                                field="bill_payable_bdt"
                                header="TTL BDT"
                                body={(rowData) => {
                                    return (
                                        <>
                                            {rowData.bill_payable_bdt.toLocaleString()}
                                        </>
                                    );
                                }}
                            ></Column>

                            <Column
                                header="Action"
                                body={(rowData) => {
                                    return (
                                        <div className="flex items-center gap-2">
                                            <Link
                                                to={AppRoutesEnum.BILL_EDIT.replace(
                                                    ":id",
                                                    rowData.id
                                                )}
                                                className="bg-white p-1 rounded-md border cursor-pointer hover:bg-slate-50"
                                            >
                                                <IconEye />
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
                                    getBills({
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

export default Bills;
