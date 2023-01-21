"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardStatusValidationPipe = void 0;
const exceptions_1 = require("@nestjs/common/exceptions");
const board_status_enum_1 = require("../board-status.enum");
class BoardStatusValidationPipe {
    constructor() {
        this.StatusOptions = [
            board_status_enum_1.BoardStatus.PUBLIC,
            board_status_enum_1.BoardStatus.PRIVATE
        ];
    }
    transform(value, metadata) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new exceptions_1.BadRequestException(`${value} isn't in the status options`);
        }
    }
    isStatusValid(status) {
        const index = this.StatusOptions.indexOf(status);
        return index !== -1;
    }
}
exports.BoardStatusValidationPipe = BoardStatusValidationPipe;
//# sourceMappingURL=board-status-validation.pipe.js.map