import { React, useEffect, useState, Redirect} from "react";
import { Route, useNavigate } from "react-router-dom";
import {AppRoutes} from "../App";
import { ethers } from "ethers";


const provider = new ethers.providers.Web3Provider(window.ethereum) 
const signer = provider.getSigner()
// const chainId = 1 ;


const ChainInfo = () => {

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    const navigate = useNavigate();

    // const [chainId, setChainId] = useState(null);
    // useEffect(() =>{
    //     signer.getChainId().then(setChainId);
    // }, [chainId]);
    // const navigate = useNavigate();

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask ) {
			console.log('MetaMask Here!');

            if (network.name === "sepolia") {
                window.ethereum.request({ method: 'eth_requestAccounts'})
                .then(result => {
                    accountChangedHandler(result[0]);
                    setConnButtonText('Wallet Connected');
                    getAccountBalance(result[0]);
                })
                .catch(error => {
                    setErrorMessage(error.message);
                
                });
            }
            else {
                navigate("/WrongNetwork", {replace: true});

                // <Route path="/wrongNetwork" element={<Navigate replace to="/WrongNetwork" />} />
                
                setErrorMessage('Wrong Network');
            }


		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		getAccountBalance(newAccount.toString());
	}

	const getAccountBalance = (account) => {
		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setUserBalance(ethers.utils.formatEther(balance));
		})
		.catch(error => {
			setErrorMessage(error.message);
		});
	};

    // get last block number
    const [blockNumber, setBlockNumber] = useState(null);
    useEffect(() => {
        provider.getBlockNumber().then(setBlockNumber);
    }, [blockNumber]);

    // get network
    const [network, setNetwork] = useState(null);
    useEffect(() => {
        provider.getNetwork().then(setNetwork);
    }, [network]);

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}


	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);
	
	return (
		<div className='walletCard'>
		<h4> {"Connection to MetaMask"} </h4>
			<button onClick={connectWalletHandler}>{connButtonText}</button>
			<div className='accountDisplay'>
				<h3>Address: {defaultAccount}</h3>
			</div>
			<div className='balanceDisplay'>
				<h3>Balance: {userBalance}</h3>
			</div>
            <div className='blockNumber'>
				<h3>Last block number: {blockNumber}</h3>
			</div>
            {/* <div className='chainId'>
				<h3>Network: {network['name']} id = {network['chainId']}</h3>
			</div> */}
			{errorMessage}
		</div>
	);
}

export default ChainInfo;