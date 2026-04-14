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
      seedphrase: { title: "The Seed Phrase", subtitle: "Your ultimate backup key" },
      transactions: { title: "Transactions", subtitle: "Send and receive SOL" },
    },
  },
  badges: {
    decentralisation: "Network Architect",
    blockchain: "Block Forger",
    wallet: "Key Guardian",
    seedphrase: "Seed Protector",
    transactions: "Transaction Master",
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
    phase2Connections: "Secured nodes:",
    phase2MinConnections: "Each node needs at least 2 connections to be secured",
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
  login: {
    title: "Sign In",
    subtitle: "Sign in to save your progress and earn badges.",
    loginButton: "Sign in",
    orContinue: "or continue without an account",
    backHome: "Back to home",
  },
  dashboard: {
    title: "Dashboard",
    subtitle: "Track your progress in the Solana adventure",
    welcomeBack: "Welcome back",
    walletLabel: "Solana Wallet",
    emailLabel: "Email",
    progressTitle: "Your progress",
    noProgress: "You haven't completed any modules yet. Start the adventure!",
    moduleCompleted: "Completed",
    totalXp: "Total XP",
    badgesEarned: "Badges earned",
    continueLearn: "Continue learning",
    logout: "Sign out",
    chaptersTitle: "Your chapters",
    chapterProgress: "progress",
    chapterModules: "modules",
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
  seedphrase: {
    headerTitle: "The Seed Phrase",
    headerSubtitle: "Your ultimate backup key",
    backToBasics: "Back to Basics",
    storyIntro: "You've created your wallet and understood the key system. But what happens if you lose your device? If your computer crashes? There is one ultimate safety net...",
    storyAnalogy: "Think of your seed phrase as the master key to your entire crypto kingdom. With these 12 or 24 words, you can rebuild all your wallets, wherever you are.",
    defSeedTitle: "📖 Definition — Seed Phrase (Recovery Phrase)",
    defSeedText: "A seed phrase (or mnemonic phrase) is a sequence of 12 or 24 randomly generated words following the BIP39 standard. These words, in the correct order, can regenerate all your wallet's private keys. It's your ultimate backup.",
    keyConceptsTitle: "🔑 Key Concepts",
    keyConceptsText: "The seed phrase is generated from a list of 2,048 English words (BIP39 standard). The order of words is crucial: changing a single word or swapping two words creates a completely different wallet. From the seed phrase, all your private keys are mathematically derived.",
    didYouKnowTitle: "💡 Did you know?",
    didYouKnowText: "The probability of guessing a 12-word seed phrase is 1 in 2^128, or roughly 340,000,000,000,000,000,000,000,000,000,000,000,000 possible combinations. That's more than the number of atoms in the solar system!",
    storySummary: "Your seed phrase is the ultimate secret. Whoever has it controls all your wallets. Protect it like a treasure.",
    storyNextButton: "Next: Test your knowledge",
    phase2Title: "The Seed Phrase Challenge",
    phase2Subtitle: "Prove you can secure a seed phrase",
    phase2Narrative: "A wallet has just been created. Here is its 12-word seed phrase. Memorize the order, then place them back correctly.",
    phase2Memorize: "Memorize these 12 words in order:",
    phase2Scrambled: "Place the words back in the correct order:",
    phase2Instruction: "Click the words in the correct order to reconstruct the seed phrase.",
    phase2Success: "Perfect! Seed phrase successfully reconstructed!",
    phase2Retry: "The order is not correct. Try again!",
    phase2FinishButton: "Finish and Earn the Badge",
    revealTitle: "Congratulations!",
    revealSubtitle: "You've mastered seed phrase protection",
    revealNarrative1: "You now know what a seed phrase is and why it's so important. In the Solana ecosystem, every Phantom wallet generates a seed phrase upon creation.",
    revealNarrative2: "The golden rule: never share it, never store it digitally. Write it down on paper and keep it in a safe place.",
    didYouKnowRevealTitle: "💡 Did you know?",
    didYouKnowRevealText: "Billions of dollars in crypto have been lost forever because owners lost their seed phrase. In 2013, a man threw away a hard drive containing 7,500 bitcoins — he's still searching the landfill to this day.",
    keyPointsTitle: "🔑 Key Concepts",
    keyPoints: [
      "A seed phrase is a sequence of 12 or 24 words that can restore all your wallets",
      "NEVER share it, photograph it, or store it online",
      "Write it on paper and keep it in a safe place (safe, vault)",
      "The word order is crucial — one swapped word = a completely different wallet",
    ],
    allCompletedTitle: "Basics Master",
    allCompletedText: "You have completed all four fundamental modules! You are ready for the next chapter of the Solana adventure.",
  },
  transactions: {
    headerTitle: "Transactions",
    headerSubtitle: "Send and receive SOL on Solana",
    backToBasics: "Back to Basics",
    // Phase 1 - Story
    storyIntro:
      "You have a wallet and a secured seed phrase. Now it's time to bring your wallet to life by making your first transaction. This is where everything becomes real.",
    storyAnalogy:
      "A transaction is like sending a registered letter: you write the recipient, the amount, and sign it with your private key... but unlike the postal service, it's instant and verifiable by everyone on the blockchain.",
    defTransactionTitle: "📖 Definition — Transaction",
    defTransactionText:
      "A transaction on Solana is an instruction signed with your private key that transfers SOL from one address to another. It is verified by the network's validators and permanently recorded on the blockchain. Once confirmed, it is irreversible.",
    keyConceptsTitle: "🔑 Key Concepts",
    keyConceptsText:
      "Every transaction on Solana involves minimal fees (~0.000005 SOL, roughly $0.001). Confirmation takes about 400 milliseconds. Once finalized, the transaction is etched forever into the blockchain. Each transaction has a unique signature (hash) that allows it to be tracked and verified.",
    didYouKnowTitle: "💡 Did you know?",
    didYouKnowText:
      "Solana processes around 4,000 transactions per second in practice, with average fees of $0.00025 per transaction. It is one of the cheapest blockchains in the world, making micro-transactions finally viable.",
    storySummary:
      "A transaction = an instruction signed by your private key, verified by validators, and recorded forever on the blockchain.",
    storyNextButton: "Next: Simulate your first transaction",
    // Phase 2 - Mini-game
    phase2Title: "Your First Transaction",
    phase2Subtitle: "Simulate sending SOL",
    phase2Narrative:
      "You have 10 SOL in your wallet. Send some SOL to a friend to test the network.",
    phase2FromLabel: "From (your wallet)",
    phase2ToLabel: "To (recipient)",
    phase2AmountLabel: "Amount (SOL)",
    phase2AmountPlaceholder: "e.g. 2.5",
    phase2FeesLabel: "Network fees",
    phase2SignButton: "Sign and Send",
    phase2Signing: "Signing in progress...",
    phase2Confirmed: "Transaction Confirmed!",
    phase2ConfirmedText:
      "Your transaction has been validated by the validators and recorded on the Solana blockchain.",
    phase2TxHash: "Transaction signature",
    phase2FinishButton: "Finish and Earn the Badge",
    // Phase 3 - Reveal
    revealTitle: "Congratulations!",
    revealSubtitle: "You've mastered Solana transactions",
    revealNarrative1:
      "You now understand the full lifecycle of a transaction: from its creation to its confirmation by validators, including the signature with your private key. Every transaction is an irreversible act written into the history of the blockchain.",
    revealNarrative2:
      "The golden rule: always check the recipient's address and the amount before signing. A confirmed transaction can never be reversed.",
    didYouKnowRevealTitle: "💡 Did you know?",
    didYouKnowRevealText:
      "Solana uses a unique transaction parallelization engine called Sealevel. Unlike other blockchains that process transactions one by one, Sealevel can execute thousands of smart contracts simultaneously — like a multi-lane highway instead of a single-lane road.",
    keyPointsTitle: "🔑 Key Concepts",
    keyPoints: [
      "A transaction is a signed instruction that transfers SOL between two addresses",
      "Fees on Solana are among the lowest (~$0.00025 per transaction)",
      "Each transaction has a unique signature to trace it on the blockchain",
      "A confirmed transaction is irreversible — always verify before signing",
    ],
  },
};
