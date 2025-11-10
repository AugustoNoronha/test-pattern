const Carrinho = require('../../src/domain/Carrinho');
const Item = require('../../src/domain/Item');
const UserMother = require('./UserMother');

class CarrinhoBuilder {
  constructor() {
    this.user = UserMother.umUsuarioPadrao();
    this.itens = [new Item('item-1', 'Produto Padrão', 100)];
  }

  comUser(user) {
    this.user = user;
    return this;
  }

  comItens(itens) {
    this.itens = itens;
    return this;
  }

  vazio() {
    this.itens = [];
    return this;
  }

  build() {
    return new Carrinho(this.user, this.itens);
  }
}

module.exports = CarrinhoBuilder;
