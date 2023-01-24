interface GameAssetIconProps {
  src: string;
  name: string;
}

export const GameAssetIcon = ({ src, name }: GameAssetIconProps) => {
  return <img src={src} alt={name} title={name} style={{ width: '3em' }} />;
};
