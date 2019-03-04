import DS from "ember-data";
import { union, filterBy} from "@ember/object/computed";

export default DS.Model.extend({
  name: DS.attr("string"),
  homeGames: DS.hasMany("game", { inverse: "homeTeam" }),
  awayGames: DS.hasMany("game", { inverse: "awayTeam" }),

  games: union("homeGames", "awayGames"),

  homeGamesWon: filterBy("homeGames", "isHomeWin"),
  awayGamesWon: filterBy("awayGames", "isAwayWin"),
  gamesWon: union("homeGamesWon", "awayGamesWon"),

  homeGamesLost: filterBy("homeGames", "isAwayWin"),
  awayGamesLost: filterBy("awayGames", "isHomeWin"),
  gamesLost: union("homeGamesLost", "awayGamesLost"),

  gamesDrawn: filterBy("games", "isDraw"),
});
