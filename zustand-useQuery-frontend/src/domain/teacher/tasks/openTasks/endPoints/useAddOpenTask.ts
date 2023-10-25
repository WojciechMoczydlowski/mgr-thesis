import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RequestParams = {
  courseId: string;
  examId: string;
  taskPoolId?: string;
};

type RequestBody = {
  title: string;
  content: string;
  taskPoolIdFallback?: string;
};

export function useAddOpenTask({
  courseId,
  examId,
  taskPoolId,
}: RequestParams) {
  const teacherClient = useTeacherClient();
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation<unknown, unknown, RequestBody, unknown>({
    mutationFn: (body) =>
      teacherClient
        .post<RequestBody>(
          `/courses/${courseId}/${examId}/${
            taskPoolId ?? body.taskPoolIdFallback
          }`,
          body
        )
        .then((res) => res.data),
    onSuccess: (_, { taskPoolIdFallback }) => {
      queryClient.invalidateQueries({
        queryKey: [
          "openTasks",
          courseId,
          examId,
          taskPoolId ?? taskPoolIdFallback,
        ],
      });
      toast({
        status: "success",
        title: "Zadanie otwarte pomyślnie utworzone",
      });
    },
    onError: () => {
      toast({
        status: "error",
        title: "Wystąpił błąd podczas tworzenia zadania otwartego",
      });
    },
  });
}
