import { useState } from 'react';

import '@components/TagPicker.css';
import { SelectMode } from '@/App';
import { ClickableTag, TagType } from '@/components/Tag';
import { TagText } from '@/components/Tag'; // types
import { RadioButtonWithCaption } from '@components/RadioButtonWithCaption';
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

interface MatchModeSelectorProps {
  selectMode: SelectMode;
  setSelectMode: StateSetter<SelectMode>;
}

const MatchModeSelector = ({
  selectMode,
  setSelectMode,
}: MatchModeSelectorProps) => {
  const input = [
    { value: SelectMode.ALL, caption: '符合所有标签' },
    { value: SelectMode.AT_LEAST_ONE, caption: '符合至少一个标签' },
  ];
  return (
    <div className="verticalRadioButtons">
      {input.map((item) => (
        <RadioButtonWithCaption
          name={'matchMode'}
          value={item.value}
          state={selectMode}
          setState={setSelectMode}
          caption={item.caption}
          key={item.value}
        />
      ))}
    </div>
  );
};

interface TagPickerProps {
  tags: TagText[];
  selectedTags: TagText[];
  setSelectedTags: StateSetter<TagText[]>;
  selectMode: SelectMode;
  setSelectMode: StateSetter<SelectMode>;
}

export const TagPicker = ({
  tags,
  selectedTags,
  setSelectedTags,
  selectMode,
  setSelectMode,
}: TagPickerProps) => {
  const [isTagPaletteShown, setIsTagPaletteShown] = useState(false);
  const toggleTagPalette = () => {
    setIsTagPaletteShown(() => !isTagPaletteShown);
  };
  return (
    <div className="tagPicker">
      <div className="tagInputs">
        <SelectedTagDisplay
          tags={selectedTags}
          setTags={setSelectedTags}
          toggleTagPalette={toggleTagPalette}
          isTagPaletteShown={isTagPaletteShown}
        />
        <MatchModeSelector
          selectMode={selectMode}
          setSelectMode={setSelectMode}
        />
      </div>
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
