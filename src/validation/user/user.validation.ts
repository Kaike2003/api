import { z } from "zod"


export const SchemaUser = z.object({
    id: z.string().min(15).max(100),
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    phone: z.number().min(111111111).max(999999999),
    birthday: z.date(),
})


export const SchemaUserId = SchemaUser.pick({
   id: true
})
export const SchemaUserCreate = SchemaUser.omit({ id: true })
export const SchemaUserUpdate = SchemaUser

export type TSchemaUserCreate = z.infer<typeof SchemaUserCreate>
export type TSchemaUserId = z.infer<typeof SchemaUserId>
export type TSchemaUserUpdate = z.infer<typeof SchemaUserUpdate>

