/* eslint-disable */
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { actions as currentTodoActions } from "../../features/currentTodo";
import { Todo } from "../../types/Todo";
import classNames from "classnames";

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const modalTodo = useAppSelector(state => state.currentTodo);
  const { error } = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);

  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title.includes(query);

    const matchesStatus =
      status === "all" ||
      (status === "active" && todo.completed) ||
      (status === "completed" && !todo.completed);

    return matchesQuery && matchesStatus;
  });


  return (
    <>
      {error && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      <table className="table is-narrow is-fullwidth">
        <thead>
        <tr>
          <th>#</th>

          <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
          </th>

          <th>Title</th>
          <th></th>
        </tr>
        </thead>

        <tbody>
        {visibleTodos.map((todo: Todo) => (
          <tr
            data-cy="todo"
            key={todo.id}
            className={classNames(
              todo.id === modalTodo?.id ? "has-background-info-light" : ""
            )}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
              )}
            </td>

            <td className="is-vcentered is-expanded">
              <p
                className={classNames(
                  todo.completed ? "has-text-success" : "has-text-danger"
                )}
              >
                {todo.title}
              </p>
            </td>

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => dispatch(currentTodoActions.set(todo))}
              >
                  <span className="icon">
                    <i
                      className={classNames(
                        "far",
                        todo.id === modalTodo?.id ? "fa-eye-slash" : "fa-eye"
                      )}
                    />
                  </span>
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
};
