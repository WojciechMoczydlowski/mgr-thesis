import { useCurrentToken } from "@/services/auth/hooks/useCurrentToken";
import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RequestParams = {
  courseId: string;
};

type Body = {
  examId: string;
};

export function useDeleteExam({ courseId }: RequestParams) {
  const teacherClient = useTeacherClient();
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: ({ examId }: Body) =>
      teacherClient
        .delete(`/courses/${courseId}/${examId}`)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      toast({
        status: "success",
        title: "Egzamin pomyślnie usunięty",
      });
    },
    onError: () => {
      toast({
        status: "error",
        title: "Wystąpił błąd podczas usuwania egzaminu",
      });
    },
  });
}
