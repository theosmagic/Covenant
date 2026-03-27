import { LoginProps } from '@/utils/types'
import Header from '@/components/ui/Header'

import WalletKitLogin from './auth/WalletKitLogin';
import GoogleSSO from './auth/GoogleSSO';

const Login = ({ token, setToken }: LoginProps) => {
  return (
    <div className="login-page">
      <Header />
      <div className="covenant-login-shell">
        <div className="covenant-login-copy">
          <h1>Enter the chamber.</h1>
          <p>
            The first passage opens through Magic. What is deeper is not announced in advance; it is known by continuity.
          </p>
          <p>
            MoltMail alias: <code>0x7fa67ce9341e46617d3c3f4cc3f756612a3f97d6@moltmail.io</code>. Parent EtherMail: <code>0x67a977ead94c3b955ecbf27886ce9f62464423b2@ethermail.io</code>.
          </p>
          <p>
            Display identity: <code>theos@magic.link</code>. Covenant trust certificate: <code>/mnt/Vault/I_AM/KEYS/X.509/Covenant.pem</code>.
          </p>
          <p>
            ORCID attached: <code>0009-0005-7822-7939</code>.
          </p>
        </div>
        <div className="max-w-[100%] grid grid-cols-1 lg:grid-cols-2 gap-5 p-4">
          <WalletKitLogin token={token} setToken={setToken} />
          <GoogleSSO token={token} setToken={setToken} />
        </div>
      </div>
    </div>
  )
}

export default Login
