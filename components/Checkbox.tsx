import { useActor, useMachine, useActorRef } from "@xstate/react";
import { createMachine } from "xstate";
import { toggleMachine } from "../machines/toggle";

interface Props {
  onChange(checked: boolean): void;
  initial?: "on" | "off";
}

export function Checkbox({ onChange, initial = "on" }: Props) {
  const [state, send] = useActor(toggleMachine, {
    input: { isInitiallyChecked: true },
  });

  return (
    <>
      <label htmlFor="toggle">Toggle</label>
      <input
        id="toggle"
        type="checkbox"
        checked={state.matches("on")}
        onChange={(event) => {
          send({ type: "TOGGLE" });
          onChange(event.target.checked);
        }}
      />
    </>
  );
}
