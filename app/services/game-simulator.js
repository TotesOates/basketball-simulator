import Service from '@ember/service';
import inject from '@ember/service';
import { later } from '@ember/runloop';
import { shuffle } from 'ember-composable-helpers/helpers/shuffle';
import { computed } from '@ember/object';
import { SSL_OP_NETSCAPE_CA_DN_BUG } from 'constants';
import { builtinModules } from 'module';

const DELAY_BETWEEN_GAMES = 100;

export default Service.extend({
  store: inject(),

  teams: computed(function(){
    return this.store.peakAll('team');
  }),

  games: computed(function(){
    return this.store.peakAll('game');
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
      this.store.createRecord('team', {id: i, name: teamNames[i]});
    }
  }
});
