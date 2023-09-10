import { useCurrentToken } from "@/services/auth/hooks/useCurrentToken";
import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RequestParams = {
  courseId: string;
  examId: string;
};

type RequestBody = {
  title: string;
  taskType: string;
  description: string;
  pointsPerTask: number;
  taskDrawNumber: number;
};

export function useAddTaskPool({ courseId, examId }: RequestParams) {
  const teacherClient = useTeacherClient();
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (body: RequestBody) =>
      teacherClient
        .post<RequestBody>(`/courses/${courseId}/${examId}`, body)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["taskPools", courseId, examId],
      });
      toast({
        status: "success",
        title: "Pula zadań pomyślnie utworzona",
      });
    },
    onError: () => {
      toast({
        status: "error",
        title: "Wystąpił błąd podczas tworzenia puli zadań",
      });
    },
  });
}
