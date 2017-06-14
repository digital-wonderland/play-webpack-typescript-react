import java.net.InetSocketAddress

import com.typesafe.sbt.web.Import._
import com.typesafe.sbt.web.Import.WebKeys._
import com.typesafe.sbt.web.PathMapping
import com.typesafe.sbt.web.pipeline.Pipeline
import com.typesafe.sbt.web.SbtWeb
import play.sbt.PlayRunHook
import sbt._
import sbt.Keys._

object OsUtils {

  private val isWindows = System.getProperty("os.name").toUpperCase().indexOf("WIN") >= 0

  def runCommand(cmd: Seq[String], baseDirectory: File): ProcessBuilder = {
    val fullCmd = if(isWindows) Seq("cmd", "/c") ++ cmd else cmd
    Process(fullCmd, baseDirectory)
  }

}

object NpmUtils {

  def installNpmModules(baseDirectory: File, log: Logger): Unit = {
    if (!(baseDirectory / "node_modules").exists) {
      log.info("Installing node modules")

      val result = OsUtils.runCommand(Seq("npm", "install"), baseDirectory).!

      if (result != 0)
        throw new Exception(s"Encountered error while installing node modules: $result")
    }
  }

}

object Webpack extends AutoPlugin {

  override def requires: Plugins = SbtWeb

  override def trigger: PluginTrigger = AllRequirements

  object autoImport {
    val webpack: TaskKey[Pipeline.Stage] = taskKey[Pipeline.Stage]("Run webpack")
  }

  import autoImport._

  override lazy val projectSettings = Seq(
    webpack := { mappings: Seq[PathMapping] =>
      val log = streams.value.log

      NpmUtils.installNpmModules(baseDirectory.value, log)

      log.info("Running webpack")

      val result = OsUtils.runCommand(Seq("npm", "run", "build"), baseDirectory.value).!

      if (result != 0) {
        sys.error(s"Encountered error while running webpack: $result")
        throw new Exception(s"Encountered error while running webpack: $result")
      } else {
        val targetDir       = webTarget.value / "webpack"
        val generatedFiles  = ((targetDir ** "*") filter { !_.isDirectory }).get
        val webpackMappings = generatedFiles pair relativeTo(targetDir)
        mappings ++ webpackMappings
      }
    },
    pipelineStages := Seq(webpack)
  )

}

object WebpackDevServer {

  def apply(baseDirectory: File, log: Logger): PlayRunHook = {

    object WebpackDevServerRunHook extends PlayRunHook {

      var webpackProcess: Option[Process] = None

      override def beforeStarted(): Unit = {
        NpmUtils.installNpmModules(baseDirectory, log)
      }

      override def afterStarted(addr: InetSocketAddress): Unit = {
        log.info("Starting webpack-dev-server")
        webpackProcess = Some(OsUtils.runCommand(Seq("npm", "start"), baseDirectory).run)
      }

      override def afterStopped(): Unit = {
        log.info("Stopping webpack-dev-server")
        webpackProcess.foreach(p => p.destroy())
        webpackProcess = None
      }
    }

    WebpackDevServerRunHook
  }

}
