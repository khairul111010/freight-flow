import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";
import BackButton from "../../../components/button/BackButton";
import SeparatedDateInput from "../../../components/form/date-input/SeparatedDateInput";
import Spinner from "../../../components/preloader/Spinner";
import { useLazyGetCashTransactionsQuery } from "../../../store/apis/bankApi";
import { useGetOrganizationQuery } from "../../../store/apis/organizationApi";

const CashTransactions = () => {
    const [tableData, setTableData] = useState([]);
    const [date, setDate] = useState<Date>(new Date());
    const { data: orgData, isLoading: orgLoading } = useGetOrganizationQuery();

    const [getCashTransactions, { data, isLoading }] =
        useLazyGetCashTransactionsQuery();
    useEffect(() => {
        getCashTransactions({
            month: date.getMonth() + 1,
            year: date.getFullYear(),
        })
            .unwrap()
            .then((res: any) => {
                const _data = res.filter((item: any) => {
                    if (
                        item.transaction_type === "invoice" &&
                        item.is_debit === 0
                    ) {
                        return item;
                    }
                    if (
                        item.transaction_type === "bill" &&
                        item.is_debit === 1
                    ) {
                        return item;
                    }
                });
                setTableData(_data);
            });
    }, [date]);

    if (orgLoading || isLoading) {
        return (
            <div className="flex items-center justify-center my-10">
                <Spinner color="#44C7F4" />
            </div>
        );
    }

    console.log(tableData);

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <BackButton />
                    <div className="w-fit">
                        <SeparatedDateInput
                            onChange={(val: any) => setDate(val)}
                            value={date}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        Balance:{" "}
                        <span className="font-extrabold">
                            {orgData?.opening_cash_balance.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-2">
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
                    value={tableData || []}
                    stripedRows
                >
                    <Column
                        header="SL"
                        body={(rowData, { rowIndex }) => {
                            return <>{rowIndex + 1}</>;
                        }}
                    />
                    <Column field="transaction_date" header="Date"></Column>

                    <Column
                        field="invoice_number"
                        header="Invoice Number"
                    ></Column>
                    <Column
                        header="Invoice Number"
                        body={(rowData) => {
                            return <>{rowData.transaction_note}</>;
                        }}
                    ></Column>
                    <Column
                        field="current_amount"
                        header="Amount"
                        body={(rowData) => {
                            return (
                                <div
                                    className={`${
                                        rowData.transaction_type === "invoice"
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    {rowData.current_amount.toLocaleString()}
                                </div>
                            );
                        }}
                    />
                </DataTable>
            </div>
        </div>
    );
};

export default CashTransactions;
