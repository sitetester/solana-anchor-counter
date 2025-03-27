
// Define account types for reuse
import * as anchor from "@coral-xyz/anchor";

export type InitializeAccounts = {
    counter: anchor.web3.PublicKey;
    user: anchor.web3.PublicKey;
    systemProgram: anchor.web3.PublicKey;
};

export type IncrementAccounts = {
    counter: anchor.web3.PublicKey;
};