Today we're going to build a simple React / Web3 Dapp that replicates a small portion of the Uniswap v2 interface - specifically, we are building the "account login" button that allows users to connect to a Dapp using their MetaMask extension.

By the end of the tutorial you will have a working React app that will be able to connect to your MetaMask account, and read your address & ETH balance. If you connect with multiple accounts the interface will change to reflect the active account. 

A lot of tutorials skip this basic login strategy, or use outdated libraries (which you don't find out until you're halfway through!). To avoid confusion, as of July, 2021 this tutorial & the accompanying repo uses the following tech:

- react ^17.0.2
- typescript ^4.2.1
- ethers.js ^5.4.0
- @usedapp/core ^0.4.1
- @chakra-ui/react ^1.6.5

We will be replicating (fairly closely) the look, feel, and functionality of the following "Connect to a wallet" section of the [Uniswap v2 interface](https://app.uniswap.org/#/swap):

### Before we get started:

You'll need MetaMask installed to get this working. If you don't already have it, start by downloading & installing the MetaMask extension for Chrome, Firefox, Brave, or Edge: https://metamask.io/download.html (be careful to triple check the URL and ensure you are downloading from a trusted website). If you haven't set up MetaMask before, follow the instructions to set up an Ethereum account.

Once you have MetaMask installed, we are ready to start coding...
