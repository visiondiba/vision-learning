import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import Credentials from "next-auth/providers/credentials";

export const {handlers, auth, signIn, signOut} = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            credentials: {
                stambuk: {label:"Nomor Stambuk", type: "text", placeholder:"1.4x.xxxxx"},
                password: {label:"Password", type:"password" }
            },
            authorize: async (credentials) => {

                const user = await prisma.user.findUnique({
                    where: {stambuk: credentials.stambuk as string}
                });

                if (user && user.password === credentials.password) {
                    return { id: user.id, name: user.name, stambuk: user.stambuk, role: user.role }
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: "/login",
    }
})