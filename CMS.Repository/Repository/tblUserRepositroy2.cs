using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace VillageCourt.Repository.Repository
{
    public class tblUserRepositroy : GenericRepository<UserInfo>
    {
        public tblUserRepositroy(VCEntities context) : base(context) { }

        public async Task<UserInfo> Login(string strUserName, string strPassword)
        {
            return await Task.FromResult(context.UserInfoes.SingleOrDefault(u => (u.Email == strUserName || u.Mobile == strUserName) && u.Password == strPassword));
        }
        public List<Menu> ParentMenuList(int userID)
        {
            try
            {
                var results = from M in context.Menus
                              join P in context.Permissions on M.MenuCode equals P.MenuCode
                              where M.IsActive == 1 && P.UserID == userID && P.UserPer == true && M.ParentID == "ROOT"
                              orderby M.MenuOrder
                              select new
                              {
                                  menuID = M.MenuID,
                                  menuCode = M.MenuCode,
                                  menuText = M.MenuText,
                                  parentID = M.ParentID,
                                  menuOrder = M.MenuOrder,
                                  url = M.URL,
                                  isActive = M.IsActive,
                                  userID = P.UserID
                              };

                var ParentMenu = results.ToList().Select(r => new Menu
                {
                    MenuID = r.menuID,
                    MenuCode = r.menuCode,
                    MenuText = r.menuText,
                    ParentID = r.parentID,
                    MenuOrder = r.menuOrder,
                    URL = r.url,
                    IsActive = r.isActive
                }).ToList();
                return ParentMenu;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int64 ChangePassword(Int64 intUserId, String strNewPassword)
        {
            UserInfo objUser = dbSet.Find(intUserId);
            objUser.Password = strNewPassword;
            dbSet.Attach(objUser);
            context.Entry(objUser).State = EntityState.Modified;
            context.SaveChanges();
            return 1;
        }

        public async Task<dynamic> GetMemberBySuitID(int SuitID)
        {
            var result = (from Y in context.ChairmanInfoes
                          select new
                          {
                              MemberID = 0,
                              Member = Y.Chairman
                          })
                    .Concat(from R in context.SuitMembers
                            where R.SuitID == SuitID
                            select new
                            {
                                MemberID = R.MemberID,
                                Member = R.Member
                            }).ToList();
            return await Task.FromResult(result);
        }

        public async Task<dynamic> GetAllByUserID(int UserID)
        {
            var result = (from m in context.ApplicationInfoes
                          join u in context.UserInfoes on m.UserID equals u.UserID
                          where u.UserID == UserID
                          select new
                          {
                              m.AppID,
                              m.Applicant,
                              m.AFather,
                              m.AMother,
                              m.ASpouse,
                              m.ANID,
                              m.UnionsID,
                              m.AVillID,
                              m.APOID,
                              //m.APO,
                              m.AGenderID,
                              m.Opposition,
                              m.OFather,
                              m.OMother,
                              m.OVillID,
                              //m.OVill,
                              m.OPOID,
                              //m.OPO,
                              m.OGenderID,
                              m.Subject,
                              m.AAmount,
                              m.Amends,
                              m.Remarks,
                              m.CreateDate,
                              m.PRemedies,
                              u.UserID,
                              u.DesignationID
                          }).ToList();
            return await Task.FromResult(result);
        }

        public async Task<dynamic> GetPermissionByUserID(int UserID)
        {

            var result = new List<Menu>();
            using (var cmd = context.Database.Connection.CreateCommand())
            {
                cmd.CommandText = "SELECT   MenuID, MenuCode, ParentID, MenuText, URL, MenuOrder, IsActive, ISNULL((SELECT UserPer FROM dbo.Permission AS p " +
                              "WHERE UserID=" + UserID + " AND(MenuCode = m.MenuCode)), 0) AS UserPer FROM dbo.Menu AS m ";
                //"INNER JOIN Permission pe ON m.MenuCode = pe.MenuCode ";

                context.Database.Connection.Open();
                try
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var foo = new Menu
                            {
                                MenuID = reader.GetInt32(0),
                                MenuCode = reader.GetString(1),
                                ParentID = reader.GetString(2),
                                MenuText = reader.GetString(3),
                                URL = reader.GetString(4),
                                MenuOrder = reader.GetInt32(5),
                                IsActive = reader.GetInt32(6),
                                UserPer = reader.GetBoolean(7),
                            };
                            result.Add(foo);
                        }
                    }
                    context.Database.Connection.Close();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            return await Task.FromResult(result);


            //var res = "select m.*,isnull((select p.UserPer  from Permission p where UserID=" + UserID + " " +
            //            "and p.MenuCode = m.MenuCode),0) UserPer From Menu m";
            //var result = context.Database.ExecuteSqlCommand(res);
            //return await Task.FromResult(result);
        }

        public async Task<dynamic> GetMaxAppIDByUserID(long UserID)
        {
            var result = context.ApplicationInfoes.OrderByDescending(m => m.AppID).FirstOrDefault(m => m.UserID == UserID);
            return await Task.FromResult(result);
        }

        //public async Task<dynamic> GetBySuitNo(string SuitNo)
        //{
        //    var result = (from op in context.OrderOppositions
        //                  join s in context.SuitInfoes on op.SuitNo equals s.SuitNo
        //                  join a in context.ApplicationInfoes on s.AppID equals a.AppID
        //                  where s.SuitNo == SuitNo
        //                  select new { a.OMobile }).Distinct().ToList();
        //    return await Task.FromResult(result);
        //}

        public async Task<dynamic> GetBySuitNo(string SuitNo)
        {
            var result = (from s in context.SuitInfoes
                          join a in context.ApplicationInfoes on s.AppID equals a.AppID
                          where s.SuitNo == SuitNo
                          select new { a.AppID, s.SuitID, a.OMobile, a.Opposition }).Distinct().ToList();
            return await Task.FromResult(result);
        }



        #region Report
        public dynamic GetApplicationByAppID(long AppID)
        {
            var result = (from m in context.vApplications
                          where m.AppID == AppID
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
                              m.WNID,
                              m.PRemedies,
                          }).ToList();
            return result;
        }

        public dynamic GetSuitRegisterByAppID(string SuitNo)
        {
            var result = (from m in context.vSuitRegisters
                          where m.SuitNo == SuitNo
                          select m).ToList().Distinct();
            return result;
        }
        
        public dynamic GetNominationGuidelinesByAppID(string SuitNo)
        {
            var result = (from m in context.vNominationGuideLines
                          where m.SuitNo == SuitNo
                          select m).ToList().Distinct();
            return result;
        }

        public dynamic GetMemberNominationFormByAppID(string SuitNo)
        {
            var result = (from m in context.vMemberNominationForms
                          where m.SuitNo == SuitNo
                          select new
                          {
                              m.SuitID,
                              m.AcceptDate,
                              m.SuitNo,
                              m.SuitType,
                              m.OObjection,
                              m.HCSumary,
                              m.HCDate,
                              m.CreateDate,
                              m.Applicant,
                              m.AFather,
                              m.AVill,
                              m.APO,
                              m.AGenderName,
                              m.Opposition,
                              m.OFather,
                              m.OVill,
                              m.OPO,
                              m.OGenderName,
                              m.Subject,
                              m.Remarks,
                              m.CreateDateApp,
                              m.Unions,
                              m.Thana,
                              m.District,
                              m.Fees,
                              m.Chairman,
                          }).ToList().Distinct();
            return result;
        }

        public dynamic GetSuitPresentByAppID(string SuitNo)
        {
            //var result = (from m in context.vSuitPresents
            //              where m.SuitNo == SuitNo
            //              select m).ToList();//.Distinct();

            //var result = context.vSuitPresents
            //            .SqlQuery("Select * from vSuitPresent")
            //            .ToList<vSuitPresent>();
            var result = context.Database.SqlQuery<vSuitPresent>("SELECT * FROM vSuitPresent WHERE SuitNo = '" + SuitNo + "'").ToList();
            return result;
        }

        public dynamic GetOrderBySuitNo(string SuitNo)
        {
            var result = (from m in context.vOrders
                          where m.SuitNo == SuitNo
                          select new
                          {
                              m.OrderID,
                              m.SuitNo,
                              m.ODetails,
                              m.CreateDate,
                              m.UnionsID,
                              m.Unions,
                              m.SuitType,
                              m.ThanaID,
                              m.Thana,
                              m.DistrictID,
                              m.District,
                              m.Applicant,
                              m.Opposition,
                          }).ToList().Distinct();
            return result;
        }

        public dynamic GetOrderOppositionBySuitNo(string SuitNo)
        {
            var result = (from m in context.vOrderOppositions
                          where m.SuitNo == SuitNo
                          select new
                          {
                              m.SuitNo,
                              m.Details,
                              m.SuitDate,
                              m.SuitTime,
                              m.CreateDate,
                              m.Unions,
                              m.District,
                              m.Thana,
                              m.Opposition,
                              m.OFather,
                              m.Applicant,
                              m.OMother,
                              m.Vill,
                              m.SuitType,

                          }).ToList().Distinct();
            return result;
        }

        public dynamic GetOrderWitnessBySuitNo(string SuitNo)
        {
            var result = (from m in context.vOrderWitnesses
                          where m.SuitNo == SuitNo
                          select m).ToList().Distinct();
            return result;
        }

        public dynamic GetCompromiseBySuitNo(string SuitNo)
        {
            var result = (from m in context.vSuitCompromises
                          where m.SuitNo == SuitNo
                          select m).ToList().Distinct();
            return result;
        }

        public dynamic DecreeorOrderFormBySuitNo(string SuitNo)
        {
            var result = (from m in context.vDecreeOrOrderForms
                          where m.SuitNo == SuitNo
                          select new
                          {
                              m.OFID,
                              m.OrderDate,
                              m.PrePerson,
                              m.DemandPaid,
                              m.Details,
                              m.JudicialMagistrate,
                              m.PayableDate,
                              m.PaidDate,
                              m.NextAction,
                              m.CreateDate,
                              m.Remarks,
                              m.PartyType,
                              m.MemberID,
                              m.Member,
                              m.Father,
                              m.Mobile,
                              m.SuitID,
                              m.SuitNo,
                              m.SuitType,
                              m.Applicant,
                              m.Opposition,
                              m.Unions,
                          }).ToList();//.Distinct().OrderBy(m=>m.MemberID);
            return result;
        }

        public dynamic GetSuitAttendanceSlipBySuitNo(string SuitNo)
        {
            var result = (from m in context.vSuitAttendanceSlips
                          where m.SuitNo == SuitNo
                          select m).ToList().Distinct();
            return result;
        }
        #endregion Report












































    }
}
