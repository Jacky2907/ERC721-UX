import { ethers } from "ethers";
import { useState, useEffect  } from "react";
import { useParams, useNavigate } from 'react-router-dom';

const FakeBaycToken = () => {
    const [state, setState] = useState({});
    const {token_id } = useParams();
    const navigate = useNavigate();
    const fakeBaycAbi = require('../abi/FakeBAYC.json');
    const contractData = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const fakeBaycAddress="0x1dA89342716B14602664626CD3482b47D5C2005E";
            const ct = new ethers.Contract(fakeBaycAddress, fakeBaycAbi.abi, signer);
            const tokenURI = await ct.tokenURI(parseInt(token_id));
            let imageURI, imageName, imageDescription;
            fetch(tokenURI)
            .then(response => response.json())
            .then(data => {
               imageURI = (data.image).replace('ipfs://', 'https://ipfs.io/ipfs/');
               imageName = data.name;
               imageDescription = data.description;
               setState({signer: signer, imageURI: imageURI, name: imageName, description: imageDescription,  contract: ct});
            })
            .catch(error => {
                setState({error: true});
            });
            
        } catch (error) {
            console.log(error); 
            setState({error: true}); 
        };
    }

    useEffect(()=>{
        contractData();
    },[]);

    return (
        <>
            <h1 className="pageTitle">Fake Bayc</h1>
            
            {state.contract && <div className="section">
                <div className="box small">
                    <h3 className="subtitle">Nom du Token :</h3>
                    <p className="alertMsg">{state.imageName || ""}</p>
                </div>
                <div className="box small">
                    <h3 className="subtitle">Description :</h3>
                    <p className="alertMsg">{state.description || ""}</p>
                </div>
                <div className="box small">
                    <h3 className="subtitle">Image :</h3>
                    <img src={state.imageURI} alt="" className="ipfsImage" />
                </div>
            </div>} 

            {state.error && <div className="MenuSection">
                <div className="box small">
                    <p>Sorry, the given token ID does not exists ;</p>
                </div>
                <button className="button" onClick={() => navigate("/")}>Menu</button>
            </div>}
        </>
    )
}
export default FakeBaycToken;