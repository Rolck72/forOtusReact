export interface Product {
  id: string
  name: string
  photo: string
  desc: string
  createdAt: string
  oldPrice: number
  price: number
  updatedAt: string
  category: Category
}
export interface Category {
  id: string
  name: string
  photo: string
  createdAt: string
  updatedAt: string
  }
