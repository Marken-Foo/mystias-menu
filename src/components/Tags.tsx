import '@components/Tags.css';

export type TagText = string;

export enum TagType {
  FOOD = 'foodTag',
  DRINK = 'drinkTag',
  GOOD = 'goodTag',
  BAD = 'badTag',
  INACTIVE = 'inactiveTag',
}

interface TagProps {
  type: TagType;
  text: TagText;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Tag = ({ text, type, onClick }: TagProps) => {
  return (
    <span className={type} onClick={onClick}>
      {text}
    </span>
  );
};
