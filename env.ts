import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const envSchema = z.object({
  API_KEY: z.string().min(1),
})

function validateEnvVars() {
  const result = envSchema.safeParse(process.env)

  if (!result.success) {
    throw new Error(`function validateEnvVars() - Missing or faulty environment variable. Please check. Validation result error message: ${result.error.message}`)
  }
}

validateEnvVars()

export const env = {
  API_KEY: process.env.API_KEY as string,
}

