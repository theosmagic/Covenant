import { LoginProps } from '@/utils/types'
import Header from '@/components/ui/Header'

import EmailOTP from './auth/EmailOTP';  

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
        </div>
        <div className={'max-w-[100%] grid grid-cols-1 grid-flow-row auto-rows-fr gap-5 p-4'}>
          <EmailOTP token={token} setToken={setToken} />
        </div>
      </div>
    </div>
  )
}

export default Login
