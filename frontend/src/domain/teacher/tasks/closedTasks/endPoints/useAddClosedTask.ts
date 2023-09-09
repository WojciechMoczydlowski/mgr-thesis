import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RequestParams = {
  courseId: string;
  examId: string;
  taskPoolId: string;
};

type RequestBody = {
  title: string;
  content: string;
  penaltyWeight: number;
  answers: { content: string; weight: number; isCorrect: boolean }[];
};

export function useAddClosedTask({
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
        .post<RequestBody>(`/courses/${courseId}/${examId}/${taskPoolId}`, body)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["closedTasks", courseId, examId, taskPoolId],
      });
      toast({
        status: "success",
        title: "Zadanie zamknięte pomyślnie utworzone",
      });
    },
    onError: () => {
      toast({
        status: "error",
        title: "Wystąpił błąd podczas tworzenia zadania zamkniętego",
      });
    },
  });
}
