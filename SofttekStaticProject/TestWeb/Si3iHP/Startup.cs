using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Si3iHP.Startup))]
namespace Si3iHP
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
