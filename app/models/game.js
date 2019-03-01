import DS from 'ember-data';

export default DS.Model.extend({
  pointsFor: DS.attr('number'),
  pointsAgainst: DS.attr('number'),

  homeTeam: DS.belongsTo('team', {inverse: 'homeGames'}),
  awayTeam: DS.belongsTo('team', {inverse: 'awayGame'}),

  playedOn: DS.attr('date'),
});
