 
const CheckoutService = require('../src/services/CheckoutService');
const CarrinhoBuilder = require('./builders/CarrinhoBuilder');
const UserMother = require('./builders/UserMother');
const Item = require('../src/domain/Item');

describe('CheckoutService', () => {
  describe('quando o pagamento falha', () => {
    it('deve retornar null', async () => {
      // Arrange
      const carrinho = new CarrinhoBuilder().build();

      const gatewayStub = { cobrar: jest.fn().mockResolvedValue({ success: false }) };
      const emailDummy = { enviarEmail: jest.fn() };
      const repoDummy = { salvar: jest.fn() };

      const checkout = new CheckoutService(gatewayStub, emailDummy, repoDummy);

      // Act
      const pedido = await checkout.processarPedido(carrinho);

      // Assert
      expect(pedido).toBeNull();
    });
  });

  describe('quando um cliente Premium finaliza a compra', () => {
    it('deve aplicar desconto e enviar e-mail', async () => {
      // Arrange
      const userPremium = UserMother.umUsuarioPremium();
      const itens = [new Item('p1', 'Produto A', 200)];
      const carrinho = new CarrinhoBuilder().comUser(userPremium).comItens(itens).build();

      const gatewayStub = { cobrar: jest.fn().mockResolvedValue({ success: true }) };
      const pedidoRepoStub = { salvar: jest.fn().mockResolvedValue({ id: 1 }) };
      const emailMock = { enviarEmail: jest.fn() };

      const checkout = new CheckoutService(gatewayStub, emailMock, pedidoRepoStub);

      // Act
      await checkout.processarPedido(carrinho);

      // Assert
      expect(gatewayStub.cobrar).toHaveBeenCalledWith(180, expect.anything());
      expect(emailMock.enviarEmail).toHaveBeenCalledTimes(1);
      expect(emailMock.enviarEmail).toHaveBeenCalledWith(
        'premium@email.com',
        'Seu Pedido foi Aprovado!',
        expect.anything()
      );
    });
  });
});
