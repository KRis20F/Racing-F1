
import Select from 'react-select';

const SelectInput = (props: any) => {
  return (
    <div style={{ marginBottom: '30px', width: '100%' }}>
      <Select
        {...props}
        closeMenuOnSelect={false}
        blurInputOnSelect={false}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        error={!!props.error}
        success={props.success}
        classNames={{
          input: () => '!text-gray-300',
          container: () => '!text-gray-300',
          valueContainer: () => '!text-gray-300',
          singleValue: () => '!text-gray-300',
          control: () =>
            `!p-0 !rounded-lg !bg-gray-700 !text-gray-300 p-3 !shadow-none ${
              props.error
                ? '!border-red-500'
                : '!border-tertiary focus:!border-tertiary '
            }`,
          placeholder: () => 'text-sm !text-gray-300',
          multiValueLabel: () => '!text-white  ',
          multiValue: () =>
            '!text-red-500 !bg-gray-600  !rounded-full !border !border-tertiary !text-sm overflow-hidden',
          option: ({ isFocused, isSelected }) =>
            `!text-base ${
              isFocused
                ? ' !text-base !text-tertiary'
                : isSelected
                ? '!text-blue-500'
                : '!text-tertiary'
            }`,

          noOptionsMessage: () => '',
        }}
      />
      {props.error && (
        <div className="text-red-500 text-sm mb-4">
          {props.error.toString()}
        </div>
      )}
    </div>
  );
};

export default SelectInput;
