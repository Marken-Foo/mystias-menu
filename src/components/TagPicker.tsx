import { SelectMode } from '@/App';
import { InactiveTag, NeutralTag } from '@components/Tags';
import { Tag } from '@components/Tags'; // types

interface TagPickerProps {
  tags: Tag[];
  selectedTags: Tag[];
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  selectMode: SelectMode;
  setSelectMode: React.Dispatch<React.SetStateAction<SelectMode>>;
}

interface TagSelectorProps {
  tags: Tag[];
  selectedTags: Tag[];
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

const SelectedTagDisplay = ({ tags }: { tags: Tag[] }) => {
  return (
    <div>
      所选标签:{' '}
      {tags.map((tag) => (
        <NeutralTag text={tag} key={tag} />
      ))}
    </div>
  );
};

const TagSelector = ({
  tags,
  selectedTags,
  setSelectedTags,
}: TagSelectorProps) => {
  const toggleSelection = (tag: Tag) => () => {
    setSelectedTags((prevState) => {
      const state = [...prevState];
      return state.includes(tag)
        ? state.filter((t) => t !== tag)
        : state.concat(tag);
    });
  };
  return (
    <div>
      {tags.map((tag) => {
        return selectedTags.includes(tag) ? (
          <NeutralTag text={tag} key={tag} onClick={toggleSelection(tag)} />
        ) : (
          <InactiveTag text={tag} key={tag} onClick={toggleSelection(tag)} />
        );
      })}
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
    <>
      <input
        type="radio"
        value={SelectMode.ALL}
        checked={selectMode === SelectMode.ALL}
        onChange={() => setSelectMode(() => SelectMode.ALL)}
        name="matchMode"
      />{' '}
      匹配所有标签
      <input
        type="radio"
        value={SelectMode.AT_LEAST_ONE}
        checked={selectMode === SelectMode.AT_LEAST_ONE}
        onChange={() => setSelectMode(() => SelectMode.AT_LEAST_ONE)}
        name="matchMode"
      />{' '}
      匹配至少一个标签
    </>
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
      <SelectedTagDisplay tags={selectedTags} />
      <TagSelector
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
