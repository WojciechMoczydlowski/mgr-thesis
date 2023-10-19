import { useCurrentToken } from "@/services/auth/hooks/useCurrentToken";
import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RequestParams = {
  courseId: string;
  examId: string;
};

type RequestBody = {
  taskPoolId: string;
  title: string;
  description: string;
  pointsPerTask: number;
  taskDrawNumber: number;
};

export function useEditTaskPool({ courseId, examId }: RequestParams) {
  const teacherClient = useTeacherClient();
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (body: RequestBody) =>
      teacherClient
        .put<RequestBody>(
          `/courses/${courseId}/${examId}/${body.taskPoolId}`,
          body
        )
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["taskPools", courseId, examId],
      });
      toast({ status: "success", title: "Pula zadań pomyślnie edytowana" });
    },
    onError: () => {
      toast({
        status: "error",
        title: "Wystąpił błąd podczas edycji puli zadań",
      });
    },
  });
}
