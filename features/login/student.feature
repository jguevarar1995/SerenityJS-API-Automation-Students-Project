@student_management @Api
Feature: Login into Students System

  Background: 
    Given that an Admin user has logged in

  Scenario: Successful student register with faker data
    When registers a new student with faker data
    Then the student is successfully registered

  @wip
  Scenario Outline: Successful student register with data table
    When registers a new student with:
      | student_data          |
      | 112233445             |
      | Juan                  |
      | Guevara               |
      | juan.guevara@test.com |
      | 3001112233            |
      | 11                    |
      | Automation Testing    |
      | 8.5                   |
    #Then the student is successfully registered
