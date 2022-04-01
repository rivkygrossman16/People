using Microsoft.AspNetCore.Mvc;
using People.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Peopl.Web.Controllers
{
    public class People : Controller
    {
        private string _connectionString =
          @"Data Source=.\sqlexpress;Initial Catalog=People;Integrated Security=true;";
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetAll()
        {
            var repo = new PeopleDb(_connectionString);
            List<Person> people = repo.GetAll();
            return Json(people);
        }

        [HttpPost]
        public IActionResult AddPerson(Person person)
        {
            var repo = new PeopleDb(_connectionString);
            repo.AddPerson(person);
            return Json(person);
        }
        [HttpPost]
        public IActionResult DeletePerson(int id)
        {
            var repo = new PeopleDb(_connectionString);
            repo.DeletePerson(id);
            return Json(id);
        }
        [HttpPost]
        public IActionResult Edit(Person person)
        {
            var repo = new PeopleDb(_connectionString);
            repo.EditPerson(person);
            return Json(person);
        }
    }
}
