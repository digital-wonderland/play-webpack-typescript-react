name := "play-webpack-typescript-react"

lazy val commonSettings = Seq(
  organization := "com.example",
  version := "0.0.1",
  scalaVersion := "2.12.1", // stick with 2.12.1 until https://github.com/scala/bug/issues/10270 is fixed
  scalacOptions ++= Seq(
    "-target:jvm-1.8",
    "-encoding",
    "UTF-8",
    "-unchecked",
    "-deprecation",
    "-Xfatal-warnings",
    "-Xfuture",
    "-Xlint",
    "-Yno-adapted-args",
//      "-Yno-imports", // no automatic import of Predef (removes irritating implicits)
//      "-Yno-predef",  // no automatic imports at all; all symbols must be imported explicitly
    "-Ywarn-dead-code",
    "-Ywarn-numeric-widen",
    "-Ywarn-value-discard",
    "-Ywarn-unused",
    "-Ywarn-unused-import"
  ),
  dependencyOverrides ++= Set(
    "org.scala-lang" % "scala-library" % scalaVersion.value,
    "org.scala-lang" % "scala-reflect" % scalaVersion.value
  ),
  scapegoatVersion := "1.3.1",
  wartremoverErrors ++= Warts.unsafe,
  crossScalaVersions := Seq("2.11.11", "2.12.1"),
  scalafmtVersion in ThisBuild := "1.0.0-RC4",
  scalafmtOnCompile in ThisBuild := true,
  ignoreErrors in (ThisBuild, scalafmt) := false
)

lazy val root = (project in file("."))
  .settings(commonSettings: _*)
  .settings(
    name := "play-webpack-typescript-react",
    scalacOptions ~= { (options: Seq[String]) =>
      options filterNot (_ == "-Ywarn-unused-import")
    },
    coverageExcludedPackages := "controllers\\.Reverse.*;controllers\\.javascript\\.Reverse.*;views\\.html\\..*",
    wartremoverExcluded ++= Seq(
      crossTarget.value / "routes" / "main" / "router" / "Routes.scala",
      crossTarget.value / "routes" / "main" / "router" / "RoutesPrefix.scala"
    ),
    scapegoatIgnoredFiles := Seq(
      crossTarget.value + "/routes/main/controllers/ReverseRoutes.scala",
      crossTarget.value + "/routes/main/controllers/javascript/JavaScriptReverseRoutes.scala",
      crossTarget.value + "/routes/main/router/Routes.scala",
      crossTarget.value + "/twirl/.*.template.scala"
    ),
    PlayKeys.playRunHooks += WebpackDevServer(baseDirectory.value, streams.value.log),
    PlayKeys.playMonitoredFiles ++= (sourceDirectories in (Compile, TwirlKeys.compileTemplates)).value,
    pipelineStages := Seq(webpack, digest, gzip)
  )
  .settings(
    libraryDependencies ++= Seq(
      guice,
      ws,
      "org.scalatestplus.play" %% "scalatestplus-play" % "3.1.1" % Test
    ))
  .enablePlugins(PlayScala)
  .disablePlugins(PlayLayoutPlugin)
  .enablePlugins(Webpack)

addCompilerPlugin("org.psywerx.hairyfotr" %% "linter" % "0.1.17")
