import '@components/Tag.css';

export type TagText = string;

export enum TagType {
  FOOD = 'foodTag',
  DRINK = 'drinkTag',
  GOOD = 'goodTag',
  BAD = 'badTag',
  INACTIVE = 'inactiveTag',
  STRIKETHROUGH = 'strikethroughTag',
}

interface TagProps {
  type: TagType;
  text: TagText;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const withClickable = (TagComponent: typeof Tag) => {
  const Tag = (props: TagProps) => {
    const { type, ...rest } = props;
    const newProps = {
      ...rest,
      type: `clickable ${type}` as TagText,
    } as TagProps;
    return <TagComponent {...newProps} />;
  };
  return Tag;
};

export const Tag = ({ text, type, onClick }: TagProps) => {
  return (
    <span className={type} onClick={onClick}>
      {text}
    </span>
  );
};

export const ClickableTag = withClickable(Tag);
