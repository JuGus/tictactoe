import Route from '@ember/routing/route';

export default class GameRoute extends Route {
  model() {
    return {
      positions: [
        '0', '1', '2',
        '3', '4', '5',
        '6', '7', '8'
      ]};
  }
}
