<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{$invoice->invoice_number}}</title>
    <style>
        *,
        *::before,
        *::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html,
        body {
            margin: 0;
            padding: 0;
        }

        table {
            width: 100%;
        }
    </style>
</head>

<body>
    <div
        style="margin: auto; padding: 16px; border: 1px solid #eee; font-size: 16px; line-height: 24px; font-family: 'Inter', sans-serif; color: #555; background-color: #F9FAFC;">
        <table style="font-size: 12px; line-height: 20px;">
            <thead>
                <tr>
                    <td style="padding: 0 16px 18px 16px;">
                        <!-- <img src="https://raw.githubusercontent.com/khairul111010/freight-flow/master/public/logo.png"
                            alt="" width="200" height="48"> -->
                        <h1
                            style="color: #1A1C21; font-size: 18px; font-style: normal; font-weight: 600; line-height: normal;">
                            {{$name}}
                        </h1>
                        <p>{{$description}}</p>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="">
                        <table
                            style="background-color: #FFF; padding: 20px 16px; border: 1px solid #D7DAE0;width: 100%; border-radius: 12px;font-size: 12px; line-height: 20px; table-layout: fixed;">
                            <tbody>
                                <tr>
                                    <td
                                        style="vertical-align: top; width: 30%; padding-right: 20px;padding-bottom: 35px;">
                                        <p style="font-weight: 700; color: #1A1C21;">{{$invoice->customer->name}}</p>
                                        <p style="color: #5E6470;">{{$invoice->customer->address}}</p>
                                        <p style="color: #5E6470;">{{$invoice->customer->email}}</p>
                                    </td>
                                    <td
                                        style="vertical-align: top; width: 35%; padding-right: 20px;padding-bottom: 35px;">
                                        <!-- <p style="font-weight: 700; color: #1A1C21;">Pick-up</p>
                                        <p style="color: #5E6470;">1 Hight street, London, E1 7QL Uk</p>

                                        <p style="font-weight: 700; color: #1A1C21;">Drop-off</p>
                                        <p style="color: #5E6470;">1 Hight street, London, E1 7QL Uk</p> -->
                                    </td>
                                    <td style="vertical-align: top;padding-bottom: 35px;">
                                        <table style="table-layout: fixed;width:-webkit-fill-available;">
                                            <tr>
                                                <th style="text-align: left; color: #1A1C21;">MAWB</th>
                                                <td style="text-align: right;">{{$invoice->master_air_way_bill}}</td>
                                            </tr>
                                            <tr>
                                                <th style="text-align: left; color: #1A1C21;">Destination</th>
                                                <td style="text-align: right;">{{$invoice->destination}}</td>
                                            </tr>
                                            <tr>
                                                <th style="text-align: left; color: #1A1C21;">Cartoon Amount</th>
                                                <td style="text-align: right;">{{$invoice->cartoon_amount}}</td>
                                            </tr>
                                            <tr>
                                                <th style="text-align: left; color: #1A1C21;">Total Weight</th>
                                                <td style="text-align: right;">{{$invoice->chargeable_weight}}</td>
                                            </tr>
                                            <tr>
                                                <th style="text-align: left; color: #1A1C21;">Invoice Date</th>
                                                <td style="text-align: right;">{{$invoice->invoice_issue_date}}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom: 13px;">
                                        <p style="color: #5E6470;">Invoice Number</p>
                                        <p style="font-weight: 700; color: #1A1C21;">#{{$invoice->invoice_number}}</p>
                                    </td>
                                    <td style="text-align: center; padding-bottom: 13px;">
                                        <!-- <p style="color: #5E6470;">Invoice number</p>
                                        <p style="font-weight: 700; color: #1A1C21;">#{{$invoice->invoice_number}}</p> -->
                                    </td>
                                    <td style="text-align: end; padding-bottom: 13px;">
                                        <p style="color: #5E6470;">Due date</p>
                                        <p style="font-weight: 700; color: #1A1C21;">{{$invoice->invoice_due_date}}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        <table style="width: 100%;border-spacing: 0;">
                                            <thead>
                                                <tr style="text-transform: uppercase;">
                                                    <td
                                                        style="padding: 8px 0; border-top:1px solid #D7DAE0; border-bottom:1px solid #D7DAE0;">
                                                        Item
                                                        Detail</td>
                                                    <td
                                                        style="padding: 8px 0; border-top:1px solid #D7DAE0; border-bottom:1px solid #D7DAE0;">
                                                    </td>
                                                    <td
                                                        style="padding: 8px 0; border-top:1px solid #D7DAE0; border-bottom:1px solid #D7DAE0; text-align: end;">
                                                    </td>
                                                    <td
                                                        style="padding: 8px 0; border-top:1px solid #D7DAE0; border-bottom:1px solid #D7DAE0; text-align: end;">
                                                        Amount</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style="padding-block: 12px;">
                                                        <p style="font-weight: 700; color: #1A1C21;">
                                                            MAWB Fee
                                                        </p>
                                                    </td>
                                                    <td style="padding-block: 12px;">
                                                        <p style="font-weight: 700; color: #1A1C21;"></p>
                                                    </td>
                                                    <td style="padding-block: 12px; text-align: end;">
                                                        <p style="font-weight: 700; color: #1A1C21;"></p>
                                                    </td>
                                                    <td style="padding-block: 12px; text-align: end;">
                                                        <p style="font-weight: 700; color: #1A1C21;">
                                                            ${{$invoice->master_air_way_bill_fee}}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-block: 12px;">
                                                        <p style="font-weight: 700; color: #1A1C21;">
                                                            Invoice Rate
                                                        </p>
                                                    </td>
                                                    <td style="padding-block: 12px;">
                                                        <p style="font-weight: 700; color: #1A1C21;"></p>
                                                    </td>
                                                    <td style="padding-block: 12px; text-align: end;">
                                                        <p style="font-weight: 700; color: #1A1C21;"></p>
                                                    </td>
                                                    <td style="padding-block: 12px; text-align: end;">
                                                        <p style="font-weight: 700; color: #1A1C21;">
                                                            ${{$invoice->invoice_rate}}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-block: 12px;">
                                                        <p style="font-weight: 700; color: #1A1C21;">
                                                            CGC
                                                        </p>
                                                    </td>
                                                    <td style="padding-block: 12px;">
                                                        <p style="font-weight: 700; color: #1A1C21;"></p>
                                                    </td>
                                                    <td style="padding-block: 12px; text-align: end;">
                                                        <p style="font-weight: 700; color: #1A1C21;"></p>
                                                    </td>
                                                    <td style="padding-block: 12px; text-align: end;">
                                                        <p style="font-weight: 700; color: #1A1C21;">
                                                            ${{$invoice->invoice_cgc}}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-block: 12px;">
                                                        <p style="font-weight: 700; color: #1A1C21;">
                                                            DTC
                                                        </p>
                                                    </td>
                                                    <td style="padding-block: 12px;">
                                                        <p style="font-weight: 700; color: #1A1C21;"></p>
                                                    </td>
                                                    <td style="padding-block: 12px; text-align: end;">
                                                        <p style="font-weight: 700; color: #1A1C21;"></p>
                                                    </td>
                                                    <td style="padding-block: 12px; text-align: end;">
                                                        <p style="font-weight: 700; color: #1A1C21;">
                                                            ${{$invoice->invoice_dtc}}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-block: 12px;">
                                                        <p style="font-weight: 700; color: #1A1C21;">
                                                            AIT
                                                        </p>
                                                    </td>
                                                    <td style="padding-block: 12px;">
                                                        <p style="font-weight: 700; color: #1A1C21;"></p>
                                                    </td>
                                                    <td style="padding-block: 12px; text-align: end;">
                                                        <p style="font-weight: 700; color: #1A1C21;"></p>
                                                    </td>
                                                    <td style="padding-block: 12px; text-align: end;">
                                                        <p style="font-weight: 700; color: #1A1C21;">
                                                            ${{$invoice->invoice_ait}}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-block: 12px;">
                                                        <p style="font-weight: 700; color: #1A1C21;">
                                                            Others
                                                        </p>
                                                    </td>
                                                    <td style="padding-block: 12px;">
                                                        <p style="font-weight: 700; color: #1A1C21;"></p>
                                                    </td>
                                                    <td style="padding-block: 12px; text-align: end;">
                                                        <p style="font-weight: 700; color: #1A1C21;"></p>
                                                    </td>
                                                    <td style="padding-block: 12px; text-align: end;">
                                                        <p style="font-weight: 700; color: #1A1C21;">
                                                            ${{$invoice->others}}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-block: 12px;">
                                                        <p style="font-weight: 700; color: #1A1C21;">
                                                            Vat
                                                        </p>
                                                    </td>
                                                    <td style="padding-block: 12px;">
                                                        <p style="font-weight: 700; color: #1A1C21;"></p>
                                                    </td>
                                                    <td style="padding-block: 12px; text-align: end;">
                                                        <p style="font-weight: 700; color: #1A1C21;"></p>
                                                    </td>
                                                    <td style="padding-block: 12px; text-align: end;">
                                                        <p style="font-weight: 700; color: #1A1C21;">
                                                            ${{$invoice->invoice_vat}}</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td style="padding: 12px 0; border-top:1px solid #D7DAE0;"></td>
                                                    <td style="border-top:1px solid #D7DAE0;" colspan="3">
                                                        <table style="width: 100%;border-spacing: 0;">
                                                            <tbody>
                                                                <tr>
                                                                    <th
                                                                        style="padding-top: 12px;text-align: start; color: #1A1C21;">
                                                                        Total USD</th>
                                                                    <td
                                                                        style="padding-top: 12px;text-align: end; color: #1A1C21;">
                                                                        ${{$invoice->invoice_total_usd}}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th
                                                                        style="padding: 12px 0;text-align: start; color: #1A1C21;">
                                                                        Exchange Rate</th>
                                                                    <td
                                                                        style="padding: 12px 0;text-align: end; color: #1A1C21;">
                                                                        BDT {{$invoice->invoice_exchange_rate}}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th
                                                                        style="padding: 12px 0;text-align: start; color: #1A1C21;border-top:1px solid #D7DAE0;">
                                                                        Total Price BDT</th>
                                                                    <td
                                                                        style="padding: 12px 0;text-align: end; color: #1A1C21;border-top:1px solid #D7DAE0;">
                                                                        BDT {{$invoice->invoice_receivable_amount_bdt}}
                                                                    </td>
                                                                </tr>
                                                            </tbody>

                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>

                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td style="padding-top: 30px;">
                        <p style="display: flex; gap: 0 13px;"><span
                                style="color: #1A1C21;font-weight: 700;">{{$name}}</span><span> {{$address}}</span></p>
                        <p style="color: #1A1C21;">Any questions, contact customer service at <a
                                href="mailto:sonikabd@gmail.com" style="color: #000;">sonikabd@gmail.com</a>.
                        </p>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</body>

</html>