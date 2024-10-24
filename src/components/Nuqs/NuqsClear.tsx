interface Props {
  onClear: () => void;
}

const NuqsClear = (props: Props) => {
  const { onClear } = props;

  return (
    <button data-clear type="button" onClick={onClear}>
      x
    </button>
  );
};

export default NuqsClear;
