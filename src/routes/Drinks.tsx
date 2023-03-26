import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { DlcChoice, filterByDlc, loadDlcs } from '@/dlcUtils';
import { Drink, FullTag } from '@/interfaces/DataInterfaces'; // types
import {
  filterByAllTags,
  filterBySomeTags,
  filterByUnwantedTags,
  SelectMode,
} from '@/tagFilterFunctions';
import { makeTagListTranslator } from '@/utils';
import { CheckboxWithCaption } from '@components/CheckboxWithCaption';
import { loadDrinkColumns } from '@components/DrinkComponents';
import { LanguageDropdown } from '@components/LanguageDropdown';
import { MatchModeSelector } from '@components/RecipeForm';
import { TagType } from '@components/Tag';
import { TagPicker } from '@components/TagPicker';
import { Title } from '@components/Title';
import * as tb from '@components/table/Table';

import '@/routes/Drinks.css';

const getDrinksUri = (lng: string) =>
  `${import.meta.env.VITE_GET_DRINKS_URI}?lang=${lng}`;
const getDrinkTagsUri = (lng: string) =>
  `${import.meta.env.VITE_GET_DRINK_TAGS_URI}?lang=${lng}`;

export const Drinks = () => {
  const [language, setLanguage] = useState('zh');
  const { t, i18n } = useTranslation();
  const changeLanguage = async (lng: string): Promise<void> => {
    setLanguage(lng);
    await i18n.changeLanguage(lng);
    setDrinkColumns(() => loadDrinkColumns());
  };

  const DLCS = loadDlcs();
  const [dlcVersions, setDlcVersions] = useState<DlcChoice>(
    Object.fromEntries(
      DLCS.map((dlc) => [dlc.name, true])
    ) as unknown as DlcChoice
  );

  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [drinkColumns, setDrinkColumns] = useState<tb.Column<Drink>[]>(
    loadDrinkColumns()
  );
  const [drinkTags, setDrinkTags] = useState<FullTag[]>([]);
  const [selectedDrinkTags, setSelectedDrinkTags] = useState<FullTag[]>([]);
  const [selectDrinkTagsMode, setSelectDrinkTagsMode] = useState<SelectMode>(
    SelectMode.ALL
  );
  const [unwantedDrinkTags, setUnwantedDrinkTags] = useState<FullTag[]>([]);

  // Load drinks
  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(getDrinksUri(language));
      const data: Drink[] = await res.json();
      setDrinks(data);
    };
    loadData();
  }, [language]);

  // Load tags
  useEffect(() => {
    const loadDrinkTags = async () => {
      const res = await fetch(getDrinkTagsUri(language));
      const data = (await res.json()) as FullTag[];
      setDrinkTags(data);
      return data;
    };
    const updateTags = async () => {
      const drinkTags = await loadDrinkTags();
      const drinkTagsTranslator = makeTagListTranslator(drinkTags);
      setSelectedDrinkTags(drinkTagsTranslator);
      setUnwantedDrinkTags(drinkTagsTranslator);
    };
    updateTags();
  }, [language]);

  const filterByTagFunctions = {
    [SelectMode.ALL]: filterByAllTags(selectedDrinkTags),
    [SelectMode.AT_LEAST_ONE]: filterBySomeTags(selectedDrinkTags),
  };

  const filterFunctions = [
    filterByDlc(dlcVersions),
    filterByTagFunctions[selectDrinkTagsMode],
    filterByUnwantedTags(unwantedDrinkTags),
  ];
  const rowIdFunction = (drink: Drink) => drink.defaultName;

  return (
    <div className="App">
      <Title text={t('title')} />
      <Link to={'/'}>food page</Link>
      <LanguageDropdown language={language} changeLanguage={changeLanguage} />
      <div className="recipeForm">
        <span className="formLabel">{t('ownedContent')}</span>
        <span className="formInput">
          {DLCS.map((dlc) => (
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
          tags={drinkTags}
          selectedTags={selectedDrinkTags}
          setSelectedTags={setSelectedDrinkTags}
          tagType={TagType.DRINK}
        />
        <MatchModeSelector
          selectMode={selectDrinkTagsMode}
          setSelectMode={setSelectDrinkTagsMode}
        />
        <span className="formLabel">{t('unwantedTags')}</span>
        <TagPicker
          tags={drinkTags}
          selectedTags={unwantedDrinkTags}
          setSelectedTags={setUnwantedDrinkTags}
          tagType={TagType.STRIKETHROUGH}
        />
      </div>
      <p>---</p>
      <tb.Table
        columns={drinkColumns}
        data={drinks}
        rowIdFunction={rowIdFunction}
        filterFunctions={filterFunctions}
      />
    </div>
  );
};
