import { transactions } from "../../../../src/v4/index.js";
import { saveOutput } from "../common/index.js";

const data = await transactions.sale();

function isPlainObject(val) {
    return val !== null && typeof val === 'object' && !Array.isArray(val);
};

const forLedgerEntries = (inLedgerEntries) => {
    if (isPlainObject(inLedgerEntries)) {
        return [{
            ledgerName: inLedgerEntries.LEDGERNAME?.["#text"],
            isDeemedPositive: inLedgerEntries.ISDEEMEDPOSITIVE?.["#text"],
            amount: inLedgerEntries.AMOUNT?.["#text"]
        }]
    };

    if (Array.isArray(inLedgerEntries)) {
        return inLedgerEntries.map(element => {
            return {
                ledgerName: element.LEDGERNAME?.["#text"],
                isDeemedPositive: element.ISDEEMEDPOSITIVE?.["#text"],
                amount: element.AMOUNT?.["#text"]
            }
        });

    };
};

const forAccounting = (inAccount) => {
    if (isPlainObject(inAccount)) {
        return [{
            ledgerName: inAccount.LEDGERNAME,
            isDeemedPositive: inAccount.ISDEEMEDPOSITIVE,
            amount: inAccount.AMOUNT
        }]
    };

    if (Array.isArray(inAccount)) {
        return inAccount.map(element => {
            return {
                ledgerName: element.LEDGERNAME,
                isDeemedPositive: element.ISDEEMEDPOSITIVE,
                amount: element.AMOUNT
            }
        });

    };
};

const forBatch = (inBatch) => {
    if (isPlainObject(inBatch)) {
        return [{
            godownName: inBatch.GODOWNNAME,
            batchName: inBatch.BATCHNAME,
            destinationGodownName: inBatch.DESTINATIONGODOWNNAME,
            batchId: inBatch.BATCHID["#text"],
            amount: inBatch.AMOUNT,
            actualQty: inBatch.ACTUALQTY,
            billedQty: inBatch.BILLEDQTY,
            batchRate: inBatch.BATCHRATE?.["#text"]
        }]
    };

    if (Array.isArray(inBatch)) {
        return inBatch.map(element => {
            return {
                godownName: element.GODOWNNAME,
                batchName: element.BATCHNAME,
                destinationGodownName: element.DESTINATIONGODOWNNAME,
                batchId: element.BATCHID["#text"],
                amount: element.AMOUNT,
                actualQty: element.ACTUALQTY,
                billedQty: element.BILLEDQTY,
                batchRate: element.BATCHRATE?.["#text"]
            }
        });

    };
};

const forInventory = (inItem) => {
    if (isPlainObject(inItem)) {
        return [{
            stockItemName: inItem.STOCKITEMNAME,
            rate: inItem.RATE,
            amount: inItem.AMOUNT,
            actualQty: inItem.ACTUALQTY,
            billedQty: inItem.BILLEDQTY,
            batches: forBatch(inItem["BATCHALLOCATIONS.LIST"]),
            accounting: forAccounting(inItem["ACCOUNTINGALLOCATIONS.LIST"])
        }]
    };

    if (Array.isArray(inItem)) {
        return inItem.map(element => {
            return {
                stockItemName: element.STOCKITEMNAME,
                rate: element.RATE,
                amount: element.AMOUNT,
                actualQty: element.ACTUALQTY,
                billedQty: element.BILLEDQTY,
                batches: forBatch(element["BATCHALLOCATIONS.LIST"]),
                accounting: forAccounting(element["ACCOUNTINGALLOCATIONS.LIST"])
            }
        });

    };
};

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
        allInventoryEntries: forInventory(element["ALLINVENTORYENTRIES.LIST"]),
        allLedgerEntries: forLedgerEntries(element["LEDGERENTRIES.LIST"])
    }
});

saveOutput({ callerFile: import.meta.url, inData: asSimpleArray });
console.log("Done");
