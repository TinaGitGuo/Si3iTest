using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TestWeb.Startup))]
namespace TestWeb
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //ConfigureAuth(app);
        }
    }
}
