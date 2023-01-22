import { InactiveTag, NeutralTag } from '@components/Tags';
import { Tag } from '@components/Tags'; // types

interface TagPaletteProps {
  tags: Tag[];
  selectedTags: Tag[];
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

export const TagPalette = ({
  tags,
  selectedTags,
  setSelectedTags,
}: TagPaletteProps) => {
  const toggleSelection = (tag: Tag) => () => {
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
