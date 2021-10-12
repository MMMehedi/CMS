using CMS.Repository.Repository;

namespace CMS.Repository.UnitOfWorks
{
    public interface IUnitOfWork
    {       
        tblUserRepositroy TblUserRepositroy { get; }
        MenuRepository TblMenuRepositroy { get; }
        IRepository<UserInfo> UserInfoRepository { get; }
        IRepository<DesignationInfo> DesignationInfoRepository { get; }
        IRepository<Permission> PermissionRepository { get; }
        IRepository<Gender> GenderInfoRepository { get; }
        IRepository<Employee> EmployeeInfoRepository { get; }
        IRepository<Class> ClassInfoRepository { get; }
        IRepository<SectionInfo> SectionInfoRepository { get; }


        //End Reporting view
    }
}
