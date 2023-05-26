export type ProductType = {
  name: string
  unit_amount: number
  quantity?: number | 1
  image: string
  id: string
  description: string
  metadata: MetadataType
}

type MetadataType = {
  features: string[]
}
