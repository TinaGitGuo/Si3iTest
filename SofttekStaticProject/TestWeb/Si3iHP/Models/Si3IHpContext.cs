using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace Si3iHP.Models
{
   
    public class Si3IHpContext : DbContext
    {
        public Si3IHpContext(): base("name=DefaultConnection")
            
        {
            //自动创建表，如果Entity有改到就更新到表结构
            Database.SetInitializer<Si3IHpContext>(new MigrateDatabaseToLatestVersion<Si3IHpContext, ReportingDbMigrationsConfiguration>());
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>(); //表名为类名，不是带s的表名  //移除复数表名的契约
        }

        internal sealed class ReportingDbMigrationsConfiguration : DbMigrationsConfiguration<Si3IHpContext>
        {
            public ReportingDbMigrationsConfiguration()
            {
                AutomaticMigrationsEnabled = true;//任何Model Class的修改將會直接更新DB
                AutomaticMigrationDataLossAllowed = true;
            }
        }

        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<User> Users { get; set; }
        //public virtual DbSet<UserRole> UserRoles { get; set; }
        public virtual DbSet<Route> Routes { get; set; }
        public virtual DbSet<RouteCheck> RouteChecks { get; set; }
        public virtual DbSet<RouteContact> RouteContacts { get; set; }
    }
}