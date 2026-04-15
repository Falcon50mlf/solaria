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
    chaptersTitle: "Les Chapitres",
    chapterModules: "modules",
    exploreWithoutAccount: "Explorer sans compte",
    backToDashboard: "Retour au tableau de bord",
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
        backDescription: "Découvrez pourquoi distribuer le pouvoir rend un réseau plus résistant. Vous construirez un réseau décentralisé en connectant des nœuds entre eux.",
      },
      blockchain: {
        title: "La Blockchain",
        subtitle: "Comment créer une chaîne de confiance ?",
        backDescription: "Comprenez comment les blocs forment une chaîne infalsifiable. Vous minerez vos propres blocs et créerez une mini-blockchain.",
      },
      wallet: {
        title: "Le Wallet",
        subtitle: "Votre identité dans le monde crypto",
        backDescription: "Apprenez le système de clés publique/privée. Vous générerez votre propre wallet en créant de l'entropie avec votre souris.",
      },
      seedphrase: { title: "La Seed Phrase", subtitle: "Votre clé de secours ultime", backDescription: "Maîtrisez la phrase de récupération qui protège tous vos wallets. Vous devrez mémoriser et reconstituer une seed phrase de 12 mots." },
      transactions: { title: "Les Transactions", subtitle: "Envoyer et recevoir des SOL", backDescription: "Simulez l'envoi de SOL sur le réseau Solana. Vous signerez une transaction et verrez la confirmation en temps réel." },
      consensus: { title: "Le Consensus", subtitle: "Comment le réseau se met d'accord", backDescription: "Comprenez comment Solana se met d'accord grâce au Proof of History. Quiz sur le consensus, le PoS et les 65 000 TPS de Solana." },
      validators: { title: "Les Validateurs", subtitle: "Les gardiens du réseau Solana", backDescription: "Découvrez les gardiens du réseau Solana. Quiz sur le staking, la délégation et les 1 900+ validateurs du réseau." },
      explorer: { title: "L'Explorateur Blockchain", subtitle: "Lisez la blockchain comme un livre ouvert", backDescription: "Apprenez à lire la blockchain avec Solscan. Vous découvrirez votre propre adresse wallet sur la blockchain Solana." },
    },
  },
  badges: {
    decentralisation: "Architecte Réseau",
    blockchain: "Forgeur de Blocs",
    wallet: "Gardien des Clés",
    seedphrase: "Protecteur de Seeds",
    transactions: "Maître des Transactions",
    consensus: "Maître du Consensus",
    validators: "Gardien du Réseau",
    explorer: "Détective On-Chain",
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
    phase2Connections: "Nœuds sécurisés :",
    phase2MinConnections: "Chaque nœud doit avoir au minimum 2 connexions pour être sécurisé",
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
    chaptersTitle: "Vos chapitres",
    chapterProgress: "de progression",
    chapterModules: "modules",
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
  transactions: {
    headerTitle: "Les Transactions",
    headerSubtitle: "Envoyer et recevoir des SOL sur Solana",
    backToBasics: "Retour aux Basics",
    // Phase 1 - Story
    storyIntro:
      "Vous avez un wallet et une seed phrase sécurisée. Il est maintenant temps de donner vie à votre wallet en effectuant votre première transaction. C'est le moment où tout devient concret.",
    storyAnalogy:
      "Une transaction, c'est comme envoyer une lettre recommandée : vous écrivez le destinataire, le montant, vous signez avec votre clé privée... mais contrairement à La Poste, c'est instantané et vérifiable par tout le monde sur la blockchain.",
    defTransactionTitle: "📖 Définition — Transaction",
    defTransactionText:
      "Une transaction sur Solana est une instruction signée avec votre clé privée qui transfère des SOL d'une adresse à une autre. Elle est vérifiée par les validateurs du réseau et enregistrée de manière permanente sur la blockchain. Une fois confirmée, elle est irréversible.",
    keyConceptsTitle: "🔑 Notions clés",
    keyConceptsText:
      "Chaque transaction sur Solana implique des frais minimes (~0.000005 SOL, soit environ $0.001). La confirmation prend environ 400 millisecondes. Une fois finalisée, la transaction est gravée pour toujours dans la blockchain. Chaque transaction possède une signature unique (hash) qui permet de la retrouver et de la vérifier.",
    didYouKnowTitle: "💡 Le saviez-vous ?",
    didYouKnowText:
      "Solana traite environ 4 000 transactions par seconde en pratique, avec des frais moyens de $0.00025 par transaction. C'est l'une des blockchains les moins chères au monde, rendant les micro-transactions enfin viables.",
    storySummary:
      "Une transaction = une instruction signée par votre clé privée, vérifiée par les validateurs, et enregistrée pour toujours sur la blockchain.",
    storyNextButton: "Suivant : Simulez votre première transaction",
    // Phase 2 - Mini-game
    phase2Title: "Votre Première Transaction",
    phase2Subtitle: "Simulez l'envoi de SOL",
    phase2Narrative:
      "Vous avez 10 SOL dans votre wallet. Envoyez des SOL à un ami pour tester le réseau.",
    phase2FromLabel: "De (votre wallet)",
    phase2ToLabel: "Vers (destinataire)",
    phase2AmountLabel: "Montant (SOL)",
    phase2AmountPlaceholder: "ex: 2.5",
    phase2FeesLabel: "Frais de réseau",
    phase2SignButton: "Signer et Envoyer",
    phase2Signing: "Signature en cours...",
    phase2Confirmed: "Transaction Confirmée !",
    phase2ConfirmedText:
      "Votre transaction a été validée par les validateurs et enregistrée sur la blockchain Solana.",
    phase2TxHash: "Signature de transaction",
    phase2FinishButton: "Terminer et Recevoir le Badge",
    // Phase 3 - Reveal
    revealTitle: "Félicitations !",
    revealSubtitle: "Vous maîtrisez les transactions Solana",
    revealNarrative1:
      "Vous comprenez désormais le cycle complet d'une transaction : de sa création à sa confirmation par les validateurs, en passant par la signature avec votre clé privée. Chaque transaction est un acte irréversible inscrit dans l'histoire de la blockchain.",
    revealNarrative2:
      "La règle d'or : vérifiez toujours l'adresse du destinataire et le montant avant de signer. Une transaction confirmée ne peut jamais être annulée.",
    didYouKnowRevealTitle: "💡 Le saviez-vous ?",
    didYouKnowRevealText:
      "Solana utilise un système unique de parallélisation des transactions appelé Sealevel. Contrairement aux autres blockchains qui traitent les transactions une par une, Sealevel permet d'exécuter des milliers de smart contracts simultanément, comme une autoroute à voies multiples au lieu d'une route à sens unique.",
    keyPointsTitle: "🔑 Notions clés",
    keyPoints: [
      "Une transaction est une instruction signée qui transfère des SOL entre deux adresses",
      "Les frais sur Solana sont parmi les plus bas (~$0.00025 par transaction)",
      "Chaque transaction possède une signature unique pour la tracer sur la blockchain",
      "Une transaction confirmée est irréversible — vérifiez toujours avant de signer",
    ],
  },
  consensus: {
    headerTitle: "Le Consensus",
    headerSubtitle: "Comment le réseau se met d'accord",
    backToBasics: "Retour aux Basics",
    storyIntro: "Vous savez maintenant envoyer des transactions. Mais qui décide si une transaction est valide ? Comment des milliers d'ordinateurs dans le monde entier se mettent-ils d'accord sans chef ? C'est le problème du consensus.",
    storyAnalogy: "Imaginez une salle de classe de 1 000 élèves sans professeur. Tout le monde doit se mettre d'accord sur la bonne réponse à un exercice. Le consensus, c'est la méthode utilisée pour y arriver — sans tricher, sans qu'un seul élève puisse imposer sa réponse.",
    defConsensusTitle: "📖 Définition — Consensus",
    defConsensusText: "Le consensus est le mécanisme par lequel tous les nœuds d'un réseau blockchain s'accordent sur l'état actuel de la chaîne. Sans consensus, impossible de savoir quelle version de la blockchain est la \"vraie\". C'est le cœur de toute blockchain.",
    powVsPosTitle: "📖 Définition — PoW vs PoS",
    powVsPosText: "Le Proof of Work (Bitcoin) demande aux mineurs de résoudre des calculs complexes — c'est comme une compétition de maths très énergivore. Le Proof of Stake (Solana, Ethereum) sélectionne les validateurs en fonction de la quantité de tokens qu'ils mettent en jeu (staking). Plus vous stakez, plus vous avez de chances d'être choisi pour valider un bloc. C'est plus rapide et bien moins gourmand en énergie.",
    pohTitle: "🔑 Notions clés — Proof of History",
    pohText: "L'innovation majeure de Solana : le Proof of History (PoH). Avant Solana, les validateurs devaient communiquer entre eux pour se mettre d'accord sur l'heure de chaque transaction — ce qui prenait du temps. Anatoly Yakovenko a inventé une horloge cryptographique intégrée à la blockchain. Chaque transaction reçoit un timestamp vérifiable. Résultat : les validateurs n'ont plus besoin de se synchroniser, les blocs sont produits toutes les 400 millisecondes.",
    keyConceptsTitle: "🔑 Notions clés",
    keyConceptsText: "Solana combine Proof of History + Proof of Stake. Le PoH fournit l'horloge (l'ordre des événements), le PoS fournit la sécurité (les validateurs stakent des SOL pour participer). Cette combinaison permet à Solana de traiter jusqu'à 65 000 transactions par seconde avec une finalité en 400ms.",
    didYouKnowTitle: "💡 Le saviez-vous ?",
    didYouKnowText: "Bitcoin consomme autant d'énergie que certains pays entiers pour son Proof of Work. Solana, grâce au Proof of Stake, consomme environ 0,00051 kWh par transaction — l'équivalent de deux recherches Google. C'est 99,9% plus efficace énergétiquement.",
    storySummary: "Le consensus est la règle du jeu qui empêche la triche dans un réseau sans chef. Solana utilise le Proof of History + Proof of Stake pour être ultra-rapide et écologique.",
    storyNextButton: "Suivant : Testez vos connaissances",
    phase2Title: "Quiz : Le Consensus",
    phase2Subtitle: "Vérifiez que vous avez compris le consensus sur Solana",
    phase2Narrative: "Répondez aux questions suivantes pour valider vos connaissances sur le consensus.",
    quizQuestions: [
      {
        question: "Quel mécanisme de consensus utilise Solana ?",
        options: ["Proof of Work", "Proof of History + Proof of Stake", "Proof of Authority", "Delegated Proof of Stake"],
        correctIndex: 1,
        explanation: "Solana combine le Proof of History (horloge cryptographique) et le Proof of Stake (validation par staking de SOL).",
      },
      {
        question: "Quelle est l'innovation principale du Proof of History ?",
        options: ["Il mine des blocs plus vite", "Il fournit un timestamp vérifiable sans synchronisation entre validateurs", "Il utilise moins d'électricité", "Il remplace les validateurs par des algorithmes"],
        correctIndex: 1,
        explanation: "Le PoH crée une horloge cryptographique qui ordonne les événements sans que les validateurs aient besoin de communiquer entre eux.",
      },
      {
        question: "Combien de transactions par seconde Solana peut-il traiter théoriquement ?",
        options: ["1 000 TPS", "7 TPS", "65 000 TPS", "100 TPS"],
        correctIndex: 2,
        explanation: "Grâce au PoH + PoS, Solana peut théoriquement traiter jusqu'à 65 000 transactions par seconde.",
      },
      {
        question: "Qu'est-ce que le staking dans le Proof of Stake ?",
        options: ["Miner des cryptos avec un ordinateur puissant", "Bloquer des SOL pour participer à la validation du réseau", "Acheter des tokens à prix réduit", "Créer un nouveau token"],
        correctIndex: 1,
        explanation: "Le staking consiste à bloquer des SOL comme garantie pour devenir validateur et sécuriser le réseau.",
      },
    ],
    phase2Success: "Excellent ! Vous maîtrisez le consensus Solana !",
    phase2FinishButton: "Terminer et Recevoir le Badge",
    revealTitle: "Félicitations !",
    revealSubtitle: "Vous comprenez comment Solana atteint le consensus",
    revealNarrative1: "Vous savez maintenant comment des milliers de machines se mettent d'accord sans intermédiaire. Le Proof of History est ce qui rend Solana unique : une horloge intégrée qui élimine le besoin de synchronisation.",
    revealNarrative2: "Grâce à cette innovation, Solana est l'une des blockchains les plus rapides au monde, capable de rivaliser avec les systèmes de paiement traditionnels comme Visa.",
    didYouKnowRevealTitle: "💡 Le saviez-vous ?",
    didYouKnowRevealText: "Anatoly Yakovenko, le fondateur de Solana, a eu l'idée du Proof of History en 2017 en s'inspirant du fonctionnement des réseaux de télécommunications. Avant de fonder Solana, il travaillait chez Qualcomm sur des systèmes de communication sans fil.",
    keyPointsTitle: "🔑 Notions clés",
    keyPoints: [
      "Le consensus permet à un réseau décentralisé de se mettre d'accord sans chef",
      "Solana combine Proof of History (horloge) + Proof of Stake (sécurité)",
      "Le PoH élimine le besoin de synchronisation entre validateurs",
      "Solana peut traiter 65 000 TPS avec une finalité en 400ms",
    ],
  },
  validators: {
    headerTitle: "Les Validateurs",
    headerSubtitle: "Les gardiens du réseau Solana",
    backToBasics: "Retour aux Basics",
    storyIntro: "Vous comprenez maintenant le consensus. Mais qui sont concrètement ces machines qui valident les transactions ? Ce sont les validateurs — les gardiens du réseau Solana.",
    storyAnalogy: "Imaginez une banque sans employés. Les validateurs sont comme des volontaires qui vérifient chaque chèque gratuitement — ou presque. En échange de leur travail, ils reçoivent des récompenses en SOL. Plus ils sont honnêtes et rapides, plus ils gagnent.",
    defValidatorTitle: "📖 Définition — Validateur",
    defValidatorText: "Un validateur est un ordinateur qui participe au réseau Solana en vérifiant les transactions et en produisant des blocs. Pour devenir validateur, il faut faire tourner un logiciel spécial et staker des SOL. Les validateurs sont récompensés en SOL pour leur travail. Sur Solana, il y a plus de 1 900 validateurs actifs répartis dans le monde entier.",
    stakingTitle: "📖 Définition — Le Staking",
    stakingText: "Le staking, c'est bloquer des SOL pour participer à la sécurisation du réseau. C'est comme déposer une caution : si le validateur triche ou tombe en panne, il peut perdre une partie de ses SOL stakés (c'est le slashing). En échange, les validateurs honnêtes reçoivent des récompenses. N'importe qui peut aussi déléguer ses SOL à un validateur de confiance et recevoir une part des récompenses — sans avoir besoin de faire tourner son propre serveur.",
    keyConceptsTitle: "🔑 Notions clés",
    keyConceptsText: "Un validateur sur Solana produit un bloc toutes les 400ms. Le leader (validateur choisi) utilise le Proof of History pour ordonner les transactions, puis les autres validateurs vérifient et confirment. Le système de rotation assure qu'aucun validateur ne contrôle le réseau en permanence. Plus il y a de validateurs, plus le réseau est décentralisé et résistant.",
    didYouKnowTitle: "💡 Le saviez-vous ?",
    didYouKnowText: "Sur Solana, n'importe qui peut devenir validateur avec le bon matériel. Un validateur typique a besoin d'un processeur puissant (12+ cœurs), 512 Go de RAM et une connexion Internet rapide. Les plus gros validateurs stakent des millions de SOL et génèrent des revenus significatifs.",
    storySummary: "Les validateurs sont les piliers du réseau Solana. Ils vérifient les transactions, produisent les blocs et sont récompensés en SOL. Grâce au staking et à la délégation, tout le monde peut participer à la sécurisation du réseau.",
    storyNextButton: "Suivant : Testez vos connaissances",
    phase2Title: "Quiz : Les Validateurs",
    phase2Subtitle: "Testez vos connaissances sur les validateurs Solana",
    phase2Narrative: "Répondez aux questions pour valider votre compréhension des validateurs.",
    quizQuestions: [
      {
        question: "Combien de validateurs actifs compte le réseau Solana environ ?",
        options: ["50", "500", "1 900+", "10 000"],
        correctIndex: 2,
        explanation: "Le réseau Solana compte plus de 1 900 validateurs actifs répartis dans le monde entier.",
      },
      {
        question: "Que doit faire un validateur pour participer au réseau ?",
        options: ["Acheter un token spécial NFT", "Staker des SOL et faire tourner un logiciel de validation", "Résoudre des calculs mathématiques complexes", "Être approuvé par la Solana Foundation"],
        correctIndex: 1,
        explanation: "Un validateur stake des SOL comme garantie et fait tourner le logiciel de validation sur un serveur performant.",
      },
      {
        question: "Qu'est-ce que la délégation de staking ?",
        options: ["Vendre ses SOL à un validateur", "Confier ses SOL à un validateur pour gagner des récompenses sans gérer de serveur", "Créer un nouveau validateur", "Voter pour un validateur dans une élection"],
        correctIndex: 1,
        explanation: "La délégation permet de confier ses SOL à un validateur de confiance. Vous recevez une part des récompenses sans avoir besoin de matériel spécialisé.",
      },
      {
        question: "Que se passe-t-il si un validateur triche ?",
        options: ["Rien, il continue normalement", "Il est banni à vie du réseau", "Il peut perdre une partie de ses SOL stakés (slashing)", "Son ordinateur est détruit à distance"],
        correctIndex: 2,
        explanation: "Le slashing est un mécanisme de sanction : un validateur malhonnête peut perdre une partie de ses SOL stakés.",
      },
    ],
    phase2Success: "Bravo ! Vous connaissez le fonctionnement des validateurs Solana !",
    phase2FinishButton: "Terminer et Recevoir le Badge",
    revealTitle: "Félicitations !",
    revealSubtitle: "Vous comprenez le rôle des validateurs dans Solana",
    revealNarrative1: "Les validateurs sont la colonne vertébrale de Solana. Sans eux, aucune transaction ne serait validée, aucun bloc ne serait produit. Ils assurent la sécurité et la décentralisation du réseau.",
    revealNarrative2: "Grâce au staking et à la délégation, même sans matériel spécialisé, vous pouvez contribuer à la sécurité du réseau et gagner des récompenses en SOL.",
    didYouKnowRevealTitle: "💡 Le saviez-vous ?",
    didYouKnowRevealText: "La Solana Foundation propose le programme Solana Delegation Program qui délègue des SOL aux validateurs performants et fiables, aidant ainsi les nouveaux validateurs à se lancer. L'objectif est de maximiser la décentralisation du réseau.",
    keyPointsTitle: "🔑 Notions clés",
    keyPoints: [
      "Un validateur vérifie les transactions et produit des blocs sur Solana",
      "Le staking consiste à bloquer des SOL comme garantie pour participer",
      "La délégation permet à tout le monde de gagner des récompenses sans serveur",
      "Plus de 1 900 validateurs sécurisent le réseau Solana dans le monde entier",
    ],
  },
  explorer: {
    headerTitle: "L'Explorateur Blockchain",
    headerSubtitle: "Lisez la blockchain comme un livre ouvert",
    backToBasics: "Retour aux Basics",
    storyIntro: "Vous savez comment fonctionne Solana : transactions, consensus, validateurs. Mais comment vérifier tout cela par vous-même ? Grâce à un explorateur blockchain — un outil qui vous permet de lire chaque transaction, chaque bloc, en temps réel.",
    storyAnalogy: "Un explorateur blockchain, c'est comme Google Maps pour la blockchain. Au lieu de chercher des rues, vous cherchez des transactions, des adresses et des blocs. Tout est public, tout est transparent, tout est vérifiable.",
    defExplorerTitle: "📖 Définition — Explorateur Blockchain",
    defExplorerText: "Un explorateur blockchain est un site web qui affiche toutes les données de la blockchain en temps réel. Sur Solana, les deux principaux explorateurs sont Solscan (solscan.io) et Solana Explorer (explorer.solana.com). Vous pouvez y rechercher n'importe quelle transaction, adresse ou bloc.",
    solscanTitle: "🔑 Notions clés — Solscan & Solana Explorer",
    solscanText: "Solscan (solscan.io) est l'explorateur le plus populaire de l'écosystème Solana. Il affiche les transactions, les tokens, les NFTs, les programmes et les statistiques du réseau. Solana Explorer (explorer.solana.com) est l'explorateur officiel de la Solana Foundation. Les deux sont gratuits et accessibles à tous.",
    readTxTitle: "📖 Définition — Lire une Transaction",
    readTxText: "Chaque transaction Solana contient : une signature (identifiant unique de 88 caractères), le statut (succès ou échec), les adresses impliquées (expéditeur et destinataire), le montant transféré, les frais payés (~0.000005 SOL), et le timestamp exact. Tout cela est public et vérifiable par n'importe qui.",
    keyConceptsTitle: "🔑 Notions clés",
    keyConceptsText: "Sur un explorateur, vous pouvez coller votre adresse wallet pour voir toutes vos transactions passées. Vous pouvez aussi coller une signature de transaction pour en voir les détails. C'est l'outil indispensable pour vérifier que vos transactions ont bien été confirmées.",
    didYouKnowTitle: "💡 Le saviez-vous ?",
    didYouKnowText: "Solscan traite des millions de requêtes par jour. En 2024, Solana a enregistré plus de 250 milliards de transactions depuis sa création. Chacune d'entre elles est consultable gratuitement sur l'explorateur — c'est la transparence absolue.",
    storySummary: "L'explorateur blockchain est votre fenêtre sur Solana. Chaque transaction, chaque bloc, chaque adresse est visible et vérifiable. C'est la transparence qui fait la force de la blockchain.",
    storyNextButton: "Suivant : Explorez par vous-même",
    phase2Title: "Exploration en Direct",
    phase2Subtitle: "Découvrez votre adresse et naviguez dans la blockchain",
    phase2Narrative: "Utilisez les outils ci-dessous pour explorer la blockchain Solana en temps réel.",
    yourWalletTitle: "Votre Adresse Solana",
    yourWalletText: "Voici votre adresse wallet réelle sur la blockchain Solana. Vous pouvez la chercher sur Solscan pour voir votre historique.",
    quizQuestions: [
      {
        question: "Quel est le rôle d'un explorateur blockchain ?",
        options: ["Miner des cryptomonnaies", "Afficher les données de la blockchain en temps réel", "Créer de nouveaux tokens", "Gérer les clés privées"],
        correctIndex: 1,
        explanation: "Un explorateur blockchain permet de consulter toutes les données de la blockchain : transactions, blocs, adresses, en temps réel.",
      },
      {
        question: "Quels sont les deux principaux explorateurs de Solana ?",
        options: ["Etherscan et Polygonscan", "Solscan et Solana Explorer", "Blockchain.com et BscScan", "Coinbase et Binance"],
        correctIndex: 1,
        explanation: "Solscan (solscan.io) et Solana Explorer (explorer.solana.com) sont les deux explorateurs principaux de l'écosystème Solana.",
      },
      {
        question: "Que contient une transaction Solana ?",
        options: ["Uniquement le montant envoyé", "La signature, le statut, les adresses, le montant, les frais et le timestamp", "Le mot de passe du wallet", "Le nom et prénom de l'expéditeur"],
        correctIndex: 1,
        explanation: "Une transaction contient une signature unique, le statut, les adresses impliquées, le montant, les frais (~0.000005 SOL) et le timestamp.",
      },
      {
        question: "Peut-on voir les transactions de n'importe quelle adresse sur Solana ?",
        options: ["Non, c'est privé", "Oui, la blockchain est publique et transparente", "Seulement avec un abonnement payant", "Seulement si l'utilisateur accepte"],
        correctIndex: 1,
        explanation: "La blockchain Solana est entièrement publique. N'importe qui peut consulter les transactions de n'importe quelle adresse sur un explorateur.",
      },
    ],
    phase2Success: "Parfait ! Vous savez naviguer dans la blockchain Solana !",
    phase2FinishButton: "Terminer et Recevoir le Badge",
    revealTitle: "Félicitations !",
    revealSubtitle: "Vous êtes un détective on-chain",
    revealNarrative1: "Vous savez maintenant lire la blockchain Solana comme un livre ouvert. Chaque transaction laisse une trace indélébile et vérifiable par tous. C'est la transparence qui distingue la blockchain des systèmes financiers traditionnels.",
    revealNarrative2: "Avec Solscan et Solana Explorer, vous avez les outils pour vérifier n'importe quelle transaction, suivre n'importe quelle adresse, et comprendre ce qui se passe sur le réseau en temps réel.",
    didYouKnowRevealTitle: "💡 Le saviez-vous ?",
    didYouKnowRevealText: "Les explorateurs blockchain sont aussi utilisés par les développeurs pour débugger leurs smart contracts, par les enquêteurs pour tracer les fonds volés, et par les chercheurs pour analyser l'activité du réseau. C'est un outil universel dans l'écosystème crypto.",
    keyPointsTitle: "🔑 Notions clés",
    keyPoints: [
      "Un explorateur blockchain affiche toutes les données de la blockchain en temps réel",
      "Solscan et Solana Explorer sont les deux principaux outils pour Solana",
      "Chaque transaction a une signature unique, un statut, des adresses, un montant et des frais",
      "La blockchain est publique : tout le monde peut vérifier n'importe quelle transaction",
    ],
    allCompletedTitle: "Maître des Basics",
    allCompletedText: "Vous avez complété les huit modules fondamentaux ! Vous maîtrisez les bases de l'écosystème Solana.",
  },
};
