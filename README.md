# tally-xml-tdl

> Simple, clean TDL and XML extraction and manipulation tools for Tally.

[![npm version](https://img.shields.io/npm/v/tally-xml-tdl.svg)](https://www.npmjs.com/package/tally-xml-tdl)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Extract data directly from **Tally Prime / Tally.ERP 9** using TDL XML requests over HTTP, and get back **clean, developer-friendly JSON** ready for modern web apps, APIs, dashboards, and databases.

---

## 📖 The Story

Interfacing with Tally usually means dealing with complex, deeply nested XML envelopes, verbose TDL message syntax, and responses filled with XML parser artifacts (`@_RESERVEDNAME`, `#text`, `@_TYPE`, etc.):

```json
// Traditional Tally XML-to-JSON response (cluttered & nested):
{
  "ENVELOPE": {
    "BODY": {
      "DATA": {
        "COLLECTION": {
          "UNIT": [
            {
              "@_NAME": "Kgs",
              "@_RESERVEDNAME": "",
              "NAME": { "#text": "Kgs", "@_TYPE": "String" }
            }
          ]
        }
      }
    }
  }
}
```

**`tally-xml-tdl` changes that.** With version **`v6`**, it introduces a streamlined template-driven engine and two simple functions:

- **`clean()`**: Strips all XML noise, flattens text nodes, removes reserved attributes, and returns plain JavaScript objects or arrays.
- **`get()`**: Returns the full XML-to-JSON parsed object when you need raw envelope fidelity.

```json
// With tally-xml-tdl clean():
[
  "Kgs"
]
```

---

## 🚀 Features

- 🧹 **Clean Data Out-of-the-Box**: Automatically strips Tally metadata attributes and flattens nested values.
- ⚡ **Two Extraction Modes**: Choose `clean()` for clean data arrays, or `get()` for the full parsed envelope.
- 📋 **Pre-configured Queries**: Built-in TDL queries for UOM, Stock Items, Stock Items with Base Units, and Ledgers.
- 🏎️ **Fast & Lightweight**: Built on top of `fast-xml-parser` with minimal overhead.
- 📦 **Zero-Config HTTP Transport**: Communicates directly with Tally's built-in HTTP server (`http://localhost:9000`).
- 🔷 **First-Class TypeScript Support**: Full type declarations included (`.d.ts`).
- 🌐 **Modern ESM**: Native ES modules with subpath exports (`tally-xml-tdl` and `tally-xml-tdl/v6`).

---

## 📦 Installation

```bash
npm install tally-xml-tdl
```

### Prerequisites
Make sure Tally is running and its HTTP server is enabled:
- **Tally Prime / Tally.ERP 9**: Press `F12` (Configure) -> **Advanced Configuration** -> Set **Tally is acting as** to `Both` or `Server`, and note the port (default is `9000`).

---

## 💡 Quick Start

```javascript
import { clean, get } from "tally-xml-tdl";

// 1. Fetch clean, simplified data
const items = await clean({
    company: "My Company Name",
    jsonId: "stockItemsWithBaseUnits"
});

console.log(items);
// Output:
// [
//   { NAME: "Item A", BASEUNITS: "Nos" },
//   { NAME: "Item B", BASEUNITS: "Kgs" }
// ]

// 2. Fetch raw parsed JSON (full fidelity)
const raw = await get({
    company: "My Company Name",
    jsonId: "uom"
});

console.log(raw);
```

---

## 📚 API Reference

### `clean(options)`
Sends the TDL query to Tally, parses the XML response, and cleans the resulting collection data.

```typescript
clean<T = any>(options: V6Options): Promise<T>
```

#### Options:
| Option | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `company` | `string` | **Yes** | — | Name of the active company in Tally. |
| `jsonId` | `string` | **Yes** | — | ID of the pre-configured TDL query. |
| `url` | `string` | No | `"http://localhost:9000"` | Tally HTTP endpoint URL. |

---

### `get(options)`
Sends the TDL query to Tally and returns the complete XML response converted to a JavaScript object without stripping any metadata.

```typescript
get<T = any>(options: V6Options): Promise<T>
```

---

## 🗂️ Built-in Query Catalog (`jsonId`)

| `jsonId` | Target Entity | Description | Fields Fetched |
| :--- | :--- | :--- | :--- |
| `"uom"` | Units of Measure | List of units of measurement | `$$Alias:Name` |
| `"stockItems"` | Stock Items | List of inventory stock items | `$$Alias:Name` |
| `"stockItemsWithBaseUnits"` | Stock Items | Inventory stock items with their base units | `$$Alias:Name`, `BaseUnits` |
| `"ledgerNames"` | Ledgers | List of accounting ledgers | `$$Alias:Name` |

---

## 🎯 Advanced Usage

### Connecting to a Remote or Custom Port
If Tally is hosted on another machine or running on a non-default port:

```javascript
import { clean } from "tally-xml-tdl";

const data = await clean({
    company: "Acme Corp",
    jsonId: "ledgerNames",
    url: "http://192.168.1.100:9005"
});
```

### Subpath Import
You can also explicitly import from the `v6` subpath:

```javascript
import { clean, get } from "tally-xml-tdl/v6";
```

### Using Namespaces
```javascript
import { v6 } from "tally-xml-tdl";

const data = await v6.clean({ company: "Acme Corp", jsonId: "uom" });
```

---

## 📄 License

[MIT](LICENSE) © [KeshavSoft](https://keshavsoft.com)