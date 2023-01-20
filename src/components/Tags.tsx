export const NeutralTag = ({ text }: { text: string }) => {
  return <span className={'neutralTag'}>{text}</span>;
};

export const GoodTag = ({ text }: { text: string }) => {
  return <span className={'goodTag'}>{text}</span>;
};

export const BadTag = ({ text }: { text: string }) => {
  return <span className={'badTag'}>{text}</span>;
};
