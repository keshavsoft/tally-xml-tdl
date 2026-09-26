import Unit from "./Unit/index.js";
import StockItem from "./StockItem/index.js";
import Ledger from "./Ledger/index.js";
import StockGroup from "./StockGroup/index.js";

const all = async (company, type, variant = "all") => {
    const localCompany = company;
    const localType = type;
    const localVariant = variant;

    const target = masters[localType];
    if (!target) {
        throw new Error(`Master type '${localType}' not found.`);
    }
    if (typeof target[localVariant] === "function") {
        return await target[localVariant](localCompany);
    }
    if (typeof target.all === "function") {
        return await target.all(localCompany, localVariant);
    }
    return await target(localCompany);
};

const masters = {
    all,
    Unit,
    StockItem,
    Ledger,
    StockGroup,
    // Aliases for convenience
    unit: Unit,
    stockItem: StockItem,
    stockItems: StockItem,
    ledger: Ledger,
    ledgers: Ledger,
    stockGroup: StockGroup,
    stockGroups: StockGroup,
    uom: Unit
};

export {
    all,
    Unit,
    StockItem,
    Ledger,
    StockGroup,
    Unit as unit,
    StockItem as stockItem,
    StockItem as stockItems,
    Ledger as ledger,
    Ledger as ledgers,
    StockGroup as stockGroup,
    StockGroup as stockGroups,
    Unit as uom
};

export default masters;
