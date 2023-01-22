import '@components/RecipeForm.css';
import { Dlc, DlcChoice, SelectMode } from '@/App'; // types
import { DlcFormSection } from '@components/DlcFormSection';
import { TagPicker } from '@components/TagPicker';
import { TagText } from '@components/Tags'; // types

interface RecipeFormProps {
  dlcs: Dlc[];
  dlcVersions: DlcChoice;
  setDlcVersions: React.Dispatch<React.SetStateAction<DlcChoice>>;
  tags: TagText[];
  selectedTags: TagText[];
  setSelectedTags: React.Dispatch<React.SetStateAction<TagText[]>>;
  selectMode: SelectMode;
  setSelectMode: React.Dispatch<React.SetStateAction<SelectMode>>;
}

export const RecipeForm = ({
  dlcs,
  dlcVersions,
  setDlcVersions,
  tags,
  selectedTags,
  setSelectedTags,
  selectMode,
  setSelectMode,
}: RecipeFormProps) => {
  return (
    <div className="recipeForm">
      <DlcFormSection
        dlcs={dlcs}
        dlcVersions={dlcVersions}
        setDlcVersions={setDlcVersions}
      />
      <div>
        <span>正特性筛选：</span>
        <TagPicker
          tags={tags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          selectMode={selectMode}
          setSelectMode={setSelectMode}
        />
      </div>
    </div>
  );
};
