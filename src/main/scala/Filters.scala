import javax.inject._

import filters.ExampleFilter
import play.api._
import play.api.http.HttpFilters
import play.api.mvc._
import play.filters.csrf.CSRFFilter
import play.filters.headers.SecurityHeadersFilter
import play.filters.hosts.AllowedHostsFilter

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
  * https://www.playframework.com/documentation/latest/AllowedHostsFilter
  * https://www.playframework.com/documentation/latest/ScalaCsrf
  * https://www.playframework.com/documentation/latest/SecurityHeaders
  *
  * @param env Basic environment settings for the current application.
  * @param exampleFilter A demonstration filter that adds a header to
  * each response.
  */
@Singleton
class Filters @Inject()(env: Environment, allowedHostsFilter: AllowedHostsFilter, csrfFilter: CSRFFilter, securityHeadersFilter: SecurityHeadersFilter, exampleFilter: ExampleFilter) extends HttpFilters {

  override val filters: Seq[EssentialFilter] = {
    val defaultFilters = Seq(allowedHostsFilter, csrfFilter, securityHeadersFilter)

    //FIXME review filter application & configuration
    env.mode match {
      case Mode.Dev => defaultFilters ++ Seq(exampleFilter)
      case Mode.Prod => defaultFilters
      case _ => Seq.empty
    }
  }

}
