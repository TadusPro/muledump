var pcstatnames = {
    0: 'Shots fired',
    1: 'Hits',
    2: 'Ability uses',
    3: 'Tiles discovered',
    4: 'Teleports',
    5: 'Potions drunk',
    6: 'Kills',
    7: 'Assists',
    8: 'God kills',
    9: 'Assists against Gods',
    10: 'Cube kills',
    11: 'Oryx kills',
    12: 'Quests completed',
    13: 'Pirate Caves',
    14: 'Undead Lairs',
    15: 'Abyss of Demons',
    16: 'Snake Pits',
    17: 'Spider Dens',
    18: 'Sprite Worlds',
    20: 'Minutes active',
    21: 'Tomb of the Ancients',
    22: 'Ocean Trenches',
    23: 'Forbidden Jungles',
    24: 'Manor of the Immortals',
    25: 'Forest Mazes',
    26: 'Lair of Draconis',
    27: 'Candyland Hunting Grounds',
    28: 'Haunted Cemeteries',
    29: 'Cave of A Thousand Treasures',
    30: 'Mad Labs',
    31: 'Davy Jones\' Lockers',
    34: 'Ice Caves',
    35: 'Deadwater Docks',
    36: 'The Crawling Depths',
    37: 'Woodland Labyrinths',
    38: 'Battle for the Nexus',
    39: 'The Shatters',
    40: 'Belladonna\'s Garden',
    41: 'Puppet Master\'s Theatre',
    42: 'Toxic Sewers',
    43: 'The Hive',
    44: 'Mountain Temple',
    45: 'The Nest',
    47: 'Lost Halls',
    48: 'Cultist Hideouts',
    49: 'The Void',
    50: 'Puppet Master\'s Encore',
    51: 'Lair of Shaitan',
    52: 'Parasite Chambers',
    53: 'Magic Woods',
    54: 'Cnidarian Reef',
    55: 'Secluded Thicket',
    56: 'Cursed Library',
    57: 'Fungal Cavern',
    58: 'Crystal Cavern',
    59: 'Ancient Ruins',
    60: 'Dungeon types',
    61: 'Forax',
    62: 'Heroic Abyss of Demons',
    63: 'Heroic Undead Lair',
    64: 'High Tech Terror',
    65: 'Ice Tomb',
    66: 'Katalund',
    67: 'Mad God Mayhems',
    68: 'Malogia',
    69: 'Oryx\'s Castle',
    70: 'Oryx\'s Chamber',
    71: 'Oryx\'s Sanctuary',
    72: 'Rainbow Road',
    73: 'Santa Workshop',
    74: 'The Machine',
    75: 'Untaris',
    76: 'Wine Cellar',
    77: 'Party level-ups',
    78: 'Lesser Gods kills',
    79: 'Encounter kills',
    80: 'Hero kills',
    82: 'Critter kills',
    83: 'Beast kills',
    84: 'Humanoid kills',
    85: 'Undead kills',
    86: 'Nature kills',
    87: 'Construct kills',
    88: 'Grotesque kills',
    89: 'Structure kills',
    90: 'The Third Dimension',
    91: 'Beachzone',
    92: 'Hidden Interregnum',
    93: 'Sulfurous Wetlands',
    94: 'Kogbold Steamworks',
    95: 'Moonlight Village',
    96: 'Advanced Kogbold Steamworks',
    97: 'Advanced Nest',
    98: 'The Tavern',
    99: 'Queen Bunny Chamber',
    100: 'Stat Potions consumed',
};

var tunnelrat = {
    13: 'Pirate',
    23: 'Jungle',
    17: 'Spider',
    16: 'Snake',
    18: 'Sprite',
    24: 'Manor',
    14: 'UDL',
    15: 'Abyss',
    22: 'Trench',
    21: 'Tomb'
};
var explosivejourney = {
    31: 'Davy Jones\' Locker',
    30: 'Mad Lab',
    27: 'Candyland Hunting Grounds',
    28: 'Haunted Cemetery',
    29: 'Cave of A Thousand Treasures',
    26: 'Lair of Draconis',
    35: 'Deadwater Docks',
    37: 'Woodland Labyrinths',
    36: 'The Crawling Depths',
    39: 'The Shatters',
    51: 'Lair of Shaitan',
    40: 'Ice Cave'
}
var travelofthedecade = {
    50: 'Puppet Master’s Encore',
    42: 'The Hive',
    43: 'Toxic Sewers',
    44: 'Mountain Temple',
    90: 'The Third Dimension',
    45: 'The Nest',
    47: 'Lost Halls',
    48: 'Cultist Hideout',
    49: 'The Void',
    54: 'Cnidarian Reef',
    52: 'Parasite Chambers',
    53: 'Magic Woods',
    55: 'Secluded Thicket',
    56: 'Cursed Library',
    71: 'Oryx’s Sanctuary',
    59: 'Ancient Ruins',
    64: 'High Tech Terror',
    93: 'Sulfurous Wetlands'
};
var firststeps = {
    13: 'Pirate Cave',
    25: 'Forest Maze',
    23: 'Forbidden Jungle',
    17: 'Spider Den',
    42: 'The Hive'
};
var kingofthemountains = {
    16: 'Snake Pit',
    18: 'Sprite World',
    15: 'Abyss of Demons',
    43: 'Toxic Sewers',
    30: 'Mad Lab',
    53: 'Magic Woods',
    41: 'Puppet Master’s Theatre',
    28: 'Haunted Cemetery',
    56: 'Cursed Library',
    59: 'Ancient Ruins',
    93: 'Sulfurous Wetlands'
};
var conqueroroftherealm = {
    31: 'Davy Jones’ Locker',
    40: 'Ice Cave',
    26: 'Lair of Draconis',
    44: 'Mountain Temple',
    90: 'The Third Dimension',
    24: 'Ocean Trench',
    21: 'Tomb of the Ancients',
    39: 'The Shatters',
    45: 'The Nest',
    57: 'Fungal Cavern',
    58: 'Crystal Cavern',
    47: 'Lost Halls',
    94: 'Kogbold Steamworks'
};
var enemyofthecourt = {
    51: 'Lair of Shaitan',
    50: 'Puppet Master’s Encore',
    54: 'Cnidarian Reef',
    55: 'Secluded Thicket',
    64: 'High Tech Terror'
};
var epicbattles = {
    35: 'Deadwater Docks',
    37: 'Woodland Labyrinth',
    36: 'The Crawling Depths',
    45: 'The Nest',
    55: 'Secluded Thicket'
};
var farout = {
    68: 'Malogia',
    75: 'Untaris',
    61: 'Forax',
    66: 'Katalund'
};
var heroofthenexus = {
    13: 'Pirate Cave',
    25: 'Forest Maze',
    17: 'Spider Den',
    16: 'Snake Pit',
    23: 'Forbidden Jungle',
    42: 'The Hive',
    59: 'Ancient Ruins',
    53: 'Magic Woods',
    18: 'Sprite World',
    27: 'Candyland Hunting Grounds',
    29: 'Cave of a Thousand Treasures',
    14: 'Undead Lair',
    15: 'Abyss of Demons',
    24: 'Manor of the Immortals',
    41: 'Puppet Master’s Theatre',
    43: 'Toxic Sewers',
    56: 'Cursed Library',
    28: 'Haunted Cemetery',
    30: 'Mad Lab',
    52: 'Parasite Chambers',
    31: 'Davy Jones’ Locker',
    44: 'Mountain Temple',
    90: 'The Third Dimension',
    26: 'Lair of Draconis',
    35: 'Deadwater Docks',
    37: 'Woodland Labyrinth',
    36: 'The Crawling Depths',
    24: 'Ocean Trench',
    40: 'Ice Cave',
    21: 'Tomb of the Ancients',
    57: 'Fungal Cavern',
    58: 'Crystal Cavern',
    47: 'Lost Halls',
    48: 'Cultist Hideout',
    49: 'The Void',
    93: 'Sulfurous Wetlands',
    94: 'Kogbold Steamworks',
    69: 'Oryx\'s Castle',
    51: 'Lair of Shaitan',
    50: 'Puppet Master\'s Encore',
    54: 'Cnidarian Reef',
    55: 'Secluded Thicket',
    64: 'High Tech Terror',
    71: 'Oryx\'s Sanctuary',
    72: 'Rainbow Road',
    91: 'Beachzone'
};
var seasonsbeatins = {
    40: 'Ice Tomb',
    67: 'Mad God Mayhem',
    38: 'Battle for the Nexus',
    73: 'Santa Workshop',
    74: 'The Machine',
    68: 'Malogia',
    75: 'Untaris',
    61: 'Forax',
    66: 'Katalund',
    72: 'Rainbow Road',
    91: 'Beachzone'
};
var realmofthemadgod = {
    13: 'Pirate Cave',
    25: 'Forest Maze',
    17: 'Spider Den',
    16: 'Snake Pit',
    23: 'Forbidden Jungle',
    42: 'The Hive',
    59: 'Ancient Ruins',
    53: 'Magic Woods',
    18: 'Sprite World',
    27: 'Candyland Hunting Grounds',
    29: 'Cave of a Thousand Treasures',
    14: 'Undead Lair',
    15: 'Abyss of Demons',
    24: 'Manor of the Immortals',
    41: 'Puppet Master’s Theatre',
    43: 'Toxic Sewers',
    56: 'Cursed Library',
    28: 'Haunted Cemetery',
    30: 'Mad Lab',
    52: 'Parasite Chambers',
    31: 'Davy Jones’ Locker',
    44: 'Mountain Temple',
    90: 'The Third Dimension',
    26: 'Lair of Draconis',
    35: 'Deadwater Docks',
    37: 'Woodland Labyrinth',
    36: 'The Crawling Depths',
    24: 'Ocean Trench',
    40: 'Ice Cave',
    21: 'Tomb of the Ancients',
    57: 'Fungal Cavern',
    58: 'Crystal Cavern',
    47: 'Lost Halls',
    48: 'Cultist Hideout',
    49: 'The Void',
    93: 'Sulfurous Wetlands',
    94: 'Kogbold Steamworks',
    69: 'Oryx\'s Castle',
    51: 'Lair of Shaitan',
    50: 'Puppet Master\'s Encore',
    54: 'Cnidarian Reef',
    55: 'Secluded Thicket',
    64: 'High Tech Terror',
    71: 'Oryx\'s Sanctuary',
    72: 'Rainbow Road',
    91: 'Beachzone'
};
var bonuses = {
    'Ancestor': function (s, c, d) {
        return (parseInt(d.Account.Stats.TotalFame) === 0) ? { mul: 0, add: 20 } : 0;
    },
    'Maxed': function (s, c, d) {
        var STATTAGS = 'MaxHitPoints MaxMagicPoints Attack Defense Speed Dexterity HpRegen MpRegen'.split(' ');
        var bonus = { mul: 0, add: 0 };
        var hasBonus = false;

        for (var t = 0; t < STATTAGS.length; t++) {
            var stat = c[STATTAGS[t]] || 0;
            var carrcl = classes[c.ObjectType];
            if (carrcl && parseInt(stat) === carrcl[3][t]) {
                hasBonus = true;
                if (STATTAGS[t] === 'MaxHitPoints' || STATTAGS[t] === 'MaxMagicPoints') {
                    bonus.mul += 0.05;
                    bonus.add += 200;
                } else {
                    bonus.mul += 0.025;
                    bonus.add += 100;
                }
            }
        }

        return hasBonus ? bonus : 0;
    },
    'Cartography': function (s) {
        var tiles = s[3];
        var bonus = 0;

        if (tiles >= 25000000) {
            bonus += Math.floor(tiles / 25000000) * 2500;
            tiles %= 25000000;
        }
        if (tiles >= 10000000) {
            bonus += 1000;
            tiles -= 10000000;
        }
        if (tiles >= 4000000) {
            bonus += 400;
            tiles -= 4000000;
        }
        if (tiles >= 1000000) {
            bonus += 100;
            tiles -= 1000000;
        }
        if (tiles >= 200000) {
            bonus += 20;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'QuestCompletes': function (s) {
        var quests = s[12];
        var bonus = 0;

        if (quests >= 2000) {
            bonus += Math.floor(quests / 2000) * 5000;
            quests %= 2000;
        }
        if (quests >= 1000) {
            bonus += 2000;
            quests -= 1000;
        }
        if (quests >= 400) {
            bonus += 800;
            quests -= 400;
        }
        if (quests >= 100) {
            bonus += 200;
            quests -= 100;
        }
        if (quests >= 25) {
            bonus += 20;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'EnemyHit': function (s) {
        var hits = s[1];
        var bonus = 0;

        if (hits >= 2000000) {
            bonus += Math.floor(hits / 2000000) * 2500;
            hits %= 2000000;
        }
        if (hits >= 800000) {
            bonus += 1000;
            hits -= 800000;
        }
        if (hits >= 200000) {
            bonus += 400;
            hits -= 200000;
        }
        if (hits >= 40000) {
            bonus += 100;
            hits -= 40000;
        }
        if (hits >= 8000) {
            bonus += 20;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'PartyLevelUps': function (s) {
        var levelUps = s[77];
        var bonus = 0;

        if (levelUps >= 1000) {
            bonus += Math.floor(levelUps / 1000) * 1000;
            levelUps %= 1000;
        }
        if (levelUps >= 400) {
            bonus += 400;
            levelUps -= 400;
        }
        if (levelUps >= 100) {
            bonus += 200;
            levelUps -= 100;
        }
        if (levelUps >= 50) {
            bonus += 50;
            levelUps -= 50;
        }
        if (levelUps >= 25) {
            bonus += 20;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'PotionDrinker': function (s) {
        var potions = s[5];
        var bonus = 0;

        if (potions >= 2000) {
            bonus += Math.floor(potions / 2000) * 1000;
            potions %= 2000;
        }
        if (potions >= 1000) {
            bonus += 400;
            potions -= 1000;
        }
        if (potions >= 400) {
            bonus += 200;
            potions -= 400;
        }
        if (potions >= 100) {
            bonus += 50;
            potions -= 100;
        }
        if (potions >= 25) {
            bonus += 20;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'AbilityUse': function (s) {
        var abilities = s[2];
        var bonus = 0;

        if (abilities >= 25000) {
            bonus += Math.floor(abilities / 25000) * 1000;
            abilities %= 25000;
        }
        if (abilities >= 10000) {
            bonus += 400;
            abilities -= 10000;
        }
        if (abilities >= 2500) {
            bonus += 200;
            abilities -= 2500;
        }
        if (abilities >= 500) {
            bonus += 50;
            abilities -= 500;
        }
        if (abilities >= 100) {
            bonus += 20;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'Teleports': function (s) {
        var teleports = s[4];
        var bonus = 0;

        if (teleports >= 2500) {
            bonus += Math.floor(teleports / 2500) * 1000;
            teleports %= 2500;
        }
        if (teleports >= 1000) {
            bonus += 400;
            teleports -= 1000;
        }
        if (teleports >= 500) {
            bonus += 200;
            teleports -= 500;
        }
        if (teleports >= 200) {
            bonus += 50;
            teleports -= 200;
        }
        if (teleports >= 50) {
            bonus += 20;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'MonsterKills': function (s) {
        var kills = s[6]; // replace monsterKillIndex with the actual index for monster kills in s
        var bonus = 0;

        if (kills >= 100000) {
            bonus += Math.floor(kills / 100000) * 1000;
            kills %= 100000;
        }
        if (kills >= 50000) {
            bonus += 400;
            kills -= 50000;
        }
        if (kills >= 10000) {
            bonus += 200;
            kills -= 10000;
        }
        if (kills >= 5000) {
            bonus += 50;
            kills -= 5000;
        }
        if (kills >= 2000) {
            bonus += 20;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'GodKills': function (s) {
        var godKills = s[8]; // replace godKillIndex with the actual index for god kills in s
        var bonus = 0;

        if (godKills >= 50000) {
            bonus += Math.floor(godKills / 50000) * 2500;
            godKills %= 50000;
        }
        if (godKills >= 10000) {
            bonus += 1000;
            godKills -= 10000;
        }
        if (godKills >= 5000) {
            bonus += 400;
            godKills -= 5000;
        }
        if (godKills >= 1000) {
            bonus += 100;
            godKills -= 1000;
        }
        if (godKills >= 200) {
            bonus += 20;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'LesserGodKills': function (s) {
        var lesserGodKills = s[78]; // replace lesserGodKillIndex with the actual index for lesser god kills in s
        var bonus = 0;

        if (lesserGodKills >= 25000) {
            bonus += Math.floor(lesserGodKills / 25000) * 2500;
            lesserGodKills %= 25000;
        }
        if (lesserGodKills >= 10000) {
            bonus += 1000;
            lesserGodKills -= 10000;
        }
        if (lesserGodKills >= 5000) {
            bonus += 400;
            lesserGodKills -= 5000;
        }
        if (lesserGodKills >= 1000) {
            bonus += 100;
            lesserGodKills -= 1000;
        }
        if (lesserGodKills >= 200) {
            bonus += 20;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'OryxKills': function (s) {
        var oryxKills = s[11]; // replace oryxKillIndex with the actual index for Oryx kills in s
        var bonus = 0;

        if (oryxKills >= 500) {
            bonus += Math.floor(oryxKills / 500) * 8000;
            oryxKills %= 500;
        }
        if (oryxKills >= 250) {
            bonus += 3000;
            oryxKills -= 250;
        }
        if (oryxKills >= 100) {
            bonus += 1000;
            oryxKills -= 100;
        }
        if (oryxKills >= 20) {
            bonus += 500;
            oryxKills -= 20;
        }
        if (oryxKills >= 1) {
            bonus += 200;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'EncounterKills': function (s) {
        var encounterKills = s[79]; // replace encounterKillIndex with the actual index for encounter kills in s
        var bonus = 0;

        if (encounterKills >= 1250) {
            bonus += Math.floor(encounterKills / 1250) * 5000;
            encounterKills %= 1250;
        }
        if (encounterKills >= 500) {
            bonus += 2000;
            encounterKills -= 500;
        }
        if (encounterKills >= 200) {
            bonus += 800;
            encounterKills -= 200;
        }
        if (encounterKills >= 50) {
            bonus += 200;
            encounterKills -= 50;
        }
        if (encounterKills >= 5) {
            bonus += 20;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'HeroKills': function (s) {
        var heroKills = s[80]; // replace heroKillIndex with the actual index for hero kills in s
        var bonus = 0;

        if (heroKills >= 2500) {
            bonus += Math.floor(heroKills / 2500) * 2500;
            heroKills %= 2500;
        }
        if (heroKills >= 1250) {
            bonus += 1000;
            heroKills -= 1250;
        }
        if (heroKills >= 500) {
            bonus += 400;
            heroKills -= 500;
        }
        if (heroKills >= 100) {
            bonus += 100;
            heroKills -= 100;
        }
        if (heroKills >= 5) {
            bonus += 20;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'CubeKills': function (s) {
        var cubeKills = s[10]; // replace cubeKillIndex with the actual index for cube kills in s
        var bonus = 0;

        if (cubeKills >= 50000) {
            bonus += Math.floor(cubeKills / 50000) * 2500;
            cubeKills %= 50000;
        }
        if (cubeKills >= 10000) {
            bonus += 1000;
            cubeKills -= 10000;
        }
        if (cubeKills >= 5000) {
            bonus += 400;
            cubeKills -= 5000;
        }
        if (cubeKills >= 1000) {
            bonus += 100;
            cubeKills -= 1000;
        }
        if (cubeKills >= 200) {
            bonus += 20;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'CritterKills': function (s) {
        var critterKills = s[82]; // Replace critterKillIndex with the actual index for critter kills in s
        var bonus = 0;

        if (critterKills >= 50000) {
            bonus += Math.floor(critterKills / 50000) * 2500;
            critterKills %= 50000;
        }
        if (critterKills >= 10000) {
            bonus += 1000;
            critterKills -= 10000;
        }
        if (critterKills >= 5000) {
            bonus += 400;
            critterKills -= 5000;
        }
        if (critterKills >= 1000) {
            bonus += 100;
            critterKills -= 1000;
        }
        if (critterKills >= 200) {
            bonus += 20;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'BeastKills': function (s) {
        var beastKills = s[83]; // Replace beastKillIndex with the actual index for beast kills in s
        var bonus = 0;

        if (beastKills >= 50000) {
            bonus += Math.floor(beastKills / 50000) * 2500;
            beastKills %= 50000;
        }
        if (beastKills >= 10000) {
            bonus += 1000;
            beastKills -= 10000;
        }
        if (beastKills >= 5000) {
            bonus += 400;
            beastKills -= 5000;
        }
        if (beastKills >= 1000) {
            bonus += 100;
            beastKills -= 1000;
        }
        if (beastKills >= 200) {
            bonus += 20;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'HumanoidKills': function (s) {
        var humanoidKills = s[84]; // Replace humanoidKillIndex with the actual index for humanoid kills in s
        var bonus = 0;

        if (humanoidKills >= 50000) {
            bonus += Math.floor(humanoidKills / 50000) * 2500;
            humanoidKills %= 50000;
        }
        if (humanoidKills >= 10000) {
            bonus += 1000;
            humanoidKills -= 10000;
        }
        if (humanoidKills >= 5000) {
            bonus += 400;
            humanoidKills -= 5000;
        }
        if (humanoidKills >= 1000) {
            bonus += 100;
            humanoidKills -= 1000;
        }
        if (humanoidKills >= 200) {
            bonus += 20;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'UndeadKills': function (s) {
        var undeadKills = s[85]; // Replace undeadKillIndex with the actual index for undead kills in s
        var bonus = 0;

        if (undeadKills >= 50000) {
            bonus += Math.floor(undeadKills / 50000) * 2500;
            undeadKills %= 50000;
        }
        if (undeadKills >= 10000) {
            bonus += 1000;
            undeadKills -= 10000;
        }
        if (undeadKills >= 5000) {
            bonus += 400;
            undeadKills -= 5000;
        }
        if (undeadKills >= 1000) {
            bonus += 100;
            undeadKills -= 1000;
        }
        if (undeadKills >= 200) {
            bonus += 20;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'NatureKills': function (s) {
        var natureKills = s[86]; // Replace natureKillIndex with the actual index for nature kills in s
        var bonus = 0;

        if (natureKills >= 50000) {
            bonus += Math.floor(natureKills / 50000) * 2500;
            natureKills %= 50000;
        }
        if (natureKills >= 10000) {
            bonus += 1000;
            natureKills -= 10000;
        }
        if (natureKills >= 5000) {
            bonus += 400;
            natureKills -= 5000;
        }
        if (natureKills >= 1000) {
            bonus += 100;
            natureKills -= 1000;
        }
        if (natureKills >= 200) {
            bonus += 20;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'ConstructKills': function (s) {
        var constructKills = s[87]; // Replace constructKillIndex with the actual index for construct kills in s
        var bonus = 0;

        if (constructKills >= 50000) {
            bonus += Math.floor(constructKills / 50000) * 2500;
            constructKills %= 50000;
        }
        if (constructKills >= 10000) {
            bonus += 1000;
            constructKills -= 10000;
        }
        if (constructKills >= 5000) {
            bonus += 400;
            constructKills -= 5000;
        }
        if (constructKills >= 1000) {
            bonus += 100;
            constructKills -= 1000;
        }
        if (constructKills >= 200) {
            bonus += 20;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'GrotesqueKills': function (s) {
        var grotesqueKills = s[88]; // Replace grotesqueKillIndex with the actual index for grotesque kills in s
        var bonus = 0;

        if (grotesqueKills >= 50000) {
            bonus += Math.floor(grotesqueKills / 50000) * 2500;
            grotesqueKills %= 50000;
        }
        if (grotesqueKills >= 10000) {
            bonus += 1000;
            grotesqueKills -= 10000;
        }
        if (grotesqueKills >= 5000) {
            bonus += 400;
            grotesqueKills -= 5000;
        }
        if (grotesqueKills >= 1000) {
            bonus += 100;
            grotesqueKills -= 1000;
        }
        if (grotesqueKills >= 200) {
            bonus += 20;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'StructureKills': function (s) {
        var structureKills = s[89]; // Replace structureKillIndex with the actual index for structure kills in s
        var bonus = 0;

        if (structureKills >= 50000) {
            bonus += Math.floor(structureKills / 50000) * 2500;
            structureKills %= 50000;
        }
        if (structureKills >= 10000) {
            bonus += 1000;
            structureKills -= 10000;
        }
        if (structureKills >= 5000) {
            bonus += 400;
            structureKills -= 5000;
        }
        if (structureKills >= 1000) {
            bonus += 100;
            structureKills -= 1000;
        }
        if (structureKills >= 200) {
            bonus += 20;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'PirateCaves': function (s) {
        var pirateCaves = s[13]; // Replace 45 with the actual index for Pirate Caves in s
        var bonus = 0;

        if (pirateCaves >= 100) {
            bonus += Math.floor(pirateCaves / 100) * 60;
            pirateCaves %= 100;
        }
        if (pirateCaves >= 40) {
            bonus += 20;
            pirateCaves -= 40;
        }
        if (pirateCaves >= 20) {
            bonus += 10;
            pirateCaves -= 20;
        }
        if (pirateCaves >= 10) {
            bonus += 5;
            pirateCaves -= 10;
        }
        if (pirateCaves >= 1) {
            bonus += 2;
            pirateCaves -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'ForestMazes': function (s) {
        var forestMazes = s[25]; // Replace 45 with the actual index for Forest Mazes in s
        var bonus = 0;

        if (forestMazes >= 100) {
            bonus += Math.floor(forestMazes / 100) * 60;
            forestMazes %= 100;
        }
        if (forestMazes >= 40) {
            bonus += 20;
            forestMazes -= 40;
        }
        if (forestMazes >= 20) {
            bonus += 10;
            forestMazes -= 20;
        }
        if (forestMazes >= 10) {
            bonus += 5;
            forestMazes -= 10;
        }
        if (forestMazes >= 1) {
            bonus += 2;
            forestMazes -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'ForbiddenJungles': function (s) {
        var forbiddenJungles = s[23]; // Replace 45 with the actual index for Forbidden Jungles in s
        var bonus = 0;

        if (forbiddenJungles >= 100) {
            bonus += Math.floor(forbiddenJungles / 100) * 80;
            forbiddenJungles %= 100;
        }
        if (forbiddenJungles >= 40) {
            bonus += 30;
            forbiddenJungles -= 40;
        }
        if (forbiddenJungles >= 20) {
            bonus += 15;
            forbiddenJungles -= 20;
        }
        if (forbiddenJungles >= 10) {
            bonus += 8;
            forbiddenJungles -= 10;
        }
        if (forbiddenJungles >= 1) {
            bonus += 4;
            forbiddenJungles -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'TheHive': function (s) {
        var theHive = s[43]; // Replace 45 with the actual index for The Hive in s
        var bonus = 0;

        if (theHive >= 100) {
            bonus += Math.floor(theHive / 100) * 80;
            theHive %= 100;
        }
        if (theHive >= 40) {
            bonus += 30;
            theHive -= 40;
        }
        if (theHive >= 20) {
            bonus += 15;
            theHive -= 20;
        }
        if (theHive >= 10) {
            bonus += 8;
            theHive -= 10;
        }
        if (theHive >= 1) {
            bonus += 4;
            theHive -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'SpiderDen': function (s) {
        var spiderDen = s[17];
        var bonus = 0;

        if (spiderDen >= 100) {
            bonus += Math.floor(spiderDen / 100) * 100;
            spiderDen %= 100;
        }
        if (spiderDen >= 40) {
            bonus += 40;
            spiderDen -= 40;
        }
        if (spiderDen >= 20) {
            bonus += 20;
            spiderDen -= 20;
        }
        if (spiderDen >= 10) {
            bonus += 10;
            spiderDen -= 10;
        }
        if (spiderDen >= 1) {
            bonus += 5;
            spiderDen -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'AncientRuins': function (s) {
        var ancientRuins = s[59];
        var bonus = 0;

        if (ancientRuins >= 100) {
            bonus += Math.floor(ancientRuins / 100) * 800;
            ancientRuins %= 100;
        }
        if (ancientRuins >= 40) {
            bonus += 300;
            ancientRuins -= 40;
        }
        if (ancientRuins >= 20) {
            bonus += 150;
            ancientRuins -= 20;
        }
        if (ancientRuins >= 10) {
            bonus += 80;
            ancientRuins -= 10;
        }
        if (ancientRuins >= 1) {
            bonus += 40;
            ancientRuins -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'SnakePit': function (s) {
        var snakePit = s[16];
        var bonus = 0;

        if (snakePit >= 100) {
            bonus += Math.floor(snakePit / 100) * 500;
            snakePit %= 100;
        }
        if (snakePit >= 40) {
            bonus += 200;
            snakePit -= 40;
        }
        if (snakePit >= 20) {
            bonus += 100;
            snakePit -= 20;
        }
        if (snakePit >= 10) {
            bonus += 50;
            snakePit -= 10;
        }
        if (snakePit >= 1) {
            bonus += 25;
            snakePit -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'SpriteWorld': function (s) {
        var spriteWorld = s[18];
        var bonus = 0;

        if (spriteWorld >= 100) {
            bonus += Math.floor(spriteWorld / 100) * 500;
            spriteWorld %= 100;
        }
        if (spriteWorld >= 40) {
            bonus += 200;
            spriteWorld -= 40;
        }
        if (spriteWorld >= 20) {
            bonus += 100;
            spriteWorld -= 20;
        }
        if (spriteWorld >= 10) {
            bonus += 50;
            spriteWorld -= 10;
        }
        if (spriteWorld >= 1) {
            bonus += 25;
            spriteWorld -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'MagicWoods': function (s) {
        var magicWoods = s[53];
        var bonus = 0;

        if (magicWoods >= 100) {
            bonus += Math.floor(magicWoods / 100) * 700;
            magicWoods %= 100;
        }
        if (magicWoods >= 40) {
            bonus += 280;
            magicWoods -= 40;
        }
        if (magicWoods >= 20) {
            bonus += 140;
            magicWoods -= 20;
        }
        if (magicWoods >= 10) {
            bonus += 70;
            magicWoods -= 10;
        }
        if (magicWoods >= 1) {
            bonus += 35;
            magicWoods -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'UndeadLair': function (s) {
        var undeadLair = s[14];
        var bonus = 0;

        if (undeadLair >= 100) {
            bonus += Math.floor(undeadLair / 100) * 700;
            undeadLair %= 100;
        }
        if (undeadLair >= 40) {
            bonus += 280;
            undeadLair -= 40;
        }
        if (undeadLair >= 20) {
            bonus += 140;
            undeadLair -= 20;
        }
        if (undeadLair >= 10) {
            bonus += 70;
            undeadLair -= 10;
        }
        if (undeadLair >= 1) {
            bonus += 35;
            undeadLair -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'AbyssOfDemons': function (s) {
        var abyssOfDemons = s[15];
        var bonus = 0;

        if (abyssOfDemons >= 100) {
            bonus += Math.floor(abyssOfDemons / 100) * 800;
            abyssOfDemons %= 100;
        }
        if (abyssOfDemons >= 40) {
            bonus += 300;
            abyssOfDemons -= 40;
        }
        if (abyssOfDemons >= 20) {
            bonus += 150;
            abyssOfDemons -= 20;
        }
        if (abyssOfDemons >= 10) {
            bonus += 80;
            abyssOfDemons -= 10;
        }
        if (abyssOfDemons >= 1) {
            bonus += 40;
            abyssOfDemons -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'CursedLibrary': function (s) {
        var cursedLibrary = s[56];
        var bonus = 0;

        if (cursedLibrary >= 100) {
            bonus += Math.floor(cursedLibrary / 100) * 1000;
            cursedLibrary %= 100;
        }
        if (cursedLibrary >= 40) {
            bonus += 400;
            cursedLibrary -= 40;
        }
        if (cursedLibrary >= 20) {
            bonus += 200;
            cursedLibrary -= 20;
        }
        if (cursedLibrary >= 10) {
            bonus += 100;
            cursedLibrary -= 10;
        }
        if (cursedLibrary >= 1) {
            bonus += 50;
            cursedLibrary -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'ToxicSewers': function (s) {
        var toxicSewers = s[42];
        var bonus = 0;

        if (toxicSewers >= 100) {
            bonus += Math.floor(toxicSewers / 100) * 800;
            toxicSewers %= 100;
        }
        if (toxicSewers >= 40) {
            bonus += 300;
            toxicSewers -= 40;
        }
        if (toxicSewers >= 20) {
            bonus += 150;
            toxicSewers -= 20;
        }
        if (toxicSewers >= 10) {
            bonus += 80;
            toxicSewers -= 10;
        }
        if (toxicSewers >= 1) {
            bonus += 40;
            toxicSewers -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'MadLab': function (s) {
        var madLab = s[30];
        var bonus = 0;

        if (madLab >= 100) {
            bonus += Math.floor(madLab / 100) * 1000;
            madLab %= 100;
        }
        if (madLab >= 40) {
            bonus += 400;
            madLab -= 40;
        }
        if (madLab >= 20) {
            bonus += 200;
            madLab -= 20;
        }
        if (madLab >= 10) {
            bonus += 100;
            madLab -= 10;
        }
        if (madLab >= 1) {
            bonus += 50;
            madLab -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'PuppetMastersTheatre': function (s) {
        var puppetMastersTheatre = s[41];
        var bonus = 0;

        if (puppetMastersTheatre >= 100) {
            bonus += Math.floor(puppetMastersTheatre / 100) * 800;
            puppetMastersTheatre %= 100;
        }
        if (puppetMastersTheatre >= 40) {
            bonus += 300;
            puppetMastersTheatre -= 40;
        }
        if (puppetMastersTheatre >= 20) {
            bonus += 150;
            puppetMastersTheatre -= 20;
        }
        if (puppetMastersTheatre >= 10) {
            bonus += 80;
            puppetMastersTheatre -= 10;
        }
        if (puppetMastersTheatre >= 1) {
            bonus += 40;
            puppetMastersTheatre -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'ManorOfTheImmortals': function (s) {
        var manorOfTheImmortals = s[24];
        var bonus = 0;

        if (manorOfTheImmortals >= 100) {
            bonus += Math.floor(manorOfTheImmortals / 100) * 800;
            manorOfTheImmortals %= 100;
        }
        if (manorOfTheImmortals >= 40) {
            bonus += 300;
            manorOfTheImmortals -= 40;
        }
        if (manorOfTheImmortals >= 20) {
            bonus += 150;
            manorOfTheImmortals -= 20;
        }
        if (manorOfTheImmortals >= 10) {
            bonus += 80;
            manorOfTheImmortals -= 10;
        }
        if (manorOfTheImmortals >= 1) {
            bonus += 40;
            manorOfTheImmortals -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'HauntedCemetery': function (s) {
        var hauntedCemetery = s[28];
        var bonus = 0;

        if (hauntedCemetery >= 100) {
            bonus += Math.floor(hauntedCemetery / 100) * 1200;
            hauntedCemetery %= 100;
        }
        if (hauntedCemetery >= 40) {
            bonus += 500;
            hauntedCemetery -= 40;
        }
        if (hauntedCemetery >= 20) {
            bonus += 250;
            hauntedCemetery -= 20;
        }
        if (hauntedCemetery >= 10) {
            bonus += 120;
            hauntedCemetery -= 10;
        }
        if (hauntedCemetery >= 1) {
            bonus += 60;
            hauntedCemetery -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'CaveOfAThousandTreasures': function (s) {
        var caveOfAThousandTreasures = s[29];
        var bonus = 0;

        if (caveOfAThousandTreasures >= 100) {
            bonus += Math.floor(caveOfAThousandTreasures / 100) * 1200;
            caveOfAThousandTreasures %= 100;
        }
        if (caveOfAThousandTreasures >= 40) {
            bonus += 500;
            caveOfAThousandTreasures -= 40;
        }
        if (caveOfAThousandTreasures >= 20) {
            bonus += 250;
            caveOfAThousandTreasures -= 20;
        }
        if (caveOfAThousandTreasures >= 10) {
            bonus += 120;
            caveOfAThousandTreasures -= 10;
        }
        if (caveOfAThousandTreasures >= 1) {
            bonus += 60;
            caveOfAThousandTreasures -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'CandylandHuntingGrounds': function (s) {
        var candylandHuntingGrounds = s[27];
        var bonus = 0;

        if (candylandHuntingGrounds >= 100) {
            bonus += Math.floor(candylandHuntingGrounds / 100) * 1200;
            candylandHuntingGrounds %= 100;
        }
        if (candylandHuntingGrounds >= 40) {
            bonus += 500;
            candylandHuntingGrounds -= 40;
        }
        if (candylandHuntingGrounds >= 20) {
            bonus += 250;
            candylandHuntingGrounds -= 20;
        }
        if (candylandHuntingGrounds >= 10) {
            bonus += 120;
            candylandHuntingGrounds -= 10;
        }
        if (candylandHuntingGrounds >= 1) {
            bonus += 60;
            candylandHuntingGrounds -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'ParasiteChambers': function (s) {
        var parasiteChambers = s[52];
        var bonus = 0;

        if (parasiteChambers >= 100) {
            bonus += Math.floor(parasiteChambers / 100) * 3000;
            parasiteChambers %= 100;
        }
        if (parasiteChambers >= 40) {
            bonus += 1200;
            parasiteChambers -= 40;
        }
        if (parasiteChambers >= 20) {
            bonus += 600;
            parasiteChambers -= 20;
        }
        if (parasiteChambers >= 10) {
            bonus += 300;
            parasiteChambers -= 10;
        }
        if (parasiteChambers >= 1) {
            bonus += 150;
            parasiteChambers -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'DeadwaterDocks': function (s) {
        var deadwaterDocks = s[35];
        var bonus = 0;

        if (deadwaterDocks >= 100) {
            bonus += Math.floor(deadwaterDocks / 100) * 2000;
            deadwaterDocks %= 100;
        }
        if (deadwaterDocks >= 40) {
            bonus += 800;
            deadwaterDocks -= 40;
        }
        if (deadwaterDocks >= 20) {
            bonus += 400;
            deadwaterDocks -= 20;
        }
        if (deadwaterDocks >= 10) {
            bonus += 200;
            deadwaterDocks -= 10;
        }
        if (deadwaterDocks >= 1) {
            bonus += 100;
            deadwaterDocks -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'WoodlandLabyrinth': function (s) {
        var woodlandLabyrinth = s[37];
        var bonus = 0;

        if (woodlandLabyrinth >= 100) {
            bonus += Math.floor(woodlandLabyrinth / 100) * 2000;
            woodlandLabyrinth %= 100;
        }
        if (woodlandLabyrinth >= 40) {
            bonus += 800;
            woodlandLabyrinth -= 40;
        }
        if (woodlandLabyrinth >= 20) {
            bonus += 400;
            woodlandLabyrinth -= 20;
        }
        if (woodlandLabyrinth >= 10) {
            bonus += 200;
            woodlandLabyrinth -= 10;
        }
        if (woodlandLabyrinth >= 1) {
            bonus += 100;
            woodlandLabyrinth -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'TheCrawlingDepths': function (s) {
        var theCrawlingDepths = s[36];
        var bonus = 0;

        if (theCrawlingDepths >= 100) {
            bonus += Math.floor(theCrawlingDepths / 100) * 2000;
            theCrawlingDepths %= 100;
        }
        if (theCrawlingDepths >= 40) {
            bonus += 800;
            theCrawlingDepths -= 40;
        }
        if (theCrawlingDepths >= 20) {
            bonus += 400;
            theCrawlingDepths -= 20;
        }
        if (theCrawlingDepths >= 10) {
            bonus += 200;
            theCrawlingDepths -= 10;
        }
        if (theCrawlingDepths >= 1) {
            bonus += 100;
            theCrawlingDepths -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'SulfurousWetlands': function (s) {
        var sulfurousWetlands = s[93];
        var bonus = 0;

        if (sulfurousWetlands >= 100) {
            bonus += Math.floor(sulfurousWetlands / 100) * 2000;
            sulfurousWetlands %= 100;
        }
        if (sulfurousWetlands >= 40) {
            bonus += 800;
            sulfurousWetlands -= 40;
        }
        if (sulfurousWetlands >= 20) {
            bonus += 400;
            sulfurousWetlands -= 20;
        }
        if (sulfurousWetlands >= 10) {
            bonus += 200;
            sulfurousWetlands -= 10;
        }
        if (sulfurousWetlands >= 1) {
            bonus += 100;
            sulfurousWetlands -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'DavyJonesLocker': function (s) {
        var davyJonesLocker = s[31];
        var bonus = 0;

        if (davyJonesLocker >= 100) {
            bonus += Math.floor(davyJonesLocker / 100) * 2000;
            davyJonesLocker %= 100;
        }
        if (davyJonesLocker >= 40) {
            bonus += 800;
            davyJonesLocker -= 40;
        }
        if (davyJonesLocker >= 20) {
            bonus += 400;
            davyJonesLocker -= 20;
        }
        if (davyJonesLocker >= 10) {
            bonus += 200;
            davyJonesLocker -= 10;
        }
        if (davyJonesLocker >= 1) {
            bonus += 100;
            davyJonesLocker -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'MountainTemple': function (s) {
        var mountainTemple = s[44];
        var bonus = 0;

        if (mountainTemple >= 100) {
            bonus += Math.floor(mountainTemple / 100) * 3000;
            mountainTemple %= 100;
        }
        if (mountainTemple >= 40) {
            bonus += 1200;
            mountainTemple -= 40;
        }
        if (mountainTemple >= 20) {
            bonus += 600;
            mountainTemple -= 20;
        }
        if (mountainTemple >= 10) {
            bonus += 300;
            mountainTemple -= 10;
        }
        if (mountainTemple >= 1) {
            bonus += 150;
            mountainTemple -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'LairOfDraconis': function (s) {
        var lairOfDraconis = s[26];
        var bonus = 0;

        if (lairOfDraconis >= 100) {
            bonus += Math.floor(lairOfDraconis / 100) * 3500;
            lairOfDraconis %= 100;
        }
        if (lairOfDraconis >= 40) {
            bonus += 1400;
            lairOfDraconis -= 40;
        }
        if (lairOfDraconis >= 20) {
            bonus += 700;
            lairOfDraconis -= 20;
        }
        if (lairOfDraconis >= 10) {
            bonus += 350;
            lairOfDraconis -= 10;
        }
        if (lairOfDraconis >= 1) {
            bonus += 175;
            lairOfDraconis -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'TheThirdDimension': function (s) {
        var theThirdDimension = s[90];
        var bonus = 0;

        if (theThirdDimension >= 100) {
            bonus += Math.floor(theThirdDimension / 100) * 3000;
            theThirdDimension %= 100;
        }
        if (theThirdDimension >= 40) {
            bonus += 1200;
            theThirdDimension -= 40;
        }
        if (theThirdDimension >= 20) {
            bonus += 600;
            theThirdDimension -= 20;
        }
        if (theThirdDimension >= 10) {
            bonus += 300;
            theThirdDimension -= 10;
        }
        if (theThirdDimension >= 1) {
            bonus += 150;
            theThirdDimension -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'IceCave': function (s) {
        var iceCave = s[34];
        var bonus = 0;

        if (iceCave >= 100) {
            bonus += Math.floor(iceCave / 100) * 2500;
            iceCave %= 100;
        }
        if (iceCave >= 40) {
            bonus += 1000;
            iceCave -= 40;
        }
        if (iceCave >= 20) {
            bonus += 500;
            iceCave -= 20;
        }
        if (iceCave >= 10) {
            bonus += 250;
            iceCave -= 10;
        }
        if (iceCave >= 1) {
            bonus += 120;
            iceCave -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'OceanTrench': function (s) {
        var oceanTrench = s[22];
        var bonus = 0;

        if (oceanTrench >= 100) {
            bonus += Math.floor(oceanTrench / 100) * 3500;
            oceanTrench %= 100;
        }
        if (oceanTrench >= 40) {
            bonus += 1400;
            oceanTrench -= 40;
        }
        if (oceanTrench >= 20) {
            bonus += 700;
            oceanTrench -= 20;
        }
        if (oceanTrench >= 10) {
            bonus += 350;
            oceanTrench -= 10;
        }
        if (oceanTrench >= 1) {
            bonus += 175;
            oceanTrench -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'TombOfTheAncients': function (s) {
        var tombOfTheAncients = s[21];
        var bonus = 0;

        if (tombOfTheAncients >= 100) {
            bonus += Math.floor(tombOfTheAncients / 100) * 4000;
            tombOfTheAncients %= 100;
        }
        if (tombOfTheAncients >= 40) {
            bonus += 1600;
            tombOfTheAncients -= 40;
        }
        if (tombOfTheAncients >= 20) {
            bonus += 800;
            tombOfTheAncients -= 20;
        }
        if (tombOfTheAncients >= 10) {
            bonus += 400;
            tombOfTheAncients -= 10;
        }
        if (tombOfTheAncients >= 1) {
            bonus += 200;
            tombOfTheAncients -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'TheShatters': function (s) {
        var theShatters = s[39];
        var bonus = 0;

        if (theShatters >= 100) {
            bonus += Math.floor(theShatters / 100) * 10000;
            theShatters %= 100;
        }
        if (theShatters >= 40) {
            bonus += 4000;
            theShatters -= 40;
        }
        if (theShatters >= 20) {
            bonus += 2000;
            theShatters -= 20;
        }
        if (theShatters >= 10) {
            bonus += 1000;
            theShatters -= 10;
        }
        if (theShatters >= 1) {
            bonus += 500;
            theShatters -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'TheNest': function (s) {
        var theNest = s[45];
        var bonus = 0;

        if (theNest >= 100) {
            bonus += Math.floor(theNest / 100) * 4000;
            theNest %= 100;
        }
        if (theNest >= 40) {
            bonus += 1600;
            theNest -= 40;
        }
        if (theNest >= 20) {
            bonus += 800;
            theNest -= 20;
        }
        if (theNest >= 10) {
            bonus += 400;
            theNest -= 10;
        }
        if (theNest >= 1) {
            bonus += 200;
            theNest -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'FungalCavern': function (s) {
        var fungalCavern = s[57];
        var bonus = 0;

        if (fungalCavern >= 100) {
            bonus += Math.floor(fungalCavern / 100) * 5000;
            fungalCavern %= 100;
        }
        if (fungalCavern >= 40) {
            bonus += 2000;
            fungalCavern -= 40;
        }
        if (fungalCavern >= 20) {
            bonus += 1000;
            fungalCavern -= 20;
        }
        if (fungalCavern >= 10) {
            bonus += 500;
            fungalCavern -= 10;
        }
        if (fungalCavern >= 1) {
            bonus += 250;
            fungalCavern -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'CrystalCavern': function (s) {
        var crystalCavern = s[58];
        var bonus = 0;

        if (crystalCavern >= 100) {
            bonus += Math.floor(crystalCavern / 100) * 6000;
            crystalCavern %= 100;
        }
        if (crystalCavern >= 40) {
            bonus += 2400;
            crystalCavern -= 40;
        }
        if (crystalCavern >= 20) {
            bonus += 1200;
            crystalCavern -= 20;
        }
        if (crystalCavern >= 10) {
            bonus += 600;
            crystalCavern -= 10;
        }
        if (crystalCavern >= 1) {
            bonus += 300;
            crystalCavern -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'LostHalls': function (s) {
        var lostHalls = s[47];
        var bonus = 0;

        if (lostHalls >= 100) {
            bonus += Math.floor(lostHalls / 100) * 6000;
            lostHalls %= 100;
        }
        if (lostHalls >= 40) {
            bonus += 2400;
            lostHalls -= 40;
        }
        if (lostHalls >= 20) {
            bonus += 1200;
            lostHalls -= 20;
        }
        if (lostHalls >= 10) {
            bonus += 600;
            lostHalls -= 10;
        }
        if (lostHalls >= 1) {
            bonus += 300;
            lostHalls -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'CultistHideout': function (s) {
        var cultistHideout = s[48];
        var bonus = 0;

        if (cultistHideout >= 100) {
            bonus += Math.floor(cultistHideout / 100) * 7000;
            cultistHideout %= 100;
        }
        if (cultistHideout >= 40) {
            bonus += 3000;
            cultistHideout -= 40;
        }
        if (cultistHideout >= 20) {
            bonus += 1500;
            cultistHideout -= 20;
        }
        if (cultistHideout >= 10) {
            bonus += 700;
            cultistHideout -= 10;
        }
        if (cultistHideout >= 1) {
            bonus += 350;
            cultistHideout -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'TheVoid': function (s) {
        var theVoid = s[49];
        var bonus = 0;

        if (theVoid >= 100) {
            bonus += Math.floor(theVoid / 100) * 8000;
            theVoid %= 100;
        }
        if (theVoid >= 40) {
            bonus += 3200;
            theVoid -= 40;
        }
        if (theVoid >= 20) {
            bonus += 1600;
            theVoid -= 20;
        }
        if (theVoid >= 10) {
            bonus += 800;
            theVoid -= 10;
        }
        if (theVoid >= 1) {
            bonus += 400;
            theVoid -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'KogboldSteamworks': function (s) {
        var kogboldSteamworks = s[94];
        var bonus = 0;

        if (kogboldSteamworks >= 100) {
            bonus += Math.floor(kogboldSteamworks / 100) * 8000;
            kogboldSteamworks %= 100;
        }
        if (kogboldSteamworks >= 40) {
            bonus += 3200;
            kogboldSteamworks -= 40;
        }
        if (kogboldSteamworks >= 20) {
            bonus += 1600;
            kogboldSteamworks -= 20;
        }
        if (kogboldSteamworks >= 10) {
            bonus += 800;
            kogboldSteamworks -= 10;
        }
        if (kogboldSteamworks >= 1) {
            bonus += 400;
            kogboldSteamworks -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'MoonlightVillage': function (s) {
        var moonlightVillage = s[95];
        var bonus = 0;

        if (moonlightVillage >= 100) {
            bonus += Math.floor(moonlightVillage / 100) * 6000;
            moonlightVillage %= 100;
        }
        if (moonlightVillage >= 40) {
            bonus += 2400;
            moonlightVillage -= 40;
        }
        if (moonlightVillage >= 20) {
            bonus += 1200;
            moonlightVillage -= 20;
        }
        if (moonlightVillage >= 10) {
            bonus += 600;
            moonlightVillage -= 10;
        }
        if (moonlightVillage >= 1) {
            bonus += 300;
            moonlightVillage -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'AdvancedKogboldSteamworks': function (s) {
        var advancedKogboldSteamworks = s[96];
        var bonus = 0;

        if (advancedKogboldSteamworks >= 100) {
            bonus += Math.floor(advancedKogboldSteamworks / 100) * 8000;
            advancedKogboldSteamworks %= 100;
        }
        if (advancedKogboldSteamworks >= 40) {
            bonus += 3200;
            advancedKogboldSteamworks -= 40;
        }
        if (advancedKogboldSteamworks >= 20) {
            bonus += 1600;
            advancedKogboldSteamworks -= 20;
        }
        if (advancedKogboldSteamworks >= 10) {
            bonus += 800;
            advancedKogboldSteamworks -= 10;
        }
        if (advancedKogboldSteamworks >= 1) {
            bonus += 400;
            advancedKogboldSteamworks -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'AdvancedNest': function (s) {
        var advancedNest = s[97];
        var bonus = 0;

        if (advancedNest >= 100) {
            bonus += Math.floor(advancedNest / 100) * 4000;
            advancedNest %= 100;
        }
        if (advancedNest >= 40) {
            bonus += 1600;
            advancedNest -= 40;
        }
        if (advancedNest >= 20) {
            bonus += 800;
            advancedNest -= 20;
        }
        if (advancedNest >= 10) {
            bonus += 400;
            advancedNest -= 10;
        }
        if (advancedNest >= 1) {
            bonus += 200;
            advancedNest -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'TheTavern': function (s) {
        var theTavern = s[98];
        var bonus = 0;

        if (theTavern >= 100) {
            bonus += Math.floor(theTavern / 100) * 3000;
            theTavern %= 100;
        }
        if (theTavern >= 40) {
            bonus += 1200;
            theTavern -= 40;
        }
        if (theTavern >= 20) {
            bonus += 600;
            theTavern -= 20;
        }
        if (theTavern >= 10) {
            bonus += 300;
            theTavern -= 10;
        }
        if (theTavern >= 1) {
            bonus += 150;
            theTavern -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'OryxsCastle': function (s) {
        var oryxsCastle = s[69];
        var bonus = 0;

        if (oryxsCastle >= 100) {
            bonus += Math.floor(oryxsCastle / 100) * 2000;
            oryxsCastle %= 100;
        }
        if (oryxsCastle >= 40) {
            bonus += 800;
            oryxsCastle -= 40;
        }
        if (oryxsCastle >= 20) {
            bonus += 400;
            oryxsCastle -= 20;
        }
        if (oryxsCastle >= 10) {
            bonus += 200;
            oryxsCastle -= 10;
        }
        if (oryxsCastle >= 1) {
            bonus += 100;
            oryxsCastle -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'LairOfShaitan': function (s) {
        var lairOfShaitan = s[51];
        var bonus = 0;

        if (lairOfShaitan >= 100) {
            bonus += Math.floor(lairOfShaitan / 100) * 2000;
            lairOfShaitan %= 100;
        }
        if (lairOfShaitan >= 40) {
            bonus += 800;
            lairOfShaitan -= 40;
        }
        if (lairOfShaitan >= 20) {
            bonus += 400;
            lairOfShaitan -= 20;
        }
        if (lairOfShaitan >= 10) {
            bonus += 200;
            lairOfShaitan -= 10;
        }
        if (lairOfShaitan >= 1) {
            bonus += 100;
            lairOfShaitan -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'PuppetMastersEncore': function (s) {
        var puppetMastersEncore = s[50];
        var bonus = 0;

        if (puppetMastersEncore >= 100) {
            bonus += Math.floor(puppetMastersEncore / 100) * 2000;
            puppetMastersEncore %= 100;
        }
        if (puppetMastersEncore >= 40) {
            bonus += 800;
            puppetMastersEncore -= 40;
        }
        if (puppetMastersEncore >= 20) {
            bonus += 400;
            puppetMastersEncore -= 20;
        }
        if (puppetMastersEncore >= 10) {
            bonus += 200;
            puppetMastersEncore -= 10;
        }
        if (puppetMastersEncore >= 1) {
            bonus += 100;
            puppetMastersEncore -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'CnidarianReef': function (s) {
        var cnidarianReef = s[54];
        var bonus = 0;

        if (cnidarianReef >= 100) {
            bonus += Math.floor(cnidarianReef / 100) * 2000;
            cnidarianReef %= 100;
        }
        if (cnidarianReef >= 40) {
            bonus += 800;
            cnidarianReef -= 40;
        }
        if (cnidarianReef >= 20) {
            bonus += 400;
            cnidarianReef -= 20;
        }
        if (cnidarianReef >= 10) {
            bonus += 200;
            cnidarianReef -= 10;
        }
        if (cnidarianReef >= 1) {
            bonus += 100;
            cnidarianReef -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'SecludedThicket': function (s) {
        var secludedThicket = s[55];
        var bonus = 0;

        if (secludedThicket >= 100) {
            bonus += Math.floor(secludedThicket / 100) * 2500;
            secludedThicket %= 100;
        }
        if (secludedThicket >= 40) {
            bonus += 1000;
            secludedThicket -= 40;
        }
        if (secludedThicket >= 20) {
            bonus += 500;
            secludedThicket -= 20;
        }
        if (secludedThicket >= 10) {
            bonus += 250;
            secludedThicket -= 10;
        }
        if (secludedThicket >= 1) {
            bonus += 125;
            secludedThicket -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'HighTechTerror': function (s) {
        var highTechTerror = s[64];
        var bonus = 0;

        if (highTechTerror >= 100) {
            bonus += Math.floor(highTechTerror / 100) * 2500;
            highTechTerror %= 100;
        }
        if (highTechTerror >= 40) {
            bonus += 1000;
            highTechTerror -= 40;
        }
        if (highTechTerror >= 20) {
            bonus += 500;
            highTechTerror -= 20;
        }
        if (highTechTerror >= 10) {
            bonus += 250;
            highTechTerror -= 10;
        }
        if (highTechTerror >= 1) {
            bonus += 125;
            highTechTerror -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'OryxsChamber': function (s) {
        var oryxsChamber = s[70];
        var bonus = 0;

        if (oryxsChamber >= 100) {
            bonus += Math.floor(oryxsChamber / 100) * 2500;
            oryxsChamber %= 100;
        }
        if (oryxsChamber >= 40) {
            bonus += 1000;
            oryxsChamber -= 40;
        }
        if (oryxsChamber >= 20) {
            bonus += 500;
            oryxsChamber -= 20;
        }
        if (oryxsChamber >= 10) {
            bonus += 250;
            oryxsChamber -= 10;
        }
        if (oryxsChamber >= 1) {
            bonus += 125;
            oryxsChamber -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'WineCellar': function (s) {
        var wineCellar = s[76];
        var bonus = 0;

        if (wineCellar >= 100) {
            bonus += Math.floor(wineCellar / 100) * 4000;
            wineCellar %= 100;
        }
        if (wineCellar >= 40) {
            bonus += 1600;
            wineCellar -= 40;
        }
        if (wineCellar >= 20) {
            bonus += 800;
            wineCellar -= 20;
        }
        if (wineCellar >= 10) {
            bonus += 400;
            wineCellar -= 10;
        }
        if (wineCellar >= 1) {
            bonus += 200;
            wineCellar -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'OryxsSanctuary': function (s) {
        var oryxsSanctuary = s[71];
        var bonus = 0;

        if (oryxsSanctuary >= 100) {
            bonus += Math.floor(oryxsSanctuary / 100) * 10000;
            oryxsSanctuary %= 100;
        }
        if (oryxsSanctuary >= 40) {
            bonus += 4000;
            oryxsSanctuary -= 40;
        }
        if (oryxsSanctuary >= 20) {
            bonus += 2000;
            oryxsSanctuary -= 20;
        }
        if (oryxsSanctuary >= 10) {
            bonus += 1000;
            oryxsSanctuary -= 10;
        }
        if (oryxsSanctuary >= 1) {
            bonus += 500;
            oryxsSanctuary -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'BelladonnasGarden': function (s) {
        var belladonnasGarden = s[40];
        var bonus = 0;

        if (belladonnasGarden >= 100) {
            bonus += Math.floor(belladonnasGarden / 100) * 3000;
            belladonnasGarden %= 100;
        }
        if (belladonnasGarden >= 40) {
            bonus += 1200;
            belladonnasGarden -= 40;
        }
        if (belladonnasGarden >= 20) {
            bonus += 600;
            belladonnasGarden -= 20;
        }
        if (belladonnasGarden >= 10) {
            bonus += 300;
            belladonnasGarden -= 10;
        }
        if (belladonnasGarden >= 1) {
            bonus += 150;
            belladonnasGarden -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'TheMachine': function (s) {
        var theMachine = s[74];
        var bonus = 0;

        if (theMachine >= 100) {
            bonus += Math.floor(theMachine / 100) * 2000;
            theMachine %= 100;
        }
        if (theMachine >= 40) {
            bonus += 800;
            theMachine -= 40;
        }
        if (theMachine >= 20) {
            bonus += 400;
            theMachine -= 20;
        }
        if (theMachine >= 10) {
            bonus += 200;
            theMachine -= 10;
        }
        if (theMachine >= 1) {
            bonus += 100;
            theMachine -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'RainbowRoad': function (s) {
        var rainbowRoad = s[72];
        var bonus = 0;

        if (rainbowRoad >= 100) {
            bonus += Math.floor(rainbowRoad / 100) * 100;
            rainbowRoad %= 100;
        }
        if (rainbowRoad >= 40) {
            bonus += 40;
            rainbowRoad -= 40;
        }
        if (rainbowRoad >= 20) {
            bonus += 20;
            rainbowRoad -= 20;
        }
        if (rainbowRoad >= 10) {
            bonus += 10;
            rainbowRoad -= 10;
        }
        if (rainbowRoad >= 1) {
            bonus += 5;
            rainbowRoad -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'MadGodMayhem': function (s) {
        var madGodMayhem = s[67];
        var bonus = 0;

        if (madGodMayhem >= 100) {
            bonus += Math.floor(madGodMayhem / 100) * 3000;
            madGodMayhem %= 100;
        }
        if (madGodMayhem >= 40) {
            bonus += 1200;
            madGodMayhem -= 40;
        }
        if (madGodMayhem >= 20) {
            bonus += 600;
            madGodMayhem -= 20;
        }
        if (madGodMayhem >= 10) {
            bonus += 300;
            madGodMayhem -= 10;
        }
        if (madGodMayhem >= 1) {
            bonus += 150;
            madGodMayhem -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'Malogia': function (s) {
        var malogia = s[68];
        var bonus = 0;

        if (malogia >= 100) {
            bonus += Math.floor(malogia / 100) * 2500;
            malogia %= 100;
        }
        if (malogia >= 40) {
            bonus += 1000;
            malogia -= 40;
        }
        if (malogia >= 20) {
            bonus += 500;
            malogia -= 20;
        }
        if (malogia >= 10) {
            bonus += 250;
            malogia -= 10;
        }
        if (malogia >= 1) {
            bonus += 125;
            malogia -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'Untaris': function (s) {
        var untaris = s[75];
        var bonus = 0;

        if (untaris >= 100) {
            bonus += Math.floor(untaris / 100) * 2500;
            untaris %= 100;
        }
        if (untaris >= 40) {
            bonus += 1000;
            untaris -= 40;
        }
        if (untaris >= 20) {
            bonus += 500;
            untaris -= 20;
        }
        if (untaris >= 10) {
            bonus += 250;
            untaris -= 10;
        }
        if (untaris >= 1) {
            bonus += 125;
            untaris -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'Forax': function (s) {
        var forax = s[61];
        var bonus = 0;

        if (forax >= 100) {
            bonus += Math.floor(forax / 100) * 2500;
            forax %= 100;
        }
        if (forax >= 40) {
            bonus += 1000;
            forax -= 40;
        }
        if (forax >= 20) {
            bonus += 500;
            forax -= 20;
        }
        if (forax >= 10) {
            bonus += 250;
            forax -= 10;
        }
        if (forax >= 1) {
            bonus += 125;
            forax -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'Katalund': function (s) {
        var katalund = s[66];
        var bonus = 0;

        if (katalund >= 100) {
            bonus += Math.floor(katalund / 100) * 2500;
            katalund %= 100;
        }
        if (katalund >= 40) {
            bonus += 1000;
            katalund -= 40;
        }
        if (katalund >= 20) {
            bonus += 500;
            katalund -= 20;
        }
        if (katalund >= 10) {
            bonus += 250;
            katalund -= 10;
        }
        if (katalund >= 1) {
            bonus += 125;
            katalund -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'BattleForTheNexus': function (s) {
        var battleForTheNexus = s[38];
        var bonus = 0;

        if (battleForTheNexus >= 100) {
            bonus += Math.floor(battleForTheNexus / 100) * 3000;
            battleForTheNexus %= 100;
        }
        if (battleForTheNexus >= 40) {
            bonus += 1200;
            battleForTheNexus -= 40;
        }
        if (battleForTheNexus >= 20) {
            bonus += 600;
            battleForTheNexus -= 20;
        }
        if (battleForTheNexus >= 10) {
            bonus += 300;
            battleForTheNexus -= 10;
        }
        if (battleForTheNexus >= 1) {
            bonus += 150;
            battleForTheNexus -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'IceTomb': function (s) {
        var iceTomb = s[65];
        var bonus = 0;

        if (iceTomb >= 100) {
            bonus += Math.floor(iceTomb / 100) * 3000;
            iceTomb %= 100;
        }
        if (iceTomb >= 40) {
            bonus += 1200;
            iceTomb -= 40;
        }
        if (iceTomb >= 20) {
            bonus += 600;
            iceTomb -= 20;
        }
        if (iceTomb >= 10) {
            bonus += 300;
            iceTomb -= 10;
        }
        if (iceTomb >= 1) {
            bonus += 150;
            iceTomb -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'SantasWorkshop': function (s) {
        var santasWorkshop = s[73];
        var bonus = 0;

        if (santasWorkshop >= 100) {
            bonus += Math.floor(santasWorkshop / 100) * 100;
            santasWorkshop %= 100;
        }
        if (santasWorkshop >= 40) {
            bonus += 40;
            santasWorkshop -= 40;
        }
        if (santasWorkshop >= 20) {
            bonus += 20;
            santasWorkshop -= 20;
        }
        if (santasWorkshop >= 10) {
            bonus += 10;
            santasWorkshop -= 10;
        }
        if (santasWorkshop >= 1) {
            bonus += 5;
            santasWorkshop -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'Beachzone': function (s) {
        var beachzone = s[91];
        var bonus = 0;

        if (beachzone >= 100) {
            bonus += Math.floor(beachzone / 100) * 100;
            beachzone %= 100;
        }
        if (beachzone >= 40) {
            bonus += 40;
            beachzone -= 40;
        }
        if (beachzone >= 20) {
            bonus += 20;
            beachzone -= 20;
        }
        if (beachzone >= 10) {
            bonus += 10;
            beachzone -= 10;
        }
        if (beachzone >= 1) {
            bonus += 5;
            beachzone -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'HiddenInterregnum': function (s) {
        var hiddenInterregnum = s[92];
        var bonus = 0;

        if (hiddenInterregnum >= 100) {
            bonus += Math.floor(hiddenInterregnum / 100) * 100;
            hiddenInterregnum %= 100;
        }
        if (hiddenInterregnum >= 40) {
            bonus += 40;
            hiddenInterregnum -= 40;
        }
        if (hiddenInterregnum >= 20) {
            bonus += 20;
            hiddenInterregnum -= 20;
        }
        if (hiddenInterregnum >= 10) {
            bonus += 10;
            hiddenInterregnum -= 10;
        }
        if (hiddenInterregnum >= 1) {
            bonus += 5;
            hiddenInterregnum -= 1;
        }

        return bonus > 0 ? { mul: 0, add: bonus } : 0;
    },
    'Tunnel Rat': function (s) {
        for (var i in tunnelrat) if (!s[i]) return 0;
        return { mul: 0.075, add: 3000 };
    },
    'Explosive Journey': function (s) {
        for (var i in explosivejourney) if (!s[i]) return 0;
        return { mul: 0.075, add: 3000 };
    },
    'Travel of the Decade': function (s) {
        for (var i in travelofthedecade) if (!s[i]) return 0;
        return { mul: 0.1, add: 5000 };
    },
    'First Steps': function (s) {
        for (var i in firststeps) if (!s[i]) return 0;
        return { mul: 0.025, add: 100 };
    },
    'King of the Mountains': function (s) {
        for (var i in kingofthemountains) if (!s[i]) return 0;
        return { mul: 0.05, add: 1000 };
    },
    'Conqueror of the Realm': function (s) {
        for (var i in conqueroroftherealm) if (!s[i]) return 0;
        return { mul: 0.1, add: 4000 };
    },
    'Enemy of the Court': function (s) {
        for (var i in enemyofthecourt) if (!s[i]) return 0;
        return { mul: 0.075, add: 3000 };
    },
    'Epic Battles': function (s) {
        for (var i in epicbattles) if (!s[i]) return 0;
        return { mul: 0.075, add: 2000 };
    },
    'Far Out': function (s) {
        for (var i in farout) if (!s[i]) return 0;
        return { mul: 0.05, add: 2000 };
    },
    'Hero of the Nexus': function (s) {
        for (var i in heroofthenexus) if (!s[i]) return 0;
        return { mul: 0.125, add: 5000 };
    },
    'Season’s Beatins': function (s) {
        for (var i in seasonsbeatins) if (!s[i]) return 0;
        return { mul: 0.125, add: 5000 };
    },
    'Realm of the Mad God': function (s) {
        for (var i in realmofthemadgod) if (!s[i]) return 0;
        return { mul: 0.25, add: 10000 };
    }
}

var goals = {
    'Tunnel Rat': function (s) {
        var r = [];
        for (var i in tunnelrat) {
            if (!s[i]) r.push(tunnelrat[i]);
        }
        return [r.join(', '), 'dungeons'];
    },
    'Explosive Journey': function (s) {
        var r = [];
        for (var i in explosivejourney) {
            if (!s[i]) r.push(explosivejourney[i]);
        }
        return [r.join(', '), 'dungeons'];
    },
    'Travel of the Decade': function (s) {
        var r = [];
        for (var i in travelofthedecade) {
            if (!s[i]) r.push(travelofthedecade[i]);
        }
        return [r.join(', '), 'dungeons'];
    },
    'First Steps': function (s) {
        var r = [];
        for (var i in firststeps) {
            if (!s[i]) r.push(firststeps[i]);
        }
        return [r.join(', '), 'dungeons'];
    },
    'King of the Mountains': function (s) {
        var r = [];
        for (var i in kingofthemountains) {
            if (!s[i]) r.push(kingofthemountains[i]);
        }
        return [r.join(', '), 'dungeons'];
    },
    'Conqueror of the Realm': function (s) {
        var r = [];
        for (var i in conqueroroftherealm) {
            if (!s[i]) r.push(conqueroroftherealm[i]);
        }
        return [r.join(', '), 'dungeons'];
    },
    'Enemy of the Court': function (s) {
        var r = [];
        for (var i in enemyofthecourt) {
            if (!s[i]) r.push(enemyofthecourt[i]);
        }
        return [r.join(', '), 'dungeons'];
    },
    'Epic Battles': function (s) {
        var r = [];
        for (var i in epicbattles) {
            if (!s[i]) r.push(epicbattles[i]);
        }
        return [r.join(', '), 'dungeons'];
    },
    'Far Out': function (s) {
        var r = [];
        for (var i in farout) {
            if (!s[i]) r.push(farout[i]);
        }
        return [r.join(', '), 'dungeons'];
    },
    'Hero of the Nexus': function (s) {
        var r = [];
        for (var i in heroofthenexus) {
            if (!s[i]) r.push(heroofthenexus[i]);
        }
        return [r.join(', '), 'dungeons'];
    },
    'Season’s Beatins': function (s) {
        var r = [];
        for (var i in seasonsbeatins) {
            if (!s[i]) r.push(seasonsbeatins[i]);
        }
        return [r.join(', '), 'dungeons'];
    },
    'Realm of the Mad God': function (s) {
        var r = [];
        for (var i in realmofthemadgod) {
            if (!s[i]) r.push(realmofthemadgod[i]);
        }
        return [r.join(', '), 'dungeons'];
    }
};



function readstats(pcstats) {
    function readInt32BE(str, idx) {
        var r = 0;
        for (var i = 0; i < 4; i++) {
            var t = str.charCodeAt(idx + 3 - i);
            r += t << (8 * i);
        }
        return r;
    }

    pcstats = pcstats || '';
    var b = atob(pcstats.replace(/-/g, '+').replace(/_/g, '/'));
    var i = 0;
    const end_of_unknown = 4;
    i = end_of_unknown;
    const end_of_flags = 20;
    let statsCount = 0;
    const statsFlagged = [];
    let totalFlagsRead = 0;
    while (i < end_of_flags) {
        const t = readInt32BE(b, i); i += 4;
        totalFlagsRead += 8 * 4;
        while (statsCount < totalFlagsRead) {
            if (t & (1 << (statsCount % (8 * 4)))) {
                statsFlagged.push(statsCount);
            }
            statsCount++
        }
    }
    function readNextStat() {
        let r = b.charCodeAt(i); i++;
        if (r < 0x40) {
            return r;
        }
        if (r >= 0x80 && r <= 0xBF) {
            r = r % 0x40;
            let bits_read = 6;
            while (i < b.length) {
                const f = b.charCodeAt(i); i++;
                r += ((f & 0x7F) << bits_read)
                if ((f & 0x80) === 0) {
                    return r;
                }
                bits_read += 7
                if (i >= b.length) {
                    console.error("Failed to properly read PCStats. Reached the end of the string while trying to read a number the last number read in PCString will be corrupted.");
                    return r;
                }
            }
        }
        else {
            console.error("Failed to properly read PCStats. Found hex (0x" + r.toString(16).padStart(2, '0') + ") at the begining of a number. Number was expected to be between 0x00 and 0x3F or between 0x80 and 0xBF. The rest of the PCString read will be corrupted.");
            return r;
        }
    }
    const stats = []
    while (i < b.length) {
        stats.push(readNextStat());
    }
    if (statsFlagged.length !== stats.length) {
        console.error("The falg vector is not consistent with the number of values read from PCStats. There are a different number of flags set (" + statsFlagged.length + ") than values in PCStats (" + stats.length + "). The values read from PCStats may be corrupted.")
    }

    const r = [];
    for (let j = 0; j < statsFlagged.length; j++) {
        r[statsFlagged[j]] = stats[j];
    }

    for (var i in pcstatnames) if (!r[i]) r[i] = 0;
    return r;
}

function printstats(c, d, dogoals, dostats, Mule) {
    var st = readstats(c.PCStats);
    var $c = $('<table class="pcstats">');
    var fame = +c.CurrentFame;

    function tline(name, val, cl) {
        $('<tr>')
            .append($('<td>').text(name))
            .append($('<td>').addClass(cl || 'pcstat').text(val))
            .appendTo($c);
    }
    function gline(t, b) {
        $('<tr>')
            .append($('<td colspan=2>')
                .addClass('goal')
                .append($('<span>').text(t))
                .append($('<span class="bonus">').text(b))).appendTo($c);
    }

    if (dogoals) {
        var p = '';
        for (var a in goals) {
            var x = goals[a](st);
            if (!x || x[0] <= 0) continue;
            var s = x[0] + ' for ';
            if (p !== x[1]) {
                p = x[1];
                s = '\u2022 ' + x[1] + ': ' + s
            }
            gline(s, a);
        }
    }
    if (!dostats) return $c;

    var date = new Date(setuptools.data.muledump.charsSeen[Mule.guid][c.id]).toLocaleString().match(/^(.*), (.*)$/);
    //tline('First Seen', date[1]);
    //tline('', date[2]);
    for (var i in st) {
        if (!st[i]) continue;
        var sname = pcstatnames[i] || '#' + i;
        tline(sname, st[i]);
    }
    if (st[20] > 59) {
        var v = st[20], r = [];
        var divs = { 'd': 24 * 60, 'h': 60, 'm': 1 }
        for (var s in divs) {
            if (r.length > 2) break;
            var t = Math.floor(v / divs[s]);
            if (t) r.push(t + s);
            v %= divs[s];
        }
        tline('Active', r.join(' '), 'info');
    }

    if (!fame) return $c;
    for (var k in bonuses) {
        var b = bonuses[k](st, c, d, fame);
        if (b === -1) {
            tline(k, 'Error');
            setuptools.app.muledump.warnData(Mule, 'bonuses', k);
            continue;
        }
        if (!b) continue;
        var incr = 0;
        if (typeof b === 'object') {
            incr += b.add;
            b = b.mul;
        }
        incr += Math.floor(fame * b);
        fame += incr;
        tline(k, '+' + incr, 'bonus');
    }
    tline('Total Fame', fame, 'bonus');

    return $c;
}