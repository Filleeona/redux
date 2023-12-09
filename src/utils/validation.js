import { z } from "zod";

export const User = z.object({
  email: z.string().email({ message: "Please, enter the correct email" }),
  password: z
    .string()
    .min(8, { message: "The password must contain at least 8 characters. " })
    .refine((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/g.test(value), {
      message:
        "The password must contain at least one capital letter, one lowercase letter and one digit",
    }),
  date: z.number(),
});

export const Note = z.object({
  userId: z.number(),
  title: z.string(),
  text: z.string(),
  date: z.number(),
});
