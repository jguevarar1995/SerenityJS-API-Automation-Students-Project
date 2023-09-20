import { Given, Then, When } from '@cucumber/cucumber';
import { Actor, actorInTheSpotlight,Log } from '@serenity-js/core';

import { actorMemories } from '../../src/constants/actorMemories';
import { recall, remember } from '../../src/helpers/actorMemory';
import { loginInteractions } from '../../src/interactions/loginInteractions';
import { loginTask } from '../../src/tasks/loginTask';

Given('that an {actor} user is registered', async (actor : Actor) => {
    Log.the(`${actor.name} wants to login into students system`).performAs(actorInTheSpotlight());
});

Given('that {actor} is an unregistered user', async (actor : Actor) => {
    Log.the(`${actor.name} wants to login into students system`).performAs(actorInTheSpotlight());
})

When('logs in with email {string} and password {string}', async (email : string, password : string) => {
    await loginInteractions.postLogin(email, password);
    await remember(actorMemories.LOGIN_EMAIL, email);
});

Then('the login should be successful', async () => {
    const loginEmail : string = await recall(actorMemories.LOGIN_EMAIL); 
    await loginTask.validateSuccessLoginResponse(loginEmail);
});

Then('user is unauthorized to log in', async () => {
    await loginTask.validateUnauthorizedLoginResponse();
});

Then('user is not able to log in', async () => {
    await loginTask.validateUserNotFoundLoginResponse();
});
