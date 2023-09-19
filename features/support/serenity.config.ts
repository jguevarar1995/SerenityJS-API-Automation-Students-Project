import { ConsoleReporter } from "@serenity-js/console-reporter";
import { ArtifactArchiver, configure } from "@serenity-js/core";
import { SerenityBDDReporter } from "@serenity-js/serenity-bdd";
import { Actors } from "../../src/Actors";


configure({
  actors: new Actors(process.env.BASE_API_URL || ""),
  crew: [
    ConsoleReporter.withDefaultColourSupport(),
    new SerenityBDDReporter(),
    ArtifactArchiver.storingArtifactsAt(
      __dirname,
      "../../target/site/serenity"
    ),
  ],
});