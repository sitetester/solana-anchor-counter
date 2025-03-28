### Overview
It's a simple Counter program based on Anchor framework, but it demonstrates key concepts, like: 
- **Account Management**: Creating and managing program-owned accounts
- **State Management**: Storing and updating on-chain state
- **Instruction Processing**: Handling different program instructions
- **Testing**: Comprehensive (Typescript based) testing

### Setup 
Follow instructions at https://www.anchor-lang.com/docs/quickstart/local
- `anchor init solana-anchor-counter` (initial project created)

First, we need to fix `anchor build` error for `rustc 1.79.0-dev`
- Update `programs/solana-anchor-counter/Cargo.toml` like this 
```
[dependencies]
bytemuck = { version = "1.13.1", features = ["derive"] }
bytemuck_derive = "=1.8.0"
```
This should fix `bytemuck_derive` error: `rustc 1.79.0-dev is not supported by the following package:`
- Now run `anchor build`, it should pass

- `yarn install` (install relevant npm modules)

Next, simply run `./run_tests.sh` (it will start a FRESH validator with clean state (empty ledger directory), followed by 
- `anchor build` 
- `anchor deploy`
- & finally running all tests

```aiignore
% ./run_tests.sh
Stopping any running validators...
Removing ledger directory...
Starting fresh validator...
Validator started with clean state!
Config File: /Users/x/.config/solana/cli/config.yml
RPC URL: http://localhost:8899 
WebSocket URL: ws://localhost:8900/ (computed)
Keypair Path: /Users/x/.config/solana/id.json 
Commitment: confirmed 
Validator is running successfully!
Building program...
Waiting for fees to stabilize 1...
    Finished `release` profile [optimized] target(s) in 0.78s
    Finished `test` profile [unoptimized + debuginfo] target(s) in 0.69s
     Running unittests src/lib.rs (/Users/x/RustroverProjects/solana-anchor-counter/target/debug/deps/solana_anchor_counter-fd595aec878ad4b8)
Deploying program...
Deploying cluster: http://127.0.0.1:8899
Upgrade authority: /Users/x/.config/solana/id.json
Deploying program "solana_anchor_counter"...
Program path: /Users/x/RustroverProjects/solana-anchor-counter/target/deploy/solana_anchor_counter.so...
Program Id: 573qiogP4Ma9fPTeoPinhKssboNFMb6ThBbhNEquYxMm

Signature: 4PJw2Z6NvPcmipyna3F5GnnvMYDLK7ePEXPR7xLNexXKj4EGNo4Wjf1hg87XGtgohw38EyQMZZr5uwH94xmnpaa5

Deploy success
Running tests...
(node:50178) ExperimentalWarning: Type Stripping is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)


  solana-anchor-counter
Tx signature:  4uQBjorrwYv93MP1bjazQTozRDLLFbqPt2F645wG749dgbdka9JeEsRSXutzjrYYzsrN7rv99twBa8bBVU9Gse6j
Tx logs:  [
  'Program 573qiogP4Ma9fPTeoPinhKssboNFMb6ThBbhNEquYxMm invoke [1]',
  'Program log: Instruction: Initialize',
  'Program 11111111111111111111111111111111 invoke [2]',
  'Program 11111111111111111111111111111111 success',
  'Program log: Counter initialized to 0',
  'Program 573qiogP4Ma9fPTeoPinhKssboNFMb6ThBbhNEquYxMm consumed 5607 of 200000 compute units',
  'Program 573qiogP4Ma9fPTeoPinhKssboNFMb6ThBbhNEquYxMm success'
]
    ✔ Is initialized! (333ms)
Tx signature (count=1) 4TC2LPp2PvnQd7cQypturQ1X3o5AiCgHdSiYKJC1ccjQizSyYeJV48FKAZ5D6B16ZDYxU19daHtgHpADNyPNH3jd
Tx logs:  [
  'Program 573qiogP4Ma9fPTeoPinhKssboNFMb6ThBbhNEquYxMm invoke [1]',
  'Program log: Instruction: Increment',
  'Program log: Counter incremented to 1',
  'Program 573qiogP4Ma9fPTeoPinhKssboNFMb6ThBbhNEquYxMm consumed 1280 of 200000 compute units',
  'Program 573qiogP4Ma9fPTeoPinhKssboNFMb6ThBbhNEquYxMm success'
]
Tx signature (count=2) 5tqD5tqSAZygwgEnaReQNZb9n6HvP8trMdn6x9yo4KcvRs3z5JrcZaiAHt5YYjYz13HR1pgH1K35wAgc1acvam6X
Tx logs:  [
  'Program 573qiogP4Ma9fPTeoPinhKssboNFMb6ThBbhNEquYxMm invoke [1]',
  'Program log: Instruction: Increment',
  'Program log: Counter incremented to 2',
  'Program 573qiogP4Ma9fPTeoPinhKssboNFMb6ThBbhNEquYxMm consumed 1280 of 200000 compute units',
  'Program 573qiogP4Ma9fPTeoPinhKssboNFMb6ThBbhNEquYxMm success'
]
    ✔ Can increment the counter (922ms)


  2 passing (1s)

✅ All tests completed successfully!
```




