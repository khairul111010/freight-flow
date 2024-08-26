import { IconDownload } from "@tabler/icons-react";
import html2pdf from "html2pdf.js";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";
import BackButton from "../../../components/button/BackButton";
import SeparatedDateInput from "../../../components/form/date-input/SeparatedDateInput";
import Spinner from "../../../components/preloader/Spinner";
import { useLazyGetCashTransactionsQuery } from "../../../store/apis/bankApi";
import { useGetOrganizationQuery } from "../../../store/apis/organizationApi";
import { convertImageToBase64 } from "../../../utils/imageConvertion/convertImageToBase64";
import CashReceiptPDF from "../components/CashReceiptPDF";
const CashTransactions = () => {
    const [imageData, setImageData] = useState<string | null>(null);
    useEffect(() => {
        const imgUrl =
            "https://raw.githubusercontent.com/khairul111010/freight-flow/master/public/logo.png";
        convertImageToBase64(imgUrl).then((res) => setImageData(res));
    }, []);

    const [tableData, setTableData] = useState([]);
    const [date, setDate] = useState<Date>(new Date());
    const { data: orgData, isLoading: orgLoading } = useGetOrganizationQuery();

    const handleDownload = (data: any) => {
        const element = document.getElementById(`${data.id}-receipt`);
        html2pdf().from(element).save(`#MR${data.invoice_number}.pdf`);
    };

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
                    if (
                        item.transaction_type === "expense" &&
                        item.is_debit === 1
                    ) {
                        return item;
                    }
                    if (
                        item.transaction_type === "deposit" &&
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
                        header="Customer"
                        body={(rowData) => {
                            return <>{rowData?.invoice?.customer?.name}</>;
                        }}
                    ></Column>

                    <Column
                        header="Vendor"
                        body={(rowData) => {
                            return <>{rowData?.bill?.vendor?.name}</>;
                        }}
                    ></Column>

                    <Column
                        header="Note"
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
                                            "invoice" ||
                                        rowData.transaction_type === "deposit"
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
                        field="transaction_type"
                        header="Transaction Type"
                    ></Column>
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
                                        />
                                    </div>
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
