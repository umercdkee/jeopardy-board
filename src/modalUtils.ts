import { atom, useAtomValue, useSetAtom } from "jotai";
import type { QuestionType } from "./components/board/data";

type ModalState = (QuestionType & { category: string }) | null;

const ModalAtom = atom<ModalState>(null);

function useModalData() {
  const modalData = useAtomValue(ModalAtom);
  return modalData;
}

function useCloseModal() {
  const setModal = useSetAtom(ModalAtom);
  return () => setModal(null);
}

function useSetModalData() {
  const setModal = useSetAtom(ModalAtom);
  return (question: QuestionType, category: string) => {
    setModal({ ...question, category });
  };
}

// One font size (in px) shared by every question popup, so all questions look the same.
// SizeProbe measures every question and sets the largest size at which all of them fit.
const PopupFontSizeAtom = atom(16);

function usePopupFontSize() {
  return useAtomValue(PopupFontSizeAtom);
}

function useSetPopupFontSize() {
  return useSetAtom(PopupFontSizeAtom);
}

export {
  useModalData,
  useCloseModal,
  useSetModalData,
  usePopupFontSize,
  useSetPopupFontSize,
};
