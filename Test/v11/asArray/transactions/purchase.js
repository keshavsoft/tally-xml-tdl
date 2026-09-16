import { transactions } from "../../../../src/v4/index.js";
import { saveOutput } from "../common/index.js";

const data = await transactions.purchase();

const asSimpleArray = data.VOUCHER.map(element => {
    return {
        name: element.DATE["#text"],
        voucherNumber: element.VOUCHERNUMBER,
        voucherTypeName: element.VOUCHERTYPENAME,
        partyLedgerName: element.PARTYLEDGERNAME["#text"],
        reference: element.REFERENCE?.["#text"],
        isDeleted: element.ISDELETED,
        isDeemedPositive: element.ISDEEMEDPOSITIVE["#text"],
        effectiveDate: element.EFFECTIVEDATE?.["#text"],
        isInvoice: element.ISINVOICE,
        masterID: element.MASTERID["#text"],
        voucherKey: element.VOUCHERKEY["#text"],
        voucherRetainKey: element.VOUCHERRETAINKEY["#text"],
        allInventoryEntries: element["ALLINVENTORYENTRIES.LIST"]
    }
});

saveOutput({ callerFile: import.meta.url, inData: asSimpleArray });
console.log("Done");
