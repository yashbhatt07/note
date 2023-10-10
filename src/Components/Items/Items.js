import { Controller } from "react-hook-form";
import Select from "react-select";
export const Items = ({ control, options, name, style = {} }) => {
  console.log("🚀 ~ file: Items.js:4 ~ Items ~ name:", name);
  console.log("🚀 ~ file: Items.js:4 ~ Items ~ options:", options);
  console.log("🚀 ~ file: Items.js:4 ~ Items ~ control:", control);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              ...style,
            }),
          }}
          {...field}
          options={options}
        />
      )}
    />
  );
};

export default Items;
