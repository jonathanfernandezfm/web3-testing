import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import {
	useEthers,
	useEtherBalance,
	useTokenBalance,
	useTokenAllowance,
	useSendTransaction,
	useTransactions,
	useNotifications,
} from '@usedapp/core';
import { formatEther, parseEther } from '@ethersproject/units';
import { formatUnits } from '@ethersproject/units';
import Jazzicon from 'react-jazzicon';

const Button = styled.button`
	padding: 10px 20px;
	font-size: 18px;
`;

function App() {
	const { activateBrowserWallet, account, deactivate, active, error, connector } = useEthers();
	const allowance = useTokenAllowance(
		'0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F',
		'0x26b246544c7a8BAb0b81f110c099CD9B570a4681',
		'0x26b246544c7a8BAb0b81f110c099CD9B570a4681'
	);

	const { sendTransaction, state } = useSendTransaction();
	const etherBalance = useEtherBalance(account);
	const { transactions } = useTransactions();
	const { notifications } = useNotifications();

	const handleConnectWallet = () => {
		activateBrowserWallet();
	};

	const handleDisconnectWallet = () => {
		deactivate();
	};

	const handleTransaction = () => {
		sendTransaction({ to: '0xE8c82c83E284906FC3E8769a5833727EdacC10aa', value: parseEther('0.02') });
	};

	console.log(account, etherBalance, active, error?.name, connector);
	console.log(transactions);
	console.log(notifications);

	return (
		<div className="App">
			<main className="App-header">
				<h3>Account</h3>
				{etherBalance && <p>{parseFloat(formatEther(etherBalance)).toFixed(3)} BNB</p>}
				{/* {allowance && <p>{parseFloat(formatEther(allowance)).toFixed(3)} BNB</p>} */}
				{account ? (
					<Button onClick={handleDisconnectWallet}>Disconnect</Button>
				) : (
					<Button onClick={handleConnectWallet}>Connect</Button>
				)}
				<h3>Transactions</h3>
				{state && state.status}
				<Button onClick={handleTransaction}>Send 0.02</Button>
				{/* {account && [Jazzicon(16, parseInt(account.slice(2, 10), 16))]} */}
				<Jazzicon diameter={100} seed={Math.round(Math.random() * 10000000)} />
				<ul>
					{transactions.map((transaction) => (
						<li>to {transaction.receipt?.to} </li>
					))}
				</ul>
			</main>
		</div>
	);
}

export default App;
