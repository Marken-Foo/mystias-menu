import { t } from 'i18next';

export interface DlcChoice {
  base: boolean;
  DLC1: boolean;
  DLC2: boolean;
  DLC3: boolean;
}

interface Dlc {
  name: string;
  label: string;
}

interface FilterableByDlc {
  dlc: string;
}

export const filterByDlc =
  (dlcVersions: DlcChoice) =>
  <T extends FilterableByDlc>(item: T) => {
    return Object.entries(dlcVersions)
      .filter(([, isIncluded]) => isIncluded)
      .map(([name]) => name)
      .includes(item.dlc);
  };

export const loadDlcs: () => Dlc[] = () => [
  { name: 'base', label: t('baseGame') },
  { name: 'DLC1', label: 'DLC1' },
  { name: 'DLC2', label: 'DLC2' },
  { name: 'DLC3', label: 'DLC3' },
];
