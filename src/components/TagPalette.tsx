import { Fragment } from 'react';

import { FullTag } from '@/interfaces/DataInterfaces'; // types
import { ClickableTag, TagType } from '@components/Tag';

interface TagPaletteProps {
  tags: FullTag[];
  selectedTags: FullTag[];
  setSelectedTags: React.Dispatch<React.SetStateAction<FullTag[]>>;
  tagType: TagType;
}

const isTagInList = (tag: FullTag, tagList: FullTag[]): boolean => {
  return tagList.some((t) => t.defaultName === tag.defaultName);
};

export const TagPalette = ({
  tags,
  selectedTags,
  setSelectedTags,
  tagType,
}: TagPaletteProps) => {
  const toggleSelection = (tag: FullTag) => () => {
    setSelectedTags((prevState) => {
      const state = [...prevState];
      return isTagInList(tag, state)
        ? state.filter((t) => t.defaultName !== tag.defaultName)
        : state.concat(tag);
    });
  };
  return (
    <div className="tagPalette">
      {tags.map((tag: FullTag): JSX.Element => {
        const passedType = isTagInList(tag, selectedTags)
          ? tagType
          : TagType.INACTIVE;
        return (
          <Fragment key={tag.defaultName}>
            <ClickableTag
              type={passedType}
              text={tag.name}
              onClick={toggleSelection(tag)}
            />{' '}
          </Fragment>
        );
      })}
    </div>
  );
};
