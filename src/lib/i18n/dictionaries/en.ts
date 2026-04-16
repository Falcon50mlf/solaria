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
    quizRetry: "Retry the quiz",
    quizMinScore: "You need at least 70% correct answers to earn the badge.",
    congratulations: "Congratulations!",
  },
  meta: {
    title: "Solaria — Learn Solana",
    description:
      "Relive the creation of Solana through an interactive educational adventure. Master the fundamentals of blockchain, decentralization, and wallets.",
  },
  home: {
    title: "Solaria",
    subtitle: "Relive the creation of Solana. Become the founder.",
    narratorLabel: "Act I — The Genesis",
    narratorText:
      "2017. You are a passionate engineer. You have a vision: to create the fastest blockchain in the world. But before revolutionizing the world, you must master the foundations...",
    statModules: "Modules",
    statXpToEarn: "to earn",
    statBadges: "Badges",
    startAdventure: "Start the adventure",
    chaptersTitle: "Chapters",
    chapterModules: "modules",
    exploreWithoutAccount: "Explore without an account",
    backToDashboard: "Back to dashboard",
    heroTitle1: "From zero to",
    heroTitle2: "Solana",
    cardBasicsTitle: "Basics",
    cardBasicsDesc: "Master the foundations of Web3: wallets, transactions, blockchain and the Solana ecosystem. The perfect starting point before going further.",
    cardInfraTitle: "Solana Infrastructure",
    cardInfraDesc: "Dive into Solana's core mechanics: Proof of History, TPS, validators and network architecture. Understand what makes Solana unique.",
    cardSecurityTitle: "Risks & Security",
    cardSecurityDesc: "Learn to protect yourself in the Web3 ecosystem: rug pulls, phishing, smart contract audits and best practices. Because security is a skill too.",
    comingSoon: "Coming soon",
    fromZeroToSolana: "from zero to solana",
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
        backDescription: "Discover why distributing power makes a network more resilient. You'll build a decentralized network by connecting nodes together.",
      },
      blockchain: {
        title: "The Blockchain",
        subtitle: "How to build a chain of trust?",
        backDescription: "Understand how blocks form a tamper-proof chain. You'll mine your own blocks and create a mini-blockchain.",
      },
      wallet: {
        title: "The Wallet",
        subtitle: "Your identity in the crypto world",
        backDescription: "Learn the public/private key system. You'll generate your own wallet by creating entropy with your mouse.",
      },
      seedphrase: { title: "The Seed Phrase", subtitle: "Your ultimate backup key", backDescription: "Master the recovery phrase that protects all your wallets. You'll memorize and reconstruct a 12-word seed phrase." },
      transactions: { title: "Transactions", subtitle: "Send and receive SOL", backDescription: "Simulate sending SOL on the Solana network. You'll sign a transaction and see the confirmation in real time." },
      consensus: { title: "Consensus", subtitle: "How the network agrees", backDescription: "Understand how Solana agrees through Proof of History. Quiz on consensus, PoS, and Solana's 65,000 TPS." },
      validators: { title: "Validators", subtitle: "The guardians of the Solana network", backDescription: "Discover the guardians of the Solana network. Quiz on staking, delegation, and the network's 1,900+ validators." },
      explorer: { title: "Blockchain Explorer", subtitle: "Read the blockchain like an open book", backDescription: "Learn to read the blockchain with Solscan. You'll discover your own wallet address on the Solana blockchain." },
      adresse: { title: "Solana Address", subtitle: "Your public identifier on-chain", backDescription: "Understand what a Solana address is, its Base58 format and its 32-44 characters." },
      networks: { title: "Mainnet / Devnet / Testnet", subtitle: "The three Solana networks", backDescription: "Discover the differences between Mainnet, Devnet and Testnet and what each is for." },
      signature: { title: "Transaction Signature", subtitle: "Cryptographically prove a transaction", backDescription: "Understand the role of cryptographic signatures in a Solana transaction." },
      fees: { title: "Gas Fees", subtitle: "The fuel of transactions", backDescription: "Learn why Solana fees are near-zero and how priority fees work." },
      solscan: { title: "Solscan / Solana Explorer", subtitle: "The magnifiers of the Solana blockchain", backDescription: "Master Solscan and Solana Explorer to analyze transactions, accounts and programs." },
      node: { title: "The Node", subtitle: "The fundamental building block of the network", backDescription: "Discover what a Solana node is, how it differs from a validator, and what RPC nodes do." },
    },
  },
  badges: {
    decentralisation: "Network Architect",
    blockchain: "Block Forger",
    wallet: "Key Guardian",
    seedphrase: "Seed Protector",
    transactions: "Transaction Master",
    consensus: "Consensus Master",
    validators: "Network Guardian",
    explorer: "On-Chain Detective",
    adresse: "Address Cartographer",
    networks: "Network Navigator",
    signature: "Signature Master",
    fees: "Gas Optimizer",
    solscan: "Solscan Investigator",
    node: "Node Sentinel",
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
  consensus: {
    headerTitle: "Consensus",
    headerSubtitle: "How the network agrees on the truth",
    backToBasics: "Back to Basics",
    // Phase 1 - Story
    storyIntro:
      "You know what a blockchain is and how transactions work. But how do thousands of machines around the world agree on the same version of the truth, without a referee? This is the consensus problem.",
    storyAnalogy:
      "Imagine 1,900 referees spread across different stadiums, all having to agree on the exact same score at the exact same time, with no phone to call each other. That is the challenge of consensus in a decentralized network.",
    defConsensusTitle: "Definition — Consensus",
    defConsensusText:
      "Consensus is the mechanism by which all participants in a decentralized network agree on a single version of the truth. Without a central authority, the network needs mathematical rules to determine which transactions are valid and in what order they are recorded.",
    powVsPosTitle: "Proof of Work vs. Proof of Stake",
    powVsPosText:
      "Bitcoin uses Proof of Work (PoW): miners solve complex mathematical puzzles to validate blocks — it is secure but energy-intensive. Solana uses Proof of Stake (PoS): validators lock up (stake) SOL tokens as collateral. The more SOL staked, the greater the chance of being selected to validate a block. It is thousands of times more energy-efficient than PoW.",
    pohTitle: "Proof of History (PoH)",
    pohText:
      "Invented by Anatoly Yakovenko in 2017, Proof of History is Solana's secret weapon. It is a cryptographic clock that timestamps every event before it reaches consensus. Instead of validators asking each other \"what time is it?\", PoH provides an indisputable chronological order. Result: 65,000 TPS and 400ms finality.",
    keyConceptsTitle: "Key Concepts",
    keyConceptsText:
      "Solana combines Proof of Stake (for security) with Proof of History (for speed). This unique combination enables 65,000 transactions per second with 400-millisecond finality — without sacrificing decentralization. It is one of the fastest blockchains ever designed.",
    didYouKnowTitle: "Did you know?",
    didYouKnowText:
      "Anatoly Yakovenko published the Solana whitepaper in 2017. His key insight was that if all validators could agree on the passage of time without communicating, consensus becomes almost instantaneous. This simple idea is what makes Solana thousands of times faster than Bitcoin.",
    storySummary:
      "Consensus = the set of rules that allow a network without a leader to agree on one shared truth. Solana's PoH + PoS makes this faster than any other blockchain.",
    storyNextButton: "Next: Test your knowledge",
    // Phase 2 - Quiz
    phase2Title: "Consensus Quiz",
    phase2Subtitle: "Test your understanding of consensus mechanisms",
    phase2Narrative:
      "Let's see if you have mastered the fundamental concepts of consensus. Answer these 4 questions to earn your badge.",
    quizQuestions: [
      {
        question: "What is Proof of History (PoH)?",
        options: [
          "A system where miners solve mathematical puzzles",
          "A cryptographic clock that timestamps events before consensus",
          "A protocol that stores the complete transaction history",
          "An algorithm that selects validators randomly",
        ],
        correctIndex: 1,
        explanation:
          "Proof of History is a cryptographic clock invented by Anatoly Yakovenko that creates a verifiable order of events before they reach consensus, making Solana extremely fast.",
      },
      {
        question: "What consensus mechanism does Solana use for security?",
        options: [
          "Proof of Work (PoW)",
          "Proof of Authority (PoA)",
          "Proof of Stake (PoS)",
          "Delegated Proof of Stake (DPoS)",
        ],
        correctIndex: 2,
        explanation:
          "Solana uses Proof of Stake (PoS) for security: validators lock up SOL tokens as collateral to participate in consensus. This is combined with PoH for speed.",
      },
      {
        question: "How many transactions per second can Solana theoretically process?",
        options: [
          "1,000 TPS",
          "7 TPS",
          "15,000 TPS",
          "65,000 TPS",
        ],
        correctIndex: 3,
        explanation:
          "Thanks to the combination of PoH and PoS, Solana can theoretically process up to 65,000 transactions per second with 400ms finality.",
      },
      {
        question: "In Proof of Stake, what do validators need to do to participate?",
        options: [
          "Solve complex mathematical equations",
          "Stake (lock up) SOL tokens as collateral",
          "Own specialized mining hardware",
          "Be approved by the Solana Foundation",
        ],
        correctIndex: 1,
        explanation:
          "In PoS, validators must stake SOL tokens as collateral. The more SOL staked, the higher the chance of being selected to validate blocks. This is energy-efficient and secure.",
      },
    ],
    phase2Success: "Excellent! You have mastered consensus mechanisms!",
    phase2FinishButton: "Finish and Earn the Badge",
    // Phase 3 - Reveal
    revealTitle: "Congratulations!",
    revealSubtitle: "You understand how the network reaches agreement",
    revealNarrative1:
      "You now understand how thousands of machines reach agreement without a central authority. Solana's unique combination of Proof of History and Proof of Stake is what makes it the fastest blockchain in the world.",
    revealNarrative2:
      "Anatoly Yakovenko's brilliant insight was simple: if everyone agrees on the passage of time, consensus becomes almost instantaneous. This is the foundation on which the entire Solana ecosystem is built.",
    didYouKnowRevealTitle: "Did you know?",
    didYouKnowRevealText:
      "Solana's Proof of History generates a unique hash every 400 milliseconds, creating an unbreakable cryptographic chain of time. This clock runs even when no transactions are being processed, ensuring the network is always ready.",
    keyPointsTitle: "Key Concepts",
    keyPoints: [
      "Consensus allows a decentralized network to agree on a single truth",
      "Proof of Stake (PoS) secures the network through staked SOL collateral",
      "Proof of History (PoH) timestamps events before consensus for extreme speed",
      "Solana achieves 65,000 TPS with 400ms finality thanks to PoH + PoS",
    ],
  },
  validators: {
    headerTitle: "Validators",
    headerSubtitle: "The guardians of the Solana network",
    backToBasics: "Back to Basics",
    // Phase 1 - Story
    storyIntro:
      "You understand consensus. But who are the people behind the machines that keep Solana running 24/7? Meet the validators: the unsung heroes of the blockchain.",
    storyAnalogy:
      "Think of validators as the notaries of the blockchain. They verify every transaction, sign every block, and guarantee the integrity of the network. But unlike traditional notaries, there are over 1,900 of them spread across the globe, and anyone can become one.",
    defValidatorTitle: "Definition — Validator",
    defValidatorText:
      "A validator is a computer (node) that participates in the Solana consensus. It verifies transactions, proposes and votes on new blocks, and maintains a copy of the entire blockchain. In exchange, the validator earns rewards in SOL. To become a validator, you need to stake SOL as collateral — a guarantee of good behavior.",
    stakingTitle: "Staking and Delegation",
    stakingText:
      "You don't need to run a validator yourself to participate. You can delegate your SOL to an existing validator. In return, you receive a share of their rewards. This is called staking. By delegating, you help secure the network while earning passive income — currently around 6-8% APY on Solana.",
    keyConceptsTitle: "Key Concepts",
    keyConceptsText:
      "Solana currently has over 1,900 active validators spread across every continent. A validator needs powerful hardware (high-performance CPU, 128+ GB RAM, fast SSD) and a high-speed internet connection. The more SOL delegated to a validator, the more influence it has on the network — but also the more responsibility it carries.",
    didYouKnowTitle: "Did you know?",
    didYouKnowText:
      "The Solana Foundation runs a Delegation Program that distributes SOL to promising validators to encourage decentralization. The goal is to have as many independent validators as possible, spread across different countries and providers.",
    storySummary:
      "Validators are the backbone of Solana. They verify, validate, and secure every transaction. Anyone can participate by delegating SOL to a validator.",
    storyNextButton: "Next: Test your knowledge",
    // Phase 2 - Quiz
    phase2Title: "Validators Quiz",
    phase2Subtitle: "Test your understanding of the validator ecosystem",
    phase2Narrative:
      "Let's see if you truly understand the role of validators. Answer these 4 questions to earn your badge.",
    quizQuestions: [
      {
        question: "How many active validators does Solana currently have?",
        options: [
          "About 100",
          "About 500",
          "Over 1,900",
          "Over 10,000",
        ],
        correctIndex: 2,
        explanation:
          "Solana currently has over 1,900 active validators distributed across the globe, making it one of the most decentralized proof-of-stake networks.",
      },
      {
        question: "What do you need to become a Solana validator?",
        options: [
          "Just a standard laptop",
          "Powerful hardware, fast internet, and staked SOL",
          "An official license from the Solana Foundation",
          "A GPU mining rig",
        ],
        correctIndex: 1,
        explanation:
          "Running a validator requires powerful hardware (high-performance CPU, 128+ GB RAM, fast SSD), a high-speed internet connection, and staked SOL as collateral.",
      },
      {
        question: "What is delegation in the context of Solana?",
        options: [
          "Transferring SOL permanently to a validator",
          "Entrusting your SOL to a validator to earn staking rewards",
          "Giving your private key to a validator",
          "Voting on governance proposals",
        ],
        correctIndex: 1,
        explanation:
          "Delegation means entrusting your SOL to a validator. You keep ownership of your tokens while earning a share of the validator's rewards (around 6-8% APY).",
      },
      {
        question: "What happens if a validator behaves maliciously?",
        options: [
          "Nothing, there are no consequences",
          "They receive a warning email",
          "Their staked SOL can be slashed (partially confiscated)",
          "They are permanently banned from the internet",
        ],
        correctIndex: 2,
        explanation:
          "Slashing is a penalty mechanism: if a validator acts maliciously or fails to perform its duties, a portion of its staked SOL can be confiscated. This aligns incentives with honest behavior.",
      },
    ],
    phase2Success: "Excellent! You are a true network guardian!",
    phase2FinishButton: "Finish and Earn the Badge",
    // Phase 3 - Reveal
    revealTitle: "Congratulations!",
    revealSubtitle: "You know the guardians of the network",
    revealNarrative1:
      "You now understand the critical role validators play in the Solana ecosystem. They are the backbone that keeps the network secure, fast, and decentralized. Without them, no transactions, no blocks, no blockchain.",
    revealNarrative2:
      "By delegating your SOL, you too can participate in securing the network while earning rewards. It is the beauty of proof-of-stake: everyone can contribute to the network's security.",
    didYouKnowRevealTitle: "Did you know?",
    didYouKnowRevealText:
      "Some Solana validators process over 50 million transactions per day. The most reliable validators have an uptime exceeding 99.9%, running continuously without interruption for months at a time.",
    keyPointsTitle: "Key Concepts",
    keyPoints: [
      "A validator is a node that verifies transactions and produces blocks",
      "Over 1,900 validators secure the Solana network worldwide",
      "Delegation lets you stake SOL with a validator and earn ~6-8% APY",
      "Slashing penalizes malicious or negligent validators by confiscating staked SOL",
    ],
  },
  explorer: {
    headerTitle: "Blockchain Explorer",
    headerSubtitle: "Read the blockchain like an open book",
    backToBasics: "Back to Basics",
    // Phase 1 - Story
    storyIntro:
      "You know how to send transactions and how validators secure them. But how can you verify that a transaction actually happened? How can you explore the blockchain's history? This is where blockchain explorers come in.",
    storyAnalogy:
      "A blockchain explorer is like a search engine for the blockchain. Just as Google lets you search the web, a blockchain explorer lets you search every transaction, every block, and every address on Solana. Everything is public, transparent, and verifiable by anyone.",
    defExplorerTitle: "Definition — Blockchain Explorer",
    defExplorerText:
      "A blockchain explorer is a web tool that lets you browse the contents of a blockchain in real time. You can search for a transaction by its signature, view an address's balance and history, or inspect the contents of any block. On Solana, the two most popular explorers are Solscan (solscan.io) and Solana Explorer (explorer.solana.com).",
    solscanTitle: "Solscan and Solana Explorer",
    solscanText:
      "Solscan.io is the most popular Solana explorer, with a clean and intuitive interface. Solana Explorer (explorer.solana.com) is the official explorer maintained by Solana Labs. Both let you search transactions, addresses, tokens, and programs. They are your window into everything happening on the blockchain.",
    readTxTitle: "Reading a Transaction",
    readTxText:
      "Every transaction on Solana contains: a unique signature (hash), the sender and receiver addresses, the amount transferred, the network fees paid (typically 0.000005 SOL), the timestamp, and the status (success or failure). All of this information is public and permanently recorded.",
    keyConceptsTitle: "Key Concepts",
    keyConceptsText:
      "Blockchain transparency is a fundamental principle: every transaction ever made on Solana is visible to anyone. This makes the network auditable and trustworthy. Since Solana's launch, over 250 billion transactions have been recorded — and every single one is searchable through an explorer.",
    didYouKnowTitle: "Did you know?",
    didYouKnowText:
      "Solscan.io receives millions of visits per month. Developers, traders, and curious users all use it to track their transactions, verify smart contracts, or analyze the activity of a specific address. It is the indispensable tool of the Solana ecosystem.",
    storySummary:
      "A blockchain explorer lets you search, verify, and analyze everything that happens on Solana. It is the ultimate transparency tool.",
    storyNextButton: "Next: Test your knowledge",
    // Phase 2 - Quiz
    phase2Title: "Explorer Quiz",
    phase2Subtitle: "Test your understanding of blockchain explorers",
    phase2Narrative:
      "Let's see if you can navigate the blockchain like a pro. Answer these 4 questions to earn your badge.",
    yourWalletTitle: "Your Wallet on the Explorer",
    yourWalletText:
      "In a real scenario, you could paste your wallet address into Solscan or Solana Explorer and see your entire transaction history: every SOL sent, every SOL received, every token interaction. Everything is transparent and verifiable.",
    quizQuestions: [
      {
        question: "What is the primary role of a blockchain explorer?",
        options: [
          "To mine new blocks",
          "To browse and search the contents of a blockchain",
          "To create new wallets",
          "To validate transactions",
        ],
        correctIndex: 1,
        explanation:
          "A blockchain explorer is a web tool that lets you browse, search, and verify all data on the blockchain: transactions, addresses, blocks, and more.",
      },
      {
        question: "Which are the two most popular Solana explorers?",
        options: [
          "Etherscan and Polygonscan",
          "Solscan (solscan.io) and Solana Explorer (explorer.solana.com)",
          "Blockchain.com and Blockchair",
          "CoinGecko and CoinMarketCap",
        ],
        correctIndex: 1,
        explanation:
          "Solscan.io is the most popular community explorer, and explorer.solana.com is the official explorer maintained by Solana Labs. Both provide full access to Solana's on-chain data.",
      },
      {
        question: "What information can you find in a Solana transaction?",
        options: [
          "Only the amount transferred",
          "The signature, sender, receiver, amount, fees, timestamp, and status",
          "Only the sender and receiver addresses",
          "The private keys of the participants",
        ],
        correctIndex: 1,
        explanation:
          "Every Solana transaction contains a unique signature, sender and receiver addresses, amount transferred, network fees (~0.000005 SOL), timestamp, and status. Private keys are never exposed.",
      },
      {
        question: "Why can anyone view transactions on a blockchain explorer?",
        options: [
          "Because the blockchain has a security flaw",
          "Because you need to pay a subscription to access it",
          "Because the blockchain is public and transparent by design",
          "Because only validators can see the transactions",
        ],
        correctIndex: 2,
        explanation:
          "Transparency is a fundamental principle of public blockchains. Every transaction is visible to anyone, making the network auditable and trustworthy. Over 250 billion transactions are searchable on Solana.",
      },
    ],
    phase2Success: "Excellent! You are a true on-chain detective!",
    phase2FinishButton: "Finish and Earn the Badge",
    // Phase 3 - Reveal
    revealTitle: "Congratulations!",
    revealSubtitle: "You can read the blockchain like an open book",
    revealNarrative1:
      "You now know how to use a blockchain explorer to verify any transaction on Solana. This transparency is what makes blockchain revolutionary: no hidden transaction, no secret manipulation. Everything is visible, forever.",
    revealNarrative2:
      "Whether you are a developer debugging a smart contract, a trader tracking a whale's movements, or simply a curious user verifying a transfer, the blockchain explorer is your indispensable tool.",
    didYouKnowRevealTitle: "Did you know?",
    didYouKnowRevealText:
      "Since its launch, Solana has processed over 250 billion transactions. Each one is permanently recorded and searchable. That is more transactions than all the emails sent worldwide in a single day!",
    keyPointsTitle: "Key Concepts",
    keyPoints: [
      "A blockchain explorer lets you search and verify any transaction, address, or block",
      "Solscan.io and explorer.solana.com are the two main Solana explorers",
      "Every transaction contains: signature, addresses, amount, fees, timestamp, and status",
      "Blockchain transparency means anyone can audit the network at any time",
    ],
    allCompletedTitle: "Basics Master",
    allCompletedText: "You have completed all eight fundamental modules! You've mastered the basics of the Solana ecosystem.",
  },
  adresse: {
    headerTitle: "The Solana Address",
    backToBasics: "Back to Basics",
    storyIntro: "Every Solana user has one or more addresses. It's your public identity on the blockchain — the one you share to receive funds, sign transactions, and interact with programs.",
    storyAnalogy: "Think of your Solana address like an IBAN: a unique, public identifier you give out to receive money. Except instead of 27 digits, it's a 32-44 character alphanumeric string with no spaces.",
    def1Title: "📖 Definition — Solana Address",
    def1Text: "A Solana address is the Base58 representation of your public key. It's exactly 32 bytes, which gives you 32 to 44 characters once encoded. Example: 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU.",
    def2Title: "📖 Definition — Base58",
    def2Text: "Base58 is an encoding designed by Satoshi Nakamoto for Bitcoin. It uses 58 readable characters (numbers + upper/lowercase letters), deliberately excluding 0, O, I and l to avoid visual confusion. Solana adopted it for its addresses.",
    keyConceptsTitle: "🔑 Key Concepts",
    keyConceptsText: "An address is derived from your public key. That public key itself comes from your private key (and therefore from your seed phrase). If you lose your seed phrase, you lose access to all addresses derived from it. The address itself is public: you can share it anywhere safely.",
    didYouKnowTitle: "💡 Did you know?",
    didYouKnowText: "Vanity addresses are addresses that start with a chosen word (e.g., SOLxxx, PEPExxx). They're generated by brute force: billions of private keys are tested until one produces an address matching the desired pattern. A 5-character vanity address takes seconds; 10 characters takes hours.",
    storySummary: "A Solana address is your public identifier, derived from your public key, encoded in Base58. You can share it freely — it's used to receive and identify, not to control.",
    phase2Title: "Quiz: The Solana Address",
    phase2Subtitle: "Test your understanding of Solana addresses",
    phase2Narrative: "Answer the following questions to validate your knowledge.",
    quizQuestions: [
      {
        question: "What encoding do Solana addresses use?",
        options: ["Hexadecimal", "Base58", "Base64", "UTF-8"],
        correctIndex: 1,
        explanation: "Solana addresses use Base58, inherited from Bitcoin, to avoid visual confusion between similar characters.",
      },
      {
        question: "How many bytes does a Solana address contain?",
        options: ["16 bytes", "20 bytes", "32 bytes", "64 bytes"],
        correctIndex: 2,
        explanation: "A Solana address is exactly 32 bytes, matching the size of an ed25519 public key.",
      },
      {
        question: "Is it safe to share your Solana address?",
        options: ["Never", "Yes, it's public information", "Only with trusted people", "Only on Devnet"],
        correctIndex: 1,
        explanation: "Addresses are public by design. Only the private key needs protection — addresses can be shared anywhere.",
      },
      {
        question: "Which characters does Base58 exclude?",
        options: ["a, e, i, o, u", "0, O, I, l", "1, 2, 3, 4", "Uppercase letters"],
        correctIndex: 1,
        explanation: "Base58 excludes 0 (zero), O (capital o), I (capital i), and l (lowercase L) to prevent visual confusion.",
      },
    ],
    phase2Success: "Well done! You know everything about Solana addresses.",
    phase2FinishButton: "Finish and Earn Badge",
    revealSubtitle: "You've mastered Solana addresses",
    keyPointsTitle: "🔑 Key Concepts",
    keyPoints: [
      "A Solana address is 32-44 Base58 characters",
      "It derives from your public key (which comes from your private key)",
      "It's public data, safe to share",
      "Base58 excludes 0, O, I, l to avoid confusion",
    ],
  },
  networks: {
    headerTitle: "Mainnet / Devnet / Testnet",
    backToBasics: "Back to Basics",
    storyIntro: "Solana isn't one network — it's three. Each has a specific role: produce, test, experiment. Understanding their differences prevents costly mistakes.",
    storyAnalogy: "Picture a car manufacturer: they build cars in the factory (Mainnet = production), test them on a private track (Testnet = internal testing), and let developers prototype in a sandbox (Devnet = sandbox). Sending a real car to the testing track would be a waste.",
    def1Title: "📖 Definition — Mainnet",
    def1Text: "Mainnet (or Mainnet Beta) is Solana's primary network — where real SOL flows. All public applications run here, transactions cost real fees, and value is real. It's the only network connected to the real economy.",
    def2Title: "📖 Definition — Devnet & Testnet",
    def2Text: "Devnet is the developer sandbox: free SOL via a faucet, ideal for testing an app under construction. Testnet is the proving ground for validators and new protocol versions: closer to Mainnet but unstable. Neither has monetary value.",
    keyConceptsTitle: "🔑 Key Concepts",
    keyConceptsText: "Each network has its own RPC URL: Mainnet (api.mainnet-beta.solana.com), Devnet (api.devnet.solana.com), Testnet (api.testnet.solana.com). Your Phantom or Solflare wallet can switch between them. SOL never moves between networks: a Devnet SOL stays on Devnet.",
    didYouKnowTitle: "💡 Did you know?",
    didYouKnowText: "You can claim 1 free Devnet SOL every 8 hours via the Solana faucet (solfaucet.com). Developers use it to test smart contracts without spending a cent. On Testnet, SOL is only distributed to validators participating in test phases.",
    storySummary: "Mainnet for production, Devnet for development, Testnet for protocol testing. Three independent networks, three distinct uses.",
    phase2Title: "Quiz: Solana Networks",
    phase2Subtitle: "Check you can tell the three networks apart",
    phase2Narrative: "Answer the questions to validate your knowledge.",
    quizQuestions: [
      {
        question: "Which network hosts the real, economically valuable SOL?",
        options: ["Devnet", "Testnet", "Mainnet", "Localnet"],
        correctIndex: 2,
        explanation: "Only Mainnet (Mainnet Beta) hosts the real SOL connected to the real economy.",
      },
      {
        question: "What is Devnet for?",
        options: ["Validating new protocol versions", "Testing applications in development with free SOL", "Storing valuable NFTs", "Mining real SOL"],
        correctIndex: 1,
        explanation: "Devnet is the developer sandbox: free SOL via faucet, no financial risk.",
      },
      {
        question: "Can you transfer SOL from Devnet to Mainnet?",
        options: ["Yes, automatically", "No, the networks are fully isolated", "Yes, via a special bridge", "Only with a validator's approval"],
        correctIndex: 1,
        explanation: "The three networks are fully independent. SOL never moves between them.",
      },
      {
        question: "Which network is used to test Solana protocol upgrades?",
        options: ["Mainnet", "Devnet", "Testnet", "All three at once"],
        correctIndex: 2,
        explanation: "Testnet hosts new protocol versions before they ship to Mainnet. It's the validators' proving ground.",
      },
    ],
    phase2Success: "Perfect! You navigate between networks like a pro.",
    phase2FinishButton: "Finish and Earn Badge",
    revealSubtitle: "You've mastered the three Solana networks",
    keyPointsTitle: "🔑 Key Concepts",
    keyPoints: [
      "Mainnet: production, real SOL, real economic value",
      "Devnet: developer sandbox, free SOL via faucet",
      "Testnet: proving ground for validators and the protocol",
      "The three networks are isolated — no transfers between them",
    ],
  },
  signature: {
    headerTitle: "The Transaction Signature",
    backToBasics: "Back to Basics",
    storyIntro: "You have a wallet, you know how to send a transaction. But what stops someone else from spending your SOL? The cryptographic signature. Without it, nothing is valid.",
    storyAnalogy: "A cryptographic signature is like a medieval wax seal: unique, unforgeable, stamped with a ring (the private key) that only you possess. Anyone can verify the seal is authentic, but no one can reproduce it without the ring.",
    def1Title: "📖 Definition — Cryptographic Signature",
    def1Text: "A signature is mathematical proof that whoever owns the private key behind a given address approved a specific transaction. It's generated by combining the transaction content with the private key. The network verifies the signature using the public key — without ever seeing the private key.",
    def2Title: "📖 Definition — Ed25519",
    def2Text: "Solana uses the Ed25519 signature algorithm, renowned for its speed and security. Each Ed25519 signature is 64 bytes and verifiable in microseconds. That's what lets Solana process thousands of transactions per second.",
    keyConceptsTitle: "🔑 Key Concepts",
    keyConceptsText: "A Solana transaction can have multiple signatures (multisig): useful for corporate treasuries or DAOs, where several people must approve before execution. The signature is content-dependent: change a single bit of the transaction and the signature becomes invalid.",
    didYouKnowTitle: "💡 Did you know?",
    didYouKnowText: "The transaction signature also serves as its unique identifier on Solana — that's what's called the \"transaction hash\" or \"tx signature\". You paste it into Solscan to find a transaction. This is why two perfectly identical transactions (same amounts, same recipient) will have different signatures — thanks to a nonce (recent blockhash).",
    storySummary: "The signature cryptographically proves you authorized a transaction, without ever revealing your private key. It's the foundation of Solana's security.",
    phase2Title: "Quiz: The Signature",
    phase2Subtitle: "Check your knowledge of signatures",
    phase2Narrative: "Answer the following questions.",
    quizQuestions: [
      {
        question: "What does a cryptographic signature do in a transaction?",
        options: ["Encrypts the amount sent", "Proves the private key owner approved the transaction", "Speeds up confirmation", "Sets the gas fees"],
        correctIndex: 1,
        explanation: "The signature proves authorization by the private key owner, without ever revealing that key.",
      },
      {
        question: "Which signature algorithm does Solana use?",
        options: ["RSA-2048", "ECDSA (secp256k1)", "Ed25519", "SHA-256"],
        correctIndex: 2,
        explanation: "Solana uses Ed25519, known for its speed and security (64 bytes, microsecond verification).",
      },
      {
        question: "What happens if you modify a single bit of a transaction after signing?",
        options: ["Nothing, the signature stays valid", "The signature becomes invalid and the transaction is rejected", "Gas fees increase", "The transaction is re-signed automatically"],
        correctIndex: 1,
        explanation: "The signature depends on the exact content of the transaction. Any modification invalidates it.",
      },
      {
        question: "Can a Solana transaction have multiple signatures?",
        options: ["Never", "Yes, for multisig accounts and DAOs", "Yes, but only if the sender pays extra", "Only on Devnet"],
        correctIndex: 1,
        explanation: "Multisig transactions require multiple signatures — used by corporate treasuries, DAOs, and shared wallets.",
      },
    ],
    phase2Success: "Excellent! You understand the cryptography behind Solana.",
    phase2FinishButton: "Finish and Earn Badge",
    revealSubtitle: "You've mastered cryptographic signatures",
    keyPointsTitle: "🔑 Key Concepts",
    keyPoints: [
      "The signature proves authorization without revealing the private key",
      "Solana uses Ed25519 (64 bytes, ultra fast)",
      "Any change to the transaction invalidates the signature",
      "A transaction can have multiple signatures (multisig)",
    ],
  },
  fees: {
    headerTitle: "Gas Fees",
    backToBasics: "Back to Basics",
    storyIntro: "Every Solana transaction costs something — but so little it's almost invisible. On Ethereum, you might pay $50 in gas. On Solana, it's $0.00003. Why the difference? And how do you optimize your fees?",
    storyAnalogy: "Think of gas fees like a highway toll. On Ethereum, tolls are expensive and vary with traffic. On Solana, the highway has 1,000 lanes and the toll is a fraction of a cent — even at rush hour.",
    def1Title: "📖 Definition — Base Fee",
    def1Text: "Each Solana transaction pays 5,000 lamports (0.000005 SOL) per signature, about $0.001 at current prices. This price is fixed: it doesn't depend on network congestion. It's essentially an \"entry ticket\" to the network.",
    def2Title: "📖 Definition — Priority Fees",
    def2Text: "During high demand, you can add priority fees: an optional tip that incentivizes the validator to process your transaction faster. Useful for popular NFT mints, urgent DeFi trades, or liquidations. In calm periods, 0 lamports is fine; during a rush, 100,000+ lamports may be needed.",
    keyConceptsTitle: "🔑 Key Concepts",
    keyConceptsText: "1 SOL = 1,000,000,000 lamports (1 billion). Lamports are the smallest unit, named after Leslie Lamport, a pioneer of distributed systems. Gas fees prevent spam (every tx costs something) and reward validators who secure the network.",
    didYouKnowTitle: "💡 Did you know?",
    didYouKnowText: "50% of base fees are burned (destroyed), which reduces total SOL supply over time. The other 50% goes to validators. On Ethereum, some transactions during the 2021 NFT peak cost over $1,000 in gas. On Solana, even at peak, transactions stay under $0.50.",
    storySummary: "On Solana, base fees are fixed and tiny (0.000005 SOL). Priority fees are optional, useful only during congestion.",
    phase2Title: "Quiz: Gas Fees",
    phase2Subtitle: "Test your knowledge of Solana fees",
    phase2Narrative: "Answer the questions to validate your knowledge.",
    quizQuestions: [
      {
        question: "What is the base fee for a Solana transaction?",
        options: ["5,000 lamports (0.000005 SOL)", "1 SOL", "0.01 SOL", "Variable based on congestion"],
        correctIndex: 0,
        explanation: "The base fee is fixed at 5,000 lamports (0.000005 SOL) per signature, about $0.001 at current prices.",
      },
      {
        question: "How many lamports in 1 SOL?",
        options: ["1,000", "1,000,000", "1,000,000,000", "1,000,000,000,000"],
        correctIndex: 2,
        explanation: "1 SOL = 1,000,000,000 lamports (1 billion). It's Solana's smallest unit.",
      },
      {
        question: "What are priority fees used for?",
        options: ["Encrypting the transaction", "Incentivizing validators to prioritize your tx during high demand", "Refunding base fees", "Auto-signing the transaction"],
        correctIndex: 1,
        explanation: "Priority fees are an optional tip to jump the queue during congestion.",
      },
      {
        question: "What happens to part of the base fees?",
        options: ["Refunded to the sender", "Fully stored in treasury", "50% is burned (destroyed)", "Funds Solana development"],
        correctIndex: 2,
        explanation: "50% of base fees are burned, gradually reducing total SOL supply. The other 50% goes to the validator.",
      },
    ],
    phase2Success: "Excellent! You understand Solana's fee economics.",
    phase2FinishButton: "Finish and Earn Badge",
    revealSubtitle: "You've mastered Solana gas fees",
    keyPointsTitle: "🔑 Key Concepts",
    keyPoints: [
      "Fixed base fee: 5,000 lamports (0.000005 SOL) per signature",
      "1 SOL = 1,000,000,000 lamports",
      "Priority fees = optional tip during congestion",
      "50% of base fees burned, 50% to validators",
    ],
  },
  solscan: {
    headerTitle: "Solscan & Solana Explorer",
    backToBasics: "Back to Basics",
    storyIntro: "You've sent a transaction. It was confirmed. But how do you verify it? How do you inspect an address, view its tokens, trace an NFT's history? Through Solscan and Solana Explorer, the two main magnifiers of the Solana blockchain.",
    storyAnalogy: "Solscan and Solana Explorer are like Google Maps for Solana: type an address and you see the whole neighborhood — balance, tokens, recent transactions, programs called. Nothing is hidden, everything is public.",
    def1Title: "📖 Definition — Solscan",
    def1Text: "Solscan (solscan.io) is the most popular community explorer on Solana. Richer than the official one: SPL token analysis, NFT history, wallet leaderboards, advanced program decoding. Clean interface, fast loading, dark mode available.",
    def2Title: "📖 Definition — Solana Explorer",
    def2Text: "Solana Explorer (explorer.solana.com) is the official explorer from the Solana Foundation. More bare-bones than Solscan but always up-to-date with the latest protocol features (e.g., new transaction versions, Address Lookup Tables). Ideal for debugging development.",
    keyConceptsTitle: "🔑 Key Concepts",
    keyConceptsText: "Both tools read the same blockchain — only the interface differs. You can paste three types of strings: an address (see balance and history), a transaction signature (see details), a block hash (see txs in that block). To switch between Mainnet, Devnet and Testnet, just use the selector in the top right.",
    didYouKnowTitle: "💡 Did you know?",
    didYouKnowText: "Solscan became so popular that competitors emerged: SolanaFM, XRAY, SolanaBeach. Each with its specialty — SolanaFM for NFTs, XRAY for narrative decoding of transactions (\"Alice sent 10 SOL to Bob via Jupiter\"). The blockchain's full transparency lets anyone build their own explorer.",
    storySummary: "Solscan and Solana Explorer read the blockchain and make it human-readable. Solscan is community-driven and feature-rich; Solana Explorer is official and minimal.",
    phase2Title: "Quiz: Solscan & Solana Explorer",
    phase2Subtitle: "Verify your mastery of Solana explorers",
    phase2Narrative: "Answer the questions to validate your knowledge.",
    quizQuestions: [
      {
        question: "Which is the official explorer from the Solana Foundation?",
        options: ["Solscan", "Solana Explorer", "SolanaFM", "SolanaBeach"],
        correctIndex: 1,
        explanation: "Solana Explorer (explorer.solana.com) is the official explorer maintained by the Solana Foundation.",
      },
      {
        question: "What can you paste into an explorer's search bar?",
        options: ["Only an address", "An address, a tx signature, or a block hash", "Only NFTs", "Only SPL tokens"],
        correctIndex: 1,
        explanation: "Explorers accept three input types: addresses, transaction signatures, and block hashes.",
      },
      {
        question: "Is the data displayed on Solscan private?",
        options: ["Yes, visible only to owners", "No, the blockchain is public by nature", "Only with a paid account", "Only for Mainnet"],
        correctIndex: 1,
        explanation: "The Solana blockchain is public: anyone can see everything. Explorers just make this data readable.",
      },
      {
        question: "Can you explore Devnet with Solscan?",
        options: ["No, Mainnet only", "Yes, by switching network in the selector", "Only with a subscription", "Solscan doesn't support Devnet"],
        correctIndex: 1,
        explanation: "Solscan and Solana Explorer let you switch between Mainnet, Devnet, and Testnet via a top-right selector.",
      },
    ],
    phase2Success: "Well done! You can now investigate Solana.",
    phase2FinishButton: "Finish and Earn Badge",
    revealSubtitle: "You've mastered Solana explorers",
    keyPointsTitle: "🔑 Key Concepts",
    keyPoints: [
      "Solscan: feature-rich community explorer",
      "Solana Explorer: official, always up-to-date with protocol features",
      "Both support Mainnet, Devnet, and Testnet",
      "Search by: address, tx signature, or block hash",
    ],
  },
  node: {
    headerTitle: "The Node",
    backToBasics: "Back to Basics",
    storyIntro: "The Solana blockchain runs on thousands of computers spread around the world. Each of these computers is a node. Understanding what a node is means understanding the infrastructure that holds the whole edifice together.",
    storyAnalogy: "A Solana node is like a post office in a giant postal network: it receives packages (transactions), sorts them, redistributes them to its neighbors. The more offices there are, the more robust the network — if one office burns down, the mail keeps flowing.",
    def1Title: "📖 Definition — Node",
    def1Text: "A node is a computer running the Solana software (solana-validator) and maintaining a copy of the blockchain. It receives transactions, verifies their validity, and propagates them to other nodes. There are more than 3,000 Solana nodes in the world.",
    def2Title: "📖 Definition — RPC Node vs Validator",
    def2Text: "Not all nodes do the same thing. An RPC (Remote Procedure Call) node answers queries from applications (wallets, dApps) that want to read the blockchain — without producing blocks. A validator produces and votes on blocks, and stakes SOL to participate in consensus.",
    keyConceptsTitle: "🔑 Key Concepts",
    keyConceptsText: "A Solana node requires serious hardware: 12+ CPU cores, 256-512 GB of RAM, 2+ TB of NVMe SSD, and fast fiber internet. Monthly cost for a validator server hovers around $500-1,000. That's why only committed (or well-funded) players run their own nodes — others delegate to RPC providers like Helius, QuickNode, or Triton.",
    didYouKnowTitle: "💡 Did you know?",
    didYouKnowText: "Solana has the most performant node software in crypto, but also the most demanding. To diversify, a second implementation called Firedancer was developed by Jump Crypto. It promises 10x the performance of the current software and should boost the network once widely deployed.",
    storySummary: "A node is a computer running the Solana software. RPC nodes read and serve data; validators produce blocks. The more nodes, the more decentralized the network.",
    phase2Title: "Quiz: Nodes",
    phase2Subtitle: "Verify your understanding of Solana nodes",
    phase2Narrative: "Answer these final questions to validate your mastery of the Basics.",
    quizQuestions: [
      {
        question: "What's the main difference between an RPC node and a validator?",
        options: ["Nothing, they're the same", "An RPC node reads the blockchain and serves queries, a validator produces blocks and stakes SOL", "An RPC node costs more", "A validator isn't connected to the internet"],
        correctIndex: 1,
        explanation: "An RPC node serves reads (wallets, dApps). A validator participates in consensus by producing blocks and staking SOL.",
      },
      {
        question: "Roughly how many nodes does Solana have?",
        options: ["100", "500", "3,000+", "100,000"],
        correctIndex: 2,
        explanation: "Solana has more than 3,000 nodes (validators + RPC nodes) spread around the world.",
      },
      {
        question: "Why run your own RPC node?",
        options: ["To earn SOL as a reward", "To have a reliable, sovereign data source without depending on a third party", "To mine NFTs", "To reduce blockchain size"],
        correctIndex: 1,
        explanation: "A personal RPC node guarantees a neutral data source without depending on an external provider — essential for high-traffic apps.",
      },
      {
        question: "What is Firedancer?",
        options: ["A mobile wallet", "A second Solana node implementation developed by Jump Crypto", "A test network", "An SPL token"],
        correctIndex: 1,
        explanation: "Firedancer is a new validator node implementation developed by Jump Crypto, targeting 10x performance improvements.",
      },
    ],
    phase2Success: "Congratulations! You've mastered Solana's infrastructure.",
    phase2FinishButton: "Finish and Earn Badge",
    revealSubtitle: "You've completed the 14 foundational modules",
    keyPointsTitle: "🔑 Key Concepts",
    keyPoints: [
      "A node = a computer running the Solana software",
      "RPC node: reads and serves data to apps",
      "Validator: produces blocks, stakes SOL, participates in consensus",
      "Firedancer: new implementation promising 10x performance",
    ],
  },
};
