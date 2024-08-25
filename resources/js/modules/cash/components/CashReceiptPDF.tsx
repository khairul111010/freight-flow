import { FC, useEffect, useState } from "react";
import { convertImageToBase64 } from "../../../utils/imageConvertion/convertImageToBase64";

type Props = {
    data?: any;
    organizationData?: any;
    image?: any;
    method?: string;
    bankInfo?: any;
};
const CashReceiptPDF: FC<Props> = ({
    data,
    image,
    organizationData,
    method = "Cash",
    bankInfo,
}) => {
    const [imageData, setImageData] = useState<string | null>(null);
    useEffect(() => {
        const imgUrl =
            "https://raw.githubusercontent.com/khairul111010/freight-flow/master/public/logo.png";
        convertImageToBase64(imgUrl).then((res) => setImageData(res));
    }, []);

    return (
        <div className="bg-white p-8 text-xs" id={`${data.id}-receipt`}>
            <div className="rounded-md">
                <div className="flex items-center justify-between font-semibold border-b pb-1">
                    <div className="flex items-center gap-2 text-gray-500">
                        <div>
                            {imageData && (
                                <img src={imageData} alt="" className="w-40" />
                            )}
                        </div>
                        <div className="text-xs">
                            <div>{organizationData?.address}</div>
                            <div>{organizationData?.description}</div>
                        </div>
                    </div>
                    <div>
                        <div>MONEY RECEIPT</div>
                        <div className="text-gray-500">
                            #MR-{data?.invoice_number}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-1">
                    <div>
                        <div className="italic">BILL TO</div>
                        <div className="font-bold">
                            {data?.invoice?.customer?.name}
                        </div>
                    </div>
                    <div className="flex items-center gap-8">
                        <div>
                            <div className="italic">Date</div>
                            <div className="font-bold">
                                {data?.transaction_date}
                            </div>
                        </div>
                    </div>
                </div>

                <div>Payment Method: {method}</div>
                {method === "Bank" && (
                    <div>
                        <div>Bank Name: {bankInfo.bank_name}</div>
                        <div>Account Name: {bankInfo.account_name}</div>
                        <div>Account Number: {bankInfo.account_number}</div>
                    </div>
                )}
                <div>
                    {method} Note: {data?.transaction_note}
                </div>

                <div className="mt-2">
                    <table className="border mt-2 w-full">
                        <thead>
                            <tr className="divide-x border-b italic">
                                <th className="p-1 w-[10%]">SL</th>
                                <th className="p-1">INVOICE</th>
                                <th className="p-1">RECEIVED</th>
                                <th className="p-1">TOTAL RECEIVED</th>
                                <th className="p-1">DUE</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr className="divide-x">
                                <th className="p-1 font-normal text-center">
                                    1
                                </th>
                                <th className="p-1 font-normal text-left">
                                    {data?.invoice_number}
                                </th>
                                <th className="p-1 font-normal text-right">
                                    {" "}
                                    {data?.current_amount}
                                </th>
                                <th className="p-1 font-normal text-right">
                                    {" "}
                                    {data?.amount}
                                </th>
                                <th className="p-1 text-right font-normal">
                                    {data?.invoice
                                        ?.invoice_receivable_amount_bdt -
                                        data?.amount}
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CashReceiptPDF;
