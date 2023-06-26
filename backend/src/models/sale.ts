import { type Product } from './product'
import { type Seller } from './seller'

export interface Sale {
  id: string
  product: Product
  seller: Seller
}
