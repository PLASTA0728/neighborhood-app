import { useEffect, useRef } from "react";

const AutocompleteMapField = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadAutocomplete = async () => {
            await google.maps.importLibrary("places");
            
            if (containerRef.current) {
                const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement({});
                containerRef.current.appendChild(placeAutocomplete);
                placeAutocomplete.addEventListener("ready", () => {
                    const shadowRoot = placeAutocomplete.shadowRoot;
                    if (shadowRoot) {
                        const style = document.createElement("style");
                        style.textContent = `
                            input {
                                font-size: 16px;
                                padding: 8px;
                                border: 1px solid #ccc;
                                border-radius: 4px;
                                width: 50px;
                                box-sizing: border-box;
                            }
                                
                            ::placeholder {
                                color: #999;
                            }
                        `;
                        shadowRoot.appendChild(style);
                    }
                });
                placeAutocomplete.addEventListener("placechange", (event: any) => {
                    const place = event.detail;
                    console.log("Selected place:", place);
            });
        }
    };

        if (window.google?.maps) {
            loadAutocomplete();
        } else {
            console.error("Google Maps API not loaded");
        }
}, []);

    return (
        <div>
            <div ref={containerRef} className="w-full" />
        </div>
    )
};

export default AutocompleteMapField;