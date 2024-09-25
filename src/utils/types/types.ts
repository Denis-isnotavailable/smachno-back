export interface IProduct {
 id: number;
 product_name: string;
 product_price: number;
 product_description: string;
 product_image: string;
 category: string;
 quantity: number;
 created_at: Date;
 updated_at: Date;
 [Symbol.iterator]: any;
}

export interface UserInterface {
 id: number;
 email: string;
 roles: string;
 name: string;
 surname: string;
 phone: string;
}

export interface IUser extends UserInterface {
 user: UserInterface;
}
