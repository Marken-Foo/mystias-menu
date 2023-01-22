import { InactiveTag, NeutralTag } from '@components/Tags';
import { TagText } from '@components/Tags'; // types

interface TagPaletteProps {
  tags: TagText[];
  selectedTags: TagText[];
  setSelectedTags: React.Dispatch<React.SetStateAction<TagText[]>>;
}

export const TagPalette = ({
  tags,
  selectedTags,
  setSelectedTags,
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
        return selectedTags.includes(tag) ? (
          <NeutralTag text={tag} key={tag} onClick={toggleSelection(tag)} />
        ) : (
          <InactiveTag text={tag} key={tag} onClick={toggleSelection(tag)} />
        );
      })}
    </div>
  );
};
