const MAX_TEAMS = 4;

// Generates a random treasure location within a given range of latitude and longitude
function generateTreasureLocation(minLat, maxLat, minLng, maxLng) {
  const lat = Math.random() * (maxLat - minLat) + minLat;
  const lng = Math.random() * (maxLng - minLng) + minLng;
  return { lat, lng };
}

// Generates an array of teams with unique team IDs
function generateTeams(numTeams) {
  const teams = [];
  for (let i = 1; i <= numTeams; i++) {
    teams.push({ id: i, members: [] });
  }
  return teams;
}

// Assigns a random team to each player in the players array
function assignTeams(players, teams) {
  const shuffledTeams = teams.sort(() => 0.5 - Math.random());
  players.forEach((player, index) => {
    const teamIndex = index % teams.length;
    const team = shuffledTeams[teamIndex];
    team.members.push(player);
    player.teamId = team.id;
  });
}

// Creates a new game with the given players and treasure location
function createGame(players, treasureLocation) {
  const teams = generateTeams(MAX_TEAMS);
  assignTeams(players, teams);
  const gameState = {
    treasureLocation,
    players,
    teams,
    interceptedTeams: [],
    winner: null,
  };
  return gameState;
}

// Gets the team object with the given team ID
function getTeamById(teams, teamId) {
  return teams.find((team) => team.id === teamId);
}

// Removes the player with the given ID from the game
function removePlayer(gameState, playerId) {
  const { players, teams } = gameState;

  // Remove player from players array
  const index = players.findIndex((player) => player.id === playerId);
  if (index !== -1) {
    players.splice(index, 1);
  }

  // Remove player from their team
  const team = getTeamById(teams, players[index].teamId);
  const memberIndex = team.members.findIndex(
    (member) => member.id === playerId
  );
  if (memberIndex !== -1) {
    team.members.splice(memberIndex, 1);
  }

  // Check if the team has any more members left
  if (team.members.length === 0) {
    // Remove team from teams array
    const teamIndex = teams.findIndex((team) => team.id === team.id);
    if (teamIndex !== -1) {
      teams.splice(teamIndex, 1);
    }
  }
}

// Checks if a team has found the treasure
function checkForWinner(gameState) {
  const { teams, treasureLocation } = gameState;
  const teamWithTreasure = teams.find((team) => {
    const playerWithTreasure = team.members.find((player) => {
      return player.hasTreasure;
    });
    if (!playerWithTreasure) {
      return false;
    }
    const { lat, lng } = playerWithTreasure.location;
    return lat === treasureLocation.lat && lng === treasureLocation.lng;
  });
  if (teamWithTreasure) {
    gameState.winner = teamWithTreasure.id;
  }
}

function generateGame(numTeams) {
  const teams = [];
  for (let i = 1; i <= numTeams; i++) {
    teams.push({
      name: `Team ${i}`,
    });
  }

  const players = [];
  for (let i = 1; i <= numTeams * 3; i++) {
    const teamName = `Team ${Math.ceil(i / 3)}`;
    players.push({
      name: `Player ${i}`,
      teamName,
      hasTreasure: false,
    });
  }

  // Assign treasure to a random player
  // const randomPlayerIndex = Math.floor(Math.random() * players.length);
  // players[randomPlayerIndex].hasTreasure = true;

  return {
    teams,
    players,
  };
}

module.exports = {
  generateTreasureLocation,
  generateTeams,
  assignTeams,
  createGame,
  getTeamById,
  removePlayer,
  checkForWinner,
  generateGame,
};
