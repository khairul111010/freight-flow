import React, { ChangeEvent, useEffect, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { useParams } from "react-router-dom";
import {
    useGetCustomerQuery,
    useLazyGetCustomerTransactionsQuery,
    useLazyGetInvoicesByCustomerQuery,
} from "../../../store/apis/customerApi";
import Spinner from "../../../components/preloader/Spinner";
import { DataTable } from "primereact/datatable";
import { classNames } from "primereact/utils";
import { Column } from "primereact/column";
import Pagination from "../../../components/pagination";
import SeparatedDateInput from "../../../components/form/date-input/SeparatedDateInput";

const CustomerInvoices = () => {
    const [tableData, setTableData] = useState([]);
    const [thisMonthDue, setThisMonthDue] = useState(0);
    const [date, setDate] = useState<Date>(new Date());
    const { id } = useParams();
    const [getCustomerTransactions, { isLoading }] =
        useLazyGetCustomerTransactionsQuery();

    const { data: customerData, isLoading: customerLoading } =
        useGetCustomerQuery(id);

    useEffect(() => {
        getCustomerTransactions({
            id,
            month: date.getMonth() + 1,
            year: date.getFullYear(),
        })
            .unwrap()
            .then((res: any) => {
                const _table = res
                    .map((item: any) =>
                        item.transactions.filter((transaction: any) => {
                            return (
                                transaction.is_debit === 0 &&
                                transaction.amount !== 0
                            );
                        })
                    )
                    .flat();

                const totalDue = res.reduce(
                    (sum: number, item: any) => sum + item.invoice_due_balance,
                    0
                );

                setThisMonthDue(totalDue);

                setTableData(_table);
            });
    }, [id, date]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center my-10">
                <Spinner color="#44C7F4" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <div className="w-fit">
                    <SeparatedDateInput
                        onChange={(val: any) => setDate(val)}
                        value={date}
                    />
                </div>
                <div>
                    {!customerLoading ? (
                        <>
                            <div>
                                Name: <span>{customerData.name}</span>
                            </div>
                            <div>
                                Email: <span>{customerData.email}</span>
                            </div>
                            <div>
                                Address: <span>{customerData.address}</span>
                            </div>
                            <div>
                                (Selected Month)Due Balance:{" "}
                                <span className="font-extrabold">
                                    {thisMonthDue.toLocaleString()}
                                </span>
                            </div>
                        </>
                    ) : (
                        <Spinner color="#44C7F4" />
                    )}
                </div>
            </div>
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
                value={tableData}
                stripedRows
            >
                <Column
                    header="SL"
                    body={(rowData, { rowIndex }) => {
                        return <>{rowIndex + 1}</>;
                    }}
                />
                <Column field="invoice_number" header="Invoice Number"></Column>
                <Column field="transaction_date" header="Date"></Column>
                <Column field="payment_method" header="Method"></Column>
                <Column field="current_amount" header="Amount"></Column>
                <Column field="transaction_note" header="Receipt"></Column>
            </DataTable>
        </div>
    );
};

export default CustomerInvoices;
