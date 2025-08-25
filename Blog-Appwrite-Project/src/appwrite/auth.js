import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

  async createAccount({ email, password, name }) {
    try {
        const userAccount = await this.account.create(ID.unique(), email, password, name);
        if (userAccount) {
            console.log("Account created successfully:", userAccount);
            return userAccount; // No auto-login
        } else {
            console.warn("Account creation returned null/undefined");
            return null;
        }
    } catch (error) {
        console.error("AuthService :: createAccount :: error", error);
        throw error;
    }
}

   async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("Login successful:", session);
            return session;
        } catch (error) {
            console.error("AuthService :: login :: error", error);
            throw error;
    }
    }


    async getCurrentUser() {
    try {
        const user = await this.account.get();
        console.log(" Current user:", user);
        return user;
    } catch (error) {
        console.warn(" No active session. User is not logged in.");
        return null;
    }
}

    async logout() {

        try {
            await this.account.deleteSession('current');
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService


