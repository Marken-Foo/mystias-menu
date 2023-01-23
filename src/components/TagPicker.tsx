import { useState } from 'react';

import '@components/TagPicker.css';
import { ClickableTag, TagType } from '@/components/Tag';
import { TagText } from '@/components/Tag'; // types
import { TagPalette } from '@components/TagPalette';

type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

interface SelectedTagDisplayProps {
  tags: TagText[];
  setTags: StateSetter<TagText[]>;
  toggleTagPalette: () => void;
  isTagPaletteShown: boolean;
}

const SelectedTagDisplay = ({
  tags,
  setTags,
  toggleTagPalette,
  isTagPaletteShown,
}: SelectedTagDisplayProps) => {
  const removeTag = (tag: TagText) => () => {
    setTags((prevState) => [...prevState].filter((t) => t !== tag));
  };
  return (
    <span className="tagDisplayField">
      <span className="tagDisplay">
        {tags.length === 0
          ? '<请选标签>'
          : tags.map((tag) => (
              <ClickableTag
                type={TagType.FOOD}
                text={tag}
                key={tag}
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
  tags: TagText[];
  selectedTags: TagText[];
  setSelectedTags: StateSetter<TagText[]>;
}

export const TagPicker = ({
  tags,
  selectedTags,
  setSelectedTags,
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
        toggleTagPalette={toggleTagPalette}
        isTagPaletteShown={isTagPaletteShown}
      />
      {isTagPaletteShown ? (
        <TagPalette
          tags={tags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      ) : null}
    </div>
  );
};
