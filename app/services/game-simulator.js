import Service from '@ember/service';
import { inject} from '@ember/service';
import { later } from '@ember/runloop';
import { computed } from '@ember/object';
import { shuffle } from 'ember-composable-helpers/helpers/shuffle';


const DELAY_BETWEEN_GAMES = 5000;

export default Service.extend({
  store: inject(),

  teams: computed(function(){
    return this.store.peekAll('team');
  }),

  games: computed(function(){
    return this.store.peekAll('game');
  }),

  init() {
    this._super(...arguments);

    this.seedTeams();

    later(this, this.simulateGame, DELAY_BETWEEN_GAMES);
  },

  seedTeams(){
    let teamNames = [
      'Atlanta Hawks', 'Boston Celtics',
      'Brooklyn Nets', 'Charlotte Hornets',
      'Chicago Bulls', 'Cleveland Cavaliers',
      'Dallas Mavericks', 'Denver Nuggets',
      'Detroit Pistons', 'Golden State Warriors', 
      'Houston Rockets', 'Indiana Pacers', 
      'LA Clippers', 'Los Angeles Lakers',
      'Memphis Grizzlies', 'Miami Heat', 
      'Milwaukee Bucks', 'Minnesota Timberwolves',
      'New Orleans Pelicans', 'New York Knicks',
      'Oklahoma City Thunder', 'Orlando Magic',
      'Philadelphia 76ers', 'Phoenix Suns',
      'Portland TrailBlazers' 
    ];

    for (let i = 0; i < teamNames.length; i++){
      this.store.createRecord('team', {id: i, name: teamNames[i]})
    }
  },

  simulateGame(){
    let teams = this.store.peekAll('team');
    let shuffledTeams = shuffle(teams);

    let homeTeam = shuffledTeams[0];
    let awayTeam = shuffledTeams[1];

    let homeGoals = this.randomScore(80);
    let awayGoals = this.randomScore(70);

    this.store.createRecord('game', {
      homeTeam,
      awayTeam,
      homeGoals,
      awayGoals,
      playedOnDate: new Date()
    });

    later(this, this.simulateGame, DELAY_BETWEEN_GAMES);
  },

  randomScore(scoreMultiplier){
    return Math.round((Math.random() * scoreMultiplier + 60));
  }
});
