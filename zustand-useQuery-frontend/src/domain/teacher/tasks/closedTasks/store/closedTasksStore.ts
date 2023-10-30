import { create } from "zustand";

interface ClosedTasksStore {
  selectedTasksDictionary: Record<string, string[]>;
  selectTask: ({
    taskId,
    taskPoolId,
  }: {
    taskId: string;
    taskPoolId: string;
  }) => void;
  unSelectTask: ({
    taskId,
    taskPoolId,
  }: {
    taskId: string;
    taskPoolId: string;
  }) => void;
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
  unSelectTask: ({ taskId, taskPoolId }) => {
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
}));

const useSelectedTasks = ({ taskPoolId }: { taskPoolId: string }) =>
  useClosedTasksStore().selectedTasksDictionary[taskPoolId] ?? [];

export const useIsClosedTaskSelected = ({
  taskId,
  taskPoolId,
}: {
  taskId: string;
  taskPoolId: string;
}) => useSelectedTasks({ taskPoolId })?.some((id) => id === taskId);

export const useIsClosedTasksListSelected = ({
  taskPoolId,
}: {
  taskPoolId: string;
}) => useSelectedTasks({ taskPoolId })?.length > 0;

// selectOpenTask: (
//   state,
//   action: PayloadAction<{ taskId: string; taskPoolId: string }>
// ) => {
//   state.selectedTasksIds = {
//     ...state.selectedTasksIds,
//     [action.payload.taskPoolId]: [
//       ...(state.selectedTasksIds[action.payload.taskPoolId] ?? []),
//       action.payload.taskId,
//     ],
//   };
// },
// selectManyOpenTasks: (
//   state,
//   action: PayloadAction<{ taskIds: string[]; taskPoolId: string }>
// ) => {
//   state.selectedTasksIds = {
//     ...state.selectedTasksIds,
//     [action.payload.taskPoolId]: [
//       ...(state.selectedTasksIds[action.payload.taskPoolId] ?? []),
//       ...action.payload.taskIds,
//     ],
//   };
// },
// unSelectManyOpenTasks: (
//   state,
//   action: PayloadAction<{ taskIds: string[]; taskPoolId: string }>
// ) => {
//   state.selectedTasksIds = {
//     ...state.selectedTasksIds,
//     [action.payload.taskPoolId]: state.selectedTasksIds[
//       action.payload.taskPoolId
//     ].filter(
//       (selectedTaskId) =>
//         !action.payload.taskIds.some((id) => selectedTaskId === id)
//     ),
//   };
// },
// unselectOpenTask: (
//   state,
//   action: PayloadAction<{ taskId: string; taskPoolId: string }>
// ) => {
//   state.selectedTasksIds = {
//     ...state.selectedTasksIds,
//     [action.payload.taskPoolId]: state.selectedTasksIds[
//       action.payload.taskPoolId
//     ].filter((selectedTaskId) => selectedTaskId !== action.payload.taskId),
//   };
// },
// unselectAllOpenTasks: (state) => {
//   state.selectedTasksIds = {};
// },
