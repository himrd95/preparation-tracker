// Simplified auth configuration for demo purposes
export const authOptions = {
  providers: [],
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/auth/signin",
  },
}