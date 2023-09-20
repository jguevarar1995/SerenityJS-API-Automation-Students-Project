import { EnsureEventually } from '@serenity-js/assertions';
import type { Answerable, AnswersQuestions, CollectsArtifacts, Expectation, UsesAbilities } from '@serenity-js/core';
import { Activity, AssertionError, d, ExpectationMet, ExpectationNotMet, f, Interaction, LogicError, RaiseErrors } from '@serenity-js/core';
import type { FileSystemLocation } from '@serenity-js/core/lib/io';

/**
 * The {@apilink Interaction|interaction} to `Ensure`
 * verifies if the resolved value of the provided {@apilink Answerable}
 * meets the specified {@apilink Expectation}.
 * If not, it throws an {@apilink AssertionError}.
 * @group Activities
 */
export class BussinessEnsure<Actual> extends Interaction {
    exceptionMessage: string;
    /**
   * Creates an {@apilink Interaction|interaction} to `Ensure`, which
   * verifies if the resolved value of the provided {@apilink Answerable}
   * meets the specified {@apilink Expectation}.
   * If not, it immediately throws an {@apilink AssertionError}.
   *
   * @param {Answerable<Actual_Type>} actual
   *  An {@apilink Answerable} describing the actual state of the system.
   *
   * @param {Expectation<Actual_Type>} expectation
   *  An {@apilink Expectation} you expect the `actual` value to meet
   *
   * @returns {Ensure<Actual_Type>}
   */
    static that<Actual_Type>(actual: Answerable<Actual_Type>, expectation: Expectation<Actual_Type>, message: string, errorMessage: string): BussinessEnsure<Actual_Type> {
        return new BussinessEnsure(actual, expectation, message, errorMessage, Activity.callerLocation(5));
    }

    /**
   * Creates an {@apilink Interaction|interaction} to {@apilink EnsureEventually}, which
   * verifies if the resolved value of the provided {@apilink Answerable}
   * meets the specified {@apilink Expectation} within the expected timeframe.
   *
   * If the expectation is not met by the time the timeout expires, the interaction throws an {@apilink AssertionError}.
   * `EnsureEventually` ignores retries the evaluation if resolving the `actual` results in an {@apilink OptionalNotPresentError},
   * but rethrows any other errors.
   *
   * @param {Answerable<Actual_Type>} actual
   *  An {@apilink Answerable} describing the actual state of the system.
   *
   * @param {Expectation<Actual_Type>} expectation
   *  An {@apilink Expectation} you expect the `actual` value to meet
   *
   * @returns {Ensure<Actual_Type>}
   */
    static eventually<Actual_Type>(actual: Answerable<Actual_Type>, expectation: Expectation<Actual_Type>): EnsureEventually<Actual_Type> {
        return new EnsureEventually(actual, expectation, Activity.callerLocation(5));
    }

    /**
   * @param actual
   * @param expectation
   * @param location
   */
    private constructor(protected readonly actual: Answerable<Actual>, protected readonly expectation: Expectation<Actual>, message: string, errorMessage: string, location: FileSystemLocation) {
        super(d`#actor ensures that => ${message}`, location);
        this.exceptionMessage = errorMessage;
    }

    /**
   * @inheritDoc
   */
    async performAs(actor: UsesAbilities & AnswersQuestions & CollectsArtifacts): Promise<void> {
        const outcome = await actor.answer(this.expectation.isMetFor(this.actual));

        if (outcome instanceof ExpectationNotMet) {
            const message = `Error => ${this.exceptionMessage}`;

            throw RaiseErrors.as(actor).create(AssertionError, {
                message,
                expectation: outcome.expectation,
                diff: { expected: outcome.expected, actual: outcome.actual },
                location: this.instantiationLocation(),
            });
        }

        if (!(outcome instanceof ExpectationMet)) {
            throw new LogicError(f`Expectation#isMetFor(actual) should return an instance of an ExpectationOutcome, not ${outcome}`);
        }
    }
}
