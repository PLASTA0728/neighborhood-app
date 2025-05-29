import { useSessionSubmit } from "@/hooks/useSessionSubmit";

export default function SessionInput({ value, onChange }) {
    const { submit, handleKeyDown } = useSessionSubmit(value, onChange);
    return (
        <div className="flex">
            <input 
                className="z-20 placeholder:text-gray-500 bg-black px-4 py-4 w-75 relative left-0 rounded-md"
                placeholder="enter your session code"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown} 
            />
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="z-40 relative right-10 top-4 fill-none stroke-white stroke-2 size-6"
                onClick={submit}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499" />
            </svg>
        </div>
    )
}