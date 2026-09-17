# Developer Guide: `tally-xml-tdl` (v6)

This document explains the internal architecture, query lifecycle, and development workflows for `tally-xml-tdl` v6.

---

## 🏛️ Architecture & Lifecycle

The `v6` architecture is designed around **template interpolation**, **transport isolation**, and **response sanitization**:

```
 ┌─────────────────┐       ┌─────────────────┐
 │   body.xml      │   +   │   body.json     │
 │ (XML Envelope)  │       │ (Query Payload) │
 └────────┬────────┘       └────────┬────────┘
          │                         │
          └───────────┬─────────────┘
                      ▼
             buildXml.js (Interpolation)
                      │
                      ▼
             transport/http.js (HTTP POST via fetch to Tally:9000)
                      │
                      ▼
             response/xmlToJson.js (Fast XML parsing)
                      │
            ┌─────────┴─────────┐
            ▼                   ▼
      executeXml.js     executeXmlAndClean.js
            │                   │
         Raw JSON        cleanTallyResponse.js
                                │
                         Sanitized Clean Data
```

---

## 📂 Source Structure (`src/v6/`)

```text
src/v6/
├── body.json                    # TDL queries and static variable definitions
├── body.xml                     # Base XML Envelope template
├── index.js                     # Main entry: exports get() and clean()
├── index.d.ts                   # TypeScript declarations
└── core/
    ├── buildXml.js              # Template replacer: {{STATICVARIABLES}} & {{TDLMESSAGE}}
    ├── cleanTallyResponse.js    # Data cleaner and flattener
    ├── index.js                 # Re-exports core modules
    ├── execute/
    │   ├── executeXml.js        # Executes XML -> returns raw JSON
    │   ├── executeXmlAndClean.js# Executes XML -> returns cleaned JSON
    │   └── index.js
    ├── response/
    │   ├── xmlToJson.js         # fast-xml-parser wrapper (preserves attributes with @_)
    │   └── index.js
    └── transport/
        ├── http.js              # HTTP client (native fetch)
        └── index.js
```

---

## ➕ Adding a New Query to `body.json`

To add a new pre-configured query, simply add an entry to [src/v6/body.json](file:///d:/KeshavSoftRepos/sep/17-1/tally-xml-tdl/src/v6/body.json):

```json
{
  "myNewQuery": {
    "staticVariables": "<SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>",
    "tdlMessage": "<TYPE>CostCentre</TYPE><FETCH>$$Alias:Name</FETCH>"
  }
}
```

This can now immediately be queried with:
```javascript
const costCentres = await clean({
    company: "My Company",
    jsonId: "myNewQuery"
});
```

---

## 🧪 Testing

Run test files against a local Tally instance running on port 9000:

```bash
node .\Test\v12\smallJson\uom.js
```

Verify NPM package contents before publishing:

```bash
npm pack --dry-run
```
