import { XMLBuilder } from "fast-xml-parser";

const jsonToXml = (jsonObj) => {
    const builder = new XMLBuilder({
        ignoreAttributes: false,
        format: true
    });

    return builder.build(jsonObj);
};

export {
    jsonToXml
};

