import ValidationWithError from "../hook/validation/ValidationWithError";

export const required: ValidationWithError<string> = {
    valueIsValid: value => value.length > 0,
    errorMessage: "field is required"
}

export const maxLength = function (maxLenght: number): ValidationWithError<string>{
    return {
        valueIsValid: (value: string) => value.length <= maxLenght,
        errorMessage: `max length is ${maxLenght} symbols`
    }
}

export const pattern = function (pattern: RegExp, format: string): ValidationWithError<string>{
    return {
        valueIsValid: value => pattern.test(value),
        errorMessage: `expected: ${format}`
    }
}

export const maxValue = function (maxValue: number): ValidationWithError<number>{
    return {
        valueIsValid: (value: number) => value <= maxValue,
        errorMessage: `max value is ${maxValue}`
    }
}

export const minValue = function (minValue: number): ValidationWithError<number>{
    return {
        valueIsValid: (value: number) => value >= minValue,
        errorMessage: `min value is ${minValue}`
    }
}