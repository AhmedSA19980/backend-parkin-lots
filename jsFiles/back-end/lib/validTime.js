"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidTime = void 0;
function isValidTime(time) {
    const currentTime = new Date();
    const inputTime = new Date(time);
    return inputTime > currentTime;
}
exports.isValidTime = isValidTime;
