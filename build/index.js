"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMoneyById = exports.sendMoneyById = exports.getMoneyById = void 0;
const axios_1 = __importDefault(require("axios"));
async function getMoneyById(id) {
    const { data } = await axios_1.default.get(_GET_HOST() + id);
    if (!data.success)
        throw new Error(data.message);
    return data.amount;
}
exports.getMoneyById = getMoneyById;
async function sendMoneyById(fromId, toId, amount, memo = "") {
    const sendBody = { fromId: fromId.toString(), toId: toId.toString(), amount, memo };
    const { data } = await axios_1.default.post(_GET_HOST(), sendBody);
    if (!data.success)
        throw new Error(data.message);
    return true;
}
exports.sendMoneyById = sendMoneyById;
async function generateMoneyById(toId, amount) {
    const result = await sendMoneyById("885834421771567125", toId, amount);
    return result;
}
exports.generateMoneyById = generateMoneyById;
function _GET_HOST() {
    return process.env.AABANK_HOST || "http://hub.ahoaho.jp:9989/";
}
