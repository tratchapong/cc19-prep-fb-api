const {z} = require('zod')

  const phoneRegex = /^[0-9]{10,15}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  const registerSchema = z.object({
    identity: z.string()
      .refine(
        (val) => phoneRegex.test(val) || emailRegex.test(val),
        { message: "Must be a valid email or phone number" }
      )
      .transform(val => ({
        type: phoneRegex.test(val) ? 'mobile' : 'email',
        value: val
      })),
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().min(1, "Last name is required"),
    password: z.string()
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  });

  module.exports = { registerSchema }