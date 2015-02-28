using System.ComponentModel.DataAnnotations;

namespace MugDev.Models
{
    public enum MugShape { Circle = 1, Square };

    public class Mug
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        public MugShape Shape { get; set; }
        public float Height { get; set; }
        public float Radius { get; set; }
    }
}