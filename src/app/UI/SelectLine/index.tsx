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
          multiValueLabel: () => '!text-white',
          multiValue: () =>
            '!text-red-500 !bg-gray-600 !rounded-full !border !border-tertiary !text-sm overflow-hidden',
          menu: () => '!bg-gray-700 !border !border-gray-600 !rounded-lg !mt-2',
          menuList: () => '!p-2',
          option: ({ isFocused, isSelected }) =>
            `!text-base !px-4 !py-2 !rounded-lg ${
              isFocused
                ? '!bg-gray-600 !text-white'
                : isSelected
                ? '!bg-gray-800 !text-blue-500'
                : '!text-gray-300 hover:!bg-gray-600'
            }`,
          noOptionsMessage: () => '!text-gray-300',
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
