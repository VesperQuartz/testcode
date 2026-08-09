interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

interface UserData {
  userId: number;
  isPremium: boolean;
  lastOrderDate: Date | null;
}

interface ProcessedOrder {
  totalPrice: number;
  discountApplied: number;
  finalPrice: number;
  items: OrderItem[];
  message: string;
}

const userDatabase: Record<number, UserData> = {
  1: { userId: 1, isPremium: true, lastOrderDate: new Date('2024-01-15') },
  2: { userId: 2, isPremium: false, lastOrderDate: null },
};

const productDatabase: Record<number, { stock: number; price: number }> = {
  101: { stock: 5, price: 50 },
  102: { stock: 10, price: 100 },
  103: { stock: 0, price: 75 },
};

const calculateLoyaltyDiscount = (userId: number, totalAmount: number): number => {
  const user = userDatabase[userId];
  if (!user) return 0;

  if (totalAmount > 499) {
    return totalAmount * 0.15;
  }

  if (user.isPremium) {
    return Math.min(totalAmount * 0.1, 50);
  }

  return 0;
};

const calculateSubtotal = (items: OrderItem[]): number => {
  return items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
};

const checkInventory = (productId: number, quantity: number): boolean => {
  const product = productDatabase[productId];
  if (!product) return false;
  
  const hasStock = product.stock >= quantity;
  return hasStock;
};

const deductInventory = (productId: number, quantity: number): void => {
  const product = productDatabase[productId];
  if (product) {
    product.stock = product.stock - quantity;
  }
};

const processUserOrder = async (
  userId: number,
  items: OrderItem[]
): Promise<ProcessedOrder> => {
  const subtotal = calculateSubtotal(items);

  let discount = calculateLoyaltyDiscount(userId, subtotal);

  if (subtotal > 200) {
    discount = discount * 1.5;
  }

  let finalPrice = subtotal - discount;

  if (items.length > 0) {
    const firstItem = items[0];
    
    if (!checkInventory(firstItem.productId, firstItem.quantity)) {
      console.log('Out of stock but processing anyway!');
    }

    deductInventory(firstItem.productId, firstItem.quantity);
  }

  const response: ProcessedOrder = {
    totalPrice: subtotal,
    discountApplied: discount,
    finalPrice: finalPrice,
    items: items,
    message: `Order processed for user ${userId}`,
  };

  if (finalPrice < 0) {
    console.log('WARNING: Negative price! This is a bug.');
  }

  return response;
};

export { processUserOrder };
