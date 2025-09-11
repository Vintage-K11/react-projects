// // src/services/authService.js
// import conf from '../conf/conf.js';
// import { Client, Account, ID } from "appwrite";

// class AuthService {
//     client;
//     account;

//     constructor() {
//         this.client = new Client()
//             .setEndpoint(conf.appwriteUrl)
//             .setProject(conf.appwriteProjectId);

//         this.account = new Account(this.client);
//         console.log("✅ AuthService initialized");
//     }

//     async createAccount({ email, password, name }) {
//         try {
//             return await this.account.create(ID.unique(), email, password, name);
//         } catch (error) {
//             console.error("❌ createAccount error:", error);
//             throw error;
//         }
//     }

//     async login({ email, password }) {
//         try {
//             return await this.account.createEmailPasswordSession(email, password);
//         } catch (error) {
//             console.error("❌ login error:", error);
//             throw error;
//         }
//     }

//     async getCurrentUser() {
//         try {
//             return await this.account.get();
//         } catch (error) {
//             return null;
//         }
//     }

//     async logout() {
//         try {
//             await this.account.deleteSession('current');
//         } catch (error) {
//             console.error("❌ logout error:", error);
//         }
//     }
// }

// const authService = new AuthService();
// export default authService;


// src/services/authService.js
import conf from "@/conf";
import { Client, Account, ID } from "appwrite";

class AuthService {
  client;
  account;

  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
    console.log("✅ AuthService initialized");
  }

  // Create new account
  async createAccount({ email, password, name }) {
    try {
      return await this.account.create(ID.unique(), email, password, name);
    } catch (error) {
      console.error("❌ createAccount error:", error.message);
      throw error;
    }
  }

  // Login with email/password
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("❌ login error:", error.message);
      throw error;
    }
  }

  // Get currently logged-in user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch {
      return null;
    }
  }

  // Logout current session
  async logout() {
    try {
      await this.account.deleteSession("current");
    } catch (error) {
      console.error("❌ logout error:", error.message);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
