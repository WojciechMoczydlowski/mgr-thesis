import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RequestParams = {
  courseId: string;
  examId: string;
  taskPoolId: string;
};

type RequestBody = {
  taskId: string;
  title: string;
  content: string;
  penaltyWeight: number;
  answers: { content: string; weight: number; isCorrect: boolean }[];
};

export function useEditClosedTask({
  courseId,
  examId,
  taskPoolId,
}: RequestParams) {
  const teacherClient = useTeacherClient();
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (body: RequestBody) =>
      teacherClient
        .put<RequestBody>(
          `/courses/${courseId}/${examId}/${taskPoolId}/${body.taskId}`,
          body
        )
        .then((res) => res.data),
    onSuccess: () => {
      toast({
        status: "success",
        title: "Zadanie zamknięte pomyślnie edytowane",
      });
      queryClient.invalidateQueries({
        queryKey: ["closedTasks", courseId, examId, taskPoolId],
      });
    },
    onError: () => {
      toast({
        status: "error",
        title: "Wystąpił błąd podczas edycji zadania zamkniętego",
      });
    },
  });
}
