"use client";

import { useState } from "react";
import { MoveRequestProvider, useMoveRequest } from "@/lib/store";
import { computeTotalVolume } from "@/lib/volume";
import Stepper from "@/components/Stepper";
import StepIdentity from "@/components/StepIdentity";
import RoomManager from "@/components/RoomManager";
import VolumeSummary from "@/components/VolumeSummary";
import AccessForm from "@/components/AccessForm";
import ReviewSubmit from "@/components/ReviewSubmit";

const LAST_STEP = 4;

function Wizard() {
  const [step, setStep] = useState(0);
  const { state } = useMoveRequest();

  // Conditions minimales pour avancer.
  const canContinue = (() => {
    if (step === 0) {
      return (
        state.identity.firstName.trim() !== "" &&
        state.identity.lastName.trim() !== "" &&
        state.identity.email.trim() !== ""
      );
    }
    if (step === 1) {
      return computeTotalVolume(state.rooms) > 0;
    }
    if (step === 3) {
      return state.departure.address.trim() !== "" && state.arrival.address.trim() !== "";
    }
    return true;
  })();

  return (
    <div>
      <Stepper current={step} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            {step === 0 && <StepIdentity />}
            {step === 1 && <RoomManager />}
            {step === 2 && <VolumeSummary />}
            {step === 3 && <AccessForm />}
            {step === 4 && <ReviewSubmit />}
          </div>

          {/* Navigation */}
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="rounded-full border border-gray-300 px-6 py-2 font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-40"
            >
              ← Précédent
            </button>
            {step < LAST_STEP && (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(LAST_STEP, s + 1))}
                disabled={!canContinue}
                className="rounded-full bg-logilift-blue px-6 py-2 font-semibold text-white transition hover:bg-logilift-blue-dark disabled:opacity-40"
              >
                Continuer →
              </button>
            )}
          </div>
        </div>

        {/* Récap volume permanent */}
        <aside className="lg:col-span-1">
          <div className="sticky top-4 space-y-4">
            <VolumeSummary compact />
            <p className="text-xs text-gray-400">
              Le volume se met à jour automatiquement au fur et à mesure que vous
              ajoutez des objets.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function DevisPage() {
  return (
    <MoveRequestProvider>
      <Wizard />
    </MoveRequestProvider>
  );
}
