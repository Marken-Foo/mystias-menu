import { useState } from 'react';

import '@components/TagPicker.css';
import { SelectMode } from '@/App';
import { TagPalette } from '@components/TagPalette';
import { NeutralTag } from '@components/Tags';
import { Tag } from '@components/Tags'; // types

type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

interface TagPickerProps {
  tags: Tag[];
  selectedTags: Tag[];
  setSelectedTags: StateSetter<Tag[]>;
  selectMode: SelectMode;
  setSelectMode: StateSetter<SelectMode>;
}

const SelectedTagDisplay = ({
  tags,
  setTags,
  toggleTagPalette,
  isTagPaletteShown,
}: {
  tags: Tag[];
  setTags: StateSetter<Tag[]>;
  toggleTagPalette: () => void;
  isTagPaletteShown: boolean;
}) => {
  const removeTag = (tag: Tag) => () => {
    setTags((prevState) => [...prevState].filter((t) => t !== tag));
  };
  return (
    <span className="tagDisplayField">
      <span className="tagDisplay">
        {tags.length === 0
          ? '<请选标签>'
          : tags.map((tag) => (
              <NeutralTag text={tag} key={tag} onClick={removeTag(tag)} />
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

type RadioValue = string | number | readonly string[] | undefined;

interface RadioButtonWithCaptionProps<T extends RadioValue> {
  name: string;
  value: T;
  state: T;
  setState: StateSetter<T>;
  caption: string;
}

const RadioButtonWithCaption = <T extends RadioValue>({
  name,
  value,
  state,
  setState,
  caption,
}: RadioButtonWithCaptionProps<T>) => {
  return (
    <div>
      <input
        type="radio"
        value={value}
        checked={state === value}
        onChange={() => setState(() => value)}
        name={name}
      />
      {caption}
    </div>
  );
};

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
        <span>所选标签：</span>
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
