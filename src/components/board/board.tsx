import { component$, useStylesScoped$, PropFunction } from "@builder.io/qwik";
import { Column, ColumnProps } from "../column/column";
import { Task, TaskProps } from "../task/task";
import styles from "./board.css?inline";

export interface BoardProps {
  onCreateNewTask$: PropFunction<(arg0: number) => void>;
  onConfirmTask$: PropFunction<(arg0: number) => void>;
  onChangeTask$: PropFunction<(arg0: Event) => TaskProps>;
  onDragOverColumn$?: PropFunction<(arg0: Event) => ColumnProps>;
  onDragTask$?: PropFunction<(arg0: Event) => TaskProps>;
  onDropTask$?: PropFunction<(arg0: Event) => TaskProps>;
  data: {
    columns: ColumnProps[];
  };
}

export const Board = component$<BoardProps>(
  ({
    onCreateNewTask$,
    onConfirmTask$,
    onChangeTask$,
    onDragOverColumn$,
    onDragTask$,
    onDropTask$,
    data,
  }) => {
    useStylesScoped$(styles);

    return (
      <div class="board">
        {data.columns.map(
          ({ id, name, isEditing, hasSkeleton, tasks }, index) => (
            <Column
              key={id}
              name={name}
              onCreateNewTask$={() => onCreateNewTask$(index)}
              onConfirmTask$={() => onConfirmTask$(index)}
              onDragOverColumn$={() => onDragOverColumn$(index)}
              isEditing={isEditing}
              hasSkeleton={hasSkeleton}
            >
              {tasks?.map(({ id, name, isEditing, isSkeleton }, taskIndex) => {
                return (
                  <Task
                    key={id}
                    name={name}
                    isEditing={isEditing}
                    isSkeleton={isSkeleton}
                    onChangeTask$={(e) => onChangeTask$(e, taskIndex, index)}
                    onDragStart$={() => onDragTask$(id, index)}
                    onDrop$={() =>
                      onDropTask$(
                        { id, name, isEditing, isSkeleton },
                        taskIndex,
                        index
                      )
                    }
                  />
                );
              })}
            </Column>
          )
        )}
      </div>
    );
  }
);
