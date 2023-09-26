import { useStudentClient } from "@/services/backend/useStudentClient";
import { useMutation } from "@tanstack/react-query";

type Props = {
  onSuccess?: () => void;
} & RequestParams;

type RequestParams = {
  courseId: string;
  paperId: string;
};

type RequestBody = {};

export function useStartStudentPaper({ courseId, paperId, onSuccess }: Props) {
  const studentClient = useStudentClient();

  return useMutation({
    mutationFn: (body: RequestBody) =>
      studentClient
        .post<RequestBody>(`/courses/${courseId}/${paperId}/start`, body)
        .then((res) => res.data),
    onSuccess: () => {
      onSuccess?.();
    },
  });
}
