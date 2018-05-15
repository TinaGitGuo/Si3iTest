using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Si3iHP.Models
{
    public class Role
    {
        [Key]
        public Guid Id { get; set; }
        [StringLength(20)]
        public string Name { get; set; }
        [StringLength(200)]
        public string Description { get; set; }

        public DateTime? EditTime { get; set; }
        
        public Guid? Editor { get; set; }
        [InverseProperty("EditRoles")]
        public virtual User EditUser { get; set; }

        public bool IsDeleted { get; set; }
        public DateTime? DeletedTime { get; set; }

        public DateTime CreateTime { get; set; }
        public Guid Creator { get; set; }
        [InverseProperty("CreateRoles")]
        public virtual User CreateUser { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; }
    }

    public class User
    {
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
        public bool IsTop { get; set; }
        [StringLength(20)]
        public string Post { get; set; }

        public DateTime? EditTime { get; set; }
        public Guid? Editor { get; set; }

        public bool IsDeleted { get; set; }
        public DateTime? DeletedTime { get; set; }

        public DateTime CreateTime { get; set; }
        public Guid Creator { get; set; }

        [InverseProperty("EditUser")]
        public virtual ICollection<Role> EditRoles { get; set; }
        [InverseProperty("CreateUser")]
        public virtual ICollection<Role> CreateRoles { get; set; }

        [InverseProperty("EditUser")]
        public virtual ICollection<Route> EditRoutes { get; set; }
        [InverseProperty("CreateUser")]
        public virtual ICollection<Route> CreateRoutes { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; }
        public virtual ICollection<RouteCheck> RouteChecks { get; set; }

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
        public bool IsAirport { get; set; }
        public bool IsScreen { get; set; }
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
        public Guid? Editor { get; set; }
        [InverseProperty("EditRoutes")]
        public virtual User EditUser { get; set; }

        public bool IsDeleted { get; set; }
        public DateTime? DeletedTime { get; set; }

        public DateTime CreateTime { get; set; }
        public Guid Creator { get; set; }//修改？？
        [InverseProperty("CreateRoutes")]
        public virtual User CreateUser { get; set; }

        [StringLength(50)]
        public string CompanyName { get; set; }

        public virtual ICollection<RouteCheck> RouteChecks { get; set; }
        public virtual ICollection<RouteContact> RouteContacts { get; set; }

    }

    public class RouteCheck
    {
        [Key]
        public Guid Id { get; set; }
        [ForeignKey("Route")]
        public Guid RouteId { get; set; }
        [StringLength(200)]
        public string Remark { get; set; }

        public DateTime CreateTime { get; set; }
        [ForeignKey("User")]
        public Guid Creator { get; set; }

        public virtual User User { get; set; }
        public virtual Route Route { get; set; }
    }

    public class RouteContact
    {
        [Key]
        public Guid Id { get; set; }
        [ForeignKey("Route")]
        public Guid RouteId { get; set; }
        [StringLength(20)]
        public string Name { get; set; }
        [StringLength(20)]
        public string Phone { get; set; }
        public bool IsTop { get; set; }
        [StringLength(20)]
        public string Post { get; set; }

        public virtual Route Route { get; set; }
    }



}