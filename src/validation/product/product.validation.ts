import { z } from "zod"


export const SchemaProduct = z.object({
    id: z.string().min(15).max(100),
    name: z.string().min(3).max(60),
    price: z.number(),
    description: z.string().min(3).max(400),
    userId: z.string().min(15).max(100),
})


export const SchemaProductId = SchemaProduct.pick({id: true})
export const SchemaProductCreate = SchemaProduct.omit({ id: true })
export const SchemaProductUpdate = SchemaProduct
export const SchemaUserDeleteFind = SchemaProduct.pick({id: true, userId: true})


export type TSchemaProductCreate = z.infer<typeof SchemaProductCreate>
export type TSchemaProductId = z.infer<typeof SchemaProductId>
export type TSchemaProductUpdate = z.infer<typeof SchemaProductUpdate>
export type TSchemaUserDeleteFind = z.infer<typeof SchemaUserDeleteFind>

