import { GameAssetIcon } from '@components/GameAssetIcon';

interface IngredientProps {
  name: string;
  imageSource: string;
}

export const Ingredient = ({ name, imageSource }: IngredientProps) => {
  return (
    <div style={{ display: 'inline-block' }}>
      <GameAssetIcon src={imageSource} name={name} />
      <br />
      {name}
    </div>
  );
};
