import { useTranslation } from 'react-i18next';

import '@components/RecipeForm.css';
import { Dlc, DlcChoice, SelectMode } from '@/App'; // types
import { CheckboxWithCaption } from '@components/CheckboxWithCaption';
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
  const { t } = useTranslation('translation');
  const input = [
    { value: SelectMode.ALL, caption: t('matchall') },
    { value: SelectMode.AT_LEAST_ONE, caption: t('matchany') },
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
  const { t } = useTranslation();
  return (
    <div className="recipeForm">
      <span className="formLabel">{t('ownedContent')}</span>
      <span className="formInput">
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
      </span>
      <span className="formLabel">{t('positiveTags')}</span>
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
      <span className="formLabel">{t('incompatibleTags')}</span>
      <TagPicker
        tags={tags}
        selectedTags={selectedIncompatibleTags}
        setSelectedTags={setSelectedIncompatibleTags}
        tagType={TagType.BAD}
      />
      <span className="formLabel">{t('unwantedTags')}</span>
      <TagPicker
        tags={tags}
        selectedTags={unwantedTags}
        setSelectedTags={setUnwantedTags}
        tagType={TagType.STRIKETHROUGH}
      />
    </div>
  );
};
