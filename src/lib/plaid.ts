import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const config = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID!,
      'PLAID-SECRET': process.env.PLAID_SECRET!,
    },
  },
});

export const plaidClient = new PlaidApi(config);

// In-memory store for hackathon demo (single user)
export let accessToken: string | null = null;
export function setAccessToken(token: string) {
  accessToken = token;
}
