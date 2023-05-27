export interface ProductType {
  key: string
  id: string
  name: string
  unit_amount: number | null
  image: string
  currency: string
  description: string | null
  metadata: {
    features: string | string[]
  }
}
