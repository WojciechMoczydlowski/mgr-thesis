import { useCurrentToken } from "@/services/auth/hooks/useCurrentToken";
import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RequestParams = {
  courseId: string;
  examId: string;
  taskPoolId: string;
};

type Body = {
  taskId: string;
};

export function useDeleteTask({ courseId, examId, taskPoolId }: RequestParams) {
  const teacherClient = useTeacherClient();
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: ({ taskId }: Body) =>
      teacherClient
        .delete(`/courses/${courseId}/${examId}/${taskPoolId}/${taskId}`)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["openTasks", courseId, examId, taskPoolId],
      });
      queryClient.invalidateQueries({
        queryKey: ["closedTasks", courseId, examId, taskPoolId],
      });
      toast({
        status: "success",
        title: "Zadanie pomyślnie usunięte",
      });
    },
    onError: () => {
      toast({
        status: "error",
        title: "Wystąpił błąd podczas usuwania zadania",
      });
    },
  });
}
