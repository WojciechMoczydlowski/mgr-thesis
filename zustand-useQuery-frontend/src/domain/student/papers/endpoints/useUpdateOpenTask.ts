import { useStudentClient } from "@/services/backend/useStudentClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  onSuccess?: () => void;
} & RequestParams;

type RequestParams = {
  courseId: string;
  paperId: string;
};

type RequestBody = { answer: string; taskId: string };

export function useUpdateStudentOpenTask({
  courseId,
  paperId,
  onSuccess,
}: Props) {
  const studentClient = useStudentClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: RequestBody) =>
      studentClient
        .put<RequestBody>(`/courses/${courseId}/${paperId}/${body.taskId}`, {
          answerOpenTask: body.answer,
        })
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["studentPaper", courseId, paperId],
      });
      onSuccess?.();
    },
  });
}
