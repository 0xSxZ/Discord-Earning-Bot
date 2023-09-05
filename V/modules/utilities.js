/*

Utilities functions

*/
function CreateDb(name) { return new JsonDB(new Config(name, true, false, '/')) }
function RandomString(length) { Math.random().toString(36).slice(2, length + 2); }
function isInt(value) { return !isNaN(value) && (function (x) { return (x | 0) === x; })(parseFloat(value)) }
function randomInteger(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function RandomFloat(min, max, decimals) { return parseFloat((Math.random() * (max - min) + min).toFixed(decimals)); }


module.exports = { CreateDb, RandomString, isInt, randomInteger, RandomFloat }