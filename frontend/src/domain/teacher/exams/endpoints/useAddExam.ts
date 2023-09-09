import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RequestParams = {
  courseId: string;
};

type RequestBody = {
  title: string;
  description: string;
  dateTimeStart: string;
  dateTimeEnd: string;
  duration: number;
};

export function useAddExam({ courseId }: RequestParams) {
  const teacherClient = useTeacherClient();
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (body: RequestBody) =>
      teacherClient
        .post<RequestBody>(`/courses/${courseId}`, body)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      toast({
        status: "success",
        title: "Egzamin pomyślnie dodany",
      });
    },
    onError: () => {
      toast({
        status: "error",
        title: "Wystąpił błąd podczas dodawania egzaminu",
      });
    },
  });
}
