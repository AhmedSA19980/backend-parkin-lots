"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.book = void 0;
class book {
    constructor() {
        this.getTimeCheck = (start, end) => {
            const s_time = new Date(start);
            const e_time = new Date(end);
            // Calculate time difference in milliseconds
            const delta = e_time.getTime() - s_time.getTime();
            // Convert milliseconds to minutes and round to 4 decimal places
            const result = Math.round((delta / 60000) * 10000) / 10000;
            return result;
        };
        this.calculatePrice = (cost, m) => {
            // 5 dollar$
            const hour_rate = m / 60;
            return cost * hour_rate; // price
        };
        this.checkCapaciy = (quantity, end, current) => {
            // curr date
            // if gettime excedding the current time then we reset cap
            //each user user can park one lot at same time
            //const s_time = new Date(start);
            const e_time = new Date(end);
            const c_time = new Date(current);
            quantity = 0;
            if (c_time > e_time) {
                quantity + 1;
                return quantity;
            }
            else {
                if (quantity == 0) {
                    return 'fsdf'; // var assign to num
                }
                else {
                    quantity -= 1;
                    return quantity;
                }
            }
        };
    }
}
exports.book = book;
