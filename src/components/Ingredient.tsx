import { GameAssetIcon } from './GameAssetIcon';

export const Ingredient = ({ name, imageSource }) => {
  return (
    <div style={{ display: 'inline-block' }}>
      <GameAssetIcon src={imageSource} name={name} />
      <br />
      {name}
    </div>
  );
};
