import Controller from '@ember/controller';
import { tracked } from "@glimmer/tracking";
import { action } from '@ember/object';

export default class GameController extends Controller {
  @tracked symbol = 'CIRCLE';
  @tracked gameTurns = ['', '', '', '', '', '', '', '', ''];
  @tracked isWinner = false;
  @tracked winner = '';
  @tracked isGameOver = false;
  @tracked scores = {x: 0, o: 0};
  @tracked isDraw = false;

  get message() {
    if (this.isWinner) {this.isGameOver = true;}
    if (this.isGameOver) {
      return `Game over`;
    } else {
      return `Turn ${this.symbol}`;
    }
  }
  get getScores() {
    let x1 = this.scores.x, o1 = this.scores.o;
    if (this.isWinner && !this.isDraw) {
      if (this.winner === 'CIRCLE') {
        o1++;
      } else {
        x1++;
      }
    }
    return {x: x1, o: o1};
  }

  get detectWinner() {
    if (this.gameTurns[0] === 'CIRCLE' && this.gameTurns[1] === 'CIRCLE' && this.gameTurns[2] === 'CIRCLE') return 'CIRCLE';
    if (this.gameTurns[3] === 'CIRCLE' && this.gameTurns[4] === 'CIRCLE' && this.gameTurns[5] === 'CIRCLE') return 'CIRCLE';
    if (this.gameTurns[6] === 'CIRCLE' && this.gameTurns[7] === 'CIRCLE' && this.gameTurns[8] === 'CIRCLE') return 'CIRCLE';

    if (this.gameTurns[0] === 'CIRCLE' && this.gameTurns[3] === 'CIRCLE' && this.gameTurns[6] === 'CIRCLE') return 'CIRCLE';
    if (this.gameTurns[1] === 'CIRCLE' && this.gameTurns[4] === 'CIRCLE' && this.gameTurns[7] === 'CIRCLE') return 'CIRCLE';
    if (this.gameTurns[2] === 'CIRCLE' && this.gameTurns[5] === 'CIRCLE' && this.gameTurns[8] === 'CIRCLE') return 'CIRCLE';

    if (this.gameTurns[0] === 'CIRCLE' && this.gameTurns[4] === 'CIRCLE' && this.gameTurns[8] === 'CIRCLE') return 'CIRCLE';
    if (this.gameTurns[2] === 'CIRCLE' && this.gameTurns[4] === 'CIRCLE' && this.gameTurns[6] === 'CIRCLE') return 'CIRCLE';

    if (this.gameTurns[0] === 'CROSS' && this.gameTurns[1] === 'CROSS' && this.gameTurns[2] === 'CROSS') return 'CROSS';
    if (this.gameTurns[3] === 'CROSS' && this.gameTurns[4] === 'CROSS' && this.gameTurns[5] === 'CROSS') return 'CROSS';
    if (this.gameTurns[6] === 'CROSS' && this.gameTurns[7] === 'CROSS' && this.gameTurns[8] === 'CROSS') return 'CROSS';

    if (this.gameTurns[0] === 'CROSS' && this.gameTurns[3] === 'CROSS' && this.gameTurns[6] === 'CROSS') return 'CROSS';
    if (this.gameTurns[1] === 'CROSS' && this.gameTurns[4] === 'CROSS' && this.gameTurns[7] === 'CROSS') return 'CROSS';
    if (this.gameTurns[2] === 'CROSS' && this.gameTurns[5] === 'CROSS' && this.gameTurns[8] === 'CROSS') return 'CROSS';

    if (this.gameTurns[0] === 'CROSS' && this.gameTurns[4] === 'CROSS' && this.gameTurns[8] === 'CROSS') return 'CROSS';
    if (this.gameTurns[2] === 'CROSS' && this.gameTurns[4] === 'CROSS' && this.gameTurns[6] === 'CROSS') return 'CROSS';
    return 'no winner';
  }

  @action
  updateTurn(number, newValue) {
    this.gameTurns[number] = newValue;
    this.gameTurns[number] = this.gameTurns[number];
    this.symbol = this.symbol === 'CIRCLE' ? 'CROSS' : 'CIRCLE';

    if (this.detectWinner === 'CROSS') {
      this.isWinner = true;
      this.winner = 'CROSS';
    } else if (this.detectWinner === 'CIRCLE') {
      this.isWinner = true;
      this.winner = 'CIRCLE';
    } else if (this.gameTurns.every(turn => turn !== '')) {
      this.isGameOver = true;
      this.isDraw = true;
      this.isWinner = true;
      this.winner = 'Draw';
    }
  }

  @action
  restartGame() {
    this.scores = {x: this.getScores.x, o: this.getScores.o};
    this.gameTurns = ['', '', '', '', '', '', '', '', ''];
    this.isWinner = false;
    this.winner = '';
    this.isGameOver = false;
    this.isDraw = false;
  }
}
