import { useCurrentToken } from "@/services/auth/hooks/useCurrentToken";
import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RequestParams = {
  courseId: string;
  examId: string;
  taskPoolId: string;

  onSuccess?: () => void;
};

type Body = {
  taskIds: string[];
};

export function useDeleteManyTasks({
  courseId,
  examId,
  taskPoolId,
  onSuccess,
}: RequestParams) {
  const teacherClient = useTeacherClient();
  const queryClient = useQueryClient();
  const toast = useToast();

  const deleteTask = async (taskId: string) => {
    await teacherClient
      .delete(`/courses/${courseId}/${examId}/${taskPoolId}/${taskId}`)
      .then((res) => res.data);
  };

  return useMutation({
    mutationFn: ({ taskIds }: Body) =>
      Promise.all(taskIds.map((taskId) => deleteTask(taskId))),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["openTasks", courseId, examId, taskPoolId],
      });
      queryClient.invalidateQueries({
        queryKey: ["closedTasks", courseId, examId, taskPoolId],
      });
      toast({
        status: "success",
        title: "Zadania pomyślnie usunięte",
      });
      onSuccess?.();
    },
    onError: () => {
      toast({
        status: "error",
        title: "Wystąpił błąd podczas usuwania zadania",
      });
    },
  });
}
