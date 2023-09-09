import { useStudentClient } from "@/services/backend/useStudentClient";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

type Props = {
  onSuccess?: () => void;
} & RequestParams;

type RequestParams = {
  courseId: string;
  paperId: string;
};

export function useSubmitStudentPaper({ courseId, paperId, onSuccess }: Props) {
  const studentClient = useStudentClient();
  const toast = useToast();

  return useMutation({
    mutationFn: () =>
      studentClient
        .post(`/courses/${courseId}/${paperId}/submit`)
        .then((res) => res.data),
    onSuccess: () => {
      onSuccess?.();
      toast({
        status: "success",
        title: "Egzamin pomyślnie zakończony.",
      });
    },
    onError: () => {
      toast({
        status: "error",
        title: "Wystąpił błąd podczas kończenia egzaminu",
      });
    },
  });
}
