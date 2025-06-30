export type CustomField = {
    fieldName: string;
    fieldType: string;
};

export function getFieldsForTemplate(template: string): CustomField[] {
    switch (template) {
        case "remote/online friends":
            return [
                { fieldName: "discord username", fieldType: "string" },
                { fieldName: "timezone", fieldType: "string" },
                { fieldName: "preferred call time", fieldType: "string" },
            ];
        case "high school seniors":
            return [
                { fieldName: "graduation year", fieldType: "number" },
                { fieldName: "committed college", fieldType: "string" },
            ];
        case "college grads": 
            return [
                { fieldName: "graduation year", fieldType: "number" },
                { fieldName: "major", fieldType: "string" },
                { fieldName: "current job", fieldType: "string" },
            ];
        case "alumni connects":
            return [
                { fieldName: "graduation year", fieldType: "number" },
                { fieldName: "LinkedIn", fieldType: "string" },
                { fieldName: "industry", fieldType: "string" },
            ];
        default:
            return [];
    }
}