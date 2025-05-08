import { ZodErrorMap, ZodIssueCode } from "zod";

export const customErrorMap: ZodErrorMap = (error, ctx) => {
    switch(error.code) {
        case ZodIssueCode.invalid_type: {
            return {
                message: 'Pole nie może być puste'
            }
        }
        case ZodIssueCode.too_small: {
            if(error.type === 'string') {
                return {
                    message: `Minimalna ilość znaków to ${error.minimum}`
                }
            }
            if(error.type === 'number') {
                return {
                    message: `Minimalna wartość to ${error.minimum}`
                }
            }
            break;
        }
        case ZodIssueCode.too_big: {
            if(error.type === 'string') {
                return {
                    message: `Maksymalna ilość znaków to ${error.maximum}`
                }
            }
            if(error.type === 'number') {
                return {
                    message: `Maksymalna wartość to ${error.maximum}`
                }
            }
            break;
        }
        case ZodIssueCode.invalid_date:
            return {
                message: 'Nieprawidłowa data'
            }
    }

    return {
        message: ctx.defaultError
    }
}
