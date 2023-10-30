import { create } from "zustand";

interface ClosedTasksStore {
  selectedTasksDictionary: Record<string, string[]>;
  selectTask: (params: { taskId: string; taskPoolId: string }) => void;
  selectManyTasks: (params: { taskIds: string[]; taskPoolId: string }) => void;
  unselectTask: (params: { taskId: string; taskPoolId: string }) => void;
  unselectManyTasks: (params: { taskPoolId: string }) => void;
  unselectedAllTasks: () => void;
}

export const useClosedTasksStore = create<ClosedTasksStore>()((set, get) => ({
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
  unselectManyTasks: ({ taskPoolId }) => {
    set(
      (state) =>
        (state.selectedTasksDictionary = {
          ...state.selectedTasksDictionary,
          [taskPoolId]: [],
        })
    );
  },
  unselectedAllTasks: () => {
    set({ selectedTasksDictionary: {} });
  },
}));

const useSelectedTasks = (taskPoolId: string) =>
  useClosedTasksStore().selectedTasksDictionary[taskPoolId] ?? [];

export const useSelectedClosedTasksCounter = () => {
  const openTasksStore = useClosedTasksStore();

  return (taskPoolId: string) =>
    openTasksStore.selectedTasksDictionary[taskPoolId]?.length;
};

export const useAllSelectedClosedTasksCount = () =>
  Object.values(useClosedTasksStore().selectedTasksDictionary).reduce(
    (curr, prev) => curr + prev.length,
    0
  );

export const useIsClosedTaskSelected = ({
  taskId,
  taskPoolId,
}: {
  taskId: string;
  taskPoolId: string;
}) => useSelectedTasks(taskPoolId)?.some((id) => id === taskId);

export const useIsClosedTasksListSelected = ({
  taskPoolId,
}: {
  taskPoolId: string;
}) => useSelectedTasks(taskPoolId)?.length > 0;
