import { component$, useStylesScoped$, PropFunction } from "@builder.io/qwik";
import styles from "./task.css?inline";
import clsx from "clsx";

export interface TaskProps {
  name?: string;
  isEditing?: boolean;
  isSkeleton?: boolean;
  onChangeTask$?: PropFunction<(arg0: Event) => Event>;
  onDragStart$?: PropFunction<(arg0: Event) => Event>;
  onDrop$?: PropFunction<(arg0: Event) => Event>;
}

export const Task = component$<TaskProps>(
  ({ name, isEditing, isSkeleton, onChangeTask$, onDragStart$, onDrop$ }) => {
    useStylesScoped$(styles);

    const classes = clsx("task", isSkeleton && "task--skeleton");

    return (
      <div
        class={classes}
        draggable
        onDragStart$={onDragStart$}
        onDragEnd$={onDrop$}
      >
        {isEditing ? (
          <input type="text" value={name} onChange$={onChangeTask$} />
        ) : (
          name
        )}
      </div>
    );
  }
);
