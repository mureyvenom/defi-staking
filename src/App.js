import { useState } from "react";
import Navbar from "./components/Navbar";
import Web3 from "web3";

function App() {
  const [account, setAccount] = useState(
    "0xb822b26fc94C745b71bF33556ED50929D4A714FC"
  );

  // const loadWeb3 = async () => {
  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum);
  //     await window.ethereum.enable();
  //   }
  // };

  return (
    <div className="text-sm">
      <Navbar account={account} />
    </div>
  );
}

export default App;
