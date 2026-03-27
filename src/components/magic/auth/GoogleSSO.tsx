import { useState } from 'react';
import Card from '@/components/ui/Card';
import CardHeader from '@/components/ui/CardHeader';
import Spinner from '@/components/ui/Spinner';
import { useMagic } from '@/hooks/MagicProvider';
import { saveUserInfo } from '@/utils/common';
import { LoginProps } from '@/utils/types';

const GoogleSSO = ({ token, setToken }: LoginProps) => {
  const { magic } = useMagic();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    if (!magic) return;
    setLoading(true);
    setError(null);

    try {
      const result = await magic.oauth.loginWithPopup({ provider: 'google' as const });
      const idToken = result.magic?.idToken || result.oauth?.idToken;
      const address =
        result.magic?.userMetadata?.publicAddress ||
        result.oauth?.userInfo?.walletAddress ||
        result.magic?.userMetadata?.email;

      if (!idToken) {
        throw new Error('Google login did not return an ID token');
      }

      saveUserInfo(idToken, 'SOCIAL', address || 'google');
      setToken(idToken);
    } catch (loginError) {
      console.error('[Magic Google SSO]', loginError);
      setError(loginError instanceof Error ? loginError.message : 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader id="google-sso">Google SSO</CardHeader>
      <p className="text-sm opacity-70">
        Google signs in as <code>theosmagic.uni.eth@ethermail.io</code> but keeps the front-facing
        alias <code>theos@magic.link</code> (theos🔮 magik link). No OTP needed, just passwordless OAuth.
      </p>
      <button className="login-button mt-4" onClick={handleGoogleLogin} disabled={loading || token.length > 0}>
        {loading ? <Spinner /> : 'Log in with Google'}
      </button>
      {error && <div className="mt-3 text-sm text-red-400">{error}</div>}
    </Card>
  );
};

export default GoogleSSO;
