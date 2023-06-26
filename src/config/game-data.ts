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
      'live_client_data',
      'jungle_camps',
      'team_frames',
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
      'live_client_data',
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
    description: 'LOL + TFT data',
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
      'me',
      'party',
      'hero_pool',
      'game',
      'game_state'
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
      'victory',
      'damage',
      'inventory',
      'localization',
    ],
    description: 'Apex data',
  },
  21570: {
    interestedInFeatures: [
      'counters',
      'match_info',
      'me',
      'roster',
      'store',
      'board',
      'bench',
      'carousel',
      'live_client_data',
      'augments',
      'game_info',
    ],
    description: 'TFT data',
  },
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
    interestedInFeatures: [
      'match_info',
      'game_info'
    ],
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
    ],
    description: 'Valorant data',
  },
  21848: {
    interestedInFeatures: [
      'match_info',
      'game_info'
    ],
    description: 'Diablo 2 data',
  },
  22700: {
    interestedInFeatures: [
      'match_info'
    ],
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
      'match_info',
      'game_info',
      'location'
    ],
    description: 'Lost Ark data',
  },
  21960: {
    interestedInFeatures: [
      'match_info',
      'game_info'
    ],
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
    interestedInFeatures: [
      'match_info',
      'game_info'
    ],
    description: 'MTGA data',
  },
  21816: {
    interestedInFeatures: [
      'game_info'
    ],
    description: 'New world data',
  },
  21668: {
    interestedInFeatures: [
      'game_info',
      'kill'
    ],
    description: 'Valheim data',
  },
  8954: {
    interestedInFeatures: [
      'game_info',
      'match_info'
    ],
    description: 'Warframe data',
  },
  6365: {
    interestedInFeatures: [
      'kill',
      'death',
      'game_info',
      'match_info'
    ],
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
    interestedInFeatures: [
      'location',
      'match_info'
    ],
    description: 'SOTF data',
  },
  22312: {
    interestedInFeatures: [
      'game_info',
      'match_info'
    ],
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
      'assist'
    ],
    description: 'Overwatch 2 data',
  },
};

export default data;
