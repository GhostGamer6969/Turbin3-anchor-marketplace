import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorMarketplace } from "../target/types/anchor_marketplace";
import { PublicKey } from "@solana/web3.js"
describe("anchor-marketplace", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.anchorMarketplace as Program<AnchorMarketplace>;
  const name = Math.random().toString()
  const [marketplacePDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("marketplace"),
      Buffer.from(name)
    ],
    program.programId
  )
  const [treasuryPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("treasury"),
      marketplacePDA.toBuffer()
    ],
    program.programId
  )

  const [rewardsPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("rewards"),
      marketplacePDA.toBuffer()
    ],
    program.programId
  )

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize(name, 200)
      .accountsPartial({
        marketplace: marketplacePDA,
        treasury: treasuryPDA,
        rewardsMint: rewardsPDA,
      })
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Is listed!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize(name, 200)
      .accountsPartial({
        marketplace: marketplacePDA,
        treasury: treasuryPDA,
        rewardsMint: rewardsPDA,
      })
      .rpc();
    console.log("Your transaction signature", tx);
  });


});
