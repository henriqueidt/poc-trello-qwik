import {
  component$,
  useStylesScoped$,
  Slot,
  PropFunction,
} from "@builder.io/qwik";
import { Task, TaskProps } from "../task/task";
import styles from "./column.css?inline";

export interface ColumnProps {
  id?: string;
  name?: string;
  onCreateNewTask$?: PropFunction<(arg0: number) => void>;
  onConfirmTask$?: PropFunction<(arg0: number) => void>;
  onDragOverColumn$?: PropFunction<(arg0: Event) => void>;
  isEditing: boolean;
  tasks?: TaskProps[];
  hasSkeleton?: boolean;
}

export const Column = component$<ColumnProps>(
  ({
    name,
    onCreateNewTask$,
    onConfirmTask$,
    onDragOverColumn$,
    isEditing,
    hasSkeleton,
  }) => {
    useStylesScoped$(styles);

    return (
      <div class="column" onDragEnter$={onDragOverColumn$}>
        <h3>{name}</h3>
        <Slot />
        {hasSkeleton ? <Task isSkeleton /> : null}
        {isEditing ? (
          <button onClick$={onConfirmTask$}>Confirm task</button>
        ) : (
          <button onClick$={onCreateNewTask$}>Create new task</button>
        )}
      </div>
    );
  }
);
