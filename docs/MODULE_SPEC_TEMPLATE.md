# MODULE_SPEC_TEMPLATE.md

**À remplir pour chaque nouveau module avant d'écrire la moindre ligne de code.**

---

## Identification
- **Module ID** : `category-name-slug`
- **Catégorie** : Basics / Infrastructure / Sécurité / Finance
- **XP** : 100-200
- **Badge débloqué** : "Nom du badge"
- **Module prérequis** : [id du précédent]

---

## 1. Concept pédagogique central
**Une seule phrase** qui résume ce que l'utilisateur doit comprendre après le module.

> Ex : "Sur Solana, un validateur produit un bloc toutes les 400ms, ce qui rend la chain capable de traiter ~65k transactions par seconde."

---

## 2. Question de test de compréhension
**Une question** à laquelle l'utilisateur doit pouvoir répondre après le module.

> Ex : "Pourquoi Solana est-il plus rapide qu'Ethereum ?"

---

## 3. Phase 1 — STORY

### Accroche narrative (2-3 phrases)
Une situation, un problème, un personnage.

### Encadrés pédagogiques (max 3)
- 📖 **Définition** : ...
- 🔑 **Notion clé** : ...
- 💡 **Le saviez-vous** : ...

### Cliffhanger
La phrase qui donne envie de jouer.

---

## 4. Phase 2 — MINIGAME

### Mécanique utilisée (une parmi M1-M7 de GAME_DESIGN.md)
- [ ] M1 Drag & Drop Matching
- [ ] M2 Canvas Generative
- [ ] M3 Node Connection
- [ ] M4 Timing / Rhythm
- [ ] M5 Decision Tree
- [ ] M6 Typing / Completion
- [ ] M7 Simulation Sandbox

### Objectif du joueur (1 phrase)
> Ex : "Produire 10 blocs en 4 secondes pour atteindre les 65k TPS."

### Input / Action demandée
Description précise de ce que l'utilisateur doit faire avec sa souris / son clavier / son doigt.

### Feedback visuel
- Action correcte : ...
- Action incorrecte : ...
- Progression : ...

### Condition de victoire
> Ex : "10 blocs validés en moins de 4 secondes."

### Condition de retry
> Ex : "Si > 4s, message 'Un peu lent. Retry.' + bouton."

---

## 5. Phase 3 — REVEAL

### Révélation (1-2 phrases)
"Voilà ce que tu viens de faire : c'est ça [concept]."

### Récap en 3 bullets
- ...
- ...
- ...

### Animation d'unlock
- Badge : ...
- XP : +X XP
- CTA suivant : "Module suivant : [nom]"

---

## 6. Checklist finale (voir GAME_DESIGN.md section 7)
- [ ] Objectif compréhensible en < 5 secondes
- [ ] Basé sur mécanique M1-M7
- [ ] Durée 30-180 sec
- [ ] Feedback à chaque action
- [ ] Retry sans pénalité
- [ ] Mobile 375px OK
- [ ] Tutorial intégré
- [ ] Palette --sol-*
- [ ] < 15kb JS ajouté
- [ ] Testé par non-crypto
