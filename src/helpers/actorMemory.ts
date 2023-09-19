import { Question, actorInTheSpotlight, notes } from "@serenity-js/core";

export const actorMemory = (value: any) =>
  Question.about("remember value", (actor) => {
    return value;
  });

export const remember = async (name: string, value: unknown) => {
  actorInTheSpotlight().attemptsTo(notes().set(name, value));
};

export const recall = async (name: string) => {
  actorInTheSpotlight().answer(notes().get(name));
};
