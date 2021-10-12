using System;
using System.Collections.Generic;
using System.Linq;
using CMS.Repository;
using CMS.Repository.Repository;


namespace CMS.Repository.Repository
{
    public class MenuRepository : GenericRepository<Menu>
    {
        public MenuRepository(CMSEntities context) : base(context) { }

        public List<Menu> ParentMenuList(int userID)
        {
            try
            {
                var results = from M in context.Menus
                              join P in context.Permissions on M.MenuCode equals P.MenuCode
                              where M.IsActive == 1 && P.UserID == userID && P.UserPer == true //&& M.ParentID != "ROOT"
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

        public dynamic GetRootMenu()
        {
            try
            {
                var root = (from m in context.Menus
                            where m.ParentID == "ROOT" && m.IsActive == 1
                            orderby m.MenuCode
                            select new { m.MenuID, m.MenuCode, m.MenuText }).ToList();
                return root;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public dynamic GetChildMenuByParentIDUserID(string ParentID, int UserID)
        {
            var result = (from M in context.Menus
                          where M.ParentID == ParentID && M.IsActive == 1
                          select new
                          {
                              M.MenuID,
                              M.MenuCode,
                              M.ParentID,
                              M.MenuText,
                              M.URL,
                              M.MenuOrder,
                              M.IsActive,
                              UserPer = (from P in context.Permissions where P.MenuCode == M.MenuCode && P.UserID == UserID select P).Select(P => P.UserPer).FirstOrDefault()
                          });
            return result;
        }














    }
}
