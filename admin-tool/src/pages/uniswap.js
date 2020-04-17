import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
//import Content from 'components/Content'

// Factory Addresses
// mainnet
const factory = '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95'

// testnets
const ropsten = '0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351'
const rinkeby = '0xf5D915570BC477f9B8D6C0E980aA81757A3AaC36'
const kovan = '0xD3E51Ef092B2845f10401a0159B2B96e8B6c3D30'
const görli = '0x6Ce570d02D73d4c384b46135E87f8C592A8c86dA'

//const deadline

// set up the contract interface using abi and address
// const getDeadline = function() {
// 	web3.eth.getBlock('latest', (error, block) => {
// 		// transaction expires in 300 seconds (5 minutes)
// 		deadline = block.timestamp + 300;
// 		return deadline;
// 	});
// };


//const factoryContract = new web3.eth.Contract(factoryABI, ropsten)

// Exchange contracts
//const exchangeAddress = factoryContract.methods.getExchange(tokenAddress)
//const exchangeContract = new web3.eth.Contract(exchangeABI, exchangeAddress)

// Token Contracts
//const tokenAddress = factoryContract.methods.getToken(exchangeAddress)
//const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress)

// Amount Bought (sell order)
// Sell ETH for ERC20
// const sellInputAmount = userInputEthValue
// const sellInputReserve = web3.eth.getBalance(exchangeAddress)
// const sellOutputReserve = tokenContract.methods.balanceOf(exchangeAddress).call()

// Sell ERC20 for ETH
// const inputAmount = userInputTokenValue
// const inputReserve = tokenContract.methods.balanceOf(exchangeAddress).call()
// const outputReserve = web3.eth.getBalance(exchangeAddress)

// Output amount bought
// const numerator = inputAmount * outputReserve * 997
// const denominator = inputReserve * 1000 + inputAmount * 997
// const outputAmount = numerator / denominator

// Amount Sold (buy orders)
// Buy ERC20 with ETH
// const buyOutputAmount = userInputTokenValue
// const buyInputReserve = web3.eth.getBalance(exchangeAddress)
// const buyOutputReserve = tokenContract.methods.balanceOf(exchangeAddress).call()

// Buy ETH with ERC20
// const outputAmount = userInputEthValue
// const inputReserve = tokenContract.methods.balanceOf(exchangeAddress).call()
// const outputReserve = web3.eth.getBalance(exchangeAddress)

// Cost
// const numerator = buyOutputAmount * buyInputReserve * 1000
// const denominator = (outputReserve - outputAmount) * 997
// const inputAmount = numerator / denominator + 1

// Liquidity Provider Fee
//fee = inputAmount * 0.003

// Exchange Rate
//const rate = outputAmount / inputAmount

// The createExchange function is used to deploy exchange contracts for ERC20 tokens that do not yet have one
//factory.methods.createExchange(tokenAddress).send()
// Once an exchange is created the address can be retrieved with getExchange
// ETH balance of the exchange smart contract.
//const ethReserve = web3.eth.getBalance(exchangeAddress)
// balance of the exchange smart contract
//const tokenReserve = tokenContract.methods.balanceOf(exchangeAddress)
// Anyone who wants can join a Uniswap liquidity pool by calling the addLiquidity function
//exchange.methods.addLiquidity(min_liquidity, max_tokens, deadline)
//	.send({ value: ethAmount })
//exchange.methods.removeLiquidity(amount, min_eth, min_tokens, deadline).send()



function UniswapPage({ location }) {
	const pageTitle = location ? location.pathname.replace(/\//g, '') : '';

	return (
		<Layout location={location} title={pageTitle}>
			<iframe
				src="https://uniswap.exchange/swap?outputCurrency=0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359"
				height="660px"
				width="100%"				
				id="myId"
			/>
		</Layout>
	)
}


UniswapPage.propTypes = {
	location: PropTypes.object,
}


export default UniswapPage


// Abi's for Uniswap
// ToDo: move out of here later
const factoryABI = [
	{
	  name: 'NewExchange',
	  inputs: [
		{ type: 'address', name: 'token', indexed: true },
		{ type: 'address', name: 'exchange', indexed: true }
	  ],
	  anonymous: false,
	  type: 'event'
	},
	{
	  name: 'initializeFactory',
	  outputs: [],
	  inputs: [{ type: 'address', name: 'template' }],
	  constant: false,
	  payable: false,
	  type: 'function',
	  gas: 35725
	},
	{
	  name: 'createExchange',
	  outputs: [{ type: 'address', name: 'out' }],
	  inputs: [{ type: 'address', name: 'token' }],
	  constant: false,
	  payable: false,
	  type: 'function',
	  gas: 187911
	},
	{
	  name: 'getExchange',
	  outputs: [{ type: 'address', name: 'out' }],
	  inputs: [{ type: 'address', name: 'token' }],
	  constant: true,
	  payable: false,
	  type: 'function',
	  gas: 715
	},
	{
	  name: 'getToken',
	  outputs: [{ type: 'address', name: 'out' }],
	  inputs: [{ type: 'address', name: 'exchange' }],
	  constant: true,
	  payable: false,
	  type: 'function',
	  gas: 745
	},
	{
	  name: 'getTokenWithId',
	  outputs: [{ type: 'address', name: 'out' }],
	  inputs: [{ type: 'uint256', name: 'token_id' }],
	  constant: true,
	  payable: false,
	  type: 'function',
	  gas: 736
	},
	{
	  name: 'exchangeTemplate',
	  outputs: [{ type: 'address', name: 'out' }],
	  inputs: [],
	  constant: true,
	  payable: false,
	  type: 'function',
	  gas: 633
	},
	{
	  name: 'tokenCount',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [],
	  constant: true,
	  payable: false,
	  type: 'function',
	  gas: 663
	}
]

const exchangeABI = [
	{
	  name: 'TokenPurchase',
	  inputs: [
		{ type: 'address', name: 'buyer', indexed: true },
		{ type: 'uint256', name: 'eth_sold', indexed: true },
		{ type: 'uint256', name: 'tokens_bought', indexed: true }
	  ],
	  anonymous: false,
	  type: 'event'
	},
	{
	  name: 'EthPurchase',
	  inputs: [
		{ type: 'address', name: 'buyer', indexed: true },
		{ type: 'uint256', name: 'tokens_sold', indexed: true },
		{ type: 'uint256', name: 'eth_bought', indexed: true }
	  ],
	  anonymous: false,
	  type: 'event'
	},
	{
	  name: 'AddLiquidity',
	  inputs: [
		{ type: 'address', name: 'provider', indexed: true },
		{ type: 'uint256', name: 'eth_amount', indexed: true },
		{ type: 'uint256', name: 'token_amount', indexed: true }
	  ],
	  anonymous: false,
	  type: 'event'
	},
	{
	  name: 'RemoveLiquidity',
	  inputs: [
		{ type: 'address', name: 'provider', indexed: true },
		{ type: 'uint256', name: 'eth_amount', indexed: true },
		{ type: 'uint256', name: 'token_amount', indexed: true }
	  ],
	  anonymous: false,
	  type: 'event'
	},
	{
	  name: 'Transfer',
	  inputs: [
		{ type: 'address', name: '_from', indexed: true },
		{ type: 'address', name: '_to', indexed: true },
		{ type: 'uint256', name: '_value', indexed: false }
	  ],
	  anonymous: false,
	  type: 'event'
	},
	{
	  name: 'Approval',
	  inputs: [
		{ type: 'address', name: '_owner', indexed: true },
		{ type: 'address', name: '_spender', indexed: true },
		{ type: 'uint256', name: '_value', indexed: false }
	  ],
	  anonymous: false,
	  type: 'event'
	},
	{
	  name: 'setup',
	  outputs: [],
	  inputs: [{ type: 'address', name: 'token_addr' }],
	  constant: false,
	  payable: false,
	  type: 'function',
	  gas: 175875
	},
	{
	  name: 'addLiquidity',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [
		{ type: 'uint256', name: 'min_liquidity' },
		{ type: 'uint256', name: 'max_tokens' },
		{ type: 'uint256', name: 'deadline' }
	  ],
	  constant: false,
	  payable: true,
	  type: 'function',
	  gas: 82605
	},
	{
	  name: 'removeLiquidity',
	  outputs: [
		{ type: 'uint256', name: 'out' },
		{ type: 'uint256', name: 'out' }
	  ],
	  inputs: [
		{ type: 'uint256', name: 'amount' },
		{ type: 'uint256', name: 'min_eth' },
		{ type: 'uint256', name: 'min_tokens' },
		{ type: 'uint256', name: 'deadline' }
	  ],
	  constant: false,
	  payable: false,
	  type: 'function',
	  gas: 116814
	},
	{ name: '__default__', outputs: [], inputs: [], constant: false, payable: true, type: 'function' },
	{
	  name: 'ethToTokenSwapInput',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [
		{ type: 'uint256', name: 'min_tokens' },
		{ type: 'uint256', name: 'deadline' }
	  ],
	  constant: false,
	  payable: true,
	  type: 'function',
	  gas: 12757
	},
	{
	  name: 'ethToTokenTransferInput',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [
		{ type: 'uint256', name: 'min_tokens' },
		{ type: 'uint256', name: 'deadline' },
		{ type: 'address', name: 'recipient' }
	  ],
	  constant: false,
	  payable: true,
	  type: 'function',
	  gas: 12965
	},
	{
	  name: 'ethToTokenSwapOutput',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [
		{ type: 'uint256', name: 'tokens_bought' },
		{ type: 'uint256', name: 'deadline' }
	  ],
	  constant: false,
	  payable: true,
	  type: 'function',
	  gas: 50455
	},
	{
	  name: 'ethToTokenTransferOutput',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [
		{ type: 'uint256', name: 'tokens_bought' },
		{ type: 'uint256', name: 'deadline' },
		{ type: 'address', name: 'recipient' }
	  ],
	  constant: false,
	  payable: true,
	  type: 'function',
	  gas: 50663
	},
	{
	  name: 'tokenToEthSwapInput',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [
		{ type: 'uint256', name: 'tokens_sold' },
		{ type: 'uint256', name: 'min_eth' },
		{ type: 'uint256', name: 'deadline' }
	  ],
	  constant: false,
	  payable: false,
	  type: 'function',
	  gas: 47503
	},
	{
	  name: 'tokenToEthTransferInput',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [
		{ type: 'uint256', name: 'tokens_sold' },
		{ type: 'uint256', name: 'min_eth' },
		{ type: 'uint256', name: 'deadline' },
		{ type: 'address', name: 'recipient' }
	  ],
	  constant: false,
	  payable: false,
	  type: 'function',
	  gas: 47712
	},
	{
	  name: 'tokenToEthSwapOutput',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [
		{ type: 'uint256', name: 'eth_bought' },
		{ type: 'uint256', name: 'max_tokens' },
		{ type: 'uint256', name: 'deadline' }
	  ],
	  constant: false,
	  payable: false,
	  type: 'function',
	  gas: 50175
	},
	{
	  name: 'tokenToEthTransferOutput',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [
		{ type: 'uint256', name: 'eth_bought' },
		{ type: 'uint256', name: 'max_tokens' },
		{ type: 'uint256', name: 'deadline' },
		{ type: 'address', name: 'recipient' }
	  ],
	  constant: false,
	  payable: false,
	  type: 'function',
	  gas: 50384
	},
	{
	  name: 'tokenToTokenSwapInput',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [
		{ type: 'uint256', name: 'tokens_sold' },
		{ type: 'uint256', name: 'min_tokens_bought' },
		{ type: 'uint256', name: 'min_eth_bought' },
		{ type: 'uint256', name: 'deadline' },
		{ type: 'address', name: 'token_addr' }
	  ],
	  constant: false,
	  payable: false,
	  type: 'function',
	  gas: 51007
	},
	{
	  name: 'tokenToTokenTransferInput',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [
		{ type: 'uint256', name: 'tokens_sold' },
		{ type: 'uint256', name: 'min_tokens_bought' },
		{ type: 'uint256', name: 'min_eth_bought' },
		{ type: 'uint256', name: 'deadline' },
		{ type: 'address', name: 'recipient' },
		{ type: 'address', name: 'token_addr' }
	  ],
	  constant: false,
	  payable: false,
	  type: 'function',
	  gas: 51098
	},
	{
	  name: 'tokenToTokenSwapOutput',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [
		{ type: 'uint256', name: 'tokens_bought' },
		{ type: 'uint256', name: 'max_tokens_sold' },
		{ type: 'uint256', name: 'max_eth_sold' },
		{ type: 'uint256', name: 'deadline' },
		{ type: 'address', name: 'token_addr' }
	  ],
	  constant: false,
	  payable: false,
	  type: 'function',
	  gas: 54928
	},
	{
	  name: 'tokenToTokenTransferOutput',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [
		{ type: 'uint256', name: 'tokens_bought' },
		{ type: 'uint256', name: 'max_tokens_sold' },
		{ type: 'uint256', name: 'max_eth_sold' },
		{ type: 'uint256', name: 'deadline' },
		{ type: 'address', name: 'recipient' },
		{ type: 'address', name: 'token_addr' }
	  ],
	  constant: false,
	  payable: false,
	  type: 'function',
	  gas: 55019
	},
	{
	  name: 'tokenToExchangeSwapInput',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [
		{ type: 'uint256', name: 'tokens_sold' },
		{ type: 'uint256', name: 'min_tokens_bought' },
		{ type: 'uint256', name: 'min_eth_bought' },
		{ type: 'uint256', name: 'deadline' },
		{ type: 'address', name: 'exchange_addr' }
	  ],
	  constant: false,
	  payable: false,
	  type: 'function',
	  gas: 49342
	},
	{
	  name: 'tokenToExchangeTransferInput',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [
		{ type: 'uint256', name: 'tokens_sold' },
		{ type: 'uint256', name: 'min_tokens_bought' },
		{ type: 'uint256', name: 'min_eth_bought' },
		{ type: 'uint256', name: 'deadline' },
		{ type: 'address', name: 'recipient' },
		{ type: 'address', name: 'exchange_addr' }
	  ],
	  constant: false,
	  payable: false,
	  type: 'function',
	  gas: 49532
	},
	{
	  name: 'tokenToExchangeSwapOutput',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [
		{ type: 'uint256', name: 'tokens_bought' },
		{ type: 'uint256', name: 'max_tokens_sold' },
		{ type: 'uint256', name: 'max_eth_sold' },
		{ type: 'uint256', name: 'deadline' },
		{ type: 'address', name: 'exchange_addr' }
	  ],
	  constant: false,
	  payable: false,
	  type: 'function',
	  gas: 53233
	},
	{
	  name: 'tokenToExchangeTransferOutput',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [
		{ type: 'uint256', name: 'tokens_bought' },
		{ type: 'uint256', name: 'max_tokens_sold' },
		{ type: 'uint256', name: 'max_eth_sold' },
		{ type: 'uint256', name: 'deadline' },
		{ type: 'address', name: 'recipient' },
		{ type: 'address', name: 'exchange_addr' }
	  ],
	  constant: false,
	  payable: false,
	  type: 'function',
	  gas: 53423
	},
	{
	  name: 'getEthToTokenInputPrice',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [{ type: 'uint256', name: 'eth_sold' }],
	  constant: true,
	  payable: false,
	  type: 'function',
	  gas: 5542
	},
	{
	  name: 'getEthToTokenOutputPrice',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [{ type: 'uint256', name: 'tokens_bought' }],
	  constant: true,
	  payable: false,
	  type: 'function',
	  gas: 6872
	},
	{
	  name: 'getTokenToEthInputPrice',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [{ type: 'uint256', name: 'tokens_sold' }],
	  constant: true,
	  payable: false,
	  type: 'function',
	  gas: 5637
	},
	{
	  name: 'getTokenToEthOutputPrice',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [{ type: 'uint256', name: 'eth_bought' }],
	  constant: true,
	  payable: false,
	  type: 'function',
	  gas: 6897
	},
	{
	  name: 'tokenAddress',
	  outputs: [{ type: 'address', name: 'out' }],
	  inputs: [],
	  constant: true,
	  payable: false,
	  type: 'function',
	  gas: 1413
	},
	{
	  name: 'factoryAddress',
	  outputs: [{ type: 'address', name: 'out' }],
	  inputs: [],
	  constant: true,
	  payable: false,
	  type: 'function',
	  gas: 1443
	},
	{
	  name: 'balanceOf',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [{ type: 'address', name: '_owner' }],
	  constant: true,
	  payable: false,
	  type: 'function',
	  gas: 1645
	},
	{
	  name: 'transfer',
	  outputs: [{ type: 'bool', name: 'out' }],
	  inputs: [
		{ type: 'address', name: '_to' },
		{ type: 'uint256', name: '_value' }
	  ],
	  constant: false,
	  payable: false,
	  type: 'function',
	  gas: 75034
	},
	{
	  name: 'transferFrom',
	  outputs: [{ type: 'bool', name: 'out' }],
	  inputs: [
		{ type: 'address', name: '_from' },
		{ type: 'address', name: '_to' },
		{ type: 'uint256', name: '_value' }
	  ],
	  constant: false,
	  payable: false,
	  type: 'function',
	  gas: 110907
	},
	{
	  name: 'approve',
	  outputs: [{ type: 'bool', name: 'out' }],
	  inputs: [
		{ type: 'address', name: '_spender' },
		{ type: 'uint256', name: '_value' }
	  ],
	  constant: false,
	  payable: false,
	  type: 'function',
	  gas: 38769
	},
	{
	  name: 'allowance',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [
		{ type: 'address', name: '_owner' },
		{ type: 'address', name: '_spender' }
	  ],
	  constant: true,
	  payable: false,
	  type: 'function',
	  gas: 1925
	},
	{
	  name: 'name',
	  outputs: [{ type: 'bytes32', name: 'out' }],
	  inputs: [],
	  constant: true,
	  payable: false,
	  type: 'function',
	  gas: 1623
	},
	{
	  name: 'symbol',
	  outputs: [{ type: 'bytes32', name: 'out' }],
	  inputs: [],
	  constant: true,
	  payable: false,
	  type: 'function',
	  gas: 1653
	},
	{
	  name: 'decimals',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [],
	  constant: true,
	  payable: false,
	  type: 'function',
	  gas: 1683
	},
	{
	  name: 'totalSupply',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [],
	  constant: true,
	  payable: false,
	  type: 'function',
	  gas: 1713
	}
]

const tokenABI = [
	{
	  name: 'Transfer',
	  inputs: [
		{ type: 'address', name: '_from', indexed: true },
		{ type: 'address', name: '_to', indexed: true },
		{ type: 'uint256', name: '_value', indexed: false }
	  ],
	  anonymous: false,
	  type: 'event'
	},
	{
	  name: 'Approval',
	  inputs: [
		{ type: 'address', name: '_owner', indexed: true },
		{ type: 'address', name: '_spender', indexed: true },
		{ type: 'uint256', name: '_value', indexed: false }
	  ],
	  anonymous: false,
	  type: 'event'
	},
	{
	  name: '__init__',
	  outputs: [],
	  inputs: [
		{ type: 'bytes32', name: '_name' },
		{ type: 'bytes32', name: '_symbol' },
		{ type: 'uint256', name: '_decimals' },
		{ type: 'uint256', name: '_supply' }
	  ],
	  constant: false,
	  payable: false,
	  type: 'constructor'
	},
	{ name: 'deposit', outputs: [], inputs: [], constant: false, payable: true, type: 'function', gas: 74279 },
	{
	  name: 'withdraw',
	  outputs: [{ type: 'bool', name: 'out' }],
	  inputs: [{ type: 'uint256', name: '_value' }],
	  constant: false,
	  payable: false,
	  type: 'function',
	  gas: 108706
	},
	{
	  name: 'totalSupply',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [],
	  constant: true,
	  payable: false,
	  type: 'function',
	  gas: 543
	},
	{
	  name: 'balanceOf',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [{ type: 'address', name: '_owner' }],
	  constant: true,
	  payable: false,
	  type: 'function',
	  gas: 745
	},
	{
	  name: 'transfer',
	  outputs: [{ type: 'bool', name: 'out' }],
	  inputs: [
		{ type: 'address', name: '_to' },
		{ type: 'uint256', name: '_value' }
	  ],
	  constant: false,
	  payable: false,
	  type: 'function',
	  gas: 74698
	},
	{
	  name: 'transferFrom',
	  outputs: [{ type: 'bool', name: 'out' }],
	  inputs: [
		{ type: 'address', name: '_from' },
		{ type: 'address', name: '_to' },
		{ type: 'uint256', name: '_value' }
	  ],
	  constant: false,
	  payable: false,
	  type: 'function',
	  gas: 110600
	},
	{
	  name: 'approve',
	  outputs: [{ type: 'bool', name: 'out' }],
	  inputs: [
		{ type: 'address', name: '_spender' },
		{ type: 'uint256', name: '_value' }
	  ],
	  constant: false,
	  payable: false,
	  type: 'function',
	  gas: 37888
	},
	{
	  name: 'allowance',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [
		{ type: 'address', name: '_owner' },
		{ type: 'address', name: '_spender' }
	  ],
	  constant: true,
	  payable: false,
	  type: 'function',
	  gas: 1025
	},
	{
	  name: 'name',
	  outputs: [{ type: 'bytes32', name: 'out' }],
	  inputs: [],
	  constant: true,
	  payable: false,
	  type: 'function',
	  gas: 723
	},
	{
	  name: 'symbol',
	  outputs: [{ type: 'bytes32', name: 'out' }],
	  inputs: [],
	  constant: true,
	  payable: false,
	  type: 'function',
	  gas: 753
	},
	{
	  name: 'decimals',
	  outputs: [{ type: 'uint256', name: 'out' }],
	  inputs: [],
	  constant: true,
	  payable: false,
	  type: 'function',
	  gas: 783
	}
]