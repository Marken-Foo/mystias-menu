import { Tag, TagType } from '@components/Tags';
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
          <Tag
            type={TagType.FOOD}
            text={tag}
            key={tag}
            onClick={toggleSelection(tag)}
          />
        ) : (
          <Tag
            type={TagType.INACTIVE}
            text={tag}
            key={tag}
            onClick={toggleSelection(tag)}
          />
        );
      })}
    </div>
  );
};
