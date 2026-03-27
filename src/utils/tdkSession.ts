import { setFrenState } from './frenState';
import { setWorldState } from './worldState';

const TDK_API = process.env.NEXT_PUBLIC_TDK_API_URL || 'https://tdk-api.spellcaster.lol';

type TDKUser = {
  id: string;
  email: string | null;
  address: string;
  tag: string | null;
  smartAccounts: { chainId: number; address: string }[];
};

const TDK_SESSION_KEY = 'tdk-session';

export type TDKSession = {
  authToken: string;
  user: TDKUser;
};

export const getTDKSession = (): TDKSession | null => {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(TDK_SESSION_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as TDKSession; } catch { return null; }
};

export const establishTDKSession = async (authToken: string): Promise<TDKSession | null> => {
  try {
    const res = await fetch(`${TDK_API}/users/me`, {
      headers: { Authorization: `Bearer ${authToken}`, 'x-chain-id': '2020' },
    });
    if (!res.ok) return null;
    const user = await res.json() as TDKUser;
    const session: TDKSession = { authToken, user };
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(TDK_SESSION_KEY, JSON.stringify(session));
    }
    // Hydrate fren state from TDK user
    setFrenState({
      id: user.id || user.address,
      chainOrigin: 'ronin',
    });
    // Mark ronin chain as connected in world state
    setWorldState({
      fren: {
        id: user.id || user.address,
        stage: 'light',
        autonomyLevel: 0,
        memoryAnchors: [],
        chainOrigin: 'ronin',
        lastActive: new Date().toISOString(),
      },
    });
    return session;
  } catch {
    return null;
  }
};

export const clearTDKSession = (): void => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(TDK_SESSION_KEY);
  }
};
