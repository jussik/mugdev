using Microsoft.AspNet.Builder;
using Microsoft.Framework.DependencyInjection;
using Microsoft.AspNet.Mvc;
using System.Linq;
using Newtonsoft.Json.Serialization;
using Microsoft.Framework.ConfigurationModel;
using Microsoft.Data.Entity;

namespace MugDev
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup()
        {
            Configuration = new Configuration()
                .AddIniFile("config.ini")
                .AddEnvironmentVariables();
        }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().Configure<MvcOptions>(opts => {
                var fmt = opts.OutputFormatters.Select(f => f.Instance).OfType<JsonOutputFormatter>().FirstOrDefault();
                fmt.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            });

            services.AddEntityFramework()
                .AddSqlServer()
                .AddDbContext<Models.MugsAppContext>(opts => opts.UseSqlServer(Configuration["Data:DefaultConnection:ConnectionString"]));
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseMvc();
        }
    }
}
