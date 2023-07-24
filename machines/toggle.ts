import { ActorRefFrom, createMachine } from "xstate";

export type ToggleMachineActor = ActorRefFrom<typeof toggleMachine>;

export const toggleMachine = createMachine(
  {
    id: "toggleMachine",
    initial: "initializing",
    types: {
      typegen: {} as import("./toggle.typegen").Typegen0,
      events: {} as { type: "TOGGLE" },
      context: {} as { isInitiallyChecked: boolean },
    },
    context: ({ input }) => {
      return { ...input };
    },
    states: {
      initializing: {
        always: [{ guard: "isChecked", target: "on" }, { target: "off" }],
      },
      off: {
        on: {
          TOGGLE: {
            target: "on",
          },
        },
      },
      on: {
        on: {
          TOGGLE: {
            target: "off",
          },
        },
      },
    },
  },
  {
    guards: {
      isChecked({ context }) {
        return context.isInitiallyChecked;
      },
    },
  }
);
