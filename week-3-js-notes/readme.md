```markdown
# Week 3: Advanced JavaScript Code-Along Notes

This documentation contains annotated notes and executable code exercises covering advanced JavaScript patterns, modern ES6+ syntax, and module systems. 

## 1. The Prototype Chain
JavaScript uses prototypal inheritance. When a property or method is called on an object, the engine searches the object itself. If it is not found, it traverses up the prototype chain (`__proto__`) until it either finds the property or reaches `null`.

Adding methods directly to a constructor's `prototype` ensures that all instances share the exact same function in memory, rather than creating a duplicate function for every single object instance.

```javascript
// --- Annotated Exercise: Prototype Inheritance ---

// 1. Constructor Function for a User
function User(username, email) {
    this.username = username;
    this.email = email;
}

// 2. Adding a shared method to the prototype
User.prototype.authenticate = function() {
    console.log(`[Auth]: ${this.username} successfully authenticated into AZ Commerce Hub.`);
};

// 3. Creating instances
const user1 = new User("admin_abdullah", "admin@example.com");
const user2 = new User("customer_99", "buyer@example.com");

user1.authenticate(); 

// 4. Inspecting the Chain
console.log(user1.__proto__ === User.prototype); // true
console.log(user1.authenticate === user2.authenticate); // true (Memory efficient!)

```
## 2. ES6+ Syntax Fluency
Modern syntax drastically reduces boilerplate code, especially when handling complex nested objects (like API payloads or database query results).
```javascript
// --- Annotated Exercise: Destructuring, Spread/Rest, Optional Chaining ---

const tradeRecord = {
    tradeId: "BTC-8849",
    type: "BUY",
    metrics: {
        amount: 0.5,
        price: 65000,
        fees: { network: 12, platform: 5 }
    },
    trader: { id: 1042, handle: "crypto_whale" }
};

// A. Destructuring (Extracting nested properties into variables)
const { tradeId, metrics: { price }, trader: { handle } } = tradeRecord;
console.log(`Trade ${tradeId}: ${handle} executed at $${price}`);

// B. Optional Chaining (?.)
// Safely reads deeply nested data without throwing a fatal error if an intermediate property is missing.
const stakingReward = tradeRecord.metrics?.staking?.yield;
console.log(`Staking Yield: ${stakingReward}`); // Output: undefined (Prevents app crash)

// C. Spread Operator (...) - Expanding Iterables
const baseCurrencies = ["BTC", "ETH", "USDT"];
const altCoins = ["SOL", "ADA"];
const supportedPairs = [...baseCurrencies, ...altCoins, "XRP"]; // Merges arrays cleanly

// D. Rest Parameters (...) - Gathering Arguments
// Useful for functions that accept a dynamic number of arguments.
function calculateTotalFees(baseFee, ...additionalFees) {
    // 'additionalFees' is an array of all remaining arguments passed
    const extras = additionalFees.reduce((acc, curr) => acc + curr, 0);
    return baseFee + extras;
}
console.log(`Total Fee: $${calculateTotalFees(5, 12, 3, 1.5)}`); // Total Fee: $21.5

```
## 3. Iterators and Generators
**Generators** are special functions (marked with function*) that can pause execution midway using the yield keyword and resume later. This makes them incredibly memory-efficient for generating sequences, as they do not compute the next value until next() is explicitly called.
```javascript
// --- Annotated Exercise: Generators ---

// A generator for sequential transaction IDs on BitGet Velocity
function* transactionIdGenerator() {
    let id = 5000;
    while (true) {
        yield `TXN-${id}`;
        id++;
    }
}

const getNextTxId = transactionIdGenerator();

console.log(getNextTxId.next().value); // "TXN-5000" (Pauses here)
console.log(getNextTxId.next().value); // "TXN-5001" (Resumes, loops, pauses again)
console.log(getNextTxId.next().value); // "TXN-5002"

```
## 4. ES Modules (ESM) vs. CommonJS (CJS)
Understanding the difference between module systems is crucial for full-stack environments where code is split between the browser frontend and backend servers.
| Feature | ES Modules (ESM) | CommonJS (CJS) |
|---|---|---|
| **Syntax** | import { x } from '...' 
 export const x = ... | const x = require('...') 
 module.exports = { x } |
| **Execution** | **Asynchronous:** Excellent for web browsers. Loads modules in parallel without blocking rendering. | **Synchronous:** Blocks execution until loaded. Ideal for backend Node.js scripts. |
| **Analysis** | **Static:** The bundler (like Webpack) analyzes imports at compile-time, allowing for "Tree Shaking" (dead code removal). | **Dynamic:** Loaded at runtime. You can place require() inside if statements. |
| **Environment** | The modern standard. Native to browsers and newer Node.js versions. | The legacy standard created originally for Node.js. |
```javascript
// === CommonJS Example (Legacy Node.js Backend) ===
// db_config.js
const port = 3306; 
module.exports = { port };

// server.js
const db = require('./db_config.js');
console.log(`Connecting to database on port ${db.port}`);


// === ES Modules Example (Modern JS / Frontend) ===
// db_config.mjs
export const port = 3306;

// server.mjs
import { port } from './db_config.mjs';
console.log(`Connecting to database on port ${port}`);

```
```

