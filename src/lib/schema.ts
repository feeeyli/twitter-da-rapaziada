import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  unique,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { db } from "./db";

export const userTable = pgTable(
  "users",
  {
    username: text("username").primaryKey().notNull(),
    verified: boolean("verified").default(true).notNull(),
    cellbitLogo: boolean("cellbit-logo").default(false).notNull(),
    blood: boolean("blood").default(false).notNull(),
    knowledge: boolean("knowledge").default(false).notNull(),
    death: boolean("death").default(false).notNull(),
    energy: boolean("energy").default(false).notNull(),
  },
  (table) => {
    return {
      usernameKey: uniqueIndex("users_username_key").on(table.username),
      usersUsernameKey1: unique("users_username_key1").on(table.username),
    };
  }
);

export const userAccountTable = pgTable("user-account", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  // verified: boolean("verified").notNull(),
  // "cellbit-logo": boolean("cellbit-logo").notNull(),
  // blood: boolean("blood").notNull(),
  // knowledge: boolean("knowledge").notNull(),
  // death: boolean("death").notNull(),
  // energy: boolean("energy").notNull(),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userAccountTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const adapter = new DrizzlePostgreSQLAdapter(
  db,
  sessionTable,
  userAccountTable
);
