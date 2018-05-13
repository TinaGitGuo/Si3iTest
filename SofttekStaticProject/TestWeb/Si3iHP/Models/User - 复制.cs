using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Si3iHP.Models
{
    //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
    //public News()
    //{
    //NewsDetails = new HashSet<NewsDetail>();
    //}
    //public class Category
    //{
    //    public int Id { get; set; }
    //    [Required]
    //    [StringLength(200)]
    //    public string CategoryName { get; set; }

    //    public DateTime CreateDate { get; set; }
    //    public virtual ICollection<Blog> Blogs { get; set; }
    //    public Category()
    //    {
    //        Blogs = new HashSet<Blog>();
    //    }
    //}
    public class Role
    {
        [Key]
        public Guid Id { get; set; }
        [StringLength(20)]
        public string Name { get; set; }
        [StringLength(200)]
        public string Description { get; set; }
        
        public DateTime? EditTime { get; set; }
        [ForeignKey("EditorUser")]
        public Guid? Editor { get; set; }
        public byte IsDeleted { get; set; }
        public DateTime? DeletedTime { get; set; }
        public DateTime CreateTime { get; set; }
        [ForeignKey("CreatorUser")]
        public Guid Creator { get; set; }
        public virtual User CreatorUser { get; set; }
        public virtual User EditorUser { get; set; }

    }

    public class User
    {
     public User()
     {
         EditorRoles = new HashSet<Role>();
         CreatorRoles = new HashSet<Role>();
         Routes = new HashSet<Route>();
         RouteChecks = new HashSet<RouteCheck>();
         RouteContacts = new HashSet<RouteContact>();
        }
        [Key]
        public Guid Id { get; set; }
        [StringLength(20)]
        public string Name { get; set; }
        [Required]
        [StringLength(50)]
        public string Password { get; set; }
        [Required]
        public int UserType { get; set; }
        [StringLength(20)]
        public string OpenId { get; set; }
        [StringLength(20)]
        public string Phone { get; set; }
        [StringLength(50)]
        public string Email { get; set; }

        public byte IsTop { get; set; }
        [StringLength(20)]
        public string Post { get; set; }

        public DateTime? EditTime { get; set; }
        [ForeignKey("EditorUser")]
        public Guid? Editor { get; set; }
        public byte  IsDeleted{ get; set; }
        public DateTime? DeletedTime { get; set; }
        public DateTime CreateTime { get; set; }
        [ForeignKey("CreatorUser")]
        public Guid Creator { get; set; }
        public virtual User EditorUser { get; set; }

        public virtual User CreatorUser { get; set; }

        [InverseProperty("EditorUser")]
        public virtual ICollection<Role> EditorRoles { get; set; }
        [InverseProperty("CreatorUser")]
        public virtual ICollection<Role> CreatorRoles { get; set; }

        public virtual ICollection<Route> Routes { get; set; }
        public virtual ICollection<RouteCheck> RouteChecks { get; set; }
        public virtual ICollection<RouteContact> RouteContacts { get; set; }
    }

    public class UserRole
    {
        [Key]
        public Guid Id { get; set; }
        [ForeignKey("User")]
        public Guid UserId { get; set; }
        [ForeignKey("Role")]
        public Guid RoleId { get; set; }
        public virtual User User { get; set; }
        public virtual Role Role { get; set; }

    }

    public class Route
    {
        [Key]
        public Guid Id { get; set; }
        [StringLength(50)]
        public string Destination { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Days { get; set; }
        [StringLength(200)]
        public string RouteDescription { get; set; }
        [StringLength(20)]
        public string FirstContact { get; set; }
        public byte IsAirport { get; set; }
        public byte IsScreen { get; set; }
        [StringLength(200)]
        public string Factory { get; set; }
        [StringLength(20)]
        public string Repast { get; set; }
        [StringLength(20)]
        public string Allergy { get; set; }
        [StringLength(200)]
        public string AllergyRemark { get; set; }

        public int Status { get; set; }
        public DateTime? EditTime { get; set; }
        [ForeignKey("User")]
        public Guid? Editor { get; set; }
        public byte IsDeleted { get; set; }
        public DateTime? DeletedTime { get; set; }
        public DateTime CreateTime { get; set; }
        [StringLength(20)]
        public string  CreatorName { get; set; }
        [StringLength(50)]
        public string CompanyName { get; set; }
        public virtual User User { get; set; }

    }

    public class RouteCheck
    {
        [Key]
        public Guid Id { get; set; }
        [ForeignKey("Route")]
        public Guid RouteId { get;set;}
        [StringLength(200)]
        public string Remark { get;set;}
        public DateTime CreateTime { get;set;}
        [ForeignKey("User")]
        public Guid Creator { get;set;}
        public virtual User User { get; set; }
        public virtual Route Route { get; set; }
    }

    public class RouteContact {
        [Key]
        public Guid Id { get; set; }
        [ForeignKey("Route")]
        public Guid RouteId { get; set; }
        [StringLength(20)]
        public string Name { get; set; }
        [StringLength(20)]
        public string Phone { get; set; }
        public byte IsTop { get; set; }
        [StringLength(20)]
        public string Post { get; set; }
        public virtual Route Route { get; set; }
    }



}