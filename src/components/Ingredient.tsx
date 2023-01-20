import { GameAssetIcon } from '@components/GameAssetIcon';

export const Ingredient = ({ name, imageSource }) => {
  return (
    <div style={{ display: 'inline-block' }}>
      <GameAssetIcon src={imageSource} name={name} />
      <br />
      {name}
    </div>
  );
};
