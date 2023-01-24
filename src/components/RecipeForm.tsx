import '@components/RecipeForm.css';
import { Dlc, DlcChoice, SelectMode } from '@/App'; // types
import { DlcFormSection } from '@components/DlcFormSection';
import { RadioButtonWithCaption } from '@components/RadioButtonWithCaption';
import { TagText, TagType } from '@components/Tag'; // types
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
  unwantedTags: TagText[];
  setUnwantedTags: React.Dispatch<React.SetStateAction<TagText[]>>;
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
  setSelectedIncompatibleTags,
  unwantedTags,
  setUnwantedTags,
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
          tagType={TagType.FOOD}
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
          tagType={TagType.BAD}
        />
      </div>
      <div className="tagSection">
        <span className="tagsLabel">排除正特性：</span>
        <TagPicker
          tags={tags}
          selectedTags={unwantedTags}
          setSelectedTags={setUnwantedTags}
          tagType={TagType.STRIKETHROUGH}
        />
      </div>
    </div>
  );
};
