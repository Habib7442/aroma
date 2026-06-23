import { z } from 'zod';

// Shared Enums
export enum OrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

// Zod schemas for order verification
export const OrderSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  items: z.array(z.object({
    menuItemId: z.string(),
    quantity: z.number().int().positive(),
    price: z.number().positive()
  })),
  totalPrice: z.number().positive(),
  status: z.nativeEnum(OrderStatus),
  createdAt: z.date()
});

export type Order = z.infer<typeof OrderSchema>;
