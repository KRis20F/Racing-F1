import SelectLine from './SelectLine';

interface UserOption {
  value: string;
  label: string;
  avatarUrl?: string;
  wallet?: string;
}

interface UserSearchInputProps {
  value: UserOption | null;
  options: UserOption[];
  label?: string;
  name: string;
  isMulti?: boolean;
  required?: boolean;
  errors: Record<string, string>;
  setFieldValue: (option: UserOption | null) => void;
  handleBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
}

const UserSearchInput: React.FC<UserSearchInputProps> = ({
  value,
  options,
  label = 'Buscar usuario',
  name,
  isMulti = false,
  required = false,
  errors,
  setFieldValue,
  handleBlur,
}) => (
  <SelectLine
    value={value}
    options={options}
    isMulti={isMulti}
    label={label}
    name={name}
    required={required}
    errors={errors}
    onChange={setFieldValue}
    handleBlur={handleBlur}
    touched={{}}
  />
);

export default UserSearchInput; 