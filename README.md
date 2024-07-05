# Dumy Token Scheme

> This is a decentralized application for a dummy token scheme built with Next.js and Solidity Ethereum smart contracts. It allows users to deposit tokens, earn points, and claim rewards based on a time-sensitive scheme.

## Features

- Connect with MetaMask wallet to interact with the application
- View overview of global deposits, user's total deposits, and total points
- Deposit tokens into the scheme
- View a table of user deposits including:
  - Date
  - Deposit Amount
  - Points Gained
  - Time until unlock
- Withdraw deposits after the unlock period
- Claim rewards when the scheme ends

## Technologies Used

#### Frontend:
- Next.js 13 (with app directory)
- React 18
- TypeScript
- Tailwind CSS for styling

#### Backend:
- Solidity for smart contracts
- Ethers.js for interacting with Ethereum blockchain

#### Development Tools:
- Hardhat (for smart contract development and testing)

## Live Demo

[Live Demo Link]()

## Prerequisites

- Node.js (version 14 or later recommended)
- MetaMask browser extension
- Basic understanding of React, Next.js, and Ethereum blockchain

## Getting Started

1. Clone the repository:
`git clone [your-repo-link]
cd [your-repo-name]`

2. Install dependencies:
`npm install
or
yarn install`

3. Set up environment variables:
Create a `.env.local` file in the root directory and add:
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address

4. Run the development server:
`npm run dev
or
yarn dev`

5. Open http://localhost:3000 in your browser to see the application.

## Usage

1. Connect your MetaMask wallet to the application.
2. View the overview section for global and personal statistics.
3. Use the "Create Deposit" section to deposit tokens into the scheme.
4. View your deposits in the "Your Deposits" table.
5. Withdraw tokens after the unlock period.
6. Claim rewards when the scheme ends.

## Smart Contract

The application interacts with a Solidity smart contract for the dummy token scheme. Ensure that your smart contract is deployed on the Mantle Sepolia testnet and update the contract address in the `.env.local` file.

### Prerequisites

- Have a computer and internet connection
- Have a basic knowledge of TypeScript and React
- Have a basic knowledge of Solidity
- Have visual-studio code or any other code editor installed on your computer

### Setup

- Open your terminal in the folder where you want to have the project and run `git clone git@github.combruk19/dumy-token-scheme` to clone the project.
- Run `cd dumy-token-scheme` to move to the project directory.

### 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/bruk19/dumy-token-scheme/issues).

## Author

## Author
👤 **Bruk Teshome**

- GitHub: [@githubhandle](https://github.com/bruk19)
- Twitter: [@twitterhandle](https://twitter.com/Bruktesh)
- LinkedIn: [LinkedIn](https://linkedin.com/in/bruk-teshome)



## Show your support

Give a ⭐️ if you like this project!

### Acknowledgements
- The Ethereum community for providing tools and resources.
- Next.js and React communities for the fantastic frameworks.

## 📝 License

This project is [MIT](./LICENSE) licensed.

_NOTE: we recommend using the [MIT license](https://choosealicense.com/licenses/mit/) - you can set it up quickly by [using templates available on GitHub](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-license-to-a-repository). You can also use [any other license](https://choosealicense.com/licenses/) if you wish._