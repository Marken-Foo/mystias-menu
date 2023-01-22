interface CheckboxWithCaptionProps {
  initialState: boolean;
  onChange: () => void;
  label: string;
}

export const CheckboxWithCaption = ({
  initialState,
  onChange,
  label,
}: CheckboxWithCaptionProps) => {
  return (
    <span className="checkboxWithCaption">
      {label}
      <input type="checkbox" checked={initialState} onChange={onChange} />
    </span>
  );
};
