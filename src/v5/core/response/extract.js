/**
 * Extracts and unwraps the collection entities from a parsed Tally response object,
 * stripping away all protocol envelope boilerplate (ENVELOPE, HEADER, DESC, CMPINFO).
 * 
 * @param {object} res - Parsed Tally response object.
 * @returns {object} The children of DATA.COLLECTION (e.g. { VOUCHER: [...] }, { GROUP: [...] }).
 * @throws {Error} If no DATA.COLLECTION node is found in the response.
 */
export const extractCollection = (res) => {
    const collectionData = res?.ENVELOPE?.BODY?.DATA?.COLLECTION;
    if (!collectionData) {
        throw new Error("No DATA.COLLECTION found in Tally response");
    }

    return collectionData;
};

