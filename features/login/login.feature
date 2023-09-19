@login @Api
Feature: Login into Students System

  Background: 
    Given Admin is a registered user

  Scenario Outline: Successful login
    When login with email "<email>" and password "<password>"
    Then the login is finalized successfully

    Examples: 
      | email          | password   |
      | admin@test.com | Admin_123$ |
