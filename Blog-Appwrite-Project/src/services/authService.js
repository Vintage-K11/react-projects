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
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);

    console.log("✅ AuthService initialized");
  }

  /**
   * Create a new account and auto-login
   * @param {Object} param0
   * @param {string} param0.email
   * @param {string} param0.password
   * @param {string} param0.name
   * @returns {Promise<Object>} created user document
   */
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      // Auto-login after signup
      await this.login({ email, password });

      return userAccount;
    } catch (error) {
      console.error("❌ AuthService.createAccount error:", error.message);
      throw error;
    }
  }

  /**
   * Login with email and password
   * @param {Object} param0
   * @param {string} param0.email
   * @param {string} param0.password
   * @returns {Promise<{ session: Object, user: Object }>}
   */
  async login({ email, password }) {
    try {
      // Ensure no old session exists (safety)
      try {
        await this.account.deleteSession("current");
      } catch {
        /* ignore if no session */
      }

      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      const user = await this.account.get();

      return { session, user };
    } catch (error) {
      console.error("❌ AuthService.login error:", error.message);
      throw error;
    }
  }

  /**
   * Get current logged-in user
   * @returns {Promise<Object|null>}
   */
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch {
      return null; // No active session
    }
  }

  /**
   * Logout current session
   * @returns {Promise<boolean>}
   */
  async logout() {
    try {
      await this.account.deleteSession("current");
      console.log("✅ Logged out successfully");
      return true;
    } catch (error) {
      console.error("❌ AuthService.logout error:", error.message);
      throw error;
    }
  }

  /**
   * List all active sessions (devices)
   * @returns {Promise<Array>}
   */
  async listSessions() {
    try {
      const result = await this.account.listSessions();
      return result.sessions || [];
    } catch (error) {
      console.error("❌ AuthService.listSessions error:", error.message);
      throw error;
    }
  }

  /**
   * Logout from all devices
   * @returns {Promise<boolean>}
   */
  async logoutAll() {
    try {
      await this.account.deleteSessions();
      console.log("✅ Logged out from all devices");
      return true;
    } catch (error) {
      console.error("❌ AuthService.logoutAll error:", error.message);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
