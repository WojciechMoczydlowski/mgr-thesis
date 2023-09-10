import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";

type RequestParams = {
  courseId: string;
  examId: string;
  onSuccess?: () => void;
};

type RequestBody = {};

export function useGenerateExam({
  courseId,
  examId,
  onSuccess,
}: RequestParams) {
  const teacherClient = useTeacherClient();
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (body: RequestBody) =>
      teacherClient
        .post<RequestBody>(`/courses/${courseId}/${examId}/generate`, body)
        .then((res) => res.data),
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      toast({
        status: "success",
        title: "Egzamin został wygenerowany dla studentów",
      });
    },
    onError: () => {
      toast({
        status: "error",
        title: "Wystąpił błąd przy generowaniu egzaminu",
      });
    },
  });
}
