import '@components/RecipeForm.css';
import { RadioButtonWithCaption } from './RadioButtonWithCaption';
import { Dlc, DlcChoice, SelectMode } from '@/App'; // types
import { DlcFormSection } from '@components/DlcFormSection';
import { TagText } from '@components/Tag'; // types
import { TagPicker } from '@components/TagPicker';

interface MatchModeSelectorProps {
  selectMode: SelectMode;
  setSelectMode: React.Dispatch<React.SetStateAction<SelectMode>>;
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

interface RecipeFormProps {
  dlcs: Dlc[];
  dlcVersions: DlcChoice;
  setDlcVersions: React.Dispatch<React.SetStateAction<DlcChoice>>;
  tags: TagText[];
  selectedTags: TagText[];
  setSelectedTags: React.Dispatch<React.SetStateAction<TagText[]>>;
  selectMode: SelectMode;
  setSelectMode: React.Dispatch<React.SetStateAction<SelectMode>>;
  selectedIncompatibleTags: TagText[];
  setSelectedIncompatibleTags: React.Dispatch<React.SetStateAction<TagText[]>>;
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
  selectedIncompatibleTags,
  setSelectedIncompatibleTags
}: RecipeFormProps) => {
  return (
    <div className="recipeForm">
      <DlcFormSection
        dlcs={dlcs}
        dlcVersions={dlcVersions}
        setDlcVersions={setDlcVersions}
      />
      <div className="tagSection">
        <span className="tagsLabel">正特性筛选：</span>
        <TagPicker
          tags={tags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        <MatchModeSelector
          selectMode={selectMode}
          setSelectMode={setSelectMode}
        />
      </div>
      <div className="tagSection">
        <span className="tagsLabel">负特性筛选：</span>
        <TagPicker
          tags={tags}
          selectedTags={selectedIncompatibleTags}
          setSelectedTags={setSelectedIncompatibleTags}
        />
      </div>
    </div>
  );
};
