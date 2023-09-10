import { useStudentClient } from "@/services/backend/useStudentClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  onSuccess?: () => void;
} & RequestParams;

type RequestParams = {
  courseId: string;
  paperId: string;
};

type RequestBody = { answerId: number; isMarked: boolean; taskId: string };

export function useUpdateStudentClosedTask({
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
          answersClosedTask: [{ id: body.answerId, isMarked: body.isMarked }],
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
