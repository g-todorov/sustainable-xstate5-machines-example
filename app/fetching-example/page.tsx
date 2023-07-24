"use client";

import { assign, createMachine, fromPromise } from "xstate";
import { useActor } from "@xstate/react";

import { Notification } from "../../components/Notification";
import { ToggleMachineActor, toggleMachine } from "../../machines/toggle";

const fetchingMachine = createMachine(
  {
    id: "fetchMachine",
    context: { toggleRef: null, data: null },
    types: {} as {
      actors: { fetchData: { output: any } };
      context: { toggleRef: ToggleMachineActor | null; data: any | null };
      events: { type: "FETCHING"; output: any };
    },
    initial: "fetching",
    on: {
      FETCHING: {
        target: ".fetching",
      },
    },
    states: {
      idle: {},
      fetching: {
        invoke: {
          src: "fetchData",
          onDone: {
            actions: ["assignToggleRef", "assignData"],
            target: "idle",
          },
        },
      },
    },
  },
  {
    actions: {
      assignToggleRef: assign({
        toggleRef: ({ spawn }) => {
          return spawn(toggleMachine, {
            input: { isInitiallyChecked: true },
          });
        },
      }),
      assignData: assign({
        data: ({ event }) => {
          return event.output;
        },
      }),
    },
    actors: {
      fetchData: fromPromise(async () => {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos/"
        );
        const data = await response.json();

        return data;
      }),
    },
  }
);

export default function FetchingExample() {
  const [
    {
      context: { toggleRef, data },
    },
  ] = useActor(fetchingMachine);

  return (
    <div>
      {toggleRef && (
        <div>
          <Notification data={[data[0], data[1], data[2]]} actor={toggleRef} />
        </div>
      )}
    </div>
  );
}
