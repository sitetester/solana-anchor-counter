import * as anchor from "@coral-xyz/anchor";
import {expect} from "chai";

export async function getProgramLogs(signature: string, provider: anchor.Provider): Promise<string[]> {
    const latestBlockhash = await provider.connection.getLatestBlockhash();

    // Wait for transaction confirmation with the new API
    const confirmationStatus = await provider.connection.confirmTransaction({
        signature,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
    }, 'confirmed');

    if (confirmationStatus.value.err) {
        throw new Error(`Tx failed: ${confirmationStatus.value.err}`);
    }

    // Get transaction details with confirmed commitment
    const txDetails = await provider.connection.getTransaction(signature, {
        commitment: 'confirmed',
        maxSupportedTransactionVersion: 0
    });

    // Return logs or empty array if no logs
    return txDetails?.meta?.logMessages || [];
}

export async function matchLog(logs: string[], msg: string) {
    expect(logs.some(log => log.includes(msg))).to.be.true;
}