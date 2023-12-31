import { create } from "zustand";

interface TaskPoolStore {
  selectedTaskPoolId: string | undefined;
  selectTaskPool: ({ id }: { id: string }) => void;
  unSelectTaskPool: () => void;
}

export const useTaskPoolStore = create<TaskPoolStore>()((set) => ({
  selectedTaskPoolId: undefined,
  selectTaskPool: ({ id }) =>
    set(() => ({ selectedTaskPoolId: Number(id) as unknown as string })),
  unSelectTaskPool: () => set(() => ({ selectedTaskPoolId: undefined })),
}));
