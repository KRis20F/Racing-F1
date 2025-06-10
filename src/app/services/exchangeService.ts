import { exchangeEndpoints, CreateOrderRequest, CancelOrderRequest, Order } from '../api/endpoints/exchange.endpoints';

export const exchangeService = {
  createOrder: async (data: CreateOrderRequest): Promise<Order> => {
    return await exchangeEndpoints.createOrder(data);
  },
  cancelOrder: async (orderId: number): Promise<{ status: string; order: Order }> => {
    return await exchangeEndpoints.cancelOrder(orderId);
  },
  getOrderBook: exchangeEndpoints.getOrderBook,
  getRecentTrades: exchangeEndpoints.getRecentTrades,
}; 