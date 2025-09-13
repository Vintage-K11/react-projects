// src/services/appwriteClient.js
import { Client, Databases, Storage } from "appwrite";
import conf from "../conf";

const client = new Client();
client
  .setEndpoint(conf.appwriteUrl)
  .setProject(conf.appwriteProjectId);

const db = new Databases(client);
const storage = new Storage(client);

export { db, storage };
