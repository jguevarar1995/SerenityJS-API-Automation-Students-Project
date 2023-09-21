import { Given, Then, When } from '@cucumber/cucumber';
import { Actor, Log, actorInTheSpotlight } from '@serenity-js/core';
import { recall, remember } from '../../src/helpers/actorMemory';
import { actorMemories } from '../../src/constants/actorMemories';
import { loginInteractions } from '../../src/interactions/loginInteractions';
import { loginTask } from '../../src/tasks/loginTask';

Given('{actor} is a registered user',  async (actor : Actor) => {
    Log.the(`${actor.name} started the tests execution`).performAs(actorInTheSpotlight());
});

When('login with email {string} and password {string}', async (email : string, password : string) => {
    await loginInteractions.postLogin(email, password);
    await remember(actorMemories.LOGIN_EMAIL, email);
});

Then('the login is finalized successfully', async () => {
    const loginEmail : string = await recall(actorMemories.LOGIN_EMAIL); 
    await loginTask.validateSuccessLoginResponse(loginEmail);
});