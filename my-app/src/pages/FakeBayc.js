import { ethers } from "ethers";
import { useState, useEffect  } from "react";
import { useNavigate } from 'react-router-dom';

const FakeBayc = () => {
    const [state, setState] = useState({});
    const navigate = useNavigate();
    const fakeBaycAbi = require('../abi/FakeBAYC.json');

    const contractData = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const fakeBaycAddress="0x1dA89342716B14602664626CD3482b47D5C2005E";
            const ct = new ethers.Contract(fakeBaycAddress, fakeBaycAbi.abi, signer);
            const name = await ct.name();
            const symbol = await ct.symbol();
            const totalSupplyBn = await ct.totalSupply();
            const totalSupply = ethers.utils.formatEther(totalSupplyBn);
            setState({signer: signer, contractName: name, contractSymbol: symbol, contract: ct, totalSupply});
        } catch (error) {
            console.log(error);  
        };
    }

    useEffect(()=>{
        contractData();
    },[]);

    const ClaimAToken = async () =>{
        if (await state.signer){
            await state.contract.claimAToken();
        }else{
            contractData();
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        const target = e.currentTarget;
        const tokenID = target.tokenID.value;
        navigate("/FakeBayc/"+tokenID);
    };

    return (
        <>
            <h1 className="pageTitle">Fake Bayc</h1>
            
            {state.contractName && <div className="section">
                <div className="box small">
                    <h3 className="subtitle">Nom du contract :</h3>
                    <p className="alertMsg">{state.contractName || ""}</p>
                </div>
                <div className="box small">
                    <h3 className="subtitle">Symbole du contract :</h3>
                    <p className="alertMsg">{state.contractSymbol || ""}</p>
                </div>
                <div className="box small">
                    <h3 className="subtitle">Total supply :</h3>
                    <p className="alertMsg">{state.totalSupply || ""}</p>
                </div>
            </div>} 

            <div className="section">
                {state.signer && <button className="button" onClick={ClaimAToken}>Claim your NFT</button>}
                <form className="box" onSubmit={submit}>
                    <h3 className="subtitle">Renseigner l'id de votre NFT :</h3>
                    <input type="number" id="tokenID" name="tokenID" className="input" placeholder="NFT ID*"/>
                    <button type="submit" className="button">Valider</button>
                </form>
            </div>
        </>
    );
};

export default FakeBayc;