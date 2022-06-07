import {PassportDto} from "./PassportDto";
import {PersonDto} from "./PersonDto";
import {CreditGoalDto} from "./CreditGoalDto";
import {PledgeDto} from "./PledgeDto";
import {EmploymentDto} from "./EmploymentDto";

export interface CreditInfoDto{
    passport: PassportDto,
    person: PersonDto,
    creditGoal: CreditGoalDto,
    pledge: PledgeDto,
    employment: EmploymentDto,
    isCriminalRecorded: boolean,
    creditAmount: number,
    hasAnyCredits: boolean
}