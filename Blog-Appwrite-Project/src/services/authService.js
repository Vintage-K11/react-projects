// src/services/authService.js
import conf from "@/conf";
import { Client, Account, ID } from "appwrite";

class AuthService {
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);

    if (!conf.appwriteUrl || !conf.appwriteProjectId) {
      console.warn("⚠️ AuthService: Missing Appwrite configuration values.");
    } else {
      console.log("✅ AuthService initialized");
    }
  }

  // ==========================
  // Create account + auto-login
  // ==========================
  async createAccount({ email, password, name }) {
    if (!email || !password) throw new Error("Email and password are required");

    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);

      // Auto-login after signup
      await this.login({ email, password });

      return userAccount;
    } catch (error) {
      console.error("❌ AuthService.createAccount error:", error.message);
      throw error;
    }
  }

  // ==========================
  // Login user
  // ==========================
  async login({ email, password }) {
    if (!email || !password) throw new Error("Email and password are required");

    try {
      // Delete current session if exists (avoid multiple sessions)
      try {
        await this.account.deleteSession("current");
      } catch (err) {
        // Ignore if no current session
      }

      const session = await this.account.createEmailPasswordSession(email, password);
      const user = await this.account.get();

      return user; // Only return user for Redux state
    } catch (error) {
      console.error("❌ AuthService.login error:", error.message);
      throw error;
    }
  }

  // ==========================
  // Get current logged-in user
  // ==========================
  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch {
      return null; // Not logged in
    }
  }

  // ==========================
  // Logout current session
  // ==========================
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

  // ==========================
  // Logout from all devices
  // ==========================
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

  // ==========================
  // List all active sessions
  // ==========================
  async listSessions() {
    try {
      const res = await this.account.listSessions();
      return res.sessions || [];
    } catch (error) {
      console.error("❌ AuthService.listSessions error:", error.message);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
