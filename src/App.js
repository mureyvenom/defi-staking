import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Web3 from "web3";
import Tether from "./truffle_abis/Tether.json";
import RWD from "./truffle_abis/RWD.json";
import DecentralBank from "./truffle_abis/DecentralBank.json";
import { BiLoaderAlt } from "react-icons/bi";

function App() {
  const [account, setAccount] = useState("");
  const [tether, setTether] = useState({});
  const [rwd, setRwd] = useState({});
  const [decentralBank, setDecentralBank] = useState({});
  const [tetherBalance, setTetherBalance] = useState("0");
  const [rwdBalance, setRwdBalance] = useState("0");
  const [stakingBalance, setStakingBalance] = useState("0");
  const [loading, setLoading] = useState(false);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("No ethereum browser detected. Try metamask");
    }
  };

  const loadBlockchainData = async () => {
    try {
      setLoading(true);
      const web3 = window.web3;
      const acc = await web3.eth.getAccounts();
      setAccount(acc[0]);
      const networkId = await web3.eth.net.getId();

      //load tether contract and details
      const tetherData = Tether.networks[networkId];
      if (tetherData) {
        const newTether = await new web3.eth.Contract(
          Tether.abi,
          tetherData.address
        );
        setTether(newTether);
        const newTetherBalance = await newTether.methods
          .balanceOf(acc[0])
          .call();
        setTetherBalance(newTetherBalance.toString());
      } else {
        alert("Unable to load tether data");
        setLoading(false);
      }

      //load rwd contract and details
      const rwdData = RWD.networks[networkId];
      if (rwdData) {
        const newRwd = await new web3.eth.Contract(RWD.abi, rwdData.address);
        setRwd(newRwd);
        const newRwdBalance = await newRwd.methods.balanceOf(acc[0]).call();
        setRwdBalance(newRwdBalance.toString());
      } else {
        alert("Unable to load rwd data");
        setLoading(false);
      }

      //load decentral contract and details
      const decentralData = DecentralBank.networks[networkId];
      if (decentralData) {
        const newDecentral = await new web3.eth.Contract(
          DecentralBank.abi,
          decentralData.address
        );
        setDecentralBank(newDecentral);
        const newStakingBalance = await newDecentral.methods
          .stakingBalance(acc[0])
          .call();
        setStakingBalance(newStakingBalance.toString());
      } else {
        alert("Unable to load decentral bank data");
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    return async () => {
      await loadWeb3();
      await loadBlockchainData();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-sm">
      <Navbar account={account} />
      {loading && (
        <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-[rgba(255,255,255,0.8)]">
          <BiLoaderAlt className="animate-spin" size={40} />
        </div>
      )}
    </div>
  );
}

export default App;
