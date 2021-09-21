# Nugget Bridge
Nugget Bridge is a Pokemon battle simulator written in object-oriented JavaScript with a Ruby on Rails backend.  

---
Many of you who grew up playing the Generation I Pokemon games will remember this
---
![nugget bridge overview](https://strategywiki.org/wiki/File:Pokemon_RBY_Route24.png)

**A never-ending gauntlet of annoying trainers whose hordes of wimpy, unevolved Pokemon**

Nugget Bridge attempts to recreate those fond, and totally not suppressed, traumas in the form of an unending series of consecutive battles. 

Simply jump in and enter a username to start. 

**The cool part?** 
Instead of having to play through the very beginning of the game and build up a team, that work has been done for you! All six of your Pokemon are already level 100 as well!

**The twist?**
![gambler trainer](https://i.redd.it/u98yk5tgj1f61.jpg)

All of your Pokemon are completely randomized! 

* Effort Values (EVs) can be any combination adding up to the 510 EV maximum and Inherited Values (IVs) for each stat can be anywhere from the 0 IV minimum to the 31 IV maximum: as such, no two Pokemon, even of the same species, will have the same final calculated attributes. 
* It's possible (and fairly certain) that you'll have not-fully-evolved Pokemon on your squad. It's equally as likely to have a Mewtwo on your team as it is to have a Magikarp. Maybe they'll become best of friends?
* All Pokemons' movesets are adapted from the Generation VIII games (Sword/Shield). While your weaker Pokemon might have access to some surprisingly powerful moves, some have no effect in battle and are good for nothing but wasting a turn.

**But wait, it gets worse!(better?)**
![john locke as seedot](https://archive-media-1.nyafuu.org/vp/image/1414/64/1414642040871.png)

> "Don't tell me what I can't do"
> ~ John Locke

Fainting is permanent, in the spirit of the [Nuzlocke Challenge rules](https://bulbapedia.bulbagarden.net/wiki/Nuzlocke_Challenge) !

* Whenever a Pokemon faints, that Pokemon is removed from your team and immediately deleted from the backend database. Who knows, they might return to you as another randomized (and hopefully better) Pokemon.

* Since there is no way to use restorative items, the battle ends once either trainer loses all six of their Pokemon. Consecutive victories are recorded, but a CPU win means that your username will be deleted as well. 

You have the option to quit and save your progress at any point during a battle. However, your team will be in the same state as you left it, regarding remaining hit points, statuses, and stat changes.

## The following features are currently not present, but slated to be added:
- [ ] Modals with information and statistics for each member of your team
- [ ] Implementing status conditions
- [ ] Proccing secondary effects of attacks
- [ ] Generation II mechanics
    - [ ] Pokemon #152 (Chikorita) - #251 (Celebi)
    - [ ] Held Items
    - [ ] Weather Conditions
    - [ ] Genders
    - [ ] Shiny Pokemon
- [ ] Generation III mechanics
    - [ ] Pokemon #252 (Treecko) - #386 (Deoxys)
    - [ ] Abilities
    - [ ] Stat-affecting Natures

Good luck!



