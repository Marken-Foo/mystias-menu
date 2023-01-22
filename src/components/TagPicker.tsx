import { useState } from 'react';

import '@components/TagPicker.css';
import { SelectMode } from '@/App';
import { TagPalette } from '@components/TagPalette';
import { NeutralTag } from '@components/Tags';
import { Tag } from '@components/Tags'; // types

interface TagPickerProps {
  tags: Tag[];
  selectedTags: Tag[];
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  selectMode: SelectMode;
  setSelectMode: React.Dispatch<React.SetStateAction<SelectMode>>;
}

const SelectedTagDisplay = ({
  tags,
  setTags,
  toggleTagPalette,
  isTagPaletteShown,
}: {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  toggleTagPalette: () => void;
  isTagPaletteShown: boolean;
}) => {
  const removeTag = (tag: Tag) => () => {
    setTags((prevState) => [...prevState].filter((t) => t !== tag));
  };
  return (
    <div>
      所选标签:{' '}
      <span className="tagDisplayField">
        <span
          className="tagDisplay"
          style={{ flex: '1 1', backgroundColor: 'pink' }}
        >
          {tags.length === 0
            ? '<请选标签>'
            : tags.map((tag) => (
                <NeutralTag text={tag} key={tag} onClick={removeTag(tag)} />
              ))}
        </span>
        <span
          className="pickerPlusIcon"
          onClick={toggleTagPalette}
        >
          {isTagPaletteShown ? '⊗' : '⊕'}
        </span>
      </span>
    </div>
  );
};

interface MatchModeSelectorProps {
  selectMode: SelectMode;
  setSelectMode: React.Dispatch<React.SetStateAction<SelectMode>>;
}

const MatchModeSelector = ({
  selectMode,
  setSelectMode,
}: MatchModeSelectorProps) => {
  return (
    <div>
      <input
        type="radio"
        value={SelectMode.ALL}
        checked={selectMode === SelectMode.ALL}
        onChange={() => setSelectMode(() => SelectMode.ALL)}
        name="matchMode"
      />{' '}
      符合所有标签
      <input
        type="radio"
        value={SelectMode.AT_LEAST_ONE}
        checked={selectMode === SelectMode.AT_LEAST_ONE}
        onChange={() => setSelectMode(() => SelectMode.AT_LEAST_ONE)}
        name="matchMode"
      />{' '}
      符合至少一个标签
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
    <>
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
      <MatchModeSelector
        selectMode={selectMode}
        setSelectMode={setSelectMode}
      />
    </>
  );
};
