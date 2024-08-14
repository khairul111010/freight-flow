import {
    IconCalculator,
    IconChartArrowsVertical,
    IconTrendingDown,
} from "@tabler/icons-react";
import ProfitLossCards from "../components/ProfitLossCards";

const Dashboard = () => {
    return (
        <div>
            <div className="grid grid-cols-4 gap-4">
                <ProfitLossCards
                    amount={145545122}
                    title="Net profit"
                    icon={<IconChartArrowsVertical color="#44C7F4" />}
                />
                <ProfitLossCards
                    amount={145545122}
                    title="Net loss"
                    icon={<IconTrendingDown color="#EF4444" />}
                />
                <ProfitLossCards
                    amount={145545122}
                    title="Net due"
                    icon={<IconCalculator color="#FEB019" />}
                />
            </div>
        </div>
    );
};

export default Dashboard;
