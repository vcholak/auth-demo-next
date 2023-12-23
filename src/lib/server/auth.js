import Cognito from "next-auth/providers/cognito"; 
import Google from "next-auth/providers/google";

export const authOptions = {
  
  debug: !(process.env.NODE_ENV === 'production'),
  providers: [
    Cognito({
      clientId: process.env.COGNITO_CLIENT_ID, 
      clientSecret: process.env.COGNITO_CLIENT_SECRET, 
      issuer: process.env.COGNITO_ISSUER
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || null,
  session: {
    jwt: true,
  },
};
