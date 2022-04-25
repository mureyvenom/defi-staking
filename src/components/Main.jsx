import { useEffect, useState } from "react";
import Airdrop from "./Airdrop";

const Main = ({
  stakingBalance,
  tetherBalance,
  rwdBalance,
  stakeTokens,
  unstakeTokens,
  issueTokens,
}) => {
  const [stakeAmount, setStakeAmount] = useState("0");
  const [countStatus, setCountStatus] = useState(false);

  useEffect(() => {
    if (stakingBalance > "50000000000000000000") {
      setCountStatus(true);
    }
  }, [stakingBalance]);

  return (
    <div>
      <div>
        <div className="grid grid-cols-2 gap-x-2 text-center mb-2">
          <div className="bg-black text-white py-2">Staking Balance</div>
          <div className="bg-black text-white py-2">Reward Balance</div>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-y-1 gap-x-2 text-center">
            <div className="bg-gray-700 text-white py-2">
              {window.web3?.utils?.fromWei(stakingBalance, "Ether")} USDT
            </div>
            <div className="bg-gray-700 text-white py-2">
              {window.web3?.utils?.fromWei(rwdBalance, "Ether")} RWD
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="flex items-center justify-between py-3 px-5 border-[1px] border-gray-700">
          <div>
            <div className="font-bold">Stake Tokens(USDT)</div>
            <div>
              <input
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.currentTarget.value)}
                type="number"
                className="border-[1px] border-black rounded px-3 py-2 outline-none mt-3"
              />
            </div>
          </div>
          <div>
            Balance: {window.web3?.utils?.fromWei(tetherBalance, "Ether")}
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-3 justify-between items-center py-3 mt-4">
          <button
            onClick={() => {
              if (Number(stakeAmount) < 1) {
                alert("Enter a valid value to stake");
                return;
              }
              stakeTokens(window.web3.utils.toWei(stakeAmount));
              setStakeAmount("0");
            }}
            className="py-3 rounded-md md:w-[30%] w-full bg-purple-700 transition-all duration-300 hover:shadow-lg px-8 text-white font-bold"
          >
            Deposit
          </button>
          <button
            onClick={() => {
              unstakeTokens();
              setStakeAmount("0");
            }}
            className="py-3 rounded-md md:w-[30%] w-full bg-purple-700 transition-all duration-300 hover:shadow-lg px-8 text-white font-bold"
          >
            Withdraw
          </button>
        </div>
        {countStatus && (
          <Airdrop finishedFunction={issueTokens} initialSeconds={30} />
        )}
      </div>
    </div>
  );
};

export default Main;
