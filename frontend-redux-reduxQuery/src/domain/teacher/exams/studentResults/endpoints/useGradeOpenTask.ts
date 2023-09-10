import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RequestParams = {
  courseId: string;
  examTemplateId: string;
  examPaperId: string;
};

type RequestBody = {
  earnedPoints: number;
  teacherComment: string;
  taskExamPaperId: string;
};

export function useGradeOpenTask({
  courseId,
  examTemplateId,
  examPaperId,
}: RequestParams) {
  const teacherClient = useTeacherClient();
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (body: RequestBody) =>
      teacherClient
        .put<RequestBody>(
          `/courses/${courseId}/${examTemplateId}/exampapers/${examPaperId}/${body.taskExamPaperId}/mark`,
          body
        )
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["examPaperDetails", examPaperId],
      });
      toast({ status: "success", title: "Zadanie zostało ocenione" });
    },
    onError: () => {
      toast({
        status: "error",
        title: "Wystąpił błąd podczas oceniania zadania",
      });
    },
  });
}
