import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import '@components/TagPicker.css';
import { FullTag } from '@/interfaces/DataInterfaces'; // types
import { ClickableTag, TagType } from '@components/Tag';
import { TagPalette } from '@components/TagPalette';

type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

interface SelectedTagDisplayProps {
  tags: FullTag[];
  setTags: StateSetter<FullTag[]>;
  tagType: TagType;
  toggleTagPalette: () => void;
  isTagPaletteShown: boolean;
}

const SelectedTagDisplay = ({
  tags,
  setTags,
  tagType,
  toggleTagPalette,
  isTagPaletteShown,
}: SelectedTagDisplayProps) => {
  const { t } = useTranslation();
  const removeTag = (tag: FullTag) => () => {
    setTags((prevState) =>
      [...prevState].filter((t) => t.defaultName !== tag.defaultName)
    );
  };
  return (
    <span className="tagDisplayField">
      <span className="tagDisplay">
        {tags.length === 0
          ? t('noTagsSelected')
          : tags.map((tag) => (
              <ClickableTag
                type={tagType}
                text={`${tag.name}⨯`}
                key={tag.defaultName}
                onClick={removeTag(tag)}
              />
            ))}
      </span>
      <span className="pickerPlusIcon" onClick={toggleTagPalette}>
        {isTagPaletteShown ? '⊗' : '⊕'}
      </span>
    </span>
  );
};

interface TagPickerProps {
  tags: FullTag[];
  selectedTags: FullTag[];
  setSelectedTags: StateSetter<FullTag[]>;
  tagType: TagType;
}

export const TagPicker = ({
  tags,
  selectedTags,
  setSelectedTags,
  tagType,
}: TagPickerProps) => {
  const [isTagPaletteShown, setIsTagPaletteShown] = useState(false);
  const toggleTagPalette = () => {
    setIsTagPaletteShown(() => !isTagPaletteShown);
  };
  return (
    <div className="tagPicker">
      <SelectedTagDisplay
        tags={selectedTags}
        setTags={setSelectedTags}
        tagType={tagType}
        toggleTagPalette={toggleTagPalette}
        isTagPaletteShown={isTagPaletteShown}
      />
      {isTagPaletteShown ? (
        <TagPalette
          tags={tags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          tagType={tagType}
        />
      ) : null}
    </div>
  );
};
