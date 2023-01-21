export type Tag = string;

interface TagProps {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const NeutralTag = ({ text, onClick }: TagProps) => {
  return (
    <span className={'neutralTag'} onClick={onClick}>
      {text}
    </span>
  );
};

export const GoodTag = ({ text, onClick }: TagProps) => {
  return (
    <span className={'goodTag'} onClick={onClick}>
      {text}
    </span>
  );
};

export const BadTag = ({ text, onClick }: TagProps) => {
  return (
    <span className={'badTag'} onClick={onClick}>
      {text}
    </span>
  );
};

export const InactiveTag = ({ text, onClick }: TagProps) => {
  return (
    <span className={'inactiveTag'} onClick={onClick}>
      {text}
    </span>
  );
};
