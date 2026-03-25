import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './prisma'

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
    }),

    emailAndPassword: {
      enabled: true
    },

    trustedOrigins: [
      `${process.env.ALLOWED_ORIGIN}`,
    ],

    user: {
      additionalFields: {
        role: {
          type: 'string',
          input: false
        }
      }
    }
});