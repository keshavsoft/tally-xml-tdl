/**
 * Validates a parsed Tally response object.
 * Checks for error status (STATUS === 0) and line errors.
 * 
 * @param {object} res - Parsed Tally response object.
 * @returns {object} The validated response object.
 * @throws {Error} If Tally returned an error status or line error.
 */
export const validateResponse = (res) => {
    const headerStatus = res?.ENVELOPE?.HEADER?.STATUS;
    if (headerStatus === 0 || headerStatus === "0" || Number(headerStatus) === 0) {
        throw new Error(`Tally returned error status: ${JSON.stringify(res?.ENVELOPE?.BODY || res)}`);
    }

    if (res?.ENVELOPE?.BODY?.DATA?.LINEERROR) {
        throw new Error(`Tally line error: ${JSON.stringify(res?.ENVELOPE?.BODY?.DATA?.LINEERROR)}`);
    }

    return res;
};
