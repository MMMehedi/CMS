using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VillageCourt.WebApi.Repository.Report
{
    public class tblApplicationInfoRepository : GenericRepository<ApplicationInfo>
    {
        public tblApplicationInfoRepository(VCEntities context) : base(context) { }
        public dynamic GetApplicationByID(int id)
        {
            var result = (from m in context.vApplications
                          where m.AppID == id
                          orderby m.AppID descending
                          select new
                          {
                              m.AppID,
                              m.Applicant,
                              m.AFather,
                              m.AMother,
                              m.ASpouse,
                              m.ANID,
                              m.UnionsID,
                              m.Unions,
                              m.AVillID,
                              m.AVill,
                              m.APOID,
                              m.APO,
                              m.AGenderID,
                              m.AGenderName,
                              m.Opposition,
                              m.OFather,
                              m.OMother,
                              m.OVillID,
                              m.OVill,
                              m.OPOID,
                              m.OPO,
                              m.OGenderID,
                              m.OGenderName,
                              m.Subject,
                              m.AAmount,
                              m.Amends,
                              m.Remarks,
                              m.CreateDate,
                              m.ThanaID,
                              m.Thana,
                              m.DistrictID,
                              m.District,
                              m.Witness,
                              m.WFather,
                              m.WMother,
                              m.WSpouse,
                              m.WNID
                          }).ToList();
            return result;
        }
    }
}























































