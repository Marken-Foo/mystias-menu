// import { t } from 'i18next';

import { Drink } from '@/interfaces/DataInterfaces'; // types
import { sortFunctionOnField } from '@/utils';
import { GameAssetIcon } from '@components/GameAssetIcon';
import { Column } from '@components/table/Table';

interface DrinkIconDisplayProps {
  name: string;
  imageName: string;
}

const DrinkIconDisplay = ({ name, imageName }: DrinkIconDisplayProps) => (
  <GameAssetIcon src={`/images/drinks/${imageName}.png`} name={name} />
);

export const loadDrinkColumns: () => Column<Drink>[] = () => [
  {
    accessor: 'icon',
    label: 'Drink',
    displayFunction: (drink) => (
      <DrinkIconDisplay name={drink.name} imageName={drink.defaultName} />
    ),
  },
  {
    accessor: 'name',
    label: 'Name',
    displayFunction: (drink) => drink.name,
    isSortable: true,
    sortFunction: sortFunctionOnField((drink) => drink.name),
  },
];
