module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "google",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "quotes": ["error", "single"],
        "max-params": ["error", 2],
        "max-lines-per-function": ["error", 25],
        "indent": ["error", 4]
    }
};