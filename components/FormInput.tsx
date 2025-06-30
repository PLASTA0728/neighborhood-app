type FormInputProps = {
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
};

export default function 
FormInput({ placeholder, value, onChange }: FormInputProps) {
  return (
    <input
      className="px-4 py-4 rounded-md bg-white text-gray-500 dark:text-gray-300 border border-gray-300 dark:bg-gray-600 dark:border-gray-600"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
