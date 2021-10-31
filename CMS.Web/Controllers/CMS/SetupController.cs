using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using CMS.Repository;
using CMS.Repository.UnitOfWorks;

namespace CMS.Web.Controllers
{
    [RoutePrefix("api/SetUpInfo")]
    public class SetUpInfoController : BaseController
    {
        CMSEntities context = new CMSEntities();
        DateTime cstTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.Now, TimeZoneInfo.Local.Id, "Bangladesh Standard Time");
        public SetUpInfoController(IUnitOfWork uow)
        {
            Uow = uow;
        }

        [Route("GetAllClass/{CompanyID:int}")]
        [HttpGet]
        public dynamic GetAllClass(int CompanyID)
        {
            try
            {
                var result = Uow.ClassInfoRepository.GetByCompanyID(m => m.CompanyID == CompanyID);
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

        [Route("GetAllSubject/{CompanyID:int}")]
        [HttpGet]
        public dynamic GetAllSubject(int CompanyID)
        {
            try
            {
                var result = context.Subjects;
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

        [Route("GetAllShift/{CompanyID:int}")]
        [HttpGet]
        public dynamic GetAllShift(int CompanyID)
        {
            try
            {
                var result = context.Shifts.Where(m => m.CompanyID == CompanyID);
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

        [Route("GetAllGroupByClass/{ClassID:int}")]
        [HttpGet]
        public dynamic GetAllGroupByClass(int ClassID)
        { 
            try
            {
                var result = context.Groups.Where(m => m.ClassID == ClassID);
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

        [Route("GetAllSectionByClass/{ClassID:int}")]
        [HttpGet]
        public dynamic GetAllSectionByClass(int ClassID)
        {
            try
            {
                var result = context.SectionInfoes.Where(m => m.ClassID == ClassID);
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

        [Route("GetAllSection/{CompanyID:int}")]
        [HttpGet]
        public dynamic GetAllSection(int CompanyID)
        {
            try
            {
                var result = context.SectionInfoes;
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

        [Route("GetAllGroup/{CompanyID:int}")]
        [HttpGet]
        public dynamic GetAllGroup(int CompanyID)
        {
            try
            {
                var result = context.Groups;
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

        [Route("GetAllCourseMonth/{CompanyID:int}")]
        [HttpGet]
        public dynamic GetAllCourseMonth(int CompanyID)
        {
            try
            {
                var result = context.CourseMonthInfoes;
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }


        [Route("GetAllReligion/{CompanyID:int}")]
        [HttpGet]
        public dynamic GetAllReligion(int CompanyID)
        {
            try
            {
                var result = context.Religions.Where(m => m.CompanyId == CompanyID);
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

        [Route("GetAllGender/{CompanyID:int}")]
        [HttpGet]
        public dynamic GetAllGender(int CompanyID)
        {
            try
            {
                var result = context.Genders.Where(m => m.CompanyID == CompanyID);
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

        [Route("GetAllBlood")]
        [HttpGet]
        public dynamic GetAllBlood()
        {
            try
            {
                var result = context.Bloods;
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

       
        [Route("ProfessionType/{CompanyID:int}")]
        [HttpGet]
        public dynamic GetMotherProfessionType(int CompanyID)
        {
            try
            {
                var result = context.ProfessionTypes.Where(m => m.CompanyID == CompanyID);
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

        [Route("GetAllGroupForFee/{ClassID:int}")]
        [HttpGet]
        public dynamic GetAllGroupForFee(int ClassID)
        {
            try
            {
                var result = context.Groups.Where(m => m.ClassID == ClassID);
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

        [Route("GetAllStudentType")]
        [HttpGet]
        public dynamic GetAllStudentType()
        {
            try
            {
                var result = context.StudentTypes;
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

        [Route("GetClassName/{ClassID:int}")]
        [HttpGet]
        public dynamic GetClassName(int ClassID)
        {
            try
            {
                var result = context.Classes.Where(m => m.ClassID == ClassID);
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }
        [Route("GetGroupName/{GroupID:int}")]
        [HttpGet]
        public dynamic GetGroupName(int GroupID)
        {
            try
            {
                var result = context.Groups.Where(m => m.GroupID == GroupID);
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }
        [Route("GetSubjectName/{SubjectID:int}")]
        [HttpGet]
        public dynamic GetSubjectName(int SubjectID)
        {
            try
            {
                var result = context.Subjects.Where(m => m.SubjectID == SubjectID);
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

    }
}
