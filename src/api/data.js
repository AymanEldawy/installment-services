class User {
  static count = 0;
  constructor(name, phone, address) {
    this.name = name;
    this.phone = name;
    this.address = address;
    User.count++;
  }

  // Get User
  // Get User Orders
  // change status
  //
}

export const USERS = [
  {
    user_id: "",
    created_at: "",
    name: "",
    phone: "",
    address: "",
    idCard: "",
    status: false,
  },
];
export const INSTALLMENT_ORDERS = [
  {
    order_id: "",
    user_id: "",
    username: "",
    product: "",
    product_price: 21,
    total_price: 25,
    months: 32,
    notes: "",
    created_at: "",
    created_end: "",
  },
];
export const COLLECTING = [
  {
    created_at: "",
    user_id: "",
    username: "",
    price: "",
    author: "",
    notes: "",
  },
];
