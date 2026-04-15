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
};
