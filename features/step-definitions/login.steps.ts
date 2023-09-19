import { Given, Then, When } from '@cucumber/cucumber';
import { Actor, Log, actorInTheSpotlight } from '@serenity-js/core';

Given('{actor} is a registered user',  async (actor : Actor) => {
    Log.the(`${actor.name} started the tests execution`).performAs(actorInTheSpotlight());
});

When('login with email {string} and password {string}', async (email : string, password : string) => {
    Log.the(`${email} ${password}`).performAs(actorInTheSpotlight());
});

Then('the login is finalized successfully', async () => {
    Log.the('success!').performAs(actorInTheSpotlight());
});