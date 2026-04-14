export type Locale = "fr" | "en";

export interface ModuleTranslations {
  title: string;
  subtitle: string;
}

export interface TranslationDictionary {
  common: {
    next: string;
    back: string;
    backToCourse: string;
    nextModule: string;
    start: string;
    completed: string;
    locked: string;
    completePrevious: string;
    reset: string;
    continue: string;
    finish: string;
    alreadyCompleted: string;
    step: string;
    xp: string;
    lvl: string;
    modulesCompleted: string;
    progression: string;
    xpEarned: string;
    congratulations: string;
  };
  meta: {
    title: string;
    description: string;
  };
  home: {
    title: string;
    subtitle: string;
    narratorLabel: string;
    narratorText: string;
    statModules: string;
    statXpToEarn: string;
    statBadges: string;
    startAdventure: string;
  };
  basics: {
    pageTitle: string;
    pageSubtitle: string;
    chapterTitle: string;
    chapterText: string;
    modules: {
      decentralisation: ModuleTranslations;
      blockchain: ModuleTranslations;
      wallet: ModuleTranslations;
    };
  };
  badges: {
    decentralisation: string;
    blockchain: string;
    wallet: string;
    master: string;
  };
  decentralisation: {
    // Phase 1
    phase1Title: string;
    phase1Narrative: string;
    defTitle: string;
    defText: string;
    didYouKnowTitle: string;
    didYouKnowText: string;
    singlePointTitle: string;
    singlePointText: string;
    singlePointExample: string;
    censorshipTitle: string;
    censorshipText: string;
    censorshipExample: string;
    trustTitle: string;
    trustText: string;
    trustExample: string;
    // Phase 2
    phase2Title: string;
    phase2Subtitle: string;
    phase2Mission: string;
    phase2KeyConceptsTitle: string;
    phase2KeyConceptsText: string;
    phase2Connections: string;
    phase2MinConnections: string;
    phase2HowToPlay: string;
    // Phase 3
    phase3Title: string;
    phase3Narrative: string;
    phase3PeerDefTitle: string;
    phase3PeerDefText: string;
    phase3DidYouKnowTitle: string;
    phase3DidYouKnowText: string;
    phase3KeyPointsTitle: string;
    phase3KeyPoints: string[];
  };
  blockchain: {
    // Header
    headerTitle: string;
    headerSubtitle: string;
    // Phase 1
    phase1Narrative: string;
    defHashTitle: string;
    defHashText: string;
    didYouKnowGenesisTitle: string;
    didYouKnowGenesisText: string;
    keyConceptsBlockTitle: string;
    keyConceptsBlockText: string;
    // Phase 2
    phase2Title: string;
    phase2Subtitle: string;
    phase2Narrative: string;
    phase2KeyConceptsTitle: string;
    phase2KeyConceptsText: string;
    phase2BlockLabel: string;
    phase2InputLabel: string;
    phase2InputPlaceholder: string;
    phase2Mining: string;
    phase2MineButton: string;
    phase2ChainComplete: string;
    phase2ChainCompleteText: string;
    phase2Revelation: string;
    // Phase 3
    phase3Narrative: string;
    defImmutabilityTitle: string;
    defImmutabilityText: string;
    phase3DidYouKnowTitle: string;
    phase3DidYouKnowText: string;
    phase3KeyPointsTitle: string;
    phase3KeyPoints: string[];
    backToBasics: string;
    nextWallet: string;
  };
  wallet: {
    // Header
    headerTitle: string;
    headerSubtitle: string;
    backToBasics: string;
    // Story phase
    storyIntro: string;
    storyKeySystem: string;
    publicKeyTitle: string;
    publicKeyDesc: string;
    publicKeyProps: string[];
    privateKeyTitle: string;
    privateKeyDesc: string;
    privateKeyProps: string[];
    secretLabel: string;
    defWalletTitle: string;
    defWalletText: string;
    didYouKnowWalletsTitle: string;
    didYouKnowWalletsText: string;
    keyConceptsPhantomTitle: string;
    keyConceptsPhantomText: string;
    storySummary: string;
    storyNextButton: string;
    // Entropy step
    entropyTitle: string;
    entropySubtitle: string;
    defEntropyTitle: string;
    defEntropyText: string;
    entropyCollected: string;
    entropyReady: string;
    // Derivation step
    derivationTitle: string;
    derivationSubtitle: string;
    keyConceptsDerivationTitle: string;
    keyConceptsDerivationText: string;
    entropyLabel: string;
    privateKeyLabel: string;
    publicKeyLabel: string;
    // Wallet display step
    walletStepTitle: string;
    walletStepSubtitle: string;
    addressLabel: string;
    addressHint: string;
    privateKeyWarningTitle: string;
    privateKeyWarningText: string;
    balanceLabel: string;
    balanceReady: string;
    finishButton: string;
    // Reveal phase
    revealTitle: string;
    revealSubtitle: string;
    didYouKnowActiveTitle: string;
    didYouKnowActiveText: string;
    revealNarrative1: string;
    revealNarrative2: string;
    keyPointsTitle: string;
    keyPoints: string[];
    masterBadgeTitle: string;
    masterBadgeText: string;
  };
}
