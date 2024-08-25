import { IconDownload } from "@tabler/icons-react";
import html2pdf from "html2pdf.js";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../../components/button/BackButton";
import SeparatedDateInput from "../../../components/form/date-input/SeparatedDateInput";
import Spinner from "../../../components/preloader/Spinner";
import { useLazyGetBankAccountTransactionsQuery } from "../../../store/apis/bankApi";
import { useGetOrganizationQuery } from "../../../store/apis/organizationApi";
import CashReceiptPDF from "../../cash/components/CashReceiptPDF";
const BankTransactions = () => {
    const [tableData, setTableData] = useState([]);
    const [date, setDate] = useState<Date>(new Date());
    const { id } = useParams();
    const { data: orgData, isLoading: orgLoading } = useGetOrganizationQuery();
    const [getBankAccountTransactions, { data, isLoading }] =
        useLazyGetBankAccountTransactionsQuery();
    useEffect(() => {
        getBankAccountTransactions({
            id,
            month: date.getMonth() + 1,
            year: date.getFullYear(),
        })
            .unwrap()
            .then((res: any) => {
                const _data = res.transactions.filter((item: any) => {
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
    }, [id, date]);
    if (isLoading) {
        return (
            <div className="flex items-center justify-center my-10">
                <Spinner color="#44C7F4" />
            </div>
        );
    }
    const handleDownload = (data: any) => {
        const element = document.getElementById(`${data.id}-receipt`);
        html2pdf().from(element).save(`#MR${data.invoice_number}.pdf`);
    };

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
                        Account Name:{" "}
                        <span className="font-extrabold">
                            {data?.account_name}
                        </span>
                    </div>
                    <div>
                        Account Number:{" "}
                        <span className="font-extrabold">
                            {data?.account_number}
                        </span>
                    </div>
                    <div>
                        Balance:{" "}
                        <span className="font-extrabold">
                            {data?.opening_bank_balance.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-md overflow-hidden mt-4">
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
                                            rowData.transaction_type ===
                                            "invoice"
                                                ? "text-green-500"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {rowData.current_amount.toLocaleString()}
                                    </div>
                                );
                            }}
                        />
                        <Column
                            header="Receipt"
                            body={(rowData) => {
                                return (
                                    <div
                                        title="Download Receipt"
                                        onClick={() => handleDownload(rowData)}
                                        className="rounded-md border w-fit p-1 cursor-pointer"
                                    >
                                        <IconDownload />
                                        <div className="hidden">
                                            <CashReceiptPDF
                                                data={rowData}
                                                organizationData={orgData}
                                                method="Bank"
                                                bankInfo={{
                                                    bank_name: data?.bank?.name,
                                                    account_name:
                                                        data?.account_name,
                                                    account_number:
                                                        data?.account_number,
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            }}
                        />
                    </DataTable>
                </>
            </div>
        </div>
    );
};

export default BankTransactions;
