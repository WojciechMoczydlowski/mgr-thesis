import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RequestParams = {
  courseId: string;
  examId: string;
};

type Body = {
  taskPoolId: string;
};

export function useDeleteTaskPool({ courseId, examId }: RequestParams) {
  const teacherClient = useTeacherClient();
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: ({ taskPoolId }: Body) =>
      teacherClient
        .delete(`/courses/${courseId}/${examId}/${taskPoolId}`)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["taskPools", courseId, examId],
      });
      toast({
        status: "success",
        title: "Pula zadań pomyślnie usunięta",
      });
    },
    onError: () => {
      toast({
        status: "error",
        title: "Wystąpił błąd podczas usuwania puli zadań",
      });
    },
  });
}
