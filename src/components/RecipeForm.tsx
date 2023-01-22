import { Dlc, DlcChoice, SelectMode } from '@/App'; // types
import { CheckboxWithCaption } from '@components/CheckboxWithCaption';
import { TagPicker } from '@components/TagPicker';
import { Tag } from '@components/Tags'; // types

interface DlcFormSectionProps {
  dlcs: Dlc[];
  dlcVersions: DlcChoice;
  setDlcVersions: React.Dispatch<React.SetStateAction<DlcChoice>>;
}

const DlcFormSection = ({
  dlcs,
  dlcVersions,
  setDlcVersions,
}: DlcFormSectionProps) => (
  <>
    DLCs:
    {dlcs.map((dlc) => (
      <CheckboxWithCaption
        initialState={dlcVersions[dlc.name as keyof DlcChoice]}
        onChange={() =>
          setDlcVersions((prevState) => ({
            ...prevState,
            [dlc.name]: !prevState[dlc.name as keyof DlcChoice],
          }))
        }
        label={dlc.label}
        key={dlc.name}
      />
    ))}
  </>
);

interface RecipeFormProps {
  dlcs: Dlc[];
  dlcVersions: DlcChoice;
  setDlcVersions: React.Dispatch<React.SetStateAction<DlcChoice>>;
  tags: Tag[];
  selectedTags: Tag[];
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>;
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
    <>
      <DlcFormSection
        dlcs={dlcs}
        dlcVersions={dlcVersions}
        setDlcVersions={setDlcVersions}
      />
      <TagPicker
        tags={tags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        selectMode={selectMode}
        setSelectMode={setSelectMode}
      />
    </>
  );
};
