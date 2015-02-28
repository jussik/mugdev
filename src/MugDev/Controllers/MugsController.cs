using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc;
using MugDev.Models;
using System;

namespace MugDev.Controllers.Controllers
{
    [Route("api/[controller]")]
    public class MugsController : Controller
    {
        private MugsAppContext Db { get; }

        public MugsController(MugsAppContext db) { Db = db; }

        private static readonly Dictionary<int, string> MugShapes =
            Enum.GetValues(typeof(MugShape)).Cast<MugShape>()
                .ToDictionary(s => (int)s, s => Enum.GetName(typeof(MugShape), s));

        [HttpGet]
        public IEnumerable<Mug> Get()
        {
            return Db.Mugs;
        }

        [HttpGet("{id:int}")]
        public Mug Get(int id)
        {
            return Db.Mugs.FirstOrDefault(m => m.Id == id);
        }

        [HttpGet("shapes")]
        public Dictionary<int, string> GetShapes()
        {
            return MugShapes;
        }
    }
}
