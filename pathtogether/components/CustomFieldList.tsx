import FormInput from "./FormInput";

type CustomField = {
    fieldName: string;
};

type CustomResponse = {
    fieldName: string;
    response: string;
};

type Props = {
    fields: CustomField[];
    responses: CustomResponse[];
    onChange: (fieldName: string, value: string) => void;
};

export default function CustomFieldList({ fields, responses, onChange }: Props) {
    return (
        <div className="flex flex-col gap-4">
            {fields.map((field, index) => {
                const existing = responses.find(r => r.fieldName === field.fieldName);
                return (
                    <FormInput key={index} placeholder={field.fieldName} value={existing?.response || ""} onChange={(val) => (field.fieldName, val)}/>
                )
            })}
        </div>
    )
}