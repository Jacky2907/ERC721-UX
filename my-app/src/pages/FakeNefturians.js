import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";

import { Link, Outlet } from "react-router-dom";

const FakeNeftrurians = () => {
  const [connectedContract, setConnectedContract] = useState(null);
  const [priceToken, setPriceToken] = useState(null);
  
  const [errorMessage, setErrorMessage] = useState(null);

  const [searchedAddress, setSearchedAddress] = useState("");
  const FakeNefturianAbi = require('../abi/FakeNefturians.json');

  const getConnectedContract = async () => {
    const { ethereum } = window;
    if (!ethereum) return;

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const connectedContract = await new ethers.Contract(
      "0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED ",
      FakeNefturianAbi.abi,
      signer
    );
    setConnectedContract(connectedContract);
    getPriceToken(connectedContract);
  };
  const getPriceToken = async (connectedContract) => {
    const priceToken = await connectedContract.tokenPrice();
    setPriceToken(ethers.utils.formatEther(priceToken.toString()));
  };

  const buyToken = async () => {
    const val = (
      parseFloat(priceToken) + parseFloat(Math.pow(10, -17))
    ).toString();
    console.log(val);
    const buyTokenTx = await connectedContract.buyAToken({
      value: ethers.utils.parseEther(val),
    });
    buyTokenTx.wait();
  };

  useEffect(() => {
    getConnectedContract();
  }, []);
  return (
    <div>
      The price of a token is {priceToken} eth.
      <br />
      <button onClick={buyToken}>Buy a token</button>
      <br />
      <input
        type="text"
        value={searchedAddress}
        onChange={(newval) => {
          setSearchedAddress(newval.target.value);
        }}
      ></input>

    </div>
  );
};

export default FakeNeftrurians;