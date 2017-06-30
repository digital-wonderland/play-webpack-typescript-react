import com.typesafe.config.{Config, ConfigFactory}
import play.api.inject.guice.{GuiceApplicationBuilder, GuiceApplicationLoader}
import play.api.{ApplicationLoader, Configuration, Mode}

class MyGuiceApplicationLoader extends GuiceApplicationLoader() {

  override def builder(context: ApplicationLoader.Context): GuiceApplicationBuilder = {
    val initialConfig = context.initialConfiguration.underlying

    val config: Config = context.environment.mode match {
      case Mode.Dev => ConfigFactory.parseResources("application-dev.conf").withFallback(initialConfig)
      case _        => initialConfig
    }

    super.builder(context).configure(new Configuration(config))
  }

}
