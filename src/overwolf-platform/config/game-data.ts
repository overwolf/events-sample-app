interface GameData {
  interestedInFeatures?: string[];
  description: string;
}

const data: { [id: number]: GameData } = {
  765: {
    interestedInFeatures: ['game_info', 'addons'],
    description: 'WOW data',
  },
  5426: {
    interestedInFeatures: [
      'summoner_info',
      'teams',
      'matchState',
      'kill',
      'death',
      'respawn',
      'assist',
      'minions',
      'level',
      'abilities',
      'announcer',
      'counters',
      'match_info',
      'damage',
      'heal',
      `gold`,
    //'live_client_data',
      'jungle_camps',
      'team_frames',
      //TFT:
      'counters',
      'match_info',
      'me',
      'roster',
      'store',
      'board',
      'bench',
      'carousel',
      'augments',
      'game_info',
    ],
    description: 'LOL data',
  },
  22848: {
    interestedInFeatures: [
      'summoner_info',
      'gameMode',
      'teams',
      'matchState',
      'kill',
      'death',
      'respawn',
      'assist',
      'minions',
      'level',
      'abilities',
      'announcer',
      'counters',
      'match_info',
      'damage',
      'heal',
      'gold',
    // 'live_client_data',
      'jungle_camps',
      'team_frames',
      'me',
      'roster',
      'store',
      'board',
      'bench',
      'carousel',
      'augments',
      'game_info',
    ],
    description: 'LOL + TFT PBE data',
  },
  7212: {
    interestedInFeatures: [
      'kill',
      'death',
      'killer',
      'me',
      'match_info',
      'game_info',
    ],
    description: 'POE data',
  },
  7314: {
    interestedInFeatures: [
      'kill',
      'death',
      'hero_ability_used',
      'game_state_changed',
      'match_detected',
      'match_state_changed',
      'match_ended',
      'daytime_changed',
      'ward_purchase_cooldown_changed',
      'assist',
      'death',
      'cs',
      'roster',
      'match_info',
      'party',
      'hero_ability_skilled',
      'hero_ability_used',
      'hero_ability_changed',
      'hero_attributes_skilled',
      'me',
      'party',
      'hero_pool',
      'game',
      'game_state',
    // these are also supported but spam the console as they happen a lot:
      'clock_time_changed',
      'xpm',
      'gpm',
      'gold',
      'hero_buyback_info_changed',
      'hero_health_mana_info',
      'hero_ability_cooldown_changed',
      'hero_item_cooldown_changed', 
      `damage`
    ],
    description: 'Dota match state data',
  },
  7764: {
    interestedInFeatures: [
      'kill',
      'death',
      'assist',
      'headshot',
      'round_start',
      'match_start',
      'match_end',
      'team_round_win',
      'bomb_planted',
      'bomb_change',
      'reloading',
      'fired',
      'weapon_change',
      'weapon_acquired',
      'player_activity_change',
      'team_set',
      'info',
      'roster',
      'scene',
      'match_info',
      'replay',
      'counters',
      'mvp',
      'kill_feed',
      'scoreboard',
      'score',
    ],
    description: 'CS:GO data',
  },
  8032: {
    interestedInFeatures: ['game_info', 'match_info', 'counters'],
    description: 'Minecraft data',
  },
  10798: {
    interestedInFeatures: [
      'stats',
      'roster',
      'match',
      'me',
      'match_info',
      'death',
      'game_info',
      'training'
    ],
    description: 'Rocket league data',
  },
  10826: {
    interestedInFeatures: [
      'game_info',
      'match',
      'roster',
      'kill',
      'death',
      'match_info',
      'defuser',
      'me',
    ],
    description: 'R6 data',
  },
  10906: {
    interestedInFeatures: [
      'kill',
      'revived',
      'death',
      'killer',
      'match',
      'rank',
      'location',
      'me',
      'team',
      'phase',
      'map',
      'roster',
      'inventory',
      'match_info',
      'counters',
    ],
    description: 'PUBG data',
  },
  21216: {
    interestedInFeatures: [
      'kill',
      'killed',
      'killer',
      'revived',
      'death',
      'match',
      'rank',
      'me',
      'phase',
      'location',
      'roster',
      'team',
      'items',
      'counters',
      'match_info',
      'game_info',
      'map',
    ],
    description: 'Fortnite data',
  },
  21566: {
    interestedInFeatures: [
      'death',
      'kill',
      'match_state',
      'me',
      'revive',
      'team',
      'roster',
      'kill_feed',
      'rank',
      'match_summary',
      'location',
      'match_info',
      'game_info',
      'victory',
      'damage',
      'inventory',
      'localization',
    ],
    description: 'Apex data',
  },
  /* 21570: {
    interestedInFeatures: [
      'counters',
      'match_info',
      'me',
      'roster',
      'store',
      'board',
      'bench',
      'carousel',
      //'live_client_data',
      'augments',
      'game_info',
    ],
    description: 'TFT data',
  }, */
  21626: {
    interestedInFeatures: [
      'game_info',
      'match_info',
      'kill',
      'death',
      'gep_internal',
      'assist',
    ],
    description: 'COD warzone data',
  },
  21634: {
    interestedInFeatures: ['match_info', 'game_info'],
    description: 'Tarkov data',
  },
  21640: {
    interestedInFeatures: [
      'game_info',
      'me',
      'match_info',
      'kill',
      'death',
      'gep_internal',
      'location'
    ],
    description: 'Valorant data',
  },
  22904: {
    interestedInFeatures: [
      'game_info',
      'me',
      'match_info',
      'kill',
      'death',
      'gep_internal',
      'location'
    ],
    description: 'Valorant PBE data',
  },
  21848: {
    interestedInFeatures: ['match_info', 'game_info'],
    description: 'Diablo 2 data',
  },
  22700: {
    interestedInFeatures: ['match_info','game_info','me','location'],
    description: 'Diablo 4 data',
  },
  21854: {
    interestedInFeatures: [
      'game_info',
      'match_info',
      'kill',
      'assist',
      'death',
    ],
    description: 'Halo data',
  },
  21864: {
    interestedInFeatures: [
      'game_info',
      'match_info',
      'location',
    ],
    description: 'Lost Ark data',
  },
  21960: {
    interestedInFeatures: ['match_info', 'game_info'],
    description: 'Axie data',
  },
  21876: {
    interestedInFeatures: [
      'game_info',
      'match_info',
      'kill',
      'death',
      'gep_internal',
      'me',
    ],
    description: 'COD Vanguard data',
  },
  9898: {
    interestedInFeatures: [
      'scene_state',
      'collection',
      'decks',
      'match',
      'match_info',
      'arena',
    ],
    description: 'Hearthstone data',
  },
  10624: {
    interestedInFeatures: [
      'match_info',
      'me',
      'game_info',
      'roster',
      'kill',
      'death',
      'me',
      'bans',
      'draft',
    ],
    description: 'Hots data',
  },
  10902: {
    interestedInFeatures: [
      'game_flow',
      'summoner_info',
      'champ_select',
      'lcu_info',
      'lobby_info',
      'end_game',
      'game_info',
    ],
    description: 'LEP data',
  },
  21308: {
    interestedInFeatures: ['match_info', 'game_info'],
    description: 'MTGA data',
  },
  21816: {
    interestedInFeatures: ['game_info'],
    description: 'New world data',
  },
  21668: {
    interestedInFeatures: ['game_info', 'kill'],
    description: 'Valheim data',
  },
  8954: {
    interestedInFeatures: ['game_info', 'match_info'],
    description: 'Warframe data',
  },
  6365: {
    interestedInFeatures: ['kill', 'death', 'game_info', 'match_info'],
    description: 'WOT data',
  },
  10746: {
    interestedInFeatures: [
      'game_info',
      'account_info',
      'match',
      'kill',
      'death',
      'match_info',
    ],
    description: 'WOWS data',
  },
  22638: {
    interestedInFeatures: ['location', 'match_info'],
    description: 'SOTF data',
  },
  22312: {
    interestedInFeatures: ['game_info', 'match_info'],
    description: 'Leap data',
  },
  22092: {
    description: 'Goose Goose Duck data',
  },
  22250: {
    description: 'SquadBlast data',
  },
  10844: {
    interestedInFeatures: [
      'game_info',
      'match_info',
      'kill',
      'death',
      'assist',
      'roster'
    ],
    description: 'Overwatch 2 data',
  },
  22730: {
    interestedInFeatures: [
      'match_info',
      'live_data'
    ],
    description: 'CS2 data',
  },
  23222: {
    interestedInFeatures: [
      'match_info',
      `location`
    ],
    description: 'Starfield data',
  },
  22088: {
    interestedInFeatures: [
      'game_info',
      'match_info',
      'location'
    ],
    description: 'Baldurs gate 3 data',
  },
  23424: {
    interestedInFeatures: [
      'game_info',
      'match_info',
    ],
    description: 'Call of Duty: Modern Warfare 3 data / Warzone 2 data',
  },
  22328: {
    interestedInFeatures: [
      'game_info',
      'match_info',
    ],
    description: 'Call of Duty: Modern Warfare 2',
  },
  21656: {
    interestedInFeatures: [
      'game_info',
      'match_info',
    ],
    description: 'Genshin Impact',
  },
  21620: {
    interestedInFeatures: [
      'game_client_data',
      'match_info',
    ],
    description: 'Legends of Runeterra',
  },
  23522: {
    interestedInFeatures: [
      'game_info',
      'match_info',
    ],
    description: 'Lethal Company data',
  },
  23478: {
    interestedInFeatures: [
      'game_info'
    ],
    description: 'The finals data',
  },
  23944: {
    interestedInFeatures: [
      'game_info',
      'match_info',
      `location`
    ],
    description: 'Palworld data',
  },
  24504: {
    interestedInFeatures: [
      'game_info',
      'match_info'
    ],
    description: 'Black Myth Wukong',
  },
  24482: {
    interestedInFeatures: [
      'game_info',
      'match_ingo',
      'me'
    ],
    description: 'Deadlock',
  },
  24548: {
    interestedInFeatures: [
      'game_info',
      'match_info'
    ],
    description: 'Warhammer 40000 Space Marine 2',
  },
  23930: {
    interestedInFeatures: [
      'game_info',
      'match_info'
    ],
    description: 'Once Human',
  },
  24000: {
    interestedInFeatures: [
      'game_info',
      'match_info'
    ],
    description: 'Helldivers 2',
  },
  24110: {
    interestedInFeatures: [
      'game_info',
      'match_info'
    ],
    description: 'Content Warning',
  },
  22584: {
    interestedInFeatures: [
      'game_info',
      'match_info'
    ],
    description: 'Dark and Darker',
  },
  22804: {
    interestedInFeatures: [
      'game_info',
      'match_info'
    ],
    description: 'Honkai Star Rail',
  },
  24176: {
    interestedInFeatures: [
      'game_info',
      'match_info'
    ],
    description: 'Manor Lords',
  },
  4688: {
    interestedInFeatures: [
      'game_info',
      'match_info'
    ],
    description: 'Roblox',
  },
  24360: {
    interestedInFeatures: [
      'game_info',
      'match_info'
    ],
    description: 'The First Descendant',
  },
  24300: {
    interestedInFeatures: [
      'game_info',
      'match_info'
    ],
    description: 'Wuthering Waves',
  },
  22994: {
    interestedInFeatures: [
      'game_info',
      'match_ingo',
    ],
    description: 'XDefiant',
  },
  24218: {
    interestedInFeatures: [
      'game_info',
      'match_ingo',
    ],
    description: 'Hades 2',
  },
  6350: {
    interestedInFeatures: [
      'match_info'
    ],
    description: 'Final Fantasy XIV',
  },
  24484: {
    interestedInFeatures: [
      'game_info',
      'match_info'
    ],
    description: 'Spectre data',
  },
};

export default data;
