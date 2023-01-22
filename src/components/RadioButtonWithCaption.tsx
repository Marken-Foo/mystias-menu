type RadioValue = string | number | readonly string[] | undefined;

interface RadioButtonWithCaptionProps<T extends RadioValue> {
  name: string;
  value: T;
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
  caption: string;
}

export const RadioButtonWithCaption = <T extends RadioValue>({
  name,
  value,
  state,
  setState,
  caption,
}: RadioButtonWithCaptionProps<T>) => {
  return (
    <div>
      <input
        type="radio"
        value={value}
        checked={state === value}
        onChange={() => setState(() => value)}
        name={name}
      />
      {caption}
    </div>
  );
};
