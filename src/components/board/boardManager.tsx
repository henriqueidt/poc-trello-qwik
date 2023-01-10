import { $, component$, useSignal, useStore } from "@builder.io/qwik";
import { ColumnProps } from "../column/column";
import { Board } from "./board";

export const BoardManager = component$(() => {
  const data = useStore(
    {
      columns: [
        {
          id: "column-1",
          name: "Home",
          isEditing: false,
          tasks: [
            {
              id: "column-1-task-1",
              name: "Clean bathroom",
              isEditing: false,
            },
          ],
        },
        {
          id: "column-2",
          name: "Work",
          isEditing: false,
          tasks: [
            {
              id: "column-2-task-1",
              name: "Finish POC",
              isEditing: false,
            },
          ],
        },
        {
          id: "column-3",
          name: "Life",
          isEditing: false,
          tasks: [
            {
              id: "column-3task-1",
              name: "Go out to run",
              isEditing: false,
            },
          ],
        },
      ],
    },
    { recursive: true }
  );

  const currentColumnOver = useSignal<ColumnProps>({});
  const currentColumnIndexOver = useSignal<number | null>(null);
  const currentTaskOverIndex = useSignal<number | null>(null);

  const onCreateNewTask$ = $((index: number) => {
    const currentColumn = data.columns[index];
    const newTaskNumber = currentColumn.tasks.length + 1;
    currentColumn.isEditing = true;

    currentColumn.tasks.push({
      id: `column-${index + 1}-task-${newTaskNumber}`,
      name: "",
      isEditing: true,
    });
  });

  const onConfirmTask$ = $((index: number) => {
    const currentColumn = data.columns[index];
    const taskIndex = currentColumn.tasks.length - 1;
    const currentTask = currentColumn.tasks[taskIndex];
    currentColumn.isEditing = false;
    currentTask.isEditing = false;
  });

  const onChangeTask$ = $(
    (
      e: { target: { value: string } },
      taskIndex: number,
      columnIndex: number
    ) => {
      data.columns[columnIndex].tasks[taskIndex].name = e.target.value;
    }
  );

  const onDragOverColumn$ = $((index: number, taskIndex: number) => {
    console.log("dravovercolumn", taskIndex);
    currentTaskOverIndex.value = taskIndex;
    if (currentColumnIndexOver.value === index) {
      return;
    }

    if (currentColumnIndexOver.value !== null) {
      data.columns[currentColumnIndexOver.value].hasSkeleton = false;
    }

    currentColumnOver.value = data.columns[index];
    currentColumnIndexOver.value = index;
    currentColumnOver.value.hasSkeleton = true;
  });

  const onDragTask$ = $((taskId: number, columnIndex: number) => {
    const originColumn = data.columns[columnIndex];
    const taskIndex = originColumn.tasks.findIndex(
      (item) => item.id === taskId
    );
    data.columns[columnIndex].tasks[taskIndex].isSkeleton = true;
  });

  const onDropTask$ = $((task, taskIndex: number, columnIndex: number) => {
    const originColumn = data.columns[columnIndex];
    currentColumnOver.value.tasks.splice(currentTaskOverIndex.value, 0, {
      ...task,
      isSkeleton: false,
    });
    currentColumnOver.value.hasSkeleton = false;

    data.columns[columnIndex].hasSkeleton = false;

    const indexToRemove = originColumn.tasks.findIndex(
      (originColumnTask) => originColumnTask.isSkeleton
    );

    originColumn.tasks.splice(indexToRemove, 1);
  });

  return (
    <>
      <Board
        onCreateNewTask$={onCreateNewTask$}
        onConfirmTask$={onConfirmTask$}
        onChangeTask$={onChangeTask$}
        onDragOverColumn$={onDragOverColumn$}
        onDragTask$={onDragTask$}
        onDropTask$={onDropTask$}
        data={data}
      />
    </>
  );
});
