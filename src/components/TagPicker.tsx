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
}: {
  tags: Tag[];
  setTags?: React.Dispatch<React.SetStateAction<Tag[]>>;
}) => {
  const removeTag = (tag: Tag) => () => {
    setTags === undefined
      ? null
      : setTags((prevState) => [...prevState].filter((t) => t !== tag));
  };
  return (
    <div>
      所选标签:{' '}
      <span className="tagDisplayField">
        {tags.length === 0
          ? '<请选标签>'
          : tags.map((tag) => (
              <NeutralTag text={tag} key={tag} onClick={removeTag(tag)} />
            ))}
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
  return (
    <>
      <SelectedTagDisplay tags={selectedTags} setTags={setSelectedTags} />
      <TagPalette
        tags={tags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      <MatchModeSelector
        selectMode={selectMode}
        setSelectMode={setSelectMode}
      />
    </>
  );
};
