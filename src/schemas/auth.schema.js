const z = require("zod"); //instale zod para realizar la verificacion

exports.registerSchema = z.object({
  username: z.string({
    required_error: "El usuario es requerido",
  }),
  email: z
    .string({
      required_error: "El correo electronico es requerido",
    })
    .email({
      message: "Correo invalido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(6, {
      message: "La constraseña debe tener minimo 6 caracteres",
    }),
});

exports.loginSchema = z.object({
  email: z
    .string({
      required_error: "El correo electronico es requerido",
    })
    .email({
      message: "Correo invalido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(6, {
      message: "La constraseña debe tener minimo 6 caracteres",
    }),
});
