@login @Api
Feature: Login into Students System

  Scenario Outline: Successful login with valid credentials
    Given that an Admin user is registered
    When logs in with email "<email>" and password "<password>"
    Then the login should be successful

    Examples: 
      | email          | password   |
      | admin@test.com | Admin_123$ |

  Scenario Outline: Attempting login with invalid credentials
    Given that an Admin user is registered
    When logs in with email "<email>" and password "<password>"
    Then user is unauthorized to log in

    Examples: 
      | email          | password   |
      | admin@test.com | wrong123   |
  
  Scenario Outline: Attempting login with unregistered user
    Given that Juan is an unregistered user
    When logs in with email "<email>" and password "<password>"
    Then user is not able to log in

    Examples: 
      | email           | password   |
      | prueba@test.com | Admin_123$ |
