export type VariantType = {
  id: number;
  name: string;
  price: number;
  stock?: number;
  isDefault?: boolean | null;
};