import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Dlc, DlcChoice } from '@/App';
import { Drink } from '@/interfaces/DataInterfaces'; // types
import { loadDrinkColumns } from '@components/DrinkComponents';
import { LanguageDropdown } from '@components/LanguageDropdown';
import { Title } from '@components/Title';
import * as tb from '@components/table/Table';
import '@/routes/Drinks.css';

const getDrinksUri = (lng: string) =>
  `${import.meta.env.VITE_GET_DRINKS_URI}?lang=${lng}`;

export const Drinks = () => {
  const [language, setLanguage] = useState('zh');
  const { t, i18n } = useTranslation();
  const changeLanguage = async (lng: string): Promise<void> => {
    setLanguage(lng);
    await i18n.changeLanguage(lng);
    setDrinkColumns(() => loadDrinkColumns());
  };

  const DLCS: Dlc[] = [
    { name: 'base', label: t('baseGame') },
    { name: 'DLC1', label: 'DLC1' },
    { name: 'DLC2', label: 'DLC2' },
    { name: 'DLC3', label: 'DLC3' },
  ];
  const [dlcVersions, ] = useState<DlcChoice>(
    Object.fromEntries(
      DLCS.map((dlc) => [dlc.name, true])
    ) as unknown as DlcChoice // Need to ensure DLCS and DlcChoice in sync
  );

  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [drinkColumns, setDrinkColumns] = useState<tb.Column<Drink>[]>(
    loadDrinkColumns()
  );

  // Load drinks
  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(getDrinksUri(language));
      const data: Drink[] = await res.json();
      setDrinks(data);
    };
    loadData();
  }, [language]);

  const filterDrinkByDlc = (drink: Drink) => {
    return Object.entries(dlcVersions)
      .filter(([, isIncluded]) => isIncluded)
      .map(([name]) => name)
      .includes(drink.dlc);
  };

  const filterFunctions = [filterDrinkByDlc];
  const rowIdFunction = (drink: Drink) => drink.defaultName;

  return (
    <div className="App">
      <Title text={t('title')} />
      <LanguageDropdown language={language} changeLanguage={changeLanguage} />
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
