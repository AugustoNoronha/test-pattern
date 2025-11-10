const User = require('../../src/domain/User');

class UserMother {
  static umUsuarioPadrao() {
    return new User('1', 'Usuário Padrão', 'padrao@email.com', 'COMUM');
  }

  static umUsuarioPremium() {
    return new User('2', 'Usuário Premium', 'premium@email.com', 'PREMIUM');
  }
}

module.exports = UserMother;
