import React from 'react';
import WalletMethods from '../magic/cards/WalletMethodsCard';
import SendTransaction from '../magic/cards/SendTransactionCard';
import Spacer from '@/components/ui/Spacer';
import { LoginProps } from '@/utils/types';
import UserInfo from '@/components/magic/cards/UserInfoCard';
import DevLinks from './DevLinks';
import Header from './Header';
import SmartContract from '../magic/cards/SmartContract';
import ArbitrumCard from '../magic/cards/ArbitrumCard';
import { isTestnet } from '@/utils/smartContract';
import ManifestationCard from './ManifestationCard';

export default function Dashboard({ token, setToken }: LoginProps) {
  return (
    <div className="home-page">
      <Header />
      <div className="covenant-shell">
        <div className="covenant-shell-copy">
          <span className="covenant-shell-kicker">First Shell</span>
          <h1>The first day separates the chamber.</h1>
          <p>
            This is the first true Covenant surface: Ronin as sovereign root, Ethereum as canonical record,
            Polygon as energetic current, and Arbitrum as the place where world-form begins.
          </p>
        </div>
        <div className="covenant-pillars">
          <UserInfo token={token} setToken={setToken} />
          <WalletMethods token={token} setToken={setToken} />
          <SendTransaction />
          <ArbitrumCard />
          <ManifestationCard />
        </div>
        {isTestnet() && (
          <>
            <Spacer size={15} />
            <div className="covenant-shell-secondary">
              <SmartContract />
            </div>
          </>
        )}
      </div>
      <DevLinks primary />
    </div>
  );
}
