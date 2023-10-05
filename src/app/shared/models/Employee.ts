export class Employee{
    constructor(
        public id?: string,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public role?: Role
    ) {}
}

export class LoginEmployee{
    constructor(
        public email?: string,
        public password?: string
    ) {}
}

export enum Role{
    CHEF = '0',
    WAITER = '1',
    MANAGER = '2'
}

export class AllOrdersDto{
    constructor(
        public orderId?: string,
        public menuItems?: MenuItem[],
        public placedAt?: string,
        public placedFor?: string,
        public numberOfPeople?: number,
        public orderStatus?: OrderStatus,
        public guestId?: string
    ) {}
}

export class MenuItem {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public icon?: string,
        public price?: number,
        public removedIngredients?: Ingredient[],
        public quantity?: number,
        public menuItem?: MenuItem
    ) {}
}


export class Ingredient{
    constructor(
        public id?: string,
        public name?: string
    ) {}
}

export enum OrderStatus{
    BOOKED = '0',
    CANCELED = '1',
    IN_PROGRESS = '3',
    SERVED = '4',
    COOKED = '2'
}

export function mapStatusToOrderStatus(status: string): OrderStatus | undefined {
    switch (status) {
      case '0':
        return OrderStatus.BOOKED;
      case '1':
        return OrderStatus.CANCELED;
      case '2':
        return OrderStatus.SERVED;
      case '3':
        return OrderStatus.IN_PROGRESS;
      case '4':
        return OrderStatus.SERVED;
      default:
        return undefined; 
    }
  }
  