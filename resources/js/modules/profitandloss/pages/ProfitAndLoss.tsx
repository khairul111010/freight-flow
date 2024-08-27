import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";
import SeparatedDateInput from "../../../components/form/date-input/SeparatedDateInput";
import Spinner from "../../../components/preloader/Spinner";
import { useLazyGetProfitLossQuery } from "../../../store/apis/profitLossApi";

const ProfitAndLoss = () => {
    const [date, setDate] = useState<Date>(new Date());
    const [total, setTotal] = useState(0);
    const [getProfitLoss, { data, isLoading }] = useLazyGetProfitLossQuery();
    useEffect(() => {
        getProfitLoss({ month: date.getMonth() + 1, year: date.getFullYear() });
    }, [date]);

    useEffect(() => {
        if (data) {
            const totalValue = data.reduce((acc: any, curr: any) => {
                return acc + curr.profit;
            }, 0);
            setTotal(totalValue);
        }
    }, [data]);

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="w-fit">
                    <SeparatedDateInput
                        onChange={(val: any) => setDate(val)}
                        value={date}
                    />
                </div>
                <div>
                    Total:{" "}
                    <span className="font-bold">{total.toLocaleString()} </span>
                    BDT
                </div>
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
                            value={(data && data) || []}
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
                            <Column field="issue_date" header="Issued"></Column>
                            <Column field="customer" header="Customer"></Column>
                            <Column field="vendor" header="Vendor"></Column>
                            <Column
                                field="master_air_way_bill"
                                header="MAWB"
                            ></Column>
                            <Column field="destination" header="Dest."></Column>
                            <Column
                                field="cartoon_amount"
                                header="Cartoon"
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
                                field="gross_weight"
                                header="GROSS WEIGHT"
                                body={(rowData) => {
                                    return (
                                        <>
                                            {rowData.gross_weight.toLocaleString()}
                                        </>
                                    );
                                }}
                            ></Column>
                            <Column
                                field="invoice_rate"
                                header="Invoice Rate"
                                body={(rowData) => {
                                    return (
                                        <>
                                            {rowData.invoice_rate.toLocaleString()}
                                        </>
                                    );
                                }}
                            ></Column>
                            <Column
                                field="bill_rate"
                                header="Bill Rate"
                                body={(rowData) => {
                                    return (
                                        <>
                                            {rowData.bill_rate.toLocaleString()}
                                        </>
                                    );
                                }}
                            ></Column>
                            <Column
                                field="exchange_rate"
                                header="Ex.Rate"
                                body={(rowData) => {
                                    return (
                                        <>
                                            {rowData.exchange_rate.toLocaleString()}
                                        </>
                                    );
                                }}
                            ></Column>
                            <Column
                                field="invoice_total_usd"
                                header="Invoice TTL (USD)"
                                body={(rowData) => {
                                    return (
                                        <>
                                            {rowData.invoice_total_usd.toLocaleString()}
                                        </>
                                    );
                                }}
                            ></Column>
                            <Column
                                field="invoice_receivable_amount_bdt"
                                header="Invoice TTL (BDT)"
                                body={(rowData) => {
                                    return (
                                        <>
                                            {rowData.invoice_receivable_amount_bdt.toLocaleString()}
                                        </>
                                    );
                                }}
                            ></Column>
                            <Column
                                field="bill_payable_bdt"
                                header="Bill TTL (BDT)"
                                body={(rowData) => {
                                    return (
                                        <>
                                            {rowData.bill_payable_bdt.toLocaleString()}
                                        </>
                                    );
                                }}
                            ></Column>
                            <Column
                                field="profit"
                                header="Profit/Loss (BDT)"
                                body={(rowData) => {
                                    return (
                                        <>{rowData.profit.toLocaleString()}</>
                                    );
                                }}
                            ></Column>
                        </DataTable>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfitAndLoss;
