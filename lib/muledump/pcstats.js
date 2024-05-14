var pcstatnames = {
    // stats
    0: 'Shots fired',
    1: 'Hits',
    2: 'Ability uses',
    3: 'Tiles discovered',
    4: 'Teleports',
    5: 'Potions drunk',
    6: 'Kills',
    7: 'Assists',
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
    8: 'God kills',
    9: 'Assists against Gods',
    10: 'Cube kills',
    11: 'Oryx kills',
    12: 'Quests completed',
    20: 'Minutes active',
    60: 'Dungeon types completed',
    //??: 'Stat Potions consumed',

    //dungeon compleats
    13: 'Pirate Caves',
    14: 'Undead Lairs',
    15: 'Abyss of Demons',
    16: 'Snake Pits',
    17: 'Spider Dens',
    18: 'Sprites',
    21: 'Tombs',
    22: 'Trenches',
    23: 'Jungles',
    24: 'Manors',
    25: 'Forest Mazes',
    26: 'LODs',
    27: 'Candylands',
    28: 'Cemeteries',
    29: 'Cave of Treasure',
    30: 'Mad Labs',
    31: 'Lockers',
    34: 'Ice Caves',
    35: 'Docks',
    36: 'Depths',
    37: 'Labyrinths',
    38: 'Battle For Nexus',
    39: 'Shatters',
    40: 'Belladonna',
    41: 'Theatres',
    42: 'Sewers',
    43: 'Hives',
    44: 'Mountain Temples',
	45: 'Nests',
    46: 'Hard LODs',
    47: 'Lost Halls',
    48: 'Cultist Hideouts',
    49: 'Voids',
    50: 'Encores',
    51: 'Shaitans',
    52: 'Chambers',
    53: 'Magic Woods',
    54: 'Reefs',
    55: 'Thickets',
    56: 'Libraries',
    57: 'Fungal Caverns',
    58: 'Crystal Caverns',
    59: 'Ancient Ruins',
    69: 'Ory\'s Castles',
    70: 'Orx\'s Chambers',
    71: 'Oryx\'s Sanctuaries',
    76: 'Wine Cellars',
    93: 'Sulfurus Wetlands',
    94: 'Kobold Steamworks',
    95: 'Moonlight Villages',
    96: 'Adv Kobold Steamworks',
    97: 'Adv Nests'
};

var shortdungeonnames = { // sorted by "tier"
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

var bonuses = {
    'Ancestor': function(s, c, d) {
        return (parseInt(d.Account.Stats.TotalFame) === 0) ? { mul: 0, add: 20 } : 0;
    },
    'Maxed': function(s, c, d) {
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
    'Cartography': function(s) {
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
    'QuestCompletes': function(s) {
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
    'EnemyHit': function(s) {
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
    'PartyLevelUps': function(s) {
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
    'PotionDrinker': function(s) {
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
    'AbilityUse': function(s) {
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
    'Teleports': function(s) {
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
    'MonsterKills': function(s) {
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
    'GodKills': function(s) {
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
    'LesserGodKills': function(s) {
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
    'OryxKills': function(s) {
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
    'EncounterKills': function(s) {
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
    'HeroKills': function(s) {
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
    'CubeKills': function(s) {
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
    'CritterKills': function(s) {
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
    'BeastKills': function(s) {
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
    'HumanoidKills': function(s) {
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
    'UndeadKills': function(s) {
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
    'NatureKills': function(s) {
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
    'ConstructKills': function(s) {
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
    'GrotesqueKills': function(s) {
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
    'StructureKills': function(s) {
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
    
    
    
    
    'Tunnel Rat': function(s) {
        for (var i in shortdungeonnames) if (!s[i]) return 0;
        return 0.1;
    }
}

var goals = {
    'Tunnel Rat': function(s) {
        var r = [];
        for (var i in shortdungeonnames) {
            if (!s[i]) r.push(shortdungeonnames[i]);
        }
        return [r.join(', '), 'dungeons'];
    }
}


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
        const t = readInt32BE(b,i); i += 4;
        totalFlagsRead += 8*4;
        while (statsCount < totalFlagsRead) {
            if(t & (1<<(statsCount%(8*4))))
            {
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
            console.error("Failed to properly read PCStats. Found hex (0x"+r.toString(16).padStart(2,'0')+") at the begining of a number. Number was expected to be between 0x00 and 0x3F or between 0x80 and 0xBF. The rest of the PCString read will be corrupted.");
            return r;
        }
    }
    const stats = []
    while (i < b.length) {
        stats.push(readNextStat());
    }
    if (statsFlagged.length !== stats.length)
    {
        console.error("The falg vector is not consistent with the number of values read from PCStats. There are a different number of flags set ("+statsFlagged.length+") than values in PCStats ("+stats.length+"). The values read from PCStats may be corrupted.")
    }

    const r = [];
    for (let j=0; j < statsFlagged.length; j++) {
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
    if (st[0] && st[1]) {
        tline('Accuracy', Math.round(10000 * st[1] / st[0]) / 100 + '%', 'info');
    }
    if (st[8]) {
        tline('God kill ratio', Math.round(10000 * st[8] / (st[6] + st[8])) / 100 + '%', 'info');
    }

    if (!fame) return $c;
    for (var k in bonuses) {
        var b = bonuses[k](st, c, d, fame);
        if ( b === -1 ) {
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
