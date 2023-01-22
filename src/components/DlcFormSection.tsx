import { Dlc, DlcChoice } from '@/App'; // types
import { CheckboxWithCaption } from '@components/CheckboxWithCaption';

interface DlcFormSectionProps {
  dlcs: Dlc[];
  dlcVersions: DlcChoice;
  setDlcVersions: React.Dispatch<React.SetStateAction<DlcChoice>>;
}

export const DlcFormSection = ({
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
