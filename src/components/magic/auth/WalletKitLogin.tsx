import { useState } from 'react';
import { MagicWidget } from '@magic-ext/wallet-kit';
import Card from '@/components/ui/Card';
import CardHeader from '@/components/ui/CardHeader';
import { useMagic } from '@/hooks/MagicProvider';
import { saveUserInfo } from '@/utils/common';
import { LoginProps } from '@/utils/types';

type WalletLoginResult =
  | { method: 'email'; didToken: string }
  | { method: 'farcaster'; didToken: string }
  | {
      method: 'oauth';
      oauth: unknown;
      magic: {
        idToken: string;
        userMetadata?: {
          publicAddress?: string;
        };
      };
    }
  | { method: 'wallet'; walletAddress: string };

const WalletKitLogin = ({ setToken }: LoginProps) => {
  const { magic } = useMagic();
  const [widgetReady, setWidgetReady] = useState(false);
  const [error, setError] = useState('');

  const handleSuccess = async (result: WalletLoginResult) => {
    if (!magic) return;

    if (result.method === 'wallet') {
      const walletToken = `wallet:${result.walletAddress}`;
      saveUserInfo(walletToken, 'SOCIAL', result.walletAddress);
      setToken(walletToken);
      setError('');
      return;
    }

    const metadata = await magic.user.getInfo();
    const authToken = result.method === 'oauth' ? result.magic.idToken : result.didToken;
    const oauthAddress = result.method === 'oauth' ? result.magic.userMetadata?.publicAddress : undefined;
    const publicAddress = metadata?.publicAddress || oauthAddress;

    if (!authToken || !publicAddress) {
      throw new Error('Magic login completed without wallet metadata');
    }

    const loginMethod = result.method === 'email' ? 'EMAIL' : 'SOCIAL';
    saveUserInfo(authToken, loginMethod, publicAddress);
    setToken(authToken);
    setError('');
  };

  return (
    <Card>
      <CardHeader id="login">Wallet Kit Login</CardHeader>
      {!widgetReady ? <div className="text-sm opacity-70">Loading Magic auth...</div> : null}
      <MagicWidget
        closeOnSuccess
        enableFarcaster
        isOpen
        onAccountChanged={(result) => {
          const walletToken = `wallet:${result.walletAddress}`;
          saveUserInfo(walletToken, 'SOCIAL', result.walletAddress);
          setToken(walletToken);
          setError('');
        }}
        onError={(widgetError) => {
          console.error(widgetError);
          setError(widgetError.message || 'Magic Wallet Kit login failed');
        }}
        onReady={() => {
          setWidgetReady(true);
        }}
        onSuccess={(result) => {
          void handleSuccess(result as WalletLoginResult).catch((widgetError: Error) => {
            console.error(widgetError);
            setError(widgetError.message || 'Magic Wallet Kit login failed');
          });
        }}
        wallets={['metamask', 'coinbase', 'walletconnect']}
      />
      {error ? <div className="mt-3 text-sm text-red-400">{error}</div> : null}
    </Card>
  );
};

export default WalletKitLogin;
