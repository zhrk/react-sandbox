import { useEffect, useState } from 'react';

type Option = { value: string; label: string };
type Options = Option[];

/* interface SelectMulti {
  multi: true;
  onChange?: (value: Options) => void;
} */

interface Select {
  onChange?: (value: Option | null) => void;
}

type Jopa<Multi> = Multi extends true ? Options : Option | null;

type Test<Value, Multi> = Multi extends true
  ? {
      multi: Multi;
      onChange?: (value: Value) => void;
    }
  : {
      multi?: Multi;
      onChange?: (value: Value) => void;
    };

const Select = <Value extends Option | Options | null, Multi extends boolean = false>(
  props: Test<Value, Multi>
) => {
  const { multi = false, onChange } = props;

  const [value, setValue] = useState(multi ? ([] as Options) : null);

  useEffect(() => {
    if (onChange) {
      onChange(value as Value);
    }
  }, [value, onChange]);

  /* основая проблема:
    как типизириовать и внутри и снаружи onChange в зависимости от пропса multi без использования as?
  */

  return <div>Select</div>;
};

/* type MultiSelectOnChange = (value: Option[]) => void;
type SingleSelectOnChange = (value: Option | null) => void;

interface CommonProps {
  options: Options;
}

interface MultiSelect extends CommonProps {
  multi: true;
  onChange?: (value: Option[]) => void;
}

interface SingleSelect extends CommonProps {
  onChange?: (value: Option | null) => void;
}

interface SelectProps extends CommonProps {
  multi?: boolean;
  onChange?: SingleSelectOnChange | MultiSelectOnChange;
}

function Select(props: SingleSelect): JSX.Element;
function Select(props: MultiSelect): JSX.Element;

function Select(props: SelectProps): JSX.Element {
  const { multi = false, onChange } = props;

  const [value, setValue] = useState(multi ? [] : null);

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
  }, [value, onChange]);

  return <div>Select</div>;
} */

export default Select;
