export const buildXml = (body, {
    staticVariables,
    tdlMessage,
    tdlId
}) => {

    return body
        .replace("{{STATICVARIABLES}}", staticVariables)
        .replace("{{TDLMESSAGE}}", tdlMessage)
        .replace("{{TDLID}}", tdlId);
};