'use client';

import { useState, useCallback, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';

interface Transaction {
  name: string;
  amount: number;
  category: string;
  date: string;
}

interface Account {
  name: string;
  type: string;
  balance: number;
}

export default function BankConnect() {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [byCategory, setByCategory] = useState<Record<string, number>>({});

  // Get link token on mount
  useEffect(() => {
    fetch('/api/plaid/create-link-token', { method: 'POST' })
      .then(r => r.json())
      .then(data => {
        if (data.link_token) setLinkToken(data.link_token);
      })
      .catch(() => {});
  }, []);

  const onSuccess = useCallback(async (publicToken: string) => {
    setLoading(true);
    // Exchange token
    await fetch('/api/plaid/exchange-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_token: publicToken }),
    });

    // Fetch transactions (retry once if not ready)
    const fetchTxns = async (retries = 2): Promise<void> => {
      const res = await fetch('/api/plaid/transactions');
      if (res.status === 202 && retries > 0) {
        await new Promise(r => setTimeout(r, 3000));
        return fetchTxns(retries - 1);
      }
      const data = await res.json();
      if (data.transactions) {
        setTransactions(data.transactions);
        setAccounts(data.accounts || []);
        setByCategory(data.byCategory || {});
        setConnected(true);
      }
    };

    await fetchTxns();
    setLoading(false);
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
  });

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(n);

  // Sort categories by spend
  const sortedCategories = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);
  const topCategory = sortedCategories[0];

  if (!connected) {
    return (
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-900 font-semibold text-lg">Link Your Bank</h3>
            <p className="text-gray-500 text-sm mt-1">
              Connect your account to auto-import transactions
            </p>
          </div>
          <button
            onClick={() => open()}
            disabled={!ready || !linkToken || loading}
            className="px-5 py-2.5 bg-[#00D632] text-gray-900 font-semibold rounded-xl hover:bg-[#00D632]/80 transition-all disabled:opacity-30"
          >
            {loading ? 'Connecting...' : 'Connect'}
          </button>
        </div>
        {loading && (
          <p className="text-gray-400 text-sm mt-3">Fetching your transactions...</p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-900 font-semibold text-lg">Bank Connected</h3>
        <span className="text-xs bg-[#00D632]/20 text-[#00D632] px-2 py-1 rounded-full font-medium">
          Live
        </span>
      </div>

      {/* Accounts */}
      {accounts.length > 0 && (
        <div className="space-y-2">
          {accounts.map((a, i) => (
            <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="text-gray-900 text-sm font-medium">{a.name}</p>
                <p className="text-gray-400 text-xs capitalize">{a.type}</p>
              </div>
              <p className="text-gray-900 font-semibold">{fmt(a.balance ?? 0)}</p>
            </div>
          ))}
        </div>
      )}

      {/* Spending by category */}
      {sortedCategories.length > 0 && (
        <div>
          <h4 className="text-gray-500 text-sm font-medium mb-3">Spending by Category (30 days)</h4>
          <div className="space-y-2">
            {sortedCategories.slice(0, 6).map(([cat, amount]) => {
              const pct = topCategory ? (amount / topCategory[1]) * 100 : 0;
              return (
                <div key={cat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500 capitalize">{cat.toLowerCase().replace(/_/g, ' ')}</span>
                    <span className="text-gray-800 font-medium">{fmt(amount)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#00D632] h-2 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent transactions */}
      {transactions.length > 0 && (
        <div>
          <h4 className="text-gray-500 text-sm font-medium mb-3">Recent Transactions</h4>
          <div className="space-y-1 max-h-[200px] overflow-y-auto">
            {transactions.slice(0, 10).map((t, i) => (
              <div key={i} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-all">
                <div>
                  <p className="text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.date}</p>
                </div>
                <p className={`text-sm font-medium ${t.amount > 0 ? 'text-red-400' : 'text-[#00D632]'}`}>
                  {t.amount > 0 ? '-' : '+'}{fmt(Math.abs(t.amount))}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
