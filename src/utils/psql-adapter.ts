/* eslint-disable max-len */
import type { Adapter } from 'next-auth/adapters';
import { sql } from '@vercel/postgres';
import { nanoid } from 'nanoid';

export function PsqlAdapter(): Adapter {
  return {
    createUser: async (data) => {
      const response = await sql<{ id: string; email: string; email_verified: string | null; name: string; image: string }>`
        INSERT INTO user (id, name, email, image, email_verified)
        VALUES (${nanoid()}, ${data.name}, ${data.email}, ${data.image}, ${data.emailVerified ? data.emailVerified.toDateString() : null})
        RETURNING id, email, email_verified, name, image`;

      const user = response.rows[0]!;

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        emailVerified: user.email_verified ? new Date(user.email_verified) : null,
      };
    },
    getUser: async (id) => {
      const response = await sql<{ id: string; email: string; email_verified: string | null; name: string; image: string }>`
        SELECT id, email, email_verified, name, image FROM user WHERE id = ${id}`;

      const user = response.rows[0];

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        emailVerified: user.email_verified ? new Date(user.email_verified) : null,
      };
    },
    getUserByEmail: async (email) => {
      const response = await sql<{ id: string; email: string; email_verified: string | null; name: string; image: string }>`
        SELECT id, email, email_verified, name, image FROM user WHERE email = ${email}`;

      const user = response.rows[0];

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        emailVerified: user.email_verified ? new Date(user.email_verified) : null,
      };
    },
    getUserByAccount: async (provider) => {
      const response = await sql<{ id: string; email: string; email_verified: string; name: string; image: string }>`
          SELECT US.id, US.name, US.email, US.image, US.email_verified
          FROM user US INNER JOIN account AC ON US.id = AC.user_id
          WHERE AC.provider_account_id = ${provider.providerAccountId} AND AC.provider = ${provider.provider}`;

      const user = response.rows[0];

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        emailVerified: user.email_verified ? new Date(user.email_verified) : null,
      };
    },
    updateUser: async ({ id, ...data }) => {
      const response = await sql<{ id: string; email: string; email_verified: string; name: string; image: string }>`
        UPDATE user SET
          name = ${data.name},
          email = ${data.email},
          image = ${data.image},
          email_verified = ${data.emailVerified ? data.emailVerified.toDateString() : null}
        WHERE id = ${id}
        RETURNING id, email, email_verified, name, image`;

      const user = response.rows[0]!;

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        emailVerified: user.email_verified ? new Date(user.email_verified) : null,
      };
    },
    deleteUser: async (id) => {
      await sql`DELETE FROM user WHERE id = ${id}`;
    },
    linkAccount: async (data) => {
      await sql<{
        id: string;
        type: string;
        provider: string;
        provider_account_id: string;
        user_id: number;
        refresh_token: string;
        access_token: string;
        expires_at: string;
      }>`
        INSERT INTO account (id, type, provider, provider_account_id, user_id, refresh_token, access_token, expires_at)
        VALUES (${nanoid()}, ${data.type}, ${data.provider}, ${data.providerAccountId}, ${data.userId}, ${data.refresh_token}, ${data.access_token}, ${data.expires_at})`;
    },
    unlinkAccount: async (data) => {
      await sql`DELETE FROM account WHERE provider = ${data.provider} AND provider_account_id = ${data.providerAccountId}`;
    },
    getSessionAndUser: async (sessionToken) => {
      const sessionQuery = await sql`
        SELECT US.id, US.name, US.email, US.image, US.email_verified, SE.expires, SE.session_token
        FROM user US
          INNER JOIN session SE ON US.id = SE.user_id
        WHERE SE.session_token = ${sessionToken}`;

      const userAndSession = sessionQuery.rows[0] as {
        id: string;
        name: string;
        email: string;
        email_verified: string | null;
        image: string | null;
        expires: string;
        session_token: string;
      } | null;

      if (!userAndSession) {
        return null;
      }

      const {
        id,
        name,
        email,
        email_verified,
        image,
        expires,
      } = userAndSession;
      return {
        user: {
          id,
          name,
          email,
          image,
          emailVerified: email_verified ? new Date(email_verified) : null,
        },
        session: { sessionToken, userId: id, expires: new Date(expires) },
      };
    },
    createSession: async (data) => {
      const response = await sql<{ session_token: string; user_id: string; expires: string }>`
        INSERT INTO session (id, session_token, user_id, expires)
        VALUES (${nanoid()}, ${data.sessionToken}, ${data.userId}, ${data.expires.toDateString()})
        RETURNING session_token, user_id, expires`;

      const session =  response.rows[0]!;
      return { userId: session.user_id, sessionToken: session.session_token, expires: new Date(session.expires) };
    },
    updateSession: async (data) => {
      const response = await sql<{ session_token: string; user_id: string; expires: string }>`
        UPDATE session SET expires = ${data.expires ? data.expires.toDateString() : null}
        WHERE session_token = ${data.sessionToken}
        RETURNING session_token, user_id, expires`;

      const session =  response.rows[0]!;
      return { userId: session.user_id, sessionToken: session.session_token, expires: new Date(session.expires) };
    },
    deleteSession: async (sessionToken) => {
      const client = await sql.connect();
      await client.sql`SELECT * FROM session WHERE session_token = ${sessionToken}`;
      await client.sql`DELETE FROM session WHERE session_token = ${sessionToken}`;
    },
    createVerificationToken: async (data) => {
      const response = await sql<{ id: string; token: string; identifier: string; expires: string }>`
        INSERT INTO verification_token (id, token, identifier, expires)
        VALUES (${nanoid()}, ${data.token}, ${data.identifier}, ${data.expires.toDateString()})
        RETURNING id, token, identifier, expires`;

      const verificationToken = response.rows[0]!;

      return {
        id: verificationToken.id,
        token: verificationToken.token,
        identifier: verificationToken.identifier,
        expires: new Date(verificationToken.expires),
      };
    },
    useVerificationToken: async (data) => {
      const client = await sql.connect();
      const verificationToken = (
        await client.sql<{ token: string; identifier: string; expires: Date }>`
          SELECT token, identifier, expires FROM verification_token
          WHERE token = ${data.token} AND identifier = ${data.identifier}`
      ).rows[0];

      if (!verificationToken) {
        client.release();
        return null;
      }

      await client.sql`DELETE FROM verification_token WHERE token = ${data.token} AND identifier = ${data.identifier}`;

      return verificationToken;
    },
  }
}
