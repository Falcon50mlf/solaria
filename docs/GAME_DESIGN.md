# GAME_DESIGN.md — Solaria
## Bible de game design pour les minigames pédagogiques
 
Ce document est la référence unique pour concevoir les activités ludiques des modules de Solaria. Il synthétise la recherche académique et les meilleures pratiques de l'industrie (Duolingo, Brilliant, serious games). **Toute nouvelle activité doit être évaluée contre ce document.**
 
---
 
## 1. Principes fondamentaux (non négociables)
 
### 1.1 Les 5 piliers du Digital Game-Based Learning
Source : Li & Tsai (2013), Plass et al. (2015), ERIC 2021 literature review.
 
1. **Interactivity** — le joueur agit, pas seulement observe. Chaque minigame doit exiger au moins une action directe de l'utilisateur (clic, drag, typing, move).
2. **Immersiveness** — contexte narratif + esthétique cohérente. Le joueur doit "être" quelque part, pas "faire un exercice".
3. **Adaptive problem-solving** — la difficulté s'ajuste. Pas d'échec catastrophique, pas de victoire triviale.
4. **Feedback** — immédiat, visible, informatif. Chaque action a un retour en < 200ms.
5. **Freedom of exploration** — plusieurs chemins pour réussir. Pas de "bonne réponse unique" quand évitable.
### 1.2 Les 3 conditions du flow (Csikszentmihalyi appliqué à l'éducation)
Source : Kiili (2005), Design Principles for Flow Experience in Educational Games.
 
- **Clear goals** — le joueur sait en 3 secondes ce qu'il doit faire
- **Balanced challenge** — juste au-dessus du niveau actuel (zone de développement proximal de Vygotsky)
- **Immediate feedback** — chaque action produit une réponse claire
**Règle d'or** : si un playtester de 10 ans ne comprend pas en 5 secondes ce qu'il doit faire, le design est cassé.
 
### 1.3 Les 16 principes de James Paul Gee (condensés en 6 pour Solaria)
 
1. **Identity** — le joueur incarne un rôle (dans Solaria : "Fondateur", explorateur de l'écosystème)
2. **Safe failure** — pas de game over définitif. Retry coûte 0.
3. **Discovery over telling** — on découvre par l'action, on ne lit pas de définition
4. **Just-in-time info** — l'info arrive au moment où elle devient utile, pas avant
5. **Sandbox first** — les premières tentatives sont assistées avant d'être notées
6. **Performance before competence** — on joue avant de "comprendre". La compréhension émerge.
---
 
## 2. Les 7 mécaniques ludiques validées pour Solaria
 
Ces mécaniques couvrent 95% des concepts pédagogiques du projet. **N'en inventer une nouvelle que si aucune n'est adaptable.**
 
### M1 — Drag & Drop Matching
**Concept pédagogique idéal** : associer des notions, catégoriser, ordonner.
**Exemples Solaria** :
- Associer une transaction à son validateur
- Classer des tokens par catégorie (utility, governance, memecoin)
- Ordonner les étapes d'une transaction Solana
**Implémentation** : `react-dnd` ou HTML5 drag native + Framer Motion pour les transitions.
**Durée cible** : 30-90 sec.
### M2 — Canvas Interactif (Generative Input)
**Concept pédagogique idéal** : créer quelque chose par l'action physique, rendre tangible l'abstrait.
**Exemples Solaria** :
- Le module Wallet existant (entropie souris → dérivation)
- Dessiner un réseau décentralisé vs centralisé
- Tracer une courbe de liquidité (bonding curve)
**Implémentation** : HTML5 Canvas API + requestAnimationFrame.
**Durée cible** : 45-120 sec.
### M3 — Node Connection / Graph Building
**Concept pédagogique idéal** : représenter des relations, des réseaux, des flux.
**Exemples Solaria** :
- Connecter des noeuds pour décentraliser (module existant)
- Construire un chemin de swap sur un AMM (SOL → USDC → JUP)
- Relier validateurs et délégateurs
**Implémentation** : SVG + Framer Motion pour les edges animées, ou une lib légère type `react-flow` si besoin.
**Durée cible** : 60-120 sec.
### M4 — Timing / Rhythm Challenge
**Concept pédagogique idéal** : faire comprendre la vitesse, la fréquence, le timing.
**Exemples Solaria** :
- Produce un bloc toutes les 400ms (TPS de Solana — 65k TPS ressenti)
- Clicker/trader dans un délai MEV
- Attraper les transactions avant qu'elles expirent (blockhash expiration)
**Implémentation** : setInterval + animation state. Très peu de code.
**Durée cible** : 30-60 sec.
### M5 — Decision Tree / Scenario Branching
**Concept pédagogique idéal** : sécurité, jugement, évaluation du risque.
**Exemples Solaria** :
- "Un wallet te DM sur Discord. Que fais-tu ?" (anti-phishing)
- "Tu vois un token avec 5000% APY. Tu investis combien ?" (risk management)
- "Quelle transaction signes-tu ?" (simulation de malicious signature)
**Implémentation** : state machine simple + AnimatePresence pour les transitions.
**Durée cible** : 60-180 sec.
### M6 — Typing / Completion Challenge
**Concept pédagogique idéal** : mémorisation, syntaxe, adresses.
**Exemples Solaria** :
- Compléter une adresse Solana (reconnaître les patterns base58)
- Taper une seed phrase dans le bon ordre
- Compléter une commande CLI Solana
**Implémentation** : input contrôlé + validation en temps réel.
**Durée cible** : 30-90 sec.
**Attention** : mécanique la plus "scolaire", à utiliser avec parcimonie.
### M7 — Simulation Sandbox
**Concept pédagogique idéal** : exploration libre, expérimentation.
**Exemples Solaria** :
- Simulateur de staking (slider APY, durée → rendement)
- Bonding curve interactive (slider supply → prix)
- Fee simulator (congestion → priority fee)
**Implémentation** : sliders + calculs live + graph (recharts ou SVG custom).
**Durée cible** : 60-300 sec (libre).
---
 
## 3. La structure en 3 phases de Solaria (rappel canonique)
 
Chaque module suit ce pattern strictement. Aucune exception.
 
### Phase 1 — STORY (60-120 sec de lecture)
- Contexte narratif : une situation, un problème, un "héros"
- Maximum 3 encadrés pédagogiques (📖 Définition / 🔑 Notions clés / 💡 Le saviez-vous)
- Un "cliffhanger" qui donne envie de jouer
### Phase 2 — MINIGAME (60-180 sec d'action)
- Une des 7 mécaniques ci-dessus
- Tutorial intégré : les 5 premières secondes montrent quoi faire
- Feedback immédiat à chaque action
- Safe failure : on peut retry sans perdre d'XP
- Victoire inévitable si on comprend — pas de challenge insurmontable
### Phase 3 — REVEAL (30-60 sec)
- Révélation du concept pédagogique "Voilà ce que tu viens de faire : c'est ça [nom du concept]"
- Attribution du badge + XP avec micro-animation (confetti, scale, glow)
- Récap en 3 bullets max
- CTA "Module suivant"
---
 
## 4. Micro-interactions obligatoires (le "feel")
 
Source : Duolingo design system analysis, Nielsen Norman Group.
 
### 4.1 Feedback instantané
- **Action correcte** : son léger (optionnel) + vert `--sol-green` + scale 1.05 → 1 en 200ms + sparkle SVG
- **Action incorrecte** : shake horizontal 300ms + rouge `--sol-accent` + remise en place sans pénalité
- **Transition de phase** : AnimatePresence mode="wait" + fade + slide 20px
### 4.2 Célébration de progrès
- **Badge unlock** : scale 0 → 1.2 → 1 avec spring + burst de particules
- **Level up** : pleine largeur avec gradient animé purple → green
- **XP earned** : compteur qui monte de façon animée (useMotionValue)
### 4.3 Anticipation et tension
- **Avant révélation** : compte à rebours visuel OU barre de progression qui se remplit
- **Avant minigame** : "Ready?" avec scale pulse
- **Fin de phase** : fade subtil + "Suivant →" qui bounce
### 4.4 Le "3D button" (inspiré Duolingo)
Les CTA principaux utilisent un pattern de bouton avec bordure basse épaisse qui disparaît au press :
```css
.cta-primary {
  box-shadow: 0 4px 0 var(--sol-purple-dark);
  transition: transform 100ms, box-shadow 100ms;
}
.cta-primary:active {
  transform: translateY(4px);
  box-shadow: 0 0 0 var(--sol-purple-dark);
}
```
 
---
 
## 5. Contraintes techniques Solaria (à respecter)
 
- **Stack** : Next.js 16, React 19, Tailwind v4, Framer Motion 12, Lucide React
- **Pas de canvas-heavy library** : pas de Three.js, pas de Pixi.js, pas de Phaser. Tout se fait en SVG / Canvas natif / DOM + Framer Motion
- **Pas de lib de jeu externe** : pas de Matter.js (physics), pas de GSAP — Framer Motion suffit
- **State** : externe via `useSyncExternalStore` (pattern `gameState.ts` existant)
- **Pas de SSR** : `dynamic({ ssr: false })` pour tout minigame
- **Mobile friendly** : tout minigame doit être jouable sur écran 375px. Tap > hover.
- **Pas de dépendance audio** : si son, optionnel et léger (< 20kb total, Web Audio API ou lib minimale)
- **Budget performance** : un minigame ne doit pas dépasser 15kb de JS minifié
---
 
## 6. Anti-patterns (à éviter absolument)
 
Source : arxiv.org/pdf/2203.16175 "When Gamification Spoils Your Learning".
 
### 6.1 Surface gamification
❌ Ajouter des points/badges sans mécanique ludique réelle.
✅ Le joueur doit *faire* quelque chose d'intéressant, pas juste cliquer "suivant".
 
### 6.2 Fausse difficulté
❌ Rendre un quiz plus "dur" avec un timer stressant.
✅ La difficulté vient de la compréhension, pas du stress.
 
### 6.3 Unique bonne réponse artificielle
❌ "Choisissez la bonne définition parmi 4 options" (quiz déguisé)
✅ Construire, simuler, manipuler → plusieurs chemins valides
 
### 6.4 Ton patronisant
❌ "Bravo champion !!! Tu es le meilleur !!!"
✅ "Exact. Tu viens de valider un bloc."
 
### 6.5 Cognitive overload
❌ Introduire 4 concepts en même temps
✅ Un concept = un minigame. Toujours.
 
### 6.6 Punition de l'échec
❌ Perte d'XP, retry coûteux, lives system
✅ Safe failure permanent. Retry gratuit. Aucune frustration.
 
---
 
## 7. Checklist de validation d'un minigame
 
Avant de merger un minigame, il doit cocher **toutes** ces cases :
 
- [ ] Objectif compréhensible en < 5 secondes
- [ ] Basé sur une des 7 mécaniques M1-M7 (ou justification écrite si nouvelle)
- [ ] Durée d'une partie : 30-180 secondes
- [ ] Feedback visuel à chaque action utilisateur
- [ ] Retry sans pénalité
- [ ] Plusieurs chemins possibles (ou : un seul chemin mais plusieurs manières d'échouer "gentiment")
- [ ] Jouable sur mobile 375px
- [ ] Tutorial intégré dans les 5 premières secondes
- [ ] Transition vers Phase 3 Reveal fluide
- [ ] Respect palette `--sol-*` (pas de couleurs hors design system)
- [ ] Moins de 15kb de JS minifié ajouté
- [ ] Testé : un non-crypto peut le jouer et comprendre ce qu'on lui apprend
---
 
## 8. Bibliothèque de concepts → mécaniques (mapping pour les 63 modules)
 
Ce mapping est une **proposition de départ**. L'agent peut proposer mieux, mais doit justifier.
 
### Les Basics (14 modules) — mapping suggéré
| Module | Concept clé | Mécanique suggérée |
|---|---|---|
| Décentralisation | Réseau distribué | M3 Node Connection ✅ (existant) |
| Blockchain | Chain of blocks + hash | M2 Canvas ✅ (existant) |
| Wallet | Clés crypto, entropie | M2 Canvas ✅ (existant) |
| Transactions | Signer, envoyer, confirmer | M5 Decision Tree |
| Gas / Fees | Priority fees, congestion | M7 Simulation (slider) |
| Tokens SPL | Différents types de tokens | M1 Drag & Drop Matching |
| Airdrops | Réclamation, critères | M5 Decision Tree |
| Addresses | Format base58, longueur | M6 Typing (avec assist) |
| Explorer | Lire une transaction | M5 Decision Tree sur données réelles |
| Programs vs Accounts | Modèle de Solana | M1 Drag & Drop (classement) |
| SOL natif | Unit of account | M7 Simulation (conversion) |
| Network (Mainnet/Devnet) | Environnements | M1 Drag & Drop (sandbox) |
| RPC | Comment ça communique | M3 Node Connection |
| Écosystème | Panorama des dapps | M1 Drag & Drop (catégorisation) |
 
### Infrastructure Solana (15) — à cartographier dans une prochaine itération
### Sécurité & Risques (15) — majoritairement M5 Decision Tree
### Finance & Trading (19) — majoritairement M7 Simulation + M4 Timing
 
---
 
## 9. Références académiques et industrielles
 
- Csikszentmihalyi, M. (1990). *Flow: The Psychology of Optimal Experience*.
- Gee, J. P. (2003, 2nd ed. 2007). *What Video Games Have to Teach Us About Learning and Literacy*.
- Kiili, K. (2005). *Digital game-based learning: Towards an experiential gaming model*.
- Plass, J. L., Homer, B. D., & Kinzer, C. K. (2015). *Foundations of Game-Based Learning*.
- Li, M.-C., & Tsai, C.-C. (2013). *Game-Based Learning in Science Education*.
- ERIC EJ1297914 (2021). *Principles and Best Practices of Designing Digital Game-Based Learning Environments*.
- Nir Eyal. *Hooked: How to Build Habit-Forming Products*.
- Duolingo Design Guidelines (public blog posts).
- arxiv.org/pdf/2203.16175 — *When Gamification Spoils Your Learning*.
