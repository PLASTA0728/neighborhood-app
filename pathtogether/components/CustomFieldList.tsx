import FormInput from "./FormInput";
import { ICustomResponse } from '@/utils/types';

type CustomField = {
    fieldName: string;
    value: string;
};

type Props = {
    fields: CustomField[];
    responses: ICustomResponse[];
    onChange: (fieldName: string, value: string) => void;
};

export default function CustomFieldList({ fields, responses, onChange }: Props) {
    return (
        <div className="flex flex-col gap-4">
            {fields.map((field, index) => {
                const existing = responses.find(r => r.fieldName === field.fieldName);
                return (
                    <FormInput key={index} placeholder={field.fieldName} value={existing?.response || ""} onChange={(val) => onChange(field.fieldName, val)}/>
                )
            })}
        </div>
    )
}