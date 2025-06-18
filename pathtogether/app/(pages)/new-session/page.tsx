'use client'
import { useState, useEffect } from "react"
import { Button } from "@/ui/button"
import { useSessionManager } from "@/hooks/useSessionManager";
import { getFieldsForTemplate } from '@/lib/getFieldsForTemplate'
import Link from "next/link";
import { SquareLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import CreateFormFields from "@/components/CreateFormFields";
import Walkthrough from "@/components/Walkthrough";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function NewSession() {
  const isSmallorUp = useMediaQuery("(min-width:520px)");

  const { // hooks must be inside
    sessionNo,
    showPopup,
    setShowPopup,
    hasUpdatedSession,
    setHasUpdatedSession,
    shareSession,
  } = useSessionManager();

  const router = useRouter();

  // database
  const [groupName, setGroupName ] = useState("");
  const [mapName, setMapName ] = useState("");
  const [template, setTemplate ] = useState("");

  const [errors, setErrors] = useState<{ groupName?: string; mapName?: string; currentFieldName?: string; }>({});

  const validateShare = () => {
    const newErrors: Partial<typeof errors> = {};
    if (!groupName.trim()) newErrors.groupName = "group name is required :(";
    if (!mapName.trim()) newErrors.mapName = "map name is required :(";

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateAdd = () => {
    const newErrors: Partial<typeof errors> = {};
    if (!currentField.fieldName.trim()) {
      newErrors.currentFieldName = "field name is required :(";
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  }

  // initialize for the states that are used on frontend
  type CustomField = {
    fieldName: string;
    fieldType: string;
  };

  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [currentField, setCurrentField] = useState<CustomField>({ fieldName: "", fieldType: "string" });
  const [isSaving, setIsSaving] = useState(false); // for the saving loading effect 
  const [countdown, setCountdown] = useState<number | null>(null); // for the countdown before redirecting to edit page
  const [countdownActive, setCountdownActive] = useState(false); // for the countdown before redirecting to edit page

  const handleShareSession = async () => {
    if (!validateShare()) return;
    setIsSaving(true);
    try {
      await shareSession({ groupName, mapName, customFields });
    } catch (error) {
      alert("something broke: " + error.message);
    }
    setIsSaving(false);
  }

  const addField = () => {
    if (!validateAdd()) return;
    setCustomFields([...customFields, currentField]);
    setCurrentField({ fieldName: "", fieldType: "string" });
  };

  const removeField = (indexToRemove: number) => {
    setCustomFields(customFields.filter((_, index) => index !== indexToRemove));
  };

  function hideSessionNo() {
    setShowPopup(false);
    setHasUpdatedSession(true);
  }

  useEffect(() => {
    const fields = getFieldsForTemplate(template);
    setCustomFields(fields);
  }, [template])

  useEffect(() => {
    if (showPopup) {
      setCountdown(3);
      setCountdownActive(true);
    } else {
      setCountdownActive(false);
    }
  }, [showPopup]);

  useEffect(() => {
    if (!countdownActive || countdown === null) return;
    if (countdown === 0) {
      router.push(`/${sessionNo}/edit`);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer); 
  }, [countdown, countdownActive, router, sessionNo])

  return (
    <main className="relative w-full h-screen">
      <div className="flex flex-col sm:flex-row min-h-screen w-full">
        <div className="w-full mb-6 sm:w-[400px] pt-4 pl-4 pr-4 flex flex-col relative">
          <CreateFormFields 
            groupName={groupName}
            setGroupName={setGroupName}
            mapName={mapName}
            setMapName={setMapName}
            template={template}
            setTemplate={setTemplate}
            currentField={currentField}
            setCurrentField={setCurrentField}
            customFields={customFields}
            removeField={removeField}
            addField={addField} 
            errors={errors}
            setErrors={setErrors}
          />

          <Button
            className="mt-6 sm:fixed sm:right-10 sm:bottom-8 z-30 self-center sm:self-auto "
            onClick={handleShareSession}
            disabled={isSaving}
          >
            share my session!
          </Button>

          {isSaving && 
            (<div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
              <SquareLoader color="#94a3b8"/>
            </div>
          )}
        </div>
        <div className="flex-1 bg-gray-100 flex justify-center p-10">
          <div className="relative text-gray-600 grid gap-2">
            <Walkthrough />
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 z-40">
          <div className="absolute w-full h-full bg-black opacity-60 z-20" onClick={hideSessionNo}></div>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-50 bg-white z-30 rounded-md text-gray-800 p-4">
            { !hasUpdatedSession && (
              <div>
                your session code has been generated successfully 🎉 you can share this with your friends to join the map.
              </div>
            )}
            { hasUpdatedSession && (
              <div>
                your map setting has been updated successfully 🎉 use the same session code to share to your friends.
              </div>
            )}
            <div className="text-center text-2xl font-bold mt-2">
              {`session code: ${sessionNo}`}
            </div>
            <div className="text-center bg-gray-300 p-2 rounded-md">redirect to the <Link href={`/${sessionNo}/edit`} className="text-blue-400" >edit session page</Link> in {countdown} second{countdown !== 1 && "s"}...</div>
          </div>
        </div>
      )}
    </main>
  );
}