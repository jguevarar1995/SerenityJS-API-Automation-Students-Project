import { actorCalled } from "@serenity-js/core";

export const actor = {
    define: async (actorName: string) => {
        const actor = actorCalled(actorName);
        return actor;
    },
};