//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CMS.Repository
{
    using System;
    using System.Collections.Generic;
    
    public partial class StudentType
    {
        public int StudentTypeID { get; set; }
        public string StudentTypeName { get; set; }
        public int CompanyID { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public int ModifyBy { get; set; }
        public System.DateTime ModifyDate { get; set; }
        public bool Status { get; set; }
    }
}
