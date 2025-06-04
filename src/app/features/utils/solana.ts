import {
  createAssociatedTokenAccount,
  createMint,
  getAccount,
} from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";

export async function createToken(
  connection: Connection,
  payer: Keypair
): Promise<PublicKey> {
  try {
    // Crear el token mint
    const mintKeypair = Keypair.generate();
    const mint = mintKeypair.publicKey;

    // Crear la cuenta del token
    await createAssociatedTokenAccount(
      connection,
      payer,
      mint,
      payer.publicKey
    );

    // Crear el token
    await createMint(
      connection,
      payer,
      payer.publicKey,
      payer.publicKey,
      9, // 9 decimales
      mintKeypair
    );

    return mint;
  } catch (error) {
    console.error("Error al crear el token:", error);
    throw error;
  }
}

export async function getTokenBalance(
  connection: Connection,
  mint: PublicKey,
  payer: Keypair,
  owner: PublicKey
): Promise<number> {
  try {
    const tokenAccount = await getAccount(
      connection,
      await createAssociatedTokenAccount(connection, payer, mint, owner)
    );

    return Number(tokenAccount.amount) / Math.pow(10, 9);
  } catch (error) {
    console.error("Error al obtener el balance:", error);
    throw error;
  }
}
