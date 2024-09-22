import { z } from "zod";
const signInSchema = z.object({
  email: z.string().min(1, { message: "Email is required " }).email(),
  password: z.string().min(5, { message: "Email is required " }),
  // .min(8, { message: "password must be at least 8  charachter longs" })
  // .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
  //   message: "Password should contain at least 1 special character",
  // }),
});

type signInType = z.infer<typeof signInSchema>;

export { signInSchema, type signInType };
