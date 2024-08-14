import { FC } from "react";
type Props = {
    title: string;
    amount: string | number;
    icon?: JSX.Element;
};
const ProfitLossCards: FC<Props> = ({ title, amount, icon }) => {
    return (
        <div className="border rounded-xl py-4 px-8 flex flex-col justify-between bg-white shadow-sm gap-4">
            <div className="text-lg font-medium text-gray-600">
                {icon} {title}
            </div>
            <div className="text-3xl font-bold text-gray-800">
                ${amount.toLocaleString()}
            </div>
        </div>
    );
};

export default ProfitLossCards;
