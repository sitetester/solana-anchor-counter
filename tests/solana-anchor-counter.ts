import * as anchor from "@coral-xyz/anchor";
import {expect} from "chai";
import {Program} from "@coral-xyz/anchor";
import {AnchorCounter} from "../target/types/anchor_counter";
import {IncrementAccounts, InitializeAccounts} from "./types";
import {getProgramLogs, matchLog} from "./utils";

describe("solana-anchor-counter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.anchor_counter as Program<AnchorCounter>;
  const counterKeypair = anchor.web3.Keypair.generate();
  const provider = anchor.getProvider();

  it("Is initialized!", async () => {
    const accounts: InitializeAccounts = {
      counter: counterKeypair.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    };
    const ix = await program.methods
        .initialize()
        .accounts(accounts)
        .instruction();

    // Create and send the transaction
    const tx = new anchor.web3.Transaction().add(ix);
    const signature = await provider.sendAndConfirm(tx, [counterKeypair]);
    console.log("Tx signature: ", signature);

    const logs = await getProgramLogs(signature, provider);
    console.log("Tx logs: ", logs);

    const msg = "Counter initialized to 0";
    await matchLog(logs, msg);

    // Fetch the counter account
    const counterAccount = await program.account.counter.fetch(counterKeypair.publicKey);
    expect(counterAccount.count.toNumber()).to.equal(0);
  });

  it("Can increment the counter", async () => {
    // Helper function to increment and verify
    async function incrementAndVerify(expectedCount: number) {
      const accounts: IncrementAccounts = {
        counter: counterKeypair.publicKey,
      };

      const ix = await program.methods
          .increment()
          .accounts(accounts)
          .instruction();

      // Create and send the transaction
      const tx = new anchor.web3.Transaction().add(ix);
      const signature = await provider.sendAndConfirm(tx, []);
      console.log(`Tx signature (count=${expectedCount})`, signature);

      // Fetch the counter account and verify it was incremented
      const counterAccount = await program.account.counter.fetch(counterKeypair.publicKey);
      expect(counterAccount.count.toNumber()).to.equal(expectedCount);

      const logs = await getProgramLogs(signature, provider);
      console.log("Tx logs: ", logs);

      const msg = `Counter incremented to ${expectedCount}`;
      await matchLog(logs, msg);
    }

    await incrementAndVerify(1);
    await incrementAndVerify(2);
  });
});