import javax.inject._

import filters.ExampleFilter
import play.api._
import play.api.http.HttpFilters
import play.api.mvc._
import play.filters.csrf.CSRFFilter

/**
  * This class configures filters that run on every request. This
  * class is queried by Play to get a list of filters.
  *
  * Play will automatically use filters from any class called
  * `Filters` that is placed the root package. You can load filters
  * from a different class by adding a `play.http.filters` setting to
  * the `application.conf` configuration file.
  *
  * Default Filters enabled in Dev or Prod mode:
  * https://www.playframework.com/documentation/latest/ScalaCsrf
  *
  * @param env Basic environment settings for the current application.
  * @param exampleFilter A demonstration filter that adds a header to
  * each response.
  */
@Singleton
class Filters @Inject()(env: Environment, csrfFilter: CSRFFilter, exampleFilter: ExampleFilter) extends HttpFilters {

  override val filters: Seq[EssentialFilter] = {
    val defaultFilters = Seq(csrfFilter)

    //FIXME review filter application & configuration
    env.mode match {
      case Mode.Dev => defaultFilters ++ Seq(exampleFilter)
      case Mode.Prod => defaultFilters
      case _ => Seq.empty
    }
  }

}
