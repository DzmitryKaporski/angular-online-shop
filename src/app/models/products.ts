export interface IProducts {
  id: number,
  title: string,
  price: number,
  image?: string,
  configure: IProductsConfig,
  quantity: number,
}

export interface IProductsConfig {
  chip: string,
  ssd: string,
  memory: string,
  display: string,
}
