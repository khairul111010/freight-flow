import { useState } from "react";
import SeparatedDateInput from "../../../components/form/date-input/SeparatedDateInput";

const ProfitAndLoss = () => {
    const [date, setDate] = useState<Date>(new Date());
    return (
        <div>
            <div className="w-fit">
                <SeparatedDateInput
                    onChange={(val: any) => setDate(val)}
                    value={date}
                />
            </div>
            <div className="bg-white rounded-md overflow-hidden mt-4">
                hello
            </div>
        </div>
    );
};

export default ProfitAndLoss;
