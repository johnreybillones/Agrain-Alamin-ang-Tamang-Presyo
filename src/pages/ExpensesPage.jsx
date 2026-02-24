import { useState } from 'react';
import { useSeason } from '../context/SeasonContext.jsx';
import { createExpense, deleteExpense } from '../services/expenseService.js';
import CameraCapture from '../components/camera/CameraCapture.jsx';
import PhotoPreview from '../components/camera/PhotoPreview.jsx';
import TierPicker from '../components/expenses/TierPicker.jsx';
import ExpenseList from '../components/expenses/ExpenseList.jsx';
import ConfirmAnimation from '../components/ui/ConfirmAnimation.jsx';
import BigButton from '../components/ui/BigButton.jsx';

// Wizard steps
const STEP = { LIST: 'list', CAMERA: 'camera', PREVIEW: 'preview', TIER: 'tier', SAVING: 'saving', DONE: 'done' };

export default function ExpensesPage() {
  const { expenses, totalExpenses, refresh, showToast } = useSeason();
  const [step, setStep] = useState(STEP.LIST);
  const [capturedBlob, setCapturedBlob] = useState(null);

  function startLogging() {
    setCapturedBlob(null);
    setStep(STEP.CAMERA);
  }

  function handleCapture(blob) {
    if (blob) {
      setCapturedBlob(blob);
      setStep(STEP.PREVIEW);
    } else {
      // No camera / skipped — go straight to tier picker
      setStep(STEP.TIER);
    }
  }

  function handleCameraCancel() {
    setStep(STEP.LIST);
  }

  function handlePhotoConfirm() {
    setStep(STEP.TIER);
  }

  function handlePhotoRetake() {
    setStep(STEP.CAMERA);
  }

  async function handleDelete(id) {
    try {
      await deleteExpense(id);
      await refresh();
      showToast('Na-bura na ang gastos.');
    } catch {
      showToast('May error sa pagbura. Subukan muli.');
    }
  }

  async function handleTierSelect(tier) {
    setStep(STEP.SAVING);
    try {
      await createExpense(tier, capturedBlob);
      await refresh();
      setStep(STEP.DONE);
    } catch {
      showToast('May error. Subukan muli.');
      setStep(STEP.LIST);
    }
  }

  function handleConfirmDone() {
    setStep(STEP.LIST);
  }

  return (
    <>
      {/* Camera */}
      {step === STEP.CAMERA && (
        <CameraCapture onCapture={handleCapture} onCancel={handleCameraCancel} />
      )}

      {/* Photo preview */}
      {step === STEP.PREVIEW && capturedBlob && (
        <PhotoPreview
          blob={capturedBlob}
          onConfirm={handlePhotoConfirm}
          onRetake={handlePhotoRetake}
        />
      )}

      {/* Tier picker */}
      {step === STEP.TIER && (
        <div className="flex flex-col gap-4 py-6">
          <p className="text-xl font-bold text-gray-800 px-4">Pumili ng Klase ng Gastos:</p>
          <TierPicker onSelect={handleTierSelect} />
          <div className="px-4">
            <BigButton
              onClick={handleCameraCancel}
              className="w-full bg-gray-200 text-gray-700"
            >
              Kanselahin
            </BigButton>
          </div>
        </div>
      )}

      {/* Saving spinner */}
      {step === STEP.SAVING && (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-500">Sine-save…</p>
        </div>
      )}

      {/* Success flash */}
      {step === STEP.DONE && <ConfirmAnimation onDone={handleConfirmDone} />}

      {/* Main list view */}
      {(step === STEP.LIST || step === STEP.DONE) && (
        <div className="flex flex-col gap-4 py-4">
          {/* Summary bar */}
          <div className="flex items-center justify-between px-4">
            <p className="text-xl font-bold text-gray-800">Mga Gastos</p>
            <span className="text-xl font-bold tabular-nums text-red-600">
              ₱{totalExpenses.toLocaleString()}
            </span>
          </div>

          {/* Log button */}
          <div className="px-4">
            <BigButton
              onClick={startLogging}
              className="w-full bg-green-700 text-white text-xl shadow-md"
            >
              📸 Mag-log ng Gastos
            </BigButton>
          </div>

          {/* Expense list */}
          <ExpenseList expenses={expenses} onDelete={handleDelete} />
        </div>
      )}
    </>
  );
}
