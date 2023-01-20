interface DefaultUnlock {
  type: string;
}

interface LevelUnlock {
  type: string;
  level: string;
}

interface BondUnlock {
  type: string;
  character: string;
  bondLevel: string;
}

export interface Recipe {
  name: string;
  thwikiImage: string;
  tool: string;
  price: number;
  ingredients: { name: string; thwikiImage: string }[];
  tags: string[];
  incompatibleTags: string[];
  cookingTime: string;
  source: DefaultUnlock | LevelUnlock | BondUnlock;
  description: string;
  dlc: string;
}
