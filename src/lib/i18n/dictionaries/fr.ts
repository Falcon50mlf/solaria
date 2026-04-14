import type { TranslationDictionary } from "../types";

export const fr: TranslationDictionary = {
  common: {
    next: "Suivant",
    back: "Retour",
    backToCourse: "Retour au parcours",
    nextModule: "Module suivant",
    start: "Commencer",
    completed: "Terminé",
    locked: "Verrouillé",
    completePrevious: "Complétez l'étape précédente",
    reset: "Réinitialiser",
    continue: "Continuer",
    finish: "Terminer et Recevoir le Badge",
    alreadyCompleted: "Module déjà complété",
    step: "Étape",
    xp: "XP",
    lvl: "LVL",
    modulesCompleted: "Modules complétés",
    progression: "Progression",
    xpEarned: "XP gagné",
    congratulations: "Félicitations !",
  },
  meta: {
    title: "SolQuest - Apprends Solana en Jouant",
    description:
      "Revivez la création de Solana et maîtrisez la blockchain la plus rapide du monde. Un jeu éducatif gamifié pour apprendre Solana en s'amusant.",
  },
  home: {
    title: "SolQuest",
    subtitle: "Revivez la création de Solana. Devenez le fondateur.",
    narratorLabel: "Acte I - La Genèse",
    narratorText:
      "2017. Vous êtes un ingénieur passionné. Vous avez une vision : créer la blockchain la plus rapide au monde. Mais avant de révolutionner le monde, il faut maîtriser les fondations...",
    statModules: "Modules",
    statXpToEarn: "à gagner",
    statBadges: "Badges",
    startAdventure: "Commencer l'aventure",
  },
  basics: {
    pageTitle: "Les Basics",
    pageSubtitle: "Les fondations de la révolution Solana",
    chapterTitle: "Chapitre 1 : Les Basics",
    chapterText:
      "Avant de construire Solana, il faut comprendre les piliers sur lesquels repose toute blockchain. Chaque étape vous rapproche de la vision d'Anatoly Yakovenko.",
    modules: {
      decentralisation: {
        title: "La Décentralisation",
        subtitle: "Pourquoi distribuer le pouvoir ?",
      },
      blockchain: {
        title: "La Blockchain",
        subtitle: "Comment créer une chaîne de confiance ?",
      },
      wallet: {
        title: "Le Wallet",
        subtitle: "Votre identité dans le monde crypto",
      },
      seedphrase: { title: "La Seed Phrase", subtitle: "Votre clé de secours ultime" },
    },
  },
  badges: {
    decentralisation: "Architecte Réseau",
    blockchain: "Forgeur de Blocs",
    wallet: "Gardien des Clés",
    seedphrase: "Protecteur de Seeds",
    master: "Maître des Basics",
  },
  decentralisation: {
    // Phase 1
    phase1Title: "Le Problème",
    phase1Narrative:
      "\"Nous sommes en 2008. Le système financier mondial s'effondre. Les banques centrales contrôlent tout. Un mystérieux personnage, Satoshi Nakamoto, se pose une question fondamentale : Et si on pouvait supprimer les intermédiaires ?\"",
    defTitle: "📖 Définition",
    defText:
      "La décentralisation, c'est le fait de répartir le pouvoir entre plusieurs participants au lieu de le concentrer en un seul point. Imaginez une salle de classe : dans un système centralisé, un seul professeur corrige tous les examens. S'il est malade, personne n'est noté. Dans un système décentralisé, les étudiants se corrigent mutuellement. Même si l'un d'eux est absent, les autres continuent.",
    didYouKnowTitle: "💡 Le saviez-vous ?",
    didYouKnowText:
      "Bitcoin a été créé en 2009 comme première monnaie décentralisée. Aucune banque, aucun gouvernement ne le contrôle. Aujourd'hui, des milliers d'ordinateurs dans le monde entier maintiennent le réseau.",
    singlePointTitle: "Point Unique de Défaillance",
    singlePointText: "Si le nœud central échoue, tout le système s'effondre.",
    singlePointExample:
      "Imaginez si YouTube était sur un seul serveur : une panne et plus personne ne peut regarder de vidéos.",
    censorshipTitle: "Censure",
    censorshipText:
      "L'autorité centrale peut bloquer les transactions ou contrôler qui a accès.",
    censorshipExample:
      "C'est comme si votre banque pouvait décider de bloquer votre compte sans votre accord.",
    trustTitle: "Confiance Requise",
    trustText:
      "Vous devez faire confiance à une entité que vous ne contrôlez pas.",
    trustExample:
      "Quand vous utilisez PayPal, vous faites confiance à PayPal pour ne pas perdre votre argent.",
    // Phase 2
    phase2Title: "Décentralisez le réseau !",
    phase2Subtitle:
      "Le réseau est centralisé. Cliquez sur les nœuds pour créer des connexions entre eux et éliminer le point central.",
    phase2Mission:
      "Votre mission : transformer ce réseau centralisé en réseau décentralisé. Connectez les noeuds entre eux pour que même si un noeud tombe en panne, le réseau continue de fonctionner.",
    phase2KeyConceptsTitle: "🔑 Notions clés",
    phase2KeyConceptsText:
      "Dans le réseau Solana, plus de 1 900 validateurs répartis dans le monde entier vérifient les transactions. Si un validateur s'arrête, les autres continuent sans interruption.",
    phase2Connections: "Connexions:",
    phase2MinConnections: "Chaque nœud doit avoir au minimum 2 connexions",
    phase2HowToPlay:
      "💡 Comment jouer: Cliquez sur un nœud pour le sélectionner (il devient jaune), puis cliquez sur un autre nœud pour créer une connexion.",
    // Phase 3
    phase3Title: "La Révélation",
    phase3Narrative:
      "\"Bravo ! Vous venez de comprendre le principe fondamental de la décentralisation. C'est exactement cette vision qui a inspiré Anatoly Yakovenko quand il a commencé à imaginer Solana en 2017.\"",
    phase3PeerDefTitle: "📖 Définition",
    phase3PeerDefText:
      "Réseau peer-to-peer : un réseau où chaque participant est à la fois client et serveur. Pas de chef, tout le monde est égal. C'est comme un groupe WhatsApp où tout le monde peut envoyer des messages à tout le monde, sans passer par un administrateur.",
    phase3DidYouKnowTitle: "💡 Le saviez-vous ?",
    phase3DidYouKnowText:
      "Solana peut traiter jusqu'à 65 000 transactions par seconde grâce à sa technologie unique appelée Proof of History. C'est plus rapide que Visa !",
    phase3KeyPointsTitle: "🔑 Notions clés",
    phase3KeyPoints: [
      "Un réseau centralisé dépend d'un seul point → fragile",
      "Un réseau décentralisé répartit le pouvoir → résilient",
      "La décentralisation est le fondement de toutes les blockchains, dont Solana",
    ],
  },
  blockchain: {
    // Header
    headerTitle: "La Blockchain",
    headerSubtitle: "Apprenez les secrets de la technologie révolutionnaire",
    // Phase 1
    phase1Narrative:
      "\"Maintenant que vous comprenez la décentralisation, une question se pose : comment faire confiance aux autres sans intermédiaire ? La réponse : une chaîne de blocs, où chaque maillon prouve l'intégrité du précédent.\"",
    defHashTitle: "📖 Définition — Hash",
    defHashText:
      "Un hash, c'est comme une empreinte digitale pour les données. Peu importe la taille du fichier (un SMS ou un film entier), le hash sera toujours de la même longueur. Et si vous changez ne serait-ce qu'une seule lettre, le hash change complètement. C'est ce qui rend la blockchain infalsifiable.",
    didYouKnowGenesisTitle: "💡 Le saviez-vous ?",
    didYouKnowGenesisText:
      "Le premier bloc d'une blockchain s'appelle le Genesis Block (bloc de genèse). Celui de Bitcoin, créé le 3 janvier 2009, contenait un message caché : le titre d'un article du journal The Times sur la crise bancaire.",
    keyConceptsBlockTitle: "🔑 Notions clés",
    keyConceptsBlockText:
      "Chaque bloc contient : des données (les transactions), le hash du bloc précédent (le lien vers le bloc d'avant), et son propre hash (son empreinte unique). C'est comme une chaîne où chaque maillon est soudé au précédent.",
    // Phase 2
    phase2Title: "Le Mini-Jeu — Forgez la Chaîne",
    phase2Subtitle:
      "Construisez une blockchain de 4 blocs en entrant des données de transaction",
    phase2Narrative:
      "\"Vous êtes maintenant un mineur. Votre travail : prendre les transactions en attente, les regrouper dans un bloc, et calculer le hash qui scellera ce bloc pour toujours dans la chaîne.\"",
    phase2KeyConceptsTitle: "🔑 Notions clés",
    phase2KeyConceptsText:
      "Sur Solana, les validateurs (l'équivalent des mineurs) créent un nouveau bloc toutes les 400 millisecondes. C'est 25 fois plus rapide qu'Ethereum et 1 500 fois plus rapide que Bitcoin !",
    phase2BlockLabel: "Bloc #",
    phase2InputLabel: "Données de transaction",
    phase2InputPlaceholder: "ex: Alice envoie 5 SOL à Bob",
    phase2Mining: "Mining en cours...",
    phase2MineButton: "Miner le bloc",
    phase2ChainComplete: "Chaîne Complète !",
    phase2ChainCompleteText:
      "Vous avez forgé votre première blockchain avec succès !",
    phase2Revelation: "La Révélation",
    // Phase 3
    phase3Narrative:
      "\"Vous venez de forger votre première blockchain ! Chaque bloc est lié au précédent par son hash. Modifier un seul bloc casserait toute la chaîne. C'est cette immutabilité qui rend la blockchain révolutionnaire. Anatoly Yakovenko a vu cela et s'est dit : comment rendre cette chaîne 1000 fois plus rapide ?\"",
    defImmutabilityTitle: "📖 Définition — Immutabilité",
    defImmutabilityText:
      "Une fois qu'un bloc est ajouté à la chaîne, il est pratiquement impossible de le modifier. Pour tricher, il faudrait recalculer le hash de ce bloc ET de tous les blocs suivants, plus vite que l'ensemble du réseau. C'est mathématiquement quasi-impossible.",
    phase3DidYouKnowTitle: "💡 Le saviez-vous ?",
    phase3DidYouKnowText:
      "Anatoly Yakovenko, le créateur de Solana, a inventé le Proof of History (Preuve d'Historique). Au lieu que les validateurs se mettent d'accord sur l'heure de chaque transaction (ce qui prend du temps), Solana utilise une horloge intégrée à la blockchain. Résultat : des transactions quasi-instantanées.",
    phase3KeyPointsTitle: "🔑 Notions clés",
    phase3KeyPoints: [
      "Un hash est une empreinte digitale unique pour chaque bloc",
      "Chaque bloc est lié au précédent, formant une chaîne infalsifiable",
      "Solana utilise le Proof of History pour être ultra-rapide",
    ],
    backToBasics: "Retour aux Bases",
    nextWallet: "Suivant : Les Portefeuilles",
  },
  login: {
    title: "Connexion",
    subtitle: "Connectez-vous pour sauvegarder votre progression et gagner des badges.",
    loginButton: "Se connecter",
    orContinue: "ou continuer sans compte",
    backHome: "Retour à l'accueil",
  },
  dashboard: {
    title: "Tableau de bord",
    subtitle: "Suivez votre progression dans l'aventure Solana",
    welcomeBack: "Content de vous revoir",
    walletLabel: "Wallet Solana",
    emailLabel: "Email",
    progressTitle: "Votre progression",
    noProgress: "Vous n'avez pas encore complété de modules. Commencez l'aventure !",
    moduleCompleted: "Complété",
    totalXp: "XP Total",
    badgesEarned: "Badges obtenus",
    continueLearn: "Continuer l'apprentissage",
    logout: "Se déconnecter",
  },
  wallet: {
    // Header
    headerTitle: "Le Wallet",
    headerSubtitle: "Maîtrisez les clés de votre identité numérique",
    backToBasics: "Retour aux Basics",
    // Story phase
    storyIntro:
      "Vous avez compris la décentralisation et la blockchain. Mais comment prouver que VOUS êtes bien vous dans ce monde sans autorité centrale ?",
    storyKeySystem:
      "Il faut un système d'identité révolutionnaire : la cryptographie à clé publique",
    publicKeyTitle: "Clé Publique",
    publicKeyDesc: "L'adresse de votre boîte aux lettres",
    publicKeyProps: [
      "✓ Tout le monde la connaît",
      "✓ N'importe qui peut vous envoyer des fonds",
      "✓ C'est votre identité publique",
    ],
    privateKeyTitle: "Clé Privée",
    privateKeyDesc: "La clé qui ouvre votre boîte",
    privateKeyProps: [
      "✓ SEULEMENT vous la connaissez",
      "✓ Elle contrôle vos fonds",
      "✗ JAMAIS la partager",
    ],
    secretLabel: "⚠️ SECRET",
    defWalletTitle: "📖 Définition — Wallet (Portefeuille)",
    defWalletText:
      "Contrairement à ce que son nom suggère, un wallet ne stocke pas vos cryptos. Il stocke vos clés. Vos cryptos sont sur la blockchain. Le wallet, c'est juste la télécommande qui vous permet d'y accéder.",
    didYouKnowWalletsTitle: "💡 Le saviez-vous ?",
    didYouKnowWalletsText:
      "Il existe plusieurs types de wallets : les hot wallets (connectés à Internet, comme Phantom sur votre navigateur) et les cold wallets (hors-ligne, comme une clé USB Ledger). Plus c'est déconnecté d'Internet, plus c'est sécurisé.",
    keyConceptsPhantomTitle: "🔑 Notions clés",
    keyConceptsPhantomText:
      "Sur Solana, l'extension Phantom est le wallet le plus populaire. En quelques clics, vous pouvez créer un wallet, recevoir des SOL, et interagir avec des applications décentralisées (dApps).",
    storySummary:
      "Votre wallet, c'est cette paire de clés. La clé publique est votre adresse, la clé privée votre pouvoir.",
    storyNextButton: "Suivant: Créez Votre Wallet",
    // Entropy step
    entropyTitle: "Étape 1: Générer l'Entropie",
    entropySubtitle:
      "Bougez votre souris de manière aléatoire pour créer de l'entropie (au moins 30 mouvements uniques)",
    defEntropyTitle: "📖 Définition — Entropie",
    defEntropyText:
      "L'entropie, c'est le hasard pur. Pour créer une clé privée sécurisée, il faut un nombre vraiment aléatoire. Vos mouvements de souris sont imprévisibles, c'est parfait pour générer ce hasard. C'est comme mélanger un jeu de cartes : plus vous mélangez, plus c'est difficile à deviner.",
    entropyCollected: "Entropie collectée",
    entropyReady: "✓ Entropie suffisante !",
    // Derivation step
    derivationTitle: "Étape 2: Dériver les Clés",
    derivationSubtitle: "Observez comment l'entropie génère vos clés",
    keyConceptsDerivationTitle: "🔑 Notions clés",
    keyConceptsDerivationText:
      "De votre entropie naît la clé privée (votre secret). De la clé privée, on dérive mathématiquement la clé publique (votre adresse). Ce calcul est à sens unique : on peut aller de la clé privée vers la clé publique, mais jamais l'inverse. C'est comme transformer un oeuf en omelette : impossible de revenir en arrière.",
    entropyLabel: "Entropie",
    privateKeyLabel: "Clé Privée",
    publicKeyLabel: "Clé Publique",
    // Wallet display step
    walletStepTitle: "Étape 3: Votre Wallet",
    walletStepSubtitle: "Voici votre première adresse Solana",
    addressLabel: "Adresse",
    addressHint: "💡 Partagez cette adresse pour recevoir des SOL",
    privateKeyWarningTitle: "Secret: Ne JAMAIS partager votre clé privée",
    privateKeyWarningText:
      "Votre clé privée est masquée pour votre sécurité. Quiconque possède cette clé contrôle vos fonds.",
    balanceLabel: "Balance",
    balanceReady: "Prêt à recevoir des tokens !",
    finishButton: "Terminer et Recevoir le Badge",
    // Reveal phase
    revealTitle: "Félicitations !",
    revealSubtitle: "Vous possédez maintenant votre propre wallet",
    didYouKnowActiveTitle: "💡 Le saviez-vous ?",
    didYouKnowActiveText:
      "En janvier 2025, l'écosystème Solana compte plus de 2 millions de wallets actifs quotidiennement. C'est l'une des blockchains les plus utilisées au monde.",
    revealNarrative1:
      "Dans l'univers Solana, cette paire de clés est votre passeport. Anatoly Yakovenko a conçu Solana pour que des millions de wallets puissent interagir simultanément, à la vitesse de la lumière.",
    revealNarrative2:
      "Vous êtes maintenant prêt à explorer l'écosystème Solana.",
    keyPointsTitle: "🔑 Notions clés",
    keyPoints: [
      "Un wallet est une paire de clés : publique (votre adresse) et privée (votre pouvoir)",
      "La clé privée ne doit JAMAIS être partagée",
      "L'entropie (le hasard) est la base de la sécurité de votre wallet",
      "Solana utilise le format d'adresse Base58 pour des adresses lisibles",
    ],
    masterBadgeTitle: "Maître des Basics",
    masterBadgeText:
      "Vous avez complété les trois modules fondamentaux !",
  },
  seedphrase: {
    headerTitle: "La Seed Phrase",
    headerSubtitle: "Votre clé de secours ultime",
    backToBasics: "Retour aux Basics",
    storyIntro: "Vous avez créé votre wallet et compris le système de clés. Mais que se passe-t-il si vous perdez votre appareil ? Si votre ordinateur tombe en panne ? Il existe un filet de sécurité ultime...",
    storyAnalogy: "Imaginez votre seed phrase comme la clé maîtresse de tout votre royaume crypto. Avec ces 12 ou 24 mots, vous pouvez reconstruire l'intégralité de vos wallets, où que vous soyez.",
    defSeedTitle: "📖 Définition — Seed Phrase",
    defSeedText: "La seed phrase (ou phrase mnémonique) est une suite de 12 ou 24 mots générés aléatoirement selon le standard BIP39. Ces mots, dans le bon ordre, permettent de régénérer toutes les clés privées de vos wallets. C'est votre sauvegarde ultime.",
    keyConceptsTitle: "🔑 Notions clés",
    keyConceptsText: "La seed phrase est générée à partir d'une liste de 2048 mots anglais (standard BIP39). L'ordre des mots est crucial : changer un seul mot ou inverser deux mots donne un wallet complètement différent. De la seed phrase, on dérive mathématiquement toutes vos clés privées.",
    didYouKnowTitle: "💡 Le saviez-vous ?",
    didYouKnowText: "La probabilité de deviner une seed phrase de 12 mots est de 1 sur 2^128, soit environ 340 000 000 000 000 000 000 000 000 000 000 000 000 combinaisons possibles. C'est plus que le nombre d'atomes dans le système solaire !",
    storySummary: "Votre seed phrase est le secret ultime. Quiconque la possède contrôle tous vos wallets. Protégez-la comme un trésor.",
    storyNextButton: "Suivant : Testez vos connaissances",
    phase2Title: "Le Défi de la Seed Phrase",
    phase2Subtitle: "Prouvez que vous pouvez sécuriser une seed phrase",
    phase2Narrative: "Un wallet vient d'être créé. Voici sa seed phrase de 12 mots. Mémorisez l'ordre, puis replacez-les correctement.",
    phase2Memorize: "Mémorisez ces 12 mots dans l'ordre :",
    phase2Scrambled: "Replacez les mots dans le bon ordre :",
    phase2Instruction: "Cliquez sur les mots dans l'ordre correct pour reconstituer la seed phrase.",
    phase2Success: "Parfait ! Seed phrase reconstituée avec succès !",
    phase2Retry: "L'ordre n'est pas correct. Réessayez !",
    phase2FinishButton: "Terminer et Recevoir le Badge",
    revealTitle: "Félicitations !",
    revealSubtitle: "Vous maîtrisez la protection des seed phrases",
    revealNarrative1: "Vous savez désormais ce qu'est une seed phrase et pourquoi elle est si importante. Dans l'écosystème Solana, chaque wallet Phantom génère une seed phrase lors de sa création.",
    revealNarrative2: "La règle d'or : ne jamais la partager, ne jamais la stocker numériquement. Écrivez-la sur papier et conservez-la en lieu sûr.",
    didYouKnowRevealTitle: "💡 Le saviez-vous ?",
    didYouKnowRevealText: "Des milliards de dollars en crypto ont été perdus à jamais parce que leurs propriétaires ont perdu leur seed phrase. En 2013, un homme a jeté un disque dur contenant 7 500 bitcoins — aujourd'hui, il cherche encore dans la décharge.",
    keyPointsTitle: "🔑 Notions clés",
    keyPoints: [
      "La seed phrase est une suite de 12 ou 24 mots qui permet de restaurer tous vos wallets",
      "Ne JAMAIS la partager, la photographier ou la stocker en ligne",
      "L'écrire sur papier et la conserver dans un endroit sûr (coffre-fort)",
      "L'ordre des mots est crucial — un seul mot inversé = un wallet différent",
    ],
    allCompletedTitle: "Maître des Basics",
    allCompletedText: "Vous avez complété les quatre modules fondamentaux ! Vous êtes prêt pour le prochain chapitre de l'aventure Solana.",
  },
};
