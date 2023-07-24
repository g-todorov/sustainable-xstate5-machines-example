import { useSelector } from "@xstate/react";
import { ToggleMachineActor } from "../machines/toggle";

interface Props {
  actor: ToggleMachineActor;
  data: { completed: boolean; id: number; title: string; userId: number }[];
}

export function Notification({ actor, data }: Props) {
  const actorState = useSelector(actor, (snapshot) => {
    return snapshot;
  });

  return (
    <div>
      {actorState.matches("on") && (
        <div>
          {`Very important notification`}
          {data.map((item) => {
            return (
              <div key={item.title}>
                <span>title: </span>
                <span>{item.title}</span>
              </div>
            );
          })}
        </div>
      )}
      <button
        onClick={() => {
          actor.send({ type: "TOGGLE" });
        }}
      >
        {actorState.matches("on") ? "close" : "open"}
      </button>
    </div>
  );
}
