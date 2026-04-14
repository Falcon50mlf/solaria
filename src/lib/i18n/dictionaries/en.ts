import type { TranslationDictionary } from "../types";

export const en: TranslationDictionary = {
  common: {
    next: "Next",
    back: "Back",
    backToCourse: "Back to course",
    nextModule: "Next module",
    start: "Start",
    completed: "Completed",
    locked: "Locked",
    completePrevious: "Complete the previous step",
    reset: "Reset",
    continue: "Continue",
    finish: "Finish",
    alreadyCompleted: "Module already completed",
    step: "Step",
    xp: "XP",
    lvl: "LVL",
    modulesCompleted: "Modules completed",
    progression: "Progression",
    xpEarned: "XP earned",
    congratulations: "Congratulations!",
  },
  meta: {
    title: "SolQuest — Learn Solana",
    description:
      "Relive the creation of Solana through an interactive educational adventure. Master the fundamentals of blockchain, decentralization, and wallets.",
  },
  home: {
    title: "SolQuest",
    subtitle: "Relive the creation of Solana. Become the founder.",
    narratorLabel: "Act I — The Genesis",
    narratorText:
      "2017. You are a passionate engineer. You have a vision: to create the fastest blockchain in the world. But before revolutionizing the world, you must master the foundations...",
    statModules: "Modules",
    statXpToEarn: "to earn",
    statBadges: "Badges",
    startAdventure: "Start the adventure",
  },
  basics: {
    pageTitle: "The Basics",
    pageSubtitle: "The foundations of the Solana revolution",
    chapterTitle: "Chapter 1: The Basics",
    chapterText:
      "Before building Solana, you need to understand the pillars that underpin every blockchain. Each step brings you closer to Anatoly Yakovenko's vision.",
    modules: {
      decentralisation: {
        title: "Decentralization",
        subtitle: "Why distribute power?",
      },
      blockchain: {
        title: "The Blockchain",
        subtitle: "How to build a chain of trust?",
      },
      wallet: {
        title: "The Wallet",
        subtitle: "Your identity in the crypto world",
      },
    },
  },
  badges: {
    decentralisation: "Network Architect",
    blockchain: "Block Forger",
    wallet: "Key Guardian",
    master: "Basics Master",
  },
  decentralisation: {
    // Phase 1
    phase1Title: "The Problem",
    phase1Narrative:
      "\"We are in 2008. The global financial system is collapsing. Central banks control everything. A mysterious figure, Satoshi Nakamoto, asks a fundamental question: What if we could eliminate the middlemen?\"",
    defTitle: "Definition",
    defText:
      "Decentralization is the act of distributing power among multiple participants instead of concentrating it in a single point. Imagine a classroom: in a centralized system, a single teacher grades all the exams. If they get sick, nobody gets graded. In a decentralized system, the students grade each other. Even if one of them is absent, the others carry on.",
    didYouKnowTitle: "Did you know?",
    didYouKnowText:
      "Bitcoin was created in 2009 as the first decentralized currency. No bank, no government controls it. Today, thousands of computers around the world maintain the network.",
    singlePointTitle: "Single Point of Failure",
    singlePointText:
      "If the central node fails, the entire system collapses.",
    singlePointExample:
      "Imagine if YouTube ran on a single server: one outage and nobody can watch videos anymore.",
    censorshipTitle: "Censorship",
    censorshipText:
      "The central authority can block transactions or control who has access.",
    censorshipExample:
      "It's like your bank deciding to freeze your account without your consent.",
    trustTitle: "Trust Required",
    trustText:
      "You have to trust an entity you don't control.",
    trustExample:
      "When you use PayPal, you trust PayPal not to lose your money.",
    // Phase 2
    phase2Title: "Decentralize the network!",
    phase2Subtitle:
      "The network is centralized. Click on the nodes to create connections between them and eliminate the central point.",
    phase2Mission:
      "Your mission: transform this centralized network into a decentralized network. Connect the nodes to each other so that even if one node goes down, the network keeps running.",
    phase2KeyConceptsTitle: "Key Concepts",
    phase2KeyConceptsText:
      "In the Solana network, over 1,900 validators spread across the globe verify transactions. If one validator stops, the others continue without interruption.",
    phase2Connections: "Connections",
    phase2MinConnections: "minimum",
    phase2HowToPlay:
      "How to play: Click on a node to select it (it turns yellow), then click on another node to create a connection.",
    // Phase 3
    phase3Title: "The Revelation",
    phase3Narrative:
      "\"Well done! You've just understood the fundamental principle of decentralization. This is exactly the vision that inspired Anatoly Yakovenko when he started imagining Solana in 2017.\"",
    phase3PeerDefTitle: "Definition",
    phase3PeerDefText:
      "Peer-to-peer network: a network where every participant is both a client and a server. No boss, everyone is equal. It's like a WhatsApp group where everyone can send messages to everyone, without going through an administrator.",
    phase3DidYouKnowTitle: "Did you know?",
    phase3DidYouKnowText:
      "Solana can process up to 65,000 transactions per second thanks to its unique technology called Proof of History. That's faster than Visa!",
    phase3KeyPointsTitle: "Key Concepts",
    phase3KeyPoints: [
      "A centralized network depends on a single point \u2192 fragile",
      "A decentralized network distributes power \u2192 resilient",
      "Decentralization is the foundation of all blockchains, including Solana",
    ],
  },
  blockchain: {
    // Header
    headerTitle: "The Blockchain",
    headerSubtitle: "Learn the secrets of the revolutionary technology",
    // Phase 1
    phase1Narrative:
      "\"Now that you understand decentralization, a question arises: how can you trust others without an intermediary? The answer: a chain of blocks, where each link proves the integrity of the previous one.\"",
    defHashTitle: "Definition \u2014 Hash",
    defHashText:
      "A hash is like a digital fingerprint for data. No matter the size of the file (a text message or an entire movie), the hash will always be the same length. And if you change even a single letter, the hash changes completely. This is what makes the blockchain tamper-proof.",
    didYouKnowGenesisTitle: "Did you know?",
    didYouKnowGenesisText:
      "The first block of a blockchain is called the Genesis Block. Bitcoin's Genesis Block, created on January 3, 2009, contained a hidden message: the headline of an article from The Times newspaper about the banking crisis.",
    keyConceptsBlockTitle: "Key Concepts",
    keyConceptsBlockText:
      "Each block contains: data (the transactions), the hash of the previous block (the link to the block before), and its own hash (its unique fingerprint). It's like a chain where each link is welded to the previous one.",
    // Phase 2
    phase2Title: "Mini-Game \u2014 Forge the Chain",
    phase2Subtitle:
      "Build a blockchain of 4 blocks by entering transaction data",
    phase2Narrative:
      "\"You are now a miner. Your job: take the pending transactions, group them into a block, and compute the hash that will seal this block forever in the chain.\"",
    phase2KeyConceptsTitle: "Key Concepts",
    phase2KeyConceptsText:
      "On Solana, validators (the equivalent of miners) create a new block every 400 milliseconds. That's 25 times faster than Ethereum and 1,500 times faster than Bitcoin!",
    phase2BlockLabel: "Block",
    phase2InputLabel: "Transaction data",
    phase2InputPlaceholder: "e.g. Alice sends 5 SOL to Bob",
    phase2Mining: "Mining in progress...",
    phase2MineButton: "Mine the block",
    phase2ChainComplete: "Chain Complete!",
    phase2ChainCompleteText:
      "You have successfully forged your first blockchain!",
    phase2Revelation: "The Revelation",
    // Phase 3
    phase3Narrative:
      "\"You've just forged your first blockchain! Each block is linked to the previous one by its hash. Modifying a single block would break the entire chain. It is this immutability that makes the blockchain revolutionary. Anatoly Yakovenko saw this and wondered: how can we make this chain 1,000 times faster?\"",
    defImmutabilityTitle: "Definition \u2014 Immutability",
    defImmutabilityText:
      "Once a block is added to the chain, it is virtually impossible to modify it. To cheat, you would need to recalculate the hash of that block AND all subsequent blocks, faster than the entire network. This is mathematically nearly impossible.",
    phase3DidYouKnowTitle: "Did you know?",
    phase3DidYouKnowText:
      "Anatoly Yakovenko, the creator of Solana, invented Proof of History. Instead of validators agreeing on the time of each transaction (which takes time), Solana uses a clock built into the blockchain. The result: near-instant transactions.",
    phase3KeyPointsTitle: "Key Concepts",
    phase3KeyPoints: [
      "A hash is a unique digital fingerprint for each block",
      "Each block is linked to the previous one, forming a tamper-proof chain",
      "Solana uses Proof of History to be ultra-fast",
    ],
    backToBasics: "Back to Basics",
    nextWallet: "Next: Wallets",
  },
  wallet: {
    // Header
    headerTitle: "The Wallet",
    headerSubtitle: "Your digital identity on the blockchain",
    backToBasics: "Back to Basics",
    // Story phase
    storyIntro:
      "Now that you know what a blockchain is and how decentralization works, a crucial question remains: how do YOU prove your identity on this network?",
    storyKeySystem:
      "The answer lies in an ingenious system of cryptographic keys:",
    publicKeyTitle: "Public Key",
    publicKeyDesc:
      "Your public address on the network. You can share it with anyone to receive funds.",
    publicKeyProps: [
      "Visible to everyone",
      "Used to receive funds",
      "Derived from the private key",
    ],
    privateKeyTitle: "Private Key",
    privateKeyDesc:
      "Your digital signature. It proves that you own the wallet.",
    privateKeyProps: [
      "Must remain secret",
      "Used to sign transactions",
      "Impossible to guess",
    ],
    secretLabel: "SECRET",
    defWalletTitle: "Definition",
    defWalletText:
      "A wallet (or digital wallet) is not a physical wallet. It does not \"contain\" your cryptocurrencies. It is simply a pair of cryptographic keys that lets you interact with the blockchain. Your funds are actually stored on the blockchain itself.",
    didYouKnowWalletsTitle: "Did you know?",
    didYouKnowWalletsText:
      "There are currently over 20 million active wallets on Solana. Every second, thousands of transactions are signed by private keys around the world.",
    keyConceptsPhantomTitle: "Key Concepts",
    keyConceptsPhantomText:
      "Phantom, the most popular Solana wallet, makes all of this invisible. It securely stores your private key and lets you sign transactions with a single click. But behind the scenes, every click triggers a complex mathematical operation.",
    storySummary:
      "In summary: the public key is your mailbox (everyone can drop letters into it), and the private key is the key to open it (only you have it).",
    storyNextButton: "Create my wallet",
    // Entropy step
    entropyTitle: "Step 1: Entropy",
    entropySubtitle: "Generate randomness by moving your mouse",
    defEntropyTitle: "Definition",
    defEntropyText:
      "Entropy is a measure of randomness. The more random your seed is, the more secure your wallet will be. Your mouse movements create unique and unpredictable data.",
    entropyCollected: "Entropy collected",
    entropyReady: "Enough entropy collected! You can continue.",
    // Derivation step
    derivationTitle: "Step 2: Derivation",
    derivationSubtitle: "Your keys are being generated...",
    keyConceptsDerivationTitle: "Key Concepts",
    keyConceptsDerivationText:
      "From the entropy, a private key is derived using a mathematical algorithm. Then, the public key is computed from the private key. This process is one-way: you can go from private to public, but never the other way around.",
    entropyLabel: "Entropy",
    privateKeyLabel: "Private Key",
    publicKeyLabel: "Public Key",
    // Wallet display step
    walletStepTitle: "Step 3: Your Wallet",
    walletStepSubtitle: "Here is your freshly generated wallet",
    addressLabel: "Address",
    addressHint: "This is your public address on the Solana network",
    privateKeyWarningTitle: "Private Key \u2014 Never share!",
    privateKeyWarningText:
      "This key gives total access to your wallet. Never share it with anyone.",
    balanceLabel: "Balance",
    balanceReady: "Your wallet is ready to receive SOL!",
    finishButton: "Complete the module",
    // Reveal phase
    revealTitle: "The Revelation",
    revealSubtitle: "You now hold the keys to the blockchain",
    didYouKnowActiveTitle: "Did you know?",
    didYouKnowActiveText:
      "Over 20 million active wallets exist on Solana today. Every second, thousands of transactions are signed by private keys around the world.",
    revealNarrative1:
      "You have just created your first wallet. In the real world, this wallet would allow you to receive and send SOL, Solana's cryptocurrency. Anatoly Yakovenko designed Solana so that each of these transactions costs less than $0.01.",
    revealNarrative2:
      "With decentralization, blockchain, and wallets, you now have all the foundational knowledge to understand how Solana works. But this is only the beginning of the adventure...",
    keyPointsTitle: "Key Concepts",
    keyPoints: [
      "A wallet is a key pair: public (your address) and private (your power)",
      "The private key must NEVER be shared",
      "Entropy (randomness) is the foundation of your wallet's security",
      "Solana uses the Base58 address format for human-readable addresses",
    ],
    masterBadgeTitle: "Basics Master",
    masterBadgeText:
      "You have completed all the fundamental modules. You are ready for the next chapter!",
  },
};
