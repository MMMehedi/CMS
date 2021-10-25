using System;
using CMS.Repository.Repository;

namespace CMS.Repository.UnitOfWorks
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private CMSEntities context = new CMSEntities();

        private MenuRepository tblMenuRepositroy;
        public MenuRepository TblMenuRepositroy
        {
            get
            {
                if (this.tblMenuRepositroy == null)
                    this.tblMenuRepositroy = new MenuRepository(context);
                return tblMenuRepositroy;
            }
        }

        private tblUserRepositroy tblUserRepositroy;
        public tblUserRepositroy TblUserRepositroy
        {
            get
            {
                if (this.tblUserRepositroy == null)
                    this.tblUserRepositroy = new tblUserRepositroy(context);
                return tblUserRepositroy;
            }
        }
        private IRepository<UserInfo> userInfoRepository;
        public IRepository<UserInfo> UserInfoRepository
        {
            get
            {
                if (this.userInfoRepository == null)
                    this.userInfoRepository = new GenericRepository<UserInfo>(context);
                return userInfoRepository;
            }
        }

        private IRepository<Menu> menuRepository;
        public IRepository<Menu> MenuRepository
        {
            get
            {
                if (this.menuRepository == null)
                    this.menuRepository = new GenericRepository<Menu>(context);
                return menuRepository;
            }
        }

        private IRepository<DesignationInfo> designationInfoRepository;
        public IRepository<DesignationInfo> DesignationInfoRepository
        {
            get
            {
                if (this.designationInfoRepository == null)
                    this.designationInfoRepository = new GenericRepository<DesignationInfo>(context);
                return designationInfoRepository;
            }
        }

        private IRepository<Permission> permissionRepository;
        public IRepository<Permission> PermissionRepository
        {
            get
            {
                if (this.permissionRepository == null)
                    this.permissionRepository = new GenericRepository<Permission>(context);
                return permissionRepository;
            }
        }
        private IRepository<Gender> genderInfoRepository;
        public IRepository<Gender> GenderInfoRepository
        {
            get
            {
                if (this.genderInfoRepository == null)
                    this.genderInfoRepository = new GenericRepository<Gender>(context);
                return genderInfoRepository;
            }
        }

        private IRepository<Employee> employeeInfoRepository;
        public IRepository<Employee> EmployeeInfoRepository
        {
            get
            {
                if (this.employeeInfoRepository == null)
                    this.employeeInfoRepository = new GenericRepository<Employee>(context);
                return employeeInfoRepository;
            }
        }
        private IRepository<Class> classInfoRepository;

        public IRepository<Class> ClassInfoRepository
        {
            get
            {
                if (this.classInfoRepository == null)
                    this.classInfoRepository = new GenericRepository<Class>(context);
                return classInfoRepository;
            }
        }
        private IRepository<SectionInfo> sectionInfoRepository;

        public IRepository<SectionInfo> SectionInfoRepository
        {
            get
            {
                if (this.sectionInfoRepository == null)
                    this.sectionInfoRepository = new GenericRepository<SectionInfo>(context);
                return sectionInfoRepository;
            }
        }
        private IRepository<StudentInformation> tblStudentInformationRepository;
        public IRepository<StudentInformation> TblStudentInformationRepository
        {
            get
            {
                if (this.tblStudentInformationRepository == null)
                    this.tblStudentInformationRepository = new GenericRepository<StudentInformation>(context);
                return tblStudentInformationRepository;
            }
        }
        private IRepository<Subject> tblSubjectInfoRepository;
        public IRepository<Subject> TblSubjectInfoRepository
        {
            get
            {
                if (this.tblSubjectInfoRepository == null)
                    this.tblSubjectInfoRepository = new GenericRepository<Subject>(context);
                return tblSubjectInfoRepository;
            }
        }





















        //End Reporting view


        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
