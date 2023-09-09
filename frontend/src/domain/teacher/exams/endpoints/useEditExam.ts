import { useCurrentToken } from "@/services/auth/hooks/useCurrentToken";
import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RequestParams = {
  courseId: string;
};

type RequestBody = {
  examId: string;
  title: string;
  description: string;
  dateTimeStart: string;
  dateTimeEnd: string;
  duration: number;
};

export function useEditExam({ courseId }: RequestParams) {
  const teacherClient = useTeacherClient();
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (body: RequestBody) =>
      teacherClient
        .put<RequestBody>(`/courses/${courseId}/${body.examId}`, body)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      toast({ status: "success", title: "Egzamin pomyślnie edytowany" });
    },
    onError: () => {
      toast({
        status: "error",
        title: "Wystąpił błąd podczas edycji egzaminu",
      });
    },
  });
}
