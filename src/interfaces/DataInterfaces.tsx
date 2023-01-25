export enum UnlockTypes {
  DEFAULT = 'default',
  LEVEL = 'level',
  BOND = 'bond',
  SHOP = 'shop',
  SIDEQUEST = 'sidequest',
  MAINQUEST = 'mainquest',
  OTHER = 'other',
}

interface DefaultUnlock {
  type: UnlockTypes.DEFAULT;
}

interface LevelUnlock {
  type: UnlockTypes.LEVEL;
  level: string;
}

interface BondUnlock {
  type: UnlockTypes.BOND;
  character: string;
  bondLevel: string;
}

interface ShopUnlock {
  type: UnlockTypes.SHOP;
  shop: string;
}

interface SidequestUnlock {
  type: UnlockTypes.SIDEQUEST;
  quest: string;
}

interface MainquestUnlock {
  type: UnlockTypes.MAINQUEST;
  quest: string;
}

interface OtherUnlock {
  type: UnlockTypes.OTHER;
  source: string;
}

export interface ShortIngredient {
  name: string;
  thwikiImage: string;
}

export interface Recipe {
  name: string;
  thwikiImage: string;
  tool: string;
  price: number;
  ingredients: ShortIngredient[];
  tags: string[];
  incompatibleTags: string[];
  cookingTime: string;
  source:
    | DefaultUnlock
    | LevelUnlock
    | BondUnlock
    | ShopUnlock
    | SidequestUnlock
    | MainquestUnlock
    | OtherUnlock;
  description: string;
  dlc: string;
}
