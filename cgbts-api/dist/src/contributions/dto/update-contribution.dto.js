"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateContributionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_contribution_dto_1 = require("./create-contribution.dto");
class UpdateContributionDto extends (0, mapped_types_1.PartialType)(create_contribution_dto_1.CreateContributionDto) {
}
exports.UpdateContributionDto = UpdateContributionDto;
//# sourceMappingURL=update-contribution.dto.js.map