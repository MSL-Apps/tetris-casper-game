# Tetris Casper Game

## Single Player Game built on Casper Blockchain
- each player must log into their casper account using Casper Signer
- the best results are saved on-chain
- each player can see the best scores of other players on the scoreboard updated periodically
- the game project can be run in Testnet or Mainnet
- Live Demo App is not available as Casper Signer must be whitelisted beforehand otherwise it runs on localhost with CORS restrictions

## Video demo
[View on YouTube](https://youtu.be/-KFVOv0dXww)

## Game description
1. Before starting a new game, the user must log into their user account using Casper Signer installed in a web browser
<img src="https://github.com/MSL-Apps/tetris-casper-game/blob/564f030bae6e25d257c3c53a6af713ee719f7547/img/01.png" width="500"/>

2. After logging in, the user's public key, account status and the best result are downloaded. Now you can start a new game
<img src="https://github.com/MSL-Apps/tetris-casper-game/blob/564f030bae6e25d257c3c53a6af713ee719f7547/img/02.png" width="500"/>

3. After the game is over, the system compares the current score with the score on the blockchain. In case the result is better, it is saved in the blockchain
<img src="https://github.com/MSL-Apps/tetris-casper-game/blob/564f030bae6e25d257c3c53a6af713ee719f7547/img/03.png" width="500"/>

4. After signing the transaction, the data is saved in the blockchain
<img src="https://github.com/MSL-Apps/tetris-casper-game/blob/564f030bae6e25d257c3c53a6af713ee719f7547/img/04.png" width="500"/>

5. If the data is successfully saved, the result table will be automatically updated
<img src="https://github.com/MSL-Apps/tetris-casper-game/blob/564f030bae6e25d257c3c53a6af713ee719f7547/img/05.png" width="500"/>

6. If the achieved result is worse than the one saved on the blockchain, the data is not updated on the blockchain
<img src="https://github.com/MSL-Apps/tetris-casper-game/blob/564f030bae6e25d257c3c53a6af713ee719f7547/img/06.png" width="500"/>