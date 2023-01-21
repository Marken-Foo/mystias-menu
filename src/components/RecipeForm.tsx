import { Dlc, DlcChoice } from '@/App'; // Only types, otherwise cyclic
import { CheckboxWithCaption } from './CheckboxWithCaption';

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
}

export const RecipeForm = ({
  dlcs,
  dlcVersions,
  setDlcVersions,
}: RecipeFormProps) => {
  return (
    <>
      <DlcFormSection
        dlcs={dlcs}
        dlcVersions={dlcVersions}
        setDlcVersions={setDlcVersions}
      />
    </>
  );
};
