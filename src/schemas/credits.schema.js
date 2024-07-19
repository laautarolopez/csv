const { z } = require('zod')

exports.transferCreditsSchema = z.object({
    from_id: z
        .string({
            required_error: 'from_id is required'
        }).nonempty({
            message: 'from_id cannot be empty'
        }),
    to_id: z
        .string({
            required_error: 'to_id is required'
        }).nonempty({
            message: 'to_id cannot be empty'
        }),
    amount: z
        .number({
            required_error: 'amount is required'
        })
        .gt(0, {
            message: 'amount must be greater than 0'
        })
})

// exports.getReportSchema = z.object({
//     initial_date: z
//         .date({
//             required_error: 'initial_date is required'
//         }),
//     end_date: z
//         .date({
//             required_error: 'end_date is required'
//         })
// })

exports.getReportSchema = z.object({
    initial_date: z
        .string()
        .refine(value => isValidDateFormat(value), {
            message: 'initial_date must be in the format DD/MM/YYYY'
        }),
    end_date: z
        .string()
        .refine(value => isValidDateFormat(value), {
            message: 'end_date must be in the format DD/MM/YYYY'
        })
});

const isValidDateFormat = (dateStr) => {
    return /^\d{2}\/\d{2}\/\d{4}$/.test(dateStr);
};  