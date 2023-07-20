import { type Product } from './product'
import { type Sale } from './sale'
import { type Seller } from './seller'

export interface Concat {
  product: Pick<Sale, 'product'>
  price: Pick<Product, 'price'>
  sold_at: Pick<Sale, 'sold_at'>
  seller: Pick<Sale, 'seller'>
  age: Pick<Seller, 'age'>
  location: Pick<Seller, 'location'>
}