import React, { useEffect, useState } from "react";
import "./App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import CandyMachine from "./CandyMachine";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
	
	// custom code start 

	// check wallet connected or not
	let [walletAddress, setWalletAddress] = useState(null);

	const checkIfWalletIsConnected = async () => {
		try {
			const { solana } = window;
			if (solana) {
				if (solana.isPhantom) {
					console.log("Phanton wallet found!");
					// chech user login or not 
					// await window.solana.signMessage();
					// window.solana.on("connect", () => console.log("connected!"))
					// window.solana.request({ method: "connect", params: { onlyIfTrusted: true }});
					const response = await window.solana.connect({ onlyIfTrusted: true });
					console.log("Connected with Public Key:", response.publicKey.toString());
					setWalletAddress(response.publicKey.toString());
				} else {
					alert("Solana object not found! Get a Phantom Wallet!");
				} 
			}
		}
		catch (error) {
			console.error(error);
		}
	};

	const connectwallet = async () => {
		const {solana} = window;
		if (solana) {
			const response = await window.solana.connect();
			console.log("Connected with Public Key:", response.publicKey.toString());
			setWalletAddress(response.publicKey.toString());
		}
	};

	const renderNotConnectedContainer = () => (
		<button className="cta-button connect-wallet-button"
		onClick={connectwallet} >
		Connect to Wallet </button>
	);

	useEffect (() => {
		const onload = async () => {
		await checkIfWalletIsConnected ();
		};

		window.addEventListener("load", onload);
		return () => window.removeEventListener("load", onload);
	}, []);

	// custom code end


	return (
		<div className="App">
			<div className="container">
				<div className="header-container">
					<p className="header">🍭 Candy Drop</p>
					<p className="sub-text">NFT drop machine with fair mint</p>

					{ !walletAddress && renderNotConnectedContainer()}

				</div>

				{walletAddress && <CandyMachine walletAddress={window.solana} />}

				<div className="footer-container">
					<img
						alt="Twitter Logo"
						className="twitter-logo"
						src={twitterLogo}
					/>
					<a
						className="footer-text"
						href={TWITTER_LINK}
						target="_blank"
						rel="noreferrer"
					>{`Adapted from @${TWITTER_HANDLE}`}</a>
				</div>
			</div>
		</div>
	);
};

export default App;
