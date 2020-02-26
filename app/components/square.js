import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { action } from '@ember/object';

export default class SquareComponent extends Component {
  @tracked shape = '';

  get shape2() {
    console.log(this.content, this.number);
    return this.content[this.number];
  }

  get value() {
    this.shape = this.args.content[this.args.number];
    let value;
    switch (this.shape) {
      case 'CIRCLE':
        value = 'panorama_fish_eye';
        break;
      case 'CROSS':
        value = 'close';
        break;
      default:
        value = '';
    }
    return value;
  }

  @action
  turn(player, number) {
    if (this.shape === '') {
      this.shape = player;
      this.args.updateTurn(number, this.shape);
    }
  }
}
