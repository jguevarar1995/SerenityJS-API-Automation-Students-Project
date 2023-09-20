@login @Api
Feature: Login into Students System

  Background: 
    Given that an Admin user is registered

  Scenario Outline: Successful login with valid credentials
    When logs in with email "<email>" and password "<password>"
    Then the login should be successful

    Examples: 
      | email          | password   |
      | admin@test.com | Admin_123$ |

  Scenario Outline: Attempting login with invalid credentials
    When logs in with email "<email>" and password "<password>"
    Then user should not be able to log in

    Examples: 
      | email          | password   |
      | admin@test.com | wrong123   |
