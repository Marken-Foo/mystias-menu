import { Fragment } from 'react';

import { ClickableTag, TagType } from '@/components/Tag';
import { TagText } from '@/components/Tag'; // types

interface TagPaletteProps {
  tags: TagText[];
  selectedTags: TagText[];
  setSelectedTags: React.Dispatch<React.SetStateAction<TagText[]>>;
  tagType: TagType;
}

export const TagPalette = ({
  tags,
  selectedTags,
  setSelectedTags,
  tagType,
}: TagPaletteProps) => {
  const toggleSelection = (tag: TagText) => () => {
    setSelectedTags((prevState) => {
      const state = [...prevState];
      return state.includes(tag)
        ? state.filter((t) => t !== tag)
        : state.concat(tag);
    });
  };
  return (
    <div className="tagPalette">
      {tags.map((tag) => {
        const passedType = selectedTags.includes(tag)
          ? tagType
          : TagType.INACTIVE;
        return (
          <Fragment key={tag}>
            <ClickableTag
              type={passedType}
              text={tag}
              onClick={toggleSelection(tag)}
            />{' '}
          </Fragment>
        );
      })}
    </div>
  );
};
