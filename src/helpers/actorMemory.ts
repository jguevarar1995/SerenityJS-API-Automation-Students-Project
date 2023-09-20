import { actorInTheSpotlight, notes } from "@serenity-js/core";

export const remember = async (name: string, value: unknown) => {
  actorInTheSpotlight().attemptsTo(notes().set(name, value));
};

export const recall = async (name: string) => {
  return notes().get(name).answeredBy(actorInTheSpotlight())
};
