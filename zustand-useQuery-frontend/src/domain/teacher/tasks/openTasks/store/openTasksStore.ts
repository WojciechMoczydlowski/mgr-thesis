import { create } from "zustand";

interface OpenTasksStore {
  selectedTasksDictionary: Record<string, string[]>;
  selectTask: (params: { taskId: string; taskPoolId: string }) => void;
  selectManyTasks: (params: { taskIds: string[]; taskPoolId: string }) => void;
  unselectTask: (params: { taskId: string; taskPoolId: string }) => void;
  unselectManyTasks: (params: { taskPoolId: string }) => void;
}

export const useOpenTasksStore = create<OpenTasksStore>()((set, get) => ({
  selectedTasksDictionary: {},
  selectTask: ({ taskId, taskPoolId }) => {
    set((state) => ({
      selectedTasksDictionary: {
        ...state.selectedTasksDictionary,
        [taskPoolId]: [
          ...(state.selectedTasksDictionary[taskPoolId] ?? []),
          taskId,
        ],
      },
    }));
  },
  unselectTask: ({ taskId, taskPoolId }) => {
    set(
      (state) =>
        (state.selectedTasksDictionary = {
          ...state.selectedTasksDictionary,
          [taskPoolId]: state.selectedTasksDictionary[taskPoolId].filter(
            (id) => id !== taskId
          ),
        })
    );
  },
  selectManyTasks: ({ taskIds, taskPoolId }) => {
    set((state) => ({
      selectedTasksDictionary: {
        ...state.selectedTasksDictionary,
        [taskPoolId]: [
          ...(state.selectedTasksDictionary[taskPoolId] ?? []),
          ...taskIds,
        ],
      },
    }));
  },
  unselectManyTasks: ({ taskPoolId }) => {
    set(
      (state) =>
        (state.selectedTasksDictionary = {
          ...state.selectedTasksDictionary,
          [taskPoolId]: [],
        })
    );
  },
}));

const useSelectedTasks = ({ taskPoolId }: { taskPoolId: string }) =>
  useOpenTasksStore().selectedTasksDictionary[taskPoolId] ?? [];

export const useIsOpenTaskSelected = ({
  taskId,
  taskPoolId,
}: {
  taskId: string;
  taskPoolId: string;
}) => useSelectedTasks({ taskPoolId })?.some((id) => id === taskId);

export const useIsOpenTasksListSelected = ({
  taskPoolId,
}: {
  taskPoolId: string;
}) => useSelectedTasks({ taskPoolId })?.length > 0;
