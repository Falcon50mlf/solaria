@AGENTS.md

# SolQuest — Project Documentation

## Stack technique

| Outil | Version | Role |
|-------|---------|------|
| Next.js | 16.2.3 | Framework (App Router, Turbopack) |
| React | 19.2.4 | UI (useSyncExternalStore pour le state) |
| TypeScript | ^5 | Typage strict |
| Tailwind CSS | ^4 | Styling (via @tailwindcss/postcss) |
| Framer Motion | ^12.38.0 | Animations (stagger, AnimatePresence, variants) |
| Lucide React | ^1.8.0 | Icones |

**Pas de backend, pas de base de donnees, pas de Solana SDK.** Le state est entierement client-side en memoire (module-scoped variable dans `gameState.ts`).

## Architecture des fichiers

```
src/
├── app/
│   ├── layout.tsx                  # Root layout (metadata, global styles, lang="fr")
│   ├── page.tsx                    # Home — dynamic(() => import('./HomeContent'), { ssr: false })
│   ├── HomeContent.tsx             # Landing page (particles, hero, stats, CTA)
│   ├── globals.css                 # CSS variables --sol-*, animations, composants globaux
│   └── basics/
│       ├── page.tsx                # Hub modules — dynamic import, ssr: false
│       ├── BasicsContent.tsx       # Grille des 3 modules + XP bar + badges
│       ├── decentralisation/
│       │   ├── page.tsx            # Wrapper dynamic import
│       │   └── DecentralisationContent.tsx
│       ├── blockchain/
│       │   ├── page.tsx
│       │   └── BlockchainContent.tsx
│       └── wallet/
│           ├── page.tsx
│           └── WalletContent.tsx
├── lib/
│   ├── gameState.ts                # Store externe (subscribe/getSnapshot pattern)
│   ├── useGameState.ts             # Hook useSyncExternalStore
│   └── ClientOnly.tsx              # Wrapper client-only (legacy, plus utilise)
└── styles/
    └── basics.css                  # Styles specifiques a la page hub
```

## Pattern de page obligatoire

Chaque page utilise `next/dynamic` avec `ssr: false` pour eviter les erreurs d'hydration (React #185) causees par framer-motion + extensions wallet :

```tsx
'use client';
import dynamic from 'next/dynamic';
const Content = dynamic(() => import('./Content'), { ssr: false });
export default function Page() { return <Content />; }
```

Le composant Content est un fichier separe qui contient toute la logique et le JSX.

## Design system

### Palette de couleurs (CSS variables dans globals.css)

| Variable | Hex | Usage |
|----------|-----|-------|
| `--sol-purple` | #9945FF | Couleur primaire, boutons, accents |
| `--sol-green` | #14F195 | Succes, XP, etats actifs |
| `--sol-blue` | #00D4FF | Accent secondaire |
| `--sol-dark` | #0D0D1A | Background secondaire |
| `--sol-darker` | #07070F | Background principal |
| `--sol-card` | #13132B | Background des cartes |
| `--sol-text` | #E4E4ED | Texte principal |
| `--sol-text-muted` | #8888AA | Texte secondaire |
| `--sol-accent` | #FF6B6B | Danger, etats verrouilles |

### Typographie

- **Titres** : system-ui, font-weight 800, gradient text (purple → green)
- **Corps** : system-ui, 14-16px, line-height 1.6
- **Code/Hash** : font-mono

### Animations (framer-motion)

- **Entrees** : `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`
- **Stagger** : `containerVariants` avec `staggerChildren: 0.15`
- **Transitions de phase** : `<AnimatePresence mode="wait">`
- **Hover** : `whileHover={{ scale: 1.02-1.05 }}`
- **Tap** : `whileTap={{ scale: 0.95 }}`

### Encadres pedagogiques (3 types)

| Type | Emoji | Couleur (dark) | Couleur (light) |
|------|-------|----------------|-----------------|
| Definition | 📖 | `bg-indigo-900/30 border-indigo-500/50` | `bg-indigo-50 border-indigo-200` |
| Notions cles | 🔑 | `bg-purple-900/30 border-purple-500/50` | `bg-purple-50 border-purple-200` |
| Le saviez-vous | 💡 | `bg-amber-900/30 border-amber-500/50` | `bg-amber-50 border-amber-200` |

Les encadres sont groupes dans un `<div className="space-y-4 mb-8">` dans chaque phase.

## Game State

### Structure

```typescript
interface GameState {
  playerName: "Fondateur"       // Hardcode
  totalXp: number               // Somme des XP gagnes
  level: number                 // floor(totalXp / 100) + 1
  modules: ModuleProgress[]     // 3 modules
  badges: string[]              // Badges gagnes
}

interface ModuleProgress {
  id: "decentralisation" | "blockchain" | "wallet"
  completed: boolean
  xpEarned: number
  maxXp: number                 // 100, 150, 120
  unlocked: boolean             // Sequentiel
}
```

### Fonctions exposees

- `getGameState()` — retourne le snapshot cache (referentiellement stable)
- `subscribe(listener)` — pour useSyncExternalStore
- `completeModule(id, xp)` — complete un module, debloque le suivant, attribue badge
- `resetGameState()` — remet tout a zero
- `getServerSnapshot()` — snapshot statique pour SSR

### Systeme de progression

| Module | XP | Badge | Debloque |
|--------|----|-------|----------|
| Decentralisation | 100 | "Architecte Reseau" | Blockchain |
| Blockchain | 150 | "Forgeur de Blocs" | Wallet |
| Wallet | 120 | "Gardien des Cles" | — |
| Tous completes | — | "Maitre des Basics" | — |

**Total XP possible** : 370 — **Niveau max** : 4

### Point critique : getGameState() doit retourner un objet referentiellement stable

Le snapshot est cache dans `cachedSnapshot` et ne se recree que dans `notify()`. Si `getGameState()` cree un nouvel objet a chaque appel, `useSyncExternalStore` entre en boucle infinie (React error #185).

## Etat des modules

### Module 1 : Decentralisation — COMPLET
- Phase 1 : Histoire (Satoshi 2008, reseau centralise) + encadres pedagogiques
- Phase 2 : Mini-jeu (connecter les noeuds pour decentraliser le reseau)
- Phase 3 : Revelation + badge + recap

### Module 2 : Blockchain — COMPLET
- Phase 1 : Concept (Genesis Block, hash) + encadres pedagogiques
- Phase 2 : Mini-jeu (miner 4 blocs avec input de transactions)
- Phase 3 : Revelation + badge + recap

### Module 3 : Wallet — COMPLET
- Phase story : Cle publique/privee (analogie boite aux lettres)
- Phase minigame : Entropie (canvas souris) → Derivation (animation) → Wallet affiche
- Phase reveal : Badge + recap

## Conventions de code

1. **Langue du code** : anglais (noms de variables, fonctions, composants)
2. **Langue du contenu** : francais (textes, labels, narratif)
3. **Composants** : PascalCase, un fichier par composant
4. **Imports** : `@/*` alias vers `src/*`
5. **State externe** : `useSyncExternalStore` (pas de useState pour le state global)
6. **Pas de SSR** : toutes les pages utilisent `dynamic({ ssr: false })`
7. **Animations** : framer-motion uniquement (pas de CSS animations custom sauf globals.css)
8. **Icones** : lucide-react uniquement
9. **Pas de `useEffect` pour les event listeners sur des elements dans AnimatePresence** : utiliser `onMouseMove`, `onClick` etc. directement sur le JSX (le DOM n'est pas garanti au moment du useEffect)

## Regles pour la suite du developpement

1. **Toujours lire les docs Next.js 16** dans `node_modules/next/dist/docs/` avant d'utiliser une API
2. **Ne jamais faire `npm audit fix --force`** — ca downgrade React et Next.js
3. **Tester avec `npx next build`** avant chaque deploiement
4. **Le state est en memoire** — se perd au refresh. Si persistance necessaire, ajouter localStorage
5. **Nouveaux modules** : suivre le pattern page.tsx wrapper + Content.tsx, 3 phases (story → game → reveal)
6. **Encadres pedagogiques** : uniquement les 3 types (Definition, Notions cles, Le saviez-vous), groupes par phase
7. **Deploiement** : `npx vercel --prod --yes` (projet lie a Vercel)
8. **GitHub** : repo `Falcon50mlf/solquest`, push via `gh auth setup-git && git push`
