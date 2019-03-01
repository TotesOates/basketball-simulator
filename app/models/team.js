import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  homeGames: DS.hasMany('game', {inverse: 'homeTeam'}),
  awayGames: DS.hasMany('game', {inverse: 'awayTeam'}),
  
});
